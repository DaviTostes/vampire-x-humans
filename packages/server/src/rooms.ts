// Salas de partida: criar / entrar / iniciar

import type { WebSocket } from 'ws';
import { randomUUID } from 'node:crypto';
import { createSession, makeSnapshot, step, MAP_SEED, GAME_CONFIG, MAX_HUMANS, MAX_PLAYERS, VAMPIRE_PLAYER_ID, type Session } from '@vampire/shared';
import type { Command, Role, LobbyInfo, ResourceNode, Snapshot } from '@vampire/shared';

// Snapshot enviado na rede: os nós saem por mensagem própria, então podem ser
// omitidos do snapshot por tick.
type WireSnapshot = Omit<Snapshot, 'nodes'> & { nodes?: Snapshot['nodes'] };

export interface Client {
  id: string;
  ws: WebSocket;
  playerId: number;
  name: string;
  role: Role | null;
  ready: boolean;
}

export interface Room {
  code: string;
  hostId: string | null;
  clients: Client[];
  status: 'lobby' | 'playing' | 'ended';
  session: Session | null;
  seed: number;
  queue: Array<{ playerId: number; cmd: Command }>;
  // Comandos aceitos por jogador no tick atual; limita flood de um cliente.
  cmdCount: Map<number, number>;
  // Última quantidade de cada nó enviada ao cliente. Os nós são quase estáticos;
  // enviá-los por inteiro a cada tick custava ~33 KB × 15 Hz por jogador.
  nodeAmounts: Map<number, number>;
}

export const rooms = new Map<string, Room>();

// Um jogador legítimo manda poucos comandos por tick; o teto evita que um
// cliente malicioso encha a fila e atrase a simulação dos demais.
const MAX_COMMANDS_PER_PLAYER_PER_TICK = 32;

function genCode(): string {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < GAME_CONFIG.lobby.codeLength; i++) code += abc[Math.floor(Math.random() * abc.length)];
  return rooms.has(code) ? genCode() : code;
}

export function createRoom(): Room {
  const code = genCode();
  const room: Room = {
    code,
    hostId: null,
    clients: [],
    status: 'lobby',
    session: null,
    seed: MAP_SEED,
    queue: [],
    cmdCount: new Map(),
    nodeAmounts: new Map(),
  };
  rooms.set(code, room);
  return room;
}

export function getRoom(code: string): Room | undefined {
  return rooms.get(code.toUpperCase().trim());
}

/** A identidade no lobby não muda quando o jogador troca de equipe. */
export function joinRoom(room: Room, ws: WebSocket, name: string): Client | { error: string } {
  if (room.status !== 'lobby') return { error: 'Partida em andamento' };
  if (room.clients.length >= MAX_PLAYERS) return { error: 'Sala cheia' };
  if (room.clients.some(c => c.ws === ws)) return { error: 'Você já está nesta sala' };
  const client: Client = {
    id: randomUUID(),
    ws,
    playerId: -1,
    name: name.trim().slice(0, 24) || `Jogador ${room.clients.length + 1}`,
    role: null,
    ready: false,
  };
  room.clients.push(client);
  room.hostId ??= client.id;
  return client;
}

export function chooseRole(room: Room, client: Client, role: Role): string | null {
  if (room.status !== 'lobby') return 'A partida já começou';
  if (role !== 'human' && role !== 'vampire') return 'Equipe inválida';
  if (client.role === role) return null;
  const count = room.clients.filter(c => c.id !== client.id && c.role === role).length;
  if (count >= (role === 'vampire' ? 1 : MAX_HUMANS)) return role === 'vampire' ? 'Outro jogador já escolheu Vampiro' : 'A equipe humana está cheia';
  client.role = role;
  client.ready = false;
  return null;
}

export function setReady(room: Room, client: Client, ready: boolean): string | null {
  if (room.status !== 'lobby') return 'A partida já começou';
  if (typeof ready !== 'boolean') return 'Confirmação inválida';
  if (!client.role) return 'Escolha Humano ou Vampiro antes de ficar pronto';
  client.ready = ready;
  return null;
}

export function startReason(room: Room): string | null {
  if (room.status !== 'lobby') return 'A partida já começou';
  if (room.clients.length === 0) return 'A sala está vazia';
  if (room.clients.some(c => c.role === null)) return 'Todos precisam escolher uma equipe';
  if (room.clients.length === 1) return room.clients[0]!.ready ? null : 'Marque Pronto para iniciar um teste solo';
  if (room.clients.filter(c => c.role === 'vampire').length !== 1) return 'Um jogador precisa escolher Vampiro';
  if (!room.clients.some(c => c.role === 'human')) return 'A sala precisa de pelo menos um Humano';
  if (room.clients.some(c => !c.ready)) return 'Aguardando todos ficarem prontos';
  return null;
}

