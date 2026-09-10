import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyCommand, canPlace, createSession, step, makeSnapshot, WORLD, type Building, type Session } from '@vampire/shared';
import { createRoom, startRoom } from '../src/rooms.js';

function fixture() {
  const session = createSession([], 42);
  session.map.water.fill(0);
  session.map.obstacles = [];
  session.state.players[0]!.wood = 120;
  session.state.players[0]!.gold = 50;
  session.state.nodes = [];
  session.state.buildings = [];
  session.state.units = session.state.units.filter(u => u.owner === 0 || u.kind === 'vampire');
  const worker = session.state.units.find(u => u.owner === 0)!;
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  Object.assign(worker, { x: -12, z: 0 });
  Object.assign(vampire, { x: 50, z: 50 });
  return { session, worker, vampire };
}

function building(id: number, kind: Building['kind'], x: number, z: number): Building {
  return { id, kind, x, z, owner: 0, hp: 500, maxHp: 500, level: 1, progress: 1,
    done: true, builderId: null, goldAcc: 0, attackCd: 0 };
}

function advance(session: Session, seconds: number, check?: () => void) {
  for (let i = 0; i < seconds * 15; i++) { step(session, []); check?.(); }
}

test('humanos vencem exatamente no amanhecer após a segunda noite', () => {
  const session = createSession([], 1, [0, 4]);
  session.state.phase = 'night'; session.state.phaseTime = 0.01;
  step(session, []);
  assert.equal(session.state.day, 2);
  assert.equal(session.state.result, null);
  session.state.phase = 'night'; session.state.phaseTime = 0.01;
  step(session, []);
  assert.equal(session.state.day, 3);
  assert.equal(session.state.result?.winner, 'human');
});

test('mapa fixo: cada humano começa com um boneco no centro, sem recursos nem prédios', () => {
  for (const seed of [1, 42, 451, 81240]) {
    const { state } = createSession([], seed);
    for (let id = 0; id < 4; id++) {
      assert.equal(state.units.filter(u => u.owner === id).length, 1);
      assert.equal(state.players[id]!.wood, 0);
      assert.equal(state.players[id]!.gold, 0);
      assert.equal(state.buildings.filter(b => b.owner === id).length, 0);
      const unit = state.units.find(u => u.owner === id)!;
      assert.ok(Math.hypot(unit.x, unit.z) < 5);
    }
    assert.equal(state.units.length, 5);
  }
});

test('move contorna uma sede e não atravessa sua colisão em nenhum tick', () => {
  const { session, worker } = fixture();
  session.state.buildings.push(building(1001, 'keep', 0, 0));
  applyCommand(session, 0, { type: 'move', ids: [worker.id], x: 12, z: 0 });
  let detoured = false;
  advance(session, 9, () => {
    assert.ok(session.navigation.canStand(worker, worker.x, worker.z));
    if (Math.abs(worker.z) > 4) detoured = true;
  });
  assert.ok(detoured);
  assert.ok(Math.hypot(worker.x - 12, worker.z) <= 0.85);
});

test('água bloqueia movimento; unidade alcança o destino passando pelo vão', () => {
  const { session, worker } = fixture();
  const n = session.map.tiles;
  for (let z = 0; z < n; z++) {
    if (z >= n / 2 + 4 && z <= n / 2 + 7) continue;
    session.map.water[z * n + n / 2] = 1;
  }
  applyCommand(session, 0, { type: 'move', ids: [worker.id], x: 12, z: 0 });
  advance(session, 12, () => assert.ok(session.navigation.canStand(worker, worker.x, worker.z)));
  assert.ok(Math.hypot(worker.x - 12, worker.z) <= 0.85);
});

test('recursos são infinitos e a coleta é creditada sem voltar à taverna', () => {
  const { session, worker } = fixture();
  session.state.buildings.push(building(1001, 'taverna', 0, 0));
  session.state.nodes.push({ id: 2001, kind: 'wood', x: -18, z: 0, amount: 7, maxAmount: 7 });
  const before = session.state.players[0]!.wood;
  applyCommand(session, 0, { type: 'gather', ids: [worker.id], nodeId: 2001 });
  advance(session, 20, () => assert.ok(session.navigation.canStand(worker, worker.x, worker.z)));
  assert.ok(session.state.players[0]!.wood - before >= 40);
  assert.equal(session.state.nodes[0]!.amount, 7);
  assert.ok(makeSnapshot(session.state).nodes.some(n => n.id === 2001));
  assert.ok(worker.x < -15, 'humano deve permanecer junto ao recurso');
});

