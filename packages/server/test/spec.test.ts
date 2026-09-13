import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyCommand, createSession, step, vampireStatus, GAME_CONFIG, SPEC_ENTITY_LIMITS, VAMPIRE, VAMPIRE_ABILITIES, VAMPIRE_PLAYER_ID, type Building, type Unit, type WorkerRole } from '@vampire/shared';

function fixture() {
  const session = createSession([], 42, [0, 4]);
  session.map.water.fill(0);
  session.map.obstacles = [];
  session.state.nodes = [];
  session.state.buildings = [];
  session.state.units = session.state.units.filter(u => u.owner === 0 || u.kind === 'vampire');
  const worker = session.state.units.find(u => u.owner === 0)!;
  Object.assign(worker, { x: -12, z: 0 });
  session.state.players[0]!.wood = 1000;
  session.state.players[0]!.gold = 1000;
  return { session, worker };
}

function building(id: number, kind: Building['kind'], x: number, z: number, owner = 0): Building {
  return { id, kind, x, z, owner, hp: 500, maxHp: 500, level: 1, progress: 1,
    done: true, builderId: null, goldAcc: 0, attackCd: 0 };
}

function workerUnit(id: number, workerRole: WorkerRole, owner = 0): Unit {
  return { id, kind: 'worker', hero: false, workerRole, owner, x: -12, z: 0, hp: 100, maxHp: 100,
    order: null, activity: 'idle', carrying: 0, carryRes: null, gatherNodeId: null, attackCd: 0, dead: false };
}

test('limite de Muros por jogador bloqueia a construção sem gastar recursos', () => {
  const { session, worker } = fixture();
  for (let i = 0; i < SPEC_ENTITY_LIMITS.wall; i++) {
    session.state.buildings.push(building(2000 + i, 'wall', 100 + i * 4, 100));
  }
  const before = { wood: session.state.players[0]!.wood, gold: session.state.players[0]!.gold };
  applyCommand(session, 0, { type: 'build', ids: [worker.id], kind: 'wall', x: -7, z: 0 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'wall' && b.owner === 0).length, SPEC_ENTITY_LIMITS.wall);
  assert.equal(session.state.players[0]!.wood, before.wood);
  assert.equal(session.state.players[0]!.gold, before.gold);
});

test('limite de Tavernas é por jogador e libera quando uma é removida', () => {
  const { session, worker } = fixture();
  for (let i = 0; i < SPEC_ENTITY_LIMITS.taverna; i++) {
    session.state.buildings.push(building(2000 + i, 'taverna', 100 + i * 8, 100));
  }
  applyCommand(session, 0, { type: 'build', ids: [worker.id], kind: 'taverna', x: -7, z: 0 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'taverna' && b.owner === 0).length, SPEC_ENTITY_LIMITS.taverna);
  // Outro jogador não é afetado pelos prédios do jogador 0.
  const other = { ...worker, id: worker.id + 900, owner: 1 };
  session.state.units.push(other);
  session.state.players[1] = { ...session.state.players[0]!, id: 1, wood: 1000, gold: 1000 };
  applyCommand(session, 1, { type: 'build', ids: [other.id], kind: 'taverna', x: -20, z: 0 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'taverna' && b.owner === 1).length, 1);
});

test('upgrade é atômico: sem recursos nada muda; com recursos desconta e evolui', () => {
  const { session } = fixture();
  const bank = building(2000, 'bank', 0, 0);
  const wall = building(2001, 'wall', 40, 0); // Muro nível 1 satisfaz o pré-requisito do Banco 2
  session.state.buildings.push(bank, wall);
  session.state.players[0]!.wood = 0;
  session.state.players[0]!.gold = 0;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 1, 'sem recursos o nível não muda');
  assert.equal(session.state.players[0]!.gold, 0);

  const cost = GAME_CONFIG.spec.bankLevels[2]!.upgradeCost!;
  session.state.players[0]!.wood = cost.wood ?? 0;
  session.state.players[0]!.gold = cost.gold ?? 0;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 2, 'com recursos o nível avança');
  assert.equal(session.state.players[0]!.wood, 0);
  assert.equal(session.state.players[0]!.gold, 0);
});

