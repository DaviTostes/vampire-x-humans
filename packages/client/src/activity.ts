import type { Snapshot } from '@vampire/shared';

export function resourceLabel(kind: 'wood' | 'gold' | null | undefined) {
  return kind === 'gold' ? { icon: '🪙', name: 'ouro' } : { icon: '🪵', name: 'madeira' };
}

export function activityLabel(unit: Snapshot['units'][number], snap: Snapshot): string {
  const resource = resourceLabel(unit.carryRes ?? snap.nodes.find(n => n.id === unit.targetId)?.kind);
  switch (unit.activity) {
    case 'gathering': return `Coletando ${resource.name}`;
    case 'building': return 'Construindo';
    case 'repairing': return 'Reparando muro';
    case 'attacking': return 'Atacando';
    case 'blocked': return 'Sem caminho — escolha outra ordem';
    case 'moving': return unit.orderType === 'gather' ? `Indo coletar ${resource.name}` :
      unit.orderType === 'build' ? 'Indo construir' : unit.orderType === 'repair' ? 'Indo reparar' : unit.orderType === 'attack' ? 'Indo atacar' : 'Movendo';
    default: return 'Aguardando ordem';
  }
}
