// Mapa fixo: Vale da Vigília. Coordenadas de mundo editáveis, sem seed aleatória.
import { WORLD, GAME_CONFIG, MAP_SCALE } from './constants.js';

/** Converte coordenadas de projeto (game.config.ts) para o mundo escalado. */
const S = (value: number): number => value * MAP_SCALE;

export const MAP_SEED = GAME_CONFIG.map.version;
export const HUMAN_SPAWNS = GAME_CONFIG.map.humanSpawns.map((p) => ({ x: S(p.x), z: S(p.z) }));
export const CRYPT_POSITION = { x: S(GAME_CONFIG.map.crypt.x), z: S(GAME_CONFIG.map.crypt.z) };

// Raio mantido livre de árvores ao redor da cripta (spawn do Vampiro): cobre a
// praça de pedra e uma folga. Vale para a floresta e para os nós de madeira.
const CRYPT_FOREST_CLEARANCE = S(44);
function withinCryptClearance(x: number, z: number): boolean {
  return Math.hypot(x - CRYPT_POSITION.x, z - CRYPT_POSITION.z) < CRYPT_FOREST_CLEARANCE;
}

export interface MapObstacle { x: number; z: number; width: number; depth: number; height: number }
export interface Compound { name: string; x: number; z: number; width: number; depth: number; facing: 'north' | 'south' | 'east' | 'west' }
export const COMPOUNDS: Compound[] = GAME_CONFIG.map.refuges.map((c) => ({
  ...c, x: Math.round(S(c.x)), z: Math.round(S(c.z)), width: S(c.width), depth: S(c.depth),
}));

export interface Bridge { x: number; z: number; width: number; depth: number }
// Altura (em unidades de mundo) do piso das pontes, no nível das margens.
export const BRIDGE_Y = 3.35;

type Point = { x: number; z: number };

