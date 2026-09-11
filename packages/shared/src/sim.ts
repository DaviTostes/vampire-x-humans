// Simulação autoritativa do jogo — roda SOMENTE no servidor.
// Clientes recebem snapshots e enviam comandos.

import {
  BUILD_COSTS,
  BUILDABLE,
  BUILDING_SIZE,
  CRYPT_RADIUS,
  DT,
  SURVIVE_NIGHTS_TO_WIN,
  MARKET,
  TOWER,
  VAMPIRE,
  VAMPIRE_SKILLS,
  WALL,
  TAVERNA,
  BANK,
  RECRUIT,
  KEEP,
  PEON,
  workerStats,
  GAME_CONFIG,
  DEFAULT_MAP_ID,
  INTERACTION,
  VAMPIRE_PLAYER_ID,
  WORLD,
  SPEC_ENTITY_LIMITS,
  SPEC_WORKERS,
  SPEC_CRYPT,
  SPEC_BLOOD_PER_DAMAGE,
  SPEC_ROUNDING_POLICY,
  HUMAN_ABILITIES,
  VAMPIRE_ABILITIES,
  MAP_SCALE,
  bankProduction,
  BANK_CYCLE_SECONDS,
  CRYPT_CYCLE_SECONDS,
  cryptProduction,
  MARKET_MAX_LEVEL,
  marketUpgradeCost,
  towerDamage,
  workerTrainCost,
  workerUpgradeCost,
  workerMaxLevel,
  lumberjackGatherRate,
  minerGoldRate,
  repairerTrainingTime,
  repairerRepairRate,
  type BuildKind,
  type HumanAbilityId,
  type MapPresetId,
  type SpecPrerequisite,
  type VampireAbilityId,
  type VampireItemId,
  type VampireSkillId,
  type WorkerRole,
} from './constants.js';
import {
  CRYPT_POSITION,
  generateMap,
  type GameMap,
} from './mapgen.js';
import { createGameState } from './state.js';
import { Navigation } from './navigation.js';
import { canPlaceBuilding } from './placement.js';
import {
  VAMPIRE_ITEM_IDS,
  vampireItemBonuses,
  vampireItemNextLevel,
  vampireItemCost,
  vampireItemBonus,
  vampireEffectiveCooldown,
  vampireEffectiveSpeed,
  vampireShopAccess,
  vampireSkillMultiplier,
} from './vampire-items.js';
import type {
  Building,
  Command,
  GameState,
  PlayerState,
  ResourceKind,
  ResourceNode,
  Snapshot,
  Unit,
  VampireStatus,
} from './types.js';

export interface Session {
  state: GameState;
  map: GameMap;
  commandSeq: Record<number, number>;
  navigation: Navigation;
}

/** Índices por id reconstruídos uma vez por tick: evita .find() lineares por unidade. */
interface TickIndex {
  units: Map<number, Unit>;
  buildings: Map<number, Building>;
  nodes: Map<number, ResourceNode>;
}

function buildTickIndex(s: GameState): TickIndex {
  const units = new Map<number, Unit>();
  for (const u of s.units) units.set(u.id, u);
  const buildings = new Map<number, Building>();
  for (const b of s.buildings) buildings.set(b.id, b);
  const nodes = new Map<number, ResourceNode>();
  for (const n of s.nodes) nodes.set(n.id, n);
  return { units, buildings, nodes };
}

export function createSession(
  names: string[],
  seed: number,
  playerIds?: number[],
  daySeconds?: number,
  nightSeconds?: number,
  mapId: MapPresetId = DEFAULT_MAP_ID,
): Session {
  const state = createGameState(names, seed, playerIds, daySeconds, nightSeconds, mapId);
  const map = generateMap(mapId); // determinístico — mesmo resultado do client
  return { state, map, commandSeq: {}, navigation: new Navigation(state, map) };
}

// ---------- helpers ----------

function dist(ax: number, az: number, bx: number, bz: number): number {
  const dx = ax - bx, dz = az - bz;
  return Math.sqrt(dx * dx + dz * dz);
}

function unitById(s: GameState, id: number): Unit | undefined {
  return s.units.find((u) => u.id === id && !u.dead);
}

function buildingById(s: GameState, id: number): Building | undefined {
  return s.buildings.find((b) => b.id === id);
}

function nextEntityId(s: GameState): number {
  // Contador O(1). Inicializado acima de todos os ids existentes em createGameState.
  const id = s.nextId ?? 1001;
  s.nextId = id + 1;
  return id;
}

export function buildingHalf(b: Pick<Building, 'kind'>): number {
  return BUILDING_SIZE[b.kind] / 2;
}

/** Verifica se uma construção pode ser colocada em (x, z) */
export function canPlace(session: Session, kind: BuildKind, x: number, z: number): boolean {
  return canPlaceBuilding(session.map, session.state, kind, x, z);
}

/** O jogador atende ao pré-requisito de nível? (seção 32) */
export function meetsPrerequisite(
  state: { buildings: ReadonlyArray<Pick<Building, 'kind' | 'owner' | 'done' | 'level'>> },
  playerId: number,
  prereq: SpecPrerequisite,
): boolean {
  if (!prereq) return true;
  if (prereq.wallLevel !== undefined) {
    return state.buildings.some((b) => b.owner === playerId && b.kind === 'wall' && b.done && b.level >= prereq.wallLevel!);
  }
  if (prereq.marketLevel !== undefined) {
    // O projeto ainda não possui o Mercado como construção (A CONFIRMAR); até
    // a definição, a verificação nunca é satisfeita.
    return state.buildings.some((b) => b.owner === playerId && (b.kind as string) === 'market' && b.done && b.level >= prereq.marketLevel!);
  }
  return true;
}

function canPay(p: PlayerState, cost: { wood?: number; gold?: number } | null): boolean {
  return !!cost && p.wood >= (cost.wood ?? 0) && p.gold >= (cost.gold ?? 0);
}

function pay(p: PlayerState, cost: { wood?: number; gold?: number }): void {
  p.wood -= cost.wood ?? 0;
  p.gold -= cost.gold ?? 0;
}

/**
 * Upgrade atômico (seções 4, 5, 12 e 32): valida posse, obra concluída, existência
 * do próximo nível, pré-requisito e recursos ANTES de descontar. Retorna `true`
 * quando o upgrade foi aplicado.
 */
