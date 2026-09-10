import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  applyCommand, createSession, step, makeSnapshot, vampireItemBonuses,
  VAMPIRE, VAMPIRE_ITEMS, VAMPIRE_PLAYER_ID, BUILDING_SIZE,
  type Building, type VampireItemId,
} from '@vampire/shared';

function fixture() {
  const session = createSession([], 1, [0, VAMPIRE_PLAYER_ID]);
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  const crypt = session.state.buildings.find(b => b.kind === 'crypt')!;
  session.state.vampire.blood = 1000;
  session.state.phase = 'day';
  return { session, vampire, crypt };
}

/** Posiciona o vampiro junto à borda da cripta. */
function standAt(vampire: { x: number; z: number }, crypt: Building) {
  vampire.x = crypt.x;
  vampire.z = crypt.z + BUILDING_SIZE[crypt.kind] / 2 + 1;
}

test('cada item é comprado na cripta durante o dia', () => {
  const { session, vampire, crypt } = fixture();
  vampire.hp -= 80;
  const maxHp = vampire.maxHp, hp = vampire.hp;

  standAt(vampire, crypt);
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'claws' });
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'heart' });

  assert.deepEqual(session.state.vampire.items, { claws: 1, heart: 1 });
  assert.equal(session.state.vampire.blood, 1000 - VAMPIRE_ITEMS.claws.baseCost - VAMPIRE_ITEMS.heart.baseCost);
  assert.equal(vampire.maxHp, maxHp + VAMPIRE_ITEMS.heart.healthBonus);
  assert.equal(vampire.hp, hp + VAMPIRE_ITEMS.heart.healthBonus);
  assert.equal(vampire.maxHp - vampire.hp, 80);
  const snap = makeSnapshot(session.state);
  assert.deepEqual(snap.vampireItems, { claws: 1, heart: 1 });
  assert.equal(vampireItemBonuses(snap.vampireItems).damage, VAMPIRE_ITEMS.claws.damageBonus);
  snap.vampireItems.claws = 99;
  assert.equal(session.state.vampire.items.claws, 1, 'snapshot não pode compartilhar o inventário mutável');
});

test('a cripta rejeita compras à noite, longe, sem sangue ou por humanos', () => {
  for (const scenario of ['night', 'far', 'poor', 'human', 'dead', 'wrong-building', 'unknown-item']) {
    const { session, vampire, crypt } = fixture();
    standAt(vampire, crypt);
    if (scenario === 'night') session.state.phase = 'night';
    if (scenario === 'far') { vampire.x = crypt.x; vampire.z = crypt.z + 60; }
    if (scenario === 'poor') session.state.vampire.blood = VAMPIRE_ITEMS.claws.baseCost - 1;
    if (scenario === 'dead') { vampire.hp = 0; vampire.dead = true; }
    const before = session.state.vampire.blood;
    applyCommand(session, scenario === 'human' ? 0 : VAMPIRE_PLAYER_ID, {
      type: 'buyVampireItem', cryptId: scenario === 'wrong-building' ? -123 : crypt.id,
      itemId: scenario === 'unknown-item' ? '__proto__' as VampireItemId : 'claws',
    });
    assert.deepEqual(session.state.vampire.items, {}, scenario);
    assert.equal(session.state.vampire.blood, before, scenario);
  }
});

test('itens de dano e vida podem ser comprados infinitamente, com custo crescente', () => {
  const { session, vampire, crypt } = fixture();
  session.state.vampire.blood = 100000;
  for (const itemId of ['claws', 'heart'] as const) {
    assert.equal(VAMPIRE_ITEMS[itemId].maxCount, Infinity, `${itemId} deve ser infinito`);
    assert.ok(VAMPIRE_ITEMS[itemId].costGrowth > 1, `${itemId} deve encarecer a cada nível`);
    standAt(vampire, crypt);
    const before = session.state.vampire.blood;
    applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId });
    applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId });
    assert.equal(session.state.vampire.items[itemId], 2, itemId);
    assert.ok(before - session.state.vampire.blood >= VAMPIRE_ITEMS[itemId].baseCost * 2, 'custo cresce a cada nível');
  }
  assert.equal(vampire.maxHp, VAMPIRE.hp + VAMPIRE_ITEMS.heart.healthBonus * 2);
});

test('item de dano aumenta ataques contra unidades e construções, inclusive à noite', () => {
  for (const targetKind of ['unit', 'building']) {
    const { session, vampire, crypt } = fixture();
    standAt(vampire, crypt);
    applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'claws' });
    session.state.phase = 'night';
    const human = session.state.units.find(u => u.owner === 0)!;
    human.x = vampire.x + 1.8; human.z = vampire.z;
    human.hp = human.maxHp = 1000;
    const wall = { ...crypt, id: 1001, owner: 0, kind: 'wall' as const, x: vampire.x + 2.6, z: vampire.z, hp: 1000, maxHp: 1000 };
    if (targetKind === 'building') session.state.buildings.push(wall);
    const target = targetKind === 'unit' ? human : wall;
    applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'attack', ids: [vampire.id], targetId: target.id });
    step(session, []);
    assert.equal(target.hp, 1000 - (targetKind === 'unit' ? VAMPIRE.attackDamage : VAMPIRE.attackDamageBuilding) - VAMPIRE_ITEMS.claws.damageBonus);
  }
});

test('skills só podem ser desbloqueadas na cripta', () => {
  const { session, vampire, crypt } = fixture();
  standAt(vampire, crypt);
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireSkill', cryptId: -123, skillId: 'powerStrike' });
  assert.deepEqual(session.state.vampire.skills, {}, 'estrutura errada não vende skill');
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireSkill', cryptId: crypt.id, skillId: 'powerStrike' });
  assert.ok(session.state.vampire.skills.powerStrike, 'a cripta desbloqueia a skill');
});

test('nova partida começa sem itens comprados', () => {
  const a = fixture(), b = fixture();
  standAt(a.vampire, a.crypt);
  applyCommand(a.session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: a.crypt.id, itemId: 'heart' });
  assert.deepEqual(b.session.state.vampire.items, {});
  assert.equal(b.vampire.maxHp, VAMPIRE.hp);
});