function hash01(x: number, z: number): number {
  let h = (Math.imul(x, 374761393) + Math.imul(z, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

// ---------- ilha ----------
const COAST = (() => {
  const c = GAME_CONFIG.map.coast;
  return { ...c, ru: S(c.ru), rv: S(c.rv), bays: c.bays.map((b) => ({ x: S(b.x), z: S(b.z), r: S(b.r) })) };
})();
const LAKES = GAME_CONFIG.map.lakes.map((l) => ({ x: S(l.x), z: S(l.z), rx: S(l.rx), rz: S(l.rz) }));
const RIVERS = (GAME_CONFIG.map.rivers as Array<{ width: number; points: Array<{ x: number; z: number }> }>).map((r) => ({
  ...r, width: S(r.width), points: r.points.map((p) => ({ x: S(p.x), z: S(p.z) })),
}));

/** Distância normalizada ao litoral: < 1 dentro da ilha, >= 1 na água. */
function coastDistance(x: number, z: number): number {
  const c = Math.cos(COAST.rotation), s = Math.sin(COAST.rotation);
  const u = (x * c + z * s) / COAST.ru;
  const v = (-x * s + z * c) / COAST.rv;
  const d = Math.hypot(u, v);
  const ang = Math.atan2(v, u);
  const noise = COAST.noiseA * Math.sin(ang * 3 + 0.7) + COAST.noiseB * Math.sin(ang * 5 - 1.1) + 0.03 * Math.sin(ang * 7 + 2.3);
  return d - noise;
}

export function isLandAt(x: number, z: number): boolean {
  if (coastDistance(x, z) >= 1) return false;
  for (const bay of COAST.bays) if (Math.hypot(x - bay.x, z - bay.z) < bay.r) return false;
  return true;
}

function distanceToSegment(px: number, pz: number, ax: number, az: number, bx: number, bz: number): number {
  const dx = bx - ax, dz = bz - az;
  const len2 = dx * dx + dz * dz;
  const t = len2 > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / len2)) : 0;
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}

function withinRivers(x: number, z: number): boolean {
  for (const river of RIVERS) {
    const r = river.width / 2;
    for (let i = 0; i < river.points.length - 1; i++) {
      const a = river.points[i]!, b = river.points[i + 1]!;
      if (distanceToSegment(x, z, a.x, a.z, b.x, b.z) < r) return true;
    }
  }
  return false;
}

/** Água do mapa em coordenadas de mundo (mar, enseadas, lagos e rios). */
export function isWaterAtWorld(x: number, z: number): boolean {
  if (!isLandAt(x, z)) return true;
  if (LAKES.some(p => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 < 1)) return true;
  return withinRivers(x, z);
}

// ---------- relevo ----------
const BASE_H = 0.24;
// Modelo WC3: um platô alto em volta de um centro baixo, separados por uma
// falésia. O platô é andável; a falésia bloqueia. As trilhas são rampas.
const LOW_RADIUS = 34;      // raio do centro baixo
const CLIFF_WIDTH = 2.6;    // largura da falésia (íngreme, bloqueia)
const RAMP_WIDTH = 11;      // largura radial da rampa da trilha (andável)
const RAMP_HALF = 7;        // meia-largura do corredor da rampa
const RAMP_FEATHER = 2.5;   // transição lateral da rampa
const HILL_LIFT = 0.20;     // altura do platô (unidades de mapa; ~2.8 no mundo)
const BASE_RAISE = 0.13;    // elevação extra de cada base (mesa defensável)

// O relevo agora é feito pelas pedras; o terreno fica plano.
const ROCK_FORMATIONS = (GAME_CONFIG.map.rockFormations as Array<{
  x: number; z: number; rx: number; rz: number; height: number; count: number;
}>).map((f) => ({ ...f, x: S(f.x), z: S(f.z), rx: S(f.rx), rz: S(f.rz) }));

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/** Nível do terreno: 0 no centro baixo, HILL_LIFT no platô. As trilhas rampeiam. */
function hillLift(x: number, z: number): number {
  const r = Math.hypot(x, z);
  const steep = smoothstep((r - LOW_RADIUS) / CLIFF_WIDTH);
  const gentle = smoothstep((r - LOW_RADIUS) / RAMP_WIDTH);
  const dTrail = trailDistance(x, z);
  const rampness = 1 - smoothstep((dTrail - RAMP_HALF) / RAMP_FEATHER);
  return HILL_LIFT * (steep * (1 - rampness) + gentle * rampness);
}

function terrainHeight(x: number, z: number, coast: number): number {
  let h = BASE_H;
  h += 0.018 * Math.sin(x * 0.021 + 0.5) * Math.cos(z * 0.024 - 0.7);
  h += 0.014 * Math.sin((x * 0.9 + z * 0.6) * 0.017 + 1.3);
  h += hillLift(x, z);
  // Praia: perto do litoral a terra desce suave até a linha d'água.
  const shore = smoothstep((1 - coast) / 0.09);
  h = BASE_H * 0.78 + (h - BASE_H * 0.78) * shore;
  return Math.min(0.72, Math.max(BASE_H * 0.72, h));
}

// ---------- bases naturais ----------
const FACING_ANGLE: Record<Compound['facing'], number> = {
  north: -Math.PI / 2, south: Math.PI / 2, east: 0, west: Math.PI,
};

// Encosta em ferradura: a clareira ocupa uma reentrância no maciço. Segmentos
// sobrepostos garantem colisão contínua, inclusive entre picos de alturas distintas.
export function compoundWalls(c: Compound): MapObstacle[] {
  // A abertura precisa caber uma unidade no grid de 1u: nunca menor que ~3.
  const gap = Math.max(S(GAME_CONFIG.map.refugeWalls.entranceWidth), 3.4);
  const facing = FACING_ANGLE[c.facing];
  const fx = Math.cos(facing), fz = Math.sin(facing);
  const tx = -fz, tz = fx;
  const horizontal = c.facing === 'north' || c.facing === 'south';
  const rx = (horizontal ? c.width : c.depth) / 2;
  const rz = (horizontal ? c.depth : c.width) / 2;
  const seed = hash01(c.x, c.z);
  const outline = [[0.18, 1], [0.48, 1.02], [0.84, 0.72], [1.13, 0.18],
    [1.02, -0.43], [0.63, -0.98], [0.08, -1.18], [-0.56, -1.02],
    [-1.08, -0.62], [-1.12, 0.02], [-0.85, 0.62], [-0.45, 0.99], [-0.18, 1]];
  const points = outline.map(([u, v], i) => {
    if (i === 0 || i === outline.length - 1) return { x: Math.sign(u!) * (gap / 2 + S(2.5)), z: rz };
    const variation = 1 + Math.sin(i * 2.3 + seed * 10) * 0.12;
    return { x: u! * rx * variation, z: v! * rz * variation };
  });
  const walls: MapObstacle[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!, b = points[i + 1]!;
    const count = Math.max(2, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / S(3)));
    for (let j = 0; j <= count; j++) {
      const u = j / count;
      const x = a.x + (b.x - a.x) * u, z = a.z + (b.z - a.z) * u;
      const back = Math.max(0, 1 - (z / rz + 1) / 2);
      const thickness = S(GAME_CONFIG.map.refugeWalls.thickness) + back * S(9 + seed * 5);
      const height = S(GAME_CONFIG.map.refugeWalls.height) + back * S(12) + Math.sin(i * 1.8 + u + seed * 6) * back * S(3);
      const tangent = z > rz * 0.6 ? Math.sign(x) * Math.max(Math.abs(x), gap / 2 + thickness / 2) : x;
      walls.push({ x: c.x + tx * tangent + fx * z, z: c.z + tz * tangent + fz * z,
        width: thickness, depth: thickness, height });
    }
  }
  return walls;
}

