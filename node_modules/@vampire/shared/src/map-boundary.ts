import { WORLD, GAME_CONFIG } from './constants.js';

export interface BoundaryPoint { x: number; z: number }
type BoundaryMap = { boundary?: readonly BoundaryPoint[]; playableMargin?: number };

export function playableMargin(map: BoundaryMap): number {
  return Math.max(0, map.playableMargin ?? GAME_CONFIG.camera.playableMargin);
}

function pointSegmentDistance(x:number,z:number,a:BoundaryPoint,b:BoundaryPoint):number {
  const dx=b.x-a.x,dz=b.z-a.z;
  const t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz || 1)));
  return Math.hypot(x-a.x-t*dx,z-a.z-t*dz);
}

/** Inset by Euclidean distance to every contour segment, including concave corners. */
export function insidePlayableBoundary(map: BoundaryMap,x:number,z:number,halfX=0,halfZ=halfX):boolean {
  if (!insideMapBoundary(map,x,z,halfX,halfZ)) return false;
  const margin=playableMargin(map);
  if (!margin) return true;
  if (!map.boundary || map.boundary===DEFAULT_MAP_BOUNDARY) {
    return Math.abs(x)+halfX <= edge-margin && Math.abs(z)+halfZ <= edge-margin;
  }
  const ring=map.boundary;
  for(let i=0;i<ring.length;i++) {
    const a=ring[i]!,b=ring[(i+1)%ring.length]!;
    // The footprint is already inside. The closest disjoint segment/rectangle
    // pair is an endpoint-to-rectangle or rectangle-corner-to-segment pair.
    for(const p of [a,b]) if(Math.hypot(Math.max(0,Math.abs(p.x-x)-halfX),Math.max(0,Math.abs(p.z-z)-halfZ)) < margin-1e-8) return false;
    for(const px of [x-halfX,x+halfX]) for(const pz of [z-halfZ,z+halfZ]) {
      if(pointSegmentDistance(px,pz,a,b) < margin-1e-8) return false;
    }
  }
  return true;
}

/** Display-only contour; gameplay always uses the exact distance predicate above. */
export function playableBoundarySegments(map: BoundaryMap, step=WORLD.tileSize): Array<[BoundaryPoint,BoundaryPoint]> {
  if (!map.boundary || map.boundary===DEFAULT_MAP_BOUNDARY) {
    const h=edge-playableMargin(map);
    if(h<=0) return [];
    const points=[{x:-h,z:-h},{x:h,z:-h},{x:h,z:h},{x:-h,z:h}];
    return points.map((p,i)=>[p,points[(i+1)%4]!] as [BoundaryPoint,BoundaryPoint]);
  }
  const ring=map.boundary;
  const minX=Math.min(...ring.map(p=>p.x))-step, minZ=Math.min(...ring.map(p=>p.z))-step;
  const nx=Math.ceil((Math.max(...ring.map(p=>p.x))-minX)/step)+1;
  const nz=Math.ceil((Math.max(...ring.map(p=>p.z))-minZ)/step)+1;
  const flags=new Uint8Array(nx*nz);
  for(let z=0;z<nz;z++) for(let x=0;x<nx;x++) flags[z*nx+x]=insidePlayableBoundary(map,minX+x*step,minZ+z*step)?1:0;
  const result:Array<[BoundaryPoint,BoundaryPoint]>=[];
  for(let z=0;z<nz-1;z++) for(let x=0;x<nx-1;x++) {
    const ids=[z*nx+x,z*nx+x+1,(z+1)*nx+x+1,(z+1)*nx+x];
    for(const tri of [[0,1,2],[0,2,3]]) {
      const hits:BoundaryPoint[]=[];
      for(let i=0;i<3;i++) {
        const a=ids[tri[i]!]!, b=ids[tri[(i+1)%3]!]!;
        if(flags[a]===flags[b]) continue;
        let lo=0,hi=1;
        const ax=minX+(a%nx)*step, az=minZ+Math.floor(a/nx)*step;
        const dx=((b%nx)-(a%nx))*step, dz=(Math.floor(b/nx)-Math.floor(a/nx))*step;
        for(let j=0;j<12;j++) {
          const t=(lo+hi)/2;
          if(Number(insidePlayableBoundary(map,ax+dx*t,az+dz*t))===flags[a]) lo=t; else hi=t;
        }
        hits.push({x:ax+dx*(lo+hi)/2,z:az+dz*(lo+hi)/2});
      }
      if(hits.length===2) result.push([hits[0]!,hits[1]!]);
    }
  }
  return result;
}

