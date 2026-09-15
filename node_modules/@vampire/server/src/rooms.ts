// Salas de partida: criar / entrar / iniciar

import type { WebSocket } from 'ws';
import { randomUUID } from 'node:crypto';
import { createSession, makeSnapshot, step, MAP_SEED, GAME_CONFIG, DEFAULT_MAP_ID, MAP_PRESETS, MAX_HUMANS, MAX_PLAYERS, VAMPIRE_PLAYER_ID, DAY_LENGTH_MIN, DAY_LENGTH_MAX, NIGHT_LENGTH_MIN, NIGHT_LENGTH_MAX, type MapPresetId, type Session } from '@vampire/shared';
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
  // Durações do ciclo configuradas no lobby (segundos).
  daySeconds: number;
  nightSeconds: number;
  // Mapa escolhido no lobby.
  mapId: MapPresetId;
  queue: Array<{ playerId: number; cmd: Command }>;
  // Comandos aceitos por jogador no tick atual; limita flood de um cliente.
  cmdCount: Map<number, number>;
  // Última quantidade de cada nó enviada ao cliente. Os nós são quase estáticos;
  // enviá-los por inteiro a cada tick custava ~33 KB × 15 Hz por jogador.
  nodeAmounts: Map<number, number>;
  // Quando a partida terminou (para liberar a sala depois de um tempo).
  endedAt?: number;
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
    daySeconds: GAME_CONFIG.match.daySeconds,
    nightSeconds: GAME_CONFIG.match.nightSeconds,
    mapId: DEFAULT_MAP_ID,
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

/**
 * Ajusta as durações do dia/noite. Só o anfitrião, no lobby, dentro das faixas
 * permitidas. O valor é aplicado quando a partida começa.
 */
export function setRoomDurations(room: Room, client: Client, daySeconds: number, nightSeconds: number): string | null {
  if (room.status !== 'lobby') return 'A partida já começou';
  if (client.id !== room.hostId) return 'Somente o anfitrião pode alterar os tempos';
  const clamp = (value: number, min: number, max: number) =>
    Number.isFinite(value) ? Math.min(max, Math.max(min, Math.round(value))) : null;
  const day = clamp(daySeconds, DAY_LENGTH_MIN, DAY_LENGTH_MAX);
  const night = clamp(nightSeconds, NIGHT_LENGTH_MIN, NIGHT_LENGTH_MAX);
  if (day == null || night == null) return 'Tempos inválidos';
  room.daySeconds = day;
  room.nightSeconds = night;
  return null;
}

/** Escolhe o mapa da partida. Só o anfitrião, no lobby. */
export function setRoomMap(room: Room, client: Client, mapId: MapPresetId): string | null {
  if (room.status !== 'lobby') return 'A partida já começou';
  if (client.id !== room.hostId) return 'Somente o anfitrião pode escolher o mapa';
  if (!Object.hasOwn(MAP_PRESETS, mapId)) return 'Mapa inválido';
  room.mapId = mapId;
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
  const playerIds = room.clients.map(c => c.playerId);
  const solo = room.clients.length === 1;
  // Modo solo como vampiro: sem humanos não há alvo. Adiciona um humano de
  // treino (parado) para testar ataques, sangue e a condição de vitória.
  if (solo && room.clients[0]!.role === 'vampire') {
    playerIds.push(0);
    names[0] = 'Humano (treino)';
  }
  room.session = createSession(names, room.seed, playerIds, room.daySeconds, room.nightSeconds, room.mapId);
  room.session.state.practice = solo;
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

/**
 * Depois do resultado, devolve a sala ao lobby mantendo os mesmos jogadores,
 * para uma revanche. As equipes são mantidas; só as confirmações caem.
 */
export function reopenLobby(room: Room): void {
  room.status = 'lobby';
  room.session = null;
  room.endedAt = undefined;
  room.queue = [];
  room.cmdCount.clear();
  room.nodeAmounts.clear();
  for (const client of room.clients) client.ready = false;
}

export function stepRoom(room: Room): void {
  if (room.status !== 'playing' || !room.session) return;
  const commands = room.queue;
  room.queue = [];
  room.cmdCount.clear();
  step(room.session, commands);
  const snap = makeSnapshot(room.session.state, false) as WireSnapshot;
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
    const res = JSON.stringify({ type: 'result', result: room.session.state.result });
    for (const c of room.clients) {
      if (c.ws.readyState === 1) c.ws.send(res);
    }
    // Volta ao lobby com os mesmos jogadores para permitir uma revanche sem
    // precisar recriar a sala. O resultado enviado acima ainda é exibido.
    reopenLobby(room);
    broadcastLobby(room);
  }
}

/** Libera salas vazias e salas encerradas há muito tempo (evita acúmulo). */
const ENDED_ROOM_TTL_MS = 5 * 60_000;
export function purgeRooms(now = Date.now()): void {
  for (const [code, room] of rooms) {
    if (room.clients.length === 0) {
      rooms.delete(code);
      continue;
    }
    if (room.status === 'ended' && room.endedAt !== undefined && now - room.endedAt > ENDED_ROOM_TTL_MS) {
      for (const c of room.clients) {
        try { c.ws.close(1000, 'partida encerrada'); } catch { /* socket já fechado */ }
      }
      rooms.delete(code);
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
    daySeconds: room.daySeconds,
    nightSeconds: room.nightSeconds,
    mapId: room.mapId,
    canStart: startReason(room) === null,
    startReason: startReason(room),
  };
}