const NATURAL_BLOCKERS = COMPOUNDS.flatMap(compoundWalls);

function nearMountain(x: number, z: number, margin: number): boolean {
  if (!COMPOUNDS.some(c => Math.abs(x - c.x) < c.width + margin && Math.abs(z - c.z) < c.depth + margin)) return false;
  return NATURAL_BLOCKERS.some(o => Math.abs(x - o.x) < o.width / 2 + margin && Math.abs(z - o.z) < o.depth / 2 + margin);
}

export function compoundEntrance(c: Compound): Point {
  return { x: c.x + (c.facing === 'east' ? c.width / 2 : c.facing === 'west' ? -c.width / 2 : 0),
    z: c.z + (c.facing === 'south' ? c.depth / 2 : c.facing === 'north' ? -c.depth / 2 : 0) };
}

// ---------- trilhas ----------
// Cada trilha vai do centro até a entrada de um refúgio, curvando entre as
// árvores. As mesmas curvas guiam a abertura da floresta e o desenho no mapa.
function sampleTrail(door: Point, bend: number, out: Point): Point[] {
  const len = Math.hypot(door.x, door.z) || 1;
  const nx = -door.z / len, nz = door.x / len;
  const cx = door.x * 0.5 + nx * bend;
  const cz = door.z * 0.5 + nz * bend;
  const points: Point[] = [];
  const N = Math.ceil(len / 1.5);
  for (let i = 0; i <= N; i++) {
    const t = i / N, mt = 1 - t;
    points.push({
      x: 3 * mt * mt * t * cx + 3 * mt * t * t * (door.x + out.x * S(18)) + t * t * t * door.x,
      z: 3 * mt * mt * t * cz + 3 * mt * t * t * (door.z + out.z * S(18)) + t * t * t * door.z,
    });
  }
  return points;
}

export const TRAILS: Point[][] = COMPOUNDS.map((c, i) => {
  const door = compoundEntrance(c);
  const bend = ((i % 3) - 1) * 0.14 * Math.hypot(door.x, door.z);
  const angle = FACING_ANGLE[c.facing];
  return sampleTrail(door, bend, { x: Math.cos(angle), z: Math.sin(angle) });
});