function tryUpgradeBuilding(s: GameState, playerId: number, b: Building): boolean {
  if (!b.done) return false;
  // A Cripta é neutra (owner -1) e pertence ao Vampiro; as demais exigem posse.
  if (b.kind !== 'crypt' && b.owner !== playerId) return false;
  const p = s.players.find((pl) => pl.id === playerId);
  if (!p) return false;
  const next = b.level + 1;
  if (b.kind === 'bank') {
    const level = GAME_CONFIG.spec.bankLevels[next];
    if (!level || !canPay(p, level.upgradeCost) || !meetsPrerequisite(s, playerId, level.prerequisite)) return false;
    pay(p, level.upgradeCost!);
    b.level = next;
    b.goldAcc = 0;
    return true;
  }
  if (b.kind === 'wall') {
    const level = GAME_CONFIG.spec.wallLevels[next];
    if (!level || !canPay(p, level.cost)) return false;
    pay(p, level.cost);
    const oldMax = b.maxHp;
    b.level = next;
    b.maxHp = level.hp;
    // Preserva o dano atual: soma a diferença do novo nível.
    b.hp = Math.min(b.maxHp, b.hp + (b.maxHp - oldMax));
    return true;
  }
  if (b.kind === 'tower') {
    const level = GAME_CONFIG.spec.towerLevels[next];
    if (!level || !canPay(p, level.cost)) return false;
    pay(p, level.cost);
    b.level = next;
    return true;
  }
  if (b.kind === 'market') {
    if (b.level >= MARKET_MAX_LEVEL) return false;
    const cost = marketUpgradeCost(b.level);
    if (!cost || !canPay(p, cost)) return false;
    pay(p, cost);
    b.level = next;
    return true;
  }
  if (b.kind === 'crypt') {
    // A Cripta pertence ao Vampiro e evolui com SANGUE (seção 19 adaptada).
    if (playerId !== VAMPIRE_PLAYER_ID) return false;
    const cost = SPEC_CRYPT.upgradeCosts[next];
    if (cost == null || s.vampire.blood < cost) return false;
    s.vampire.blood -= cost;
    b.level = next;
    b.goldAcc = 0;
    return true;
  }
  return false;
}

// ---------- trabalhadores (seções 7–11) ----------

/** Nível de pesquisa da função para o jogador (1 = inicial). */
function playerWorkerLevel(s: GameState, owner: number, role: WorkerRole): number {
  const p = s.players.find((pl) => pl.id === owner);
  return Math.max(1, p?.workerLevels?.[role] ?? 1);
}

/**
 * Só trabalhadores especializados coletam: Lenhador → madeira, Minerador → ouro.
 * O Humano (herói, sem papel) e o Reparador não coletam.
 */
function canGatherRole(role: WorkerRole | undefined, resource: ResourceKind): boolean {
  if (role === 'lumberjack') return resource === 'wood';
  if (role === 'miner') return resource === 'gold';
  return false;
}

function canRepairRole(role: WorkerRole | undefined): boolean {
  return role === undefined || role === 'repairer';
}

/**
 * Construtores: o Humano (herói) e o Minerador. Lenhador e Reparador não constroem.
 * Cada um tem sua especialidade — o Minerador só ergue a Mina; o Humano, o resto.
 */
export function canBuildUnit(u: { hero?: boolean; workerRole?: WorkerRole }): boolean {
  return u.hero === true || u.workerRole === 'miner';
}

/** A Mina de Ouro é exclusiva do Minerador; as demais construções são exclusivas do Humano. */
export function canBuildKind(u: { hero?: boolean; workerRole?: WorkerRole }, kind: BuildKind | string): boolean {
  if (kind === 'goldMine') return u.workerRole === 'miner';
  return u.hero === true;
}

function countRole(s: GameState, owner: number, role: WorkerRole): number {
  return s.units.filter((u) => !u.dead && u.owner === owner && u.kind === 'worker' && u.workerRole === role).length;
}

// ---------- state machine do Vampiro (seção 26) ----------

/** Segundos restantes de um status do Vampiro (0 = inativo). */
export function vampireStatus(s: GameState, status: VampireStatus): number {
  return s.vampire.statuses?.[status] ?? 0;
}

/** Aplica um status, sem reduzir uma duração já maior (não elimina outros). */
export function setVampireStatus(s: GameState, status: VampireStatus, duration: number): void {
  s.vampire.statuses = { ...(s.vampire.statuses ?? {}), [status]: Math.max(vampireStatus(s, status), duration) };
}

/** Enredar permite andar e usar habilidades, mas não atacar (seção 25). */
export function vampireCanAttack(s: GameState): boolean {
  return vampireStatus(s, 'entangled') <= 0;
}

/** Silenciador impede apenas habilidades; ataques e movimento continuam (seção 25). */
export function vampireCanCast(s: GameState): boolean {
  return vampireStatus(s, 'silenced') <= 0;
}

/** Forma de Morcego e a canalização de Teleport são estados mutuamente exclusivos. */
export function vampireInBatForm(s: GameState): boolean {
  return vampireStatus(s, 'batForm') > 0 || vampireStatus(s, 'exitingBatForm') > 0;
}

/** Durante o estado principal de Forma de Morcego o Vampiro é invulnerável (seção 16). */
export function vampireInvulnerable(s: GameState): boolean {
  return vampireStatus(s, 'batForm') > 0;
}

/** Remove um status imediatamente (ex.: cancelamento manual da Forma de Morcego). */
export function clearVampireStatus(s: GameState, status: VampireStatus): void {
  if (s.vampire.statuses) delete s.vampire.statuses[status];
}

// TODO(A CONFIRMAR): raio de Revelar Área não definido; valor provisório neutro.
const DEFAULT_REVEAL_RADIUS = 30;

/** Posição da base do Vampiro via sistema existente (cripta / spawn), sem coordenada fixa. */
function vampireBasePosition(s: GameState): { x: number; z: number } {
  const crypt = s.buildings.find((b) => b.kind === 'crypt' && b.done);
  if (crypt) return { x: crypt.x, z: crypt.z };
  return {
    x: CRYPT_POSITION.x + GAME_CONFIG.map.vampireSpawnOffset.x * MAP_SCALE,
    z: CRYPT_POSITION.z + GAME_CONFIG.map.vampireSpawnOffset.z * MAP_SCALE,
  };
}

/** Política de arredondamento do sangue por dano (seção 18; centralizada). */
function roundBlood(value: number): number {
  const policy = SPEC_ROUNDING_POLICY.policy;
  if (policy === 'ceil') return Math.ceil(value);
  if (policy === 'round') return Math.round(value);
  if (policy === 'none') return value;
  // TODO(A CONFIRMAR): sem política definida, usa truncamento (compatível com 256→204).
  return Math.floor(value);
}

/** O Vampiro recebe sangue ao causar dano (seção 18 adaptada à moeda do projeto). */
function creditVampireBloodFromDamage(s: GameState, damage: number): void {
  s.vampire.blood += roundBlood(damage * SPEC_BLOOD_PER_DAMAGE);
}

/** Compra/avança um item do Vampiro pagando com sangue. Retorna true se aplicou. */
function buyVampireItem(s: GameState, owner: number, itemId: VampireItemId): boolean {
  const owned = s.vampire.items[itemId] ?? 0;
  const next = vampireItemNextLevel(itemId, owned);
  if (next == null) return false;
  const cost = vampireItemCost(itemId, owned);
  if (cost == null || s.vampire.blood < cost) return false;
  s.vampire.blood -= cost;
  s.vampire.items[itemId] = next;
  // A vida aplica apenas a diferença do bônus (dano/vida anteriores preservados).
  const vampire = s.units.find((u) => u.kind === 'vampire' && u.owner === owner && !u.dead);
  if (vampire && itemId === 'health') {
    const delta = vampireItemBonus('health', next) - vampireItemBonus('health', owned);
    vampire.maxHp += delta;
    vampire.hp = Math.min(vampire.maxHp, vampire.hp + delta);
  }
  return true;
}

