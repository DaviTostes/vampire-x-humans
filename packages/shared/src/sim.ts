// Simulação autoritativa do jogo — roda SOMENTE no servidor.
// Clientes recebem snapshots e enviam comandos.

import {
  BUILD_COSTS,
  BUILDABLE,
  BUILDING_SIZE,
  BUILD_MAX_LEVEL,
  CRYPT_RADIUS,
  DAY_LENGTH,
  DT,
  NIGHT_LENGTH,
  SURVIVE_NIGHTS_TO_WIN,
  BANK_UPGRADE_COST,
  WALL_MAX_LEVEL,
  WALL_UPGRADE_COST,
  wallMaxHp,
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
  INTERACTION,
  VAMPIRE_PLAYER_ID,
  VAMPIRE_ITEMS,
  WORLD,
  bankProduction,
  bankCycleSeconds,
  type BuildKind,
  type VampireSkillId,
} from './constants.js';
import {
  generateMap,
  type GameMap,
} from './mapgen.js';
import { createGameState } from './state.js';
import { Navigation } from './navigation.js';
import { canPlaceBuilding } from './placement.js';
import {
  vampireItemBonuses,
  vampireItemCost,
  vampireEffectiveCooldown,
  vampireEffectiveSpeed,
  vampireShopAccess,
  vampireSkillMultiplier,
} from './vampire-items.js';
import type {
  Building,
  Command,
  GameState,
  Snapshot,
  Unit,
} from './types.js';

export interface Session {
  state: GameState;
  map: GameMap;
  commandSeq: Record<number, number>;
  navigation: Navigation;
}

export function createSession(names: string[], seed: number, playerIds?: number[]): Session {
  const state = createGameState(names, seed, playerIds);
  const map = generateMap(seed); // determinístico — mesmo resultado do client
  return { state, map, commandSeq: {}, navigation: new Navigation(state, map) };
}

// ---------- helpers ----------

function dist(ax: number, az: number, bx: number, bz: number): number {
  return Math.hypot(ax - bx, az - bz);
}

function unitById(s: GameState, id: number): Unit | undefined {
  return s.units.find((u) => u.id === id && !u.dead);
}

function buildingById(s: GameState, id: number): Building | undefined {
  return s.buildings.find((b) => b.id === id);
}

function nextEntityId(s: GameState): number {
  // Varredura em laço (sem spread) evita estourar a pilha em partidas longas.
  let max = 1000;
  for (const b of s.buildings) if (b.id > max) max = b.id;
  for (const u of s.units) if (u.id > max) max = u.id;
  for (const n of s.nodes) if (n.id > max) max = n.id;
  return max + 1;
}

export function buildingHalf(b: Pick<Building, 'kind'>): number {
  return BUILDING_SIZE[b.kind] / 2;
}

/** Verifica se uma construção pode ser colocada em (x, z) */
export function canPlace(session: Session, kind: BuildKind, x: number, z: number): boolean {
  return canPlaceBuilding(session.map, session.state, kind, x, z);
}

// ---------- comandos ----------