// Máscara grossa de ocupação das trilhas: evita varrer todas as curvas por tile.
const TRAIL_CELL = 4;
const TRAIL_N = Math.ceil((WORLD.half * 2) / TRAIL_CELL);
const TRAIL_MASK = new Uint8Array(TRAIL_N * TRAIL_N);
for (const trail of TRAILS) {
  for (let i = 0; i < trail.length - 1; i++) {
    const a = trail[i]!, b = trail[i + 1]!;
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 2));
    for (let s = 0; s <= steps; s++) {
      const x = a.x + (b.x - a.x) * s / steps, z = a.z + (b.z - a.z) * s / steps;
      const cx = Math.floor((x + WORLD.half) / TRAIL_CELL), cz = Math.floor((z + WORLD.half) / TRAIL_CELL);
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const nx = cx + dx, nz = cz + dz;
        if (nx >= 0 && nz >= 0 && nx < TRAIL_N && nz < TRAIL_N) TRAIL_MASK[nz * TRAIL_N + nx] = 1;
      }
    }
  }
}

export function distanceToTrails(x: number, z: number): number {
  const cx = Math.floor((x + WORLD.half) / TRAIL_CELL), cz = Math.floor((z + WORLD.half) / TRAIL_CELL);
  if (cx < 0 || cz < 0 || cx >= TRAIL_N || cz >= TRAIL_N || !TRAIL_MASK[cz * TRAIL_N + cx]) return Infinity;
  let best = Infinity;
  for (const trail of TRAILS) {
    for (let i = 0; i < trail.length - 1; i++) {
      const a = trail[i]!, b = trail[i + 1]!;
      const d = distanceToSegment(x, z, a.x, a.z, b.x, b.z);
      if (d < best) best = d;
    }
  }
  return best;
}

/** Distância exata às trilhas, sem a máscara grossa (usada pelo relevo). */
function trailDistance(x: number, z: number): number {
  let best = Infinity;
  for (const trail of TRAILS) {
    for (let i = 0; i < trail.length - 1; i++) {
      const a = trail[i]!, b = trail[i + 1]!;
      const d = distanceToSegment(x, z, a.x, a.z, b.x, b.z);
      if (d < best) best = d;
    }
  }
  return best;
}

// ---------- relevo rochoso ----------
// Cada formação vira várias pilhas de pedra. São obstáculos reais (colisão) e o
// cliente as desenha com o aglomerado de pedra — o relevo vem das pedras.
const ROCK_OBSTACLES: MapObstacle[] = ROCK_FORMATIONS.flatMap((f, fi) => {
  const out: MapObstacle[] = [];
  for (let i = 0; i < f.count; i++) {
    const a = i * 2.399963 + fi * 1.13;
    const dist = i === 0 ? 0 : 0.22 + 0.6 * hash01(i * 7 + fi, fi * 3 + i);
    const px = f.x + Math.cos(a) * f.rx * dist;
    const pz = f.z + Math.sin(a) * f.rz * dist;
    const center = 1 - Math.min(1, dist);
    const size = (f.rx / 3.4) * (0.55 + center * 0.9) * (0.8 + hash01(i + 5, fi) * 0.5);
    const depth = size * (0.82 + hash01(i + 9, fi) * 0.36);
    const height = f.height * (0.5 + center * 0.7) * (0.8 + hash01(i + 11, fi) * 0.45);
    // Não invade bases, cripta, centro nem trilhas.
    if (COMPOUNDS.some(c => Math.abs(px - c.x) < c.width / 2 + size / 2 + 2 && Math.abs(pz - c.z) < c.depth / 2 + size / 2 + 2)) continue;
    if (Math.hypot(px - CRYPT_POSITION.x, pz - CRYPT_POSITION.z) < S(26)) continue;
    if (Math.hypot(px, pz) < S(18)) continue;
    if (trailDistance(px, pz) < Math.max(size, depth) / 2 + 2) continue;
    out.push({ x: px, z: pz, width: size, depth, height });
  }
  return out;
});