function completeVampireTeleport(s: GameState): void {
  const vampire = s.units.find((u) => u.kind === 'vampire' && !u.dead);
  if (vampire) {
    const base = vampireBasePosition(s);
    vampire.x = base.x;
    vampire.z = base.z;
    vampire.order = null;
    vampire.gatherNodeId = null;
  }
  clearVampireStatus(s, 'channelingTeleport');
}

// ---------- comandos ----------

export function applyCommand(session: Session, playerId: number, cmd: Command): void {
  const s = session.state;
  if (s.result) return;

  switch (cmd.type) {
    case 'buyVampireItem': {
      if (playerId !== VAMPIRE_PLAYER_ID || !VAMPIRE_ITEM_IDS.includes(cmd.itemId)) return;
      const vampire = s.units.find(u => u.kind === 'vampire' && u.owner === playerId && !u.dead);
      const crypt = buildingById(s, cmd.cryptId);
      if (!vampire || vampireShopAccess(s.phase, vampire, crypt)) return;
      buyVampireItem(s, playerId, cmd.itemId);
      break;
    }
    case 'upgradeVampireItem': {
      // Melhorar um item já possuído também exige a cripta (dia + proximidade).
      // A HUD do Vampiro não oferece mais esse atalho.
      if (playerId !== VAMPIRE_PLAYER_ID || !VAMPIRE_ITEM_IDS.includes(cmd.itemId)) return;
      if ((s.vampire.items[cmd.itemId] ?? 0) < 1) return;
      const vampire = s.units.find(u => u.kind === 'vampire' && u.owner === playerId && !u.dead);
      const crypt = s.buildings.find((b) => b.kind === 'crypt');
      if (!vampire || vampireShopAccess(s.phase, vampire, crypt)) return;
      buyVampireItem(s, playerId, cmd.itemId);
      break;
    }
    case 'buyVampireSkill': {
      if (playerId !== VAMPIRE_PLAYER_ID || !Object.hasOwn(VAMPIRE_SKILLS, cmd.skillId)) return;
      const vampire = s.units.find(u => u.kind === 'vampire' && u.owner === playerId && !u.dead);
      // Skills são desbloqueadas apenas na cripta (a base do vampiro).
      const crypt = buildingById(s, cmd.cryptId);
      if (!vampire || !crypt || crypt.kind !== 'crypt') return;
      if (vampireShopAccess(s.phase, vampire, crypt)) return;
      const skill = VAMPIRE_SKILLS[cmd.skillId];
      if (s.vampire.skills[cmd.skillId] || s.vampire.blood < skill.unlockCost) return;
      s.vampire.blood -= skill.unlockCost;
      s.vampire.skills[cmd.skillId] = { cd: 0, buff: 0 };
      break;
    }
    case 'castVampireSkill': {
      if (playerId !== VAMPIRE_PLAYER_ID || !Object.hasOwn(VAMPIRE_SKILLS, cmd.skillId)) return;
      const vampire = s.units.find(u => u.kind === 'vampire' && u.owner === playerId && !u.dead);
      const state = s.vampire.skills[cmd.skillId];
      if (!vampire || !state || state.cd > 0) return;
      // Silenciador impede a ativação de habilidades (seção 2.4).
      if (!vampireCanCast(s)) return;
      const skill = VAMPIRE_SKILLS[cmd.skillId];
      state.buff = skill.duration;
      state.cd = skill.cooldown;
      break;
    }
    case 'castVampireAbility': {
      if (playerId !== VAMPIRE_PLAYER_ID) return;
      const vampire = s.units.find(u => u.kind === 'vampire' && u.owner === playerId && !u.dead);
      if (!vampire || !Object.hasOwn(VAMPIRE_ABILITIES, cmd.ability)) return;
      // Silenciador bloqueia habilidades do Vampiro (seção 25).
      if (!vampireCanCast(s)) return;
      if (cmd.ability === 'revealArea') {
        // 1 uso por noite, sem acúmulo; reset no início da noite (seção 15).
        if (s.phase !== 'night' || (s.vampire.revealUses ?? 0) <= 0) return;
        if (!Number.isFinite(cmd.x) || !Number.isFinite(cmd.z)) return;
        const ability = VAMPIRE_ABILITIES.revealArea;
        s.vampire.reveal = {
          x: cmd.x!, z: cmd.z!, remaining: ability.duration,
          radius: ability.radius ?? DEFAULT_REVEAL_RADIUS,
        };
        s.vampire.revealUses = (s.vampire.revealUses ?? 0) - 1;
      } else if (cmd.ability === 'batForm') {
        if (vampireInBatForm(s)) {
          // Cancelamento manual é A CONFIRMAR; só cancela se configurado.
          if (VAMPIRE_ABILITIES.batForm.cancellable === true) clearVampireStatus(s, 'batForm');
          return;
        }
        setVampireStatus(s, 'batForm', VAMPIRE_ABILITIES.batForm.maxDuration);
      } else if (cmd.ability === 'teleportHome') {
        if (vampireStatus(s, 'channelingTeleport') > 0) return;
        setVampireStatus(s, 'channelingTeleport', VAMPIRE_ABILITIES.teleportHome.channelTime);
      } else {
        return;
      }
      break;
    }
    case 'admin': {
      // A flag é definida pelo servidor ao iniciar uma sala com um único jogador.
      if (!s.practice) return;
      const player = s.players.find(p => p.id === playerId);
      if (!player) return;
      if (cmd.action === 'resources') {
        if (![cmd.wood, cmd.gold].every(n => Number.isSafeInteger(n) && n >= 0 && n <= GAME_CONFIG.admin.maxResourceAmount)) return;
        player.wood += cmd.wood;
        player.gold += cmd.gold;
      } else if (cmd.action === 'blood') {
        if (playerId !== VAMPIRE_PLAYER_ID) return;
        if (!Number.isSafeInteger(cmd.amount) || cmd.amount < 0 || cmd.amount > GAME_CONFIG.admin.maxResourceAmount) return;
        s.vampire.blood += cmd.amount;
      } else if (cmd.action === 'phase' && (cmd.phase === 'day' || cmd.phase === 'night')) {
        s.phase = cmd.phase;
        s.phaseTime = cmd.phase === 'day' ? s.daySeconds : s.nightSeconds;
        if (cmd.phase === 'night') s.vampire.revealUses = 1;
      } else if (cmd.action === 'heal') {
        for (const unit of s.units) if (unit.owner === playerId && !unit.dead) unit.hp = unit.maxHp;
      }
      break;
    }
    case 'move': {
      if (!Number.isFinite(cmd.x) || !Number.isFinite(cmd.z)) return;
      const units = s.units.filter(u => !u.dead && u.owner === playerId && cmd.ids.includes(u.id));
      const width = Math.ceil(Math.sqrt(units.length));
      for (const [i, u] of units.entries()) {
          const x = Math.max(-WORLD.half + 1, Math.min(WORLD.half - 1, cmd.x + (i % width - (width - 1) / 2) * INTERACTION.formationSpacing));
          const z = Math.max(-WORLD.half + 1, Math.min(WORLD.half - 1, cmd.z + (Math.floor(i / width) - (Math.ceil(units.length / width) - 1) / 2) * INTERACTION.formationSpacing));
          u.order = { t: 'move', x, z };
          u.gatherNodeId = null;
      }
      break;
    }
    case 'gather': {
      const node = s.nodes.find((n) => n.id === cmd.nodeId && n.amount > 0);
      const mine = node ? undefined : s.buildings.find((b) => b.id === cmd.nodeId && b.kind === 'goldMine' && b.done && b.hp > 0 && b.owner === playerId);
      if (!node && !mine) return;
      const resource: ResourceKind = node ? node.kind : 'gold';
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId && u.kind === 'worker' && canGatherRole(u.workerRole, resource)) {
          u.order = { t: 'gather', targetId: cmd.nodeId };
          u.gatherNodeId = cmd.nodeId;
        }
      }
      break;
    }
    case 'attack': {
      const target = unitById(s, cmd.targetId) ?? buildingById(s, cmd.targetId);
      if (!target) return;
      if (target.owner < 0 || (target.owner === VAMPIRE_PLAYER_ID) === (playerId === VAMPIRE_PLAYER_ID)) return;
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId) {
          u.order = { t: 'attack', targetId: cmd.targetId };
        }
      }
      break;
    }
    case 'build': {
      if (!BUILDABLE.includes(cmd.kind)) return;
      const p = s.players.find((pl) => pl.id === playerId);
      if (!p || p.role !== 'human') return;
      // Só o Humano e o Minerador constroem (Lenhador/Reparador não), e cada um
      // só ergue o que lhe cabe: Minerador → Mina; Humano → demais construções.
      const builders = s.units.filter(u => !u.dead && u.owner === playerId && u.kind === 'worker'
        && cmd.ids.includes(u.id) && canBuildKind(u, cmd.kind));
      if (!builders.length) return;
      const cost = BUILD_COSTS[cmd.kind];
      if (!cost) return;
      // Limite por jogador (seção 28). Conta também obras em andamento.
      const limit = (SPEC_ENTITY_LIMITS as Record<string, number | undefined>)[cmd.kind];
      if (limit !== undefined && s.buildings.filter((b) => b.owner === playerId && b.kind === cmd.kind).length >= limit) return;
      if (p.wood < cost.wood || p.gold < cost.gold) return;
      if (!canPlace(session, cmd.kind, cmd.x, cmd.z)) return;
      p.wood -= cost.wood;
      p.gold -= cost.gold;
      const hpByKind: Record<string, number> = {
        bank: BANK.hp,
        taverna: TAVERNA.hp,
        wall: WALL.hp,
        tower: TOWER.hp,
        keep: KEEP.hp,
        goldMine: GAME_CONFIG.buildings.goldMine.hp,
        market: GAME_CONFIG.buildings.market.hp,
      };
      const b: Building = {
        id: nextEntityId(s),
        kind: cmd.kind,
        owner: playerId,
        x: cmd.x,
        z: cmd.z,
        hp: 1,
        maxHp: hpByKind[cmd.kind] ?? 100,
        level: 1,
        progress: 0,
        done: false,
        builderId: builders[0]!.id,
        goldAcc: 0,
        attackCd: 0,
      };
      s.buildings.push(b);
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId && u.kind === 'worker' && canBuildKind(u, cmd.kind)) {
          u.order = { t: 'build', targetId: b.id };
          u.gatherNodeId = null;
        }
      }
      break;
    }
    case 'resumeBuild': {
      const site = buildingById(s, cmd.targetId);
      if (!site || site.done || site.owner !== playerId) return;
      for (const u of s.units) {
        if (!u.dead && u.owner === playerId && u.kind === 'worker' && cmd.ids.includes(u.id) && canBuildKind(u, site.kind)) {
          u.order = { t: 'build', targetId: site.id };
          u.gatherNodeId = null;
        }
      }
      break;
    }
    case 'demolish': {
      // Somente o Humano destrói construções que ele mesmo ergueu. A Cripta é
      // neutra (owner -1) e, portanto, nunca passa por esta validação.
      const p = s.players.find((pl) => pl.id === playerId);
      if (!p || p.role !== 'human') return;
      const b = buildingById(s, cmd.targetId);
      if (!b || b.owner !== playerId) return;
      // Libera unidades que trabalhavam na construção (obra, reparo ou coleta).
      for (const u of s.units) {
        if (u.dead || u.owner !== playerId) continue;
        if (u.order?.targetId === b.id || u.gatherNodeId === b.id) {
          u.order = null;
          u.gatherNodeId = null;
        }
      }
      s.buildings = s.buildings.filter((bb) => bb.id !== b.id);
      break;
    }
    case 'repair': {
      const wall = buildingById(s, cmd.targetId);
      if (!wall || !wall.done || wall.owner !== playerId || wall.kind !== 'wall') return;
      // A ordem pode ser dada mesmo com o muro cheio: a unidade fica de prontidão
      // e repara sozinha quando ele levar dano (evita reclicar a cada golpe).
      let any = false;
      for (const u of s.units) {
        if (!u.dead && u.owner === playerId && u.kind === 'worker' && cmd.ids.includes(u.id) && canRepairRole(u.workerRole)) {
          u.order = { t: 'repair', targetId: wall.id };
          u.gatherNodeId = null;
          any = true;
        }
      }
      if (!any) return;
      break;
    }
    case 'upgrade': {
      const b = buildingById(s, cmd.targetId);
      if (b) tryUpgradeBuilding(s, playerId, b);
      break;
    }
    case 'recruit': {
      const player = s.players.find(p => p.id === playerId && p.role === 'human');
      const tavern = buildingById(s, cmd.targetId);
      if (!player || !tavern || tavern.owner !== playerId || tavern.kind !== 'taverna' || !tavern.done || tavern.recruitment) return;
      const role: WorkerRole = cmd.role ?? 'lumberjack';
      if (role !== 'lumberjack' && role !== 'miner' && role !== 'repairer') return;
      // Limite por função (seção 28).
      if (countRole(s, playerId, role) >= SPEC_ENTITY_LIMITS[role]) return;
      const cost = workerTrainCost(role);
      if (player.gold < (cost.gold ?? 0) || player.wood < (cost.wood ?? 0)) return;
      player.gold -= cost.gold ?? 0;
      player.wood -= cost.wood ?? 0;
      const time = role === 'repairer' ? repairerTrainingTime(playerWorkerLevel(s, playerId, 'repairer')) : RECRUIT.time;
      tavern.recruitment = { remaining: time, total: time, role };
      break;
    }
    case 'upgradeWorker': {
      const player = s.players.find(p => p.id === playerId && p.role === 'human');
      const tavern = buildingById(s, cmd.targetId);
      if (!player || !tavern || tavern.owner !== playerId || tavern.kind !== 'taverna' || !tavern.done) return;
      const role = cmd.role;
      if (role !== 'lumberjack' && role !== 'miner' && role !== 'repairer') return;
      const level = playerWorkerLevel(s, playerId, role);
      if (level >= workerMaxLevel(role)) return;
      const cost = workerUpgradeCost(role, level);
      if (!cost || player.gold < (cost.gold ?? 0) || player.wood < (cost.wood ?? 0)) return;
      player.gold -= cost.gold ?? 0;
      player.wood -= cost.wood ?? 0;
      player.workerLevels = { ...(player.workerLevels ?? {}), [role]: level + 1 };
      break;
    }
    case 'castHumanAbility': {
      const player = s.players.find(p => p.id === playerId && p.role === 'human');
      const hero = s.units.find(u => u.owner === playerId && u.kind === 'worker' && u.hero && !u.dead);
      if (!player || !hero || !Object.hasOwn(HUMAN_ABILITIES, cmd.ability)) return;
      if ((player.abilityCooldowns?.[cmd.ability] ?? 0) > 0) return;
      const ability = HUMAN_ABILITIES[cmd.ability];
      const vampire = s.units.find(u => u.kind === 'vampire' && !u.dead);
      // TODO(A CONFIRMAR): alcance de Enredar/Silenciador não definido; sem alcance, aceita o alvo.
      const inRange = (target: { x: number; z: number }): boolean =>
        ability.range == null || dist(hero.x, hero.z, target.x, target.z) <= ability.range;
      if (cmd.ability === 'entangle' || cmd.ability === 'silencer') {
        if (!vampire || cmd.targetId !== vampire.id || !inRange(vampire)) return;
        if (cmd.ability === 'silencer') {
          setVampireStatus(s, 'silenced', ability.duration ?? 0);
          // Silenciar interrompe a canalização em andamento: sem isso, um
          // Teleport para a Base já iniciado concluía mesmo com o vampiro
          // silenciado (seção 17/25).
          if (vampireStatus(s, 'channelingTeleport') > 0) clearVampireStatus(s, 'channelingTeleport');
        } else {
          setVampireStatus(s, 'entangled', ability.duration ?? 0);
        }
      } else if (cmd.ability === 'fortify') {
        const target = unitById(s, cmd.targetId ?? -1) ?? buildingById(s, cmd.targetId ?? -1);
        if (!target || target.owner !== playerId) return;
        target.fortify = Math.max(target.fortify ?? 0, ability.duration ?? 0);
      } else if (cmd.ability === 'teleport') {
        if (!Number.isFinite(cmd.x) || !Number.isFinite(cmd.z)) return;
        if (dist(hero.x, hero.z, cmd.x!, cmd.z!) > (ability.maxRange ?? 0)) return;
        if (!session.navigation.canStand(hero, cmd.x!, cmd.z!)) return;
        hero.x = cmd.x!;
        hero.z = cmd.z!;
        hero.order = null;
        hero.gatherNodeId = null;
      } else {
        return;
      }
      player.abilityCooldowns = { ...(player.abilityCooldowns ?? {}), [cmd.ability]: ability.cooldown };
      break;
    }
    case 'market': {
      const p = s.players.find((pl) => pl.id === playerId);
      if (!p || p.role !== 'human') return;
      // A troca de recursos só funciona no Mercado (seção 3).
      const market = buildingById(s, cmd.targetId);
      if (!market || market.kind !== 'market' || market.owner !== playerId || !market.done) return;
      if (!Number.isSafeInteger(cmd.amount) || cmd.amount <= 0) return;
      const selling = cmd.trade === 'woodToGold';
      if (!selling && cmd.trade !== 'goldToWood') return;
      const units = Math.floor(cmd.amount / (selling ? MARKET.wood : MARKET.gold));
      if (units <= 0) return;
      if (selling && p.wood >= units * MARKET.wood) {
        p.wood -= units * MARKET.wood;
        p.gold += units * MARKET.gold;
      } else if (!selling && p.gold >= units * MARKET.gold) {
        p.gold -= units * MARKET.gold;
        p.wood += units * MARKET.wood;
      }
      break;
    }
  }
}

