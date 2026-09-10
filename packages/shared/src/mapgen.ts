// Mapa fixo: Vale da Vigília. Coordenadas de mundo editáveis, sem seed aleatória.
import { WORLD, GAME_CONFIG } from './constants.js';

export const MAP_SEED = GAME_CONFIG.map.version;
export const HUMAN_SPAWNS = GAME_CONFIG.map.humanSpawns;
export const CRYPT_POSITION = GAME_CONFIG.map.crypt;

export interface MapObstacle { x: number; z: number; width: number; depth: number; height: number }
export interface Compound { name: string; x: number; z: number; width: number; depth: number; facing: 'north' | 'south' | 'east' | 'west' }
export const COMPOUNDS: Compound[] = GAME_CONFIG.map.refuges;

/** Cada recinto tem paredes permanentes e exatamente uma passagem de 3u. */
export function compoundWalls(c: Compound): MapObstacle[] {
  const t = GAME_CONFIG.map.refugeWalls.thickness, gap = GAME_CONFIG.map.refugeWalls.entranceWidth;
  const walls: MapObstacle[] = [];
  for (const side of ['north', 'south', 'east', 'west'] as const) {
    const horizontal = side === 'north' || side === 'south';
    const h = (horizontal ? c.width : c.depth) / 2;
    const distance = (horizontal ? c.depth : c.width) / 2;
    const sign = side === 'north' || side === 'west' ? -1 : 1;
    const segments = side === c.facing
      ? [{ offset: -(h + gap / 2) / 2, length: h - gap / 2 }, { offset: (h + gap / 2) / 2, length: h - gap / 2 }]
      : [{ offset: 0, length: 2 * h + t }];
    for (const segment of segments) walls.push({
      x: c.x + (horizontal ? segment.offset : sign * distance),
      z: c.z + (horizontal ? sign * distance : segment.offset),
      width: horizontal ? segment.length : t,
      depth: horizontal ? t : segment.length,
      height: GAME_CONFIG.map.refugeWalls.height,
    });
  }
  return walls;
}

export function compoundEntrance(c: Compound) {
  return { x: c.x + (c.facing === 'east' ? c.width / 2 : c.facing === 'west' ? -c.width / 2 : 0),
    z: c.z + (c.facing === 'south' ? c.depth / 2 : c.facing === 'north' ? -c.depth / 2 : 0) };
}

export const FOREST_PATCHES = GAME_CONFIG.map.forests;

