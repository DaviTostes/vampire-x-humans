import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BUILD_TILE_SIZE, BUILDING_SIZE, WORLD } from '../../shared/src/constants.js';
import { Navigation, unitRadius } from '../../shared/src/navigation.js';
import { canPlaceBuilding } from '../../shared/src/placement.js';
import { createGameState } from '../../shared/src/state.js';
import type { GameMap } from '../../shared/src/mapgen.js';

function corridor(width:number):GameMap {
  const n=WORLD.tiles,half=WORLD.half;
  return {id:'labyrinth',seed:1,tiles:n,height:new Float32Array(n*n).fill(0.24),water:new Uint8Array(n*n),bridge:new Uint8Array(n*n),forest:new Float32Array(n*n),
    obstacles:[{x:-half/2,z:0,width:half,depth:6,height:5},{x:(half+width)/2,z:0,width:half-width,depth:6,height:5}]};
}

test('one-tile human and two-tile vampire fit only passages wide enough',()=>{
  const state=createGameState([],1,[]); state.buildings=[]; state.nodes=[];
  assert.equal(unitRadius('worker')*2,BUILD_TILE_SIZE);
  assert.equal(unitRadius('vampire')*2,2*BUILD_TILE_SIZE);
  const narrow=new Navigation(state,corridor(BUILD_TILE_SIZE));
  assert.equal(narrow.canStand({kind:'worker'},BUILD_TILE_SIZE/2,0),true);
  assert.equal(narrow.canStand({kind:'vampire'},BUILD_TILE_SIZE/2,0),false);
  const wide=new Navigation(state,corridor(2*BUILD_TILE_SIZE));
  assert.equal(wide.canStand({kind:'vampire'},BUILD_TILE_SIZE,0),true);
  assert.equal(wide.canStand({kind:'vampire'},BUILD_TILE_SIZE-0.01,0),false);
});

test('pathfinding turns into exact-width corridors for both unit sizes',()=>{
  for(const kind of ['worker','vampire'] as const) {
    const state=createGameState([],1,[]); state.buildings=[]; state.nodes=[];
    const map=corridor(unitRadius(kind)*2),nav=new Navigation(state,map);
    const unit={...state.units[0]!,kind,x:-3,z:-9,order:{t:'move' as const,x:3,z:9}};
    state.units=[unit];
    let crossed=false;
    for(let i=0;i<500 && Math.hypot(unit.x-3,unit.z-9)>0.1;i++) {
      state.tick++; nav.refresh(); nav.move(unit,3,9,6,0.05,0.1);
      assert.ok(nav.canStand(unit,unit.x,unit.z),'continuous movement respects footprint');
      if(Math.abs(unit.z)<1)crossed=true;
    }
    assert.ok(crossed,`${kind} used the passage`);
    assert.ok(Math.hypot(unit.x-3,unit.z-9)<=0.1,`${kind} reached destination`);
  }
});

test('construction excludes each unit using its actual footprint',()=>{
  const map=corridor(BUILD_TILE_SIZE); map.obstacles=[];
  const state={buildings:[],nodes:[],units:[{kind:'worker' as 'worker'|'vampire',x:0,z:0}]};
  const edge=BUILDING_SIZE.wall/2+unitRadius('worker');
  assert.equal(canPlaceBuilding(map,state,'wall',edge,0),true);
  assert.equal(canPlaceBuilding(map,state,'wall',edge-0.01,0),false);
  state.units[0]!.kind='vampire';
  assert.equal(canPlaceBuilding(map,state,'wall',edge,0),false);
  assert.equal(canPlaceBuilding(map,state,'wall',BUILDING_SIZE.wall/2+unitRadius('vampire'),0),true);
});
