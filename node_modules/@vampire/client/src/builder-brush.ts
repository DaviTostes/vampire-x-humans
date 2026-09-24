import { BUILD_TILE_SIZE, WORLD, snapBuildingCoordinate, treeFootprint, type BuildingKind } from '@vampire/shared';

export function brushPolicy(kind: string) {
  const surface = kind.startsWith('paint:') || kind.startsWith('terrain:');
  const building = kind.startsWith('building:');
  return { surface, building, randomize: kind === 'tree' || kind === 'rock',
    scale: !surface && !building, rotation: !surface,
    rotationStep: building ? 90 : 1,
    step: WORLD.tileSize };
}

export function brushAnchor(kind: string, x: number, z: number) {
  const cell=treeFootprint(x,z);
  x=cell.x;z=cell.z;
  if (kind.startsWith('building:')) {
    const building = kind.slice(9) as BuildingKind;
    x=snapBuildingCoordinate(x,building); z=snapBuildingCoordinate(z,building);
  }
  return {x,z,key:`${kind}:${x},${z}`};
}

/** One visit per category-specific grid position, even on very long pointer moves. */
export function brushSegment(kind: string, a: {x:number;z:number}, b: {x:number;z:number}) {
  const steps=Math.max(1,Math.ceil(Math.max(Math.abs(b.x-a.x),Math.abs(b.z-a.z))/(brushPolicy(kind).step/2)));
  const seen=new Set<string>();
  const points:Array<{x:number;z:number;key:string}>=[];
  for(let i=0;i<=steps;i++) {
    const p=brushAnchor(kind,a.x+(b.x-a.x)*i/steps,a.z+(b.z-a.z)*i/steps);
    if(!seen.has(p.key)) { seen.add(p.key); points.push(p); }
  }
  return points;
}

export interface PropFootprint { x:number; z:number; width:number; depth:number; rotation:number }

/** Rasterize the real footprint onto whole cells of the global terrain grid. */
export function footprintCells(p:PropFootprint):Array<{x:number;z:number}> {
  const ts=WORLD.tileSize,half=WORLD.half,c=Math.abs(Math.cos(p.rotation)),s=Math.abs(Math.sin(p.rotation));
  const hx=(p.width*c+p.depth*s)/2,hz=(p.width*s+p.depth*c)/2,result:Array<{x:number;z:number}>=[];
  for(let z=Math.floor((p.z-hz+half+1e-7)/ts);z<=Math.floor((p.z+hz+half-1e-7)/ts);z++)
    for(let x=Math.floor((p.x-hx+half+1e-7)/ts);x<=Math.floor((p.x+hx+half-1e-7)/ts);x++)
      if(footprintsOverlap(p,{x:(x+0.5)*ts-half,z:(z+0.5)*ts-half,width:ts,depth:ts,rotation:0}))result.push({x,z});
  return result;
}

/** Oriented rectangles: rotation changes rocks/cliffs, never the tree's fixed 1x1 area. */
export function footprintsOverlap(a:PropFootprint,b:PropFootprint):boolean {
  const axes=(r:number)=>[{x:Math.cos(r),z:-Math.sin(r)},{x:Math.sin(r),z:Math.cos(r)}];
  const aa=axes(a.rotation),bb=axes(b.rotation);
  for(const axis of [...aa,...bb]) {
    const radius=(p:PropFootprint,basis:ReturnType<typeof axes>) =>
      p.width/2*Math.abs(axis.x*basis[0]!.x+axis.z*basis[0]!.z)+
      p.depth/2*Math.abs(axis.x*basis[1]!.x+axis.z*basis[1]!.z);
    if(Math.abs((a.x-b.x)*axis.x+(a.z-b.z)*axis.z) >= radius(a,aa)+radius(b,bb)-1e-6) return false;
  }
  return true;
}
