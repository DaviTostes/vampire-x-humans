import { WORLD } from './constants.js';
import type { GameMap, MapModel, MapOverlay } from './mapgen.js';

// Above the water plane, at the original map's grass ground level.
export const FLAT_GROUND_HEIGHT = 0.24;

export function clearedAreaIntersects(cleared: ReadonlySet<number>, x: number, z: number, width = 0, depth = width): boolean {
  if (!cleared.size) return false;
  const tile = (v: number) => Math.floor((v + WORLD.half) / WORLD.tileSize);
  const minX = Math.max(0, tile(x - width / 2)), maxX = Math.min(WORLD.tiles - 1, tile(x + width / 2));
  const minZ = Math.max(0, tile(z - depth / 2)), maxZ = Math.min(WORLD.tiles - 1, tile(z + depth / 2));
  for (let tz = minZ; tz <= maxZ; tz++) for (let tx = minX; tx <= maxX; tx++) {
    if (cleared.has(tz * WORLD.tiles + tx)) return true;
  }
  return false;
}

/** Clear the four vertices of each painted cell, matching the terrain mesh. */
export function clearGroundCells(map: GameMap, cleared: ReadonlySet<number>): void {
  for (const i of cleared) {
    const x = i % map.tiles, z = Math.floor(i / map.tiles);
    for (let dz = 0; dz <= 1; dz++) for (let dx = 0; dx <= 1; dx++) {
      if (x + dx >= map.tiles || z + dz >= map.tiles) continue;
      const vertex = (z + dz) * map.tiles + x + dx;
      map.water[vertex] = 0; map.bridge[vertex] = 0; map.forest[vertex] = 0;
    }
  }
}

/** Apply persistent clearing to both gameplay and rendering, for every preset. */
export function withClearedTerrain(base: MapModel, overlay: MapOverlay | null): MapModel {
  const cleared = new Set(overlay?.cleared ?? []);
  if (!cleared.size) return base;
  const touches = (o: { x: number; z: number; width?: number; depth?: number }) =>
    clearedAreaIntersects(cleared, o.x, o.z, o.width ?? 3.2, o.depth ?? 3.2);
  const bridges = base.bridges.filter(b => !touches(b));
  const removedBridges = base.bridges.filter(touches);
  const removedBridgeAt = (x: number, z: number) => removedBridges.some(b => Math.abs(x-b.x) <= b.width/2 && Math.abs(z-b.z) <= b.depth/2);
  const isClear = (x: number, z: number) => clearedAreaIntersects(cleared, x, z);
  const obstacles = base.obstacles.filter(o => !touches(o));
  return {
    ...base, bridges, obstacles,
    refugeWalls: base.refugeWalls.map(walls => walls.filter(o => !touches(o))),
    resourcePlacements: base.resourcePlacements.filter(o => !touches(o)),
    forestWoodNodes: base.forestWoodNodes.filter(o => !touches(o)),
    isLandAt: (x,z) => isClear(x,z) || base.isLandAt(x,z),
    isWaterAtWorld: (x,z) => !isClear(x,z) && base.isWaterAtWorld(x,z),
    isBridgeAtWorld: (x,z) => !isClear(x,z) && !removedBridgeAt(x,z) && base.isBridgeAtWorld(x,z),
    isForestAt: (x,z) => !isClear(x,z) && base.isForestAt(x,z),
    generateMap: () => {
      const map = base.generateMap();
      clearGroundCells(map, cleared);
      for (let i = 0; i < map.bridge.length; i++) {
        if (map.bridge[i] && removedBridgeAt((i % map.tiles)*WORLD.tileSize-WORLD.half, Math.floor(i/map.tiles)*WORLD.tileSize-WORLD.half)) map.bridge[i] = 0;
      }
      // Height remains editable after clearing; never re-flatten later edits.
      for (const i of cleared) for (const offset of [0,1,map.tiles,map.tiles+1]) {
        const vertex = i + offset;
        if (vertex >= map.height.length || (offset % map.tiles && i % map.tiles === map.tiles-1)) continue;
        const h = overlay?.height?.[vertex];
        map.height[vertex] = typeof h === 'number' && Number.isFinite(h) ? Math.max(0,Math.min(1.2,h)) : FLAT_GROUND_HEIGHT;
      }
      map.obstacles = obstacles.map(o => ({...o}));
      return map;
    },
  };
}
