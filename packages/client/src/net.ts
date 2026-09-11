// Rede orientada a eventos: o lobby só avança após a confirmação do servidor.
import type { Command, LobbyInfo, ResourceNode, Role, Snapshot } from '@vampire/shared';
export type { LobbyInfo } from '@vampire/shared';

// Após o fim da partida, o cliente lembra o código da sala para voltar
// automaticamente ao lobby no próximo carregamento ("Voltar para a sala").
const REJOIN_KEY = 'vxh.rejoin';

export function rememberRejoin(code: string): void {
  try { sessionStorage.setItem(REJOIN_KEY, code); } catch { /* armazenamento indisponível */ }
}

/** Lê e apaga o código de reentrada pendente (uma única tentativa). */
export function takeRejoinCode(): string | null {
  try {
    const code = sessionStorage.getItem(REJOIN_KEY);
    if (code) sessionStorage.removeItem(REJOIN_KEY);
    return code;
  } catch { return null; }
}

/** Descarta a reentrada pendente (ex.: jogador escolheu voltar ao início). */
export function forgetRejoin(): void {
  try { sessionStorage.removeItem(REJOIN_KEY); } catch { /* armazenamento indisponível */ }
}

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
  // O servidor manda os nós uma vez no 'started' e depois só deltas; este cache
  // é injetado em cada snapshot para o resto do cliente não mudar.
  private nodeById = new Map<number, ResourceNode>();
  private nodeList: ResourceNode[] = [];

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
      // O snapshot por tick omite os nós; mantém o cache se o servidor mandar
      // a lista completa (compatibilidade).
      if (Array.isArray(msg.snap.nodes) && msg.snap.nodes.length) this.setNodes(msg.snap.nodes);
      msg.snap.nodes = this.nodeList;
      this.latestSnap = msg.snap;
      this.onSnap?.(msg.snap);
      return;
    }
    if (msg.type === 'nodes') {
      this.applyNodeDeltas(msg.nodes);
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
        if (Array.isArray(msg.nodes)) this.setNodes(msg.nodes);
        break;
      case 'left':
        this.lobby = null;
        this.clientId = null;
        this.myId = -1;
        this.latestSnap = null;
        this.setNodes([]);
        this.error = '';
        break;
      case 'error': this.error = msg.message; break;
      default: return;
    }
    this.pending = null;
    this.notify();
  }

  private setNodes(list: ResourceNode[]) {
    this.nodeById.clear();
    this.nodeList = list;
    for (const node of list) this.nodeById.set(node.id, node);
  }

  private applyNodeDeltas(updates: Array<{ id: number; amount: number }> | undefined) {
    if (!updates) return;
    for (const update of updates) {
      if (update.amount <= 0) {
        if (!this.nodeById.delete(update.id)) continue;
        const index = this.nodeList.findIndex((n) => n.id === update.id);
        if (index >= 0) this.nodeList.splice(index, 1);
      } else {
        const node = this.nodeById.get(update.id);
        if (node) node.amount = update.amount;
      }
    }
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
  // Alteração de tempos não passa por `pending`: o host pode ajustar várias
  // vezes seguidas e o servidor confirma com um novo `lobby`.
  settings(daySeconds: number, nightSeconds: number) { this.send({ type: 'settings', daySeconds, nightSeconds }); }
  start() { this.request('start'); }
  leave() { this.request('leave'); }
}
