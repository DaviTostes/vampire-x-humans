import {
  BUILDING_SIZE,
  CRYPT_RADIUS,
  VAMPIRE,
  VAMPIRE_ITEMS,
  VAMPIRE_SKILLS,
  VAMPIRE_SHOP_KINDS,
  vampireShopRange,
  type VampireBuildingKind,
  type VampireItemId,
  type VampireItemShopKind,
  type VampireSkillId,
} from './constants.js';
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

/** Estrutura da base em que um item é comprado. */
export function vampireItemShop(itemId: VampireItemId): VampireItemShopKind {
  return VAMPIRE_ITEMS[itemId].shop;
}

export function isVampireShopKind(kind: string): kind is VampireBuildingKind {
  return (VAMPIRE_SHOP_KINDS as string[]).includes(kind);
}

/**
 * Mesmas condições de abertura usadas pela simulação e pelo painel da loja.
 * `shop` pode ser a cripta (skills) ou a loja de um item; validar qual item
 * pertence a qual loja é responsabilidade de quem chama.
 *
 * De dia o Vampiro fica confinado à região da base (cripta). Dentro dela,
 * qualquer loja atende; fora dela, ainda é possível comprar ao encostar na
 * borda da estrutura (shopRange). `base` é a cripta.
 */
export function vampireShopAccess(
  phase: 'day' | 'night',
  vampire: Pick<Unit, 'kind' | 'hp' | 'x' | 'z'> | undefined,
  shop: Pick<Building, 'kind' | 'done' | 'hp' | 'x' | 'z'> | undefined,
  base?: Pick<Building, 'x' | 'z'> | undefined,
): string | null {
  if (phase !== 'day') return 'As lojas do Vampiro só abrem durante o dia';
  if (!vampire || vampire.kind !== 'vampire' || vampire.hp <= 0) return 'Vampiro indisponível';
  if (!shop || !isVampireShopKind(shop.kind) || !shop.done || shop.hp <= 0) return 'Loja indisponível';
  // Dentro da base, todas as lojas estão ao alcance.
  if (base && Math.hypot(vampire.x - base.x, vampire.z - base.z) <= CRYPT_RADIUS) return null;
  // Fora da base, é preciso encostar na borda da estrutura.
  const half = BUILDING_SIZE[shop.kind] / 2;
  const edge = Math.max(0, Math.hypot(vampire.x - shop.x, vampire.z - shop.z) - half);
  return edge > vampireShopRange(shop.kind) ? 'Aproxime o Vampiro da base para comprar' : null;
}
