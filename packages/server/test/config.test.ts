import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GAME_CONFIG, applyCommand, createSession, step, type Building } from '@vampire/shared';

function run(session: ReturnType<typeof createSession>, ticks: number) {
  for (let i = 0; i < ticks; i++) step(session, []);
}

test('custos, vida e tempo configurados são usados ao construir', () => {
  const cost = GAME_CONFIG.buildings.wall.cost;
  const before = { ...cost, hp: GAME_CONFIG.buildings.wall.hp };
  try {
    Object.assign(cost, { wood: 3, gold: 2, time: 0.4 });
    GAME_CONFIG.buildings.wall.hp = 777;
    const session = createSession([], 1, [0, 4]);
    const human = session.state.units.find(u => u.owner === 0)!;
    Object.assign(human, { x: -9.5, z: 0 });
    Object.assign(session.state.players[0]!, { wood: 8, gold: 10 });
    applyCommand(session, 0, { type: 'build', ids: [human.id], kind: 'wall', x: -7, z: 0 });
    const wall = session.state.buildings.find(b => b.kind === 'wall')!;
    assert.equal(wall.maxHp, 777);
    assert.equal(session.state.players[0]!.wood, 5);
    assert.equal(session.state.players[0]!.gold, 8);
    run(session, 8);
    assert.equal(wall.done, true);
  } finally {
    Object.assign(cost, { wood: before.wood, gold: before.gold, time: before.time });
    GAME_CONFIG.buildings.wall.hp = before.hp;
  }
});

test('Humano e trabalhador usam atributos separados e o treino usa a tabela da função', () => {
  const humanStats = GAME_CONFIG.units.human, peonStats = GAME_CONFIG.units.peon;
  const lumberLevel1 = GAME_CONFIG.spec.workers.lumberjack.levels[1]!;
  const initial = GAME_CONFIG.match.startingResources;
  const before = { human: { ...humanStats }, peon: { ...peonStats }, gold: lumberLevel1.goldCost, initial: { ...initial } };
  try {
    humanStats.hp = 234; peonStats.hp = 123;
    lumberLevel1.goldCost = 7;
    Object.assign(initial, { wood: 23, gold: 47 });
    const session = createSession([], 1, [0, 4]);
    assert.equal(session.state.units.find(u => u.owner === 0)!.hp, 234);
    assert.equal(session.state.players[0]!.gold, 47);
    const tavern: Building = { ...session.state.buildings[0]!, id: 1001, kind: 'taverna', owner: 0, x: 10, z: 8 };
    session.state.buildings.push(tavern);
    applyCommand(session, 0, { type: 'recruit', targetId: tavern.id, role: 'lumberjack' });
    assert.equal(session.state.players[0]!.wood, 23, 'Lenhador custa ouro, não madeira');
    assert.equal(session.state.players[0]!.gold, 40);
    run(session, 40); // ticks: tempo de treino (2s) + folga
    const peon = session.state.units.find(u => u.hero === false)!;
    assert.equal(peon.hp, 123);
    assert.equal(peon.workerRole, 'lumberjack');
    const wood = session.state.nodes.find(n => n.kind === 'wood')!;
    Object.assign(peon, { x: wood.x + 2, z: wood.z });
    applyCommand(session, 0, { type: 'gather', ids: [peon.id], nodeId: wood.id });
    run(session, 150); // 10 segundos
    const rate = GAME_CONFIG.spec.workers.lumberjack.lumberAmount / lumberLevel1.gatherInterval;
    assert.ok(session.state.players[0]!.wood >= 23 + Math.floor(rate * 8), `madeira: ${session.state.players[0]!.wood}`);
    assert.equal(humanStats.carry, before.human.carry);
  } finally {
    Object.assign(humanStats, before.human); Object.assign(peonStats, before.peon);
    lumberLevel1.goldCost = before.gold; Object.assign(initial, before.initial);
  }
});

test('produção do Banco vem da tabela central (gold/s)', () => {
  const level1 = GAME_CONFIG.spec.bankLevels[1]!;
  const before = level1.production;
  try {
    level1.production = 7;
    const session = createSession([], 1, [0, 4]);
    const startGold = session.state.players[0]!.gold;
    session.state.buildings.push({ ...session.state.buildings[0]!, id: 1001, kind: 'bank', owner: 0, x: 10, z: 8 });
    run(session, 30); // 2 segundos
    const gold = session.state.players[0]!.gold;
    assert.ok(gold >= startGold + 13 && gold <= startGold + 14, `produção contínua em 2s: ${gold}`);
  } finally {
    level1.production = before;
  }
});

test('o Muro respeita proporções de troca diferentes de 1:1', () => {
  const market = GAME_CONFIG.market;
  const before = { ...market };
  try {
    market.wood = 30; market.gold = 4;
    const session = createSession([], 1, [0, 4]);
    const startGold = session.state.players[0]!.gold;
    session.state.buildings.push({ ...session.state.buildings[0]!, id: 1001, kind: 'market', owner: 0, x: 10, z: 8 });
    session.state.players[0]!.wood = 30;
    applyCommand(session, 0, { type: 'market', targetId: 1001, trade: 'woodToGold', amount: 30 });
    assert.equal(session.state.players[0]!.wood, 0);
    assert.equal(session.state.players[0]!.gold, startGold + 4);
    applyCommand(session, 0, { type: 'market', targetId: 1001, trade: 'goldToWood', amount: 4 });
    assert.equal(session.state.players[0]!.wood, 30);
    assert.equal(session.state.players[0]!.gold, startGold);
  } finally { Object.assign(market, before); }
});