export function applyCommand(session: Session, playerId: number, cmd: Command): void {
  const s = session.state;
  if (s.result) return;

  switch (cmd.type) {
    case 'buyVampireItem': {
      if (playerId !== VAMPIRE_PLAYER_ID || !Object.hasOwn(VAMPIRE_ITEMS, cmd.itemId)) return;
      const vampire = s.units.find(u => u.kind === 'vampire' && u.owner === playerId && !u.dead);
      const crypt = buildingById(s, cmd.cryptId);
      if (vampireShopAccess(s.phase, vampire, crypt) || !vampire) return;
      const item = VAMPIRE_ITEMS[cmd.itemId];
      const count = s.vampire.items[cmd.itemId] ?? 0;
      const cost = vampireItemCost(cmd.itemId, count);
      if (count >= item.maxCount || s.vampire.blood < cost) return;
      s.vampire.blood -= cost;
      s.vampire.items[cmd.itemId] = count + 1;
      // A vida atual recebe somente o bônus do item; dano anterior é preservado.
      vampire.maxHp += item.healthBonus;
      vampire.hp = Math.min(vampire.maxHp, vampire.hp + item.healthBonus);
      break;
    }
    case 'upgradeVampireItem': {
      // Upar nível de item já possuído: sem restrição de dia/cripta, a qualquer hora.
      if (playerId !== VAMPIRE_PLAYER_ID || !Object.hasOwn(VAMPIRE_ITEMS, cmd.itemId)) return;
      const vampire = s.units.find(u => u.kind === 'vampire' && u.owner === playerId && !u.dead);
      if (!vampire) return;
      const item = VAMPIRE_ITEMS[cmd.itemId];
      const count = s.vampire.items[cmd.itemId] ?? 0;
      if (count < 1 || count >= item.maxCount) return;
      const cost = vampireItemCost(cmd.itemId, count);
      if (s.vampire.blood < cost) return;
      s.vampire.blood -= cost;
      s.vampire.items[cmd.itemId] = count + 1;
      vampire.maxHp += item.healthBonus;
      vampire.hp = Math.min(vampire.maxHp, vampire.hp + item.healthBonus);
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
      const skill = VAMPIRE_SKILLS[cmd.skillId];
      state.buff = skill.duration;
      state.cd = skill.cooldown;
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
        s.phaseTime = cmd.phase === 'day' ? DAY_LENGTH : NIGHT_LENGTH;
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
      if (!node) return;
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId && u.kind === 'worker') {
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
      const builders = s.units.filter(u => !u.dead && u.owner === playerId && u.kind === 'worker' && cmd.ids.includes(u.id));
      if (!builders.length) return;
      const cost = BUILD_COSTS[cmd.kind];
      if (!cost) return;
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
        builderId: cmd.ids[0] ?? null,
        goldAcc: 0,
        attackCd: 0,
      };
      s.buildings.push(b);
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId && u.kind === 'worker') {
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
        if (!u.dead && u.owner === playerId && u.kind === 'worker' && cmd.ids.includes(u.id)) {
          u.order = { t: 'build', targetId: site.id };
          u.gatherNodeId = null;
        }
      }
      break;
    }
    case 'repair': {
      const wall = buildingById(s, cmd.targetId);
      if (!wall || !wall.done || wall.owner !== playerId || wall.kind !== 'wall') return;
      if (wall.hp >= wall.maxHp) return;
      let any = false;
      for (const u of s.units) {
        if (!u.dead && u.owner === playerId && u.kind === 'worker' && cmd.ids.includes(u.id)) {
          u.order = { t: 'repair', targetId: wall.id };
          u.gatherNodeId = null;
          any = true;
        }
      }
      if (!any) return;
      break;
    }
    case 'upgrade': {
      const p = s.players.find((pl) => pl.id === playerId);
      const b = buildingById(s, cmd.targetId);
      if (!p || !b || b.owner !== playerId || !b.done) return;
      if (b.kind === 'bank') {
        if (b.level >= BUILD_MAX_LEVEL) return;
        const cost = BANK_UPGRADE_COST[b.level];
        if (!cost) return;
        if (p.wood < cost.wood || p.gold < cost.gold) return;
        p.wood -= cost.wood;
        p.gold -= cost.gold;
        b.level++;
        b.goldAcc = 0;
      } else if (b.kind === 'wall') {
        if (b.level >= WALL_MAX_LEVEL) return;
        const cost = WALL_UPGRADE_COST[b.level];
        if (!cost) return;
        if (p.wood < cost.wood || p.gold < cost.gold) return;
        p.wood -= cost.wood;
        p.gold -= cost.gold;
        const oldMax = b.maxHp;
        b.level++;
        b.maxHp = wallMaxHp(b.level);
        // Preserva o dano atual: soma a diferença do novo nível.
        b.hp = Math.min(b.maxHp, b.hp + (b.maxHp - oldMax));
      } else return;
      break;
    }
    case 'recruit': {
      const player = s.players.find(p => p.id === playerId && p.role === 'human');
      const tavern = buildingById(s, cmd.targetId);
      if (!player || !tavern || tavern.owner !== playerId || tavern.kind !== 'taverna' || !tavern.done || tavern.recruitment) return;
      if (player.gold < RECRUIT.gold || player.wood < RECRUIT.wood) return;
      player.gold -= RECRUIT.gold;
      player.wood -= RECRUIT.wood;
      tavern.recruitment = { remaining: RECRUIT.time, total: RECRUIT.time };
      break;
    }
    case 'market': {
      const p = s.players.find((pl) => pl.id === playerId);
      if (!p || p.role !== 'human') return;
      const wall = buildingById(s, cmd.targetId);
      if (!wall || wall.kind !== 'wall' || wall.owner !== playerId || !wall.done) return;
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
    s.phaseTime = NIGHT_LENGTH;
  } else {
    // amanhecer
    s.phase = 'day';
    s.phaseTime = DAY_LENGTH;
    s.day++;
    if (s.day > SURVIVE_NIGHTS_TO_WIN) {
      s.result = { winner: 'human', reason: `Os humanos sobreviveram a ${SURVIVE_NIGHTS_TO_WIN} noites!` };
    }
  }
}

