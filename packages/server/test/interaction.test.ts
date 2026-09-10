import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyCommand, bankProduction, canPlace, createSession, step, makeSnapshot, HUMAN_SPAWNS, RECRUIT, SURVIVE_NIGHTS_TO_WIN, TOWER, towerDamage, VAMPIRE, WORLD, type Building, type Session, type Unit, type WorkerRole } from '@vampire/shared';
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

/** Trabalhador especializado (o herói não coleta). */
function workerUnit(id: number, workerRole: WorkerRole, x = -12, z = 0): Unit {
  return { id, kind: 'worker', hero: false, workerRole, owner: 0, x, z, hp: 100, maxHp: 100,
    order: null, activity: 'idle', carrying: 0, carryRes: null, gatherNodeId: null, attackCd: 0, dead: false };
}

function advance(session: Session, seconds: number, check?: () => void) {
  for (let i = 0; i < seconds * 15; i++) { step(session, []); check?.(); }
}

test('humanos vencem exatamente no amanhecer após as noites configuradas', () => {
  const session = createSession([], 1, [0, 4]);
  while (session.state.day < SURVIVE_NIGHTS_TO_WIN) {
    session.state.phase = 'night'; session.state.phaseTime = 0.01;
    step(session, []);
    assert.equal(session.state.result, null);
  }
  session.state.phase = 'night'; session.state.phaseTime = 0.01;
  step(session, []);
  assert.equal(session.state.day, SURVIVE_NIGHTS_TO_WIN + 1);
  assert.equal(session.state.result?.winner, 'human');
});

test('mapa fixo: cada humano começa com um boneco no seu ponto de spawn, sem recursos nem prédios', () => {
  for (const seed of [1, 42, 451, 81240]) {
    const { state } = createSession([], seed);
    for (let id = 0; id < 4; id++) {
      assert.equal(state.units.filter(u => u.owner === id).length, 1);
      assert.equal(state.players[id]!.wood, 0);
      assert.equal(state.players[id]!.gold, 0);
      assert.equal(state.buildings.filter(b => b.owner === id).length, 0);
      const unit = state.units.find(u => u.owner === id)!;
      const spawn = HUMAN_SPAWNS[id]!;
      assert.ok(Math.hypot(unit.x - spawn.x, unit.z - spawn.z) < 1.5, `humano ${id} deve nascer no ponto de spawn`);
    }
    assert.equal(state.units.length, 5);
  }
});

test('move nunca atravessa a colisão da sede e chega ao destino', () => {
  const { session, worker } = fixture();
  session.state.buildings.push(building(1001, 'keep', 0, 0));
  applyCommand(session, 0, { type: 'move', ids: [worker.id], x: 12, z: 0 });
  // Com o Move Speed da spec (367) o trajeto resolve em poucos ticks; o que
  // importa é não invadir a colisão em nenhum tick e chegar perto do destino.
  advance(session, 9, () => {
    assert.ok(session.navigation.canStand(worker, worker.x, worker.z));
  });
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
  const { session } = fixture();
  session.state.buildings.push(building(1001, 'taverna', 0, 0));
  session.state.nodes.push({ id: 2001, kind: 'wood', x: -18, z: 0, amount: 7, maxAmount: 7 });
  const lumber = workerUnit(9001, 'lumberjack');
  session.state.units.push(lumber);
  const before = session.state.players[0]!.wood;
  applyCommand(session, 0, { type: 'gather', ids: [lumber.id], nodeId: 2001 });
  advance(session, 20, () => assert.ok(session.navigation.canStand(lumber, lumber.x, lumber.z)));
  assert.ok(session.state.players[0]!.wood - before >= 8);
  assert.equal(session.state.nodes[0]!.amount, 7);
  assert.ok(makeSnapshot(session.state).nodes.some(n => n.id === 2001));
  assert.ok(lumber.x < -15, 'lenhador deve permanecer junto ao recurso');
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
  Object.assign(session.state.players[0]!, { wood: 1000, gold: 1000 });
  // Procura um local válido para a torre dentro do alcance do vampiro.
  let spot: { x: number; z: number } | null = null;
  for (let r = 4; r <= TOWER.range - 1 && !spot; r++) {
    for (let a = 0; a < 16 && !spot; a++) {
      const x = vampire.x + Math.cos(a * Math.PI / 8) * r;
      const z = vampire.z + Math.sin(a * Math.PI / 8) * r;
      if (canPlace(session, 'tower', x, z)) spot = { x, z };
    }
  }
  assert.ok(spot, 'deve haver espaço para uma torre perto da cripta');
  // Posiciona o humano ao lado da torre, fora da área ocupada.
  for (let a = 0; a < 16; a++) {
    const hx = spot!.x + Math.cos(a * Math.PI / 8) * 3.2;
    const hz = spot!.z + Math.sin(a * Math.PI / 8) * 3.2;
    if (session.navigation.canStand(human, hx, hz)) { Object.assign(human, { x: hx, z: hz }); break; }
  }
  applyCommand(session, 0, { type: 'build', ids: [human.id], kind: 'tower', x: spot!.x, z: spot!.z });
  const tower = session.state.buildings.find(b => b.kind === 'tower')!;
  assert.ok(tower);
  advance(session, 30);
  assert.equal(tower.done, true);
  // A torre mira e atira; a cripta cura o vampiro quase instantaneamente, então
  // ele permanece com a vida cheia mesmo sob fogo.
  assert.equal(tower.lastShot?.targetId, vampire.id);
  assert.equal(tower.lastShot?.damage, towerDamage(tower.level));
  assert.equal(vampire.hp, vampire.maxHp);
  assert.equal(makeSnapshot(session.state).buildings.find(b => b.id === tower.id)!.lastShot?.tick, tower.lastShot?.tick);
});

