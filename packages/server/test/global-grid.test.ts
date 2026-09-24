import assert from 'node:assert/strict';
import { test } from 'node:test';
import { WORLD, BUILD_TILE_SIZE, getMapModel, gridCellFree, gridFootprintFree, invalidateOccupancyGrid, treeFootprint } from '@vampire/shared';
import { Navigation } from '../../shared/src/navigation.js';
import { createGameState } from '../../shared/src/state.js';
import { BUILDING_SIZE, BUILD_COSTS, buildingTiles, snapBuildingCoordinate, unitRadius } from '@vampire/shared';
import { carveTerrainRamp, clearRampObstacles, RELIEF_STEP, canPlaceBuilding, normalizeOverlay, setMapOverlay, getMapOverlay } from '@vampire/shared';

test('human structures and units use global tile sizes; obsolete props are removed on load',()=>{
  for(const kind of ['wall','tower','bank','taverna','market','goldMine'] as const) {
    const tiles=kind==='wall'||kind==='tower'?2:4;
    assert.equal(buildingTiles(kind),tiles);assert.equal(BUILDING_SIZE[kind],tiles*WORLD.tileSize);
    assert.equal((snapBuildingCoordinate(3.1,kind)+BUILDING_SIZE[kind]/2+WORLD.half)%WORLD.tileSize,0);
  }
  assert.equal(unitRadius('worker')*2,WORLD.tileSize);
  assert.equal(unitRadius('vampire')*2,2*WORLD.tileSize);
  assert.ok(!('keep' in BUILD_COSTS));
  const loaded=normalizeOverlay({props:[{kind:'cliff:straight',x:0,z:0},{kind:'building:keep',x:0,z:0},
    {kind:'building:bank',x:1,z:1,scale:5,footprint:{x:1,z:1,width:1,depth:1,rotation:0}}] as never});
  assert.equal(loaded.props.length,1);assert.equal(loaded.props[0]!.footprint!.width,4*WORLD.tileSize);
  assert.equal(loaded.props[0]!.scale,1);
});

test('global grid matches terrain and trees reserve exactly one global cell',()=>{
  assert.equal(BUILD_TILE_SIZE,WORLD.tileSize);
  const f=treeFootprint(0,0);assert.equal(f.cells.length,1);
  const map=getMapModel('flat').generateMap(),c=WORLD.half/WORLD.tileSize;
  map.treeObstacles=[{x:1,z:1,width:2,depth:2,height:4}];
  assert.equal(gridCellFree(map,c,c),false);
  assert.equal(gridCellFree(map,c-1,c),true);
  assert.equal(gridCellFree(map,c+1,c),true);
});

test('tiny slope or rock intersection blocks the entire tile for every unit',()=>{
  const map=getMapModel('flat').generateMap(),c=WORLD.half/WORLD.tileSize;
  const state=createGameState([],1,[]);state.buildings=[];state.nodes=[];
  const nav=new Navigation(state,map);
  assert.ok(gridCellFree(map,c,c));
  map.height[c*map.tiles+c]+=0.001;invalidateOccupancyGrid(map);
  assert.equal(gridCellFree(map,c,c),false);
  assert.equal(gridFootprintFree(map,1.9,1.9,0.01),false);
  for(const kind of ['human','worker','vampire'] as const)assert.equal(nav.canStand({kind},1,1),false);
  map.height[c*map.tiles+c]=map.height[c*map.tiles+c+1]!;
  map.rockObstacles=[{x:2.099,z:1,width:0.2,depth:0.2,rotation:0}];invalidateOccupancyGrid(map);
  assert.equal(gridCellFree(map,c,c),false);
  assert.equal(gridFootprintFree(map,0.1,0.1,0.01),false);
  map.rockObstacles=[];invalidateOccupancyGrid(map);
  assert.ok(gridCellFree(map,c,c));
});

test('only intentional ramps permit sloped cells, navigation and construction, including save/load',()=>{
  const previous=getMapOverlay('flat');
  try {
    for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      setMapOverlay('flat',null);
      const map=getMapModel('flat').generateMap(),n=map.tiles,ts=WORLD.tileSize;
      for(let z=0;z<n;z++)for(let x=0;x<n;x++)
        map.height[z*n+x]=0.1+((x*ts-WORLD.half)*dx!+(z*ts-WORLD.half)*dz!>=0?RELIEF_STEP:0);
      const ramp=carveTerrainRamp(map,0,0)!;assert.ok(ramp);
      const x=ramp.x+ramp.dx*ramp.length/2,z=ramp.z+ramp.dz*ramp.length/2;
      const state=createGameState([],1,[]);state.nodes=[];state.buildings=[];state.units=[];
      const nav=new Navigation(state,map);
      for(const kind of ['human','worker','vampire'] as const)assert.ok(nav.canStand({kind},x,z));
      assert.ok(canPlaceBuilding(map,state,'wall',x,z));
      clearRampObstacles(map,[]);
      assert.equal(gridFootprintFree(map,x,z,0.1),false,'identical slope without ramp metadata stays blocked');
      clearRampObstacles(map,[ramp]);
      setMapOverlay('flat',normalizeOverlay(JSON.parse(JSON.stringify({props:[],height:Array.from(map.height),stairs:[ramp]}))));
      const loaded=getMapModel('flat').generateMap();
      assert.ok(gridFootprintFree(loaded,x,z,0.1));
      assert.ok(canPlaceBuilding(loaded,state,'wall',x,z));
      const i=Math.floor((z+WORLD.half)/ts)*n+Math.floor((x+WORLD.half)/ts);
      loaded.height[i]+=0.02;invalidateOccupancyGrid(loaded);
      assert.equal(gridCellFree(loaded,i%n,Math.floor(i/n)),false,'deformed ramp cell does not inherit permission');
    }
  } finally {setMapOverlay('flat',previous);}
});
