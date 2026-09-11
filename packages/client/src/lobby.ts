import {
  GAME_CONFIG, MAP_PRESETS, MAX_HUMANS, MAX_PLAYERS,
  DAY_LENGTH_MIN, DAY_LENGTH_MAX, NIGHT_LENGTH_MIN, NIGHT_LENGTH_MAX,
  type MapPresetId, type Role,
} from '@vampire/shared';
import { Net, takeRejoinCode } from './net.js';
import { portrait } from './portraits.js';
import { createLocaleSwitcher, onLocaleChange, t, tServer } from './i18n.js';
import './lobby.css';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

const NAME_STORAGE_KEY = 'vxh.playerName';

function loadName() {
  try { return localStorage.getItem(NAME_STORAGE_KEY)?.slice(0, 24) ?? ''; } catch { return ''; }
}

function saveName(name: string) {
  try { localStorage.setItem(NAME_STORAGE_KEY, name); } catch { /* armazenamento indisponível */ }
}

/** Segundos → minutos para os campos do lobby (ex.: 60 → "1", 90 → "1.5"). */
function secondsToMinutes(seconds: number): string {
  return String(Math.round((seconds / 60) * 100) / 100);
}

export class Lobby {
  private el = document.createElement('div');
  private name = loadName();
  private code = '';
  private copyMessage = '';
  private unsubscribe: () => void;
  private unsubscribeLocale: () => void;

