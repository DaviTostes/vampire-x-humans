// FT1: configuração de hotkeys de construções e habilidades, persistida no
// navegador e compartilhada entre o lobby e a HUD em partida.
import type { BuildKind, HumanAbilityId, VampireAbilityId } from '@vampire/shared';
import { t } from './i18n.js';

const STORAGE_KEY = 'vxh-keybinds';

export interface Keybinds {
  build: Partial<Record<BuildKind, string>>;
  human: Record<HumanAbilityId, string>;
  vampire: Record<VampireAbilityId, string>;
}

export const DEFAULT_KEYBINDS: Keybinds = {
  build: { bank: 'Q', wall: 'E', tower: 'R', market: 'T', taverna: 'F' },
  human: { entangle: '1', fortify: '2', teleport: '3', silencer: '4' },
  vampire: { revealArea: '1', batForm: '2', teleportHome: '3' },
};

const BUILD_LABELS: Partial<Record<BuildKind, string>> = {
  bank: 'Banco', wall: 'Muro', tower: 'Torre', market: 'Mercado', taverna: 'Taverna', goldMine: 'Mina de Ouro',
};
const HUMAN_LABELS: Record<HumanAbilityId, string> = {
  entangle: 'Enredar', fortify: 'Fortificar', teleport: 'Teleporte', silencer: 'Silenciador',
};
const VAMPIRE_LABELS: Record<VampireAbilityId, string> = {
  revealArea: 'Revelar Área', batForm: 'Forma de Morcego', teleportHome: 'Teleportar para a Base',
};

function clone(src: Keybinds): Keybinds {
  return { build: { ...src.build }, human: { ...src.human }, vampire: { ...src.vampire } };
}

function load(): Keybinds {
  const base = clone(DEFAULT_KEYBINDS);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<Keybinds>;
    if (parsed.build && typeof parsed.build === 'object') Object.assign(base.build, parsed.build);
    if (parsed.human && typeof parsed.human === 'object') Object.assign(base.human, parsed.human);
    if (parsed.vampire && typeof parsed.vampire === 'object') Object.assign(base.vampire, parsed.vampire);
  } catch { /* armazenamento indisponível ou inválido: mantém padrões */ }
  return base;
}

export const keybinds: Keybinds = load();

function persist(): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(keybinds)); } catch { /* armazenamento indisponível */ }
}

/** Tecla normalizada (1 caractere) ou null se não for uma tecla válida. */
function normalizeKey(key: string): string | null {
  if (key.length === 1 && key !== ' ') return key.toUpperCase();
  return null;
}

export function resetKeybinds(): void {
  const defaults = clone(DEFAULT_KEYBINDS);
  keybinds.build = defaults.build;
  keybinds.human = defaults.human;
  keybinds.vampire = defaults.vampire;
  persist();
}

let modalEl: HTMLDivElement | null = null;
let capturing: HTMLButtonElement | null = null;

function styleOnce(): void {
  if (document.getElementById('vxh-keybind-style')) return;
  const style = document.createElement('style');
  style.id = 'vxh-keybind-style';
  style.textContent = `
    .vxh-keybind-modal { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center;
      background: rgba(6,8,12,.72); }
    .vxh-keybind-modal[hidden] { display: none; }
    .vxh-keybind-panel { width: min(560px, 92vw); max-height: 82vh; overflow: auto; background: #171b22; border: 1px solid #2b323d;
      border-radius: 6px; padding: 20px 22px; color: #ddd7c4; box-shadow: 0 18px 50px rgba(0,0,0,.6); }
    .vxh-keybind-panel h2 { margin: 0 0 14px; font-size: 18px; letter-spacing: .5px; }
    .vxh-keybind-group { margin: 14px 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9aa1ad; }
    .vxh-keybind-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 6px 0;
      border-bottom: 1px solid #232933; }
    .vxh-keybind-key { min-width: 54px; padding: 5px 10px; background: #0f1319; border: 1px solid #333c48; border-radius: 4px;
      color: #e9d3a0; font-weight: 600; cursor: pointer; }
    .vxh-keybind-key.capturing { color: #ffd27a; border-color: #c9a86a; }
    .vxh-keybind-actions { display: flex; justify-content: space-between; gap: 10px; margin-top: 18px; }
    .vxh-keybind-actions button { padding: 8px 14px; border-radius: 4px; border: 1px solid #333c48; background: #212832;
      color: #ddd7c4; cursor: pointer; }
    .vxh-keybind-actions .primary { background: #2c3a2c; border-color: #3f5a3f; color: #d6f0d0; }
  `;
  document.head.appendChild(style);
}

