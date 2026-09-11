// Ícones de recursos usados na HUD e nos efeitos de ganho: ouro, sangue e
// madeira têm ilustrações próprias em public/assets/icons.

export type ResourceKind = 'wood' | 'gold' | 'blood';

const RESOURCE_IMAGES: Partial<Record<ResourceKind, string>> = {
  wood: 'assets/icons/wood.webp',
  gold: 'assets/icons/gold.webp',
  blood: 'assets/icons/blood.webp',
};

function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}

/** URL pública da ilustração do recurso (null quando só existe o emoji). */
export function resourceIconUrl(kind: ResourceKind): string | null {
  const image = RESOURCE_IMAGES[kind];
  return image ? publicUrl(image) : null;
}

const images = new Map<ResourceKind, HTMLImageElement>();

/** Imagem já carregada do recurso, para desenhar em canvas/sprites. */
export function resourceImage(kind: ResourceKind): HTMLImageElement | null {
  if (!RESOURCE_IMAGES[kind]) return null;
  let image = images.get(kind);
  if (!image) {
    image = new Image();
    image.src = resourceIconUrl(kind)!;
    images.set(kind, image);
  }
  return image.complete && image.naturalWidth > 0 ? image : null;
}

/** Aquece o cache das imagens carregadas sob demanda (efeitos 3D). */
export function preloadResourceIcons(): void {
  for (const kind of Object.keys(RESOURCE_IMAGES) as ResourceKind[]) resourceImage(kind);
}

/** HTML do ícone do recurso: imagem para ouro/sangue, emoji para madeira. */
export function resourceIcon(kind: ResourceKind, className = 'vxh-res-icon'): string {
  const url = resourceIconUrl(kind);
  if (url) return `<img class="${className}" src="${url}" alt="" draggable="false" />`;
  return '<span class="vxh-res-emoji" aria-hidden="true">🪵</span>';
}
