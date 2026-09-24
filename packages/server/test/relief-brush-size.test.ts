import assert from 'node:assert/strict';
import { test } from 'node:test';
import { WORLD, getMapModel, planReliefRaise, terrainCellWalkable } from '@vampire/shared';

test('sizes 1 through 8 produce exactly N×N flat top cells and no holes',()=>{
  for(let size=1;size<=8;size++) {
    const map=getMapModel('flat').generateMap(),occupied=new Set<number>();
    const center=WORLD.half/WORLD.tileSize;
    const before=map.height.slice();
    const plan=planReliefRaise(map,occupied,center,center,size)!;
    assert.ok(plan); assert.equal(plan.vertices.length,(size+1)**2);
    for(const i of plan.vertices) { map.height[i]=plan.height;occupied.add(i); }
    let tops=0;
    for(let z=plan.z;z<plan.z+size;z++) for(let x=plan.x;x<plan.x+size;x++) {
      assert.ok(terrainCellWalkable(map,x,z)); tops++;
      for(const i of [z*map.tiles+x,z*map.tiles+x+1,(z+1)*map.tiles+x,(z+1)*map.tiles+x+1]) assert.equal(map.height[i],Math.fround(plan.height));
    }
    assert.equal(tops,size*size);
    for(let i=0;i<map.height.length;i++) if(!occupied.has(i)) assert.equal(map.height[i],before[i]);
    assert.equal(terrainCellWalkable(map,plan.x-1,plan.z),false);
  }
});

test('overlapping stamps in a drag extend one uniform plateau without stacking',()=>{
  const map=getMapModel('flat').generateMap(),occupied=new Set<number>(),center=WORLD.half/WORLD.tileSize;
  let target:number|null=null;
  for(const [dx,dz] of [[0,0],[1,0],[2,0],[2,1],[2,2],[1,0]]) {
    const plan=planReliefRaise(map,occupied,center+dx!,center+dz!,3,target)!;
    assert.ok(plan); target=plan.height;
    for(const i of plan.vertices) if(!occupied.has(i)) {map.height[i]=plan.height;occupied.add(i);}
  }
  for(const i of occupied) assert.equal(map.height[i],Math.fround(target!));
});

test('blocked or incompatible stamps are rejected atomically',()=>{
  const map=getMapModel('flat').generateMap(),center=WORLD.half/WORLD.tileSize;
  const occupied=new Set<number>([center*map.tiles+center,center*map.tiles+center+1]);
  map.height[center*map.tiles+center]=0.6;map.height[center*map.tiles+center+1]=0.8;
  const before=map.height.slice();
  assert.equal(planReliefRaise(map,occupied,center,center,3),null);
  assert.deepEqual(map.height,before);
  assert.equal(planReliefRaise(map,new Set(),center,center,3,null,()=>false),null);
  assert.equal(planReliefRaise(map,new Set(),0,0,3),null);
});