function keyButton(scope: keyof Keybinds, id: string): string {
  const value = (keybinds[scope] as Record<string, string | undefined>)[id] ?? '';
  return `<button class="vxh-keybind-key" data-scope="${scope}" data-id="${id}">${value || '—'}</button>`;
}

function render(): void {
  if (!modalEl) return;
  const builds = Object.keys(BUILD_LABELS) as BuildKind[];
  const rows = (scope: keyof Keybinds, ids: string[], labels: Record<string, string>) => ids
    .map(id => `<div class="vxh-keybind-row"><span>${t(labels[id] ?? id)}</span>${keyButton(scope, id)}</div>`)
    .join('');
  const panel = modalEl.querySelector('.vxh-keybind-panel')!;
  panel.innerHTML = `
    <h2>${t('Configurações')}</h2>
    <div class="vxh-keybind-group">${t('Construções')}</div>
    ${rows('build', builds, BUILD_LABELS as Record<string, string>)}
    <div class="vxh-keybind-group">${t('Habilidades do Humano')}</div>
    ${rows('human', Object.keys(HUMAN_LABELS), HUMAN_LABELS as unknown as Record<string, string>)}
    <div class="vxh-keybind-group">${t('Habilidades do Vampiro')}</div>
    ${rows('vampire', Object.keys(VAMPIRE_LABELS), VAMPIRE_LABELS as unknown as Record<string, string>)}
    <div class="vxh-keybind-actions">
      <button data-keybind-reset>${t('Restaurar padrão')}</button>
      <button class="primary" data-keybind-close>${t('Fechar')}</button>
    </div>`;
}

function startCapture(btn: HTMLButtonElement): void {
  if (capturing) capturing.classList.remove('capturing');
  capturing = btn;
  btn.classList.add('capturing');
  btn.textContent = t('Pressione…');
}

function stopCapture(): void {
  if (capturing) {
    const scope = capturing.dataset.scope as keyof Keybinds;
    const id = capturing.dataset.id!;
    const value = (keybinds[scope] as Record<string, string | undefined>)[id] ?? '';
    capturing.classList.remove('capturing');
    capturing.textContent = value || '—';
    capturing = null;
  }
}

export function openKeybindSettings(): void {
  styleOnce();
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.className = 'vxh-keybind-modal';
    modalEl.innerHTML = `<div class="vxh-keybind-panel" role="dialog" aria-modal="true"></div>`;
    document.body.appendChild(modalEl);
    modalEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target === modalEl) { stopCapture(); modalEl!.hidden = true; return; }
      if (target.dataset.keybindClose !== undefined) { stopCapture(); modalEl!.hidden = true; return; }
      if (target.dataset.keybindReset !== undefined) { stopCapture(); resetKeybinds(); render(); return; }
      const key = target.closest<HTMLButtonElement>('.vxh-keybind-key');
      if (key) startCapture(key);
    });
    // Captura a tecla antes de qualquer outro atalho do jogo.
    window.addEventListener('keydown', (e) => {
      if (!modalEl || modalEl.hidden) return;
      // Com o menu aberto, os atalhos do jogo não devem disparar.
      e.stopPropagation();
      if (e.key === 'Escape') { stopCapture(); modalEl.hidden = true; return; }
      if (!capturing) return;
      // Ignora modificadores e teclas de navegação.
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;
      const value = normalizeKey(e.key);
      if (!value) return;
      e.preventDefault();
      const scope = capturing.dataset.scope as keyof Keybinds;
      const id = capturing.dataset.id!;
      (keybinds[scope] as Record<string, string>)[id] = value;
      persist();
      stopCapture();
    }, true);
  }
  render();
  modalEl.hidden = false;
}

/** Atalhos padrão do Mercado/Torre (FT3), fixos. */
export const BUILDING_HOTKEYS = { upgrade: 'Q', demolish: '1', sell: 'E', buy: 'R' } as const;
