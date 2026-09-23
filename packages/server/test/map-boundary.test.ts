import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULT_MAP_BOUNDARY, insideMapBoundary, footprintInsideBoundary, insideBoundary,
  getMapModel, createGameState, canPlaceBuilding, createSession, applyCommand, type Unit } from '@vampire/shared';
import { Navigation } from '../../shared/src/navigation.js';
import { insidePlayableBoundary, playableBoundarySegments, playableMargin } from '@vampire/shared';

const concave = [{x:-10,z:-10},{x:10,z:-10},{x:10,z:10},{x:2,z:10},
  {x:2,z:0},{x:-2,z:0},{x:-2,z:10},{x:-10,z:10}];

test('physical ground remains visible while the margin blocks units and buildings', () => {
  const map=getMapModel('flat').generateMap();
  const physicalEdge=DEFAULT_MAP_BOUNDARY[1]!.x;
  const playableEdge=physicalEdge-playableMargin(map);
  assert.ok(playableMargin(map)>0);
  assert.ok(insideMapBoundary(map,physicalEdge-5,0));
  assert.equal(insidePlayableBoundary(map,physicalEdge-5,0),false);
  assert.ok(insidePlayableBoundary(map,playableEdge-2,0,2));
  assert.equal(insidePlayableBoundary(map,playableEdge-1,0,2),false);
  assert.equal(canPlaceBuilding(map,{buildings:[],nodes:[],units:[]},'wall',physicalEdge-5,0),false);
  const state=createGameState([],0,undefined,undefined,undefined,'flat');
  state.buildings=[];state.nodes=[];
  const nav=new Navigation(state,map);
  for(const kind of ['worker','vampire'] as const) assert.equal(nav.canStand({kind},physicalEdge-5,0),false);
  assert.equal(playableBoundarySegments(map)[0]![0].x,-playableEdge);
});

test('the inset follows concave and diagonal edges at a constant distance', () => {
  const map={boundary:concave,playableMargin:2};
  assert.ok(insideMapBoundary(map,3,4));
  assert.equal(insidePlayableBoundary(map,3,4),false);
  assert.ok(insidePlayableBoundary(map,6,4,1));
  assert.equal(insidePlayableBoundary(map,4,4,1),false);
  const diamond={boundary:[{x:0,z:-10},{x:10,z:0},{x:0,z:10},{x:-10,z:0}],playableMargin:3};
  assert.ok(insidePlayableBoundary(diamond,5,0));
  assert.equal(insidePlayableBoundary(diamond,6,0),false);
  const contour=playableBoundarySegments(map,1);
  assert.ok(contour.length>0);
  for(const segment of contour) for(const p of segment) assert.ok(insideMapBoundary(map,p.x,p.z));
});

test('logical perimeter uses the same vertices as the yellow guide, including full footprints', () => {
  const map = getMapModel('flat').generateMap();
  assert.equal(map.boundary,DEFAULT_MAP_BOUNDARY);
  const edge = DEFAULT_MAP_BOUNDARY[1]!.x;
  assert.ok(insideMapBoundary(map,edge-1,0,1));
  assert.equal(insideMapBoundary(map,edge-0.99,0,1),false);
  assert.equal(insideMapBoundary(map,edge+0.001,0),false);
  assert.equal(insideMapBoundary(map,NaN,0),false);
});

test('concave contour rejects notches even when every footprint corner is inside', () => {
  for (const x of [-5,5]) for (const z of [-5,5]) assert.ok(insideBoundary(concave,x,z));
  assert.equal(footprintInsideBoundary(concave,0,0,5),false);
  assert.equal(insideBoundary(concave,0,5),false);
  assert.ok(footprintInsideBoundary(concave,-6,4,2));
  assert.ok(footprintInsideBoundary(concave,0,-5,2));
  assert.ok(footprintInsideBoundary(concave,-6,4,4,2),'touching the contour is allowed');
});

test('construction and every unit type respect irregular contours and existing obstacles', () => {
  const map = {...getMapModel('flat').generateMap(),boundary:concave,playableMargin:0};
  const empty = {buildings:[],nodes:[],units:[]};
  assert.ok(canPlaceBuilding(map,empty,'wall',-6,4));
  assert.equal(canPlaceBuilding(map,empty,'wall',0,4),false);
  const state = createGameState([],0,undefined,undefined,undefined,'flat');
  state.buildings=[]; state.nodes=[];
  const nav = new Navigation(state,map);
  for (const kind of ['worker','vampire'] as const) {
    assert.ok(nav.canStand({kind},-6,4));
    assert.equal(nav.canStand({kind},0,4),false);
    assert.equal(nav.canStand({kind},9.9,4),false);
  }
  map.treeObstacles=[{x:-6,z:4,width:3,depth:3,height:0}];
  assert.equal(canPlaceBuilding(map,empty,'wall',-6,4),false);
  assert.equal(new Navigation(state,map).canStand({kind:'worker'},-6,4),false);
});

test('move commands outside the contour are rejected and paths stay inside a concave map', () => {
  const session = createSession([],1,undefined,undefined,undefined,'flat');
  session.map.boundary=concave; session.map.playableMargin=0;
  const unit = session.state.units[0]!;
  Object.assign(unit,{x:-6,z:4,order:null});
  applyCommand(session,unit.owner,{type:'move',ids:[unit.id],x:0,z:4});
  assert.equal(unit.order,null);
  session.state.buildings=[]; session.state.nodes=[]; session.state.units=[unit];
  unit.order={t:'move',x:6,z:4};
  const nav = new Navigation(session.state,session.map);
  let arrived=false;
  for (let i=0;i<600 && !arrived;i++) {
    session.state.tick++; nav.refresh();
    arrived=nav.move(unit as Unit,6,4,6,1/30);
    assert.ok(nav.canStand(unit,unit.x,unit.z));
  }
  assert.ok(arrived,'must go around the notch instead of cutting across outside ground');
});