test('torre não causa dano fora do alcance', () => {
  const { session, vampire } = fixture();
  vampire.x = TOWER.range + 2.1; vampire.z = 0;
  const tower = building(1001, 'tower', 0, 0);
  session.state.buildings.push(tower);
  advance(session, 3);
  assert.equal(vampire.hp, VAMPIRE.hp);
  assert.equal(tower.lastShot, undefined);
});

test('coleta é creditada 1 a 1 direto no jogador, sem carga na unidade', () => {
  for (const kind of ['wood', 'gold'] as const) {
    const { session } = fixture();
    const role: WorkerRole = kind === 'wood' ? 'lumberjack' : 'miner';
    const unit = workerUnit(9001, role, -17, 0);
    session.state.units.push(unit);
    const player = session.state.players[0]!;
    player[kind] = 0;
    session.state.nodes = [{ id: 2001, kind, x: -14, z: 0, amount: 100, maxAmount: 100 }];
    applyCommand(session, 0, { type: 'gather', ids: [unit.id], nodeId: 2001 });
    const deliveries: number[] = [];
    let before = 0;
    advance(session, 18, () => {
      assert.ok(unit.carrying < 1, 'a unidade não deve segurar carga cheia');
      if (player[kind] !== before) { deliveries.push(player[kind] - before); before = player[kind]; }
    });
    assert.ok(deliveries.length >= 8, JSON.stringify(deliveries));
    assert.ok(deliveries.every(amount => amount === 1), JSON.stringify(deliveries));
  }
});

test('taverna distante não interrompe a coleta contínua de madeira', () => {
  const { session } = fixture();
  session.state.buildings.push(building(1001, 'taverna', 40, 0));
  session.state.nodes = [{ id: 2001, kind: 'wood', x: -14, z: 0, amount: 100, maxAmount: 100 }];
  const lumber = workerUnit(9001, 'lumberjack');
  session.state.units.push(lumber);
  const before = session.state.players[0]!.wood;
  applyCommand(session, 0, { type: 'gather', ids: [lumber.id], nodeId: 2001 });
  advance(session, 13, () => assert.ok(lumber.x < -10));
  const gained = session.state.players[0]!.wood - before;
  assert.ok(gained >= 5, `madeira creditada: ${gained}`);
});

test('banco produz continuamente conforme o nível (gold/s)', () => {
  const { session } = fixture();
  const bank = building(1001, 'bank', 0, 0);
  session.state.buildings.push(bank);
  for (const level of [1, 2, 3, 4, 5, 6, 7, 8]) {
    bank.level = level;
    bank.goldAcc = 0;
    const gold = session.state.players[0]!.gold;
    advance(session, 2);
    const gained = session.state.players[0]!.gold - gold;
    const expected = bankProduction(level) * 2;
    assert.ok(Math.abs(gained - expected) <= 1, `nível ${level}: ${gained} != ${expected}`);
  }
  assert.ok((bank.goldProduced ?? 0) > 0);
  assert.equal(makeSnapshot(session.state).buildings[0]!.goldProduced, bank.goldProduced);
});