test('Muro segue a tabela de vida por nível e preserva o dano no upgrade', () => {
  const { session } = fixture();
  Object.assign(session.state.players[0]!, { wood: 100000, gold: 100000 });
  const wall = building(2000, 'wall', 0, 0);
  wall.maxHp = wall.hp = GAME_CONFIG.spec.wallLevels[1]!.hp;
  session.state.buildings.push(wall);
  wall.hp = 10; // danificado
  for (let level = 2; level <= GAME_CONFIG.spec.wallMaxLevel; level++) {
    applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: wall.id });
    assert.equal(wall.level, level);
    assert.equal(wall.maxHp, GAME_CONFIG.spec.wallLevels[level]!.hp);
  }
  assert.equal(wall.maxHp - wall.hp, GAME_CONFIG.spec.wallLevels[1]!.hp - 10, 'o dano recebido é preservado');
});

test('Torre usa o dano do nível e o transmite no disparo', () => {
  const { session } = fixture();
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  session.state.phase = 'night';
  const tower = building(2000, 'tower', 0, 0);
  session.state.buildings.push(tower);
  vampire.x = 5; vampire.z = 0; // dentro do alcance configurado
  tower.level = GAME_CONFIG.spec.towerMaxLevel;
  tower.attackCd = 0;
  const before = vampire.hp;
  step(session, []);
  const damage = GAME_CONFIG.spec.towerLevels[GAME_CONFIG.spec.towerMaxLevel]!.damage;
  assert.equal(tower.lastShot?.damage, damage);
  assert.equal(vampire.hp, before - damage);
});

test('Torre melhora até o nível 7 conforme a tabela', () => {
  const { session } = fixture();
  session.state.players[0]!.gold = 100000;
  const tower = building(2000, 'tower', 0, 0);
  session.state.buildings.push(tower);
  for (let level = 2; level <= GAME_CONFIG.spec.towerMaxLevel; level++) {
    applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: tower.id });
    assert.equal(tower.level, level);
  }
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: tower.id });
  assert.equal(tower.level, GAME_CONFIG.spec.towerMaxLevel, 'não passa do nível máximo');
});

test('limite de Mineradores por jogador bloqueia o treino sem gastar recursos', () => {
  const { session } = fixture();
  const tavern = building(2000, 'taverna', 0, 0);
  session.state.buildings.push(tavern);
  for (let i = 0; i < SPEC_ENTITY_LIMITS.miner; i++) session.state.units.push(workerUnit(3000 + i, 'miner'));
  const before = { wood: session.state.players[0]!.wood, gold: session.state.players[0]!.gold };
  applyCommand(session, 0, { type: 'recruit', targetId: tavern.id, role: 'miner' });
  assert.equal(tavern.recruitment, undefined, 'não inicia treino acima do limite');
  assert.equal(session.state.players[0]!.wood, before.wood);
  assert.equal(session.state.players[0]!.gold, before.gold);
});

test('cada função coleta apenas o recurso permitido', () => {
  const { session } = fixture();
  session.state.nodes.push(
    { id: 3001, kind: 'wood', x: -14, z: 0, amount: 100, maxAmount: 100 },
    { id: 3002, kind: 'gold', x: -14, z: 4, amount: 100, maxAmount: 100 },
  );
  const lumber = workerUnit(4001, 'lumberjack');
  const miner = workerUnit(4002, 'miner');
  session.state.units.push(lumber, miner);
  applyCommand(session, 0, { type: 'gather', ids: [lumber.id], nodeId: 3002 });
  assert.equal(lumber.order, null, 'Lenhador não coleta ouro');
  applyCommand(session, 0, { type: 'gather', ids: [miner.id], nodeId: 3001 });
  assert.equal(miner.order, null, 'Minerador não coleta madeira');
  applyCommand(session, 0, { type: 'gather', ids: [lumber.id], nodeId: 3001 });
  assert.equal(lumber.order?.t, 'gather', 'Lenhador coleta madeira');
  applyCommand(session, 0, { type: 'gather', ids: [miner.id], nodeId: 3002 });
  assert.equal(miner.order?.t, 'gather', 'Minerador coleta ouro');
});

