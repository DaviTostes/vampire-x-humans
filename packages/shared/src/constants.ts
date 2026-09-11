// Compatibilidade dos sistemas: todos os valores editáveis vêm do arquivo central.
import { GAME_CONFIG } from '../../../game.config.js';
export { GAME_CONFIG, MAP_PRESETS, DEFAULT_MAP_ID } from '../../../game.config.js';
export type { BuildKind } from '../../../game.config.js';
export type { VampireItemId, VampireSkillId, HumanAbilityId, VampireAbilityId, WorkerRole, SpecCost, SpecPrerequisite } from '../../../game.config.js';
export type { MapPresetId, MapPresetConfig, RefugeConfig, RefugeStyle, MazeRing } from '../../../game.config.js';
import type { BuildKind, WorkerRole, SpecCost, SpecPrerequisite } from '../../../game.config.js';

// Escala global do mapa (game.config.ts → map.scale). O mundo e todas as
// coordenadas de projeto são multiplicados por ela em um único lugar.
export const MAP_SCALE = GAME_CONFIG.map.scale;

export const WORLD = {
  get tiles() { return Math.round(GAME_CONFIG.map.tiles * MAP_SCALE); },
  get tileSize() { return GAME_CONFIG.map.tileSize; },
  get half() { return this.tiles * this.tileSize / 2; },
};
export const DAY_LENGTH = GAME_CONFIG.match.daySeconds;
export const NIGHT_LENGTH = GAME_CONFIG.match.nightSeconds;
export const SURVIVE_NIGHTS_TO_WIN = GAME_CONFIG.match.nightsToWin;
// Faixas de configuração de duração aceitas no lobby.
export const DAY_LENGTH_MIN = GAME_CONFIG.match.daySecondsMin;
export const DAY_LENGTH_MAX = GAME_CONFIG.match.daySecondsMax;
export const NIGHT_LENGTH_MIN = GAME_CONFIG.match.nightSecondsMin;
export const NIGHT_LENGTH_MAX = GAME_CONFIG.match.nightSecondsMax;
export const START_RESOURCES = GAME_CONFIG.match.startingResources;
export const MAX_HUMANS = GAME_CONFIG.map.humanSpawns.length;
export const VAMPIRE_PLAYER_ID = MAX_HUMANS;
export const MAX_PLAYERS = MAX_HUMANS + 1;

export const WORKER = GAME_CONFIG.units.human;
export const PEON = GAME_CONFIG.units.peon;
export function workerStats(unit: { hero?: boolean }) { return unit.hero === false ? PEON : WORKER; }
export const VAMPIRE = GAME_CONFIG.units.vampire;
export const CRYPT_RADIUS = VAMPIRE.cryptRadius;
export const TOWER = GAME_CONFIG.buildings.tower;
export const WALL = GAME_CONFIG.buildings.wall;
export const BANK = GAME_CONFIG.buildings.bank;
export const TAVERNA = GAME_CONFIG.buildings.taverna;
export const KEEP = GAME_CONFIG.buildings.keep;
export const CRYPT = GAME_CONFIG.buildings.crypt;
export const VAMPIRE_SKILLS = GAME_CONFIG.vampireSkills;
export const RECRUIT = TAVERNA.recruit;
export const BUILDABLE = GAME_CONFIG.buildable;
export const MARKET = GAME_CONFIG.market;
export const TICK_RATE = GAME_CONFIG.simulation.ticksPerSecond;
export const DT = 1 / TICK_RATE;
export const INTERACTION = GAME_CONFIG.interaction;

