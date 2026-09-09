// Tipos de estado, comandos e snapshots compartilhados entre server e client

import type { BuildKind, VampireItemId, VampireSkillId } from './constants.js';

export type { BuildKind };

export type Role = 'human' | 'vampire';

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
  recruitment?: { remaining: number; total: number } | null;
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
}

export interface VampireState {
  blood: number;
  items: Partial<Record<VampireItemId, number>>;
  skills: Partial<Record<VampireSkillId, { cd: number; buff: number }>>;
}

export type GameResult = null | { winner: Role; reason: string };

export interface GameState {
  practice?: boolean;
  tick: number;
  time: number; // segundos desde o início
  phase: 'day' | 'night';
  phaseTime: number; // tempo restante da fase
  day: number;
  result: GameResult;
  units: Unit[];
  buildings: Building[];
  nodes: ResourceNode[];
  players: PlayerState[];
  vampire: VampireState;
  seed: number;
}

// ---- Comandos cliente → servidor ----

export type Command =
  | { type: 'move'; ids: number[]; x: number; z: number }
  | { type: 'gather'; ids: number[]; nodeId: number }
  | { type: 'attack'; ids: number[]; targetId: number }
  | { type: 'build'; ids: number[]; kind: BuildKind; x: number; z: number }
  | { type: 'resumeBuild'; ids: number[]; targetId: number }
  | { type: 'repair'; ids: number[]; targetId: number }
  | { type: 'upgrade'; ids: number[]; targetId: number }
  | { type: 'recruit'; targetId: number }
  | { type: 'buyVampireItem'; cryptId: number; itemId: VampireItemId }
  | { type: 'upgradeVampireItem'; itemId: VampireItemId }
  | { type: 'buyVampireSkill'; cryptId: number; skillId: VampireSkillId }
  | { type: 'castVampireSkill'; skillId: VampireSkillId }
  | { type: 'market'; targetId: number; trade: 'woodToGold' | 'goldToWood'; amount: number }
  | { type: 'admin'; action: 'resources'; wood: number; gold: number }
  | { type: 'admin'; action: 'phase'; phase: 'day' | 'night' }
  | { type: 'admin'; action: 'heal' };

// ---- Snapshot servidor → cliente ----

export interface Snapshot {
  practice?: boolean;
  tick: number;
  time: number;
  phase: 'day' | 'night';
  phaseTime: number;
  day: number;
  result: GameResult;
  units: Array<Pick<Unit, 'id' | 'kind' | 'hero' | 'owner' | 'x' | 'z' | 'hp' | 'maxHp' | 'carrying' | 'carryRes' | 'activity'> & {
    orderType: Order['t'] | null;
    targetId: number | null;
  }>;
  buildings: Array<
    Pick<Building, 'id' | 'kind' | 'owner' | 'x' | 'z' | 'hp' | 'maxHp' | 'level' | 'progress' | 'done' | 'goldProduced' | 'lastShot' | 'recruitment'>
  >;
  nodes: ResourceNode[];
  players: Array<Pick<PlayerState, 'id' | 'wood' | 'gold' | 'alive'>>;
  blood: number;
  vampireItems: VampireState['items'];
  vampireSkills: VampireState['skills'];
}
