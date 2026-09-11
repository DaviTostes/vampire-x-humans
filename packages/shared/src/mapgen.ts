// Geração de mapa: cada preset (`MapPresetConfig`) vira um `MapModel` com todo o
// relevo, colisão, trilhas e recursos já derivados. Servidor e cliente usam o
// mesmo `mapId` para construir exatamente o mesmo mundo.
import {
  WORLD, GAME_CONFIG, MAP_PRESETS, DEFAULT_MAP_ID, MAP_SCALE, INTERACTION, BUILDING_SIZE,
  type MapPresetConfig, type MapPresetId, type RefugeStyle,
} from './constants.js';

export type { MapPresetConfig, MapPresetId, RefugeStyle };

export interface MapObstacle { x: number; z: number; width: number; depth: number; height: number }
export interface Compound {
  name: string; x: number; z: number; width: number; depth: number;
  facing: 'north' | 'south' | 'east' | 'west';
  style: RefugeStyle; variant: number;
  entranceWidth: number; wallThickness: number; wallHeight: number; approach: number;
  /** Tamanho da câmara no labirinto, em células da grade (largura × profundidade). */
  roomWidth?: number; roomDepth?: number;
  /** Posição exata da passagem (usada pelos refúgios-câmara do labirinto). */
  door?: Point;
}
export interface Bridge { x: number; z: number; width: number; depth: number }

// Altura (em unidades de mundo) do piso das pontes, no nível das margens.
export const BRIDGE_Y = 3.35;

type Point = { x: number; z: number };
export type ResourcePlacement = { kind: 'wood' | 'gold'; x: number; z: number };

export const MAP_SEED = GAME_CONFIG.map.version;

