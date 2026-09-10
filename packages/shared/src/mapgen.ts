// Mapa fixo: Vale da Vigília. Coordenadas de mundo editáveis, sem seed aleatória.
import { WORLD, GAME_CONFIG } from './constants.js';

export const MAP_SEED = GAME_CONFIG.map.version;
export const HUMAN_SPAWNS = GAME_CONFIG.map.humanSpawns;
export const CRYPT_POSITION = GAME_CONFIG.map.crypt;

export interface MapObstacle { x: number; z: number; width: number; depth: number; height: number }
export interface Compound { name: string; x: number; z: number; width: number; depth: number; facing: 'north' | 'south' | 'east' | 'west' }
export const COMPOUNDS: Compound[] = GAME_CONFIG.map.refuges;

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
const COAST = GAME_CONFIG.map.coast;
const LAKES = GAME_CONFIG.map.lakes;
const RIVERS = GAME_CONFIG.map.rivers;

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
const HIGHLANDS = GAME_CONFIG.map.highlands;

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function terrainHeight(x: number, z: number, coast: number): number {
  let h = BASE_H;
  h += 0.045 * Math.sin(x * 0.019) * Math.cos(z * 0.022);
  h += 0.035 * Math.sin((x + z) * 0.012 + 1.3);
  for (const p of HIGHLANDS) {
    const d = Math.hypot((x - p.x) / p.rx, (z - p.z) / p.rz);
    if (d >= 1) continue;
    // Borda curta: o platô vira uma mesa com encostas íngremes.
    const t = Math.min(1, (1 - d) / 0.45);
    h += p.height * t * t * (3 - 2 * t);
  }
  // Praia: perto do litoral a terra desce suave até a linha d'água.
  const shore = smoothstep((1 - coast) / 0.09);
  h = BASE_H * 0.78 + (h - BASE_H * 0.78) * shore;
  return Math.min(0.9, Math.max(BASE_H * 0.72, h));
}

// ---------- bases naturais ----------
const FACING_ANGLE: Record<Compound['facing'], number> = {
  north: -Math.PI / 2, south: Math.PI / 2, east: 0, west: Math.PI,
};

// Encosta em ferradura: a clareira ocupa uma reentrância no maciço. Segmentos
// sobrepostos garantem colisão contínua, inclusive entre picos de alturas distintas.
export function compoundWalls(c: Compound): MapObstacle[] {
  const gap = GAME_CONFIG.map.refugeWalls.entranceWidth;
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
    if (i === 0 || i === outline.length - 1) return { x: Math.sign(u!) * (gap / 2 + 2.5), z: rz };
    const variation = 1 + Math.sin(i * 2.3 + seed * 10) * 0.12;
    return { x: u! * rx * variation, z: v! * rz * variation };
  });
  const walls: MapObstacle[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!, b = points[i + 1]!;
    const count = Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 3);
    for (let j = 0; j <= count; j++) {
      const u = j / count;
      const x = a.x + (b.x - a.x) * u, z = a.z + (b.z - a.z) * u;
      const back = Math.max(0, 1 - (z / rz + 1) / 2);
      const thickness = GAME_CONFIG.map.refugeWalls.thickness + back * (9 + seed * 5);
      const height = GAME_CONFIG.map.refugeWalls.height + back * 12 + Math.sin(i * 1.8 + u + seed * 6) * back * 3;
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
      x: 3 * mt * mt * t * cx + 3 * mt * t * t * (door.x + out.x * 18) + t * t * t * door.x,
      z: 3 * mt * mt * t * cz + 3 * mt * t * t * (door.z + out.z * 18) + t * t * t * door.z,
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

function densify(points: Point[]): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!, b = points[i + 1]!;
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 1.5));
    for (let s = 0; s < steps; s++) out.push({ x: a.x + (b.x - a.x) * s / steps, z: a.z + (b.z - a.z) * s / steps });
  }
  out.push({ ...points[points.length - 1]! });
  return out;
}

