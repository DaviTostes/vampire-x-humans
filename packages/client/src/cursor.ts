// Cursores temáticos medievais para TODOS os estados do cursor (seta, ponteiro,
// crosshair, texto, mover e bloqueado). As imagens viram variáveis CSS e uma
// folha global com !important garante que nenhum `cursor:pointer/crosshair`
// espalhado pelo app volte a mostrar o cursor do sistema.
function cursorUrl(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function svgWrap(inner: string): string {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>${inner}</svg>`;
}

/** Corpo da espada (sem a tag <svg>), reaproveitado nas variações. */
function swordBody(blade: string, shine: string, metal: string, gem: string): string {
  return `
    <path d='M2 2 L13.5 8.5 L8.5 13.5 Z' fill='${blade}' stroke='#0b0d12' stroke-width='1.5' stroke-linejoin='round'/>
    <path d='M4 4 L10.5 7.5 L7.5 10.5 Z' fill='${shine}' opacity='0.55'/>
    <line x1='7.5' y1='14.5' x2='14.5' y2='7.5' stroke='${metal}' stroke-width='3.2' stroke-linecap='round'/>
    <line x1='12' y1='12' x2='19' y2='19' stroke='#4a2f1b' stroke-width='3.6' stroke-linecap='round'/>
    <line x1='12.5' y1='12.5' x2='18.5' y2='18.5' stroke='#8a5a33' stroke-width='1.1' stroke-dasharray='2 2'/>
    <circle cx='21' cy='21' r='2.8' fill='${metal}' stroke='#0b0d12' stroke-width='1.1'/>
    <circle cx='21' cy='21' r='1.2' fill='${gem}'/>`;
}

function sword(blade: string, shine: string, metal: string, gem: string): string {
  return svgWrap(swordBody(blade, shine, metal, gem));
}

/** Espada bloqueada: um lenço vermelho por cima. */
function swordBlocked(): string {
  return svgWrap(`${swordBody('#b9b3ad', '#ffffff', '#8f8578', '#6b1620')}
    <circle cx='16' cy='16' r='11.5' fill='none' stroke='#c0392b' stroke-width='3'/>
    <line x1='8' y1='8' x2='24' y2='24' stroke='#c0392b' stroke-width='3' stroke-linecap='round'/>`);
}

/** Mira rúnica (crosshair): anel dourado com hastes. */
function crosshair(): string {
  const arms = (color: string, w: number) => `<g stroke='${color}' stroke-width='${w}' stroke-linecap='round'>
    <line x1='16' y1='2' x2='16' y2='9'/><line x1='16' y1='23' x2='16' y2='30'/>
    <line x1='2' y1='16' x2='9' y2='16'/><line x1='23' y1='16' x2='30' y2='16'/></g>`;
  return svgWrap(`
    <circle cx='16' cy='16' r='7.5' fill='rgba(8,10,16,0.35)'/>
    ${arms('#0b0d12', 5)}${arms('#e9d3a0', 2.2)}
    <circle cx='16' cy='16' r='7.5' fill='none' stroke='#0b0d12' stroke-width='5'/>
    <circle cx='16' cy='16' r='7.5' fill='none' stroke='#c9a86a' stroke-width='2.2'/>
    <circle cx='16' cy='16' r='1.7' fill='#c0392b' stroke='#0b0d12' stroke-width='0.8'/>`);
}

/** Pena de escrever (cursor de texto). */
function quill(): string {
  return svgWrap(`
    <path d='M28 3 C15 7 8 17 6 26 C5.4 28.4 6.6 29.6 9 29 C18 27 24 20 29 7 C29.6 5 29.6 3.6 28 3 Z'
      fill='#d9dde3' stroke='#0b0d12' stroke-width='1.4' stroke-linejoin='round'/>
    <path d='M27.5 4.5 C18 12 12 20 7 27' fill='none' stroke='#8a6d3a' stroke-width='1.1'/>
    <path d='M8 27 L4.5 30.5 L10 29 Z' fill='#c9a86a' stroke='#0b0d12' stroke-width='1'/>`);
}

/** Setas de quatro direções (mover). */
function moveCursor(): string {
  const cross = (color: string, w: number) => `<g stroke='${color}' stroke-width='${w}' stroke-linecap='round'>
    <line x1='16' y1='6' x2='16' y2='26'/><line x1='6' y1='16' x2='26' y2='16'/></g>`;
  return svgWrap(`
    ${cross('#0b0d12', 5)}${cross('#e9d3a0', 2.2)}
    <g fill='#e9d3a0' stroke='#0b0d12' stroke-width='1.2'>
      <path d='M16 1 L11 8 L21 8 Z'/><path d='M16 31 L11 24 L21 24 Z'/>
      <path d='M1 16 L8 11 L8 21 Z'/><path d='M31 16 L24 11 L24 21 Z'/>
    </g>`);
}

export function installCursors(): void {
  const root = document.documentElement.style;
  // Hotspots: espada no fio, mira/centro no centro, pena no bico.
  root.setProperty('--vxh-cursor-arrow', `${cursorUrl(sword('#d9dde3', '#ffffff', '#b8963f', '#8e2a35'))} 2 2`);
  root.setProperty('--vxh-cursor-point', `${cursorUrl(sword('#f1d99d', '#fff6d8', '#e9d3a0', '#ff5a6e'))} 2 2`);
  root.setProperty('--vxh-cursor-cross', `${cursorUrl(crosshair())} 16 16`);
  root.setProperty('--vxh-cursor-text', `${cursorUrl(quill())} 4 29`);
  root.setProperty('--vxh-cursor-move', `${cursorUrl(moveCursor())} 16 16`);
  root.setProperty('--vxh-cursor-blocked', `${cursorUrl(swordBlocked())} 2 2`);

  const style = document.createElement('style');
  style.id = 'vxh-themed-cursors';
  style.textContent = `
    html, body, #app, canvas { cursor: var(--vxh-cursor-arrow), auto !important; }
    button:not(:disabled), a, select:not(:disabled), summary, [role="button"], label,
    input[type="button"]:not(:disabled), input[type="submit"]:not(:disabled), input[type="reset"]:not(:disabled),
    .vxh-btn:not(:disabled), .vxh-hero, .vxh-quit, .vxh-modal-btn,
    .lobby-screen button:not(:disabled) { cursor: var(--vxh-cursor-point), pointer !important; }
    input, textarea, [contenteditable="true"] { cursor: var(--vxh-cursor-text), text !important; }
    .vxh-minimap, [data-cursor="crosshair"] { cursor: var(--vxh-cursor-cross), crosshair !important; }
    [draggable="true"], [data-cursor="move"] { cursor: var(--vxh-cursor-move), move !important; }
    :disabled, [aria-disabled="true"] { cursor: var(--vxh-cursor-blocked), not-allowed !important; }
  `;
  document.head.appendChild(style);
}
