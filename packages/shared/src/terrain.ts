import { WORLD, CLIFF_HEIGHT, TERRAIN_MAX_SLOPE, INTERACTION } from './constants.js';
import type { GameMap } from './mapgen.js';

export const RELIEF_STEP = Math.max(CLIFF_HEIGHT * 0.6 / 14, TERRAIN_MAX_SLOPE * WORLD.tileSize * 2.1);
export interface TerrainStair { x: number; z: number; dx: number; dz: number; length: number; width: number; low: number; high: number; compact?: boolean }

/** Extend a sculpted area without ever raising/lowering already reserved vertices. */
export function extendTerrainRelief(height:Float32Array, occupied:Set<number>, cells:readonly number[], requestedHeight:number, tiles:number) {
  let connection=cells.find(i=>occupied.has(i));
  if(connection===undefined) {
    for(const i of cells) {
      const x=i%tiles,z=Math.floor(i/tiles);
      const neighbors=[x>0?i-1:-1,x<tiles-1?i+1:-1,z>0?i-tiles:-1,z<tiles-1?i+tiles:-1];
      connection=neighbors.find(n=>n>=0 && occupied.has(n));
      if(connection!==undefined) break;
    }
  }
  const target=connection===undefined ? requestedHeight : height[connection]!;
  let changed=false;
  for(const i of cells) {
    if(occupied.has(i)) continue;
    height[i]=target; occupied.add(i); changed=true;
  }
  return {height:target,changed};
}

/** Same triangle interpolation as the rendered terrain, in map height units. */
export function terrainHeight(map: GameMap, x: number, z: number): number {
  const n = map.tiles, ts = WORLD.tileSize;
  const gx = Math.max(0, Math.min(n - 1, (x + WORLD.half) / ts));
  const gz = Math.max(0, Math.min(n - 1, (z + WORLD.half) / ts));
  const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
  const h = (dx: number, dz: number) => map.height[Math.min(n - 1, tz + dz) * n + Math.min(n - 1, tx + dx)] ?? 0;
  const a = h(0, 0), b = h(1, 0), c = h(0, 1), d = h(1, 1);
  return fx + fz <= 1 ? a + (b-a)*fx + (c-a)*fz : d + (c-d)*(1-fx) + (b-d)*(1-fz);
}

/** Find the nearest cliff, then carve a wide, constant-slope passage atomically. */
export function carveTerrainStair(map: GameMap, x: number, z: number, brushSize: number): TerrainStair | null {
  const n = map.tiles, ts = WORLD.tileSize;
  const tx = Math.round((x + WORLD.half)/ts), tz = Math.round((z + WORLD.half)/ts);
  let best: { ax: number; az: number; dx: number; dz: number; low: number; high: number; distance: number } | undefined;
  const radius = Math.max(2, brushSize);
  for (let az = tz-radius; az <= tz+radius; az++) for (let ax = tx-radius; ax <= tx+radius; ax++) {
    if (ax < 1 || az < 1 || ax >= n-2 || az >= n-2) continue;
    for (const [dx, dz] of [[1,0], [0,1]] as const) {
      const a = map.height[az*n+ax]!, b = map.height[(az+dz)*n+ax+dx]!;
      if (Math.abs(a-b) <= TERRAIN_MAX_SLOPE*ts*2) continue;
      const distance = Math.hypot(ax+dx/2-(x+WORLD.half)/ts, az+dz/2-(z+WORLD.half)/ts);
      if (best && best.distance <= distance) continue;
      best = a < b ? { ax, az, dx, dz, low:a, high:b, distance } : { ax:ax+dx, az:az+dz, dx:-dx || 0, dz:-dz || 0, low:b, high:a, distance };
    }
  }
  if (!best) return null;
  const { ax, az, dx, dz, low, high } = best;
  const cells = 4;
  // Keep the passage traversable without stretching it past four tiles.
  if ((high-low)/(cells*ts) > TERRAIN_MAX_SLOPE*0.95) return null;
  const halfWidth = Math.ceil(INTERACTION.vampireUnitRadius/ts)+1;
  // Extend towards the low ground; the upper landing stays on the plateau.
  const topX = ax+dx, topZ = az+dz;
  const startX = topX-dx*cells, startZ = topZ-dz*cells;
  const changes: Array<[number, number]> = [];
  for (let along = -2; along <= cells+2; along++) for (let side = -halfWidth; side <= halfWidth; side++) {
    const px = startX+dx*along-dz*side, pz = startZ+dz*along+dx*side;
    if (px < 1 || pz < 1 || px >= n-1 || pz >= n-1) return null;
    const i = pz*n+px, value = low+(high-low)*Math.max(0,Math.min(1,along/cells));
    if (map.water[i] || map.bridge[i]) return null;
    // Do not tunnel through unrelated terraces or map walls.
    if (map.height[i]! < low-0.015 || map.height[i]! > high+0.015) return null;
    const wx = px*ts-WORLD.half, wz = pz*ts-WORLD.half;
    if (map.obstacles.some(o => Math.abs(o.x-wx) < o.width/2+ts/2 && Math.abs(o.z-wz) < o.depth/2+ts/2)) return null;
    changes.push([i,value]);
  }
  for (const [i,value] of changes) map.height[i] = value;
  return { x:startX*ts-WORLD.half, z:startZ*ts-WORLD.half, dx, dz, length:cells*ts, width:halfWidth*2*ts, low, high, compact:true };
}
