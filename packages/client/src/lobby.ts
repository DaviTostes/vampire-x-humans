import { GAME_CONFIG, MAX_HUMANS, MAX_PLAYERS, type Role } from '@vampire/shared';
import { Net, takeRejoinCode } from './net.js';
import { portrait } from './portraits.js';
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

export class Lobby {
  private el = document.createElement('div');
  private name = loadName();
  private code = '';
  private copyMessage = '';
  private unsubscribe: () => void;

  constructor(private container: HTMLElement, private net: Net) {
    this.el.className = 'lobby-screen';
    container.appendChild(this.el);
    this.unsubscribe = net.subscribe(() => this.render());
    this.el.addEventListener('input', e => {
      const input = e.target as HTMLInputElement;
      if (input.id === 'v-name') { this.name = input.value; saveName(this.name); }
      if (input.id === 'v-code') {
        this.code = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, GAME_CONFIG.lobby.codeLength);
        input.value = this.code;
      }
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
        case 'copy': void this.copyCode(); break;
        case 'reconnect': void this.net.connect().catch(() => this.render()); break;
      }
    });
    this.render();
  }

  private join() {
    if (this.code.length !== GAME_CONFIG.lobby.codeLength) {
      this.net.error = `Digite o código de ${GAME_CONFIG.lobby.codeLength} caracteres da sala.`;
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
      this.copyMessage = 'Código copiado';
    } catch { this.copyMessage = `Compartilhe o código ${code}`; }
    this.render();
  }

  render() {
    const { lobby, pending, connection } = this.net;
    const busy = !!pending || connection !== 'online';
    const connectionLabel = connection === 'online' ? 'Conectado' : connection === 'connecting' ? 'Conectando…' : 'Desconectado';
    this.el.innerHTML = `
      <div class="lobby-atmosphere" aria-hidden="true"></div>
      <div class="lobby-shell">
        <header class="lobby-header"><a class="lobby-brand" href="/">V<span>×</span>H</a>
          <div class="lobby-header-actions"><span class="lobby-connection ${connection}"><i></i>${connectionLabel}</span>
          ${lobby ? `<button data-action="leave" class="lobby-leave" ${busy ? 'disabled' : ''}>✕ Sair da sala</button>` : ''}</div></header>
        <div class="lobby-error" role="alert" ${this.net.error ? '' : 'hidden'}>${escapeHtml(this.net.error)}</div>
        ${lobby ? this.roomView(busy) : this.entryView(busy)}
      </div>`;
  }

  private entryView(busy: boolean) {
    return `<main class="lobby-entry">
      <section class="lobby-intro">
        <h1>Vampire <em>×</em> Humans</h1>
        <p>Um vampiro caça. Os outros constroem defesas e tentam sobreviver até o amanhecer.</p>
        <div class="lobby-factions"><div>${portrait(false)}<span>Humanos<small>até ${MAX_HUMANS}</small></span></div>
          <b>VS</b><div>${portrait(true)}<span>Vampiro</span></div></div>
      </section>
      <section class="lobby-card lobby-entry-card">
        <label for="v-name">Seu nome</label><input id="v-name" maxlength="24" autocomplete="nickname" placeholder="Seu nome" value="${escapeHtml(this.name)}" ${busy ? 'disabled' : ''}>
        <button class="lobby-primary" data-action="create" id="v-create" ${busy ? 'disabled' : ''}>${this.net.pending === 'create' ? 'Criando…' : 'Criar sala'} <span>→</span></button>
        <div class="lobby-divider">ou</div>
        <label for="v-code">Entrar com código</label><div class="lobby-join-row"><input id="v-code" maxlength="${GAME_CONFIG.lobby.codeLength}" autocomplete="off" spellcheck="false" placeholder="Código" value="${escapeHtml(this.code)}" ${busy ? 'disabled' : ''}>
          <button data-action="join" id="v-join" ${busy ? 'disabled' : ''}>${this.net.pending === 'join' ? 'Entrando…' : 'Entrar'}</button></div>
        ${this.net.connection === 'offline' ? '<button data-action="reconnect" class="lobby-reconnect">Reconectar</button>' : ''}
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
        ${portrait(role === 'vampire')}<span><strong>${role === 'human' ? 'Humano' : 'Vampiro'}</strong></span><b>${count}/${max}</b></button>`;
    };
    return `<main class="lobby-room">
      <div class="lobby-room-heading"><h1>Sala</h1>
        <div class="lobby-invite"><button data-action="copy" title="Copiar código"><b>${lobby.code}</b><small>Copiar</small></button><small aria-live="polite">${escapeHtml(this.copyMessage || 'Compartilhe o código')}</small></div></div>
      <div class="lobby-room-columns"><section class="lobby-card lobby-roster"><div class="lobby-section-title"><h2>Jogadores</h2><span>${lobby.players.length}/${MAX_PLAYERS}</span></div>
        <div class="lobby-player-list" aria-live="polite">${lobby.players.map(p => `<div class="lobby-player ${p.id === this.net.clientId ? 'self' : ''}" data-client-id="${p.id}">
          <div class="lobby-avatar">${p.role ? portrait(p.role === 'vampire') : '<span>?</span>'}</div>
          <div class="lobby-player-name"><strong>${escapeHtml(p.name)}${p.id === this.net.clientId ? '<small>VOCÊ</small>' : ''}</strong>
            <span>${p.role === 'vampire' ? 'Vampiro' : p.role === 'human' ? 'Humano' : 'Escolhendo equipe'}${p.id === lobby.hostId ? ' · Anfitrião' : ''}</span></div>
          <span class="lobby-ready-state ${p.ready ? 'ready' : ''}">${p.ready ? '✓ Pronto' : 'Preparando'}</span></div>`).join('')}
          ${Array.from({ length: Math.max(0, MAX_PLAYERS - lobby.players.length) }, () => '<div class="lobby-empty-slot"><span>＋</span></div>').join('')}
        </div><div class="lobby-roster-footer"><span>${readyCount}/${lobby.players.length} prontos</span><button data-action="leave" class="lobby-leave" ${busy ? 'disabled' : ''}>✕ Sair</button></div>
      </section><section class="lobby-card lobby-preparation">
        ${roleCard('human', humans, MAX_HUMANS)}${roleCard('vampire', vampires, 1)}
        <button data-action="ready" class="lobby-ready-button ${me?.ready ? 'confirmed' : ''}" ${busy || !me?.role ? 'disabled' : ''}>${me?.ready ? '✓ Pronto — cancelar' : 'Estou pronto'}</button>
      </section></div>
      <div class="lobby-start-bar"><div><strong>${lobby.canStart ? (lobby.players.length === 1 ? 'Pronto para testar sozinho.' : 'Todos prontos.') : escapeHtml(lobby.startReason ?? '')}</strong></div>
        <button data-action="start" class="lobby-primary" ${busy || !isHost || !lobby.canStart ? 'disabled' : ''}>${this.net.pending === 'start' ? 'Iniciando…' : isHost ? (lobby.players.length === 1 ? 'Iniciar teste solo' : 'Iniciar partida') : 'Aguardando anfitrião'} <span>→</span></button></div>
    </main>`;
  }

  destroy() { this.unsubscribe(); this.el.remove(); }
}
