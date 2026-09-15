import { mkdirSync, writeFileSync } from 'node:fs';
import { HOLLOW_BASES } from '../../shared/src/hollows.js';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getMapModel, setMapOverlay, normalizeOverlay } from '../../shared/src/mapgen.js';
import { createSession } from '../../shared/src/sim.js';
import { WORLD } from '../../shared/src/constants.js';

test('compact map: real navigation reaches all rooms, resources and stairs', () => {
  const model=getMapModel('hollows');
  const session=createSession([],1,[0,1,2,3],undefined,undefined,'hollows');
  assert.equal(model.compounds.length,6);
  assert.equal(model.stairs!.length,8);
  for(const unit of session.state.units)assert.ok(session.navigation.canStand(unit,unit.x,unit.z),`spawn ${unit.owner}`);
  for(const kind of ['worker','vampire'] as const){
    const h=WORLD.half,N=h*2+1,seen=new Uint8Array(N*N),qx:number[]=[],qz:number[]=[];
    const start=model.humanSpawns[0]!;qx.push(start.x);qz.push(start.z);seen[(start.z+h)*N+start.x+h]=2;
    for(let head=0;head<qx.length;head++)for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const x=qx[head]!+dx!,z=qz[head]!+dz!;
      if(Math.abs(x)>=h||Math.abs(z)>=h)continue;
      const index=(z+h)*N+x+h;if(seen[index])continue;seen[index]=1;
      if(session.navigation.canStand({kind},x,z)){seen[index]=2;qx.push(x);qz.push(z);}
    }
    for(const c of model.compounds)assert.equal(seen[(c.z+h)*N+c.x+h],2,`${kind}: ${c.name}`);
    for(const [i,stair] of model.stairs!.entries())for(let d=-2;d<=stair.length+2;d+=0.5)
      assert.ok(session.navigation.canStand({kind},stair.x+stair.dx*d,stair.z+stair.dz*d),`${kind}: stair ${i}, distance ${d}`);
    assert.ok(qx.every((x,i)=>Math.abs(x)<110&&Math.abs(qz[i]!)<100),'compact playable limits');
    console.log(`${kind}: ${qx.length} reachable positions`);
    if(kind==='worker')for(const resource of model.resourcePlacements){
      let accessible=false;
      for(let z=-4;z<=4;z++)for(let x=-4;x<=4;x++)if(seen[(Math.round(resource.z)+z+h)*N+Math.round(resource.x)+x+h]===2)accessible=true;
      assert.ok(accessible,`resource ${resource.x},${resource.z}`);
    }
  }
  for(const [i,c] of model.compounds.entries()){
    const ring=HOLLOW_BASES[i]!.outline;
    const belongs=(x:number,z:number)=>{
      let inside=false;
      for(let a=0,b=ring.length-1;a<ring.length;b=a++){
        const p=ring[a]!,q=ring[b]!;
        if((p[1]>z)!==(q[1]>z)&&x<(q[0]-p[0])*(z-p[1])/(q[1]-p[1])+p[0])inside=!inside;
      }
      return inside;
    };
    assert.ok(model.resourcePlacements.some(r=>r.kind==='gold'&&belongs(r.x,r.z)),`gold: ${c.name}`);
  }
  if(process.env.VXH_MAP_PREVIEW==='1'){
    const map=model.generateMap();mkdirSync('.tmp',{recursive:true});
    writeFileSync('.tmp/hollows-preview.json',JSON.stringify({tiles:map.tiles,half:WORLD.half,height:Array.from(map.height),water:Array.from(map.water),forest:Array.from(map.forest),paint:model.paint,stairs:model.stairs,bases:HOLLOW_BASES,resources:model.resourcePlacements,spawns:model.humanSpawns,crypt:model.cryptPosition}));
  }
});

test('compact map: save/load and original preset stay independent',()=>{
  const model=getMapModel('hollows'),original=model.generateMap(),legacy=getMapModel('labyrinth').generateMap();
  const overlay=normalizeOverlay(JSON.parse(JSON.stringify({version:1,adds:[],removes:[],props:[],height:Array.from(original.height).map(v=>Math.round(v*1000)/1000),paint:model.paint,stairs:model.stairs})));
  try{
    setMapOverlay('hollows',overlay);
    const loaded=getMapModel('hollows'),heights=loaded.generateMap().height;
    for(let i=0;i<original.height.length;i++)assert.ok(Math.abs(heights[i]!-original.height[i]!)<0.001);
    assert.deepEqual(loaded.stairs,model.stairs);assert.deepEqual(loaded.paint,model.paint);
    const restored=createSession([],1,[0,1,2,3],undefined,undefined,'hollows');
    for(const stair of loaded.stairs!)for(const kind of ['worker','vampire'] as const)for(let d=0;d<=stair.length;d+=0.5)
      assert.ok(restored.navigation.canStand({kind},stair.x+stair.dx*d,stair.z+stair.dz*d),'saved stair');
    overlay.adds=[Math.floor(WORLD.tiles/2)*WORLD.tiles+Math.floor(WORLD.tiles/2)];
    setMapOverlay('hollows',overlay);
    assert.equal(getMapModel('hollows').generateMap().obstacles.length,1,'builder obstacle overlay');
    assert.deepEqual(getMapModel('labyrinth').generateMap().height,legacy.height);
  }finally{setMapOverlay('hollows',null);}
});
