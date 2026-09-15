import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BUILD_TILE_SIZE, BUILDING_SIZE, buildingTiles, snapBuildingCoordinate, WORLD, type BuildKind } from '../../shared/src/constants.js';
import { canPlaceBuilding } from '../../shared/src/placement.js';
import { normalizeOverlay, type GameMap } from '../../shared/src/mapgen.js';

test('shared construction scale and snapping match the specified tile footprints',()=>{
  assert.equal(BUILD_TILE_SIZE,1.5);
  for(const kind of Object.keys(BUILDING_SIZE) as Array<BuildKind|'crypt'>) {
    const tiles=kind==='tower'||kind==='wall' ? 2 : 4;
    assert.equal(buildingTiles(kind),tiles);
    assert.equal(BUILDING_SIZE[kind],tiles*1.5);
    for(const value of [-31.2,-3,-0.8,0,0.8,3,31.2]) {
      const snapped=snapBuildingCoordinate(value,kind);
      assert.equal(snapBuildingCoordinate(snapped,kind),snapped);
      const edge=(snapped-BUILDING_SIZE[kind]/2)/BUILD_TILE_SIZE;
      assert.ok(Math.abs(edge-Math.round(edge))<1e-9,'footprint edges lie on grid lines');
    }
  }
  const loaded=normalizeOverlay({props:[{kind:'building:tower',x:2.8,z:-2.8,rotY:0.7,scale:4}]});
  assert.deepEqual(loaded.props[0],{kind:'building:tower',x:3,z:-3,rotY:0,scale:1});
});

test('placement uses physical footprint for adjacent buildings and the map edge',()=>{
  const n=WORLD.tiles;
  const map:GameMap={id:'labyrinth',seed:1,tiles:n,height:new Float32Array(n*n).fill(0.24),water:new Uint8Array(n*n),bridge:new Uint8Array(n*n),forest:new Float32Array(n*n),obstacles:[]};
  const state={buildings:[{kind:'wall' as const,x:0,z:0}],nodes:[],units:[]};
  assert.equal(canPlaceBuilding(map,state,'tower',3,0),true);
  assert.equal(canPlaceBuilding(map,state,'tower',1.5,0),false);
  assert.equal(canPlaceBuilding(map,state,'bank',4.5,0),true);
  assert.equal(canPlaceBuilding(map,state,'bank',3,0),false);
  assert.equal(canPlaceBuilding(map,{...state,buildings:[]},'bank',WORLD.half-3,0),false);
});
