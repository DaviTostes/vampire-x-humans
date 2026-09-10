import { GAME_CONFIG, MAX_HUMANS, MAX_PLAYERS, type Role } from '@vampire/shared';
import { Net } from './net.js';
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
        <header class="lobby-header"><a class="lobby-brand" href="/">V<span>×</span>H <small>VAMPIRE × HUMANS</small></a>
          <div class="lobby-header-actions"><span class="lobby-connection ${connection}"><i></i>${connectionLabel}</span>
          ${lobby ? `<button data-action="leave" class="lobby-leave" ${busy ? 'disabled' : ''}>✕ Sair da sala</button>` : ''}</div></header>
        <div class="lobby-error" role="alert" ${this.net.error ? '' : 'hidden'}>${escapeHtml(this.net.error)}</div>
        ${lobby ? this.roomView(busy) : this.entryView(busy)}
        <footer class="lobby-footer"><span>VALE DA VIGÍLIA</span><span>Sangue, ou liberdade.</span><span>TESTE SOLO OU MULTIPLAYER · ATÉ ${MAX_PLAYERS} JOGADORES</span></footer>
      </div>`;
  }

  private entryView(busy: boolean) {
    return `<main class="lobby-entry">
      <section class="lobby-intro"><div class="lobby-eyebrow">O DIA É SEU. A NOITE, DELE.</div>
        <h1>Construa um refúgio.<br><em>Sobreviva à caçada.</em></h1>
        <p>Entre no vale com seus amigos. Os humanos coletam e fortificam. O vampiro espera o anoitecer para caçar.</p>
        <div class="lobby-factions"><div>${portrait(false)}<span>ATÉ ${MAX_HUMANS} HUMANOS<small>Construam. Protejam-se.</small></span></div>
          <b>VS</b><div>${portrait(true)}<span>1 VAMPIRO<small>Encontre. Cace.</small></span></div></div>
        <div class="lobby-rule"><span>01</span> Escolha seu lado <span>02</span> Prepare-se <span>03</span> Sobreviva</div>
      </section>
      <section class="lobby-card lobby-entry-card"><div class="lobby-eyebrow">REÚNA SEU GRUPO</div><h2>Entrar no vale</h2>
        <label for="v-name">Seu nome</label><input id="v-name" maxlength="24" autocomplete="nickname" placeholder="Como devemos chamar você?" value="${escapeHtml(this.name)}" ${busy ? 'disabled' : ''}>
        <button class="lobby-primary" data-action="create" id="v-create" ${busy ? 'disabled' : ''}>${this.net.pending === 'create' ? 'Criando sala…' : 'Criar sala'} <span>→</span></button>
        <div class="lobby-divider">ou entre com um código</div>
        <label for="v-code">Código da sala</label><div class="lobby-join-row"><input id="v-code" maxlength="${GAME_CONFIG.lobby.codeLength}" autocomplete="off" spellcheck="false" placeholder="Código" value="${escapeHtml(this.code)}" ${busy ? 'disabled' : ''}>
          <button data-action="join" id="v-join" ${busy ? 'disabled' : ''}>${this.net.pending === 'join' ? 'Entrando…' : 'Entrar'}</button></div>
        <p class="lobby-help">Compartilhe o código com seus amigos. A equipe e a confirmação de presença são escolhidas dentro da sala.</p>
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
        ${portrait(role === 'vampire')}<span><strong>${role === 'human' ? 'Humano' : 'Vampiro'}</strong><small>${role === 'human' ? 'Colete e defenda seu refúgio.' : 'Cace e destrua as defesas.'}</small>
        <em>${selected ? 'Sua equipe' : full ? 'Equipe ocupada' : 'Escolher equipe'}</em></span><b>${count}/${max}</b></button>`;
    };
    return `<main class="lobby-room">
      <div class="lobby-room-heading"><div><div class="lobby-eyebrow">PREPARAÇÃO DA PARTIDA</div><h1>Antes do anoitecer</h1></div>
        <div class="lobby-invite"><span>CÓDIGO DA SALA</span><button data-action="copy" title="Copiar código"><b>${lobby.code}</b><small>Copiar</small></button><small aria-live="polite">${escapeHtml(this.copyMessage || 'Convide seus amigos')}</small></div></div>
      <div class="lobby-room-columns"><section class="lobby-card lobby-roster"><div class="lobby-section-title"><h2>Jogadores na sala</h2><span>${lobby.players.length}/${MAX_PLAYERS}</span></div>
        <div class="lobby-player-list" aria-live="polite">${lobby.players.map(p => `<div class="lobby-player ${p.id === this.net.clientId ? 'self' : ''}" data-client-id="${p.id}">
          <div class="lobby-avatar">${p.role ? portrait(p.role === 'vampire') : '<span>?</span>'}</div>
          <div class="lobby-player-name"><strong>${escapeHtml(p.name)}${p.id === this.net.clientId ? '<small>VOCÊ</small>' : ''}</strong>
            <span>${p.role === 'vampire' ? 'Vampiro' : p.role === 'human' ? 'Humano' : 'Escolhendo equipe'}${p.id === lobby.hostId ? ' · Anfitrião' : ''}</span></div>
          <span class="lobby-ready-state ${p.ready ? 'ready' : ''}">${p.ready ? '✓ Pronto' : 'Preparando'}</span></div>`).join('')}
          ${Array.from({ length: Math.max(0, MAX_PLAYERS - lobby.players.length) }, () => '<div class="lobby-empty-slot"><span>＋</span> Aguardando jogador</div>').join('')}
        </div><div class="lobby-roster-footer"><span>${readyCount} de ${lobby.players.length} prontos</span><button data-action="leave" class="lobby-leave" ${busy ? 'disabled' : ''}>✕ Sair da sala</button></div>
      </section><section class="lobby-card lobby-preparation"><div class="lobby-eyebrow">ESCOLHA SEU LADO</div><h2>Quem você será?</h2>
        ${roleCard('human', humans, MAX_HUMANS)}${roleCard('vampire', vampires, 1)}
        <button data-action="ready" class="lobby-ready-button ${me?.ready ? 'confirmed' : ''}" ${busy || !me?.role ? 'disabled' : ''}>${me?.ready ? '✓ Pronto — cancelar' : 'Estou pronto'}</button>
        <p class="lobby-help">${!me?.role ? 'Escolha uma equipe para confirmar.' : me.ready ? 'Tudo certo. Aguarde o início da partida.' : 'Confirme quando estiver preparado para começar.'}</p>
      </section></div>
      <div class="lobby-start-bar"><div><strong>${lobby.canStart ? (lobby.players.length === 1 ? 'Pronto para testar sozinho.' : 'Todos preparados. A caçada pode começar.') : escapeHtml(lobby.startReason ?? '')}</strong>
        <span>${lobby.players.length === 1 ? 'Teste solo disponível · escolha sua equipe e marque Pronto' : `1 vampiro contra até ${MAX_HUMANS} humanos · mapa fixo · cada humano começa do zero`}</span></div>
        <button data-action="start" class="lobby-primary" ${busy || !isHost || !lobby.canStart ? 'disabled' : ''}>${this.net.pending === 'start' ? 'Iniciando…' : isHost ? (lobby.players.length === 1 ? 'Iniciar teste solo' : 'Iniciar partida') : 'Aguardando o anfitrião'} <span>→</span></button></div>
    </main>`;
  }

  destroy() { this.unsubscribe(); this.el.remove(); }
}
