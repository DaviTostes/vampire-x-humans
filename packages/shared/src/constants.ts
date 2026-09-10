// Compatibilidade dos sistemas: todos os valores editáveis vêm do arquivo central.
import { GAME_CONFIG } from '../../../game.config.js';
export { GAME_CONFIG } from '../../../game.config.js';
export type { BuildKind } from '../../../game.config.js';
export type { VampireItemId, VampireSkillId } from '../../../game.config.js';
import type { BuildKind } from '../../../game.config.js';

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
export const VAMPIRE_ITEMS = GAME_CONFIG.vampireItems;
export const VAMPIRE_SKILLS = GAME_CONFIG.vampireSkills;
export const RECRUIT = TAVERNA.recruit;
export const BUILDABLE = GAME_CONFIG.buildable;
export const MARKET = GAME_CONFIG.market;
export const TICK_RATE = GAME_CONFIG.simulation.ticksPerSecond;
export const DT = 1 / TICK_RATE;
export const INTERACTION = GAME_CONFIG.interaction;

// Inclinação máxima transponível: acima disso a encosta bloqueia o movimento.
// Unidades de altura de mapa por unidade de mundo.
export const TERRAIN_MAX_SLOPE = 0.06;

export const BUILD_COSTS = Object.fromEntries(
  Object.entries(GAME_CONFIG.buildings).filter(([, b]) => 'cost' in b).map(([kind, b]) => [kind, 'cost' in b ? b.cost : undefined]),
) as Record<BuildKind, { wood: number; gold: number; time: number }>;
export const BUILDING_SIZE = Object.fromEntries(
  Object.entries(GAME_CONFIG.buildings).map(([kind, b]) => [kind, b.size]),
) as Record<BuildKind | 'crypt', number>;
export const BUILD_MAX_LEVEL = BANK.maxLevel;
export const BANK_UPGRADE_COST = BANK.upgradeCosts;
export const WALL_MAX_LEVEL = WALL.maxLevel;
export const WALL_UPGRADE_COST = WALL.upgradeCosts;
export function wallMaxHp(level: number): number {
  return WALL.hpPerLevel[Math.min(WALL.maxLevel, Math.max(1, Math.floor(level)))]!;
}
export function bankProduction(): number { return BANK.goldPerCycle; }
export function bankCycleSeconds(level: number): number {
  return BANK.cycleSecondsByLevel[Math.min(BANK.maxLevel, Math.max(1, Math.floor(level)))]!;
}
