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

test('Humano e Peão usam atributos separados e o recrutamento usa os custos configurados', () => {
  const humanStats = GAME_CONFIG.units.human, peonStats = GAME_CONFIG.units.peon;
  const recruitment = GAME_CONFIG.buildings.taverna.recruit;
  const initial = GAME_CONFIG.match.startingResources;
  const before = { human: { ...humanStats }, peon: { ...peonStats }, recruitment: { ...recruitment }, initial: { ...initial } };
  try {
    humanStats.hp = 234; peonStats.hp = 123;
    peonStats.gatherRate = 10; peonStats.carry = 5;
    Object.assign(recruitment, { wood: 3, gold: 7, time: 0.2 });
    Object.assign(initial, { wood: 23, gold: 47 });
    const session = createSession([], 1, [0, 4]);
    assert.equal(session.state.units.find(u => u.owner === 0)!.hp, 234);
    assert.equal(session.state.players[0]!.gold, 47);
    const tavern: Building = { ...session.state.buildings[0]!, id: 1001, kind: 'taverna', owner: 0, x: 10, z: 8 };
    session.state.buildings.push(tavern);
    applyCommand(session, 0, { type: 'recruit', targetId: tavern.id });
    assert.equal(session.state.players[0]!.wood, 20);
    assert.equal(session.state.players[0]!.gold, 40);
    run(session, 4);
    const peon = session.state.units.find(u => u.hero === false)!;
    assert.equal(peon.hp, 123);
    const wood = session.state.nodes.find(n => n.kind === 'wood')!;
    Object.assign(peon, { x: wood.x + 2, z: wood.z });
    applyCommand(session, 0, { type: 'gather', ids: [peon.id], nodeId: wood.id });
    run(session, 16);
    assert.equal(session.state.players[0]!.wood, 30);
    assert.equal(humanStats.carry, before.human.carry);
  } finally {
    Object.assign(humanStats, before.human); Object.assign(peonStats, before.peon);
    Object.assign(recruitment, before.recruitment); Object.assign(initial, before.initial);
  }
});

test('intervalo e renda do Banco vêm do arquivo central', () => {
  const bankConfig = GAME_CONFIG.buildings.bank;
  const before = { gold: bankConfig.goldPerCycle, interval: bankConfig.cycleSecondsByLevel[1]! };
  try {
    bankConfig.goldPerCycle = 7;
    bankConfig.cycleSecondsByLevel[1] = 0.2;
    const session = createSession([], 1, [0, 4]);
    session.state.buildings.push({ ...session.state.buildings[0]!, id: 1001, kind: 'bank', owner: 0, x: 10, z: 8 });
    run(session, 2);
    assert.equal(session.state.players[0]!.gold, 0);
    run(session, 1);
    assert.equal(session.state.players[0]!.gold, 7);
  } finally {
    bankConfig.goldPerCycle = before.gold;
    bankConfig.cycleSecondsByLevel[1] = before.interval;
  }
});

test('o Muro respeita proporções de troca diferentes de 1:1', () => {
  const market = GAME_CONFIG.market;
  const before = { ...market };
  try {
    market.wood = 30; market.gold = 4;
    const session = createSession([], 1, [0, 4]);
    session.state.buildings.push({ ...session.state.buildings[0]!, id: 1001, kind: 'wall', owner: 0, x: 10, z: 8 });
    session.state.players[0]!.wood = 30;
    applyCommand(session, 0, { type: 'market', targetId: 1001, trade: 'woodToGold', amount: 30 });
    assert.equal(session.state.players[0]!.wood, 0);
    assert.equal(session.state.players[0]!.gold, 4);
    applyCommand(session, 0, { type: 'market', targetId: 1001, trade: 'goldToWood', amount: 4 });
    assert.equal(session.state.players[0]!.wood, 30);
    assert.equal(session.state.players[0]!.gold, 0);
  } finally { Object.assign(market, before); }
});
