import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BRIDGES, COMPOUNDS, GAME_CONFIG, WORLD, canPlace, compoundEntrance, createSession, isWaterAt, isWaterAtWorld, step } from '@vampire/shared';

test('encostas têm uma única passagem: muro sela cada refúgio e humanos atravessam', () => {
  for (const c of COMPOUNDS) {
    const session = createSession([], 1, [0]);
    const { state, navigation } = session;
    const door = compoundEntrance(c);
    assert.ok(canPlace(session, 'wall', door.x, door.z), `muro deve caber: ${c.name}`);
    const wall = { ...state.buildings[0]!, id: 9999, kind: 'wall' as const, owner: 0, ...door };
    state.buildings.push(wall);
    navigation.refresh();
    assert.ok(navigation.canStand({ kind: 'worker' }, door.x, door.z), c.name);
    assert.ok(!navigation.canStand({ kind: 'vampire' }, door.x, door.z), c.name);

    // Busca exaustiva de dentro para fora: detecta brechas em qualquer trecho
    // da encosta, mesmo que o A* ainda não tenha tido tempo de encontrá-las.
    const radius = 65, size = radius * 2 + 1;
    const seen = new Uint8Array(size * size);
    const queue = [{ x: c.x, z: c.z }];
    const index = (x: number, z: number) => (z - c.z + radius) * size + x - c.x + radius;
    seen[index(c.x, c.z)] = 1;
    for (let head = 0; head < queue.length; head++) {
      const p = queue[head]!;
      assert.ok(Math.abs(p.x - c.x) < radius && Math.abs(p.z - c.z) < radius, `brecha em ${c.name}`);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const x = p.x + dx!, z = p.z + dz!, i = index(x, z);
        if (seen[i]) continue;
        seen[i] = 1;
        if (navigation.canStand({ kind: 'vampire' }, x, z)) queue.push({ x, z });
      }
    }
    state.buildings = state.buildings.filter(b => b !== wall);
    navigation.refresh();
    assert.ok(navigation.canStand({ kind: 'vampire' }, door.x, door.z), c.name);
    const worker = state.units[0]!;
    worker.order = { t: 'move', x: c.x, z: c.z };
    for (let i = 0; i < 90 * GAME_CONFIG.simulation.ticksPerSecond && worker.order; i++) step(session, []);
    assert.ok(Math.hypot(worker.x - c.x, worker.z - c.z) < 1, `rota até ${c.name}`);
  }
});

test('ilha, recursos e pontes concordam com colisão e construção', () => {
  const session = createSession([], 1, [0]);
  for (const x of [-WORLD.half + 1, WORLD.half - 1]) for (const z of [-WORLD.half + 1, WORLD.half - 1]) {
    assert.ok(isWaterAt(session.map, x, z), 'cantos do mundo devem ser mar');
  }
  for (const node of session.state.nodes) assert.ok(!isWaterAt(session.map, node.x, node.z), `recurso na água: ${node.id}`);
  for (const unit of session.state.units) assert.ok(session.navigation.canStand(unit, unit.x, unit.z), 'spawn livre');
  for (const b of BRIDGES) {
    assert.ok(isWaterAtWorld(b.x, b.z), 'vau deve cobrir água');
    assert.ok(!canPlace(session, 'wall', b.x, b.z), 'não construir na ponte');
    const horizontal = b.width >= b.depth, length = horizontal ? b.width : b.depth;
    for (let d = -length / 2 + 2; d <= length / 2 - 2; d++) {
      assert.ok(session.navigation.canStand({ kind: 'worker' }, b.x + (horizontal ? d : 0), b.z + (horizontal ? 0 : d)), 'tabuleiro contínuo');
    }
  }
});