test('Lenhador e Reparador não constroem nada', () => {
  const { session } = fixture();
  Object.assign(session.state.players[0]!, { wood: 1000, gold: 1000 });
  const lumber = workerUnit(4001, 'lumberjack');
  const repair = workerUnit(4002, 'repairer');
  session.state.units.push(lumber, repair);
  applyCommand(session, 0, { type: 'build', ids: [lumber.id], kind: 'wall', x: -7, z: 0 });
  applyCommand(session, 0, { type: 'build', ids: [repair.id], kind: 'wall', x: -7, z: 0 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'wall').length, 0);
  // E a Mina de Ouro também é recusada para eles.
  Object.assign(lumber, { x: -12, z: 2 });
  applyCommand(session, 0, { type: 'build', ids: [lumber.id], kind: 'goldMine', x: -7, z: 0 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'goldMine').length, 0);
});

test('somente o Minerador constrói Mina de Ouro', () => {
  const { session, worker } = fixture();
  const miner = workerUnit(4001, 'miner');
  miner.z = 2;
  session.state.units.push(miner);
  applyCommand(session, 0, { type: 'build', ids: [worker.id], kind: 'goldMine', x: -7, z: 0 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'goldMine').length, 0, 'herói não constrói a mina');
  applyCommand(session, 0, { type: 'build', ids: [miner.id], kind: 'goldMine', x: -7, z: 0 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'goldMine').length, 1, 'Minerador constrói a mina');
});

test('Minerador constrói apenas a Mina de Ouro', () => {
  const { session } = fixture();
  const miner = workerUnit(4001, 'miner');
  miner.z = 2;
  session.state.units.push(miner);
  applyCommand(session, 0, { type: 'build', ids: [miner.id], kind: 'wall', x: -7, z: 0 });
  applyCommand(session, 0, { type: 'build', ids: [miner.id], kind: 'taverna', x: -7, z: 4 });
  assert.equal(session.state.buildings.filter(b => b.kind === 'wall' || b.kind === 'taverna').length, 0, 'Minerador não ergue outras construções');
});

test('Minerador extrai ouro de uma Mina de Ouro concluída', () => {
  const { session } = fixture();
  const mine = building(2000, 'goldMine', -6, 10);
  session.state.buildings.push(mine);
  const miner = workerUnit(4001, 'miner');
  miner.x = -6; miner.z = 14;
  session.state.units.push(miner);
  const before = session.state.players[0]!.gold;
  applyCommand(session, 0, { type: 'gather', ids: [miner.id], nodeId: mine.id });
  assert.equal(miner.order?.t, 'gather');
  for (let i = 0; i < 40; i++) step(session, []);
  assert.ok(session.state.players[0]!.gold >= before + 6, `ouro extraído: ${session.state.players[0]!.gold - before}`);
});

test('somente Reparador (ou herói) repara Muros', () => {
  const { session, worker } = fixture();
  const wall = building(2000, 'wall', 0, 0);
  wall.maxHp = GAME_CONFIG.spec.wallLevels[1]!.hp;
  wall.hp = 5;
  session.state.buildings.push(wall);
  const lumber = workerUnit(4001, 'lumberjack');
  session.state.units.push(lumber);
  applyCommand(session, 0, { type: 'repair', ids: [lumber.id], targetId: wall.id });
  assert.equal(lumber.order, null, 'Lenhador não repara');
  applyCommand(session, 0, { type: 'repair', ids: [worker.id], targetId: wall.id });
  assert.equal(worker.order?.t, 'repair', 'herói repara');
});

test('pesquisa de Lenhador aumenta o nível e desconta o custo', () => {
  const { session } = fixture();
  const tavern = building(2000, 'taverna', 0, 0);
  session.state.buildings.push(tavern);
  session.state.players[0]!.gold = 100000;
  applyCommand(session, 0, { type: 'upgradeWorker', targetId: tavern.id, role: 'lumberjack' });
  assert.equal(session.state.players[0]!.workerLevels?.lumberjack, 2);
  assert.equal(session.state.players[0]!.gold, 100000 - GAME_CONFIG.spec.workers.lumberjack.levels[2]!.goldCost);
});