// ---------- sistemas ----------

function updatePhase(s: GameState, dt: number): void {
  s.phaseTime -= dt;
  if (s.phaseTime > 0) return;

  if (s.phase === 'day') {
    s.phase = 'night';
    s.phaseTime = s.nightSeconds;
    // Revelar Área volta a 1 uso exatamente ao começar a noite (seção 15).
    s.vampire.revealUses = 1;
  } else {
    // amanhecer: sobreviver à noite (ou às noites configuradas) vence o jogo.
    s.phase = 'day';
    s.phaseTime = s.daySeconds;
    s.day++;
    if (s.day > SURVIVE_NIGHTS_TO_WIN) {
      s.result = { winner: 'human', reason: SURVIVE_NIGHTS_TO_WIN === 1
        ? 'Os humanos sobreviveram à noite!'
        : `Os humanos sobreviveram a ${SURVIVE_NIGHTS_TO_WIN} noites!` };
    }
  }
}

function vampireSpeed(s: GameState): number {
  const base = vampireEffectiveSpeed(s.phase, s.vampire.items);
  // Forma de Morcego move mais rápido (bônus A CONFIRMAR; 0 quando não definido).
  const bonus = vampireInBatForm(s) ? (VAMPIRE_ABILITIES.batForm.moveSpeedBonus ?? 0) : 0;
  return base + bonus;
}

