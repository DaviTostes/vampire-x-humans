import assert from 'node:assert/strict';
import { test } from 'node:test';
import { WORLD } from '../../shared/src/constants.js';
import { getMapModel, normalizeOverlay, setMapOverlay, type GameMap } from '../../shared/src/mapgen.js';
import { FLAT_GROUND_HEIGHT, clearedAreaIntersects } from '../../shared/src/map-clearance.js';
import { carveTerrainStair, RELIEF_STEP } from '../../shared/src/terrain.js';
import { Navigation } from '../../shared/src/navigation.js';
import { createGameState } from '../../shared/src/state.js';

test('compact stairs: four directions, brush sizes, traversal and atomic rejection', () => {
  const n=WORLD.tiles, ts=WORLD.tileSize;
  const state=createGameState([],1,[]); state.buildings=[]; state.nodes=[];
  const makeMap=(dx:number,dz:number,rise=RELIEF_STEP):GameMap => {
    const height=new Float32Array(n*n);
    for(let z=0;z<n;z++)for(let x=0;x<n;x++) height[z*n+x]=0.24+((x*ts-WORLD.half)*dx+(z*ts-WORLD.half)*dz>=0 ? rise : 0);
    return {id:'labyrinth',seed:1,tiles:n,height,water:new Uint8Array(n*n),bridge:new Uint8Array(n*n),forest:new Float32Array(n*n),obstacles:[]};
  };
  for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]] as const)for(const brush of [1,2,8]) {
    const map=makeMap(dx,dz), stair=carveTerrainStair(map,0,0,brush);
    assert.ok(stair); assert.ok(stair.length<=4*ts && stair.width<=4*ts);
    const nav=new Navigation(state,map);
    for(const kind of ['worker','vampire'] as const)for(let distance=-2;distance<=stair.length+2;distance+=0.25)
      assert.ok(nav.canStand({kind},stair.x+stair.dx*distance,stair.z+stair.dz*distance),`${kind} ${dx},${dz} at ${distance}`);
  }
  const tall=makeMap(1,0,0.8), before=tall.height.slice();
  assert.equal(carveTerrainStair(tall,0,0,8),null); assert.deepEqual(tall.height,before);
  const blocked=makeMap(1,0); blocked.obstacles.push({x:-4,z:0,width:2,depth:2,height:3});
  const blockedBefore=blocked.height.slice();
  assert.equal(carveTerrainStair(blocked,0,0,2),null); assert.deepEqual(blocked.height,blockedBefore);
});

test('clearing survives serialization, removes resource/collision and preserves later height edits', () => {
  const id='hollows', base=getMapModel(id), original=base.generateMap();
  const resource=base.resourcePlacements[0]!;
  const cells=new Set<number>();
  const tx=Math.floor((resource.x+WORLD.half)/WORLD.tileSize),tz=Math.floor((resource.z+WORLD.half)/WORLD.tileSize);
  const height=Array.from(original.height),paint=Array.from(base.paint!);
  for(let z=tz-4;z<=tz+4;z++)for(let x=tx-4;x<=tx+4;x++) {
    const i=z*WORLD.tiles+x; cells.add(i); paint[i]=2;
    for(const offset of [0,1,WORLD.tiles,WORLD.tiles+1])height[i+offset]=FLAT_GROUND_HEIGHT;
  }
  const obstacleTile=tz*WORLD.tiles+tx;
  const obstacle={x:(tx+0.5)*WORLD.tileSize-WORLD.half,z:(tz+0.5)*WORLD.tileSize-WORLD.half};
  const water=original.water.findIndex(v=>v===1); assert.ok(water>=0); cells.add(water);
  height[water]=FLAT_GROUND_HEIGHT;
  const overlay=normalizeOverlay(JSON.parse(JSON.stringify({version:1,cleared:[...cells],height,paint,stairs:base.stairs,props:[],adds:[obstacleTile],removes:[]})));
  try {
    setMapOverlay(id,overlay);
    const loaded=getMapModel(id),map=loaded.generateMap();
    assert.equal(map.water[water],0);
    assert.ok(!loaded.resourcePlacements.some(p=>p.x===resource.x&&p.z===resource.z));
    assert.ok(!map.obstacles.some(p=>p.x===obstacle.x&&p.z===obstacle.z));
    assert.deepEqual(loaded.paint,paint);
    const state=createGameState([],1,[],undefined,undefined,id); state.buildings=[];
    const nav=new Navigation(state,map);
    for(const kind of ['worker','vampire'] as const)assert.ok(nav.canStand({kind},resource.x,resource.z),'cleared resource leaves a walkable floor');
    assert.ok(!loaded.isForestAt(resource.x,resource.z));
    overlay.height![tz*WORLD.tiles+tx]=0.6;
    setMapOverlay(id,normalizeOverlay(JSON.parse(JSON.stringify(overlay))));
    assert.ok(Math.abs(getMapModel(id).generateMap().height[tz*WORLD.tiles+tx]!-0.6)<1e-6);
    const untouched=original.height.findIndex((_,i)=>!clearedAreaIntersects(cells,(i%WORLD.tiles)*WORLD.tileSize-WORLD.half,Math.floor(i/WORLD.tiles)*WORLD.tileSize-WORLD.half,8));
    assert.equal(map.height[untouched],original.height[untouched]);
  } finally { setMapOverlay(id,null); }
});
