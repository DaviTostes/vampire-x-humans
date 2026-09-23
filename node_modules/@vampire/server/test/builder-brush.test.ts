import assert from 'node:assert/strict';
import { test } from 'node:test';
import { WORLD, BUILD_TILE_SIZE, BUILDING_SIZE, snapBuildingCoordinate, TreeOccupancy } from '@vampire/shared';
import { brushPolicy, brushAnchor, brushSegment, moduleAnchor, footprintsOverlap, type PropFootprint } from '../../client/src/builder-brush.js';

test('categories preserve their own grids and supported transforms', () => {
  for(const kind of ['paint:grass','paint:path','terrain:raise','terrain:lower','terrain:flatten','terrain:stairs']) {
    const policy=brushPolicy(kind);
    assert.equal(policy.surface,true); assert.equal(policy.randomize,false);
    assert.equal(policy.scale,false); assert.equal(policy.rotation,false);
    const point=brushAnchor(kind,0.1,0.1);
    assert.ok(Math.abs((point.x+WORLD.half)/WORLD.tileSize%1-0.5)<1e-8);
  }
  for(const kind of ['wall','bank','tower'] as const) {
    const policy=brushPolicy(`building:${kind}`), point=brushAnchor(`building:${kind}`,2.1,4.9);
    assert.equal(point.x,snapBuildingCoordinate(2.1,kind));
    assert.equal(policy.scale,false); assert.equal(policy.randomize,false); assert.equal(policy.rotationStep,90);
  }
  assert.ok(brushPolicy('rock').randomize);
  assert.ok(brushPolicy('tree').randomize);
  assert.equal(brushPolicy('cliff:straight').randomize,false);
  assert.ok(brushPolicy('cliff:straight').scale);
});

test('point and fast drag segments cover every floor tile without duplicate stamps', () => {
  const start=brushAnchor('paint:path',-10,5),end=brushAnchor('paint:path',30,5);
  const points=brushSegment('paint:path',start,end);
  assert.equal(points.length,Math.round((end.x-start.x)/WORLD.tileSize)+1);
  assert.equal(new Set(points.map(p=>p.key)).size,points.length);
  assert.deepEqual(points[0],start); assert.deepEqual(points.at(-1),end);
  const stationary=brushSegment('rock',{x:0,z:0},{x:0,z:0});
  assert.equal(stationary.length,1);
});

test('repeated connected tree segments retain individual 2x2 reservations', () => {
  const grid=new TreeOccupancy(); let count=0;
  for(const [a,b] of [[{x:0,z:0},{x:12,z:0}],[{x:12,z:0},{x:12,z:12}],[{x:12,z:12},{x:12,z:0}]] as const) {
    for(const p of brushSegment('tree',a,b)) if(grid.reserve(p.x,p.z)) count++;
  }
  assert.equal(count,9);
});

test('native cliff modules touch edge to edge at their calibrated dimensions and rotation', () => {
  for(const rotation of [0,Math.PI/4,Math.PI/2]) {
    const template={x:0,z:0,width:13.36,depth:6.6,rotation};
    const a=moduleAnchor(0,0,template);
    const b=moduleAnchor(13.36*Math.cos(rotation),-13.36*Math.sin(rotation),template);
    assert.ok(Math.abs(Math.hypot(a.x-b.x,a.z-b.z)-13.36)<1e-8);
    assert.equal(footprintsOverlap({...template,...a},{...template,...b}),false);
    assert.ok(footprintsOverlap({...template,...a},{...template,x:b.x*0.9,z:b.z*0.9}));
  }
});

test('rock and building footprints reject overlap without applying tree dimensions', () => {
  const rock:PropFootprint={x:0,z:0,width:7,depth:2,rotation:Math.PI/2};
  const tree:PropFootprint={x:4,z:0,width:2*BUILD_TILE_SIZE,depth:2*BUILD_TILE_SIZE,rotation:0};
  assert.equal(footprintsOverlap(rock,tree),false);
  assert.ok(footprintsOverlap({...rock,rotation:0},tree));
  const building={x:0,z:0,width:BUILDING_SIZE.bank,depth:BUILDING_SIZE.bank,rotation:0};
  assert.ok(footprintsOverlap(rock,building));
});
