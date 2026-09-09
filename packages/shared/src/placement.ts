import { BUILDING_SIZE, WORLD, INTERACTION, type BuildKind } from './constants.js';
import { worldToTile, type GameMap } from './mapgen.js';
import { UNIT_RADIUS } from './navigation.js';
import type { Building, ResourceNode, Unit } from './types.js';

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

  // Verifica toda a área, inclusive água entre os cantos da construção.
  for (let tx = worldToTile(x - half); tx <= worldToTile(x + half); tx++) {
    for (let tz = worldToTile(z - half); tz <= worldToTile(z + half); tz++) {
      if (tx < 0 || tz < 0 || tx >= map.tiles || tz >= map.tiles || map.water[tz * map.tiles + tx] === 1) return false;
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