function hash01(x: number, z: number): number {
  let h = (Math.imul(x, 374761393) + Math.imul(z, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function distanceToSegment(px: number, pz: number, ax: number, az: number, bx: number, bz: number): number {
  const dx = bx - ax, dz = bz - az;
  const len2 = dx * dx + dz * dz;
  const t = len2 > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / len2)) : 0;
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

const FACING_ANGLE: Record<Compound['facing'], number> = {
  north: -Math.PI / 2, south: Math.PI / 2, east: 0, west: Math.PI,
};

// Contornos possíveis de um refúgio (abertura no lado +z local). `variant`
// escolhe o desenho; os estilos combinam anéis e corredores por cima.
const OUTLINES: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  [[0.18, 1], [0.48, 1.02], [0.84, 0.72], [1.13, 0.18], [1.02, -0.43], [0.63, -0.98],
    [0.08, -1.18], [-0.56, -1.02], [-1.08, -0.62], [-1.12, 0.02], [-0.85, 0.62], [-0.45, 0.99], [-0.18, 1]],
  [[0.30, 0.95], [0.62, 0.82], [0.88, 0.52], [1.0, 0.05], [0.92, -0.42], [0.62, -0.78],
    [0.18, -0.98], [-0.30, -0.95], [-0.70, -0.70], [-0.95, -0.30], [-1.0, 0.15], [-0.82, 0.55], [-0.45, 0.88], [-0.30, 0.95]],
  [[0.22, 1.0], [0.58, 1.0], [0.98, 0.62], [0.74, 0.30], [1.1, 0.02], [0.80, -0.34],
    [1.02, -0.68], [0.5, -1.0], [0.0, -1.12], [-0.5, -1.0], [-0.98, -0.64], [-0.74, -0.28],
    [-1.08, 0.05], [-0.78, 0.35], [-1.0, 0.70], [-0.56, 1.0], [-0.22, 1.0]],
  [[0.10, 0.98], [0.55, 1.08], [0.95, 0.55], [1.05, -0.05], [0.80, -0.55], [0.98, -0.92],
    [0.35, -1.05], [-0.10, -0.92], [-0.62, -1.08], [-1.0, -0.62], [-0.88, -0.10],
    [-1.12, 0.32], [-0.70, 0.68], [-0.50, 1.0], [-0.12, 0.94]],
];

export interface GameMap {
  id: MapPresetId;
  seed: number;
  tiles: number;
  height: Float32Array;
  water: Uint8Array;
  bridge: Uint8Array;
  forest: Float32Array;
  obstacles: MapObstacle[];
}

export interface MapModel {
  id: MapPresetId;
  config: MapPresetConfig;
  compounds: Compound[];
  trails: Point[][];
  humanSpawns: Point[];
  cryptPosition: Point;
  vampireSpawnOffset: Point;
  bridges: Bridge[];
  resourcePlacements: ResourcePlacement[];
  forestWoodNodes: Array<{ kind: 'wood'; x: number; z: number }>;
  obstacles: MapObstacle[];
  compoundEntrance(c: Compound): Point;
  isLandAt(x: number, z: number): boolean;
  isWaterAtWorld(x: number, z: number): boolean;
  isBridgeAtWorld(x: number, z: number): boolean;
  distanceToTrails(x: number, z: number): number;
  isForestAt(x: number, z: number): boolean;
  generateMap(): GameMap;
}

function buildMapModel(id: MapPresetId, cfg: MapPresetConfig): MapModel {
  /** Converte coordenadas de projeto (game.config.ts) para o mundo escalado. */
  const S = (value: number): number => value * cfg.scale;

  const cryptPosition = { x: S(cfg.crypt.x), z: S(cfg.crypt.z) };
  const humanSpawns = cfg.humanSpawns.map((p) => ({ x: S(p.x), z: S(p.z) }));
  const vampireSpawnOffset = { x: S(cfg.vampireSpawnOffset.x), z: S(cfg.vampireSpawnOffset.z) };

  const compounds: Compound[] = cfg.refuges.map((c) => ({
    name: c.name,
    x: Math.round(S(c.x)), z: Math.round(S(c.z)),
    width: S(c.width), depth: S(c.depth),
    facing: c.facing,
    style: c.style ?? 'horseshoe',
    variant: c.variant ?? 0,
    entranceWidth: S(c.entranceWidth ?? cfg.refugeWalls.entranceWidth),
    wallThickness: S(c.wallThickness ?? cfg.refugeWalls.thickness),
    wallHeight: S(c.wallHeight ?? cfg.refugeWalls.height),
    approach: S(c.approach ?? 0),
    roomWidth: c.roomWidth,
    roomDepth: c.roomDepth,
  }));


  // Limite da área jogável do labirinto: até onde vão os refúgios. Fora disso as
  // fileiras de pedra bloqueiam a passagem e não deve haver floresta/árvores.
  const refugeRadius = compounds.reduce(
    (max, c) => Math.max(max, Math.hypot(c.x, c.z) + Math.max(c.width, c.depth) / 2), 0) + S(6);

  // ---- ilha ----
  const COAST = {
    ...cfg.coast,
    ru: S(cfg.coast.ru), rv: S(cfg.coast.rv),
    bays: cfg.coast.bays.map((b) => ({ x: S(b.x), z: S(b.z), r: S(b.r) })),
  };
  const LAKES = cfg.lakes.map((l) => ({ x: S(l.x), z: S(l.z), rx: S(l.rx), rz: S(l.rz) }));
  const RIVERS = cfg.rivers.map((r) => ({
    ...r, width: S(r.width), points: r.points.map((p) => ({ x: S(p.x), z: S(p.z) })),
  }));

  function coastDistance(x: number, z: number): number {
    const c = Math.cos(COAST.rotation), s = Math.sin(COAST.rotation);
    const u = (x * c + z * s) / COAST.ru;
    const v = (-x * s + z * c) / COAST.rv;
    const d = Math.hypot(u, v);
    const ang = Math.atan2(v, u);
    const noise = COAST.noiseA * Math.sin(ang * 3 + 0.7) + COAST.noiseB * Math.sin(ang * 5 - 1.1) + 0.03 * Math.sin(ang * 7 + 2.3);
    return d - noise;
  }

  function isLandAt(x: number, z: number): boolean {
    if (coastDistance(x, z) >= 1) return false;
    for (const bay of COAST.bays) if (Math.hypot(x - bay.x, z - bay.z) < bay.r) return false;
    return true;
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

  function isWaterAtWorld(x: number, z: number): boolean {
    if (!isLandAt(x, z)) return true;
    if (LAKES.some(p => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 < 1)) return true;
    return withinRivers(x, z);
  }

  // ---- bases naturais ----
  function compoundEntrance(c: Compound): Point {
    if (c.door) return c.door;
    return {
      x: c.x + (c.facing === 'east' ? c.width / 2 : c.facing === 'west' ? -c.width / 2 : 0),
      z: c.z + (c.facing === 'south' ? c.depth / 2 : c.facing === 'north' ? -c.depth / 2 : 0),
    };
  }

  /**
   * Encosta em ferradura: a clareira ocupa uma reentrância no maciço. Segmentos
   * sobrepostos garantem colisão contínua. `ringScale` encolhe o anel (anéis
   * internos) e `rot` gira o desenho local (espirais).
   */
  function compoundWalls(c: Compound): MapObstacle[] {
    const facing = FACING_ANGLE[c.facing];
    const fx = Math.cos(facing), fz = Math.sin(facing);
    const tx = -fz, tz = fx;
    const horizontal = c.facing === 'north' || c.facing === 'south';
    const seed = hash01(c.x, c.z);
    const outline = OUTLINES[((c.variant % OUTLINES.length) + OUTLINES.length) % OUTLINES.length]!;
    const walls: MapObstacle[] = [];
    // Vão calibrado para (a) a unidade passar antes de fechar e (b) um único
    // Muro (tamanho 3) lacrar por completo — vale em qualquer escala de mapa.
    const unit = INTERACTION.unitRadius;
    const openX = c.wallThickness / 2 + BUILDING_SIZE.wall / 4 + unit * 2;

    const addRing = (ringScale: number, rot: number) => {
      const rx = (horizontal ? c.width : c.depth) / 2 * ringScale;
      const rz = (horizontal ? c.depth : c.width) / 2 * ringScale;
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const rotate = (px: number, pz: number): [number, number] => [px * cr - pz * sr, px * sr + pz * cr];
      const points = outline.map(([u, v], i) => {
        if (i === 0 || i === outline.length - 1) return rotate(Math.sign(u!) * openX, rz);
        const variation = 1 + Math.sin(i * 2.3 + seed * 10) * 0.12;
        return rotate(u! * rx * variation, v! * rz * variation);
      });
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i]!, b = points[i + 1]!;
        const count = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / S(3)));
        for (let j = 0; j <= count; j++) {
          const t = j / count;
          const lx = a[0] + (b[0] - a[0]) * t, lz = a[1] + (b[1] - a[1]) * t;
          const back = Math.max(0, 1 - (lz / rz + 1) / 2);
          const thickness = c.wallThickness + back * S(9 + seed * 5);
          const height = c.wallHeight + back * S(12) + Math.sin(i * 1.8 + t + seed * 6) * back * S(3);
          const tangent = lz > rz * 0.6 ? Math.sign(lx) * Math.max(Math.abs(lx), openX) : lx;
          walls.push({
            x: c.x + tx * tangent + fx * lz,
            z: c.z + tz * tangent + fz * lz,
            width: thickness, depth: thickness, height,
          });
        }
      }
    };

    // Uma única muralha por refúgio (nada de anel interno). O desenho vem do
    // contorno escolhido por `variant` + parâmetros de tamanho/entrada.
    addRing(1, 0);

    const halfZ = (horizontal ? c.depth : c.width) / 2;

    // Corredor de aproximação: duas paredes paralelas saindo da entrada.
    if (c.approach > 0) {
      const steps = Math.max(2, Math.ceil(c.approach / S(3)));
      for (const side of [-1, 1]) {
        for (let j = 0; j <= steps; j++) {
          const lz = halfZ + c.approach * (j / steps);
          const lx = side * openX;
          walls.push({
            x: c.x + tx * lx + fx * lz,
            z: c.z + tz * lx + fz * lz,
            width: c.wallThickness, depth: c.wallThickness, height: c.wallHeight,
          });
        }
      }
    }

    return walls;
  }

  // No labirinto cada refúgio é um beco escavado na própria grade (paredes do
  // buildMaze); no clássico, cada um tem sua muralha em ferradura.
  const NATURAL_BLOCKERS: MapObstacle[] = cfg.maze ? [] : compounds.flatMap(compoundWalls);

  // Anéis de labirinto: coroas de pedra com uma abertura angular.
  const MAZE_RINGS = (cfg.mazeRings ?? []).map((r) => ({
    radius: S(r.radius), gapAngle: r.gapAngle, gapWidth: S(r.gapWidth),
    thickness: S(r.thickness ?? 6), height: S(r.height ?? 6), jitter: S(r.jitter ?? 0),
  }));

  function mazeRingWalls(): MapObstacle[] {
    const out: MapObstacle[] = [];
    for (const [ri, ring] of MAZE_RINGS.entries()) {
      const gapAngle = ring.gapWidth / ring.radius;
      const steps = Math.max(16, Math.ceil((Math.PI * 2 * ring.radius) / S(4)));
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const da = Math.abs(((a - ring.gapAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        if (da < gapAngle / 2) continue;
        const rr = ring.radius + (ring.jitter ? (hash01(i, ri * 31 + 7) - 0.5) * 2 * ring.jitter : 0);
        out.push({ x: Math.cos(a) * rr, z: Math.sin(a) * rr, width: ring.thickness, depth: ring.thickness, height: ring.height });
      }
    }
    return out;
  }
  if (MAZE_RINGS.length) NATURAL_BLOCKERS.push(...mazeRingWalls());

  const TAU = Math.PI * 2;
  /** Faixa ocupada pelos anéis (para manter a floresta longe deles). */
  function nearMazeRing(x: number, z: number, margin: number): boolean {
    if (!MAZE_RINGS.length) return false;
    const d = Math.hypot(x, z);
    return MAZE_RINGS.some(r => Math.abs(d - r.radius) < r.thickness / 2 + margin);
  }

  /** Um obstáculo aqui fecharia a abertura de algum anel? */
  function blocksMazeGap(x: number, z: number, size: number): boolean {
    const d = Math.hypot(x, z);
    for (const r of MAZE_RINGS) {
      const band = r.thickness / 2 + size + 2;
      if (Math.abs(d - r.radius) > band) continue;
      const ang = Math.atan2(z, x);
      const da = Math.abs(((ang - r.gapAngle + Math.PI * 3) % TAU) - Math.PI);
      if (da < r.gapWidth / r.radius / 2 + (size + r.thickness) / Math.max(1, d)) return true;
    }
    return false;
  }

  function nearMountain(x: number, z: number, margin: number): boolean {
    if (!compounds.some(c => Math.abs(x - c.x) < c.width + margin && Math.abs(z - c.z) < c.depth + margin)) return false;
    return NATURAL_BLOCKERS.some(o => Math.abs(x - o.x) < o.width / 2 + margin && Math.abs(z - o.z) < o.depth / 2 + margin);
  }

  // ---- trilhas ----
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

  // ---- labirinto procedural ----
  // Grade de corredores gerada por backtracker determinístico + braiding
  // (abre parte dos becos sem saída para criar loops). Cada parede vira uma
  // sequência de pilhas de rocha; cada ligação aberta vira um trecho de
  // "trilha" (chão de pedra e ausência de árvores).
  const trails: Point[][] = [];
  // Caixas (mundo) das câmaras dos refúgios: mantidas quase sem árvores.
  const chamberBoxes: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }> = [];

  function buildMaze(): MapObstacle[] {
    const m = cfg.maze!;
    const cell = S(m.cell);
    const wallT = S(m.thickness);
    const wallH = S(m.height);
    const halfN = Math.max(3, Math.floor(S(m.radius) / cell + 0.5));
    const inRegion = (i: number, j: number) => Math.abs(i) <= halfN && Math.abs(j) <= halfN;
    const K = (i: number, j: number) => (i + 500) * 1000 + (j + 500);
    const Ki = (c: number) => Math.floor(c / 1000) - 500;
    const Kj = (c: number) => (c % 1000) - 500;
    let rng = (m.seed >>> 0) || 1;
    const rnd = () => { rng = (Math.imul(rng, 1664525) + 1013904223) >>> 0; return rng / 4294967296; };
    const dirs: Array<[number, number]> = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const openKey = (a: number, b: number) => (a < b ? a * 1e7 + b : b * 1e7 + a);

    // 1) Câmaras-beco: blocos retangulares (2..3 células por lado), um por
    //    refúgio, espalhados e sem sobreposição. Cada câmara terá UMA única
    //    passagem.
    interface Room {
      cells: number[]; minI: number; maxI: number; minJ: number; maxJ: number;
      entrance: [number, number, number, number] | null; facing: Compound['facing'];
    }
    const rooms: Room[] = [];
    const roomCells = new Set<number>();
    const centerClear = Math.max(2, Math.ceil(S(m.centerRadius) / cell));
    const roomCellKeys = (i: number, j: number, rw: number, rd: number): number[] => {
      const out: number[] = [];
      for (let dx = 0; dx < rw; dx++) for (let dy = 0; dy < rd; dy++) out.push(K(i + dx, j + dy));
      return out;
    };
    for (const c of compounds) {
      const ai0 = Math.round(c.x / cell);
      const aj0 = Math.round(c.z / cell);
      // Cada refúgio tem uma câmara de tamanho próprio (em células), variando
      // largura e comprimento. Mínimo 2×2, sempre dentro da grade.
      const rw = Math.max(2, Math.min(halfN, Math.round(c.roomWidth ?? 2)));
      const rd = Math.max(2, Math.min(halfN, Math.round(c.roomDepth ?? 2)));
      let placed: { ai: number; aj: number; cells: number[] } | null = null;
      for (let r = 0; r <= 5 && !placed; r++) {
        for (let da = -r; da <= r && !placed; da++) for (let db = -r; db <= r; db++) {
          if (Math.max(Math.abs(da), Math.abs(db)) !== r) continue;
          const i = ai0 + da, j = aj0 + db;
          let cheb = 0;
          for (let dx = 0; dx < rw; dx++) for (let dy = 0; dy < rd; dy++) {
            cheb = Math.max(cheb, Math.abs(i + dx), Math.abs(j + dy));
          }
          if (cheb > halfN - 1 || cheb <= centerClear) continue;
          const cells = roomCellKeys(i, j, rw, rd);
          if (cells.some(x => roomCells.has(x))) continue;
          for (const x of cells) roomCells.add(x);
          placed = { ai: i, aj: j, cells };
          break;
        }
      }
      if (!placed) continue;
      rooms.push({
        cells: placed.cells, minI: placed.ai, maxI: placed.ai + rw - 1, minJ: placed.aj, maxJ: placed.aj + rd - 1,
        entrance: null, facing: c.facing,
      });
    }

    // 2) Labirinto (backtracker determinístico) somente nas células que não são
    //    câmara. As câmaras entram depois, como becos.
    const visited = new Set<number>();
    const open = new Set<number>();
    const start = K(0, 0);
    visited.add(start);
    const stack: Array<[number, number]> = [[0, 0]];
    while (stack.length) {
      const [i, j] = stack[stack.length - 1]!;
      const nb: Array<[number, number]> = [];
      for (const [di, dj] of dirs) {
        const ni = i + di, nj = j + dj;
        if (!inRegion(ni, nj) || roomCells.has(K(ni, nj)) || visited.has(K(ni, nj))) continue;
        nb.push([ni, nj]);
      }
      if (!nb.length) { stack.pop(); continue; }
      const [ni, nj] = nb[Math.floor(rnd() * nb.length)]!;
      visited.add(K(ni, nj));
      open.add(openKey(K(i, j), K(ni, nj)));
      stack.push([ni, nj]);
    }
    // Braiding: abre parte dos becos.
    const degree = new Map<number, number>();
    for (const e of open) {
      const a = Math.floor(e / 1e7), b = e % 1e7;
      degree.set(a, (degree.get(a) ?? 0) + 1);
      degree.set(b, (degree.get(b) ?? 0) + 1);
    }
    for (const c of visited) {
      if ((degree.get(c) ?? 0) !== 1 || rnd() > m.braid) continue;
      const i = Ki(c), j = Kj(c);
      const cand: Array<[number, number]> = [];
      for (const [di, dj] of dirs) {
        const ni = i + di, nj = j + dj, nk = K(ni, nj);
        if (inRegion(ni, nj) && !roomCells.has(nk) && !open.has(openKey(c, nk))) cand.push([ni, nj]);
      }
      if (!cand.length) continue;
      const [ni, nj] = cand[Math.floor(rnd() * cand.length)]!;
      open.add(openKey(c, K(ni, nj)));
      degree.set(c, 2);
      degree.set(K(ni, nj), (degree.get(K(ni, nj)) ?? 0) + 1);
    }

    // 3) Liga cada câmara à grade com UMA passagem (a entrada do Muro).
    const entranceEdges = new Set<number>();
    for (const room of rooms) {
      const options: Array<[number, number, number, number]> = [];
      for (const cc of room.cells) {
        const i = Ki(cc), j = Kj(cc);
        for (const [di, dj] of dirs) {
          if (visited.has(K(i + di, j + dj))) options.push([i, j, di, dj]);
        }
      }
      if (!options.length) continue;
      const prefer = room.facing === 'west' ? [-1, 0] : room.facing === 'east' ? [1, 0] : room.facing === 'north' ? [0, -1] : [0, 1];
      options.sort((a, b) => {
        const da = a[2] === prefer[0] && a[3] === prefer[1] ? 0 : 1;
        const db = b[2] === prefer[0] && b[3] === prefer[1] ? 0 : 1;
        return da - db;
      });
      const e = options[Math.floor(rnd() * Math.min(2, options.length))]!;
      const edge = openKey(K(e[0], e[1]), K(e[0] + e[2], e[1] + e[3]));
      open.add(edge);
      entranceEdges.add(edge);
      room.entrance = e;
      room.facing = e[2] === 1 ? 'east' : e[2] === -1 ? 'west' : e[3] === 1 ? 'south' : 'north';
    }

    // 4) Posiciona os "compounds" (HUD/minimapa/limpeza) sobre as câmaras.
    for (let ri = 0; ri < compounds.length && ri < rooms.length; ri++) {
      const c = compounds[ri]!;
      const room = rooms[ri]!;
      c.x = (room.minI + room.maxI + 1) / 2 * cell;
      c.z = (room.minJ + room.maxJ + 1) / 2 * cell;
      c.width = (room.maxI - room.minI + 1) * cell;
      c.depth = (room.maxJ - room.minJ + 1) * cell;
      c.facing = room.facing;
      if (room.entrance) {
        const [i, j, di, dj] = room.entrance;
        c.door = { x: (i + i + di) / 2 * cell, z: (j + j + dj) / 2 * cell };
      }
      chamberBoxes.push({
        minX: (room.minI - 0.5) * cell, maxX: (room.maxI + 0.5) * cell,
        minZ: (room.minJ - 0.5) * cell, maxZ: (room.maxJ + 0.5) * cell,
      });
    }

    // 5) Paredes e trilhas.
    const walls: MapObstacle[] = [];
    const addWall = (i: number, j: number, di: number, dj: number) => {
      const vertical = di !== 0;
      const w = vertical ? wallT : cell;
      const d = vertical ? cell : wallT;
      const x = vertical ? i * cell + di * cell / 2 : i * cell;
      const z = vertical ? j * cell : j * cell + dj * cell / 2;
      const chunks = Math.max(1, Math.round(cell / S(4.5)));
      for (let k = 0; k < chunks; k++) {
        const t = (k + 0.5) / chunks;
        const px = vertical ? x : x - w / 2 + w * t;
        const pz = vertical ? z - d / 2 + d * t : z;
        if (Math.hypot(px - cryptPosition.x, pz - cryptPosition.z) < S(m.centerRadius)) continue;
        const jitter = (hash01(Math.round(px * 2), Math.round(pz * 2)) - 0.5) * S(0.7);
        walls.push({
          x: px + (vertical ? jitter : 0),
          z: pz + (vertical ? 0 : jitter),
          width: vertical ? w : cell / chunks + S(1.4),
          depth: vertical ? cell / chunks + S(1.4) : d,
          height: wallH * (0.85 + hash01(Math.round(px), Math.round(pz)) * 0.35),
        });
      }
    };
    // Grade: paredes/trilhas das células visitadas.
    for (const c of visited) {
      const i = Ki(c), j = Kj(c);
      for (const [di, dj] of dirs) {
        const nk = K(i + di, j + dj);
        if (roomCells.has(nk)) continue; // perímetro da câmara é tratado depois
        if (!visited.has(nk)) { addWall(i, j, di, dj); continue; }
        if (di < 0 || dj < 0) continue;
        if (open.has(openKey(c, nk))) trails.push([{ x: i * cell, z: j * cell }, { x: (i + di) * cell, z: (j + dj) * cell }]);
        else addWall(i, j, di, dj);
      }
    }
    // Câmaras: perímetro fechado (exceto a entrada) + interior aberto.
    for (const room of rooms) {
      const cellSet = new Set(room.cells);
      for (const cc of room.cells) {
        const i = Ki(cc), j = Kj(cc);
        for (const [di, dj] of dirs) {
          const nk = K(i + di, j + dj);
          if (cellSet.has(nk)) {
            open.add(openKey(cc, nk));
            if (di > 0 || dj > 0) trails.push([{ x: i * cell, z: j * cell }, { x: (i + di) * cell, z: (j + dj) * cell }]);
            continue;
          }
          const edge = openKey(cc, nk);
          if (entranceEdges.has(edge)) continue;
          addWall(i, j, di, dj);
        }
      }
    }
    // Trila de pedra entrando pela passagem.
    for (const room of rooms) {
      if (!room.entrance) continue;
      const [i, j, di, dj] = room.entrance;
      trails.push([{ x: i * cell, z: j * cell }, { x: (i + di) * cell, z: (j + dj) * cell }]);
    }
    // Vão do muro: paredes dos lados, abertura central.
    const unit = INTERACTION.unitRadius;
    const openX = BUILDING_SIZE.wall / 2 + unit + S(0.2);
    for (const room of rooms) {
      if (!room.entrance) continue;
      const [i, j, di, dj] = room.entrance;
      const vertical = di !== 0;
      const door = { x: (i + i + di) / 2 * cell, z: (j + j + dj) / 2 * cell };
      const span = cell / 2 - openX;
      const chunks = Math.max(1, Math.round(span / S(4)));
      const chunkLen = span / chunks;
      for (let s = 0; s < chunks; s++) {
        const center = openX + chunkLen * (s + 0.5);
        for (const sgn of [1, -1]) {
          const off = center * sgn;
          walls.push({
            x: door.x + (vertical ? 0 : off),
            z: door.z + (vertical ? off : 0),
            width: vertical ? wallT : chunkLen,
            depth: vertical ? chunkLen : wallT,
            height: wallH,
          });
        }
      }
    }
    return walls;
  }

  if (cfg.maze) {
    NATURAL_BLOCKERS.push(...buildMaze());
  } else {
    compounds.forEach((c, i) => {
      const door = compoundEntrance(c);
      const bend = ((i % 3) - 1) * 0.14 * Math.hypot(door.x, door.z);
      const angle = FACING_ANGLE[c.facing];
      trails.push(sampleTrail(door, bend, { x: Math.cos(angle), z: Math.sin(angle) }));
    });
  }

  // ---- índice espacial de trilhas ----
  // Consultas de distância (floresta, chão de pedra e minimapa) olham só as
  // células próximas, em vez de varrer todos os segmentos.
  const TRAIL_SEG_CELL = 16;
  const SEG_N = Math.max(1, Math.ceil((WORLD.half * 2) / TRAIL_SEG_CELL) + 1);
  const SEG_RADIUS = 20;
  const segData: number[] = [];
  const segIndex = new Map<number, number[]>();
  for (const trail of trails) for (let i = 0; i < trail.length - 1; i++) {
    const a = trail[i]!, b = trail[i + 1]!;
    const idx = segData.length / 4;
    segData.push(a.x, a.z, b.x, b.z);
    const minX = Math.min(a.x, b.x) - SEG_RADIUS, maxX = Math.max(a.x, b.x) + SEG_RADIUS;
    const minZ = Math.min(a.z, b.z) - SEG_RADIUS, maxZ = Math.max(a.z, b.z) + SEG_RADIUS;
    const cx0 = Math.max(0, Math.floor((minX + WORLD.half) / TRAIL_SEG_CELL));
    const cx1 = Math.min(SEG_N - 1, Math.floor((maxX + WORLD.half) / TRAIL_SEG_CELL));
    const cz0 = Math.max(0, Math.floor((minZ + WORLD.half) / TRAIL_SEG_CELL));
    const cz1 = Math.min(SEG_N - 1, Math.floor((maxZ + WORLD.half) / TRAIL_SEG_CELL));
    for (let cz = cz0; cz <= cz1; cz++) for (let cx = cx0; cx <= cx1; cx++) {
      const key = cz * SEG_N + cx;
      const list = segIndex.get(key);
      if (list) list.push(idx); else segIndex.set(key, [idx]);
    }
  }

  function distanceToTrails(x: number, z: number): number {
    const cx = Math.floor((x + WORLD.half) / TRAIL_SEG_CELL), cz = Math.floor((z + WORLD.half) / TRAIL_SEG_CELL);
    if (cx < 0 || cz < 0 || cx >= SEG_N || cz >= SEG_N) return Infinity;
    const list = segIndex.get(cz * SEG_N + cx);
    if (!list) return Infinity;
    let best = Infinity;
    for (const idx of list) {
      const o = idx * 4;
      const d = distanceToSegment(x, z, segData[o]!, segData[o + 1]!, segData[o + 2]!, segData[o + 3]!);
      if (d < best) best = d;
    }
    return best;
  }
  const exactTrailDistance = distanceToTrails;

  /** A praça central fica sem árvores; as paredes do labirinto têm floresta. */
  function inOpenClearing(x: number, z: number): boolean {
    if (!cfg.maze) return false;
    return Math.hypot(x - cryptPosition.x, z - cryptPosition.z) < S(cfg.maze.centerRadius);
  }

  // ---- relevo rochoso ----
  const ROCK_FORMATIONS = cfg.rockFormations.map((f) => ({ ...f, x: S(f.x), z: S(f.z), rx: S(f.rx), rz: S(f.rz) }));
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
      if (compounds.some(c => Math.abs(px - c.x) < c.width / 2 + size / 2 + 2 && Math.abs(pz - c.z) < c.depth / 2 + size / 2 + 2)) continue;
      if (Math.hypot(px - cryptPosition.x, pz - cryptPosition.z) < S(26)) continue;
      if (Math.hypot(px, pz) < S(18)) continue;
      if (exactTrailDistance(px, pz) < Math.max(size, depth) / 2 + 2) continue;
      if (blocksMazeGap(px, pz, Math.max(size, depth) / 2)) continue;
      out.push({ x: px, z: pz, width: size, depth, height });
    }
    return out;
  });

  // ---- pedras em volta das bases ----
  const baseRocksScale = cfg.baseRocksScale ?? 1.5;
  const BASE_ROCKS: MapObstacle[] = baseRocksScale <= 0 ? [] : compounds.flatMap((c, ci) => {
    const out: MapObstacle[] = [];
    const entrance = FACING_ANGLE[c.facing];
    const r = Math.max(c.width, c.depth) / 2;
    const N = 12;
    for (let i = 0; i < N; i++) {
      const ang = i * (Math.PI * 2 / N) + hash01(ci * 5 + i, ci * 11) * 0.5;
      const diff = Math.abs(((ang - entrance + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      if (diff < 0.9) continue; // deixa a entrada livre
      const rad = r * (baseRocksScale + hash01(i + 3, ci) * 0.4);
      const x = c.x + Math.cos(ang) * rad;
      const z = c.z + Math.sin(ang) * rad;
      const size = 2.5 + hash01(i + 7, ci) * 3;
      const depth = size * (0.8 + hash01(i + 13, ci) * 0.45);
      const height = 4 + hash01(i + 11, ci) * 5;
      if (exactTrailDistance(x, z) < Math.max(size, depth) / 2 + 2) continue;
      if (blocksMazeGap(x, z, Math.max(size, depth) / 2)) continue;
      out.push({ x, z, width: size, depth, height });
    }
    return out;
  });

  // ---- pontes ----
  function insideRiver(river: (typeof RIVERS)[number], x: number, z: number): boolean {
    const r = river.width / 2;
    for (let i = 0; i < river.points.length - 1; i++) {
      const a = river.points[i]!, b = river.points[i + 1]!;
      if (distanceToSegment(x, z, a.x, a.z, b.x, b.z) < r) return true;
    }
    return false;
  }

  const bridges: Bridge[] = (() => {
    const out: Bridge[] = cfg.bridges.map((b) => ({ x: S(b.x), z: S(b.z), width: S(b.width), depth: S(b.depth) }));
    for (const trail of trails) {
      for (const river of RIVERS) {
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
  })();

  function isBridgeAtWorld(x: number, z: number): boolean {
    return bridges.some(b => Math.abs(x - b.x) <= b.width / 2 && Math.abs(z - b.z) <= b.depth / 2);
  }

  // ---- floresta ----
  const MEADOWS = cfg.meadows.map((m) => ({ ...m, x: S(m.x), z: S(m.z), rx: S(m.rx), rz: S(m.rz) }));

  // Árvores dentro das bases do labirinto: 3 por refúgio, em posições
  // pseudoaleatórias na metade dos fundos (longe da entrada e do centro), para
  // dar madeira sem atrapalhar a passagem.
  const BASE_TREES = cfg.maze ? (() => {
    const cell = S(cfg.maze.cell);
    const out: Array<{ kind: 'wood'; x: number; z: number }> = [];
    compounds.forEach((c, ci) => {
      const cx = c.x - cell / 2, cz = c.z - cell / 2;
      const horizontal = c.facing === 'north' || c.facing === 'south';
      const halfF = (horizontal ? c.depth : c.width) / 2;
      const halfT = (horizontal ? c.width : c.depth) / 2;
      const a = FACING_ANGLE[c.facing];
      const fx = Math.cos(a), fz = Math.sin(a);
      const tx = -fz, tz = fx;
      const margin = S(4);
      const placed: Array<{ x: number; z: number }> = [];
      for (let k = 0; k < 3; k++) {
        let x = cx, z = cz;
        for (let attempt = 0; attempt < 10; attempt++) {
          const rf = hash01(ci * 17 + k * 3 + attempt * 53 + 1, ci * 5 + k * 7 + attempt * 11 + 2);
          const rs = hash01(ci * 11 + k * 5 + attempt * 29 + 3, ci * 13 + k * 2 + attempt * 17 + 4);
          const fwd = -(margin + rf * Math.max(0, halfF - margin * 2));
          const side = (rs - 0.5) * 2 * Math.max(0, halfT - margin);
          x = cx + fx * fwd + tx * side;
          z = cz + fz * fwd + tz * side;
          if (placed.every(p => Math.hypot(p.x - x, p.z - z) > S(6))) break;
        }
        placed.push({ x, z });
        out.push({ kind: 'wood', x, z });
      }
    });
    return out;
  })() : compounds.flatMap((c, ci) => {
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
    return compounds.some(c => ((x - c.x) / (c.width / 2 + margin)) ** 2 + ((z - c.z) / (c.depth / 2 + margin)) ** 2 < 1);
  }

  function isWaterTile(x: number, z: number): boolean {
    return isWaterAtWorld(tileToWorld(worldToTile(x)), tileToWorld(worldToTile(z)));
  }

  // Folga em volta das câmaras dos refúgios: mantém as paredes de pedra dos
  // refúgios livres de árvores mesmo com a floresta cobrindo o resto do
  // labirinto. Cobre meia espessura da parede + o raio de um tronco.
  const CHAMBER_TREE_MARGIN = S(6);

  function isForestAt(x: number, z: number): boolean {
    if (!isLandAt(x, z) || isWaterTile(x, z)) return false;
    if (isBridgeAtWorld(x, z)) return false;
    // No labirinto a floresta cobre as paredes de pedra e o entorno; só os
    // corredores (trilhas), as câmaras dos refúgios e a praça central ficam
    // abertos.
    if (cfg.maze) {
      for (const b of chamberBoxes) {
        if (x > b.minX - CHAMBER_TREE_MARGIN && x < b.maxX + CHAMBER_TREE_MARGIN &&
            z > b.minZ - CHAMBER_TREE_MARGIN && z < b.maxZ + CHAMBER_TREE_MARGIN) return false;
      }
      if (exactTrailDistance(x, z) < S(cfg.maze.cell) * 0.28) return false;
      // Fora da área jogável do labirinto a floresta é só decorativa: raleia
      // bastante os cantos distantes (inacessíveis) para não pesar no render.
      const rr = Math.hypot(x, z);
      if (rr > S(200)) {
        const keep = rr > S(270) ? 0.12 : 0.4;
        if (hash01(Math.round(x * 3), Math.round(z * 3)) > keep) return false;
      }
      return !withinCryptClearance(x, z);
    }
    const trailClear = Math.max(S(5.5), 4.2);
    if (exactTrailDistance(x, z) < trailClear) return false;
    if (inOpenClearing(x, z)) return false;
    if (inMeadow(x, z)) return false;
    if (nearCompound(x, z, S(5))) return false;
    if (nearMountain(x, z, S(2))) return false;
    if (nearMazeRing(x, z, S(4))) return false;
    if (ROCK_FORMATIONS.some(f => ((x - f.x) / (f.rx * 1.08)) ** 2 + ((z - f.z) / (f.rz * 1.08)) ** 2 < 1)) return false;
    if (withinCryptClearance(x, z)) return false;
    if (Math.hypot(x, z) < S(16)) return false;
    return true;
  }

  function withinCryptClearance(x: number, z: number): boolean {
    return Math.hypot(x - cryptPosition.x, z - cryptPosition.z) < S(44);
  }

  const forestWoodNodes = (() => {
    const pts: Array<{ kind: 'wood'; x: number; z: number }> = [];
    const step = cfg.resources.forestNodeSpacing;
    const half = WORLD.half - S(4);
    for (let gx = -half; gx <= half; gx += step) {
      for (let gz = -half; gz <= half; gz += step) {
        const jx = (hash01(Math.round(gx * 10), Math.round(gz * 10)) - 0.5) * step * 0.6;
        const jz = (hash01(Math.round(gz * 10), Math.round(gx * 10)) - 0.5) * step * 0.6;
        const x = Math.round((gx + jx) * 2) / 2, z = Math.round((gz + jz) * 2) / 2;
        if (!isForestAt(x, z)) continue;
        // Labirinto: nada de floresta fora da área jogável (atrás das pedras).
        if (cfg.maze && Math.hypot(x - cryptPosition.x, z - cryptPosition.z) > refugeRadius) continue;
        if ([-S(3), S(3)].some(dx => [-S(3), S(3)].some(dz => isWaterTile(x + dx, z + dz)))) continue;
        pts.push({ kind: 'wood', x, z });
      }
    }
    return pts;
  })();

  const resourcePlacements: ResourcePlacement[] = [
    ...cfg.resources.centralWoodX
      .flatMap(x => cfg.resources.centralWoodZ.map(z => ({ kind: 'wood' as const, x: S(x), z: S(z) })))
      .filter(p => exactTrailDistance(p.x, p.z) >= 1.5),
    ...BASE_TREES,
    ...forestWoodNodes,
  ].filter(n => !isWaterTile(n.x, n.z) && !withinCryptClearance(n.x, n.z));

  // ---- relevo ----
  const BASE_H = 0.24;
  const LOW_RADIUS = 34;
  const CLIFF_WIDTH = 2.6;
  const RAMP_WIDTH = 11;
  const RAMP_HALF = 7;
  const RAMP_FEATHER = 2.5;
  const HILL_LIFT = 0.20;
  const BASE_RAISE = 0.13;
  // Platôs dos refúgios no labirinto: topo plano, estendido sob os muros
  // (`REFUGE_PAD`) para as pedras assentarem em piso reto. A queda fica logo
  // fora do muro e só a faixa do portão tem rampa; os caminhos laterais ficam
  // no chão natural.
  const REFUGE_LIFT = 0.45;
  const REFUGE_PAD = S(3.4);
  const REFUGE_EDGE = S(1.2);
  const REFUGE_RAMP_LEN = S(9);
  const REFUGE_RAMP_HALF = S(5);

  function terrainHeight(x: number, z: number, coast: number): number {
    let h = BASE_H;
    h += 0.018 * Math.sin(x * 0.021 + 0.5) * Math.cos(z * 0.024 - 0.7);
    h += 0.014 * Math.sin((x * 0.9 + z * 0.6) * 0.017 + 1.3);
    const r = Math.hypot(x, z);
    const steep = smoothstep((r - LOW_RADIUS) / CLIFF_WIDTH);
    const gentle = smoothstep((r - LOW_RADIUS) / RAMP_WIDTH);
    const dTrail = exactTrailDistance(x, z);
    const rampness = 1 - smoothstep((dTrail - RAMP_HALF) / RAMP_FEATHER);
    h += HILL_LIFT * (steep * (1 - rampness) + gentle * rampness);
    const shore = smoothstep((1 - coast) / 0.09);
    h = BASE_H * 0.78 + (h - BASE_H * 0.78) * shore;
    return Math.min(0.72, Math.max(BASE_H * 0.72, h));
  }

  const obstacles: MapObstacle[] = [...NATURAL_BLOCKERS, ...ROCK_OBSTACLES, ...BASE_ROCKS].map(o => ({ ...o }));

  let cachedMap: GameMap | null = null;

  function generateMap(): GameMap {
    if (cachedMap) return cloneMap(cachedMap);
    const n = WORLD.tiles;
    const height = new Float32Array(n * n);
    const water = new Uint8Array(n * n);
    const bridge = new Uint8Array(n * n);
    const forest = new Float32Array(n * n);
    const FLAT_BLEND = S(6);
    const mazeCell = cfg.maze ? S(cfg.maze.cell) : 0;
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
        if (cfg.maze) {
          // Cada refúgio é um platô plano elevado. As laterais caem quase na
          // vertical dentro do muro; só a entrada rampa, acompanhando a trilha,
          // para as unidades subirem sem deformar os caminhos vizinhos.
          // `c.x`/`c.z` ficam meia célula à frente do centro real da câmara.
          for (const c of compounds) {
            const horizontal = c.facing === 'north' || c.facing === 'south';
            const halfF = (horizontal ? c.depth : c.width) / 2 + REFUGE_PAD;
            const halfT = (horizontal ? c.width : c.depth) / 2 + REFUGE_PAD;
            const a = FACING_ANGLE[c.facing], fx = Math.cos(a), fz = Math.sin(a);
            const tx = -fz, tz = fx;
            const cx0 = c.x - mazeCell / 2, cz0 = c.z - mazeCell / 2;
            const dx = wx - cx0, dz = wz - cz0;
            const fwd = dx * fx + dz * fz;
            const side = dx * tx + dz * tz;
            const outF = Math.max(0, Math.abs(fwd) - halfF);
            const outT = Math.max(0, Math.abs(side) - halfT);
            if (outF === 0 && outT === 0) { h = BASE_H + REFUGE_LIFT; continue; }
            const out = Math.hypot(outF, outT);
            // Rampa restrita à faixa do portão: só a trilha que sai da entrada
            // é suavizada, então os caminhos laterais não sobem.
            const door = compoundEntrance(c);
            const doorSide = (door.x - cx0) * tx + (door.z - cz0) * tz;
            const dTrail = exactTrailDistance(wx, wz);
            const inDoorLane = fwd > 0 && Math.abs(side - doorSide) < REFUGE_RAMP_HALF && dTrail < REFUGE_RAMP_HALF;
            const trailNear = inDoorLane ? Math.max(0, 1 - dTrail / REFUGE_RAMP_HALF) : 0;
            const rampness = smoothstep(Math.min(1, trailNear));
            const blend = REFUGE_EDGE + (REFUGE_RAMP_LEN - REFUGE_EDGE) * rampness;
            const t = smoothstep(Math.min(1, out / blend));
            h = h * t + (BASE_H + REFUGE_LIFT) * (1 - t);
          }
        } else {
          for (const c of compounds) {
            const r = Math.max(c.width, c.depth) / 2;
            flatten(c.x, c.z, r, HILL_LIFT);
            const a = FACING_ANGLE[c.facing], fx = Math.cos(a), fz = Math.sin(a);
            const tx = -fz, tz = fx;
            const dx = wx - c.x, dz = wz - c.z;
            const d = Math.hypot(dx, dz);
            const fwd = dx * fx + dz * fz, side = dx * tx + dz * tz;
            let width = 1.2;
            if (fwd > 0 && Math.abs(side) < RAMP_HALF && d < r * 1.4 + 14) {
              const trailNear = 1 - smoothstep((exactTrailDistance(wx, wz) - RAMP_HALF) / RAMP_FEATHER);
              width += trailNear * 9;
            }
            h += BASE_RAISE * smoothstep((r * 1.4 + width - d) / width);
          }
        }
        for (const b of bridges) flatten(b.x, b.z, Math.max(b.width, b.depth) / 2 + S(6));
        height[i] = h;
        if (isForestAt(wx, wz)) forest[i] = 0.8;
      }
      if (isBridgeAtWorld(wx, wz)) bridge[i] = 1;
    }
    const map: GameMap = { id, seed: cfg.version, tiles: n, height, water, bridge, forest, obstacles: obstacles.map(o => ({ ...o })) };
    cachedMap = map;
    return cloneMap(map);
  }

  return {
    id, config: cfg, compounds, trails, humanSpawns, cryptPosition, vampireSpawnOffset,
    bridges, resourcePlacements, forestWoodNodes, obstacles,
    compoundEntrance, isLandAt, isWaterAtWorld, isBridgeAtWorld, distanceToTrails, isForestAt, generateMap,
  };
}

function cloneMap(map: GameMap): GameMap {
  return {
    id: map.id,
    seed: map.seed,
    tiles: map.tiles,
    height: map.height.slice(),
    water: map.water.slice(),
    bridge: map.bridge.slice(),
    forest: map.forest.slice(),
    obstacles: map.obstacles.map((o) => ({ ...o })),
  };
}

// ---- registro de modelos ----
const MODEL_CACHE = new Map<MapPresetId, MapModel>();

export function getMapModel(id: MapPresetId = DEFAULT_MAP_ID): MapModel {
  const cached = MODEL_CACHE.get(id);
  if (cached) return cached;
  const cfg = MAP_PRESETS[id];
  if (!cfg) throw new Error(`Preset de mapa desconhecido: ${id}`);
  const model = buildMapModel(id, cfg);
  MODEL_CACHE.set(id, model);
  return model;
}

/** Id do mapa ativo no cliente (o servidor sempre passa o modelo explicitamente). */
let activeMapId: MapPresetId = DEFAULT_MAP_ID;
export function setActiveMapId(id: MapPresetId): void { activeMapId = id; }
export function getActiveMapId(): MapPresetId { return activeMapId; }
export function activeMapModel(): MapModel { return getMapModel(activeMapId); }

export function generateMap(id: MapPresetId = DEFAULT_MAP_ID): GameMap {
  return getMapModel(id).generateMap();
}

// ---- compatibilidade: helpers do mapa clássico ----
// Mantidos para o código/testes que usam o mapa padrão diretamente. Código novo
// deve preferir `getMapModel(id)` / `activeMapModel()`.
const CLASSIC = getMapModel('classic');
export const HUMAN_SPAWNS = CLASSIC.humanSpawns;
export const CRYPT_POSITION = CLASSIC.cryptPosition;
export const COMPOUNDS = CLASSIC.compounds;
export const TRAILS = CLASSIC.trails;
export const BRIDGES = CLASSIC.bridges;
export const RESOURCE_PLACEMENTS = CLASSIC.resourcePlacements;
export const FOREST_WOOD_NODES = CLASSIC.forestWoodNodes;
export function compoundEntrance(c: Compound): Point { return CLASSIC.compoundEntrance(c); }
export function isLandAt(x: number, z: number): boolean { return CLASSIC.isLandAt(x, z); }
export function isWaterAtWorld(x: number, z: number): boolean { return CLASSIC.isWaterAtWorld(x, z); }
export function isBridgeAtWorld(x: number, z: number): boolean { return CLASSIC.isBridgeAtWorld(x, z); }
export function distanceToTrails(x: number, z: number): number { return CLASSIC.distanceToTrails(x, z); }
export function isForestAt(x: number, z: number): boolean { return CLASSIC.isForestAt(x, z); }

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
  return map.water[i] === 1 && map.bridge[i] !== 1;
}

// MAP_SCALE permanece exportado por compatibilidade (mesma escala em todos os presets).
export { MAP_SCALE };
