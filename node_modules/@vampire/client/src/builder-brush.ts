import { BUILD_TILE_SIZE, WORLD, snapBuildingCoordinate, treeFootprint, type BuildingKind } from '@vampire/shared';

export function brushPolicy(kind: string) {
  const surface = kind.startsWith('paint:') || kind.startsWith('terrain:');
  const building = kind.startsWith('building:');
  return { surface, building, randomize: kind === 'tree' || kind === 'rock',
    scale: !surface && !building, rotation: !surface,
    rotationStep: building ? 90 : 1,
    step: surface ? WORLD.tileSize : BUILD_TILE_SIZE / 2 };
}

export function brushAnchor(kind: string, x: number, z: number) {
  if (kind === 'tree') return treeFootprint(x,z);
  if (kind.startsWith('building:')) {
    const building = kind.slice(9) as BuildingKind;
    x=snapBuildingCoordinate(x,building); z=snapBuildingCoordinate(z,building);
  } else if (brushPolicy(kind).surface) {
    x=(Math.floor((x+WORLD.half)/WORLD.tileSize)+0.5)*WORLD.tileSize-WORLD.half;
    z=(Math.floor((z+WORLD.half)/WORLD.tileSize)+0.5)*WORLD.tileSize-WORLD.half;
  } else {
    const step=brushPolicy(kind).step;
    x=Math.round(x/step)*step; z=Math.round(z/step)*step;
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

/** Native modular spacing in the module's rotated axes, without stretching it to tree tiles. */
export function moduleAnchor(x:number,z:number,footprint:PropFootprint) {
  const c=Math.cos(footprint.rotation),s=Math.sin(footprint.rotation);
  const ix=Math.round((x*c-z*s)/footprint.width),iz=Math.round((x*s+z*c)/footprint.depth);
  const localX=ix*footprint.width,localZ=iz*footprint.depth;
  return {x:localX*c+localZ*s-footprint.x,z:-localX*s+localZ*c-footprint.z,key:`module:${ix},${iz}`};
}

/** Oriented rectangles: rotation changes rocks/cliffs, never the tree's fixed 2x2 area. */
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
