/** stone_cluster.glb accessor bounds, normalized by the renderer to height 2.35. */
export const ROCK_WIDTH = (0.9453189969062805 + 0.9508140087127686) * 2.35 / (0.6321039795875549 + 0.6360340118408203);
export const ROCK_DEPTH = (0.9064639806747437 + 0.9102650284767151) * 2.35 / (0.6321039795875549 + 0.6360340118408203);
export interface RockCollider { x:number; z:number; width:number; depth:number; rotation:number }
export function rockObstacles(props:ReadonlyArray<{kind:string;x:number;z:number;scale:number;rotY:number}>):RockCollider[] {
  return props.filter(p=>p.kind==='rock').map(p=>({x:p.x,z:p.z,width:ROCK_WIDTH*p.scale,depth:ROCK_DEPTH*p.scale,rotation:p.rotY}));
}

export function rockIntersectsUnit(rock:RockCollider,x:number,z:number,radius:number):boolean {
  const c=Math.cos(rock.rotation),s=Math.sin(rock.rotation),dx=x-rock.x,dz=z-rock.z;
  const ox=Math.max(0,Math.abs(dx*c-dz*s)-rock.width/2);
  const oz=Math.max(0,Math.abs(dx*s+dz*c)-rock.depth/2);
  return ox*ox+oz*oz < radius*radius;
}

export function rockIntersectsBox(rock:RockCollider,x:number,z:number,half:number):boolean {
  const c=Math.cos(rock.rotation),s=Math.sin(rock.rotation),dx=x-rock.x,dz=z-rock.z;
  const w=rock.width/2,d=rock.depth/2,ac=Math.abs(c),as=Math.abs(s);
  return Math.abs(dx)<half+w*ac+d*as && Math.abs(dz)<half+w*as+d*ac &&
    Math.abs(dx*c-dz*s)<w+half*(ac+as) && Math.abs(dx*s+dz*c)<d+half*(ac+as);
}