test('Enredar impede o ataque do Vampiro por 4s e respeita o cooldown', () => {
  const { session, worker } = fixture();
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  session.state.phase = 'night';
  worker.hp = worker.maxHp = 500;
  vampire.x = worker.x + 1; vampire.z = worker.z;
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'entangle', targetId: vampire.id });
  assert.ok(vampireStatus(session.state, 'entangled') > 0);
  applyCommand(session, 4, { type: 'attack', ids: [vampire.id], targetId: worker.id });
  for (let i = 0; i < 30; i++) step(session, []); // 2s
  assert.equal(worker.hp, worker.maxHp, 'enredado não deve causar dano');
  // Recarga ativa: o efeito não é renovado.
  assert.ok((session.state.players[0]!.abilityCooldowns?.entangle ?? 0) > 0);
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'entangle', targetId: vampire.id });
  assert.ok(vampireStatus(session.state, 'entangled') <= 2.1, 'cooldown não renova o efeito');
  // Passados os 4s, o Vampiro volta a atacar.
  for (let i = 0; i < 60; i++) step(session, []);
  assert.ok(worker.hp < worker.maxHp, 'após o efeito o Vampiro ataca novamente');
});

test('Cripta gera sangue para o Vampiro conforme o nível', () => {
  const { session } = fixture();
  const crypt = building(2000, 'crypt', 0, 0);
  crypt.owner = -1;
  session.state.buildings.push(crypt);
  session.state.vampire.blood = 0;
  crypt.level = 1; crypt.goldAcc = 0;
  for (let i = 0; i < 30; i++) step(session, []);
  assert.ok(session.state.vampire.blood >= 1 && session.state.vampire.blood <= 2, `nível 1: ${session.state.vampire.blood}`);
  crypt.level = 4; crypt.goldAcc = 0;
  const before = session.state.vampire.blood;
  for (let i = 0; i < 30; i++) step(session, []);
  assert.ok(session.state.vampire.blood - before >= 15, `nível 4: ${session.state.vampire.blood - before}`);
});

test('Vampiro evolui a Cripta com sangue; humano não pode', () => {
  const { session } = fixture();
  const crypt = building(2000, 'crypt', 0, 0);
  crypt.owner = -1;
  session.state.buildings.push(crypt);
  session.state.vampire.blood = 1000;
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'upgrade', ids: [], targetId: crypt.id });
  assert.equal(crypt.level, 2);
  assert.equal(session.state.vampire.blood, 1000 - GAME_CONFIG.spec.crypt.upgradeCosts[2]!);
  const blood = session.state.vampire.blood;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: crypt.id });
  assert.equal(crypt.level, 2, 'humano não evolui a cripta');
  assert.equal(session.state.vampire.blood, blood);
});

test('Vampiro usa o mesmo dano contra unidades e construções (seção 13)', () => {
  const { session } = fixture();
  const { state } = session;
  const vampire = state.units.find(u => u.kind === 'vampire')!;
  const wall = building(2000, 'wall', 0, 0);
  wall.hp = 1000; wall.maxHp = 1000;
  state.buildings.push(wall);
  Object.assign(vampire, { x: 0, z: 3 });
  const attackOnce = () => {
    vampire.attackCd = 0;
    applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'attack', ids: [vampire.id], targetId: wall.id });
    step(session, []);
  };
  state.phase = 'night';
  attackOnce();
  assert.equal(wall.maxHp - wall.hp, VAMPIRE.attackDamage, 'dano noturno no muro = dano do Vampiro');
  wall.hp = wall.maxHp;
  state.phase = 'day';
  attackOnce();
  assert.equal(wall.maxHp - wall.hp, VAMPIRE.attackDamage * VAMPIRE.dayDamageMultiplier, 'dano diurno no muro');
});

