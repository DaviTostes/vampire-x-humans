import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BRIDGES, COMPOUNDS, GAME_CONFIG, WORLD, canPlace, compoundEntrance, createSession, getMapModel, isWaterAt, isWaterAtWorld, step } from '@vampire/shared';

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

test('mapa Labirinto: recursos em terra, refúgios seláveis e conectados ao centro', () => {
  const session = createSession([], 1, [0, 4], undefined, undefined, 'labyrinth');
  const { state, navigation } = session;
  const model = getMapModel('labyrinth');
  assert.equal(model.compounds.length, 8);
  assert.ok(state.nodes.length > 0, 'labirinto deve ter recursos');
  for (const node of state.nodes) assert.ok(!isWaterAt(session.map, node.x, node.z), `recurso na água: ${node.id}`);
  for (const unit of state.units) assert.ok(navigation.canStand(unit, unit.x, unit.z), 'spawn livre');
  const worker = { kind: 'worker' as const };
  // BFS única a partir do spawn: prova que o centro de cada refúgio é
  // alcançável pelo labirinto (sem depender do orçamento do A* por tick).
  const H = Math.floor(WORLD.half);
  const N = H * 2 + 1;
  const idx = (x: number, z: number) => (z + H) * N + (x + H);
  const reached = new Uint8Array(N * N);
  const start = model.humanSpawns[0]!;
  const qx: number[] = [Math.round(start.x)], qz: number[] = [Math.round(start.z)];
  reached[idx(qx[0]!, qz[0]!)] = 1;
  for (let head = 0; head < qx.length; head++) {
    const x = qx[head]!, z = qz[head]!;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx!, nz = z + dz!;
      if (Math.abs(nx) >= H || Math.abs(nz) >= H) continue;
      const i = idx(nx, nz);
      if (reached[i]) continue;
      reached[i] = 1;
      if (navigation.canStand(worker, nx, nz)) { qx.push(nx); qz.push(nz); }
    }
  }
  // Cada refúgio continua com UMA passagem: selar a entrada contém o avanço
  // dentro de um raio de 65; abrir, o centro fica acessível a partir do spawn.
  for (const c of model.compounds) {
    const door = model.compoundEntrance(c);
    const wall = { ...state.buildings[0]!, id: 99999, kind: 'wall' as const, owner: 0, ...door };
    state.buildings.push(wall);
    navigation.refresh();
    const radius = 65, size = radius * 2 + 1;
    const seen = new Uint8Array(size * size);
    const queue = [{ x: Math.round(c.x), z: Math.round(c.z) }];
    const index = (x: number, z: number) => (z - Math.round(c.z) + radius) * size + x - Math.round(c.x) + radius;
    seen[index(queue[0]!.x, queue[0]!.z)] = 1;
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
  }
  for (const c of model.compounds) {
    assert.ok(reached[idx(Math.round(c.x), Math.round(c.z))], `refúgio inalcançável: ${c.name}`);
  }
});