// ---- Especificação "Humano e Vampiro" (game.config.ts → spec) ----
// Tabelas que as próximas etapas consomem. Ver os TODO(A CONFIRMAR) no config.
export const SPEC = GAME_CONFIG.spec;
export const HUMAN_SPEC = SPEC.humanBase;
export const VAMPIRE_SPEC = SPEC.vampireBase;
export const HUMAN_ABILITIES = SPEC.humanAbilities;
export const VAMPIRE_ABILITIES = SPEC.vampireAbilities;
export const SPEC_BANK_LEVELS = SPEC.bankLevels;
export const SPEC_BANK_MAX_LEVEL = SPEC.bankMaxLevel;
export const SPEC_WALL_LEVELS = SPEC.wallLevels;
export const SPEC_WALL_MAX_LEVEL = SPEC.wallMaxLevel;
export const SPEC_TOWER_LEVELS = SPEC.towerLevels;
export const SPEC_TOWER_MAX_LEVEL = SPEC.towerMaxLevel;
export const SPEC_TAVERNA_MAX_COUNT = SPEC.tavernaMaxCount;
export const SPEC_GOLD_MINE = SPEC.goldMine;
export const SPEC_WORKERS = SPEC.workers;
export const SPEC_CRYPT = SPEC.crypt;
export const SPEC_VAMPIRE_ITEM_TIERS = SPEC.vampireItemTiers;
export const SPEC_ENTITY_LIMITS = SPEC.entityLimits;
export const SPEC_BLOOD_PER_DAMAGE = SPEC.bloodPerDamage;
export const SPEC_ROUNDING_POLICY = SPEC.roundingPolicy;

// Inclinação máxima transponível: acima disso a encosta bloqueia o movimento.
// Unidades de altura de mapa por unidade de mundo.
export const TERRAIN_MAX_SLOPE = 0.06;

export const BUILD_COSTS = Object.fromEntries(
  Object.entries(GAME_CONFIG.buildings).filter(([, b]) => 'cost' in b).map(([kind, b]) => [kind, 'cost' in b ? b.cost : undefined]),
) as Record<BuildKind, { wood: number; gold: number; time: number }>;
export const BUILDING_SIZE = Object.fromEntries(
  Object.entries(GAME_CONFIG.buildings).map(([kind, b]) => [kind, b.size]),
) as Record<BuildKind | 'crypt', number>;
// Níveis máximos e progressões vêm das tabelas da spec.
export const BUILD_MAX_LEVEL = GAME_CONFIG.spec.bankMaxLevel;
export const WALL_MAX_LEVEL = GAME_CONFIG.spec.wallMaxLevel;
export const TOWER_MAX_LEVEL = GAME_CONFIG.spec.towerMaxLevel;

function clampLevel(level: number, max: number): number {
  return Math.min(max, Math.max(1, Math.floor(level)));
}

export const MARKET_MAX_LEVEL = GAME_CONFIG.buildings.market.maxLevel;
export function marketUpgradeCost(level: number): { wood: number; gold: number } | null {
  return GAME_CONFIG.buildings.market.upgradeCosts[level] ?? null;
}

export function wallMaxHp(level: number): number {
  return GAME_CONFIG.spec.wallLevels[clampLevel(level, WALL_MAX_LEVEL)]!.hp;
}
export function wallUpgradeCost(level: number): SpecCost | null {
  return GAME_CONFIG.spec.wallLevels[level + 1]?.cost ?? null;
}
/** Ouro entregue por ciclo do Banco no nível (dobra a cada nível). */
export function bankProduction(level = 1): number {
  return GAME_CONFIG.spec.bankLevels[clampLevel(level, BUILD_MAX_LEVEL)]!.production;
}
/** Duração fixa do ciclo do Banco (não muda com o nível). */
export const BANK_CYCLE_SECONDS = GAME_CONFIG.buildings.bank.cycleSeconds;
/** Duração fixa do ciclo da Cripta (não muda com o nível). */
export const CRYPT_CYCLE_SECONDS = GAME_CONFIG.buildings.crypt.cycleSeconds;
/** Sangue entregue por ciclo da Cripta no nível (aumenta a cada upgrade). */
export function cryptProduction(level = 1): number {
  return SPEC_CRYPT.productionByLevel[clampLevel(level, SPEC_CRYPT.maxLevel)] ?? 0;
}
export function bankUpgradeCost(level: number): SpecCost | null {
  return GAME_CONFIG.spec.bankLevels[level + 1]?.upgradeCost ?? null;
}
export function bankPrerequisite(level: number): SpecPrerequisite {
  return GAME_CONFIG.spec.bankLevels[level + 1]?.prerequisite ?? null;
}
export function towerDamage(level = 1): number {
  return GAME_CONFIG.spec.towerLevels[clampLevel(level, TOWER_MAX_LEVEL)]!.damage;
}
export function towerUpgradeCost(level: number): SpecCost | null {
  return GAME_CONFIG.spec.towerLevels[level + 1]?.cost ?? null;
}