test('Revelar Área: 2 cargas com recarga de 60s cada', () => {
  const { session } = fixture();
  session.state.phase = 'night';
  session.state.phaseTime = session.state.nightSeconds;
  const maxCharges = VAMPIRE_ABILITIES.revealArea.charges;
  assert.equal(session.state.vampire.revealCharges, maxCharges, 'começa com todas as cargas');

  // 1º uso consome uma carga e inicia a recarga.
  applyCommand(session, 4, { type: 'castVampireAbility', ability: 'revealArea', x: 1, z: 1 });
  assert.ok(session.state.vampire.reveal, 'revelação ativa');
  assert.equal(session.state.vampire.revealCharges, maxCharges - 1);
  assert.equal(session.state.vampire.revealCooldown, VAMPIRE_ABILITIES.revealArea.cooldown, 'inicia a recarga');

  // 2º uso imediato consome a segunda carga (sem reiniciar a recarga).
  applyCommand(session, 4, { type: 'castVampireAbility', ability: 'revealArea', x: 5, z: 5 });
  assert.equal(session.state.vampire.reveal!.x, 5, 'segundo uso substitui a área');
  assert.equal(session.state.vampire.revealCharges, 0);
  assert.equal(session.state.vampire.revealCooldown, VAMPIRE_ABILITIES.revealArea.cooldown, 'recarga em andamento');

  // Sem cargas: bloqueado.
  applyCommand(session, 4, { type: 'castVampireAbility', ability: 'revealArea', x: 9, z: 9 });
  assert.equal(session.state.vampire.reveal!.x, 5, 'bloqueado sem cargas');

  // ~60s: recupera uma carga e a próxima entra em recarga.
  for (let i = 0; i < 900; i++) step(session, []);
  assert.equal(session.state.vampire.revealCharges, 1, 'recupera uma carga');
  assert.ok(session.state.vampire.revealCooldown! > 0, 'próxima carga em recarga');

  // Mais ~60s: segunda carga e recarga zerada.
  for (let i = 0; i < 900; i++) step(session, []);
  assert.equal(session.state.vampire.revealCharges, maxCharges);
  assert.equal(session.state.vampire.revealCooldown, 0, 'recarga zera com o máximo de cargas');

  applyCommand(session, 4, { type: 'castVampireAbility', ability: 'revealArea', x: 7, z: 7 });
  assert.equal(session.state.vampire.reveal!.x, 7, 'novo uso após recarregar');
});

test('Forma de Morcego: invulnerável, máx 15s e saída de 1,5s', () => {
  const { session } = fixture();
  session.state.phase = 'night';
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  vampire.hp = vampire.maxHp;
  applyCommand(session, 4, { type: 'castVampireAbility', ability: 'batForm' });
  assert.ok(vampireStatus(session.state, 'batForm') > 0);
  const tower = building(2000, 'tower', 0, 0);
  session.state.buildings.push(tower);
  vampire.x = 5; vampire.z = 0; tower.attackCd = 0;
  const before = vampire.hp;
  step(session, []);
  assert.equal(vampire.hp, before, 'invulnerável durante a Forma de Morcego');
  for (let i = 0; i < 15 * 15 + 2; i++) step(session, []);
  assert.equal(vampireStatus(session.state, 'batForm'), 0, 'a forma termina no tempo máximo');
  assert.ok(vampireStatus(session.state, 'exitingBatForm') > 0, 'inicia a animação de saída');
});

test('Teleport do Vampiro canaliza 2,8s e conclui na base', () => {
  const { session } = fixture();
  session.state.phase = 'night';
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  const crypt = building(2000, 'crypt', 0, 0);
  crypt.owner = -1;
  session.state.buildings.push(crypt);
  vampire.x = 50; vampire.z = 50;
  applyCommand(session, 4, { type: 'castVampireAbility', ability: 'teleportHome' });
  assert.ok(vampireStatus(session.state, 'channelingTeleport') > 0, 'inicia a canalização');
  for (let i = 0; i < 50; i++) step(session, []); // ~3,3s
  assert.ok(Math.hypot(vampire.x - crypt.x, vampire.z - crypt.z) < 1, 'conclui na base');
  assert.equal(vampireStatus(session.state, 'channelingTeleport'), 0);
});

