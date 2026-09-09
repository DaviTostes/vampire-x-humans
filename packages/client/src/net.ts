// Rede orientada a eventos: o lobby só avança após a confirmação do servidor.
import type { Command, LobbyInfo, Role, Snapshot } from '@vampire/shared';
export type { LobbyInfo } from '@vampire/shared';

export class Net {
  ws: WebSocket | null = null;
  myId = -1;
  clientId: string | null = null;
  lobby: LobbyInfo | null = null;
  latestSnap: Snapshot | null = null;
  result: Snapshot['result'] = null;
  started = false;
  connection: 'connecting' | 'online' | 'offline' = 'offline';
  pending: string | null = null;
  error = '';
  onSnap: ((snap: Snapshot) => void) | null = null;
  private listeners = new Set<() => void>();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() { for (const listener of this.listeners) listener(); }

  connect(): Promise<void> {
    if (this.ws && this.ws.readyState <= WebSocket.OPEN) return Promise.resolve();
    this.connection = 'connecting';
    this.error = '';
    this.notify();
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${proto}://${location.host}/ws`);
    this.ws = ws;
    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        this.connection = 'online'; this.notify(); resolve();
      };
      ws.onerror = () => reject(new Error('Não foi possível conectar ao servidor'));
      ws.onclose = () => {
        this.connection = 'offline';
        this.pending = null;
        this.error = 'Conexão perdida. Reconecte para entrar novamente na sala.';
        if (!this.started) { this.lobby = null; this.clientId = null; this.myId = -1; }
        this.notify();
      };
      ws.onmessage = e => this.handle(e.data);
    });
  }

  private handle(raw: string) {
    const msg = JSON.parse(raw);
    if (msg.type === 'snap') {
      this.latestSnap = msg.snap;
      this.onSnap?.(msg.snap);
      return;
    }
    switch (msg.type) {
      case 'result': this.result = msg.result; break;
      case 'created':
      case 'joined':
        this.clientId = msg.clientId;
        this.myId = msg.playerId;
        this.lobby = msg.lobby;
        this.error = '';
        break;
      case 'lobby':
        this.lobby = msg.lobby;
        this.error = '';
        break;
      case 'started':
        this.lobby = msg.lobby;
        this.myId = msg.playerId;
        this.started = true;
        break;
      case 'left':
        this.lobby = null;
        this.clientId = null;
        this.myId = -1;
        this.latestSnap = null;
        this.error = '';
        break;
      case 'error': this.error = msg.message; break;
      default: return;
    }
    this.pending = null;
    this.notify();
  }

  send(msg: object): boolean {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      this.error = 'Sem conexão com o servidor'; this.pending = null; this.notify(); return false;
    }
    this.ws.send(JSON.stringify(msg));
    return true;
  }

  private request(type: string, payload: object = {}) {
    if (this.pending) return;
    this.error = '';
    this.pending = type;
    this.notify();
    this.send({ type, ...payload });
  }

  command(command: Command) { this.send({ type: 'cmd', command }); }
  create(name: string) { this.request('create', { name }); }
  join(code: string, name: string) { this.request('join', { code, name }); }
  chooseRole(role: Role) { this.request('role', { role }); }
  ready(ready: boolean) { this.request('ready', { ready }); }
  start() { this.request('start'); }
  leave() { this.request('leave'); }
}
