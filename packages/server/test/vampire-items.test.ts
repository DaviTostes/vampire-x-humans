import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  applyCommand, createSession, step, makeSnapshot,
  vampireAttackSpeed, vampireItemBonus, vampireItemCost, vampireItemNextLevel,
  VAMPIRE, VAMPIRE_PLAYER_ID, BUILDING_SIZE,
  type Building, type VampireItemId,
} from '@vampire/shared';

function fixture() {
  const session = createSession([], 1, [0, VAMPIRE_PLAYER_ID]);
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  const crypt = session.state.buildings.find(b => b.kind === 'crypt')!;
  session.state.phase = 'day';
  session.state.vampire.blood = 1000;
  return { session, vampire, crypt };
}

/** Posiciona o vampiro junto à borda da cripta. */
function standAt(vampire: { x: number; z: number }, crypt: Building) {
  vampire.x = crypt.x;
  vampire.z = crypt.z + BUILDING_SIZE[crypt.kind] / 2 + 1;
}

test('itens são comprados na cripta com sangue e evoluem por nível', () => {
  const { session, vampire, crypt } = fixture();
  vampire.hp -= 80;
  const maxHp = vampire.maxHp, hp = vampire.hp;

  standAt(vampire, crypt);
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'damage' });
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'health' });

  assert.deepEqual(session.state.vampire.items, { damage: 1, health: 1 });
  assert.equal(session.state.vampire.blood, 1000 - vampireItemCost('damage', 0)! - vampireItemCost('health', 0)!);
  assert.equal(vampire.maxHp, maxHp + vampireItemBonus('health', 1));
  assert.equal(vampire.hp, hp + vampireItemBonus('health', 1));
  assert.equal(vampire.maxHp - vampire.hp, 80);

  const snap = makeSnapshot(session.state);
  assert.deepEqual(snap.vampireItems, { damage: 1, health: 1 });
  assert.equal(snap.blood, session.state.vampire.blood);
  snap.vampireItems.damage = 99;
  assert.equal(session.state.vampire.items.damage, 1, 'snapshot não pode compartilhar o inventário mutável');
});

test('a cripta rejeita compras à noite, longe, sem sangue ou por humanos', () => {
  for (const scenario of ['night', 'far', 'poor', 'human', 'dead', 'wrong-building', 'unknown-item'] as const) {
    const { session, vampire, crypt } = fixture();
    standAt(vampire, crypt);
    if (scenario === 'night') session.state.phase = 'night';
    if (scenario === 'far') { vampire.x = crypt.x; vampire.z = crypt.z + 60; }
    if (scenario === 'poor') session.state.vampire.blood = 0;
    if (scenario === 'dead') { vampire.hp = 0; vampire.dead = true; }
    const before = session.state.vampire.blood;
    applyCommand(session, scenario === 'human' ? 0 : VAMPIRE_PLAYER_ID, {
      type: 'buyVampireItem', cryptId: scenario === 'wrong-building' ? -123 : crypt.id,
      itemId: scenario === 'unknown-item' ? '__proto__' as VampireItemId : 'damage',
    });
    assert.deepEqual(session.state.vampire.items, {}, scenario);
    assert.equal(session.state.vampire.blood, before, scenario);
  }
});

test('Attack Speed respeita o limite de 600 e bloqueia níveis indefinidos', () => {
  const { session, vampire, crypt } = fixture();
  session.state.vampire.blood = 100000;
  standAt(vampire, crypt);
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'attackSpeed' });
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'upgradeVampireItem', itemId: 'attackSpeed' });
  assert.equal(session.state.vampire.items.attackSpeed, 2);
  // Níveis 3–6 têm bônus A CONFIRMAR: não podem ser comprados.
  assert.equal(vampireItemNextLevel('attackSpeed', 2), null);
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'upgradeVampireItem', itemId: 'attackSpeed' });
  assert.equal(session.state.vampire.items.attackSpeed, 2, 'não inventa níveis 3–6');
  // O limite absoluto nunca é ultrapassado (bônus nível 7 = +500).
  assert.equal(vampireAttackSpeed({ attackSpeed: 7 }), 600);
});

test('Vampiro recebe 80% do dano em sangue', () => {
  const { session, vampire } = fixture();
  session.state.vampire.blood = 0;
  session.state.phase = 'night';
  const human = session.state.units.find(u => u.owner === 0)!;
  human.x = vampire.x + 1.8; human.z = vampire.z;
  human.hp = human.maxHp = 10000;
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'attack', ids: [vampire.id], targetId: human.id });
  step(session, []);
  assert.equal(session.state.vampire.blood, Math.floor(VAMPIRE.attackDamage * 0.8));
});

test('nova partida começa sem itens e sem sangue', () => {
  const a = fixture(), b = fixture();
  a.session.state.vampire.blood = 1000;
  standAt(a.vampire, a.crypt);
  applyCommand(a.session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: a.crypt.id, itemId: 'health' });
  assert.deepEqual(b.session.state.vampire.items, {});
  assert.equal(b.session.state.vampire.blood, 1000);
  assert.equal(b.vampire.maxHp, VAMPIRE.hp);
});

test('novo jogo não compartilha itens entre sessões', () => {
  const a = fixture(), b = fixture();
  a.session.state.vampire.items = { damage: 3 };
  assert.deepEqual(b.session.state.vampire.items, {});
});
