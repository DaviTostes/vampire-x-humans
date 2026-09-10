// Ilustrações vetoriais leves para as cartas da HUD.
const art: Record<string, string> = {
  bank: '<path fill="#66503a" d="M18 42h60v37H18z"/><path fill="#b29463" d="M12 42l35-24 37 24-5 8H16z"/><path fill="#dbc092" d="M23 50h9v26h-9zm39 0h9v26h-9z"/><path fill="#19212b" d="M38 54h18v25H38z"/><path fill="#e6bd61" d="M45 61h5v9h-5z"/><path fill="#a58d6a" d="M13 79h69v7H13z"/>',
  taverna: '<path fill="#997349" d="M20 42h55v40H20z"/><path fill="#51362b" d="M11 44l38-31 36 31z"/><path fill="#d6ac6a" d="M25 51h13v16H25zm34 0h11v16H59z"/><path fill="#332721" d="M43 57h12v25H43z"/><path stroke="#503b2b" stroke-width="5" d="M20 46h56M22 43v39m52-39v39"/><path fill="#966329" d="M73 47h16v16H73z"/><path fill="#edc676" d="M77 51h7v8h-7z"/>',
  tower: '<path fill="#687984" d="M29 30h36l5 54H24z"/><path fill="#9babb2" d="M24 17h10v9h9v-9h10v9h9v-9h10v23H24z"/><path fill="#1d4b6c" d="M39 39h18v31l-9 8-9-8z"/><path fill="#d8b76e" d="M46 44h4v19h-4zm-4 7h12v4h-12z"/><path fill="#8a969a" d="M19 83h56v6H19z"/>',
  wall: '<path fill="#627584" d="M13 44l67-16v45L13 89z"/><path fill="#9fabb0" d="M10 34l14-3v12l12-3V28l14-3v12l12-3V22l18-4v17L10 52z"/><path stroke="#354652" stroke-width="2" d="M14 64l65-16M14 77l65-16M33 48v12m22-18v12M26 63v12m21-18v12m21-17v12"/><path fill="#245375" d="M46 43l14-3v26l-7 8-7-5z"/>',
  claws: '<path fill="#e4d8c6" d="M30 13l8 7-17 56-9 10zm23-3l7 9-22 64-10 7zm22 8l6 10-20 51-12 9z"/><path stroke="#b42b43" stroke-width="4" d="M23 60l-4 13m29-11l-6 16m27-20l-6 16"/>',
  heart: '<path fill="#ad304c" stroke="#e27d83" stroke-width="2" d="M48 79C7 49 11 23 28 22c10-1 15 6 20 14 6-10 13-16 22-13 24 8 10 37-22 56z"/><path fill="#ed9c9d" d="M22 35q1-13 14-6l-9 6-4 10z"/><path stroke="#66152b" stroke-width="3" fill="none" d="M50 35L39 48l17 4-11 16"/>',
  boots: '<path fill="#42364d" stroke="#b99a7a" stroke-width="2" d="M35 18h27l-5 38 21 14q7 12-6 14H27l-5-11 10-21z"/><path fill="#968277" d="M33 17h31v10H33zM24 76h52v8H27z"/><path stroke="#c1a778" stroke-width="3" d="M35 35h23m-24 9h22m-24 9h22"/>',
  frenzy: '<path fill="none" stroke="#c25b82" stroke-width="5" d="M77 56C85 23 45 9 25 30S24 83 53 79s30-35 10-43-32 14-18 24 25-5 13-11"/><path fill="#eed0da" d="M17 66l12 3-8 9zm57-45l5 13 8-8z"/>',
  powerStrike: '<path fill="#ad2949" d="M48 8l9 23 23-9-10 22 20 9-24 6 5 26-22-16-20 17 3-25-24-8 23-11-8-23 21 11z"/><path fill="#ebcba7" d="M63 20L36 48l9 6-13 26 30-32-11-6z"/>',
};

export function commandArt(id: string): string {
  return `<span class="vxh-card-art" aria-hidden="true"><svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><ellipse cx="48" cy="85" rx="34" ry="5" fill="#000" opacity=".5"/>${art[id] ?? art.tower}</svg></span>`;
}

export function factionCrest(vampire: boolean): string {
  return vampire
    ? '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M23 18l-5-7 1 12L4 10l3 21 8-4 5 8 4 7 4-7 5-8 8 4 3-21-15 13 1-12-5 7z"/></svg>'
    : '⚜';
}
