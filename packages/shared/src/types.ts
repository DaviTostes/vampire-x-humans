// Tipos de estado, comandos e snapshots compartilhados entre server e client

import type { BuildKind, VampireItemId, VampireSkillId, HumanAbilityId, VampireAbilityId, WorkerRole, MapPresetId } from './constants.js';

export type { BuildKind, HumanAbilityId, VampireAbilityId, WorkerRole, MapPresetId };

export type Role = 'human' | 'vampire';

// Estados do Vampiro (seção 26). Podem coexistir; a etapa do state machine os
// aplica. Nesta etapa é apenas o vocabulário compartilhado.
export type VampireStatus = 'entangled' | 'silenced' | 'batForm' | 'exitingBatForm' | 'channelingTeleport';

export type ResourceKind = 'wood' | 'gold';

export type UnitKind = 'worker' | 'vampire';
export type Activity = 'idle' | 'moving' | 'gathering' | 'building' | 'repairing' | 'attacking' | 'blocked';

export type BuildingKind = BuildKind | 'crypt';

export interface Order {
  t: 'move' | 'gather' | 'attack' | 'build' | 'repair' | 'upgrade';
  x?: number;
  z?: number;
  targetId?: number;
  kind?: BuildKind;
}

export interface Unit {
  id: number;
  kind: UnitKind;
  hero?: boolean; // false para Peões recrutados; o Humano inicial é o herói do jogador
  workerRole?: WorkerRole; // função do trabalhador treinado (Lenhador/Minerador/Reparador)
  owner: number; // 0..3 humanos, 4 vampiro
  x: number;
  z: number;
  hp: number;
  maxHp: number;
  order: Order | null;
  activity: Activity;
  carrying: number; // progresso do ciclo de coleta, creditado automaticamente ao completar
  carryRes: ResourceKind | null;
  gatherNodeId: number | null;
  attackCd: number;
  fortify?: number; // segundos restantes de invulnerabilidade (Fortificar)
  dead: boolean;
}

export interface Building {
  id: number;
  kind: BuildingKind;
  owner: number; // -1 = neutro (cripta)
  x: number;
  z: number;
  hp: number;
  maxHp: number;
  level: number;
  progress: number; // 0..1 construção
  done: boolean;
  builderId: number | null;
  goldAcc: number; // segundos acumulados no ciclo do banco
  goldProduced?: number; // contador monotônico para efeitos de produção nos clientes
  lastShot?: { tick: number; targetId: number; x: number; z: number; damage: number };
  recruitment?: { remaining: number; total: number; role?: WorkerRole } | null;
  fortify?: number; // segundos restantes de invulnerabilidade (Fortificar)
  attackCd: number;
}

export interface ResourceNode {
  id: number;
  kind: ResourceKind;
  x: number;
  z: number;
  amount: number;
  maxAmount: number;
}

export interface PlayerState {
  id: number;
  name: string;
  role: Role;
  wood: number;
  gold: number;
  alive: boolean;
  // Nível de pesquisa por função de trabalhador (1 = inicial).
  workerLevels?: Partial<Record<WorkerRole, number>>;
  // Recarga restante (s) das habilidades do Humano.
  abilityCooldowns?: Partial<Record<HumanAbilityId, number>>;
}

export interface VampireState {
  blood: number;
  items: Partial<Record<VampireItemId, number>>;
  skills: Partial<Record<VampireSkillId, { cd: number; buff: number }>>;
  // Estado do Vampiro (seção 26): cada status guarda os segundos restantes e
  // podem coexistir (ex.: ENREDADO + SILENCIADO). 0/ausente = inativo.
  statuses?: Partial<Record<VampireStatus, number>>;
  // Revelar Área (seção 15): centro e tempo restante da revelação ativa.
  reveal?: { x: number; z: number; remaining: number; radius: number } | null;
  // Cargas disponíveis de Revelar Área (máx. `vampireAbilities.revealArea.charges`).
  revealCharges?: number;
  // Recarga restante (s) até a próxima carga de Revelar Área.
  revealCooldown?: number;
}

