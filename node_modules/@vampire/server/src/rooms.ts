// Salas de partida: criar / entrar / iniciar

import type { WebSocket } from 'ws';
import { randomUUID } from 'node:crypto';
import { createSession, makeSnapshot, step, MAP_SEED, GAME_CONFIG, MAX_HUMANS, MAX_PLAYERS, VAMPIRE_PLAYER_ID, type Session } from '@vampire/shared';
import type { Command, Role, LobbyInfo } from '@vampire/shared';

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
}

export const rooms = new Map<string, Room>();

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
  room.status = 'playing';
  return true;
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
  step(room.session, commands);
  const snap = makeSnapshot(room.session.state);
  const payload = JSON.stringify({ type: 'snap', snap });
  for (const c of room.clients) {
    // Snapshots são completos: se a conexão está ocupada, espere o próximo
    // estado em vez de acumular uma fila de posições antigas.
    if (c.ws.readyState === 1 && c.ws.bufferedAmount === 0) c.ws.send(payload);
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
