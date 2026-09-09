import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  applyCommand, createSession, step, makeSnapshot, vampireItemBonuses,
  VAMPIRE, VAMPIRE_ITEMS, VAMPIRE_PLAYER_ID, CRYPT, BUILDING_SIZE,
  type VampireItemId,
} from '@vampire/shared';

function fixture() {
  const session = createSession([], 1, [0, VAMPIRE_PLAYER_ID]);
  const vampire = session.state.units.find(u => u.kind === 'vampire')!;
  const crypt = session.state.buildings.find(b => b.kind === 'crypt')!;
  session.state.vampire.blood = 1000;
  session.state.phase = 'day';
  vampire.x = crypt.x;
  vampire.z = crypt.z + BUILDING_SIZE.crypt / 2 + 1;
  return { session, vampire, crypt };
}

test('Vampiro compra e equipa os itens com sangue na cripta durante o dia', () => {
  const { session, vampire, crypt } = fixture();
  vampire.hp -= 80;
  const maxHp = vampire.maxHp, hp = vampire.hp;
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

test('loja rejeita compras à noite, longe da cripta, sem sangue ou por humanos', () => {
  for (const scenario of ['night', 'far', 'poor', 'human', 'dead', 'wrong-building', 'unknown-item']) {
    const { session, vampire, crypt } = fixture();
    if (scenario === 'night') session.state.phase = 'night';
    if (scenario === 'far') { vampire.x = crypt.x + BUILDING_SIZE.crypt / 2 + CRYPT.shopRange + 1; vampire.z = crypt.z; }
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

test('limite de cópias impede cobrar ou aplicar bônus repetidos além do permitido', () => {
  const { session, vampire, crypt } = fixture();
  const item = VAMPIRE_ITEMS.heart;
  session.state.vampire.blood = item.baseCost * (item.maxCount + 2);
  const initialHp = vampire.maxHp;
  for (let i = 0; i < item.maxCount; i++) applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'heart' });
  const blood = session.state.vampire.blood;
  applyCommand(session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: crypt.id, itemId: 'heart' });
  assert.equal(session.state.vampire.blood, blood);
  assert.equal(vampire.maxHp, initialHp + item.healthBonus * item.maxCount);
  assert.equal(session.state.vampire.items.heart, item.maxCount);
});

test('item de dano aumenta ataques contra unidades e construções, inclusive à noite', () => {
  for (const targetKind of ['unit', 'building']) {
    const { session, vampire, crypt } = fixture();
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

test('nova partida começa sem itens comprados', () => {
  const a = fixture(), b = fixture();
  applyCommand(a.session, VAMPIRE_PLAYER_ID, { type: 'buyVampireItem', cryptId: a.crypt.id, itemId: 'heart' });
  assert.deepEqual(b.session.state.vampire.items, {});
  assert.equal(b.vampire.maxHp, VAMPIRE.hp);
});
