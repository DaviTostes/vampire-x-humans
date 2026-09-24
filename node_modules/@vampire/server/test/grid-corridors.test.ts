import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import { BUILDING_SIZE, WORLD, createGameState, getMapModel, markGridOccupants, snapBuildingCoordinate } from '@vampire/shared';
import { Navigation } from '../../shared/src/navigation.js';
import { fitBuildingVisual } from '../../client/src/building-visual.js';
import { brushAnchor } from '../../client/src/builder-brush.js';

test('one-tile building corridors admit workers and humans, but require two tiles for vampires',()=>{
  for(const horizontal of [false,true])for(const gap of [1,2]) {
    const map=getMapModel('flat').generateMap(),state=createGameState([],1,[]);
    const position=(x:number,z:number)=>horizontal?{x:z,z:x}:{x,z};
    state.nodes=[];
    state.buildings=[{...state.buildings[0]!,id:101,kind:'bank',...position(-4,0)},
      {...state.buildings[0]!,id:102,kind:'bank',...position(4+gap*WORLD.tileSize,0)}];
    const nav=new Navigation(state,map),center=gap*WORLD.tileSize/2;
    for(let d=-3;d<=3;d+=0.25) {
      const p=position(center,d);
      for(const kind of ['human','worker','vampire'] as const)
        assert.equal(nav.canStand({kind},p.x,p.z),kind!=='vampire'||gap===2,`${kind}, gap=${gap}, horizontal=${horizontal}`);
    }
    const pixels=new Uint8Array(map.tiles*map.tiles*4).fill(255);
    markGridOccupants(map,pixels,{...state,units:[]});
    const p=position(1,1),i=(Math.floor((p.z+WORLD.half)/WORLD.tileSize)*map.tiles+Math.floor((p.x+WORLD.half)/WORLD.tileSize))*4;
    assert.equal(pixels[i],255,'free corridor stays clear on the global grid');
    for(const hero of [true,false]) {
      const unit={...state.units[0]!,kind:'worker' as const,hero,...position(0,-9),order:{t:'move' as const,...position(center,9)}};
      state.units=[unit];const navigation=new Navigation(state,map),goal=position(center,9);
      let arrived=false,passedCorridor=false;
      for(let tick=0;tick<500 && !arrived;tick++) {
        state.tick++;navigation.refresh();arrived=navigation.move(unit,goal.x,goal.z,6,1/30);
        assert.ok(navigation.canStand(unit,unit.x,unit.z));
        const across=horizontal?unit.z:unit.x;
        if(Math.abs(horizontal?unit.x:unit.z)<1 && across>=1-1e-7 && across<=gap*WORLD.tileSize-1+1e-7)passedCorridor=true;
      }
      assert.ok(arrived);assert.ok(passedCorridor,'A* must actually traverse the narrow corridor');
    }
  }
});

test('touching an adjacent blocked cell is allowed without an extra sampling margin',()=>{
  const map=getMapModel('flat').generateMap(),state=createGameState([],1,[]),c=WORLD.half/WORLD.tileSize;
  state.nodes=[];state.buildings=[];
  map.water[c*map.tiles+c+1]=1;
  const nav=new Navigation(state,map);
  assert.ok(nav.canStand({kind:'worker'},1,1));
  assert.equal(nav.canStand({kind:'worker'},1.01,1),false);
});

test('builder and game snap to the same position throughout every global cell',()=>{
  for(const kind of ['tower','wall','bank','market'] as const)for(const base of [-4,0,6]) {
    const expected=brushAnchor(`building:${kind}`,base+0.01,0.01);
    for(const offset of [0.01,0.99,1.99]) {
      assert.equal(snapBuildingCoordinate(base+offset,kind),expected.x);
      assert.equal(snapBuildingCoordinate(expected.x,kind),expected.x,'snap is idempotent');
    }
  }
});

test('4x4 visuals grow uniformly and stay centered without changing logical footprint',()=>{
  const visual=new THREE.Group();
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(4,4,3));mesh.position.set(2,3,-1);visual.add(mesh);
  const footprint=BUILDING_SIZE.bank;fitBuildingVisual(visual,'bank');
  const box=new THREE.Box3().setFromObject(visual),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
  assert.ok(size.x>3.8 && size.x<footprint);
  assert.ok(Math.abs(center.x)<1e-6 && Math.abs(center.z)<1e-6 && Math.abs(box.min.y)<1e-6);
  assert.equal(visual.scale.x,visual.scale.y);assert.equal(visual.scale.x,visual.scale.z);
  assert.equal(BUILDING_SIZE.bank,footprint);
  mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();
});

test('wall visual fills its 2x2 footprint without expanding collision',()=>{
  const visual=new THREE.Group(),mesh=new THREE.Mesh(new THREE.BoxGeometry(2,4,1));
  mesh.position.set(1,2,-1);visual.add(mesh);fitBuildingVisual(visual,'wall');
  const bounds=new THREE.Box3().setFromObject(visual),size=bounds.getSize(new THREE.Vector3());
  assert.ok(Math.abs(size.x-BUILDING_SIZE.wall*0.97)<1e-6);
  assert.equal(BUILDING_SIZE.wall,2*WORLD.tileSize);
  assert.ok(Math.abs(bounds.min.x)<=BUILDING_SIZE.wall/2 && Math.abs(bounds.max.x)<=BUILDING_SIZE.wall/2);
  assert.equal(visual.scale.x,visual.scale.y);assert.equal(visual.scale.x,visual.scale.z);
  mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();
});

test('tent, evolved market and tower scales remain visual-only and centered',()=>{
  const measure=(kind:'bank'|'market'|'tower',level:number)=>{
    const visual=new THREE.Group(),mesh=new THREE.Mesh(new THREE.BoxGeometry(2,4,2));
    mesh.position.set(1,2,-1);visual.add(mesh);fitBuildingVisual(visual,kind,level);
    const box=new THREE.Box3().setFromObject(visual),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
    assert.ok(size.x<=BUILDING_SIZE[kind] && size.z<=BUILDING_SIZE[kind]);
    assert.ok(Math.abs(center.x)<1e-6 && Math.abs(center.z)<1e-6);
    assert.equal(visual.scale.x,visual.scale.y);assert.equal(visual.scale.x,visual.scale.z);
    mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();return size;
  };
  assert.ok(measure('bank',1).y<measure('bank',4).y);
  assert.ok(measure('market',3).y>measure('market',1).y*1.25);
  assert.ok(measure('tower',1).y>3.8*1.5);
  assert.equal(BUILDING_SIZE.tower,WORLD.tileSize*2);
  assert.equal(BUILDING_SIZE.market,WORLD.tileSize*4);
});
