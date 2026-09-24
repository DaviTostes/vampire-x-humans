import assert from 'node:assert/strict';
import { test } from 'node:test';
import { WORLD, getMapModel, terrainCellWalkable, terrainFootprintWalkable, canPlaceBuilding, createGameState, unitRadius } from '@vampire/shared';
import { Navigation } from '../../shared/src/navigation.js';
import { brushAnchor } from '../../client/src/builder-brush.js';

function plateau() {
  const map=getMapModel('flat').generateMap(),origin=WORLD.half/WORLD.tileSize;
  map.height.fill(0.24);
  for(let z=origin;z<=origin+4;z++) for(let x=origin;x<=origin+4;x++) map.height[z*map.tiles+x]=0.6;
  return {map,origin};
}

test('all flat top cells remain valid up to the edge; only lateral cells are steep',()=>{
  const {map,origin}=plateau();
  for(let z=origin;z<origin+4;z++) for(let x=origin;x<origin+4;x++) assert.ok(terrainCellWalkable(map,x,z));
  assert.equal(terrainCellWalkable(map,origin-1,origin+1),false);
  assert.equal(terrainCellWalkable(map,origin+4,origin+1),false);
  assert.ok(terrainFootprintWalkable(map,1,1,1));
  assert.equal(terrainFootprintWalkable(map,0.99,1,1),false);
});

test('buildings and units may touch the top edge without an invisible margin',()=>{
  const {map}=plateau();
  const empty={buildings:[],nodes:[],units:[]};
  assert.ok(canPlaceBuilding(map,empty,'wall',1.5,4));
  assert.equal(canPlaceBuilding(map,empty,'wall',1.49,4),false);
  const state=createGameState([],0,undefined,undefined,undefined,'flat');
  state.buildings=[];state.nodes=[];
  const nav=new Navigation(state,map);
  for(const kind of ['worker','vampire'] as const) {
    const r=unitRadius(kind);
    assert.ok(nav.canStand({kind},r,4));
    assert.equal(nav.canStand({kind},r-0.01,4),false);
    assert.equal(nav.canStand({kind},-1,4),false);
  }
});

test('raise selection has a single deterministic position throughout a terrain cell',()=>{
  const anchor=brushAnchor('terrain:raise',0.001,0.001);
  for(const x of [0.001,0.3,0.99,1.5,1.999]) for(const z of [0.001,0.7,1.4,1.999]) {
    assert.deepEqual(brushAnchor('terrain:raise',x,z),anchor);
  }
  assert.notEqual(brushAnchor('terrain:raise',2,0).key,anchor.key);
});