function vampireOutsideCrypt(s: GameState): boolean {
  if (s.phase === 'night') return false;
  const crypt = s.buildings.find((b) => b.kind === 'crypt');
  if (!crypt) return false;
  const vamp = s.units.find((u) => u.kind === 'vampire' && !u.dead);
  if (!vamp) return false;
  return dist(vamp.x, vamp.z, crypt.x, crypt.z) > CRYPT_RADIUS;
}

/** O Vampiro está sobre a cripta? (usa a distância real, independente da fase). */
function vampireAtCrypt(s: GameState): boolean {
  const crypt = s.buildings.find((b) => b.kind === 'crypt');
  const vamp = s.units.find((u) => u.kind === 'vampire' && !u.dead);
  if (!crypt || !vamp) return false;
  return dist(vamp.x, vamp.z, crypt.x, crypt.z) <= CRYPT_RADIUS;
}

function updateGather(s: GameState, nav: Navigation, u: Unit, dt: number, index: TickIndex): void {
  const stats = workerStats(u);
  const rawNode = index.nodes.get(u.gatherNodeId ?? -1);
  const node = rawNode && rawNode.amount > 0 ? rawNode : undefined;
  // Mina de Ouro concluída do próprio jogador é uma fonte de ouro (seção 10).
  const rawMine = node ? undefined : index.buildings.get(u.gatherNodeId ?? -1);
  const mine = rawMine && rawMine.kind === 'goldMine' && rawMine.done && rawMine.hp > 0 && rawMine.owner === u.owner
    ? rawMine : undefined;
  if (!node && !mine) {
    u.order = null;
    u.gatherNodeId = null;
    u.carrying = 0;
    u.carryRes = null;
    return;
  }
  const resource: ResourceKind = node ? node.kind : 'gold';
  const target = node ?? mine!;
  const range = resource === 'wood' ? INTERACTION.woodGatherRange : INTERACTION.goldGatherRange;
  // A Mina é uma construção: o alcance é medido a partir da borda dela.
  const half = mine ? buildingHalf(mine) : 0;
  if (!nav.move(u, target.x, target.z, stats.speed, dt, range, half)) return;
  u.activity = 'gathering';
  u.carryRes = resource;
  // Taxa por função: Lenhador usa a progressão (amount/interval); Minerador usa
  // a mina; o herói sem papel mantém a taxa base do projeto.
  const rate = u.workerRole === 'lumberjack' && resource === 'wood'
    ? lumberjackGatherRate(playerWorkerLevel(s, u.owner, 'lumberjack'))
    : u.workerRole === 'miner' && mine
      ? minerGoldRate(mine.level)
      : stats.gatherRate;
  // Vai direto para o total do jogador, 1 a 1 — sem segurar carga na unidade.
  u.carrying += rate * dt;
  const whole = Math.floor(u.carrying + 1e-9);
  if (whole > 0) {
    const p = s.players.find((pl) => pl.id === u.owner);
    if (p) p[resource] = Math.round((p[resource] + whole) * 1e6) / 1e6;
    u.carrying -= whole;
  }
}

