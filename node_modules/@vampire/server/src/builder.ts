// Editor de mapa (builder) — pintura de grid, servido em URL própria e protegido
// por senha (`MAP_BUILDER_PASSWORD`). Não aparece no lobby nem no bundle do
// cliente. O resultado é salvo em `packages/server/map-overlays/<mapId>.json` e aplicado à
// próxima partida (servidor e cliente leem o mesmo overlay).

import { promises as fsp } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type http from 'node:http';
import { randomUUID } from 'node:crypto';
import { rooms } from './rooms.js';
import { MAP_PRESETS, WORLD, getMapModel, getMapOverlay, setMapOverlay, normalizeOverlay, type MapOverlay, type MapPresetId } from '@vampire/shared';

// src/ no desenvolvimento e dist/ no build ficam no mesmo nível. O caminho
// não depende do cwd, que muda entre npm workspaces e o serviço no VPS.
const OVERLAY_DIR = fileURLToPath(new URL('../map-overlays/', import.meta.url));
const LEGACY_OVERLAY_DIR = fileURLToPath(new URL('../../../map-overlays/', import.meta.url));
const BUILDER_MAP: MapPresetId = 'labyrinth';

function password(): string {
  return process.env.MAP_BUILDER_PASSWORD ?? '';
}

function overlayFile(mapId: MapPresetId): string {
  return path.join(OVERLAY_DIR, `${mapId}.json`);
}

function authorized(query: URLSearchParams): boolean {
  const pw = password();
  if (!pw) return false;
  const key = query.get('key') ?? '';
  // Comparação de tamanho fixo simples (ferramenta interna de dev).
  if (key.length !== pw.length) return false;
  let diff = 0;
  for (let i = 0; i < pw.length; i++) diff |= key.charCodeAt(i) ^ pw.charCodeAt(i);
  return diff === 0;
}

function sendJson(res: http.ServerResponse, status: number, body: unknown): void {
  const raw = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(raw);
}

