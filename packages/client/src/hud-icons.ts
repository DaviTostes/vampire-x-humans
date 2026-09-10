// Ilustrações vetoriais leves para as cartas da HUD.
const art: Record<string, string> = {
  bank: '<path fill="#66503a" d="M18 42h60v37H18z"/><path fill="#b29463" d="M12 42l35-24 37 24-5 8H16z"/><path fill="#dbc092" d="M23 50h9v26h-9zm39 0h9v26h-9z"/><path fill="#19212b" d="M38 54h18v25H38z"/><path fill="#e6bd61" d="M45 61h5v9h-5z"/><path fill="#a58d6a" d="M13 79h69v7H13z"/>',
  taverna: '<path fill="#997349" d="M20 42h55v40H20z"/><path fill="#51362b" d="M11 44l38-31 36 31z"/><path fill="#d6ac6a" d="M25 51h13v16H25zm34 0h11v16H59z"/><path fill="#332721" d="M43 57h12v25H43z"/><path stroke="#503b2b" stroke-width="5" d="M20 46h56M22 43v39m52-39v39"/><path fill="#966329" d="M73 47h16v16H73z"/><path fill="#edc676" d="M77 51h7v8h-7z"/>',
  tower: '<path fill="#687984" d="M29 30h36l5 54H24z"/><path fill="#9babb2" d="M24 17h10v9h9v-9h10v9h9v-9h10v23H24z"/><path fill="#1d4b6c" d="M39 39h18v31l-9 8-9-8z"/><path fill="#d8b76e" d="M46 44h4v19h-4zm-4 7h12v4h-12z"/><path fill="#8a969a" d="M19 83h56v6H19z"/>',
  market: '<path fill="#66503a" d="M16 52h64v30H16z"/><path fill="#b23a3a" d="M12 40h72v10H12z"/><path fill="#e8dcc0" d="M12 40h12v10H12zm24 0h12v10H36zm24 0h12v10H60z"/><path fill="#9c7a4a" d="M20 50h14v32H20zm42 0h14v32H62z"/><path fill="#e6bd61" d="M46 58a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/><path fill="#e6bd61" d="M26 56h6v6h-6zm38 8h6v6h-6z"/>',
  wall: '<path fill="#627584" d="M13 44l67-16v45L13 89z"/><path fill="#9fabb0" d="M10 34l14-3v12l12-3V28l14-3v12l12-3V22l18-4v17L10 52z"/><path stroke="#354652" stroke-width="2" d="M14 64l65-16M14 77l65-16M33 48v12m22-18v12M26 63v12m21-18v12m21-17v12"/><path fill="#245375" d="M46 43l14-3v26l-7 8-7-5z"/>',
  goldMine: '<path fill="#5c4a37" d="M8 46l40-22 40 22-6 8H14z"/><path fill="#7b6a55" d="M20 50h56v33H20z"/><path fill="#241f1a" d="M38 56h20v27H38z"/><path fill="#e6bd61" d="M44 64h4v8h-4zm8 6h4v6h-4z"/><path fill="#a58d6a" d="M16 80h64v7H16z"/>',
  entangle: '<path fill="none" stroke="#8fd07a" stroke-width="3" d="M48 10v76M10 48h76M22 22l52 52M74 22L22 74"/><path fill="none" stroke="#5a9a4a" stroke-width="2" d="M48 24l24 24-24 24-24-24zM48 34l14 14-14 14-14-14z"/><circle cx="48" cy="48" r="6" fill="#e6f5d8"/>',
  fortify: '<path fill="#8a969a" d="M48 8l30 10v26c0 20-13 33-30 40-17-7-30-20-30-40V18z"/><path fill="#c9d2d6" d="M48 16l22 7v21c0 15-9 25-22 31-13-6-22-16-22-31V23z"/><path fill="#e6bd61" d="M48 26l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z"/>',
  teleport: '<path fill="none" stroke="#7fb7e8" stroke-width="6" d="M20 66c0-24 18-42 42-42M28 74c14 0 24-8 24-20"/><path fill="#cfe6ff" d="M74 16l6 16-18-2z"/><path fill="none" stroke="#3f6ea8" stroke-width="4" d="M16 44h18M16 54h10M60 80h18M68 70h14"/>',
  silencer: '<path fill="#b06a9a" d="M20 40h14l20-16v48L34 56H20z"/><path stroke="#e8b6d8" stroke-width="5" fill="none" d="M64 34l10 10-10 10M58 40h12M60 66l14 14M74 66L60 80"/>',
  damage: '<path fill="#e4d8c6" d="M30 13l8 7-17 56-9 10zm23-3l7 9-22 64-10 7zm22 8l6 10-20 51-12 9z"/><path stroke="#b42b43" stroke-width="4" d="M23 60l-4 13m29-11l-6 16m27-20l-6 16"/>',
  health: '<path fill="#ad304c" stroke="#e27d83" stroke-width="2" d="M48 79C7 49 11 23 28 22c10-1 15 6 20 14 6-10 13-16 22-13 24 8 10 37-22 56z"/><path fill="#ed9c9d" d="M22 35q1-13 14-6l-9 6-4 10z"/><path stroke="#66152b" stroke-width="3" fill="none" d="M50 35L39 48l17 4-11 16"/>',
  attackSpeed: '<path fill="none" stroke="#c25b82" stroke-width="5" d="M77 56C85 23 45 9 25 30S24 83 53 79s30-35 10-43-32 14-18 24 25-5 13-11"/><path fill="#eed0da" d="M17 66l12 3-8 9zm57-45l5 13 8-8z"/>',
  heart: '<path fill="#ad304c" stroke="#e27d83" stroke-width="2" d="M48 79C7 49 11 23 28 22c10-1 15 6 20 14 6-10 13-16 22-13 24 8 10 37-22 56z"/><path fill="#ed9c9d" d="M22 35q1-13 14-6l-9 6-4 10z"/><path stroke="#66152b" stroke-width="3" fill="none" d="M50 35L39 48l17 4-11 16"/>',
  boots: '<path fill="#42364d" stroke="#b99a7a" stroke-width="2" d="M35 18h27l-5 38 21 14q7 12-6 14H27l-5-11 10-21z"/><path fill="#968277" d="M33 17h31v10H33zM24 76h52v8H27z"/><path stroke="#c1a778" stroke-width="3" d="M35 35h23m-24 9h22m-24 9h22"/>',
  frenzy: '<path fill="none" stroke="#c25b82" stroke-width="5" d="M77 56C85 23 45 9 25 30S24 83 53 79s30-35 10-43-32 14-18 24 25-5 13-11"/><path fill="#eed0da" d="M17 66l12 3-8 9zm57-45l5 13 8-8z"/>',
  powerStrike: '<path fill="#ad2949" d="M48 8l9 23 23-9-10 22 20 9-24 6 5 26-22-16-20 17 3-25-24-8 23-11-8-23 21 11z"/><path fill="#ebcba7" d="M63 20L36 48l9 6-13 26 30-32-11-6z"/>',
  revealArea: '<path fill="#3b4a6b" d="M8 48c14-15 27-22 40-22s26 7 40 22c-14 15-27 22-40 22S22 63 8 48z"/><path fill="#9fd0ff" d="M48 34c9 0 17 5 25 14-8 9-16 14-25 14S31 57 23 48c8-9 16-14 25-14z"/><circle cx="48" cy="48" r="7" fill="#12203a"/><circle cx="48" cy="48" r="3" fill="#cfe6ff"/>',
  batForm: '<path fill="#3a2b52" d="M48 40c-8-14-22-20-38-18 6 6 8 12 8 20-6-4-11-5-16-3 10 8 16 18 18 30 8-10 18-16 28-16s20 6 28 16c2-12 8-22 18-30-5-2-10-1-16 3 0-8 2-14 8-20-16-2-30 4-38 18z"/><circle cx="48" cy="46" r="5" fill="#e0b0d0"/>',
  teleportHome: '<path fill="#4a3350" d="M20 44l28-24 28 24-6 6-22-18-22 18z"/><path fill="#6a4a70" d="M28 48h40v26H28z"/><path fill="#e6bd61" d="M43 58h10v16H43z"/><path fill="none" stroke="#c9a0e8" stroke-width="3" d="M14 70c8 8 20 8 28 0m16 0c8 8 20 8 28 0"/>',
};

