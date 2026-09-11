import type { Snapshot } from '@vampire/shared';
import { t } from './i18n.js';
import { resourceIcon } from './resource-icons.js';

export function resourceLabel(kind: 'wood' | 'gold' | null | undefined) {
  return kind === 'gold'
    ? { icon: resourceIcon('gold'), name: t('ouro') }
    : { icon: resourceIcon('wood'), name: t('madeira') };
}

export function activityLabel(unit: Snapshot['units'][number], snap: Snapshot): string {
  const resource = resourceLabel(unit.carryRes ?? snap.nodes.find(n => n.id === unit.targetId)?.kind);
  switch (unit.activity) {
    case 'gathering': return t('Coletando {name}', { name: resource.name });
    case 'building': return t('Construindo');
    case 'repairing': return t('Reparando muro');
    case 'attacking': return t('Atacando');
    case 'blocked': return t('Sem caminho — escolha outra ordem');
    case 'moving': return unit.orderType === 'gather' ? t('Indo coletar {name}', { name: resource.name }) :
      unit.orderType === 'build' ? t('Indo construir') : unit.orderType === 'repair' ? t('Indo reparar') : unit.orderType === 'attack' ? t('Indo atacar') : t('Movendo');
    default: return t('Aguardando ordem');
  }
}