test('sala só cria um humano por jogador que escolheu a equipe humana', () => {
  const room = createRoom();
  room.hostId = 'host';
  room.clients = ['host', 'guest', 'vampire'].map(id => ({ id, playerId: -1, name: id, ws: null!, ready: true, role: id === 'vampire' ? 'vampire' : 'human' }));
  assert.equal(startRoom(room, 'host'), true);
  assert.deepEqual(room.session!.state.units.filter(u => u.kind === 'worker').map(u => u.owner), [0, 1]);
  assert.equal(room.session!.state.players.filter(p => p.role === 'human').length, 2);
});

test('torre construída junto à cripta ataca o vampiro de dia e transmite os disparos', () => {
  const session = createSession([], 1, [0, 4]);
  const human = session.state.units.find(u => u.kind === 'worker')!;
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  Object.assign(human, { x: 8, z: -119 });
  Object.assign(session.state.players[0]!, { wood: 100, gold: 100 });
  applyCommand(session, 0, { type: 'build', ids: [human.id], kind: 'tower', x: 5, z: -120 });
  const tower = session.state.buildings.find(b => b.kind === 'tower')!;
  assert.ok(tower);
  advance(session, 6.5);
  assert.equal(vampire.hp, 500, 'torre incompleta não deve disparar');
  advance(session, 1);
  assert.equal(tower.done, true);
  assert.equal(vampire.hp, 485);
  assert.equal(tower.lastShot?.damage, 15);
  assert.equal(tower.lastShot?.targetId, vampire.id);
  advance(session, 3);
  assert.equal(vampire.hp, 455);
  assert.equal(makeSnapshot(session.state).buildings.find(b => b.id === tower.id)!.lastShot?.tick, tower.lastShot?.tick);
});

test('torre não causa dano fora do alcance', () => {
  const { session, vampire } = fixture();
  vampire.x = 18.1; vampire.z = 0;
  const tower = building(1001, 'tower', 0, 0);
  session.state.buildings.push(tower);
  advance(session, 3);
  assert.equal(vampire.hp, 500);
  assert.equal(tower.lastShot, undefined);
});

test('cargas cheias entregam exatamente 10, tanto madeira quanto ouro', () => {
  for (const kind of ['wood', 'gold'] as const) {
    const { session, worker } = fixture();
    const player = session.state.players[0]!;
    player[kind] = 0;
    session.state.nodes = [{ id: 2001, kind, x: -14, z: 0, amount: 100, maxAmount: 100 }];
    // Fora do raio do minério, mas já ao alcance da coleta.
    worker.x = -17;
    applyCommand(session, 0, { type: 'gather', ids: [worker.id], nodeId: 2001 });
    const deliveries: number[] = [];
    let before = 0;
    advance(session, 18, () => {
      if (player[kind] !== before) { deliveries.push(player[kind] - before); before = player[kind]; }
    });
    assert.ok(deliveries.length >= 3);
    assert.ok(deliveries.every(amount => amount === 10), JSON.stringify(deliveries));
  }
});

test('taverna distante não interrompe a coleta contínua de madeira', () => {
  const { session, worker } = fixture();
  session.state.buildings.push(building(1001, 'taverna', 40, 0));
  session.state.nodes = [{ id: 2001, kind: 'wood', x: -14, z: 0, amount: 100, maxAmount: 100 }];
  const before = session.state.players[0]!.wood;
  applyCommand(session, 0, { type: 'gather', ids: [worker.id], nodeId: 2001 });
  advance(session, 13, () => assert.ok(worker.x < -10));
  assert.equal(session.state.players[0]!.wood - before, 30);
});

test('banco gera 5 em todos os níveis, com intervalos cada vez menores', () => {
  const { session } = fixture();
  const bank = building(1001, 'bank', 0, 0);
  session.state.buildings.push(bank);
  for (const [level, interval] of [[1, 5], [2, 4], [3, 3], [4, 2], [5, 1.5], [6, 1]]) {
    bank.level = level!;
    bank.goldAcc = 0;
    const gold = session.state.players[0]!.gold;
    advance(session, interval! - 0.1);
    assert.equal(session.state.players[0]!.gold, gold, `nível ${level} não deve produzir antes do intervalo`);
    advance(session, 0.2);
    assert.equal(session.state.players[0]!.gold - gold, 5);
  }
  assert.equal(bank.goldProduced, 30);
  assert.equal(makeSnapshot(session.state).buildings[0]!.goldProduced, 30);
});

test('banco mantém melhorias até o nível máximo 6', () => {
  const { session } = fixture();
  Object.assign(session.state.players[0]!, { wood: 10000, gold: 10000 });
  const bank = building(1001, 'bank', 0, 0);
  session.state.buildings.push(bank);
  for (let i = 0; i < 5; i++) applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 6);
  const gold = session.state.players[0]!.gold;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 6);
  assert.equal(session.state.players[0]!.gold, gold);
  advance(session, 5);
  assert.equal(session.state.players[0]!.gold, gold + 25);
});