// Ícones ilustrados (public/assets/icons). O que não estiver aqui segue no SVG.
const ICON_IMAGES: Record<string, string> = {
  entangle: 'assets/icons/entangle.webp',
  fortify: 'assets/icons/fortify.webp',
  teleport: 'assets/icons/teleport.webp',
  silencer: 'assets/icons/silencer.webp',
  revealArea: 'assets/icons/revealArea.webp',
  batForm: 'assets/icons/batForm.webp',
  teleportHome: 'assets/icons/teleportHome.webp',
  damage: 'assets/icons/damage.webp',
  health: 'assets/icons/health.webp',
  attackSpeed: 'assets/icons/attackSpeed.webp',
  powerStrike: 'assets/icons/powerStrike.webp',
};

function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}

export function commandArt(id: string): string {
  const image = ICON_IMAGES[id];
  if (image) {
    return `<span class="vxh-card-art" aria-hidden="true"><img src="${publicUrl(image)}" alt="" loading="lazy" /></span>`;
  }
  return `<span class="vxh-card-art" aria-hidden="true"><svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><ellipse cx="48" cy="85" rx="34" ry="5" fill="#000" opacity=".5"/>${art[id] ?? art.tower}</svg></span>`;
}

export function factionCrest(vampire: boolean): string {
  return vampire
    ? '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M23 18l-5-7 1 12L4 10l3 21 8-4 5 8 4 7 4-7 5-8 8 4 3-21-15 13 1-12-5 7z"/></svg>'
    : '⚜';
}
