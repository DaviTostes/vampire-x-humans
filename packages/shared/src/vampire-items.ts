import { BUILDING_SIZE, CRYPT, VAMPIRE, VAMPIRE_ITEMS, VAMPIRE_SKILLS, type VampireItemId, type VampireSkillId } from './constants.js';
import type { Building, Unit, VampireState } from './types.js';

export function vampireItemBonuses(items: VampireState['items'] = {}) {
  let damage = 0, health = 0, moveSpeed = 0, cooldownMult = 1;
  for (const id of Object.keys(VAMPIRE_ITEMS) as VampireItemId[]) {
    const count = items[id] ?? 0;
    if (!count) continue;
    const item = VAMPIRE_ITEMS[id];
    damage += item.damageBonus * count;
    health += item.healthBonus * count;
    moveSpeed += item.speedBonus * count;
    cooldownMult *= Math.pow(item.cooldownFactor, count);
  }
  return { damage, health, moveSpeed, cooldownMult };
}

/** Custo em sangue do próximo nível do item, dado quantos já possui. */
export function vampireItemCost(itemId: VampireItemId, owned: number): number {
  const item = VAMPIRE_ITEMS[itemId];
  return Math.floor(item.baseCost * Math.pow(item.costGrowth, owned));
}

/** Velocidade de movimento efetiva do vampiro, com bônus das botas. */
export function vampireEffectiveSpeed(phase: 'day' | 'night', items: VampireState['items'] = {}): number {
  const base = phase === 'night' ? VAMPIRE.speedNight : VAMPIRE.speedDay;
  return base + vampireItemBonuses(items).moveSpeed;
}

/** Intervalo entre ataques, com bônus do Frenesi e piso configurado. */
export function vampireEffectiveCooldown(items: VampireState['items'] = {}): number {
  return Math.max(VAMPIRE.minAttackCooldown, VAMPIRE.attackCooldown * vampireItemBonuses(items).cooldownMult);
}

/** Multiplicador de dano da skill ativa (1 quando nenhuma ativa). */
export function vampireSkillMultiplier(skills: VampireState['skills'] = {}): number {
  for (const id of Object.keys(VAMPIRE_SKILLS) as VampireSkillId[]) {
    if ((skills[id]?.buff ?? 0) > 0) return VAMPIRE_SKILLS[id].damageMultiplier;
  }
  return 1;
}

/** Mesmas condições de abertura usadas pela simulação e pelo painel da loja. */
export function vampireShopAccess(
  phase: 'day' | 'night',
  vampire: Pick<Unit, 'kind' | 'hp' | 'x' | 'z'> | undefined,
  crypt: Pick<Building, 'kind' | 'done' | 'hp' | 'x' | 'z'> | undefined,
): string | null {
  if (phase !== 'day') return 'A loja da cripta só abre durante o dia';
  if (!vampire || vampire.kind !== 'vampire' || vampire.hp <= 0) return 'Vampiro indisponível';
  if (!crypt || crypt.kind !== 'crypt' || !crypt.done || crypt.hp <= 0) return 'Cripta indisponível';
  const half = BUILDING_SIZE.crypt / 2;
  const distance = Math.hypot(Math.max(0, Math.abs(vampire.x - crypt.x) - half), Math.max(0, Math.abs(vampire.z - crypt.z) - half));
  return distance > CRYPT.shopRange ? 'Aproxime o Vampiro da cripta para comprar' : null;
}
