import { invalidateOccupancyGrid } from './occupancy-grid.js';
import { WORLD, CLIFF_HEIGHT, TERRAIN_MAX_SLOPE, INTERACTION } from './constants.js';
import type { GameMap } from './mapgen.js';
import { insideMapBoundary } from './map-boundary.js';

export const RELIEF_STEP = Math.max(CLIFF_HEIGHT * 0.6 / 14, TERRAIN_MAX_SLOPE * WORLD.tileSize * 2.1);
export interface TerrainRamp { x: number; z: number; dx: number; dz: number; length: number; width: number; low: number; high: number; compact?: boolean }
/** Compatibility with existing map files. These records now render as grass ramps. */
export type TerrainStair = TerrainRamp;
export const RAMP_WIDTH_TILES = 4;

export function planReliefLower(map:GameMap,tx:number,tz:number,size:number,targetHeight:number|null=null,
  canEdit:(index:number)=>boolean=()=>true) {
  const area=reliefBrushArea(tx,tz,size),n=map.tiles,vertices:number[]=[];
  if(area.x<0 || area.z<0 || area.x+area.size>=n || area.z+area.size>=n) return null;
  for(let z=area.z;z<=area.z+area.size;z++) for(let x=area.x;x<=area.x+area.size;x++) {
    const i=z*n+x;
    if(map.water[i] || map.bridge[i] || !canEdit(i)) return null;
    vertices.push(i);
  }
  const heights=vertices.map(i=>map.height[i]!);
  const height=targetHeight ?? Math.max(0,Math.min(Math.min(...heights),Math.max(...heights)-RELIEF_STEP));
  if(heights.some(h=>h<height-1e-6)) return null;
  return {...area,vertices,height};
}

export function reliefBrushArea(tx:number,tz:number,size:number) {
  size=Math.max(1,Math.min(8,Math.floor(size)||1));
  const offset=Math.floor((size-1)/2);
  return {x:tx-offset,z:tz-offset,size};
}

/** Plan all (N+1)^2 vertices of an N×N stamp before changing any of them. */
export function planReliefRaise(map:GameMap,occupied:ReadonlySet<number>,tx:number,tz:number,size:number,
  targetHeight:number|null=null,canEdit:(index:number)=>boolean=()=>true) {
  const area=reliefBrushArea(tx,tz,size),n=map.tiles,vertices:number[]=[];
  if(area.x<0 || area.z<0 || area.x+area.size>=n || area.z+area.size>=n) return null;
  for(let z=area.z;z<=area.z+area.size;z++) for(let x=area.x;x<=area.x+area.size;x++) {
    const i=z*n+x;
    if(map.water[i] || map.bridge[i] || !canEdit(i)) return null;
    vertices.push(i);
  }
  let connection=vertices.find(i=>occupied.has(i));
  if(connection===undefined) {
    for(const i of vertices) {
      const x=i%n,z=Math.floor(i/n);
      connection=[x>0?i-1:-1,x<n-1?i+1:-1,z>0?i-n:-1,z<n-1?i+n:-1].find(j=>j>=0 && occupied.has(j));
      if(connection!==undefined) break;
    }
  }
  const height=targetHeight ?? (connection===undefined ? Math.min(1.2,Math.max(...vertices.map(i=>map.height[i]!))+RELIEF_STEP) : map.height[connection]!);
  // Never overwrite existing relief or leave holes by applying only half a stamp.
  if(vertices.some(i=>map.height[i]!>height+1e-6 || (occupied.has(i) && Math.abs(map.height[i]!-height)>1e-6))) return null;
  return {...area,vertices,height};
}

/** Classify only this cell's two rendered triangles, never neighboring cells. */
export function terrainCellWalkable(map:GameMap,tx:number,tz:number):boolean {
  const n=map.tiles;
  if(tx<0 || tz<0 || tx>=n-1 || tz>=n-1) return false;
  const i=tz*n+tx, a=map.height[i]!,b=map.height[i+1]!,c=map.height[i+n]!,d=map.height[i+n+1]!;
  return Math.max(Math.hypot(b-a,c-a),Math.hypot(d-c,d-b))/WORLD.tileSize <= TERRAIN_MAX_SLOPE+1e-7;
}

