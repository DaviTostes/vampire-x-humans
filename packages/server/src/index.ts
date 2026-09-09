// Servidor HTTP + WebSocket autoritativo

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer, WebSocket } from 'ws';
import { TICK_RATE } from '@vampire/shared';
import {
  createRoom,
  getRoom,
  joinRoom,
  leaveRoom,
  chooseRole,
  setReady,
  startReason,
  broadcastLobby,
  lobbyInfo,
  queueCommand,
  rooms,
  startRoom,
  stepRoom,
  type Room,
} from './rooms.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3000);

const server = http.createServer((req, res) => {
  // serve o cliente buildado em produção
  const dist = path.join(__dirname, '../../client/dist');
  const url = req.url ?? '/';
  const file = url === '/' ? '/index.html' : url.split('?')[0]!;
  const full = path.join(dist, file);
  if (fs.existsSync(full) && fs.statSync(full).isFile()) {
    const ext = path.extname(full);
    const mime: Record<string, string> = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.ico': 'image/x-icon',
    };
    res.writeHead(200, { 'Content-Type': mime[ext] ?? 'application/octet-stream' });
    fs.createReadStream(full).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, game: 'vampire-x-humans' }));
});

const wss = new WebSocketServer({ server });

const clientRoom = new Map<WebSocket, Room>();

wss.on('connection', (ws) => {
  ws.on('error', (error) => {
    console.warn('[vampire] erro na conexão WebSocket:', error.message);
    ws.terminate();
  });
  ws.on('message', (raw) => {
    let msg: any;
    try {
      msg = JSON.parse(String(raw));
    } catch {
      return;
    }
    if (!msg || typeof msg !== 'object') return;
    const error = (message: string) => ws.send(JSON.stringify({ type: 'error', message }));

    // mensagens de lobby
    if (msg.type === 'create') {
      if (clientRoom.has(ws)) { error('Saia da sala atual antes de criar outra'); return; }
      const room = createRoom();
      const client = joinRoom(room, ws, String(msg.name ?? ''));
      if ('error' in client) return;
      clientRoom.set(ws, room);
      ws.send(JSON.stringify({ type: 'created', clientId: client.id, playerId: client.playerId, lobby: lobbyInfo(room) }));
      return;
    }
    if (msg.type === 'join') {
      if (clientRoom.has(ws)) { error('Você já está em uma sala'); return; }
      const room = getRoom(String(msg.code ?? ''));
      if (!room) {
        ws.send(JSON.stringify({ type: 'error', message: 'Sala não encontrada' }));
        return;
      }
      const client = joinRoom(room, ws, String(msg.name ?? ''));
      if ('error' in client) {
        ws.send(JSON.stringify({ type: 'error', message: client.error }));
        return;
      }
      clientRoom.set(ws, room);
      ws.send(JSON.stringify({ type: 'joined', clientId: client.id, playerId: client.playerId, lobby: lobbyInfo(room) }));
      broadcastLobby(room);
      return;
    }
    if (msg.type === 'leave') {
      const room = clientRoom.get(ws);
      if (room?.status !== 'lobby') { error('Só é possível sair pelo lobby antes da partida'); return; }
      leaveRoom(room, ws);
      clientRoom.delete(ws);
      ws.send(JSON.stringify({ type: 'left' }));
      broadcastLobby(room);
      return;
    }
    if (msg.type === 'role' || msg.type === 'ready') {
      const room = clientRoom.get(ws);
      const client = room?.clients.find(c => c.ws === ws);
      if (!room || !client) { error('Entre em uma sala primeiro'); return; }
      const message = msg.type === 'role' ? chooseRole(room, client, msg.role) : setReady(room, client, msg.ready);
      if (message) error(message);
      else broadcastLobby(room);
      return;
    }
    if (msg.type === 'start') {
      const room = clientRoom.get(ws);
      const client = room?.clients.find(c => c.ws === ws);
      if (!room || !client) { error('Entre em uma sala primeiro'); return; }
      if (client.id !== room.hostId) { error('Somente o anfitrião pode iniciar'); return; }
      if (!startRoom(room, client.id)) { error(startReason(room) ?? 'Não foi possível iniciar'); return; }
      for (const c of room.clients) if (c.ws.readyState === 1) c.ws.send(JSON.stringify({
        type: 'started', playerId: c.playerId, seed: room.seed, lobby: lobbyInfo(room),
      }));
      return;
    }

    // mensagens de jogo
    if (msg.type === 'cmd') {
      const room = clientRoom.get(ws);
      if (!room || !msg.command) return;
      const client = room.clients.find((c) => c.ws === ws);
      if (!client) return;
      queueCommand(room, client.playerId, msg.command);
      return;
    }
  });

  ws.on('close', () => {
    const room = clientRoom.get(ws);
    if (room) {
      leaveRoom(room, ws);
      clientRoom.delete(ws);
      if (room.status === 'lobby') {
        broadcastLobby(room);
      }
    }
  });
});

const TICK_MS = 1000 / TICK_RATE;
let lastSlowTickLog = -Infinity;
setInterval(() => {
  const started = performance.now();
  let slowestRoom = '';
  let slowestMs = 0;
  for (const room of rooms.values()) {
    const roomStarted = performance.now();
    stepRoom(room);
    const duration = performance.now() - roomStarted;
    if (duration > slowestMs) { slowestMs = duration; slowestRoom = room.code; }
  }
  const elapsed = performance.now() - started;
  if (elapsed > TICK_MS && started - lastSlowTickLog >= 5000) {
    lastSlowTickLog = started;
    console.warn(`[vampire] tick lento: ${elapsed.toFixed(1)}ms (limite ${TICK_MS.toFixed(1)}ms); sala ${slowestRoom}: ${slowestMs.toFixed(1)}ms`);
  }
}, TICK_MS);

server.listen(PORT, () => {
  console.log(`[vampire] servidor em http://localhost:${PORT}`);
  console.log(`[vampire] ws pronto — crie uma sala pelo cliente`);
});
