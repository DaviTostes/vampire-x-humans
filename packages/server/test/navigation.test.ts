import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createSession, step, COMPOUNDS, compoundEntrance, VAMPIRE_PLAYER_ID, TICK_RATE } from '@vampire/shared';

test('destino inacessível não monopoliza o tick nem paralisa as outras unidades', () => {
  const session = createSession([], 1);
  const { state, navigation } = session;
  state.phase = 'night';
  const compound = COMPOUNDS[1]!;
  const door = compoundEntrance(compound);
  const length = Math.hypot(door.x - compound.x, door.z - compound.z);
  const out = { x: (door.x - compound.x) / length, z: (door.z - compound.z) / length };
  state.buildings.push({ ...state.buildings[0]!, id: 1001, kind: 'wall', owner: 0, x: door.x, z: door.z });
  const vampire = state.units.find(u => u.kind === 'vampire')!;
  const human = state.units[0]!;
  Object.assign(vampire, { x: door.x + out.x * 5, z: door.z + out.z * 5 });
  Object.assign(human, { x: -3, z: -3 });
  let collisionChecks = 0;
  const canStand = navigation.canStand.bind(navigation);
  navigation.canStand = (...args) => {
    // Limite de trabalho, em vez de tempo de relógio dependente da máquina/CI.
    assert.ok(++collisionChecks < 50000, 'uma busca processou trabalho demais num único tick');
    return canStand(...args);
  };
  for (let i = 0; i < 8 * TICK_RATE; i++) {
    collisionChecks = 0;
    step(session, i === 0 ? [
      { playerId: VAMPIRE_PLAYER_ID, cmd: { type: 'move', ids: [vampire.id], x: compound.x, z: compound.z } },
      { playerId: 0, cmd: { type: 'move', ids: [human.id], x: 6, z: 6 } },
    ] : []);
    assert.ok((vampire.x - door.x) * out.x + (vampire.z - door.z) * out.z > 0, 'vampiro não deve atravessar a entrada fechada');
  }
  assert.ok(Math.hypot(human.x - 6, human.z - 6) < 1);
  assert.equal(state.tick, 8 * TICK_RATE);
});

test('vampiro alcança e ataca humano ou peão coletando junto à árvore', () => {
  for (const hero of [true, false]) {
    const session = createSession([], 1);
    const { state } = session;
    state.phase = 'night';
    const human = state.units[0]!;
    const vampire = state.units.find(u => u.kind === 'vampire')!;
    const tree = state.nodes.find(n => n.kind === 'wood' && Math.hypot(n.x, n.z) < 26)!;
    Object.assign(human, { hero, x: tree.x, z: tree.z - 1.8 });
    Object.assign(vampire, { x: tree.x, z: tree.z + 6 });
    for (let i = 0; i < 6 * TICK_RATE && !human.dead; i++) {
      step(session, i === 0 ? [
        { playerId: 0, cmd: { type: 'gather', ids: [human.id], nodeId: tree.id } },
        { playerId: VAMPIRE_PLAYER_ID, cmd: { type: 'attack', ids: [vampire.id], targetId: human.id } },
      ] : []);
      assert.ok(session.navigation.canStand(vampire, vampire.x, vampire.z));
    }
    assert.ok(human.hp < human.maxHp, 'o vampiro deve acertar o alvo junto à árvore');
    assert.ok(state.vampire.blood > 0);
  }
});

test('busca dividida entre ticks continua perseguindo um alvo em movimento', () => {
  const session = createSession([], 1);
  const { state } = session;
  state.phase = 'night';
  const human = state.units[0]!;
  const vampire = state.units.find(u => u.kind === 'vampire')!;
  Object.assign(human, { x: COMPOUNDS[7]!.x, z: COMPOUNDS[7]!.z });
  Object.assign(vampire, { x: -3, z: -3 });
  for (let i = 0; i < 4 * TICK_RATE; i++) {
    human.z += 0.03;
    step(session, i === 0 ? [{ playerId: VAMPIRE_PLAYER_ID, cmd: { type: 'attack', ids: [vampire.id], targetId: human.id } }] : []);
    assert.ok(session.navigation.canStand(vampire, vampire.x, vampire.z));
  }
  assert.ok(Math.hypot(vampire.x + 3, vampire.z + 3) > 10, 'mudanças do alvo não devem reiniciar a busca a cada tick');
});
