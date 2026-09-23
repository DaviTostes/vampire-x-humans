import assert from 'node:assert/strict';
import { test } from 'node:test';
import { extendTerrainRelief, normalizeOverlay, RELIEF_STEP } from '@vampire/shared';

test('A-B-C preserves the connection height instead of adding another layer', () => {
  const n=12,height=new Float32Array(n*n).fill(0.24),occupied=new Set<number>();
  const first=[26,27,28,29];
  extendTerrainRelief(height,occupied,first,0.24+RELIEF_STEP,n);
  const expected=height[29]!;
  extendTerrainRelief(height,occupied,[29,41,53,65],expected+RELIEF_STEP,n);
  for(const i of [...first,41,53,65]) assert.equal(height[i],expected);
  const before=height.slice();
  extendTerrainRelief(height,occupied,[65,53,41,29],expected+RELIEF_STEP,n);
  assert.deepEqual(height,before);
});

test('crossing, touching and partial overlap preserve existing relief and only fill free vertices', () => {
  const n=12,height=new Float32Array(n*n).fill(0.24),occupied=new Set<number>();
  extendTerrainRelief(height,occupied,[50,51,52,53,54],0.6,n);
  const level=height[52]!;
  extendTerrainRelief(height,occupied,[40,52,64],0.9,n);
  for(const i of [40,50,51,52,53,54,64]) assert.equal(height[i],level);
  extendTerrainRelief(height,occupied,[55,56],0.9,n);
  assert.equal(height[56],level,'touching a neighbor continues at its existing height');
  height[50]=0.8;
  extendTerrainRelief(height,occupied,[50,51,52],0.2,n);
  assert.equal(height[50],Math.fround(0.8),'even different existing heights must be preserved');
  assert.equal(height[51],level);
});

test('occupancy survives save/reload and can be restored by undo or explicitly cleared', () => {
  const n=12,height=new Float32Array(n*n).fill(0.24),occupied=new Set<number>();
  extendTerrainRelief(height,occupied,[26,27],0.6,n);
  const saved=normalizeOverlay(JSON.parse(JSON.stringify({height:Array.from(height),reliefOccupied:[...occupied]})));
  const restored=new Set(saved.reliefOccupied);
  const loaded=Float32Array.from(saved.height!);
  extendTerrainRelief(loaded,restored,[27,28],0.9,n);
  assert.equal(loaded[28],height[27]);
  // Undo restores both the height snapshot and its reservation mask.
  loaded.set(height); restored.clear(); for(const i of occupied) restored.add(i);
  assert.equal(restored.has(28),false);
  // Explicit flattening removes a reservation so the user can rebuild that area.
  loaded[26]=0.24; restored.delete(26); loaded[27]=0.24; restored.delete(27);
  extendTerrainRelief(loaded,restored,[26],0.4,n);
  assert.equal(loaded[26],Math.fround(0.4));
});