function vampireSpeed(s: GameState): number {
  return vampireEffectiveSpeed(s.phase, s.vampire.items);
}

function vampireOutsideCrypt(s: GameState): boolean {
  if (s.phase === 'night') return false;
  const crypt = s.buildings.find((b) => b.kind === 'crypt');
  if (!crypt) return false;
  const vamp = s.units.find((u) => u.kind === 'vampire' && !u.dead);
  if (!vamp) return false;
  return dist(vamp.x, vamp.z, crypt.x, crypt.z) > CRYPT_RADIUS;
}

function updateGather(s: GameState, nav: Navigation, u: Unit, dt: number): void {
  const stats = workerStats(u);
  const node = s.nodes.find((n) => n.id === u.gatherNodeId && n.amount > 0);
  if (!node) {
    u.order = null;
    u.gatherNodeId = null;
    u.carrying = 0;
    u.carryRes = null;
    return;
  }
  if (nav.move(u, node.x, node.z, stats.speed, dt, node.kind === 'wood' ? INTERACTION.woodGatherRange : INTERACTION.goldGatherRange)) {
    u.activity = 'gathering';
    u.carryRes = node.kind;
    // Vai direto para o total do jogador, 1 a 1 — sem segurar carga na unidade.
    u.carrying += stats.gatherRate * dt;
    const whole = Math.floor(u.carrying + 1e-9);
    if (whole > 0) {
      const p = s.players.find((pl) => pl.id === u.owner);
      if (p) p[node.kind] = Math.round((p[node.kind] + whole) * 1e6) / 1e6;
      u.carrying -= whole;
    }
  }
}

function updateAttackOrder(s: GameState, nav: Navigation, u: Unit, dt: number): void {
  const stats = workerStats(u);
  const targetUnit = unitById(s, u.order?.targetId ?? -1);
  const targetBuilding = buildingById(s, u.order?.targetId ?? -1);
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

  if (targetUnit) {
    const vampireDamage = (VAMPIRE.attackDamage + vampireItemBonuses(s.vampire.items).damage) * vampireSkillMultiplier(s.vampire.skills);
    const dmg = u.kind === 'vampire' ? vampireDamage * (s.phase === 'night' ? 1 : VAMPIRE.dayDamageMultiplier) : stats.attackDamage;
    targetUnit.hp -= dmg;
    if (u.kind === 'vampire') s.vampire.blood += VAMPIRE.bloodPerHit;
    if (targetUnit.hp <= 0) {
      targetUnit.dead = true;
      if (targetUnit.kind === 'vampire') {
        s.result = { winner: 'human', reason: 'O vampiro foi destruído pelos humanos!' };
      }
    }
  } else if (targetBuilding) {
    const dmg = u.kind === 'vampire' ? (VAMPIRE.attackDamageBuilding + vampireItemBonuses(s.vampire.items).damage) * vampireSkillMultiplier(s.vampire.skills) : stats.attackDamage;
    targetBuilding.hp -= dmg;
    if (u.kind === 'vampire') s.vampire.blood += VAMPIRE.bloodPerHit;
    if (targetBuilding.hp <= 0) {
      if (targetBuilding.kind === 'crypt') return; // cripta indestrutível
      s.buildings = s.buildings.filter((b) => b.id !== targetBuilding.id);
    }
  }
}