  constructor(private container: HTMLElement, private net: Net) {
    this.el.className = 'lobby-screen';
    container.appendChild(this.el);
    this.unsubscribe = net.subscribe(() => this.render());
    this.unsubscribeLocale = onLocaleChange(() => this.render());
    this.el.addEventListener('input', e => {
      const input = e.target as HTMLInputElement;
      if (input.id === 'v-name') { this.name = input.value; saveName(this.name); }
      if (input.id === 'v-code') {
        this.code = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, GAME_CONFIG.lobby.codeLength);
        input.value = this.code;
      }
    });
    this.el.addEventListener('change', e => {
      const input = e.target as HTMLInputElement;
      if (input.id !== 'v-day' && input.id !== 'v-night') return;
      // Só o anfitrião altera os tempos; o servidor revalida de qualquer forma.
      if (!this.net.lobby || this.net.lobby.hostId !== this.net.clientId) return;
      const day = Number(this.el.querySelector<HTMLInputElement>('#v-day')?.value);
      const night = Number(this.el.querySelector<HTMLInputElement>('#v-night')?.value);
      if (Number.isFinite(day) && Number.isFinite(night)) this.net.settings(day * 60, night * 60);
    });
    this.el.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || this.net.pending || this.net.connection !== 'online') return;
      if ((e.target as HTMLElement).id === 'v-code') this.join();
      else if ((e.target as HTMLElement).id === 'v-name') this.net.create(this.name);
    });
    this.el.addEventListener('click', e => {
      const button = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
      if (!button || button.disabled) return;
      switch (button.dataset.action) {
        case 'create': this.net.create(this.name); break;
        case 'join': this.join(); break;
        case 'leave': this.net.leave(); break;
        case 'start': this.net.start(); break;
        case 'ready': {
          const me = this.net.lobby?.players.find(p => p.id === this.net.clientId);
          this.net.ready(!me?.ready); break;
        }
        case 'role': this.net.chooseRole(button.dataset.role as Role); break;
        case 'map': this.net.setMap(button.dataset.map as MapPresetId); break;
        case 'copy': void this.copyCode(); break;
        case 'reconnect': void this.net.connect().catch(() => this.render()); break;
      }
    });
    this.render();
  }

  private join() {
    if (this.code.length !== GAME_CONFIG.lobby.codeLength) {
      this.net.error = t('Digite o código de {n} caracteres da sala.', { n: GAME_CONFIG.lobby.codeLength });
      this.render(); return;
    }
    this.net.join(this.code, this.name);
  }

  /**
   * Reentra automaticamente na última sala ao carregar a página, usado pelo
   * botão "Voltar para a sala" ao fim da partida. Retorna `true` se tentou.
   */
  maybeRejoin(): boolean {
    const code = takeRejoinCode();
    if (!code) return false;
    this.code = code.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, GAME_CONFIG.lobby.codeLength);
    // Pequena espera para o servidor processar o fechamento do socket antigo
    // (a página anterior) antes de ocupar de novo a vaga.
    window.setTimeout(() => {
      if (this.net.connection === 'online' && !this.net.pending) this.net.join(this.code, this.name);
      else this.render();
    }, 250);
    return true;
  }

  private async copyCode() {
    const code = this.net.lobby?.code;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      this.copyMessage = t('Código copiado');
    } catch { this.copyMessage = t('Compartilhe o código {code}', { code }); }
    this.render();
  }

  render() {
    const { lobby, pending, connection } = this.net;
    const busy = !!pending || connection !== 'online';
    const connectionLabel = connection === 'online' ? t('Conectado') : connection === 'connecting' ? t('Conectando…') : t('Desconectado');
    this.el.innerHTML = `
      <div class="lobby-atmosphere" aria-hidden="true"></div>
      <div class="lobby-shell">
        <header class="lobby-header"><a class="lobby-brand" href="/">V<span>×</span>H</a>
          <div class="lobby-header-actions">
          <div class="lobby-lang-row"><span>${t('Idioma')}</span></div>
          <span class="lobby-connection ${connection}"><i></i>${connectionLabel}</span>
          ${lobby ? `<button data-action="leave" class="lobby-leave" ${busy ? 'disabled' : ''}>✕ ${t('Sair da sala')}</button>` : ''}</div></header>
        <div class="lobby-error" role="alert" ${this.net.error ? '' : 'hidden'}>${escapeHtml(this.net.error)}</div>
        ${lobby ? this.roomView(busy) : this.entryView(busy)}
      </div>`;
    const langRow = this.el.querySelector('.lobby-lang-row')!;
    langRow.appendChild(createLocaleSwitcher());
  }

  private entryView(busy: boolean) {
    return `<main class="lobby-entry">
      <section class="lobby-intro">
        <h1>Vampire <em>×</em> Humans</h1>
        <p>${t('Um vampiro caça. Os outros constroem defesas e tentam sobreviver até o amanhecer.')}</p>
        <div class="lobby-factions"><div>${portrait(false)}<span>${t('Humanos')}<small>${t('até {n}', { n: MAX_HUMANS })}</small></span></div>
          <b>VS</b><div>${portrait(true)}<span>${t('Vampiro')}</span></div></div>
      </section>
      <section class="lobby-card lobby-entry-card">
        <label for="v-name">${t('Seu nome')}</label><input id="v-name" maxlength="24" autocomplete="nickname" placeholder="${t('Seu nome')}" value="${escapeHtml(this.name)}" ${busy ? 'disabled' : ''}>
        <button class="lobby-primary" data-action="create" id="v-create" ${busy ? 'disabled' : ''}>${this.net.pending === 'create' ? t('Criando…') : t('Criar sala')} <span>→</span></button>
        <div class="lobby-divider">${t('ou')}</div>
        <label for="v-code">${t('Entrar com código')}</label><div class="lobby-join-row"><input id="v-code" maxlength="${GAME_CONFIG.lobby.codeLength}" autocomplete="off" spellcheck="false" placeholder="${t('Código')}" value="${escapeHtml(this.code)}" ${busy ? 'disabled' : ''}>
          <button data-action="join" id="v-join" ${busy ? 'disabled' : ''}>${this.net.pending === 'join' ? t('Entrando…') : t('Entrar')}</button></div>
        ${this.net.connection === 'offline' ? `<button data-action="reconnect" class="lobby-reconnect">${t('Reconectar')}</button>` : ''}
      </section></main>`;
  }

  private roomView(busy: boolean) {
    const lobby = this.net.lobby!;
    const me = lobby.players.find(p => p.id === this.net.clientId);
    const isHost = lobby.hostId === this.net.clientId;
    const vampires = lobby.players.filter(p => p.role === 'vampire').length;
    const humans = lobby.players.filter(p => p.role === 'human').length;
    const readyCount = lobby.players.filter(p => p.ready).length;
    const roleCard = (role: Role, count: number, max: number) => {
      const selected = me?.role === role;
      const full = count >= max && !selected;
      return `<button data-action="role" data-role="${role}" class="lobby-role ${role} ${selected ? 'selected' : ''}" aria-pressed="${selected}" ${busy || full ? 'disabled' : ''}>
        ${portrait(role === 'vampire')}<span><strong>${role === 'human' ? t('Humano') : t('Vampiro')}</strong></span><b>${count}/${max}</b></button>`;
    };
    // Só o anfitrião recebe campos editáveis; os demais veem apenas os valores.
    const timeField = (id: string, label: string, seconds: number, min: number, max: number, step: number) => {
      const value = secondsToMinutes(seconds);
      const field = isHost
        ? `<input id="${id}" type="number" inputmode="decimal" min="${min}" max="${max}" step="${step}" value="${value}" ${busy ? 'disabled' : ''}>`
        : `<b class="lobby-setting-value">${value}</b>`;
      return `<div class="lobby-setting"><label for="${id}">${label} <span>(min)</span></label>${field}</div>`;
    };
    // Cartões de mapa: só o anfitrião pode selecionar.
    const mapCards = (Object.entries(MAP_PRESETS) as Array<[MapPresetId, { name: string; description: string }]>)
      .map(([id, preset]) => {
        const selected = lobby.mapId === id;
        return `<button data-action="map" data-map="${id}" class="lobby-map ${selected ? 'selected' : ''}" aria-pressed="${selected}" ${!isHost || busy ? 'disabled' : ''}>
          <strong>${escapeHtml(t(preset.name))}</strong><small>${escapeHtml(t(preset.description))}</small></button>`;
      }).join('');
    const hostLabel = isHost ? t('Você define') : t('Definido pelo anfitrião');
    return `<main class="lobby-room">
      <div class="lobby-room-heading"><h1>${t('Sala')}</h1>
        <div class="lobby-invite"><button data-action="copy" title="${t('Copiar')}"><b>${lobby.code}</b><small>${t('Copiar')}</small></button><small aria-live="polite">${escapeHtml(this.copyMessage || t('Compartilhe o código'))}</small></div></div>
      <div class="lobby-room-columns"><section class="lobby-card lobby-roster"><div class="lobby-section-title"><h2>${t('Jogadores')}</h2><span>${lobby.players.length}/${MAX_PLAYERS}</span></div>
        <div class="lobby-player-list" aria-live="polite">${lobby.players.map(p => `<div class="lobby-player ${p.id === this.net.clientId ? 'self' : ''}" data-client-id="${p.id}">
          <div class="lobby-avatar">${p.role ? portrait(p.role === 'vampire') : '<span>?</span>'}</div>
          <div class="lobby-player-name"><strong>${escapeHtml(p.name)}${p.id === this.net.clientId ? `<small>${t('VOCÊ')}</small>` : ''}</strong>
            <span>${p.role === 'vampire' ? t('Vampiro') : p.role === 'human' ? t('Humano') : t('Escolhendo equipe')}${p.id === lobby.hostId ? ` · ${t('Anfitrião')}` : ''}</span></div>
          <span class="lobby-ready-state ${p.ready ? 'ready' : ''}">${p.ready ? `✓ ${t('Pronto')}` : t('Preparando')}</span></div>`).join('')}
          ${Array.from({ length: Math.max(0, MAX_PLAYERS - lobby.players.length) }, () => '<div class="lobby-empty-slot"><span>＋</span></div>').join('')}
        </div><div class="lobby-roster-footer"><span>${readyCount}/${lobby.players.length} ${t('prontos')}</span><button data-action="leave" class="lobby-leave" ${busy ? 'disabled' : ''}>✕ ${t('Sair')}</button></div>
      </section><section class="lobby-card lobby-preparation">
        ${roleCard('human', humans, MAX_HUMANS)}${roleCard('vampire', vampires, 1)}
        <div class="lobby-settings">
          <div class="lobby-settings-heading"><h3>${t('Mapa')}</h3><span>${hostLabel}</span></div>
          <div class="lobby-map-grid">${mapCards}</div>
        </div>
        <div class="lobby-settings">
          <div class="lobby-settings-heading"><h3>${t('Tempos da partida')}</h3><span>${hostLabel}</span></div>
          <div class="lobby-settings-grid">
            ${timeField('v-day', t('Dia'), lobby.daySeconds, DAY_LENGTH_MIN / 60, DAY_LENGTH_MAX / 60, 0.5)}
            ${timeField('v-night', t('Noite'), lobby.nightSeconds, NIGHT_LENGTH_MIN / 60, NIGHT_LENGTH_MAX / 60, 1)}
          </div>
          <p class="lobby-help">${t('Se o dia raiar de novo, os humanos vencem. O vampiro compra itens na Cripta a qualquer momento.')}</p>
        </div>
        <button data-action="ready" class="lobby-ready-button ${me?.ready ? 'confirmed' : ''}" ${busy || !me?.role ? 'disabled' : ''}>${me?.ready ? t('✓ Pronto — cancelar') : t('Estou pronto')}</button>
      </section></div>
      <div class="lobby-start-bar"><div><strong>${lobby.canStart ? t(lobby.players.length === 1 ? 'Pronto para testar sozinho.' : 'Todos prontos.') : escapeHtml(tServer(lobby.startReason))}</strong></div>
        <button data-action="start" class="lobby-primary" ${busy || !isHost || !lobby.canStart ? 'disabled' : ''}>${this.net.pending === 'start' ? t('Iniciando…') : isHost ? t(lobby.players.length === 1 ? 'Iniciar teste solo' : 'Iniciar partida') : t('Aguardando anfitrião')} <span>→</span></button></div>
    </main>`;
  }

  destroy() { this.unsubscribe(); this.unsubscribeLocale(); this.el.remove(); }
}