test('banco vai até o nível 8 respeitando pré-requisitos de Muro/Mercado', () => {
  const { session } = fixture();
  Object.assign(session.state.players[0]!, { wood: 100000, gold: 100000 });
  const bank = building(1001, 'bank', 0, 0);
  session.state.buildings.push(bank);
  // Sem Muro nível 1, o upgrade para o nível 2 é bloqueado.
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 1, 'bloqueado sem Muro nível 1');
  const wall = building(1002, 'wall', 8, 0);
  session.state.buildings.push(wall);
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 2, 'Muro nível 1 libera o nível 2');
  // Nível 3 exige Muro nível 4.
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 2, 'bloqueado sem Muro nível 4');
  wall.level = 4;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 3, 'Muro nível 4 libera o nível 3');
  // Nível 4 exige Mercado construído.
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 3, 'sem Mercado o nível 4 fica bloqueado');
  const market = building(1003, 'market', -8, 0);
  session.state.buildings.push(market);
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 4, 'Mercado nível 1 libera o nível 4');
  // Nível 5 exige Muro nível 6; nível 6 exige Mercado nível 2.
  wall.level = 6;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 5, 'Muro nível 6 libera o nível 5');
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 5, 'Mercado nível 2 é exigido no nível 6');
  market.level = 2;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 6, 'Mercado nível 2 libera o nível 6');
  // Níveis 7 e 8 exigem Muro 9 e 11.
  wall.level = 11;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 8, 'Banco alcança o nível máximo');
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 8, 'não passa do nível 8');
});

test('taverna treina um trabalhador controlável sem duplicar o Humano inicial ou IDs', () => {
  const { session, worker } = fixture();
  const tavern = building(1001, 'taverna', 0, 0);
  session.state.buildings.push(tavern);
  const beforeWood = session.state.players[0]!.wood;
  applyCommand(session, 1, { type: 'recruit', targetId: tavern.id, role: 'miner' });
  assert.equal(tavern.recruitment, undefined);
  applyCommand(session, 0, { type: 'recruit', targetId: tavern.id, role: 'miner' });
  applyCommand(session, 0, { type: 'recruit', targetId: tavern.id, role: 'miner' });
  assert.equal(session.state.players[0]!.wood, beforeWood - 2, 'Minerador custa 2 madeira');
  advance(session, Math.max(0, RECRUIT.time - 0.3));
  assert.equal(session.state.units.filter(u => u.owner === 0).length, 1);
  advance(session, 0.6);
  const peon = session.state.units.find(u => u.hero === false)!;
  assert.ok(peon);
  assert.equal(peon.owner, 0);
  assert.equal(peon.workerRole, 'miner');
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

test('comprar e vender só funciona no Mercado próprio concluído', () => {
  const { session } = fixture();
  const bank = building(1001, 'bank', 0, 0);
  const wall = building(1002, 'wall', 8, 0);
  const market = building(1003, 'market', -8, 0);
  session.state.buildings.push(bank, wall, market);
  const player = session.state.players[0]!;
  const before = { wood: player.wood, gold: player.gold };
  const trade = (targetId: number) => applyCommand(session, 0, { type: 'market', targetId, trade: 'woodToGold', amount: 10 });
  trade(bank.id);            // não é mercado
  trade(wall.id);            // Muro não troca mais recursos
  market.done = false; trade(market.id);
  market.done = true; market.owner = 1; trade(market.id);
  assert.equal(player.wood, before.wood);
  assert.equal(player.gold, before.gold);
  market.owner = 0; trade(market.id);
  assert.equal(player.wood, before.wood - 10);
  assert.equal(player.gold, before.gold + 10);
  applyCommand(session, 0, { type: 'market', targetId: market.id, trade: 'goldToWood', amount: 10 });
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
  const lumber = workerUnit(9001, 'lumberjack');
  session.state.units.push(lumber);
  const node = session.state.nodes.find(n => n.kind === 'wood')!;
  Object.assign(lumber, { x: node.x + 2, z: node.z });
  applyCommand(session, 0, { type: 'gather', ids: [lumber.id], nodeId: node.id });
  advance(session, 20);
  assert.ok(session.state.players[0]!.wood >= 5);
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
  advance(session, 45); // ~1,42s por golpe × 25 de dano contra 500 HP
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