/** A footprint may touch a cell edge, but must not enter a steep lateral cell. */
export function terrainFootprintWalkable(map:GameMap,x:number,z:number,halfX=0,halfZ=halfX):boolean {
  const ts=WORLD.tileSize,epsilon=1e-7;
  const firstX=Math.floor((x-halfX+WORLD.half+(halfX?epsilon:0))/ts);
  const lastX=Math.floor((x+halfX+WORLD.half-(halfX?epsilon:0))/ts);
  const firstZ=Math.floor((z-halfZ+WORLD.half+(halfZ?epsilon:0))/ts);
  const lastZ=Math.floor((z+halfZ+WORLD.half-(halfZ?epsilon:0))/ts);
  for(let tz=firstZ;tz<=lastZ;tz++) for(let tx=firstX;tx<=lastX;tx++) {
    if(!terrainCellWalkable(map,tx,tz)) return false;
  }
  return true;
}

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
export function planTerrainRamp(map: GameMap, x: number, z: number): {ramp:TerrainRamp;changes:Array<[number,number]>} | null {
  const n = map.tiles, ts = WORLD.tileSize;
  const tx = Math.round((x + WORLD.half)/ts), tz = Math.round((z + WORLD.half)/ts);
  let best: { ax: number; az: number; dx: number; dz: number; low: number; high: number; distance: number } | undefined;
  const radius = 2;
  for (let az = tz-radius; az <= tz+radius; az++) for (let ax = tx-radius; ax <= tx+radius; ax++) {
    if (ax < 1 || az < 1 || ax >= n-2 || az >= n-2) continue;
    for (const [dx, dz] of [[1,0], [0,1]] as const) {
      const a = map.height[az*n+ax]!, b = map.height[(az+dz)*n+ax+dx]!;
      if (Math.abs(a-b) <= TERRAIN_MAX_SLOPE*ts+1e-6) continue;
      const distance = Math.hypot(ax+dx/2-(x+WORLD.half)/ts, az+dz/2-(z+WORLD.half)/ts);
      if (best && best.distance <= distance) continue;
      best = a < b ? { ax, az, dx, dz, low:a, high:b, distance } : { ax:ax+dx, az:az+dz, dx:-dx || 0, dz:-dz || 0, low:b, high:a, distance };
    }
  }
  if (!best) return null;
  const { ax, az, dx, dz, low, high } = best;
  const cells = Math.max(4,Math.ceil((high-low)/(TERRAIN_MAX_SLOPE*0.9*ts)));
  const halfWidth = RAMP_WIDTH_TILES/2;
  // Extend towards the low ground; the upper landing stays on the plateau.
  const topX = ax+dx, topZ = az+dz;
  const startX = topX-dx*cells, startZ = topZ-dz*cells;
  const centerX=(startX+dx*cells/2)*ts-WORLD.half,centerZ=(startZ+dz*cells/2)*ts-WORLD.half;
  if(!insideMapBoundary(map,centerX,centerZ,dx ? (cells/2+2)*ts : halfWidth*ts,
    dz ? (cells/2+2)*ts : halfWidth*ts)) return null;
  const changes: Array<[number, number]> = [];
  for (let along = -2; along <= cells+2; along++) for (let side = -halfWidth; side <= halfWidth; side++) {
    const px = startX+dx*along-dz*side, pz = startZ+dz*along+dx*side;
    if (px < 1 || pz < 1 || px >= n-1 || pz >= n-1) return null;
    const i = pz*n+px, value = low+(high-low)*Math.max(0,Math.min(1,along/cells));
    if (map.water[i] || map.bridge[i]) return null;
    // Do not tunnel through unrelated terraces or map walls.
    if (map.height[i]! < low-0.015 || map.height[i]! > high+0.015) return null;
    if(along<0 && Math.abs(map.height[i]!-low)>0.015) return null;
    if(along>cells && Math.abs(map.height[i]!-high)>0.015) return null;
    const wx = px*ts-WORLD.half, wz = pz*ts-WORLD.half;
    if (map.treeObstacles?.some(o => Math.abs(o.x-wx) < o.width/2+ts/2 && Math.abs(o.z-wz) < o.depth/2+ts/2)) return null;
    changes.push([i,value]);
  }
  return {ramp:{ x:startX*ts-WORLD.half, z:startZ*ts-WORLD.half, dx, dz, length:cells*ts, width:halfWidth*2*ts, low, high, compact:true },changes};
}

export function carveTerrainRamp(map:GameMap,x:number,z:number):TerrainRamp|null {
  const plan=planTerrainRamp(map,x,z);
  if(!plan) return null;
  for(const [i,height] of plan.changes) map.height[i]=height;
  clearRampObstacles(map,[...(map.ramps??[]),plan.ramp]);
  return plan.ramp;
}

/** Remove only the part of a solid wall that intersects the ramp opening. */
export function clearRampObstacles(map:GameMap,ramps:readonly TerrainRamp[]):void {
  map.ramps=ramps.map(r=>({...r}));
  invalidateOccupancyGrid(map);
  for(const ramp of ramps) {
    const cx=ramp.x+ramp.dx*ramp.length/2,cz=ramp.z+ramp.dz*ramp.length/2;
    const hx=ramp.dx ? ramp.length/2+WORLD.tileSize*2 : ramp.width/2;
    const hz=ramp.dz ? ramp.length/2+WORLD.tileSize*2 : ramp.width/2;
    map.obstacles=map.obstacles.flatMap(o=>{
      const left=o.x-o.width/2,right=o.x+o.width/2,top=o.z-o.depth/2,bottom=o.z+o.depth/2;
      const x0=Math.max(left,cx-hx),x1=Math.min(right,cx+hx),z0=Math.max(top,cz-hz),z1=Math.min(bottom,cz+hz);
      if(x0>=x1 || z0>=z1) return [o];
      return [[left,x0,top,bottom],[x1,right,top,bottom],[x0,x1,top,z0],[x0,x1,z1,bottom]]
        .filter(([a,b,c,d])=>b!-a!>1e-6 && d!-c!>1e-6)
        .map(([a,b,c,d])=>({...o,x:(a!+b!)/2,z:(c!+d!)/2,width:b!-a!,depth:d!-c!}));
    });
  }
}

export function rampPaint(paint:ArrayLike<number>|null|undefined,ramps:readonly TerrainRamp[]):number[] {
  const n=WORLD.tiles,ts=WORLD.tileSize;
  const result=Array.from({length:n*n},(_,i)=>paint?.[i] ?? 0);
  for(const ramp of ramps) for(let z=0;z<n;z++) for(let x=0;x<n;x++) {
    const dx=(x+0.5)*ts-WORLD.half-ramp.x,dz=(z+0.5)*ts-WORLD.half-ramp.z;
    const along=dx*ramp.dx+dz*ramp.dz,across=Math.abs(-dx*ramp.dz+dz*ramp.dx);
    if(along>=-2*ts && along<=ramp.length+2*ts && across<ramp.width/2) result[z*n+x]=2;
  }
  return result;
}

/** Legacy authored-map entry point; no stair mesh or stepped surface is created. */
export function carveTerrainStair(map:GameMap,x:number,z:number,_brushSize:number):TerrainRamp|null {
  return carveTerrainRamp(map,x,z);
}