// ---------- pedras em volta das bases ----------
// Colchão de pedras ao redor do terraço de cada base (menos na entrada), para o
// relevo parecer rochoso como nos mapas clássicos de RTS.
const BASE_ROCKS: MapObstacle[] = COMPOUNDS.flatMap((c, ci) => {
  const out: MapObstacle[] = [];
  const entrance = FACING_ANGLE[c.facing];
  const r = Math.max(c.width, c.depth) / 2;
  const N = 12;
  for (let i = 0; i < N; i++) {
    const ang = i * (Math.PI * 2 / N) + hash01(ci * 5 + i, ci * 11) * 0.5;
    const diff = Math.abs(((ang - entrance + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    if (diff < 0.9) continue; // deixa a entrada livre
    const rad = r * (1.5 + hash01(i + 3, ci) * 0.4);
    const x = c.x + Math.cos(ang) * rad;
    const z = c.z + Math.sin(ang) * rad;
    const size = 2.5 + hash01(i + 7, ci) * 3;
    const depth = size * (0.8 + hash01(i + 13, ci) * 0.45);
    const height = 4 + hash01(i + 11, ci) * 5;
    if (trailDistance(x, z) < Math.max(size, depth) / 2 + 2) continue;
    out.push({ x, z, width: size, depth, height });
  }
  return out;
});

// ---------- pontes ----------
function insideRiver(river: (typeof RIVERS)[number], x: number, z: number): boolean {
  const r = river.width / 2;
  for (let i = 0; i < river.points.length - 1; i++) {
    const a = river.points[i]!, b = river.points[i + 1]!;
    if (distanceToSegment(x, z, a.x, a.z, b.x, b.z) < r) return true;
  }
  return false;
}

/** Pontes fixas + vaus automáticos cobrindo só o trecho alagado de cada trilha. */
function computeBridges(): Bridge[] {
  const configured = GAME_CONFIG.map.bridges as Bridge[];
  const out: Bridge[] = configured.map((b) => ({
    x: S(b.x), z: S(b.z), width: S(b.width), depth: S(b.depth),
  }));
  for (const trail of TRAILS) {
    for (const river of RIVERS) {
      // Trechos contínuos em que a trilha está dentro da água deste rio.
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
      const flush = () => {
        if (minX === Infinity) return;
        const margin = S(4);
        out.push({
          x: (minX + maxX) / 2, z: (minZ + maxZ) / 2,
          width: Math.max(S(9), maxX - minX + margin * 2), depth: Math.max(S(9), maxZ - minZ + margin * 2),
        });
        minX = Infinity; maxX = -Infinity; minZ = Infinity; maxZ = -Infinity;
      };
      for (const p of trail) {
        if (!insideRiver(river, p.x, p.z)) { flush(); continue; }
        minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
        minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z);
      }
      flush();
    }
  }
  const merged: Bridge[] = [];
  for (const b of out) if (!merged.some(m => Math.hypot(m.x - b.x, m.z - b.z) < S(9))) merged.push(b);
  return merged;
}
export const BRIDGES: Bridge[] = computeBridges();

/** Vau (ponte) construído sobre a água: por ele as unidades atravessam. */
export function isBridgeAtWorld(x: number, z: number): boolean {
  return BRIDGES.some(b => Math.abs(x - b.x) <= b.width / 2 && Math.abs(z - b.z) <= b.depth / 2);
}

// ---------- floresta ----------
const MEADOWS = GAME_CONFIG.map.meadows.map((m) => ({ ...m, x: S(m.x), z: S(m.z), rx: S(m.rx), rz: S(m.rz) }));

// Duas árvores coletáveis dentro de cada base, nos fundos (longe da entrada),
// simétricas mas com leve variação para parecer natural.
const BASE_TREES = COMPOUNDS.flatMap((c, ci) => {
  const horizontal = c.facing === 'north' || c.facing === 'south';
  const a = FACING_ANGLE[c.facing];
  const fx = Math.cos(a), fz = Math.sin(a);
  const tx = -fz, tz = fx;
  const halfFacing = (horizontal ? c.depth : c.width) / 2;
  const halfTangent = (horizontal ? c.width : c.depth) / 2;
  const out: Array<{ kind: 'wood'; x: number; z: number }> = [];
  for (const side of [-1, 1]) {
    const back = halfFacing * (0.34 + (hash01(ci * 13, side + 5) - 0.5) * 0.12);
    const lateral = halfTangent * 0.44 * side + (hash01(ci * 17 + side, ci * 31) - 0.5) * 2.2;
    out.push({ kind: 'wood', x: c.x - fx * back + tx * lateral, z: c.z - fz * back + tz * lateral });
  }
  return out;
});

function inMeadow(x: number, z: number): boolean {
  return MEADOWS.some(m => ((x - m.x) / m.rx) ** 2 + ((z - m.z) / m.rz) ** 2 < 1);
}

function nearCompound(x: number, z: number, margin: number): boolean {
  return COMPOUNDS.some(c => ((x - c.x) / (c.width / 2 + margin)) ** 2 + ((z - c.z) / (c.depth / 2 + margin)) ** 2 < 1);
}

/** Água pela classificação do tile (a mesma usada pela colisão e pelo terreno). */
function isWaterTile(x: number, z: number): boolean {
  return isWaterAtWorld(tileToWorld(worldToTile(x)), tileToWorld(worldToTile(z)));
}

/** A floresta cobre a ilha (o platô é andável); só clareiras, bases, pedras e trilhas ficam de fora. */
export function isForestAt(x: number, z: number): boolean {
  if (!isLandAt(x, z) || isWaterTile(x, z)) return false;
  const trailClear = Math.max(S(5.5), 4.2);
  if (trailDistance(x, z) < trailClear || isBridgeAtWorld(x, z)) return false;
  if (inMeadow(x, z)) return false;
  if (nearCompound(x, z, S(5))) return false;
  if (nearMountain(x, z, S(2))) return false;
  // As formações rochosas ficam despidas de árvores.
  if (ROCK_FORMATIONS.some(f => ((x - f.x) / (f.rx * 1.08)) ** 2 + ((z - f.z) / (f.rz * 1.08)) ** 2 < 1)) return false;
  if (withinCryptClearance(x, z)) return false;
  if (Math.hypot(x, z) < S(16)) return false;
  return true;
}

// Uma árvore coletável por célula da grade dentro da floresta, com jitter
// determinístico. Toda árvore visível no mapa corresponde a um nó.
export const FOREST_WOOD_NODES = (() => {
  const pts: Array<{ kind: 'wood'; x: number; z: number }> = [];
  const step = GAME_CONFIG.map.resources.forestNodeSpacing;
  const half = WORLD.half - S(4);
  for (let gx = -half; gx <= half; gx += step) {
    for (let gz = -half; gz <= half; gz += step) {
      const jx = (hash01(Math.round(gx * 10), Math.round(gz * 10)) - 0.5) * step * 0.6;
      const jz = (hash01(Math.round(gz * 10), Math.round(gx * 10)) - 0.5) * step * 0.6;
      const x = Math.round((gx + jx) * 2) / 2, z = Math.round((gz + jz) * 2) / 2;
      if (!isForestAt(x, z)) continue;
      if ([-S(3), S(3)].some(dx => [-S(3), S(3)].some(dz => isWaterTile(x + dx, z + dz)))) continue;
      pts.push({ kind: 'wood', x, z });
    }
  }
  return pts;
})();

// Árvores coletáveis: clareira central, interior das bases e floresta.
export const RESOURCE_PLACEMENTS = [
  ...GAME_CONFIG.map.resources.centralWoodX
    .flatMap(x => GAME_CONFIG.map.resources.centralWoodZ.map(z => ({ kind: 'wood' as const, x: S(x), z: S(z) })))
    .filter(p => distanceToTrails(p.x, p.z) >= S(5.5)),
  ...BASE_TREES,
  ...FOREST_WOOD_NODES,
].filter(n => !isWaterTile(n.x, n.z) && !withinCryptClearance(n.x, n.z));

export interface GameMap {
  seed: number;
  tiles: number;
  height: Float32Array;
  water: Uint8Array;
  bridge: Uint8Array;
  forest: Float32Array;
  obstacles: MapObstacle[];
}

/** Materializa o mesmo mapa desenhado à mão para renderização e colisão. */
// A geração custa ~150 ms (varredura de ~17 mil tiles) e é determinística; o
// resultado é memoizado. Cada chamada recebe uma CÓPIA, para que mutações
// (ex.: ferramentas/testes que alteram água ou obstáculos) não vazem entre salas.
const MAP_CACHE = new Map<number, GameMap>();

function cloneMap(map: GameMap): GameMap {
  return {
    seed: map.seed,
    tiles: map.tiles,
    height: map.height.slice(),
    water: map.water.slice(),
    bridge: map.bridge.slice(),
    forest: map.forest.slice(),
    obstacles: map.obstacles.map((o) => ({ ...o })),
  };
}

export function generateMap(_seed = MAP_SEED): GameMap {
  const cached = MAP_CACHE.get(_seed);
  if (cached) return cloneMap(cached);
  const n = WORLD.tiles;
  const height = new Float32Array(n * n);
  const water = new Uint8Array(n * n);
  const bridge = new Uint8Array(n * n);
  const forest = new Float32Array(n * n);
  const FLAT_BLEND = S(6);
  for (let z = 0; z < n; z++) for (let x = 0; x < n; x++) {
    const wx = tileToWorld(x), wz = tileToWorld(z), i = z * n + x;
    const coast = coastDistance(wx, wz);
    const flooded = isWaterAtWorld(wx, wz);
    if (flooded) {
      height[i] = BASE_H * 0.3;
      water[i] = 1;
    } else {
      let h = terrainHeight(wx, wz, coast);
      const flatten = (cx: number, cz: number, radius: number, lift = 0) => {
        const d = Math.hypot(wx - cx, wz - cz);
        if (d >= radius + FLAT_BLEND) return;
        const t = smoothstep((d - radius) / FLAT_BLEND);
        h = h * t + (BASE_H + lift) * (1 - t);
      };
      // Bases humanas: mesas elevadas — paredão em volta e rampa só na entrada.
      for (const c of COMPOUNDS) {
        const r = Math.max(c.width, c.depth) / 2;
        flatten(c.x, c.z, r, HILL_LIFT);
        const a = FACING_ANGLE[c.facing], fx = Math.cos(a), fz = Math.sin(a);
        const tx = -fz, tz = fx;
        const dx = wx - c.x, dz = wz - c.z;
        const d = Math.hypot(dx, dz);
        const fwd = dx * fx + dz * fz, side = dx * tx + dz * tz;
        let width = 1.2;
        if (fwd > 0 && Math.abs(side) < RAMP_HALF && d < r * 1.4 + 14) {
          const trailNear = 1 - smoothstep((trailDistance(wx, wz) - RAMP_HALF) / RAMP_FEATHER);
          width += trailNear * 9;
        }
        h += BASE_RAISE * smoothstep((r * 1.4 + width - d) / width);
      }
      // Vaus no nível do piso: evita que colinas enterrem as pontes.
      for (const b of BRIDGES) flatten(b.x, b.z, Math.max(b.width, b.depth) / 2 + S(6));
      height[i] = h;
      if (isForestAt(wx, wz)) forest[i] = 0.8;
    }
    if (isBridgeAtWorld(wx, wz)) bridge[i] = 1;
  }
  const map: GameMap = { seed: MAP_SEED, tiles: n, height, water, bridge, forest, obstacles: [...NATURAL_BLOCKERS, ...ROCK_OBSTACLES, ...BASE_ROCKS].map(o => ({ ...o })) };
  MAP_CACHE.set(_seed, map);
  return cloneMap(map);
}

export function tileToWorld(tx: number): number {
  return (tx - WORLD.tiles / 2) * WORLD.tileSize + WORLD.tileSize / 2;
}

export function worldToTile(wx: number): number {
  return Math.floor((wx + WORLD.half) / WORLD.tileSize);
}

export function isWaterAt(map: GameMap, wx: number, wz: number): boolean {
  const tx = worldToTile(wx), tz = worldToTile(wz);
  if (tx < 0 || tz < 0 || tx >= map.tiles || tz >= map.tiles) return true;
  const i = tz * map.tiles + tx;
  // Pontes vencem a água: são o único caminho sobre o canal.
  return map.water[i] === 1 && map.bridge[i] !== 1;
}