test('taverna recruta um Peão controlável sem duplicar o Humano inicial ou IDs', () => {
  const { session, worker } = fixture();
  const tavern = building(1001, 'taverna', 0, 0);
  session.state.buildings.push(tavern);
  const before = session.state.players[0]!.gold;
  applyCommand(session, 1, { type: 'recruit', targetId: tavern.id });
  assert.equal(tavern.recruitment, undefined);
  applyCommand(session, 0, { type: 'recruit', targetId: tavern.id });
  applyCommand(session, 0, { type: 'recruit', targetId: tavern.id });
  assert.equal(session.state.players[0]!.gold, before - 40);
  advance(session, 3.5);
  assert.equal(session.state.units.filter(u => u.owner === 0).length, 1);
  advance(session, 0.7);
  const peon = session.state.units.find(u => u.hero === false)!;
  assert.ok(peon);
  assert.equal(peon.owner, 0);
  assert.ok(session.navigation.canStand(peon, peon.x, peon.z));
  assert.equal(tavern.recruitment, null);
  assert.equal(session.state.units.filter(u => u.hero && u.owner === 0).length, 1);
  applyCommand(session, 0, { type: 'move', ids: [peon.id], x: 12, z: 12 });
  assert.equal(peon.order?.t, 'move');
  applyCommand(session, 0, { type: 'build', ids: [worker.id], kind: 'wall', x: -8, z: 0 });
  const ids = [...session.state.units, ...session.state.buildings, ...session.state.nodes].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(tavern.goldProduced, undefined, 'a taverna não deve gerar ouro');
});

test('admin só funciona no teste solo e valida valores de recursos', () => {
  const { session, worker } = fixture();
  const before = session.state.players[0]!.gold;
  applyCommand(session, 0, { type: 'admin', action: 'resources', wood: 100, gold: 100 });
  assert.equal(session.state.players[0]!.gold, before);
  session.state.practice = true;
  applyCommand(session, 0, { type: 'admin', action: 'resources', wood: 100, gold: 100 });
  assert.equal(session.state.players[0]!.gold, before + 100);
  applyCommand(session, 0, { type: 'admin', action: 'resources', wood: 0, gold: -1 });
  assert.equal(session.state.players[0]!.gold, before + 100);
  applyCommand(session, 0, { type: 'admin', action: 'phase', phase: 'night' });
  assert.equal(session.state.phase, 'night');
  worker.hp = 10;
  applyCommand(session, 0, { type: 'admin', action: 'heal' });
  assert.equal(worker.hp, worker.maxHp);
});

test('comprar e vender só funciona em um muro próprio concluído', () => {
  const { session } = fixture();
  const bank = building(1001, 'bank', 0, 0);
  const wall = building(1002, 'wall', 8, 0);
  session.state.buildings.push(bank, wall);
  const player = session.state.players[0]!;
  const before = { wood: player.wood, gold: player.gold };
  const trade = (targetId: number) => applyCommand(session, 0, { type: 'market', targetId, trade: 'woodToGold', amount: 10 });
  trade(bank.id);
  wall.done = false; trade(wall.id);
  wall.done = true; wall.owner = 1; trade(wall.id);
  assert.equal(player.wood, before.wood);
  assert.equal(player.gold, before.gold);
  wall.owner = 0; trade(wall.id);
  assert.equal(player.wood, before.wood - 10);
  assert.equal(player.gold, before.gold + 10);
  applyCommand(session, 0, { type: 'market', targetId: wall.id, trade: 'goldToWood', amount: 10 });
  assert.equal(player.wood, before.wood);
  assert.equal(player.gold, before.gold);
});

test('muro leva 2s de trabalho e a atividade de construção é transmitida', () => {
  const { session, worker } = fixture();
  worker.x = -9.5;
  applyCommand(session, 0, { type: 'build', ids: [worker.id], kind: 'wall', x: -7, z: 0 });
  const site = session.state.buildings[0]!;
  advance(session, 1);
  assert.equal(worker.activity, 'building');
  assert.ok(site.progress >= 0.49 && site.progress <= 0.51);
  advance(session, 1.1);
  assert.equal(site.done, true);
});