// Chegada da cripta pelo lado norte dos refúgios, fora das encostas.
TRAILS.push(densify([{ x: 0, z: 0 }, { x: -40, z: -27 }, { x: -65, z: -64 },
  { x: -64, z: -119 }, { x: -85, z: -153 }, { x: -121, z: -160 }, { ...CRYPT_POSITION }]));

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
  const out: Bridge[] = [...GAME_CONFIG.map.bridges];
  for (const trail of TRAILS) {
    for (const river of RIVERS) {
      // Trechos contínuos em que a trilha está dentro da água deste rio.
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
      const flush = () => {
        if (minX === Infinity) return;
        const margin = 4;
        out.push({
          x: (minX + maxX) / 2, z: (minZ + maxZ) / 2,
          width: Math.max(9, maxX - minX + margin * 2), depth: Math.max(9, maxZ - minZ + margin * 2),
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
  for (const b of out) if (!merged.some(m => Math.hypot(m.x - b.x, m.z - b.z) < 9)) merged.push(b);
  return merged;
}
export const BRIDGES: Bridge[] = computeBridges();

/** Vau (ponte) construído sobre a água: por ele as unidades atravessam. */
export function isBridgeAtWorld(x: number, z: number): boolean {
  return BRIDGES.some(b => Math.abs(x - b.x) <= b.width / 2 && Math.abs(z - b.z) <= b.depth / 2);
}

// ---------- floresta ----------
const MEADOWS = GAME_CONFIG.map.meadows;

const GOLD_NODES = [
  ...GAME_CONFIG.map.resources.centralGold.map(p => ({ kind: 'gold' as const, ...p })),
  ...COMPOUNDS.map(c => {
    const door = compoundEntrance(c);
    const a = FACING_ANGLE[c.facing], dx = Math.round(Math.cos(a)), dz = Math.round(Math.sin(a));
    return { kind: 'gold' as const, x: door.x + dx * 12 - dz * 8, z: door.z + dz * 12 + dx * 8 };
  }),
];

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

/** A floresta cobre a ilha inteira, exceto clareiras, bases, centro e trilhas. */
export function isForestAt(x: number, z: number): boolean {
  if (!isLandAt(x, z) || isWaterTile(x, z)) return false;
  if (distanceToTrails(x, z) < 5.5 || isBridgeAtWorld(x, z)) return false;
  if (inMeadow(x, z)) return false;
  if (nearCompound(x, z, 5)) return false;
  if (nearMountain(x, z, 2)) return false;
  if (Math.hypot(x - CRYPT_POSITION.x, z - CRYPT_POSITION.z) < 26) return false;
  if (Math.hypot(x, z) < 16) return false;
  return true;
}

// Uma árvore coletável por célula da grade dentro da floresta, com jitter
// determinístico. Toda árvore visível no mapa corresponde a um nó.
export const FOREST_WOOD_NODES = (() => {
  const pts: Array<{ kind: 'wood'; x: number; z: number }> = [];
  const step = GAME_CONFIG.map.resources.forestNodeSpacing;
  const half = WORLD.half - 4;
  for (let gx = -half; gx <= half; gx += step) {
    for (let gz = -half; gz <= half; gz += step) {
      const jx = (hash01(Math.round(gx * 10), Math.round(gz * 10)) - 0.5) * step * 0.6;
      const jz = (hash01(Math.round(gz * 10), Math.round(gx * 10)) - 0.5) * step * 0.6;
      const x = Math.round((gx + jx) * 2) / 2, z = Math.round((gz + jz) * 2) / 2;
      if (!isForestAt(x, z)) continue;
      if ([-3, 3].some(dx => [-3, 3].some(dz => isWaterTile(x + dx, z + dz)))) continue;
      if (GOLD_NODES.some(n => Math.hypot(n.x - x, n.z - z) < 6)) continue;
      pts.push({ kind: 'wood', x, z });
    }
  }
  return pts;
})();

// Minas ao lado das trilhas; interiores livres para construir.
export const RESOURCE_PLACEMENTS = [
  ...GAME_CONFIG.map.resources.centralWoodX.flatMap(x => GAME_CONFIG.map.resources.centralWoodZ.map(z => ({ kind: 'wood' as const, x, z })))
    .filter(p => distanceToTrails(p.x, p.z) >= 5.5),
  ...GOLD_NODES,
  ...FOREST_WOOD_NODES,
].filter(n => !isWaterTile(n.x, n.z));

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
export function generateMap(_seed = MAP_SEED): GameMap {
  const n = WORLD.tiles;
  const height = new Float32Array(n * n);
  const water = new Uint8Array(n * n);
  const bridge = new Uint8Array(n * n);
  const forest = new Float32Array(n * n);
  const FLAT_BLEND = 6;
  for (let z = 0; z < n; z++) for (let x = 0; x < n; x++) {
    const wx = tileToWorld(x), wz = tileToWorld(z), i = z * n + x;
    const coast = coastDistance(wx, wz);
    const flooded = isWaterAtWorld(wx, wz);
    if (flooded) {
      height[i] = BASE_H * 0.3;
      water[i] = 1;
    } else {
      let h = terrainHeight(wx, wz, coast);
      const flatten = (cx: number, cz: number, radius: number) => {
        const d = Math.hypot(wx - cx, wz - cz);
        if (d >= radius + FLAT_BLEND) return;
        const t = smoothstep((d - radius) / FLAT_BLEND);
        h = h * t + BASE_H * (1 - t);
      };
      flatten(CRYPT_POSITION.x, CRYPT_POSITION.z, 17);
      for (const c of COMPOUNDS) flatten(c.x, c.z, Math.max(c.width, c.depth) / 2);
      flatten(0, 0, 14); // clareira central
      height[i] = h;
      if (isForestAt(wx, wz)) forest[i] = 0.8;
    }
    if (isBridgeAtWorld(wx, wz)) bridge[i] = 1;
  }
  return { seed: MAP_SEED, tiles: n, height, water, bridge, forest, obstacles: NATURAL_BLOCKERS.map(o => ({ ...o })) };
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