export type GameResult = null | { winner: Role; reason: string };

export interface GameState {
  practice?: boolean;
  tick: number;
  time: number; // segundos desde o início
  mapId: MapPresetId;
  phase: 'day' | 'night';
  phaseTime: number; // tempo restante da fase
  daySeconds: number; // duração configurada do dia
  nightSeconds: number; // duração configurada da noite
  day: number;
  result: GameResult;
  units: Unit[];
  buildings: Building[];
  nodes: ResourceNode[];
  players: PlayerState[];
  vampire: VampireState;
  seed: number;
  // Próximo id de entidade (prédios/unidades). Mantido no estado para evitar
  // varrer todas as listas a cada criação.
  nextId?: number;
}

// ---- Comandos cliente → servidor ----

export type Command =
  | { type: 'move'; ids: number[]; x: number; z: number }
  | { type: 'gather'; ids: number[]; nodeId: number }
  | { type: 'attack'; ids: number[]; targetId: number }
  | { type: 'build'; ids: number[]; kind: BuildKind; x: number; z: number }
  | { type: 'resumeBuild'; ids: number[]; targetId: number }
  | { type: 'demolish'; targetId: number }
  | { type: 'repair'; ids: number[]; targetId: number }
  | { type: 'upgrade'; ids: number[]; targetId: number }
  | { type: 'recruit'; targetId: number; role?: WorkerRole }
  | { type: 'upgradeWorker'; targetId: number; role: WorkerRole }
  | { type: 'castHumanAbility'; ability: HumanAbilityId; targetId?: number; x?: number; z?: number }
  | { type: 'buyVampireItem'; cryptId: number; itemId: VampireItemId }
  | { type: 'upgradeVampireItem'; itemId: VampireItemId }
  | { type: 'buyVampireSkill'; cryptId: number; skillId: VampireSkillId }
  | { type: 'castVampireSkill'; skillId: VampireSkillId }
  | { type: 'castVampireAbility'; ability: VampireAbilityId; x?: number; z?: number }
  | { type: 'market'; targetId: number; trade: 'woodToGold' | 'goldToWood'; amount: number }
  | { type: 'admin'; action: 'resources'; wood: number; gold: number }
  | { type: 'admin'; action: 'blood'; amount: number }
  | { type: 'admin'; action: 'phase'; phase: 'day' | 'night' }
  | { type: 'admin'; action: 'heal' };

// ---- Snapshot servidor → cliente ----

export interface Snapshot {
  practice?: boolean;
  tick: number;
  time: number;
  mapId: MapPresetId;
  phase: 'day' | 'night';
  phaseTime: number;
  daySeconds: number;
  nightSeconds: number;
  day: number;
  result: GameResult;
  units: Array<Pick<Unit, 'id' | 'kind' | 'hero' | 'workerRole' | 'owner' | 'x' | 'z' | 'hp' | 'maxHp' | 'carrying' | 'carryRes' | 'activity' | 'fortify'> & {
    orderType: Order['t'] | null;
    targetId: number | null;
  }>;
  buildings: Array<
    Pick<Building, 'id' | 'kind' | 'owner' | 'x' | 'z' | 'hp' | 'maxHp' | 'level' | 'progress' | 'done' | 'goldProduced' | 'lastShot' | 'recruitment' | 'fortify'>
  >;
  nodes: ResourceNode[];
  players: Array<Pick<PlayerState, 'id' | 'wood' | 'gold' | 'alive' | 'workerLevels' | 'abilityCooldowns'>>;
  blood: number;
  vampireItems: VampireState['items'];
  vampireSkills: VampireState['skills'];
  // Status ativos sobre o Vampiro, para a interface (seção 26).
  vampireStatuses?: Partial<Record<VampireStatus, number>>;
  // Revelar Área ativo (seção 15): centro, tempo restante e raio.
  vampireReveal?: { x: number; z: number; remaining: number; radius: number } | null;
  vampireRevealCharges?: number;
  vampireRevealCooldown?: number;
}
