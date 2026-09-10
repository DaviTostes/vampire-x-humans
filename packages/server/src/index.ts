// Servidor HTTP + WebSocket autoritativo

import http from 'node:http';
import { createReadStream, promises as fsp } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
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
  activeNodes,
  rooms,
  startRoom,
  stepRoom,
  type Room,
} from './rooms.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3000);
const CLIENT_DIST = path.resolve(__dirname, '../../client/dist');

// ---------- arquivos estáticos ----------

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary',
  '.fbx': 'application/octet-stream',
  '.wasm': 'application/wasm',
};
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml|wasm)|image\/svg)/;
const MAX_COMPRESS_BYTES = 4_000_000;

interface StaticEntry { size: number; mtimeMs: number; type: string; etag: string; }
// Metadados por caminho. Os arquivos são imutáveis durante a vida do processo
// (o deploy reinicia o serviço), então não há revalidação a cada requisição.
const statCache = new Map<string, StaticEntry>();
const compressedCache = new Map<string, Buffer>();

async function statFile(full: string): Promise<StaticEntry | null> {
  const cached = statCache.get(full);
  if (cached) return cached;
  try {
    const st = await fsp.stat(full);
    if (!st.isFile()) return null;
    const type = MIME[path.extname(full).toLowerCase()] ?? 'application/octet-stream';
    const entry: StaticEntry = { size: st.size, mtimeMs: st.mtimeMs, type, etag: `W/"${st.size}-${Math.floor(st.mtimeMs)}"` };
    statCache.set(full, entry);
    return entry;
  } catch {
    return null;
  }
}

/** Assets com hash no nome vêm do Vite: podem ser cacheados para sempre. */
function cacheControlFor(full: string): string {
  const base = path.basename(full);
  if (base === 'index.html') return 'no-cache';
  if (/-[A-Za-z0-9_]{8}\.(js|css|woff2?)$/.test(base)) return 'public, max-age=31536000, immutable';
  return 'public, max-age=86400';
}

function chooseEncoding(req: http.IncomingMessage): 'br' | 'gzip' | null {
  const accept = String(req.headers['accept-encoding'] ?? '');
  if (/\bbr\b/.test(accept)) return 'br';
  if (/\bgzip\b/.test(accept)) return 'gzip';
  return null;
}

function compress(raw: Buffer, enc: 'br' | 'gzip'): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const done = (err: Error | null, out: Buffer) => (err ? reject(err) : resolve(out));
    if (enc === 'br') zlib.brotliCompress(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } }, done);
    else zlib.gzip(raw, { level: 6 }, done);
  });
}

async function sendFile(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  full: string,
  entry: StaticEntry,
): Promise<void> {
  const method = req.method ?? 'GET';
  const cacheControl = cacheControlFor(full);
  const headers: http.OutgoingHttpHeaders = {
    'Content-Type': entry.type,
    'Content-Length': entry.size,
    ETag: entry.etag,
    'Last-Modified': new Date(entry.mtimeMs).toUTCString(),
    'Cache-Control': cacheControl,
    'X-Content-Type-Options': 'nosniff',
  };

  const ifNoneMatch = req.headers['if-none-match'];
  if (ifNoneMatch && String(ifNoneMatch).split(',').some((tag) => tag.trim() === entry.etag)) {
    res.writeHead(304, { ETag: entry.etag, 'Cache-Control': cacheControl });
    res.end();
    return;
  }

  const enc = COMPRESSIBLE.test(entry.type) && entry.size <= MAX_COMPRESS_BYTES ? chooseEncoding(req) : null;
  if (enc) {
    const key = `${full}|${enc}|${entry.etag}`;
    let body = compressedCache.get(key);
    if (!body) {
      body = await compress(await fsp.readFile(full), enc);
      compressedCache.set(key, body);
    }
    headers['Content-Encoding'] = enc;
    headers.Vary = 'Accept-Encoding';
    headers['Content-Length'] = body.length;
    res.writeHead(200, headers);
    if (method === 'HEAD') res.end();
    else res.end(body);
    return;
  }

  res.writeHead(200, headers);
  if (method === 'HEAD') {
    res.end();
    return;
  }
  createReadStream(full).on('error', () => res.destroy()).pipe(res);
}