// ---- Trabalhadores (seção 7–11) ----

/** Custo de treinar um trabalhador. Lenhador/Reparador usam o custo do nível 1. */
export function workerTrainCost(role: WorkerRole): SpecCost {
  const w = GAME_CONFIG.spec.workers;
  if (role === 'miner') return { wood: w.miner.woodCost };
  if (role === 'lumberjack') return { gold: w.lumberjack.levels[1]!.goldCost };
  return { gold: w.repairer.levels[1]!.goldCost };
}

/** Nível máximo de pesquisa de uma função (Minerador não possui progressão definida). */
export function workerMaxLevel(role: WorkerRole): number {
  const w = GAME_CONFIG.spec.workers;
  if (role === 'lumberjack') return Object.keys(w.lumberjack.levels).length;
  if (role === 'repairer') return Object.keys(w.repairer.levels).length;
  return 1;
}

/** Custo em ouro para alcançar o próximo nível de pesquisa da função. */
export function workerUpgradeCost(role: WorkerRole, level: number): SpecCost | null {
  const next = level + 1;
  const w = GAME_CONFIG.spec.workers;
  if (role === 'lumberjack') { const e = w.lumberjack.levels[next]; return e ? { gold: e.goldCost } : null; }
  if (role === 'repairer') { const e = w.repairer.levels[next]; return e ? { gold: e.goldCost } : null; }
  return null;
}

/**
 * Taxa equivalente de coleta do Lenhador, em madeira/s. A unidade de Gather
 * Interval não foi definida na spec; adotamos segundos (unidade do projeto).
 * TODO(A CONFIRMAR): confirmar a unidade/semântica de Gather Interval.
 */
export function lumberjackGatherRate(level: number): number {
  const cfg = GAME_CONFIG.spec.workers.lumberjack;
  const entry = cfg.levels[clampLevel(level, workerMaxLevel('lumberjack'))]!;
  return cfg.lumberAmount / entry.gatherInterval;
}

/** Estatísticas do Reparador no nível de pesquisa (Repair Speed sem unidade definida). */
export function repairerStats(level: number): { repairSpeed: number; trainingTime: number } {
  const cfg = GAME_CONFIG.spec.workers.repairer;
  return cfg.levels[clampLevel(level, workerMaxLevel('repairer'))]!;
}

/**
 * Reparo do Reparador em HP/s no nível de pesquisa. O Repair Speed da spec não
 * tem unidade definida (A CONFIRMAR); ancoramos o nível 1 no valor base atual
 * (`interaction.repairRate`) e escalamos proporcionalmente, para que evoluir o
 * Reparador realmente aumente a velocidade de reparo.
 */
export function repairerRepairRate(level: number): number {
  const ratio = repairerStats(level).repairSpeed / repairerStats(1).repairSpeed;
  return GAME_CONFIG.interaction.repairRate * ratio;
}

/** Tempo de treino de um Reparador no nível atual (0 = instantâneo). */
export function repairerTrainingTime(level: number): number {
  return repairerStats(level).trainingTime;
}

/**
 * Taxa de ouro do Minerador extraindo de uma Mina, em ouro/s.
 * TODO(A CONFIRMAR): intervalo entre coletas da Mina; provisoriamente usa a
 * mesma unidade temporal do projeto (segundos).
 */
export function minerGoldRate(mineLevel: number): number {
  const mine = GAME_CONFIG.spec.goldMine;
  const entry = mine.levels[clampLevel(mineLevel, Object.keys(mine.levels).length)]!;
  const interval = mine.gatherInterval ?? GAME_CONFIG.spec.workers.miner.gatherInterval ?? 1;
  return entry.goldAmount / interval;
}
