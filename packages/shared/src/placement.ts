import { BUILDING_SIZE, WORLD, INTERACTION, TERRAIN_MAX_SLOPE, type BuildKind } from './constants.js';
import { worldToTile, type GameMap } from './mapgen.js';
import { UNIT_RADIUS } from './navigation.js';
import type { Building, ResourceNode, Unit } from './types.js';

/** Altura do terreno (unidades de mapa), interpolação bilinear. */
function groundHeight(map: GameMap, x: number, z: number): number {
  const n = map.tiles;
  const gx = Math.max(0, Math.min(n - 1.0001, (x + WORLD.half) / WORLD.tileSize));
  const gz = Math.max(0, Math.min(n - 1.0001, (z + WORLD.half) / WORLD.tileSize));
  const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
  const h = (dx: number, dz: number) => map.height[Math.min(n - 1, tz + dz) * n + Math.min(n - 1, tx + dx)] ?? 0;
  return (h(0, 0) * (1 - fx) + h(1, 0) * fx) * (1 - fz) + (h(0, 1) * (1 - fx) + h(1, 1) * fx) * fz;
}

/** Encosta íngreme demais para assentar construção (o construtor não chegaria). */
function tooSteep(map: GameMap, x: number, z: number): boolean {
  const step = WORLD.tileSize;
  const h0 = groundHeight(map, x, z);
  return Math.max(
    Math.abs(groundHeight(map, x + step, z) - h0),
    Math.abs(groundHeight(map, x - step, z) - h0),
    Math.abs(groundHeight(map, x, z + step) - h0),
    Math.abs(groundHeight(map, x, z - step) - h0),
  ) / step > TERRAIN_MAX_SLOPE;
}

// Aceita tanto o estado autoritativo quanto o snapshot recebido pelo cliente.
interface PlacementState {
  buildings: ReadonlyArray<Pick<Building, 'kind' | 'x' | 'z'>>;
  nodes: ReadonlyArray<Pick<ResourceNode, 'x' | 'z' | 'amount'>>;
  units: ReadonlyArray<Pick<Unit, 'x' | 'z'> & Partial<Pick<Unit, 'dead'>>>;
}

export function canPlaceBuilding(map: GameMap, state: PlacementState, kind: BuildKind, x: number, z: number): boolean {
  const half = BUILDING_SIZE[kind] / 2;
  if (!Number.isFinite(half) || !Number.isFinite(x) || !Number.isFinite(z) ||
      Math.abs(x) + half >= WORLD.half || Math.abs(z) + half >= WORLD.half) return false;
  // Encostas íngremes não recebem construção (ninguém chegaria para construir).
  if (tooSteep(map, x, z)) return false;

  // Verifica toda a área, inclusive água entre os cantos da construção.
  for (let tx = worldToTile(x - half); tx <= worldToTile(x + half); tx++) {
    for (let tz = worldToTile(z - half); tz <= worldToTile(z + half); tz++) {
      if (tx < 0 || tz < 0 || tx >= map.tiles || tz >= map.tiles || map.water[tz * map.tiles + tx] === 1 || map.bridge[tz * map.tiles + tx] === 1) return false;
    }
  }
  for (const obstacle of map.obstacles) {
    if (Math.abs(obstacle.x - x) < obstacle.width / 2 + half && Math.abs(obstacle.z - z) < obstacle.depth / 2 + half) return false;
  }
  for (const b of state.buildings) {
    const bh = BUILDING_SIZE[b.kind] / 2;
    if (Math.abs(b.x - x) < bh + half && Math.abs(b.z - z) < bh + half) return false;
  }
  for (const node of state.nodes) {
    if (node.amount > 0 && Math.abs(node.x - x) < half + INTERACTION.resourceBuildClearance && Math.abs(node.z - z) < half + INTERACTION.resourceBuildClearance) return false;
  }
  return !state.units.some(u => !u.dead && Math.abs(u.x - x) < half + UNIT_RADIUS && Math.abs(u.z - z) < half + UNIT_RADIUS);
}
