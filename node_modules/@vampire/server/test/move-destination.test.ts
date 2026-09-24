import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getMapModel, createGameState, createSession, applyCommand, WORLD, carveTerrainRamp, RELIEF_STEP } from '@vampire/shared';
import { Navigation } from '../../shared/src/navigation.js';

function setup(x:number,z:number,gx:number,gz:number) {
  const map=getMapModel('flat').generateMap(),state=createGameState([],1,[]);
  state.nodes=[];state.buildings=[];
  const unit={...state.units[0]!,kind:'worker' as const,hero:true,x,z,order:{t:'move' as const,x:gx,z:gz}};
  state.units=[unit];const nav=new Navigation(state,map);
  const run=()=>{
    let done=false;
    for(let i=0;i<1800&&!done;i++) {
      state.tick++;nav.refresh();done=nav.move(unit,gx,gz,9,1/30);
      assert.ok(nav.canStand(unit,unit.x,unit.z),'movement never intersects obstacles');
    }
    assert.ok(done,'resolved movement must finish instead of repeatedly rejecting the destination');
  };
  return {map,state,unit,nav,run};
}

test('click inside a building resolves to a nearby free destination',()=>{
  const {state,unit,run}=setup(-12,1,0,0);
  state.buildings=[{id:100,kind:'bank',x:0,z:0} as never];
  run();assert.ok(Math.hypot(unit.x,unit.z)<=5.01);
});

test('click anywhere in a one-tile corridor resolves to its valid centerline',()=>{
  for(const hero of [true,false]) {
    const {state,unit,run}=setup(0,-10,0.1,0);
    unit.hero=hero;
    state.buildings=[{id:100,kind:'bank',x:-4,z:0},{id:101,kind:'bank',x:6,z:0}] as never;
    run();assert.ok(Math.abs(unit.x-1)<0.01 && Math.abs(unit.z)<0.01);
  }
});

test('disconnected target resolves to the nearest reachable side of a barrier',()=>{
  const {map,unit,run}=setup(-12,1,12,1);
  map.boundary=[{x:-24,z:-24},{x:24,z:-24},{x:24,z:24},{x:-24,z:24}];map.playableMargin=0;
  map.obstacles=[{x:0,z:0,width:4,depth:48,height:4}];
  run();assert.ok(unit.x<0);assert.ok(unit.x>=-3.01);assert.ok(Math.abs(unit.z-1)<0.01);
});

test('a valid fractional click is reached exactly',()=>{
  const {unit,run}=setup(0,0,5.3,6.7);run();
  assert.ok(Math.hypot(unit.x-5.3,unit.z-6.7)<0.01);
});

test('fractional destination behind a building starts moving without exhausting the map',()=>{
  const {state,unit,nav,run}=setup(-12,1,12.3,1.7);
  state.buildings=[{id:100,kind:'bank',x:0,z:0} as never];
  for(let i=0;i<30 && unit.x===-12;i++) {
    state.tick++;nav.refresh();nav.move(unit,12.3,1.7,9,1/30);
  }
  assert.notEqual(unit.x,-12,'reachable fractional goals must not trigger a whole-map search');
  run();assert.ok(Math.hypot(unit.x-12.3,unit.z-1.7)<0.01);
});

test('elevated surfaces connect through ramps in both directions for both footprints',()=>{
  for(const kind of ['worker','vampire'] as const)for(const direction of [-1,1]) {
    const {map,state,unit,nav,run}=setup(-14*direction,1,14.3*direction,1.7);
    unit.kind=kind as typeof unit.kind;
    for(let z=0;z<map.tiles;z++)for(let x=0;x<map.tiles;x++)
      map.height[z*map.tiles+x]=0.1+(x*WORLD.tileSize-WORLD.half>=0?RELIEF_STEP:0);
    const ramp=carveTerrainRamp(map,0,8);assert.ok(ramp);
    run();assert.ok(Math.hypot(unit.x-14.3*direction,unit.z-1.7)<0.01);
    // A second click on the same upper surface must also resolve normally.
    if(direction===1) {
      unit.order={t:'move',x:20.3,z:6.7};
      let done=false;
      for(let i=0;i<300&&!done;i++){state.tick++;nav.refresh();done=nav.move(unit,20.3,6.7,9,1/30);}
      assert.ok(done);assert.ok(Math.hypot(unit.x-20.3,unit.z-6.7)<0.01);
    }
  }
});

test('recovery finds the exact centerline of a one-tile corridor',()=>{
  const {state,unit,nav}=setup(0.7,0.4,1,10);
  state.buildings=[{id:100,kind:'bank',x:-4,z:0},{id:101,kind:'bank',x:6,z:0}] as never;
  nav.refresh();nav.recover(unit);
  assert.equal(unit.x,1);assert.ok(nav.canStand(unit,unit.x,unit.z));
});

test('unsupported resource and construction interactions fall back to movement',()=>{
  const session=createSession([],1,undefined,undefined,undefined,'flat'),unit=session.state.units.find(u=>u.owner===0)!;
  unit.workerRole='lumberjack';unit.hero=false;
  session.state.nodes=[{id:900,kind:'gold',x:12,z:8,amount:100} as never];
  applyCommand(session,0,{type:'gather',ids:[unit.id],nodeId:900});
  assert.deepEqual(unit.order,{t:'move',x:12,z:8});
  session.state.buildings=[{id:901,kind:'bank',owner:0,x:20,z:8,done:false} as never];
  applyCommand(session,0,{type:'resumeBuild',ids:[unit.id],targetId:901});
  assert.deepEqual(unit.order,{t:'move',x:20,z:8});
});

test('outside-map clicks resolve inside the playable boundary',()=>{
  const {unit,nav,run}=setup(0,1,10000,1);run();
  assert.ok(unit.x>0);assert.ok(nav.canStand(unit,unit.x,unit.z));
  assert.equal(nav.canStand(unit,unit.x+1,unit.z),false);
});

test('a newly built obstacle invalidates the route and the unit walks around it',()=>{
  const {state,unit,nav,run}=setup(-15,1,15,1);
  for(let i=0;i<10;i++){state.tick++;nav.refresh();nav.move(unit,15,1,9,1/30);}
  state.buildings=[{id:101,kind:'bank',x:0,z:0} as never];
  run();assert.ok(Math.hypot(unit.x-15,unit.z-1)<0.01);
});