function updateAttackOrder(s: GameState, nav: Navigation, u: Unit, dt: number, index: TickIndex): void {
  const stats = workerStats(u);
  const rawUnit = index.units.get(u.order?.targetId ?? -1);
  const targetUnit = rawUnit && !rawUnit.dead ? rawUnit : undefined;
  const targetBuilding = index.buildings.get(u.order?.targetId ?? -1);
  const tx = targetUnit ? targetUnit.x : targetBuilding?.x;
  const tz = targetUnit ? targetUnit.z : targetBuilding?.z;
  if (tx === undefined || tz === undefined) {
    u.order = null;
    return;
  }
  const range = u.kind === 'vampire' ? VAMPIRE.attackRange : stats.attackRange;
  if (!nav.move(u, tx, tz, u.kind === 'vampire' ? vampireSpeed(s) : stats.speed, dt,
      range, targetBuilding ? buildingHalf(targetBuilding) : 0)) {
    return; // ainda andando
  }
  u.activity = 'attacking';
  if (u.attackCd > 0) return;
  u.attackCd = u.kind === 'vampire' ? vampireEffectiveCooldown(s.vampire.items) : stats.attackCooldown;

  // O Vampiro tem um único dano (seção 13): vale para unidades e construções,
  // somando itens e Golpe Sombrio e sofrendo o redutor diurno.
  const vampireDamage = (VAMPIRE.attackDamage + vampireItemBonuses(s.vampire.items).damage)
    * vampireSkillMultiplier(s.vampire.skills) * (s.phase === 'night' ? 1 : VAMPIRE.dayDamageMultiplier);
  const dmg = u.kind === 'vampire' ? vampireDamage : stats.attackDamage;

  if (targetUnit) {
    // Fortificar torna o alvo invulnerável (seção 2.2): o golpe acontece, mas sem dano.
    if ((targetUnit.fortify ?? 0) > 0) return;
    // Forma de Morcego também é invulnerável (seção 16).
    if (targetUnit.kind === 'vampire' && vampireInvulnerable(s)) return;
    targetUnit.hp -= dmg;
    // Sangue por dano (seção 18 adaptada): substitui o antigo bloodPerHit.
    if (u.kind === 'vampire') creditVampireBloodFromDamage(s, dmg);
    if (targetUnit.hp <= 0) {
      targetUnit.dead = true;
      if (targetUnit.kind === 'vampire') {
        s.result = { winner: 'human', reason: 'O vampiro foi destruído pelos humanos!' };
      }
    }
  } else if (targetBuilding) {
    if ((targetBuilding.fortify ?? 0) > 0) return;
    targetBuilding.hp -= dmg;
    // Sangue por dano (seção 18 adaptada): substitui o antigo bloodPerHit.
    if (u.kind === 'vampire') creditVampireBloodFromDamage(s, dmg);
    if (targetBuilding.hp <= 0) {
      if (targetBuilding.kind === 'crypt') return; // cripta indestrutível
      s.buildings = s.buildings.filter((b) => b.id !== targetBuilding.id);
      index.buildings.delete(targetBuilding.id);
    }
  }
}

function updateBuild(s: GameState, nav: Navigation, u: Unit, dt: number, index: TickIndex): void {
  const stats = workerStats(u);
  const site = index.buildings.get(u.order?.targetId ?? -1);
  if (!site || site.done) {
    u.order = null;
    return;
  }
  if (!nav.move(u, site.x, site.z, stats.speed, dt, INTERACTION.buildRange, buildingHalf(site))) return;
  u.activity = 'building';
  const totalWork = BUILD_COSTS[site.kind as BuildKind]?.time ?? 10;
  site.progress += (stats.buildRate * dt) / totalWork;
  site.hp = Math.max(site.hp, site.maxHp * site.progress);
  if (site.progress >= 1) {
    site.progress = 1;
    site.done = true;
    site.hp = site.maxHp;
    // A Mina de Ouro recém-construída já começa a extração com o Minerador que a ergueu.
    if (site.kind === 'goldMine' && u.workerRole === 'miner') {
      u.order = { t: 'gather', targetId: site.id };
      u.gatherNodeId = site.id;
    } else {
      u.order = null;
    }
  }
}

function updateRepair(s: GameState, nav: Navigation, u: Unit, dt: number, index: TickIndex): void {
  const stats = workerStats(u);
  const wall = index.buildings.get(u.order?.targetId ?? -1);
  if (!wall || !wall.done || wall.kind !== 'wall') {
    u.order = null;
    return;
  }
  // Vai até o muro e permanece de prontidão. A ordem só é mantida para que a
  // unidade repare automaticamente assim que o muro levar dano.
  if (!nav.move(u, wall.x, wall.z, stats.speed, dt, INTERACTION.buildRange, buildingHalf(wall))) return;
  if (wall.hp >= wall.maxHp) {
    u.activity = 'idle';
    return;
  }
  u.activity = 'repairing';
  // Reparador escala com a pesquisa da função; o herói (sem papel) usa o nível 1.
  const level = u.workerRole === 'repairer' ? playerWorkerLevel(s, u.owner, 'repairer') : 1;
  wall.hp = Math.min(wall.maxHp, wall.hp + repairerRepairRate(level) * stats.buildRate * dt);
}