export function startRoom(room: Room, requesterId: string): boolean {
  if (requesterId !== room.hostId || startReason(room)) return false;
  const names = Array.from({ length: MAX_PLAYERS }, (_, id) => id === VAMPIRE_PLAYER_ID ? 'Vampiro' : `Humano ${id + 1}`);
  let humanId = 0;
  for (const c of room.clients) {
    c.playerId = c.role === 'vampire' ? VAMPIRE_PLAYER_ID : humanId++;
    names[c.playerId] = c.name;
  }
  room.session = createSession(names, room.seed, room.clients.map(c => c.playerId));
  room.session.state.practice = room.clients.length === 1;
  room.nodeAmounts.clear();
  for (const node of room.session.state.nodes) room.nodeAmounts.set(node.id, node.amount);
  room.status = 'playing';
  return true;
}

/** Nós ativos enviados uma vez ao iniciar; depois só chegam deltas. */
export function activeNodes(room: Room): ResourceNode[] {
  return room.session?.state.nodes.filter(n => n.amount > 0) ?? [];
}

/** Nós cuja quantidade mudou desde o último envio. */
function changedNodes(room: Room): Array<{ id: number; amount: number }> {
  if (!room.session) return [];
  const changed: Array<{ id: number; amount: number }> = [];
  for (const node of room.session.state.nodes) {
    if (room.nodeAmounts.get(node.id) === node.amount) continue;
    room.nodeAmounts.set(node.id, node.amount);
    changed.push({ id: node.id, amount: node.amount });
  }
  return changed;
}

export function leaveRoom(room: Room, ws: WebSocket) {
  room.clients = room.clients.filter(c => c.ws !== ws);
  if (!room.clients.some(c => c.id === room.hostId)) room.hostId = room.clients[0]?.id ?? null;
  if (!room.clients.length) rooms.delete(room.code);
}

export function broadcastLobby(room: Room) {
  const message = JSON.stringify({ type: 'lobby', lobby: lobbyInfo(room) });
  for (const client of room.clients) if (client.ws.readyState === 1) client.ws.send(message);
}

export function stepRoom(room: Room): void {
  if (room.status !== 'playing' || !room.session) return;
  const commands = room.queue;
  room.queue = [];
  room.cmdCount.clear();
  step(room.session, commands);
  const snap = makeSnapshot(room.session.state) as WireSnapshot;
  // Nós não vão no snapshot por tick; o cliente usa o cache do 'started' e os
  // deltas de 'nodes'. Reduz o snapshot de ~37 KB para poucos KB.
  snap.nodes = undefined;
  const payload = JSON.stringify({ type: 'snap', snap });
  for (const c of room.clients) {
    // Snapshots são completos: se a conexão está ocupada, espere o próximo
    // estado em vez de acumular uma fila de posições antigas.
    if (c.ws.readyState === 1 && c.ws.bufferedAmount === 0) c.ws.send(payload);
  }
  // Deltas de nós são pequenos e não podem ser descartados, senão o cliente
  // fica com a quantidade errada para sempre.
  const nodes = changedNodes(room);
  if (nodes.length) {
    const nodePayload = JSON.stringify({ type: 'nodes', nodes });
    for (const c of room.clients) if (c.ws.readyState === 1) c.ws.send(nodePayload);
  }
  if (room.session.state.result) {
    room.status = 'ended';
    const res = JSON.stringify({ type: 'result', result: room.session.state.result });
    for (const c of room.clients) {
      if (c.ws.readyState === 1) c.ws.send(res);
    }
  }
}

export function queueCommand(room: Room, playerId: number, cmd: Command): void {
  if (room.status !== 'playing') return;
  const used = room.cmdCount.get(playerId) ?? 0;
  if (used >= MAX_COMMANDS_PER_PLAYER_PER_TICK) return;
  room.cmdCount.set(playerId, used + 1);
  room.queue.push({ playerId, cmd });
}

export function lobbyInfo(room: Room): LobbyInfo {
  return {
    code: room.code,
    hostId: room.hostId,
    players: room.clients.map(({ id, playerId, name, role, ready }) => ({ id, playerId, name, role, ready })),
    seed: room.seed,
    canStart: startReason(room) === null,
    startReason: startReason(room),
  };
}