function send404(res: http.ServerResponse): void {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
}

async function handleRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const method = req.method ?? 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let urlPath: string;
  try {
    urlPath = decodeURIComponent((req.url ?? '/').split('?')[0] || '/');
  } catch {
    res.writeHead(400).end('Bad Request');
    return;
  }

  // Resolve dentro de dist/ — nunca permitir escapar do diretório do cliente.
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const full = path.resolve(CLIENT_DIST, rel);
  if (full !== CLIENT_DIST && !full.startsWith(CLIENT_DIST + path.sep)) {
    send404(res);
    return;
  }

  const entry = await statFile(full);
  if (entry) {
    await sendFile(req, res, full, entry);
    return;
  }

  // Fallback de SPA: rota sem extensão recebe o index.
  if (!path.extname(urlPath)) {
    const indexFull = path.join(CLIENT_DIST, 'index.html');
    const indexEntry = await statFile(indexFull);
    if (indexEntry) {
      await sendFile(req, res, indexFull, indexEntry);
      return;
    }
  }

  if (urlPath === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, game: 'vampire-x-humans' }));
    return;
  }
  send404(res);
}

const server = http.createServer((req, res) => {
  handleRequest(req, res).catch((error) => {
    console.warn('[vampire] erro no HTTP:', error);
    if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end();
  });
});

// ---------- WebSocket ----------

const wss = new WebSocketServer({ server, maxPayload: 64 * 1024 });

const clientRoom = new Map<WebSocket, Room>();
const alive = new WeakSet<WebSocket>();

wss.on('connection', (ws) => {
  alive.add(ws);
  ws.on('pong', () => alive.add(ws));
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
        type: 'started', playerId: c.playerId, seed: room.seed, lobby: lobbyInfo(room), nodes: activeNodes(room),
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

// Derruba conexões meio-abertas: sem isso, um cliente que some (rede móvel,
// suspensão) ocupa a sala para sempre porque o TCP não avisa.
const HEARTBEAT_MS = 30_000;
const heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (!alive.has(ws)) { ws.terminate(); continue; }
    alive.delete(ws);
    ws.ping();
  }
}, HEARTBEAT_MS);

// ---------- loop de simulação ----------

const TICK_MS = 1000 / TICK_RATE;
let lastSlowTickLog = -Infinity;
const tickTimer = setInterval(() => {
  const started = performance.now();
  let slowestRoom = '';
  let slowestMs = 0;
  for (const room of rooms.values()) {
    const roomStarted = performance.now();
    try {
      stepRoom(room);
    } catch (error) {
      // Uma sala com defeito não pode derrubar o loop das outras nem encher o
      // log a cada tick.
      console.error(`[vampire] erro ao simular a sala ${room.code}:`, error);
    }
    const duration = performance.now() - roomStarted;
    if (duration > slowestMs) { slowestMs = duration; slowestRoom = room.code; }
  }
  const elapsed = performance.now() - started;
  if (elapsed > TICK_MS && started - lastSlowTickLog >= 5000) {
    lastSlowTickLog = started;
    console.warn(`[vampire] tick lento: ${elapsed.toFixed(1)}ms (limite ${TICK_MS.toFixed(1)}ms); sala ${slowestRoom}: ${slowestMs.toFixed(1)}ms`);
  }
}, TICK_MS);

// ---------- encerramento gracioso ----------

function shutdown(signal: string): void {
  console.log(`[vampire] ${signal} recebido; encerrando...`);
  clearInterval(tickTimer);
  clearInterval(heartbeat);
  for (const ws of wss.clients) ws.close(1001, 'servidor encerrando');
  wss.close();
  server.close(() => process.exit(0));
  // Rede lenta não pode segurar o deploy para sempre.
  setTimeout(() => process.exit(0), 5000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

server.listen(PORT, () => {
  console.log(`[vampire] servidor em http://localhost:${PORT}`);
  console.log(`[vampire] ws pronto — crie uma sala pelo cliente`);
});
