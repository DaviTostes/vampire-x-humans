/** Retratos das unidades e construções (imagens em `public/assets/portraits`). */
const BASE = import.meta.env.BASE_URL || '/';

function asset(file: string): string {
  return `${BASE}assets/portraits/${file}`;
}

function portraitMarkup(file: string): string {
  return `<img class="vxh-portrait-img" src="${asset(file)}" alt="" draggable="false">`;
}

const UNIT_FILES = { human: 'human.jpg', peon: 'worker.jpg', vampire: 'vampire.jpg' } as const;
export type UnitPortraitKind = keyof typeof UNIT_FILES;

/** Arquivos disponíveis por tipo de construção; sem imagem, cai no retrato da facção. */
const BUILDING_FILES: Partial<Record<string, string>> = {
  bank: 'bank.jpg',
  taverna: 'taverna.jpg',
  wall: 'wall.jpg',
  tower: 'tower.jpg',
  keep: 'keep.jpg',
  market: 'market.jpg',
  goldMine: 'mine.jpg',
  crypt: 'crypt.jpg',
};

export function unitPortrait(kind: UnitPortraitKind): string {
  return portraitMarkup(UNIT_FILES[kind] ?? 'human.jpg');
}

export function buildingPortrait(kind: string, fallback: UnitPortraitKind = 'human'): string {
  const file = BUILDING_FILES[kind];
  return file ? portraitMarkup(file) : unitPortrait(fallback);
}

/** Ícone (carta) da construção para o painel de comandos; null se não houver imagem. */
export function buildingIcon(kind: string): string | null {
  const file = BUILDING_FILES[kind];
  return file
    ? `<span class="vxh-card-art" aria-hidden="true"><img class="vxh-card-img" src="${asset(file)}" alt="" draggable="false"></span>`
    : null;
}

/** Compatibilidade com o restante do HUD/lobby. */
export function portrait(vampire: boolean): string {
  return unitPortrait(vampire ? 'vampire' : 'human');
}

export function peonPortrait(): string {
  return unitPortrait('peon');
}