/** De dia, o vampiro não pode se afastar da cripta */
function clampVampireToCrypt(s: GameState): void {
  if (s.phase === 'night') return;
  const crypt = s.buildings.find((b) => b.kind === 'crypt');
  const vamp = s.units.find((u) => u.kind === 'vampire' && !u.dead);
  if (!crypt || !vamp) return;
  const dx = vamp.x - crypt.x;
  const dz = vamp.z - crypt.z;
  const d = Math.hypot(dx, dz);
  if (d > CRYPT_RADIUS) {
    vamp.x = crypt.x + (dx / d) * CRYPT_RADIUS;
    vamp.z = crypt.z + (dz / d) * CRYPT_RADIUS;
  }
}

function updateUnits(session: Session, dt: number, index: TickIndex): void {
  const s = session.state;
  const nav = session.navigation;
  nav.refresh();
  const vampOut = vampireOutsideCrypt(s);

  // Recargas das habilidades do Humano (seção 27).
  for (const p of s.players) {
    if (!p.abilityCooldowns) continue;
    for (const key of Object.keys(p.abilityCooldowns) as HumanAbilityId[]) {
      p.abilityCooldowns[key] = Math.max(0, (p.abilityCooldowns[key] ?? 0) - dt);
    }
  }

  for (const u of s.units) {
    if (u.dead) continue;
    u.activity = 'idle';
    nav.recover(u);
    u.attackCd = Math.max(0, u.attackCd - dt);
    if ((u.fortify ?? 0) > 0) u.fortify = Math.max(0, (u.fortify ?? 0) - dt);

    // vampiro de dia fora da cripta: não pode atacar
    const canAct = !(u.kind === 'vampire' && vampOut);
    // Enredar impede apenas o ataque (seção 2.1); os demais status coexistem.
    const canAttackStatus = u.kind !== 'vampire' || vampireCanAttack(s);

    if (u.kind === 'vampire') {
      // Decrementa todos os status ativos do Vampiro e trata as transições.
      const wasBatForm = vampireStatus(s, 'batForm') > 0;
      const wasChanneling = vampireStatus(s, 'channelingTeleport') > 0;
      if (s.vampire.statuses) {
        for (const key of Object.keys(s.vampire.statuses) as VampireStatus[]) {
          s.vampire.statuses[key] = Math.max(0, (s.vampire.statuses[key] ?? 0) - dt);
        }
      }
      // Ao terminar a Forma de Morcego, inicia a animação de retorno (seção 16).
      if (wasBatForm && vampireStatus(s, 'batForm') <= 0) {
        setVampireStatus(s, 'exitingBatForm', VAMPIRE_ABILITIES.batForm.exitDuration);
      }
      // Canalização concluída: teleporta para a base (seção 17).
      if (wasChanneling && vampireStatus(s, 'channelingTeleport') <= 0) {
        completeVampireTeleport(s);
      }
      // Revelar Área dura 10s e então termina (seção 15).
      if (s.vampire.reveal) {
        s.vampire.reveal.remaining -= dt;
        if (s.vampire.reveal.remaining <= 0) s.vampire.reveal = null;
      }
    }

    if (u.kind === 'vampire') {
      // Sobre a cripta a regeneração é quase instantânea; fora, só à noite e no
      // ritmo normal (independente da fase para achar a cripta).
      if (vampireAtCrypt(s)) u.hp = Math.min(u.maxHp, u.hp + VAMPIRE.cryptRegen * dt);
      else if (s.phase === 'night') u.hp = Math.min(u.maxHp, u.hp + VAMPIRE.nightRegen * dt);
    }
    if (u.kind === 'vampire') {
      for (const id of Object.keys(s.vampire.skills) as VampireSkillId[]) {
        const skill = s.vampire.skills[id]!;
        skill.cd = Math.max(0, skill.cd - dt);
        skill.buff = Math.max(0, skill.buff - dt);
      }
    }

    const o = u.order;
    if (!o) continue;
    if (!canAct && o.t !== 'move') {
      continue; // vampiro preso de dia
    }
    switch (o.t) {
      case 'move':
        if (nav.move(u, o.x!, o.z!, u.kind === 'vampire' ? vampireSpeed(s) : workerStats(u).speed, dt)) {
          u.order = null;
        }
        break;
      case 'gather':
        updateGather(s, nav, u, dt, index);
        break;
      case 'attack':
        if (canAct && canAttackStatus) updateAttackOrder(s, nav, u, dt, index);
        break;
      case 'build':
        updateBuild(s, nav, u, dt, index);
        break;
      case 'repair':
        updateRepair(s, nav, u, dt, index);
        break;
      case 'upgrade':
        u.order = null;
        break;
    }
  }
  nav.separate(s.units.filter(u => !u.dead));
  clampVampireToCrypt(s);
}

function updateEconomy(s: GameState, dt: number): void {
  for (const b of s.buildings) {
    if ((b.fortify ?? 0) > 0) b.fortify = Math.max(0, (b.fortify ?? 0) - dt);
    if (!b.done) continue;
    if (b.kind === 'bank') {
      // Ciclo de produção FIXO: entrega `bankProduction(level)` (1, 2, 4, 8…)
      // a cada `BANK_CYCLE_SECONDS`, sem acelerar o intervalo nos upgrades.
      b.goldAcc += dt;
      if (b.goldAcc + 1e-9 < BANK_CYCLE_SECONDS) continue;
      const cycles = Math.floor((b.goldAcc + 1e-9) / BANK_CYCLE_SECONDS);
      const whole = cycles * bankProduction(b.level);
      b.goldAcc -= cycles * BANK_CYCLE_SECONDS;
      const p = s.players.find((pl) => pl.id === b.owner);
      if (p) {
        p.gold += whole;
        b.goldProduced = (b.goldProduced ?? 0) + whole;
      }
    } else if (b.kind === 'crypt') {
      // A Cripta gera SANGUE para o Vampiro (seção 19 adaptada à moeda do projeto).
      // Ciclo FIXO, igual ao Banco: o upgrade aumenta o sangue por ciclo, não a frequência.
      b.goldAcc += dt;
      if (b.goldAcc + 1e-9 < CRYPT_CYCLE_SECONDS) continue;
      const cycles = Math.floor((b.goldAcc + 1e-9) / CRYPT_CYCLE_SECONDS);
      const whole = cycles * cryptProduction(b.level);
      b.goldAcc -= cycles * CRYPT_CYCLE_SECONDS;
      s.vampire.blood += whole;
      b.goldProduced = (b.goldProduced ?? 0) + whole;
    }
  }
}

