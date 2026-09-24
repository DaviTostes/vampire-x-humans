import { WORLD, BUILDING_SIZE, INTERACTION, unitFootprintSize, type BuildKind } from './constants.js';
import type { GameMap } from './mapgen.js';
import { insidePlayableBoundary } from './map-boundary.js';
import { rockIntersectsBox } from './rock-collision.js';

const cache=new WeakMap<GameMap,Map<number,boolean>>();
export function invalidateOccupancyGrid(map:GameMap):void { cache.delete(map); }

/** Only complete cells on an explicitly authored ramp may have a slope. */
export function gridCellIsRamp(map:GameMap,tx:number,tz:number):boolean {
  const ts=WORLD.tileSize,n=map.tiles,e=1e-6;
  return (map.ramps??[]).some(r=>[0,1].every(dz=>[0,1].every(dx=>{
    const x=(tx+dx)*ts-WORLD.half-r.x,z=(tz+dz)*ts-WORLD.half-r.z;
    const along=x*r.dx+z*r.dz,across=-x*r.dz+z*r.dx;
    return along>=-e && along<=r.length+e && Math.abs(across)<=r.width/2+e &&
      Math.abs(map.height[(tz+dz)*n+tx+dx]!-(r.low+(r.high-r.low)*along/r.length))<0.001;
  })));
}

/** A cell is atomic: even a small obstacle intersection reserves the whole tile. */
export function gridCellFree(map:GameMap,tx:number,tz:number):boolean {
  const n=map.tiles,ts=WORLD.tileSize;
  if(tx<0 || tz<0 || tx>=n-1 || tz>=n-1) return false;
  let cells=cache.get(map); if(!cells) {cells=new Map();cache.set(map,cells);}
  const i=tz*n+tx,cached=cells.get(i);if(cached!==undefined)return cached;
  const x=(tx+0.5)*ts-WORLD.half,z=(tz+0.5)*ts-WORLD.half,h=ts/2;
  const heights=[map.height[i]!,map.height[i+1]!,map.height[i+n]!,map.height[i+n+1]!];
  const free=insidePlayableBoundary(map,x,z,h) && !map.water[i] && !map.bridge[i] &&
    (Math.max(...heights)-Math.min(...heights)<=1e-6 || gridCellIsRamp(map,tx,tz)) &&
    ![...map.obstacles,...(map.treeObstacles??[])].some(o=>Math.abs(o.x-x)<o.width/2+h-1e-7 && Math.abs(o.z-z)<o.depth/2+h-1e-7) &&
    ![...(map.rockObstacles??[]),...(map.propObstacles??[])].some(o=>rockIntersectsBox(o,x,z,h-1e-7));
  cells.set(i,free);return free;
}

export function gridFootprintFree(map:GameMap,x:number,z:number,hx=0,hz=hx):boolean {
  const ts=WORLD.tileSize,half=WORLD.half,e=1e-7;
  for(let tz=Math.floor((z-hz+half+(hz?e:0))/ts);tz<=Math.floor((z+hz+half-(hz?e:0))/ts);tz++)
    for(let tx=Math.floor((x-hx+half+(hx?e:0))/ts);tx<=Math.floor((x+hx+half-(hx?e:0))/ts);tx++)
      if(!gridCellFree(map,tx,tz))return false;
  return true;
}

export interface GridOccupants {
  buildings:ReadonlyArray<{kind:BuildKind|'crypt';x:number;z:number}>;
  nodes:ReadonlyArray<{x:number;z:number;amount:number}>;
  units:ReadonlyArray<{x:number;z:number;kind:string;dead?:boolean}>;
}

/** Mark actual occupied cells, never the exclusion area of a selected building. */
export function markGridOccupants(map:GameMap,pixels:Uint8Array,state:GridOccupants):void {
  const n=map.tiles,ts=WORLD.tileSize,e=1e-7;
  const mark=(x:number,z:number,half:number)=>{
    const x0=Math.max(0,Math.floor((x-half+WORLD.half+e)/ts)),x1=Math.min(n-1,Math.floor((x+half+WORLD.half-e)/ts));
    const z0=Math.max(0,Math.floor((z-half+WORLD.half+e)/ts)),z1=Math.min(n-1,Math.floor((z+half+WORLD.half-e)/ts));
    for(let tz=z0;tz<=z1;tz++)for(let tx=x0;tx<=x1;tx++) {
      const i=(tz*n+tx)*4;pixels[i]=pixels[i+1]=pixels[i+2]=0;
    }
  };
  for(const b of state.buildings)mark(b.x,b.z,BUILDING_SIZE[b.kind]/2);
  for(const node of state.nodes)if(node.amount>0)mark(node.x,node.z,INTERACTION.resourceBuildClearance);
  for(const unit of state.units)if(!unit.dead)mark(unit.x,unit.z,unitFootprintSize(unit.kind)/2);
}