test('vampiro ataca prédio grande pela borda, respeitando o cooldown', () => {
  const { session, vampire } = fixture();
  session.state.phase = 'night';
  const keep = building(1001, 'keep', 0, 0);
  session.state.buildings.push(keep);
  vampire.x = -5.5;
  vampire.z = 0;
  applyCommand(session, 4, { type: 'attack', ids: [vampire.id], targetId: keep.id });
  advance(session, 1, () => assert.ok(session.navigation.canStand(vampire, vampire.x, vampire.z)));
  assert.equal(keep.hp, 475);
  advance(session, 2);
  assert.ok(keep.hp < 475);
});

test('retomar obra usa o canteiro existente sem cobrar novamente', () => {
  const { session, worker } = fixture();
  applyCommand(session, 0, { type: 'build', ids: [worker.id], kind: 'wall', x: -7, z: 0 });
  const site = session.state.buildings[0]!;
  assert.ok(site && !site.done);
  const wood = session.state.players[0]!.wood;
  applyCommand(session, 0, { type: 'move', ids: [worker.id], x: -12, z: 8 });
  advance(session, 1);
  applyCommand(session, 0, { type: 'resumeBuild', ids: [worker.id], targetId: site.id });
  advance(session, 22, () => assert.ok(session.navigation.canStand(worker, worker.x, worker.z)));
  assert.equal(session.state.buildings.length, 1);
  assert.equal(session.state.players[0]!.wood, wood);
  assert.equal(site.done, true);
});

test('separação e novos canteiros não empurram unidades para dentro de prédios', () => {
  const { session, worker } = fixture();
  session.state.buildings.push(building(1001, 'taverna', 0, 0));
  worker.x = -3.7;
  const other = { ...worker, id: worker.id + 900, x: -3.7 };
  session.state.units.push(other);
  advance(session, 1, () => {
    assert.ok(session.navigation.canStand(worker, worker.x, worker.z));
    assert.ok(session.navigation.canStand(other, other.x, other.z));
  });
  assert.equal(canPlace(session, 'wall', worker.x, worker.z), false);
  assert.equal(canPlace(session, 'wall', WORLD.half, 0), false);
});

test('primeira coleta funciona mesmo sem depósito e sem dinheiro', () => {
  const session = createSession([], 1);
  const worker = session.state.units[0]!;
  const node = session.state.nodes.find(n => n.kind === 'wood')!;
  applyCommand(session, 0, { type: 'gather', ids: [worker.id], nodeId: node.id });
  advance(session, 20);
  assert.ok(session.state.players[0]!.wood >= 20);
  assert.equal(session.state.buildings.filter(b => b.owner === 0).length, 0);
});

test('muro na única entrada deixa humano passar, mas vampiro só entra após destruí-lo', async () => {
  const { COMPOUNDS, compoundEntrance } = await import('@vampire/shared');
  const session = createSession([], 1);
  const compound = COMPOUNDS[1]!;
  const door = compoundEntrance(compound);
  const length = Math.hypot(door.x - compound.x, door.z - compound.z);
  const out = { x: (door.x - compound.x) / length, z: (door.z - compound.z) / length };
  const worker = session.state.units[0]!;
  const vampire = session.state.units[4]!;
  const wall = building(1001, 'wall', door.x, door.z);
  session.state.buildings.push(wall);
  session.state.phase = 'night';
  Object.assign(worker, { x: door.x + out.x * 5, z: door.z + out.z * 5 });
  Object.assign(vampire, { x: door.x + out.x * 8, z: door.z + out.z * 8 });
  applyCommand(session, 0, { type: 'move', ids: [worker.id], x: compound.x, z: compound.z });
  applyCommand(session, 4, { type: 'move', ids: [vampire.id], x: compound.x, z: compound.z });
  advance(session, 6);
  assert.ok(Math.hypot(worker.x - compound.x, worker.z - compound.z) < 1);
  assert.ok((vampire.x - door.x) * out.x + (vampire.z - door.z) * out.z > 0);
  applyCommand(session, 4, { type: 'attack', ids: [vampire.id], targetId: wall.id });
  advance(session, 28);
  assert.ok(!session.state.buildings.includes(wall));
  applyCommand(session, 4, { type: 'move', ids: [vampire.id], x: compound.x, z: compound.z + 3 });
  advance(session, 6);
  assert.ok((vampire.x - door.x) * out.x + (vampire.z - door.z) * out.z < 0);
});

test('comandos não permitem controlar outros jogadores nem atacar aliados', () => {
  const { session, worker } = fixture();
  applyCommand(session, 4, { type: 'move', ids: [worker.id], x: 20, z: 20 });
  assert.equal(worker.order, null);
  const tavern = building(1001, 'taverna', 0, 0);
  tavern.owner = 1;
  session.state.buildings.push(tavern);
  applyCommand(session, 0, { type: 'attack', ids: [worker.id], targetId: tavern.id });
  assert.equal(worker.order, null);
});
