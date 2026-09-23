import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BUILD_TILE_SIZE, BUILDING_SIZE, WORLD, TreeOccupancy, treeFootprint, TREE_SIZE,
  normalizeOverlay, getMapOverlay, setMapOverlay, getMapModel, createGameState, canPlaceBuilding,
  type BuildKind } from '@vampire/shared';
import { Navigation } from '../../shared/src/navigation.js';

test('tree strokes reserve four cells and reject repeated or partially overlapping footprints', () => {
  const grid = new TreeOccupancy();
  assert.equal(new Set(treeFootprint(0, 0).cells).size, 4);
  assert.equal(treeFootprint(0.1, 0.1).key, treeFootprint(0.2, 0.2).key);
  assert.ok(grid.reserve(0, 0));
  for (let i = 0; i < 20; i++) assert.equal(grid.reserve(0.1, 0.1), false);
  for (const [x,z] of [[BUILD_TILE_SIZE,0], [-BUILD_TILE_SIZE,0], [0,BUILD_TILE_SIZE], [BUILD_TILE_SIZE,BUILD_TILE_SIZE]]) {
    assert.equal(grid.reserve(x!,z!), false);
  }
  assert.ok(grid.reserve(TREE_SIZE, 0));
  assert.equal(grid.reserve(WORLD.half, 0), false);
  grid.release(0, 0);
  assert.ok(grid.reserve(0, 0));
  grid.clear();
  assert.ok(grid.reserve(TREE_SIZE, 0));
});

test('saved trees are aligned and deduplicated without changing rotation or scale', () => {
  const tree = { kind:'tree' as const, x:0.1, z:0.1, rotY:0.7, scale:2 };
  const saved = normalizeOverlay({ props:[tree, tree, {...tree,x:BUILD_TILE_SIZE}, {...tree,x:TREE_SIZE}] });
  assert.equal(saved.props.length, 2);
  assert.deepEqual(saved.props[0], {...tree,x:0,z:0});
  assert.deepEqual(normalizeOverlay(JSON.parse(JSON.stringify(saved))), saved);
});

test('tree cells block every building and route humans, workers and vampires around them', () => {
  const original = getMapOverlay('flat');
  try {
    setMapOverlay('flat', normalizeOverlay({ decorReplace:true,
      props:[{kind:'tree',x:0,z:0,rotY:0,scale:3}] }));
    const map = getMapModel('flat').generateMap();
    assert.equal(map.obstacles.length, 0, 'tree collision must not generate visible rocks');
    assert.equal(map.treeObstacles?.[0]?.width, TREE_SIZE);
    const empty = {buildings:[],nodes:[],units:[]};
    for (const kind of Object.keys(BUILDING_SIZE).filter(k => k !== 'crypt') as BuildKind[]) {
      for (const x of [-BUILD_TILE_SIZE/2, BUILD_TILE_SIZE/2]) for (const z of [-BUILD_TILE_SIZE/2, BUILD_TILE_SIZE/2]) {
        assert.equal(canPlaceBuilding(map,empty,kind,x,z),false);
      }
    }
    assert.ok(canPlaceBuilding(map,empty,'wall',TREE_SIZE/2+BUILDING_SIZE.wall/2,0));
    for (const [kind,hero] of [['worker',true], ['worker',false], ['vampire',true]] as const) {
      const state = createGameState([],0,undefined,undefined,undefined,'flat');
      state.buildings = []; state.nodes = [];
      const unit = {...state.units[0]!,kind,hero,x:-9,z:0,order:{t:'move' as const,x:9,z:0}};
      state.units = [unit];
      const nav = new Navigation(state,map);
      for (const x of [-BUILD_TILE_SIZE/2, BUILD_TILE_SIZE/2]) for (const z of [-BUILD_TILE_SIZE/2, BUILD_TILE_SIZE/2]) {
        assert.equal(nav.canStand(unit,x,z),false);
      }
      let arrived = false;
      for (let i=0;i<600 && !arrived;i++) {
        state.tick++; nav.refresh();
        arrived = nav.move(unit,9,0,6,1/30);
        assert.ok(nav.canStand(unit,unit.x,unit.z),'movement must never cross the reserved area');
      }
      assert.ok(arrived, `${kind} hero=${hero} must find a route around the tree`);
    }
    setMapOverlay('flat',normalizeOverlay({props:[]}));
    assert.equal(getMapModel('flat').generateMap().treeObstacles?.length,0);
  } finally { setMapOverlay('flat',original); }
});
