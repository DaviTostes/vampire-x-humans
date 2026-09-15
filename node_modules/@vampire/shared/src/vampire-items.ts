import {
  CRYPT_RADIUS,
  SPEC_VAMPIRE_ITEM_TIERS,
  VAMPIRE,
  VAMPIRE_SPEC,
  VAMPIRE_SKILLS,
  type VampireItemId,
  type VampireSkillId,
} from './constants.js';
import type { Building, Unit, VampireState } from './types.js';

// ---- Itens do Vampiro (seções 20–24) ----
// Três categorias; custo em SANGUE; bônus por nível (acumulativo conforme a
// tabela central).

export const VAMPIRE_ITEM_IDS: VampireItemId[] = ['damage', 'health', 'attackSpeed'];

export const VAMPIRE_ITEM_INFO: Record<VampireItemId, { name: string; icon: string; description: string }> = {
  damage: { name: 'Lâmina Sangrenta', icon: '⚔', description: 'Aumenta o dano do Vampiro' },
  health: { name: 'Coração Ancestral', icon: '♥', description: 'Aumenta a vida máxima' },
  attackSpeed: { name: 'Ímpeto Sanguinário', icon: '🌀', description: `Aumenta a velocidade de ataque (máx. ${VAMPIRE_SPEC.maxAttackSpeed})` },
};

function tiers(id: VampireItemId): Record<number, { bonus: number | null; cost: number }> {
  return SPEC_VAMPIRE_ITEM_TIERS[id];
}

/** Nível máximo nominal da categoria. */
export function vampireItemMaxLevel(id: VampireItemId): number {
  return Object.keys(tiers(id)).length;
}

/**
 * Próximo nível comprável, ou `null` se indefinido (bônus ausente) ou máximo.
 * Bloquear níveis sem bônus evita inventar bônus não definidos na spec.
 */
export function vampireItemNextLevel(id: VampireItemId, owned: number): number | null {
  const next = owned + 1;
  const tier = tiers(id)[next];
  if (!tier || tier.bonus == null) return null;
  return next;
}

/** Custo em ouro do próximo nível, ou `null` se não houver próximo comprável. */
export function vampireItemCost(id: VampireItemId, owned: number): number | null {
  const next = vampireItemNextLevel(id, owned);
  return next == null ? null : tiers(id)[next]!.cost;
}

function singleBonus(id: VampireItemId, level: number): number {
  if (level <= 0) return 0;
  return tiers(id)[level]?.bonus ?? 0;
}

/** Bônus total da categoria conforme a política de acúmulo (substitutivo por padrão). */
export function vampireItemBonus(id: VampireItemId, level: number): number {
  if (SPEC_VAMPIRE_ITEM_TIERS.accumulation === 'cumulative') {
    let total = 0;
    for (let l = 1; l <= level; l++) total += singleBonus(id, l);
    return total;
  }
  return singleBonus(id, level);
}

export function vampireItemBonuses(items: VampireState['items'] = {}) {
  let damage = 0, health = 0, attackSpeed = 0;
  for (const id of VAMPIRE_ITEM_IDS) {
    const level = items[id] ?? 0;
    if (!level) continue;
    const value = vampireItemBonus(id, level);
    if (id === 'damage') damage += value;
    else if (id === 'health') health += value;
    else attackSpeed += value;
  }
  return { damage, health, attackSpeed };
}

/** Attack Speed final, nunca acima do limite absoluto (seção 13). */
export function vampireAttackSpeed(items: VampireState['items'] = {}): number {
  return Math.min(VAMPIRE_SPEC.attackSpeed + vampireItemBonuses(items).attackSpeed, VAMPIRE_SPEC.maxAttackSpeed);
}

/** Velocidade de movimento efetiva do vampiro (sem item de velocidade na spec). */
export function vampireEffectiveSpeed(phase: 'day' | 'night', _items: VampireState['items'] = {}): number {
  return phase === 'night' ? VAMPIRE.speedNight : VAMPIRE.speedDay;
}

/**
 * Intervalo entre ataques a partir da Attack Speed. A conversão exata
 * Attack Speed → intervalo não foi definida na spec (A CONFIRMAR); usamos uma
 * regra proporcional à Attack Speed base, respeitando o piso do projeto.
 */
export function vampireEffectiveCooldown(items: VampireState['items'] = {}): number {
  const speed = vampireAttackSpeed(items);
  const ratio = VAMPIRE_SPEC.attackSpeed / Math.max(1, speed);
  return Math.max(VAMPIRE.minAttackCooldown, VAMPIRE.attackCooldown * ratio);
}

/** Multiplicador de dano da skill ativa (1 quando nenhuma ativa). */
export function vampireSkillMultiplier(skills: VampireState['skills'] = {}): number {
  for (const id of Object.keys(VAMPIRE_SKILLS) as VampireSkillId[]) {
    if ((skills[id]?.buff ?? 0) > 0) return VAMPIRE_SKILLS[id].damageMultiplier;
  }
  return 1;
}

/**
 * Mesmas condições de abertura usadas pela simulação e pelo painel da loja.
 * A cripta atende o Vampiro em qualquer fase (dia ou noite); basta estar perto.
 */
export function vampireShopAccess(
  _phase: 'day' | 'night',
  vampire: Pick<Unit, 'kind' | 'hp' | 'x' | 'z'> | undefined,
  crypt: Pick<Building, 'kind' | 'done' | 'hp' | 'x' | 'z'> | undefined,
): string | null {
  if (!vampire || vampire.kind !== 'vampire' || vampire.hp <= 0) return 'Vampiro indisponível';
  if (!crypt || crypt.kind !== 'crypt' || !crypt.done || crypt.hp <= 0) return 'Cripta indisponível';
  const distance = Math.hypot(vampire.x - crypt.x, vampire.z - crypt.z);
  return distance > CRYPT_RADIUS ? 'Aproxime o Vampiro da cripta para comprar' : null;
}