function hash01(x: number, z: number): number {
  let h = (Math.imul(x, 374761393) + Math.imul(z, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

// Uma árvore coletável por célula da grade dentro dos clusters de floresta, com
// jitter determinístico. Toda árvore visível no mapa corresponde a um nó.
export const FOREST_WOOD_NODES = (() => {
  const pts: Array<{ kind: 'wood'; x: number; z: number }> = [];
  const step = GAME_CONFIG.map.resources.forestNodeSpacing;
  const half = WORLD.half - 4;
  for (let gx = -half; gx <= half; gx += step) {
    for (let gz = -half; gz <= half; gz += step) {
      const jx = (hash01(Math.round(gx * 10), Math.round(gz * 10)) - 0.5) * step * 0.55;
      const jz = (hash01(Math.round(gz * 10), Math.round(gx * 10)) - 0.5) * step * 0.55;
      const x = Math.round((gx + jx) * 2) / 2, z = Math.round((gz + jz) * 2) / 2;
      if (!FOREST_PATCHES.some(p => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 < 1)) continue;
      if (GAME_CONFIG.map.lakes.some(p => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 < 1)) continue;
      if (Math.hypot(CRYPT_POSITION.x - x, CRYPT_POSITION.z - z) < 18) continue;
      if (COMPOUNDS.some(c => Math.abs(c.x - x) < c.width / 2 + 3 && Math.abs(c.z - z) < c.depth / 2 + 3)) continue;
      pts.push({ kind: 'wood', x, z });
    }
  }
  return pts;
})();

// Nós fixos perto da praça e dos caminhos. Dentro dos refúgios não há recursos:
// o interior fica livre para construir e toda a coleta acontece fora das muralhas.
// Ouro extra: uma mina exposta fora da entrada de cada refúgio + as centrais.
const REFUGE_GOLD_NODES = COMPOUNDS.map(c => {
  const door = compoundEntrance(c);
  const out = c.facing === 'east' ? { x: 1, z: 0 } : c.facing === 'west' ? { x: -1, z: 0 } :
    c.facing === 'south' ? { x: 0, z: 1 } : { x: 0, z: -1 };
  return { kind: 'gold' as const, x: door.x + out.x * 9, z: door.z + out.z * 9 };
});
export const RESOURCE_PLACEMENTS = [
  ...GAME_CONFIG.map.resources.centralWoodX.flatMap(x => GAME_CONFIG.map.resources.centralWoodZ.map(z => ({ kind: 'wood' as const, x, z }))),
  ...GAME_CONFIG.map.resources.centralGold.map(p => ({ kind: 'gold' as const, ...p })),
  ...REFUGE_GOLD_NODES,
  ...FOREST_WOOD_NODES,
];

export interface GameMap {
  seed: number;
  tiles: number;
  height: Float32Array;
  water: Uint8Array;
  forest: Float32Array;
  obstacles: MapObstacle[];
}

/** Materializa o mesmo mapa desenhado à mão para renderização e colisão. */
export function generateMap(_seed = MAP_SEED): GameMap {
  const n = WORLD.tiles;
  const height = new Float32Array(n * n);
  const water = new Uint8Array(n * n);
  const forest = new Float32Array(n * n);
  for (let z = 0; z < n; z++) for (let x = 0; x < n; x++) {
    const wx = tileToWorld(x), wz = tileToWorld(z), i = z * n + x;
    // Praça e recintos planos; elevações somente nas bordas do vale.
    const edge = Math.max(0, Math.max(Math.abs(wx), Math.abs(wz)) - (WORLD.half - 17));
    let h = (3 + edge * 0.6) / 14;
    // Planalto plano para a base do vampiro: sem isso o anel da base subiria a
    // encosta norte. Raio plano + transição suave até o relevo natural.
    const baseDistance = Math.hypot(wx - CRYPT_POSITION.x, wz - CRYPT_POSITION.z);
    const FLAT_RADIUS = 17, BLEND = 7;
    if (baseDistance < FLAT_RADIUS + BLEND) {
      const t = baseDistance <= FLAT_RADIUS ? 0 : (baseDistance - FLAT_RADIUS) / BLEND;
      const smooth = t * t * (3 - 2 * t);
      h = h * smooth + (3 / 14) * (1 - smooth);
    }
    height[i] = h;
    // Dois lagos laterais ao caminho para a cripta.
    if (GAME_CONFIG.map.lakes.some(p => ((wx - p.x) / p.rx) ** 2 + ((wz - p.z) / p.rz) ** 2 < 1)) water[i] = 1;
    if (FOREST_PATCHES.some(p => ((wx - p.x) / p.rx) ** 2 + ((wz - p.z) / p.rz) ** 2 < 1)) forest[i] = 0.8;
  }
  return { seed: MAP_SEED, tiles: n, height, water, forest, obstacles: COMPOUNDS.flatMap(compoundWalls) };
}

export function tileToWorld(tx: number): number {
  return (tx - WORLD.tiles / 2) * WORLD.tileSize + WORLD.tileSize / 2;
}

export function worldToTile(wx: number): number {
  return Math.floor((wx + WORLD.half) / WORLD.tileSize);
}

export function isWaterAt(map: GameMap, wx: number, wz: number): boolean {
  const tx = worldToTile(wx), tz = worldToTile(wz);
  if (tx < 0 || tz < 0 || tx >= map.tiles || tz >= map.tiles) return true;
  return map.water[tz * map.tiles + tx] === 1;
}
