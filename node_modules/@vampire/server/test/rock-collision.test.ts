import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { ROCK_WIDTH, ROCK_DEPTH, rockObstacles, rockIntersectsUnit, createGameState, createSession,
  getMapModel, getMapOverlay, setMapOverlay, normalizeOverlay, canPlaceBuilding, unitRadius } from '@vampire/shared';
import { Navigation } from '../../shared/src/navigation.js';

test('collision dimensions match the normalized stone model', () => {
  const buffer=readFileSync(new URL('../../client/public/assets/environment/stone_cluster.glb',import.meta.url));
  const gltf=JSON.parse(buffer.subarray(20,20+buffer.readUInt32LE(12)).toString());
  const bounds=gltf.accessors[gltf.meshes[0].primitives[0].attributes.POSITION];
  const scale=2.35/(bounds.max[1]-bounds.min[1]);
  assert.ok(Math.abs(ROCK_WIDTH-(bounds.max[0]-bounds.min[0])*scale)<1e-8);
  assert.ok(Math.abs(ROCK_DEPTH-(bounds.max[2]-bounds.min[2])*scale)<1e-8);
});

test('scaled rotated stones block their edges without blocking empty bounding-box corners', () => {
  const rock=rockObstacles([{kind:'rock',x:0,z:0,scale:2,rotY:Math.PI/4}])[0]!;
  const c=Math.cos(rock.rotation),s=Math.sin(rock.rotation),r=0.75;
  for(const offset of [-0.01,0.01]) {
    const distance=rock.width/2+r+offset;
    assert.equal(rockIntersectsUnit(rock,distance*c,-distance*s,r),offset<0);
  }
  assert.equal(rockIntersectsUnit(rock,4.7,4.7,r),false);
});

test('humans, workers and vampires route around stones and cannot build through them', () => {
  const map=getMapModel('flat').generateMap();
  map.rockObstacles=rockObstacles([{kind:'rock',x:0,z:0,scale:2,rotY:Math.PI/4}]);
  assert.equal(canPlaceBuilding(map,{buildings:[],nodes:[],units:[]},'wall',0,0),false);
  for(const [kind,hero] of [['worker',true],['worker',false],['vampire',true]] as const) {
    const state=createGameState([],0,undefined,undefined,undefined,'flat');
    state.buildings=[];state.nodes=[];
    const unit={...state.units[0]!,kind,hero,x:-12,z:0,order:{t:'move' as const,x:12,z:0}};
    state.units=[unit];
    const nav=new Navigation(state,map);
    assert.equal(nav.canStand(unit,0,0),false);
    let arrived=false;
    for(let i=0;i<600 && !arrived;i++) {
      state.tick++;nav.refresh();arrived=nav.move(unit,12,0,6,1/30);
      assert.ok(nav.canStand(unit,unit.x,unit.z));
    }
    assert.ok(arrived);
  }
});

test('spawns start clear of saved stones, trees and other units before the first tick', () => {
  const original=getMapOverlay('flat');
  try {
    setMapOverlay('flat',null);
    const initial=createGameState([],0,undefined,undefined,undefined,'flat');
    setMapOverlay('flat',normalizeOverlay({props:initial.units.map(unit=>({
      kind:unit.kind==='vampire'?'tree':'rock',x:unit.x,z:unit.z,rotY:0.7,scale:2,
    })),decorReplace:true}));
    const session=createSession([],1,undefined,undefined,undefined,'flat');
    assert.equal(session.state.tick,0);
    assert.ok(session.map.rockObstacles!.length>0);
    for(const unit of session.state.units) {
      assert.ok(session.navigation.canStand(unit,unit.x,unit.z));
      const before=initial.units.find(u=>u.id===unit.id)!;
      assert.ok(Math.hypot(unit.x-before.x,unit.z-before.z)>0);
      for(const other of session.state.units) if(other.id!==unit.id) {
        assert.ok(Math.hypot(unit.x-other.x,unit.z-other.z)>=unitRadius(unit.kind)+unitRadius(other.kind));
      }
    }
  } finally { setMapOverlay('flat',original); }
});