async function readBody(req: http.IncomingMessage, limit = 4_000_000): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) { reject(new Error('payload grande')); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/** Carrega os mapas versionados; mantém compatibilidade com saves antigos do VPS. */
export async function loadMapOverlay(): Promise<void> {
  await fsp.mkdir(OVERLAY_DIR, { recursive: true });
  for (const file of await fsp.readdir(OVERLAY_DIR)) {
    if (!/^custom-[a-f0-9-]+\.json$/.test(file)) continue;
    try {
      const saved = JSON.parse(await fsp.readFile(path.join(OVERLAY_DIR, file), 'utf8'));
      const id = file.slice(0, -5) as MapPresetId;
      if (!['flat', 'labyrinth', 'hollows'].includes(saved.baseMapId) || typeof saved.name !== 'string') continue;
      MAP_PRESETS[id] = { ...MAP_PRESETS[saved.baseMapId as MapPresetId]!, baseMapId: saved.baseMapId, name: saved.name };
      setMapOverlay(id, normalizeOverlay(saved.overlay));
    } catch (error) { console.warn('[builder] falha ao carregar', file, error); }
  }
  for (const mapId of Object.keys(MAP_PRESETS) as MapPresetId[]) {
    if (mapId.startsWith('custom-')) continue;
    for (const directory of [OVERLAY_DIR, LEGACY_OVERLAY_DIR]) {
      const file = path.join(directory, `${mapId}.json`);
      try {
        const raw = await fsp.readFile(file, 'utf8');
        const parsed = JSON.parse(raw) as Partial<MapOverlay>;
        setMapOverlay(mapId, normalizeOverlay(parsed));
        console.log('[builder] overlay carregado de', file);
        break;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') continue;
        console.warn('[builder] falha ao carregar overlay de', file, error);
        break;
      }
    }
  }
}

function buildState(mapId:MapPresetId) {
  const model = getMapModel(mapId);
  const map = model.generateMap();
  const n = map.tiles;
  const height = new Uint8Array(n * n);
  for (let i = 0; i < n * n; i++) height[i] = Math.max(0, Math.min(255, Math.round(((map.height[i] ?? 0) / 0.9) * 255)));
  const overlay = getMapOverlay(mapId) ?? { version: 1, adds: [], removes: [] };
  return {
    mapId,
    tiles: n,
    tileSize: WORLD.tileSize,
    half: WORLD.half,
    water: Buffer.from(map.water).toString('base64'),
    height: Buffer.from(height).toString('base64'),
    obstacles: map.obstacles.map((o) => [o.x, o.z, o.width, o.depth]),
    refuges: model.compounds.map((c) => [c.x, c.z, c.width, c.depth]),
    trails: model.trails.map((t) => t.map((p) => [p.x, p.z])),
    overlay,
  };
}

async function saveOverlay(body: string, mapId:MapPresetId): Promise<void> {
  const parsed = JSON.parse(body) as Partial<MapOverlay>;
  const overlay: MapOverlay = normalizeOverlay(parsed);
  await fsp.mkdir(OVERLAY_DIR, { recursive: true });
  const config = MAP_PRESETS[mapId]!;
  const data = mapId.startsWith('custom-') ? { name: config.name, baseMapId: config.baseMapId, overlay } : overlay;
  const temporary = `${overlayFile(mapId)}.tmp`;
  await fsp.writeFile(temporary, JSON.stringify(data));
  await fsp.rename(temporary, overlayFile(mapId));
  setMapOverlay(mapId, overlay);
}

// ---------- páginas ----------

// A página 2D foi substituída pelo builder 3D no cliente (?builder=1).
// `/builder` continua existindo apenas como atalho/redirect para ele.
/** Trata as rotas do builder/overlay. Retorna true se a requisição foi tratada. */
export async function handleBuilder(req: http.IncomingMessage, res: http.ServerResponse): Promise<boolean> {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const urlPath = url.pathname;
  if (urlPath === '/api/maps') { sendJson(res, 200, MAP_PRESETS); return true; }
  if (urlPath !== '/api/map-overlay' && !urlPath.startsWith('/builder')) return false;
  const requestedMap = url.searchParams.get('mapId') ?? BUILDER_MAP;
  if (!Object.hasOwn(MAP_PRESETS,requestedMap)) { sendJson(res,400,{error:'Mapa invalido'}); return true; }
  const mapId = requestedMap as MapPresetId;

  // Endpoint PÚBLICO: o cliente busca o overlay antes de montar a cena.
  if (urlPath === '/api/map-overlay') {
    const overlay = getMapOverlay(mapId);
    // Envia chaves curtas (o cliente usa `adds`/`removes`).
    sendJson(res, 200, overlay ?? { version: 0, adds: [], removes: [] });
    return true;
  }

  if (!urlPath.startsWith('/builder')) return false;

  if (!password()) { sendJson(res, 404, { error: 'builder desativado' }); return true; }
  if (!authorized(url.searchParams)) { sendJson(res, 401, { error: 'senha inválida' }); return true; }

  if (urlPath === '/builder/create' && req.method === 'POST') {
    let id: MapPresetId | undefined;
    try {
      const body = JSON.parse(await readBody(req));
      const name = typeof body.name === 'string' ? body.name.trim() : '';
      if (!name || name.length > 60) throw new Error('Informe um nome de até 60 caracteres.');
      id = `custom-${randomUUID()}`;
      MAP_PRESETS[id] = { ...MAP_PRESETS[mapId]!, name, baseMapId: MAP_PRESETS[mapId]!.baseMapId ?? mapId as 'labyrinth' | 'hollows' | 'flat' };
      await saveOverlay(JSON.stringify(body.overlay ?? {}), id);
      sendJson(res, 201, { mapId: id });
    } catch (error) {
      if (id) { delete MAP_PRESETS[id]; setMapOverlay(id, null); }
      sendJson(res, 400, { error: (error as Error).message });
    }
    return true;
  }
  if (urlPath === '/builder/delete' && req.method === 'DELETE') {
    if (!mapId.startsWith('custom-')) { sendJson(res, 400, { error: 'Os modelos padrão não podem ser excluídos.' }); return true; }
    if ([...rooms.values()].some(room => room.mapId === mapId)) {
      sendJson(res, 409, { error: 'Este mapa está em uso em uma sala. Troque o mapa ou feche a sala antes de excluir.' }); return true;
    }
    try {
      await fsp.unlink(overlayFile(mapId));
      delete MAP_PRESETS[mapId]; setMapOverlay(mapId, null);
      sendJson(res, 200, { ok: true });
    } catch { sendJson(res, 500, { error: 'Não foi possível excluir o mapa.' }); }
    return true;
  }

  if (urlPath === '/builder' && (req.method === 'GET' || req.method === 'HEAD')) {
    // Atalho para o builder 3D (rota do cliente). A senha continua sendo pedida
    // ao carregar/salvar os dados.
    res.writeHead(302, { Location: `/?builder=1&mapId=${mapId}`, 'Cache-Control': 'no-store' });
    res.end();
    return true;
  }
  if (urlPath === '/builder/state' && req.method === 'GET') {
    sendJson(res, 200, buildState(mapId));
    return true;
  }
  if (urlPath === '/builder/save' && req.method === 'POST') {
    if (mapId === 'flat') { sendJson(res, 400, { error: 'Salve o modelo como um novo mapa.' }); return true; }
    try {
      await saveOverlay(await readBody(req), mapId);
      sendJson(res, 200, { ok: true });
    } catch (error) {
      sendJson(res, 400, { error: String((error as Error).message ?? error) });
    }
    return true;
  }
  sendJson(res, 404, { error: 'rota desconhecida' });
  return true;
}