test('Enredar e Silenciador coexistem e expiram de forma independente', () => {
  const { session } = fixture();
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  session.state.vampire.skills.powerStrike = { cd: 0, buff: 0 };
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'entangle', targetId: vampire.id });
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'silencer', targetId: vampire.id });
  assert.ok(vampireStatus(session.state, 'entangled') > 0, 'enredado ativo');
  assert.ok(vampireStatus(session.state, 'silenced') > 0, 'silenciado ativo');
  // Com os dois ativos, ainda pode se mover (Enredar não bloqueia movimento).
  applyCommand(session, 4, { type: 'move', ids: [vampire.id], x: vampire.x + 5, z: vampire.z });
  assert.equal(vampire.order?.t, 'move', 'pode andar enredado/silenciado');
  // Habilidade continua bloqueada pelo Silenciador.
  applyCommand(session, 4, { type: 'castVampireSkill', skillId: 'powerStrike' });
  assert.equal(session.state.vampire.skills.powerStrike!.buff, 0);
  // Após ~2s o Silenciador (1,5s) expira, mas o Enredar (4s) continua.
  for (let i = 0; i < 30; i++) step(session, []);
  assert.equal(vampireStatus(session.state, 'silenced'), 0, 'silenciador expira sozinho');
  assert.ok(vampireStatus(session.state, 'entangled') > 0, 'enredar permanece');
});

test('Silenciador impede habilidades do Vampiro por 1,5s e respeita o cooldown', () => {
  const { session } = fixture();
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  session.state.vampire.skills.powerStrike = { cd: 0, buff: 0 };
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'silencer', targetId: vampire.id });
  applyCommand(session, 4, { type: 'castVampireSkill', skillId: 'powerStrike' });
  assert.equal(session.state.vampire.skills.powerStrike!.buff, 0, 'silenciado não usa habilidade');
  for (let i = 0; i < 30; i++) step(session, []); // 2s
  applyCommand(session, 4, { type: 'castVampireSkill', skillId: 'powerStrike' });
  assert.ok(session.state.vampire.skills.powerStrike!.buff > 0, 'após o efeito a habilidade funciona');
});

test('Fortificar torna a unidade invulnerável por 8s', () => {
  const { session, worker } = fixture();
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  session.state.phase = 'night';
  worker.hp = worker.maxHp = 500;
  vampire.x = worker.x + 1; vampire.z = worker.z;
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'fortify', targetId: worker.id });
  assert.ok((worker.fortify ?? 0) > 0);
  applyCommand(session, 4, { type: 'attack', ids: [vampire.id], targetId: worker.id });
  for (let i = 0; i < 45; i++) step(session, []); // 3s
  assert.equal(worker.hp, worker.maxHp, 'unidade fortificada não recebe dano');
});

test('Fortificar protege uma construção por 8s', () => {
  const { session } = fixture();
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  session.state.phase = 'night';
  const wall = building(2000, 'wall', 4, 4);
  session.state.buildings.push(wall);
  vampire.x = 1; vampire.z = 4;
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'fortify', targetId: wall.id });
  assert.ok((wall.fortify ?? 0) > 0);
  applyCommand(session, 4, { type: 'attack', ids: [vampire.id], targetId: wall.id });
  for (let i = 0; i < 45; i++) step(session, []);
  assert.equal(wall.hp, wall.maxHp, 'construção fortificada não recebe dano');
});

test('Teleporte aceita destino até 600 e rejeita acima, com cooldown', () => {
  const { session, worker } = fixture();
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'teleport', x: 700, z: 0 });
  assert.equal(worker.x, -12, 'destino acima de 600 é rejeitado');
  applyCommand(session, 0, { type: 'castHumanAbility', ability: 'teleport', x: 50, z: 0 });
  assert.equal(worker.x, 50, 'destino dentro do alcance é aceito');
  assert.ok((session.state.players[0]!.abilityCooldowns?.teleport ?? 0) > 0);
});

test('upgrade exige posse e conclusão da obra', () => {
  const { session } = fixture();
  const bank = building(2000, 'bank', 0, 0);
  session.state.buildings.push(bank);
  session.state.players[0]!.gold = 10000;
  session.state.players[0]!.wood = 10000;
  applyCommand(session, 1, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 1, 'outro jogador não melhora');
  bank.done = false;
  applyCommand(session, 0, { type: 'upgrade', ids: [], targetId: bank.id });
  assert.equal(bank.level, 1, 'obra inacabada não melhora');
});