function updateRecruitment(session: Session, dt: number) {
  const s = session.state;
  for (const tavern of s.buildings) {
    if (tavern.kind !== 'taverna' || !tavern.done || !tavern.recruitment) continue;
    tavern.recruitment.remaining = Math.max(0, tavern.recruitment.remaining - dt);
    if (tavern.recruitment.remaining > 1e-7) continue;
    const half = buildingHalf(tavern);
    let spawn: { x: number; z: number } | null = null;
    for (let r = half + 1; r <= half + INTERACTION.recruitSpawnExtraRadius && !spawn; r += 1) {
      for (let i = 0; i < 24; i++) {
        const angle = i * Math.PI / 12;
        const x = tavern.x + Math.sin(angle) * r, z = tavern.z + Math.cos(angle) * r;
        if (session.navigation.canStand({ kind: 'worker' }, x, z) &&
            !s.units.some(u => !u.dead && Math.hypot(u.x - x, u.z - z) < INTERACTION.recruitSpawnClearance)) { spawn = { x, z }; break; }
      }
    }
    if (!spawn) continue; // Aguarda uma saída livre sem gastar ouro novamente.
    s.units.push({ id: nextEntityId(s), kind: 'worker', hero: false, workerRole: tavern.recruitment.role ?? 'lumberjack', owner: tavern.owner, ...spawn,
      hp: PEON.hp, maxHp: PEON.hp, order: null, activity: 'idle', carrying: 0, carryRes: null,
      gatherNodeId: null, attackCd: 0, dead: false });
    tavern.recruitment = null;
  }
}

function updateTowers(s: GameState, dt: number): void {
  const vamp = s.units.find((u) => u.kind === 'vampire' && !u.dead);
  if (!vamp) return;
  for (const b of s.buildings) {
    if (b.kind !== 'tower' || !b.done) continue;
    b.attackCd = Math.max(0, b.attackCd - dt);
    if (dist(b.x, b.z, vamp.x, vamp.z) > TOWER.range) continue;
    if (b.attackCd > 0) continue;
    if (vampireInvulnerable(s)) continue; // Forma de Morcego (seção 16)
    b.attackCd = TOWER.cooldown;
    const damage = towerDamage(b.level);
    vamp.hp -= damage;
    b.lastShot = { tick: s.tick, targetId: vamp.id, x: vamp.x, z: vamp.z, damage };
    if (vamp.hp <= 0) {
      vamp.dead = true;
      s.result = { winner: 'human', reason: 'As defesas da vila destruíram o vampiro!' };
      return;
    }
  }
}

function updateVictory(s: GameState): void {
  if (s.result) return;
  const vamp = s.units.find((u) => u.kind === 'vampire' && !u.dead);
  if (!vamp) {
    s.result = { winner: 'human', reason: 'O vampiro foi eliminado!' };
    return;
  }
  const humansAlive = s.players.filter((p) => p.role === 'human');
  // Um vampiro em teste solo não perde/vence imediatamente pela ausência de humanos.
  if (s.practice && humansAlive.length === 0) return;
  const anyWorker = s.units.some((u) => u.kind === 'worker' && !u.dead);
  if (!anyWorker) {
    s.result = { winner: 'vampire', reason: 'Todos os humanos foram caçados. Sangue e liberdade.' };
    void humansAlive;
  }
}

export function step(session: Session, commands: Array<{ playerId: number; cmd: Command }>): void {
  const s = session.state;
  for (const { playerId, cmd } of commands) {
    applyCommand(session, playerId, cmd);
    // No teste solo o mesmo jogador controla os dois lados: repete o comando
    // para os demais jogadores (a validação de posse de cada comando decide).
    if (s.practice) {
      for (const p of s.players) {
        if (p.id !== playerId) applyCommand(session, p.id, cmd);
      }
    }
  }
  if (s.result) {
    s.tick++;
    return;
  }
  const index = buildTickIndex(s);
  updatePhase(s, DT);
  updateUnits(session, DT, index);
  updateEconomy(s, DT);
  updateRecruitment(session, DT);
  updateTowers(s, DT);
  updateVictory(s);
  s.time += DT;
  s.tick++;
}

// ---------- snapshot ----------

export function makeSnapshot(s: GameState, includeNodes = true): Snapshot {
  return {
    practice: s.practice ?? false,
    tick: s.tick,
    time: s.time,
    mapId: s.mapId,
    phase: s.phase,
    phaseTime: s.phaseTime,
    daySeconds: s.daySeconds,
    nightSeconds: s.nightSeconds,
    day: s.day,
    result: s.result,
    units: s.units
      .filter((u) => !u.dead)
      .map((u) => ({
        id: u.id,
        kind: u.kind,
        hero: u.hero,
        workerRole: u.workerRole,
        owner: u.owner,
        x: Math.round(u.x * 100) / 100,
        z: Math.round(u.z * 100) / 100,
        hp: Math.round(u.hp),
        maxHp: u.maxHp,
        carrying: Math.floor(u.carrying + 1e-7),
        carryRes: u.carryRes,
        activity: u.activity,
        orderType: u.order?.t ?? null,
        targetId: u.order?.targetId ?? null,
        fortify: u.fortify && u.fortify > 0 ? Math.round(u.fortify * 10) / 10 : undefined,
      })),
    buildings: s.buildings.map((b) => ({
      id: b.id,
      kind: b.kind,
      owner: b.owner,
      x: b.x,
      z: b.z,
      hp: Math.round(b.hp),
      maxHp: b.maxHp,
      level: b.level,
      progress: Math.round(b.progress * 100) / 100,
      done: b.done,
      goldProduced: b.goldProduced ?? 0,
      lastShot: b.lastShot ? { ...b.lastShot } : undefined,
      recruitment: b.recruitment ? { ...b.recruitment } : null,
      fortify: b.fortify && b.fortify > 0 ? Math.round(b.fortify * 10) / 10 : undefined,
    })),
    nodes: includeNodes ? s.nodes.filter((n) => n.amount > 0) : [],
    players: s.players.map((p) => ({
      id: p.id,
      wood: Math.floor(p.wood),
      gold: Math.floor(p.gold),
      alive: p.alive,
      workerLevels: p.workerLevels ? { ...p.workerLevels } : undefined,
      abilityCooldowns: p.abilityCooldowns
        ? Object.fromEntries(Object.entries(p.abilityCooldowns).map(([k, v]) => [k, Math.round(v * 10) / 10]))
        : undefined,
    })),
    blood: s.vampire.blood,
    vampireItems: { ...s.vampire.items },
    vampireSkills: Object.fromEntries(
      Object.entries(s.vampire.skills).map(([id, v]) => [id, { cd: Math.round(v.cd * 10) / 10, buff: Math.round(v.buff * 10) / 10 }]),
    ) as Snapshot['vampireSkills'],
    vampireStatuses: s.vampire.statuses
      ? Object.fromEntries(Object.entries(s.vampire.statuses).map(([k, v]) => [k, Math.round((v ?? 0) * 10) / 10])) as Snapshot['vampireStatuses']
      : undefined,
    vampireReveal: s.vampire.reveal ? { ...s.vampire.reveal, remaining: Math.round(s.vampire.reveal.remaining * 10) / 10 } : null,
    vampireRevealUses: s.vampire.revealUses ?? 0,
  };
}