const edge = WORLD.half - 0.02;
/** The editor's yellow perimeter, shared with authoritative gameplay. */
export const DEFAULT_MAP_BOUNDARY: readonly BoundaryPoint[] = [
  {x:-edge,z:-edge}, {x:edge,z:-edge}, {x:edge,z:edge}, {x:-edge,z:edge},
];

export function insideMapBoundary(map: { boundary?: readonly BoundaryPoint[] }, x: number, z: number, halfX = 0, halfZ = halfX): boolean {
  // Exact fast path for the existing four-vertex perimeter, used by pathfinding.
  if (!map.boundary || map.boundary === DEFAULT_MAP_BOUNDARY) {
    return Number.isFinite(x) && Number.isFinite(z) && Number.isFinite(halfX) && Number.isFinite(halfZ) &&
      halfX >= 0 && halfZ >= 0 && Math.abs(x)+halfX <= edge && Math.abs(z)+halfZ <= edge;
  }
  return footprintInsideBoundary(map.boundary ?? DEFAULT_MAP_BOUNDARY,x,z,halfX,halfZ);
}

/** Includes the contour itself; callers pass a footprint to keep its full area inside. */
export function insideBoundary(ring: readonly BoundaryPoint[], x: number, z: number): boolean {
  if (!Number.isFinite(x) || !Number.isFinite(z) || ring.length < 3) return false;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[j]!, b = ring[i]!;
    const cross = (x-a.x)*(b.z-a.z)-(z-a.z)*(b.x-a.x);
    if (Math.abs(cross) < 1e-8 && x >= Math.min(a.x,b.x)-1e-8 && x <= Math.max(a.x,b.x)+1e-8 &&
        z >= Math.min(a.z,b.z)-1e-8 && z <= Math.max(a.z,b.z)+1e-8) return true;
    if ((a.z > z) !== (b.z > z) && x < (b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x) inside = !inside;
  }
  return inside;
}

/** Checks the whole rectangle, including concave notches between its corners. */
export function footprintInsideBoundary(ring: readonly BoundaryPoint[], x: number, z: number, halfX = 0, halfZ = halfX): boolean {
  if (![x,z,halfX,halfZ].every(Number.isFinite) || halfX < 0 || halfZ < 0) return false;
  if (!halfX && !halfZ) return insideBoundary(ring,x,z);
  const minX=x-halfX, maxX=x+halfX, minZ=z-halfZ, maxZ=z+halfZ;
  for (const px of [minX,maxX]) for (const pz of [minZ,maxZ]) if (!insideBoundary(ring,px,pz)) return false;
  for (let i=0;i<ring.length;i++) {
    const a=ring[i]!, b=ring[(i+1)%ring.length]!;
    let enter=0, leave=1;
    // Clip each contour segment against the open footprint interior. A contour
    // running along its edge is allowed; a notch passing through it is not.
    for (const [start,delta,min,max] of [[a.x,b.x-a.x,minX+1e-8,maxX-1e-8],[a.z,b.z-a.z,minZ+1e-8,maxZ-1e-8]]) {
      if (Math.abs(delta!) < 1e-12) {
        if (start! < min! || start! > max!) { enter=1; leave=0; break; }
      } else {
        const t1=(min!-start!)/delta!, t2=(max!-start!)/delta!;
        enter=Math.max(enter,Math.min(t1,t2)); leave=Math.min(leave,Math.max(t1,t2));
      }
    }
    if (enter <= leave) return false;
  }
  return true;
}