function updateBuild(s: GameState, nav: Navigation, u: Unit, dt: number): void {
  const stats = workerStats(u);
  const site = buildingById(s, u.order?.targetId ?? -1);
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
    u.order = null;
  }
}

function updateRepair(s: GameState, nav: Navigation, u: Unit, dt: number): void {
  const stats = workerStats(u);
  const wall = buildingById(s, u.order?.targetId ?? -1);
  if (!wall || !wall.done || wall.kind !== 'wall' || wall.hp >= wall.maxHp) {
    u.order = null;
    return;
  }
  if (!nav.move(u, wall.x, wall.z, stats.speed, dt, INTERACTION.buildRange, buildingHalf(wall))) return;
  u.activity = 'repairing';
  wall.hp = Math.min(wall.maxHp, wall.hp + INTERACTION.repairRate * stats.buildRate * dt);
  if (wall.hp >= wall.maxHp) u.order = null;
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

function updateUnits(session: Session, dt: number): void {
  const s = session.state;
  const nav = session.navigation;
  nav.refresh();
  const vampOut = vampireOutsideCrypt(s);
  for (const u of s.units) {
    if (u.dead) continue;
    u.activity = 'idle';
    nav.recover(u);
    u.attackCd = Math.max(0, u.attackCd - dt);

    // vampiro de dia fora da cripta: não pode atacar
    const canAct = !(u.kind === 'vampire' && vampOut);

    if (u.kind === 'vampire' && s.phase === 'night') {
      u.hp = Math.min(u.maxHp, u.hp + VAMPIRE.nightRegen * dt);
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
        updateGather(s, nav, u, dt);
        break;
      case 'attack':
        if (canAct) updateAttackOrder(s, nav, u, dt);
        break;
      case 'build':
        updateBuild(s, nav, u, dt);
        break;
      case 'repair':
        updateRepair(s, nav, u, dt);
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
    if (b.kind === 'bank' && b.done) {
      const cycleSeconds = bankCycleSeconds(b.level);
      b.goldAcc += dt;
      if (b.goldAcc + 1e-7 >= cycleSeconds) {
        const cycles = Math.floor((b.goldAcc + 1e-7) / cycleSeconds);
        const whole = cycles * bankProduction();
        const p = s.players.find((pl) => pl.id === b.owner);
        if (p) {
          p.gold += whole;
          b.goldProduced = (b.goldProduced ?? 0) + whole;
        }
        b.goldAcc = Math.max(0, b.goldAcc - cycles * cycleSeconds);
      }
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
    s.units.push({ id: nextEntityId(s), kind: 'worker', hero: false, owner: tavern.owner, ...spawn,
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
    b.attackCd = TOWER.cooldown;
    vamp.hp -= TOWER.damage;
    b.lastShot = { tick: s.tick, targetId: vamp.id, x: vamp.x, z: vamp.z, damage: TOWER.damage };
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
  }
  if (s.result) {
    s.tick++;
    return;
  }
  updatePhase(s, DT);
  updateUnits(session, DT);
  updateEconomy(s, DT);
  updateRecruitment(session, DT);
  updateTowers(s, DT);
  updateVictory(s);
  s.time += DT;
  s.tick++;
}

// ---------- snapshot ----------

export function makeSnapshot(s: GameState): Snapshot {
  return {
    practice: s.practice ?? false,
    tick: s.tick,
    time: s.time,
    phase: s.phase,
    phaseTime: s.phaseTime,
    day: s.day,
    result: s.result,
    units: s.units
      .filter((u) => !u.dead)
      .map((u) => ({
        id: u.id,
        kind: u.kind,
        hero: u.hero,
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
    })),
    nodes: s.nodes.filter((n) => n.amount > 0),
    players: s.players.map((p) => ({
      id: p.id,
      wood: Math.floor(p.wood),
      gold: Math.floor(p.gold),
      alive: p.alive,
    })),
    blood: s.vampire.blood,
    vampireItems: { ...s.vampire.items },
    vampireSkills: Object.fromEntries(
      Object.entries(s.vampire.skills).map(([id, v]) => [id, { cd: Math.round(v.cd * 10) / 10, buff: Math.round(v.buff * 10) / 10 }]),
    ) as Snapshot['vampireSkills'],
  };
}
