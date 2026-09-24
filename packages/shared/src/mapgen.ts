import { buildHollowsMap } from './hollows.js';
import { normalizeTreeProps, treeObstacles } from './tree-footprint.js';
import { rockObstacles, type RockCollider } from './rock-collision.js';
import { clearRampObstacles } from './terrain.js';
import { DEFAULT_MAP_BOUNDARY, type BoundaryPoint } from './map-boundary.js';
import { snapBuildingCoordinate, type BuildKind } from './constants.js';
// Geração de mapa: cada preset (`MapPresetConfig`) vira um `MapModel` com todo o
// relevo, colisão, trilhas e recursos já derivados. Servidor e cliente usam o
// mesmo `mapId` para construir exatamente o mesmo mundo.
import {
  WORLD, GAME_CONFIG, MAP_PRESETS, DEFAULT_MAP_ID, MAP_SCALE, INTERACTION, BUILDING_SIZE, CLIFF_HEIGHT,
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

import { FLAT_GROUND_HEIGHT, withClearedTerrain } from './map-clearance.js';

export interface GameMap {
  ramps?: import('./terrain.js').TerrainRamp[];
  rockObstacles?: RockCollider[];
  propObstacles?: RockCollider[];
  playableMargin?: number;
  boundary?: readonly BoundaryPoint[];
  treeObstacles?: MapObstacle[];
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
  /**
   * Polilinha do rochedo que cerca cada refúgio (mesma amostrada pelos
   * obstáculos de `compoundWalls`). Vazia no labirinto e quando `maze` está ativo.
   * O cliente usa para alinhar o visual das falésias ao anel de colisão.
   */
  refugeRings: Point[][];
  /** Caixas de colisão da encosta de cada refúgio, na mesma ordem de `compounds`. */
  refugeWalls: MapObstacle[][];
  compoundEntrance(c: Compound): Point;
  isLandAt(x: number, z: number): boolean;
  isWaterAtWorld(x: number, z: number): boolean;
  isBridgeAtWorld(x: number, z: number): boolean;
  distanceToTrails(x: number, z: number): number;
  isForestAt(x: number, z: number): boolean;
  generateMap(): GameMap;
  stairs?: import('./terrain.js').TerrainStair[];
  paint?: number[];
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
  /** Tamanho da célula do labirinto (0 quando o preset não tem labirinto). */
  const mazeCell = cfg.maze ? S(cfg.maze.cell) : 0;

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

  // ---- relevo e contorno orgânico dos refúgios ----
  // O terraço elevado e o rochedo compartilham a MESMA borda: o anel derivado do
  // `outline[variant]` ganha ruído de baixa frequência, então a falésia do
  // terreno e as pedras caem exatamente no mesmo lugar. Isso encaixa o refúgio
  // no relevo em vez de deixá-lo como um círculo de pedras sobre o gramado.
  const REFUGE_LIFT = 0.62;      // altura do terraço (unidades de mapa)
  const REFUGE_PAD = S(3.4);     // topo plano estendido sob o rochedo
  const REFUGE_RAMP_LEN = S(26); // transição suave terraço -> campo (clássico)
  const CROWN_STEP = S(2.4);     // espaçamento das amostras do rochedo
  // Labirinto: platô elevado exatamente CLIFF_HEIGHT acima do campo; só a porta
  // tem rampa, então os corredores ao redor ficam planos.
  const MAZE_LIFT = CLIFF_HEIGHT / 14;
  const MAZE_EDGE = S(1.2);
  const MAZE_RAMP_LEN = S(14);
  const MAZE_RAMP_HALF = S(6);

  interface RefugeShape {
    cx: number; cz: number;
    fx: number; fz: number; tx: number; tz: number;
    halfF: number; halfT: number;
    /** Distância do centro à porta (sem o `PAD`): onde fica o vão do Muro. */
    frontF: number;
    /** Anel fechado em coordenadas de mundo (a frente liga o último ao primeiro). */
    ring: Point[];
  }

  /**
   * Borda orgânica do refúgio. `extra` estende o anel para fora — o mesmo valor
   * usado no terreno, para o topo plano cobrir a base do rochedo.
   */
  function makeRefugeShape(c: Compound, cx: number, cz: number, extra: number): RefugeShape {
    const facing = FACING_ANGLE[c.facing];
    const fx = Math.cos(facing), fz = Math.sin(facing);
    const tx = -fz, tz = fx;
    const horizontal = c.facing === 'north' || c.facing === 'south';
    const halfFBase = (horizontal ? c.depth : c.width) / 2;
    const halfTBase = (horizontal ? c.width : c.depth) / 2;
    const halfF = halfFBase + extra;
    const halfT = halfTBase + extra;
    const outline = OUTLINES[((c.variant % OUTLINES.length) + OUTLINES.length) % OUTLINES.length]!;
    const seed = hash01(c.x, c.z);
    // Vão calibrado para (a) a unidade passar antes de fechar e (b) um único
    // Muro (tamanho 3) lacrar por completo — vale em qualquer escala de mapa.
    const openX = c.wallThickness / 2 + BUILDING_SIZE.wall / 4 + INTERACTION.vampireUnitRadius;
    const ring = outline.map(([u, v], i) => {
      const front = i === 0 || i === outline.length - 1;
      if (front) {
        // O vão fica exatamente sobre a porta (sem o `PAD`), para o Muro
        // assentar no lugar certo e o caminho entrar pelo centro da abertura.
        return { x: cx + tx * (Math.sign(u!) * openX) + fx * halfFBase, z: cz + tz * (Math.sign(u!) * openX) + fz * halfFBase };
      }
      // Ruído orgânico: sulcos e bojos. Cresce pouco para não invadir corredores.
      const s = u! * halfT, f = v! * halfF;
      const ang = Math.atan2(s, f);
      const swell = Math.sin(ang * 3 + seed * 6.1) * 0.55
        + Math.sin(ang * 5 - seed * 4.3) * 0.3 + Math.sin(ang * 7 + seed * 2.7) * 0.15;
      const back = Math.max(0, -f / halfF);
      const grow = 1 + 0.13 * swell + (cfg.maze ? 0 : 0.12 * back);
      return { x: cx + tx * s * grow + fx * f * grow, z: cz + tz * s * grow + fz * f * grow };
    });
    return { cx, cz, fx, fz, tx, tz, halfF, halfT, frontF: halfFBase, ring };
  }


  /** Distância assinada ao anel do refúgio (negativa dentro). */
  function refugeDistance(shape: RefugeShape, x: number, z: number): number {
    const ring = shape.ring;
    let best = Infinity;
    for (let i = 0; i < ring.length; i++) {
      const a = ring[i]!, b = ring[(i + 1) % ring.length]!;
      const d = distanceToSegment(x, z, a.x, a.z, b.x, b.z);
      if (d < best) best = d;
    }
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const a = ring[i]!, b = ring[j]!;
      if ((a.z > z) !== (b.z > z) && x < (b.x - a.x) * (z - a.z) / (b.z - a.z) + a.x) inside = !inside;
    }
    return inside ? -best : best;
  }

  /**
   * Rochedo da encosta: pedras amostradas ao longo do anel orgânico, em três
   * camadas — crista sobre o anel (alta no fundo, baixa na porta), fileira
   * externa que engrossa o morro, e uma moldura baixa junto à grama. Assim o
   * refúgio lê como uma falésia contínua, não como uma cerca de pedrinhas.
   */
  function compoundWalls(c: Compound, shape: RefugeShape): MapObstacle[] {
    const ring = shape.ring;
    const seed = hash01(c.x, c.z);
    const walls: MapObstacle[] = [];
    const add = (x: number, z: number, size: number, depth: number, height: number) =>
      walls.push({ x, z, width: size, depth, height });
    // Vão da porta em unidades de mundo: os cantos do vão não podem inchar nem
    // tremer, senão o Muro (tamanho 3) deixa de caber e de lacrar a passagem.
    const openX = c.wallThickness / 2 + BUILDING_SIZE.wall / 4 + INTERACTION.vampireUnitRadius;
    for (let i = 0; i < ring.length - 1; i++) {
      const p = ring[i]!, q = ring[i + 1]!;
      const count = Math.max(3, Math.ceil(Math.hypot(q.x - p.x, q.z - p.z) / CROWN_STEP));
      for (let j = 0; j <= count; j++) {
        const t = j / count;
        const lx = p.x + (q.x - p.x) * t;
        const lz = p.z + (q.z - p.z) * t;
        const fwd = (lx - shape.cx) * shape.fx + (lz - shape.cz) * shape.fz;
        const side = (lx - shape.cx) * shape.tx + (lz - shape.cz) * shape.tz;
        if (fwd > shape.frontF - S(2.5) && Math.abs(side) < openX + S(0.8)) {
          add(lx, lz, c.wallThickness, c.wallThickness, c.wallHeight);
          continue;
        }
        // Quanto mais para o fundo (longe da porta), mais massa e altura.
        const back = Math.max(0, Math.min(1, 0.5 - fwd / (2 * shape.halfF)));
        const r1 = hash01(i * 7 + j, seed * 31);
        const r2 = hash01(i * 13 + j, seed * 7);
        const r3 = hash01(i * 17 + j, seed * 11);
        const nx = lx - shape.cx, nz = lz - shape.cz;
        const nl = Math.hypot(nx, nz) || 1;
        const ux = nx / nl, uz = nz / nl;
        // Crista: pedras grandes e sobrepostas, no topo da falésia.
        const size = c.wallThickness * (1.05 + back * 0.9) * (0.8 + r1 * 0.6);
        add(lx + ux * S(0.5), lz + uz * S(0.5), size, size * (0.85 + r3 * 0.4),
          c.wallHeight * (0.85 + back * 1.6) * (0.8 + r2 * 0.5));
        // Fileira externa: só no fundo/laterais, engrossa o morro.
        if (back > 0.22) {
          const off = S(1.2) + r1 * S(2.4);
          const os = c.wallThickness * (0.8 + back * 0.8) * (0.8 + r2 * 0.6);
          add(lx + ux * off, lz + uz * off, os, os * (0.85 + r1 * 0.4),
            c.wallHeight * (0.6 + back * 1.5) * (0.8 + r3 * 0.6));
        }
        // Moldura interna baixa: borda da grama contra o rochedo.
        const inOff = S(0.8) + r3 * S(1.2);
        const isize = c.wallThickness * (0.5 + back * 0.35) * (0.7 + r2 * 0.4);
        add(lx - ux * inOff, lz - uz * inOff, isize, isize * (0.8 + r1 * 0.4),
          c.wallHeight * (0.45 + back * 0.5));
      }
    }
    return walls;
  }

  // No labirinto cada refúgio é um beco escavado na própria grade (paredes do
  // buildMaze); no clássico, cada um tem seu rochedo amostrado do anel orgânico.
  // Preenchido depois: o buildMaze reposiciona as câmaras do labirinto.
  const NATURAL_BLOCKERS: MapObstacle[] = [];

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

  // Encosta de cada refúgio (por índice de `compounds`): as caixas de colisão e
  // a polilinha que o cliente usa para assentar as falésias GLB. Preenchido no
  // clássico por `compoundWalls` e no labirinto pelas paredes das câmaras.
  const REFUGE_WALLS: MapObstacle[][] = compounds.map(() => []);
  const REFUGE_RINGS: Point[][] = compounds.map(() => []);

  // ---- labirinto central ----
  // Um miolo labiríntico no CENTRO do mapa. Os refúgios ficam fora dele, em
  // campo aberto (orgânicos, como no clássico), então o Vampiro alcança cada um
  // sem atravessar corredores. O miolo tem quatro entradas nos pontos cardeais.
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
      /** Índice do refúgio em `compounds`, para alinhar o visual das falésias. */
      compoundIndex: number;
    }
    const rooms: Room[] = [];
    const roomCells = new Set<number>();
    const centerClear = Math.max(2, Math.ceil(S(m.centerRadius) / cell));
    const roomCellKeys = (i: number, j: number, rw: number, rd: number): number[] => {
      const out: number[] = [];
      for (let dx = 0; dx < rw; dx++) for (let dy = 0; dy < rd; dy++) out.push(K(i + dx, j + dy));
      return out;
    };
    for (const [ci, c] of compounds.entries()) {
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
        entrance: null, facing: c.facing, compoundIndex: ci,
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

    // 3b) Vias rápidas: escava um corredor reto do centro (cripta) até a porta de
    //     cada refúgio. O centro é o hub: o Vampiro vai direto a qualquer base,
    //     sem atravessar o labirinto inteiro. As vias viram trilhas de pedra.
    for (const room of rooms) {
      if (!room.entrance) continue;
      const [ei, ej, edi, edj] = room.entrance;
      const ti = ei + edi, tj = ej + edj; // célula de grade fora da câmara
      let x = 0, y = 0, guard = 0;
      while ((x !== ti || y !== tj) && guard++ < 512) {
        const ex = ti - x, ey = tj - y;
        const nx = Math.abs(ex) >= Math.abs(ey) ? x + Math.sign(ex) : x;
        const ny = Math.abs(ex) >= Math.abs(ey) ? y : y + Math.sign(ey);
        if (!inRegion(nx, ny)) break;
        if (roomCells.has(K(nx, ny))) break; // não atravessa outra câmara
        open.add(openKey(K(x, y), K(nx, ny)));
        x = nx; y = ny;
      }
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
    const addWall = (i: number, j: number, di: number, dj: number): MapObstacle[] => {
      const created: MapObstacle[] = [];
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
        const obstacle: MapObstacle = {
          x: px + (vertical ? jitter : 0),
          z: pz + (vertical ? 0 : jitter),
          width: vertical ? w : cell / chunks + S(1.4),
          depth: vertical ? cell / chunks + S(1.4) : d,
          height: wallH * (0.85 + hash01(Math.round(px), Math.round(pz)) * 0.35),
        };
        walls.push(obstacle);
        created.push(obstacle);
      }
      return created;
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
      const refugeWalls = REFUGE_WALLS[room.compoundIndex]!;
      const compound = compounds[room.compoundIndex]!;
      // No labirinto `compound.x/z` fica meia célula à frente do centro real da
      // câmara (convenção do gerador). O anel é o retângulo externo das paredes:
      // a arena tem pegada quadrada e os módulos de pedra alinham nos lados.
      const centerX = compound.x - cell / 2;
      const centerZ = compound.z - cell / 2;
      const halfX = compound.width / 2 + wallT / 2;
      const halfZ = compound.depth / 2 + wallT / 2;
      REFUGE_RINGS[room.compoundIndex] = [
        { x: centerX - halfX, z: centerZ - halfZ },
        { x: centerX + halfX, z: centerZ - halfZ },
        { x: centerX + halfX, z: centerZ + halfZ },
        { x: centerX - halfX, z: centerZ + halfZ },
        { x: centerX - halfX, z: centerZ - halfZ },
      ];
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
          refugeWalls.push(...addWall(i, j, di, dj));
        }
      }
    }
    // Trila de pedra entrando pela passagem.
    for (const room of rooms) {
      if (!room.entrance) continue;
      const [i, j, di, dj] = room.entrance;
      trails.push([{ x: i * cell, z: j * cell }, { x: (i + di) * cell, z: (j + dj) * cell }]);
    }
    // Vão do muro: paredes dos lados, abertura central. A abertura é dimensionada
    // pelo raio do VAMPIRO (2×2), senão ele não atravessa; ainda assim o Muro
    // (tamanho 3) sela o vão, pois bloqueia |z−centro| < 1.5 + raio.
    const unit = INTERACTION.vampireUnitRadius;
    const openX = BUILDING_SIZE.wall / 2 + unit + S(0.2);
    for (const room of rooms) {
      if (!room.entrance) continue;
      const refugeWalls = REFUGE_WALLS[room.compoundIndex]!;
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
          const obstacle: MapObstacle = {
            x: door.x + (vertical ? 0 : off),
            z: door.z + (vertical ? off : 0),
            width: vertical ? wallT : chunkLen,
            depth: vertical ? chunkLen : wallT,
            height: wallH,
          };
          walls.push(obstacle);
          refugeWalls.push(obstacle);
        }
      }
    }
    return walls;
  }

  if (cfg.maze) {
    NATURAL_BLOCKERS.push(...buildMaze());
  }

  // Contornos orgânicos dos refúgios do mapa clássico. O labirinto usa as
  // câmaras da própria grade (paredes do buildMaze).
  const REFUGE_SHAPES = cfg.maze ? [] : compounds.map((c) => makeRefugeShape(c, c.x, c.z, REFUGE_PAD));

  if (!cfg.maze) {
    compounds.forEach((c, i) => {
      const door = compoundEntrance(c);
      const bend = ((i % 3) - 1) * 0.14 * Math.hypot(door.x, door.z);
      const angle = FACING_ANGLE[c.facing];
      trails.push(sampleTrail(door, bend, { x: Math.cos(angle), z: Math.sin(angle) }));
      // Caminho pavimentado do centro até o portão (atravessa a grama do terraço).
      trails.push([{ x: c.x, z: c.z }, door]);
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

  // Encosta rochosa orgânica de cada refúgio (só no clássico; no labirinto as
  // câmaras já são cercadas pelas paredes da grade).
  if (!cfg.maze) {
    compounds.forEach((c, i) => {
      const shape = REFUGE_SHAPES[i]!;
      const walls = compoundWalls(c, shape);
      REFUGE_WALLS[i] = walls;
      REFUGE_RINGS[i] = shape.ring.map((p) => ({ x: p.x, z: p.z }));
      NATURAL_BLOCKERS.push(...walls);
    });
  }

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
  // Sopé (talus): blocos soltos logo abaixo da falésia, decrescentes para fora,
  // que fazem o rochedo "derramar" no campo. A crista (ridge), atrás do
  // refúgio, funde o anel com um maciço maior: o refúgio parece encaixado num
  // morro, não sobre uma bolha de pedras.
  const baseRocksScale = cfg.baseRocksScale ?? 1.2;
  const BASE_ROCKS: MapObstacle[] = baseRocksScale <= 0 ? [] : compounds.flatMap((c, ci) => {
    const shape = REFUGE_SHAPES[ci];
    if (!shape) return [];
    const out: MapObstacle[] = [];
    const door = compoundEntrance(c);
    const doorA = Math.atan2(
      (door.x - shape.cx) * shape.tx + (door.z - shape.cz) * shape.tz,
      (door.x - shape.cx) * shape.fx + (door.z - shape.cz) * shape.fz,
    );
    const angleAt = (x: number, z: number) => Math.atan2(
      (x - shape.cx) * shape.tx + (z - shape.cz) * shape.tz,
      (x - shape.cx) * shape.fx + (z - shape.cz) * shape.fz,
    );
    const afterDoor = (a: number) => Math.abs(((a - doorA + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    // Blocos próximos à trilha, à praça ou a um vão de anel são descartados:
    // protege corredores (labirinto) e mantém os caminhos livres.
    const push = (x: number, z: number, size: number, height: number) => {
      const depth = size * (0.8 + hash01(Math.round(x), Math.round(z)) * 0.45);
      if (exactTrailDistance(x, z) < Math.max(size, depth) / 2 + S(1.2)) return;
      if (blocksMazeGap(x, z, Math.max(size, depth) / 2)) return;
      out.push({ x, z, width: size, depth, height });
    };
    const ring = shape.ring;
    const step = S(4.5);
    for (let i = 0; i < ring.length - 1; i++) {
      const p = ring[i]!, q = ring[i + 1]!;
      const count = Math.max(1, Math.round(Math.hypot(q.x - p.x, q.z - p.z) / step));
      for (let j = 0; j < count; j++) {
        const t = (j + 0.5) / count;
        const px = p.x + (q.x - p.x) * t, pz = p.z + (q.z - p.z) * t;
        if (afterDoor(angleAt(px, pz)) < 0.7) continue;
        const nx = px - shape.cx, nz = pz - shape.cz;
        const nl = Math.hypot(nx, nz) || 1;
        const off = S(1.6) + hash01(i * 7 + j, ci * 13 + 3) * S(4.2) * baseRocksScale;
        const x = px + nx / nl * off, z = pz + nz / nl * off;
        const size = (2.2 + hash01(i * 5 + j, ci * 11 + 7) * 2.6) * (0.8 + baseRocksScale * 0.3);
        const height = 3.2 + hash01(i * 3 + j, ci * 5 + 9) * 4.2;
        push(x, z, size, height);
      }
    }
    // Crista atrás do refúgio (só no clássico; no labirinto as paredes da grade
    // já formam o fundo e pedras extras fechariam corredores).
    if (!cfg.maze) {
      const count = 10 + Math.round(hash01(ci * 3 + 1, ci * 5 + 2) * 8);
      const bx = shape.cx - shape.fx * (shape.halfF + S(3));
      const bz = shape.cz - shape.fz * (shape.halfF + S(3));
      for (let i = 0; i < count; i++) {
        const ts = (hash01(i * 3 + ci, ci * 7 + 1) - 0.5) * 2 * (shape.halfT + S(5));
        const fd = hash01(i * 5 + ci, ci * 11 + 2) * S(11);
        const x = bx + shape.tx * ts - shape.fx * fd;
        const z = bz + shape.tz * ts - shape.fz * fd;
        const size = 3.6 + hash01(i + ci, ci * 13 + 5) * 4.4;
        const height = 6 + hash01(i * 2 + ci, ci * 17 + 6) * 6.5;
        push(x, z, size, height);
      }
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
    if (nearCompound(x, z, S(2.5))) return false;
    if (nearMountain(x, z, S(2))) return false;
    // Pinheiros podem encostar no sopé, mas não nascer dentro das pedras.
    if (BASE_ROCKS.some(o => Math.abs(x - o.x) < o.width / 2 + S(0.6) && Math.abs(z - o.z) < o.depth / 2 + S(0.6))) return false;
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

  const baseObstacles: MapObstacle[] = [...NATURAL_BLOCKERS, ...ROCK_OBSTACLES, ...BASE_ROCKS].map(o => ({ ...o }));
  const obstacles: MapObstacle[] = applyOverlay(id, baseObstacles);

  let cachedMap: GameMap | null = null;

  function generateMap(): GameMap {
    if (cachedMap) return cloneMap(cachedMap);
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
        const ground = terrainHeight(wx, wz, coast);
        let h = ground;
        const flatten = (cx: number, cz: number, radius: number, lift = 0) => {
          const d = Math.hypot(wx - cx, wz - cz);
          if (d >= radius + FLAT_BLEND) return;
          const t = smoothstep((d - radius) / FLAT_BLEND);
          h = h * t + (BASE_H + lift) * (1 - t);
        };
        if (cfg.maze) {
          // Cada câmara do labirinto é um platô exatamente CLIFF_HEIGHT acima do
          // campo (`ground`): o degrau tem altura fixa e a rampa só na porta.
          const plateau = ground + MAZE_LIFT;
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
            if (outF === 0 && outT === 0) { h = plateau; continue; }
            const out = Math.hypot(outF, outT);
            const door = compoundEntrance(c);
            const doorSide = (door.x - cx0) * tx + (door.z - cz0) * tz;
            // Rampa da porta: segue a TRILHA que sai da porta (que é diagonal no
            // labirinto), com inclinação constante e piso plano na transversal —
            // assim o corredor inteiro é caminhável (worker e vampiro).
            const dTrail = exactTrailDistance(wx, wz);
            if (fwd > 0 && dTrail < MAZE_RAMP_HALF) {
              const r = Math.min(1, out / MAZE_RAMP_LEN);
              h = ground + MAZE_LIFT * (1 - r);
              continue;
            }
            // Demais bordas: degrau (encosta íngreme, bloqueia).
            const t = smoothstep(Math.min(1, out / MAZE_EDGE));
            h = h * t + plateau * (1 - t);
          }
        } else {
          // Refúgio clássico: terraço gramado elevado sobre o anel de rochas. A
          // transição é suave em todo o contorno para nenhuma trilha vizinha
          // ficar bloqueada; a encosta de pedra é a barreira que sela.
          for (const shape of REFUGE_SHAPES) {
            const sd = refugeDistance(shape, wx, wz);
            if (sd >= REFUGE_RAMP_LEN) continue;
            const t = smoothstep(Math.min(1, Math.max(0, sd) / REFUGE_RAMP_LEN));
            h = h * t + (BASE_H + REFUGE_LIFT) * (1 - t);
          }
        }
        for (const b of bridges) flatten(b.x, b.z, Math.max(b.width, b.depth) / 2 + S(6));
        height[i] = h;
        if (isForestAt(wx, wz)) forest[i] = 0.8;
      }
      if (isBridgeAtWorld(wx, wz)) bridge[i] = 1;
    }
    // Relevo esculpido no editor: substitui a altura procedural (só em terra).
    const overlay = MAP_OVERLAYS.get(id);
    if (overlay?.height && overlay.height.length === n * n) {
      for (let i = 0; i < n * n; i++) {
        if (water[i] || bridge[i]) continue;
        const value = overlay.height[i];
        if (typeof value === 'number' && Number.isFinite(value)) height[i] = Math.max(0, Math.min(1.2, value));
      }
    }
    const map: GameMap = { id, seed: cfg.version, tiles: n, height, water, bridge, forest, obstacles: obstacles.map(o => ({ ...o })) };
    cachedMap = map;
    return cloneMap(map);
  }

  return {
    id, config: cfg, compounds, trails, humanSpawns, cryptPosition, vampireSpawnOffset,
    bridges, resourcePlacements, forestWoodNodes, obstacles,
    refugeRings: REFUGE_RINGS.map((ring) => ring.map((p) => ({ x: p.x, z: p.z }))),
    refugeWalls: REFUGE_WALLS.map((walls) => walls.map((w) => ({ ...w }))),
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

// ---- overlay do editor de mapa ----
// O builder pinta células do grid: `adds` cria muros e `removes` apaga os muros
// gerados que caem naquela célula. Aplicado por cima do mapa procedural.
export interface MapOverlay {
  /** Vertices already occupied by sculpted relief; persisted across editor sessions. */
  reliefOccupied?: number[];
  /** Grass cells cleared of procedural scenery, resources and collisions. */
  cleared?: number[];
  version: number;
  /** Índices de tile (z * tiles + x) onde pintar um muro. */
  adds: number[];
  /** Índices de tile onde remover muros gerados. */
  removes: number[];
  /** Props posicionados à mão no builder 3D. */
  props: OverlayProp[];
  /**
   * Quando true, a decoração procedural (árvores/pedras soltas) NÃO é gerada —
   * tudo que existia foi importado para `props` no editor e é renderizado por lá.
   */
  decorReplace?: boolean;
  /**
   * Grade de altura editada (unidades de mapa, `tiles * tiles`). Quando presente,
   * substitui a altura procedural do terreno (relevo esculpido no editor).
   */
  height?: number[];
  /**
   * Pintura de piso por tile: 0 = automático, 1 = caminho (pedra), 2 = grama.
   * `tiles * tiles`.
   */
  paint?: number[];
  stairs?: import('./terrain.js').TerrainStair[];
}

export type OverlayPropKind =
  | 'tree' | 'rock'
  | 'building:bank' | 'building:taverna' | 'building:wall'
  | 'building:tower' | 'building:market' | 'building:crypt' | 'building:goldMine';

export interface OverlayProp {
  footprint?: RockCollider;
  kind: OverlayPropKind;
  x: number;
  z: number;
  rotY: number;
  scale: number;
}

/** Converte o overlay salvo (parcial) para a forma completa. */
export function normalizeOverlay(value: Partial<MapOverlay> | null | undefined): MapOverlay {
  return {
    reliefOccupied: Array.isArray(value?.reliefOccupied) ? [...new Set(value.reliefOccupied.filter(i=>Number.isInteger(i) && i>=0 && i<WORLD.tiles*WORLD.tiles))] : undefined,
    version: Number(value?.version ?? 1),
    cleared: Array.isArray(value?.cleared) ? [...new Set(value.cleared.filter(i => Number.isInteger(i) && i >= 0 && i < WORLD.tiles*WORLD.tiles))] : [],
    adds: Array.isArray(value?.adds) ? value.adds.map(Number).filter(Number.isInteger) : [],
    removes: Array.isArray(value?.removes) ? value.removes.map(Number).filter(Number.isInteger) : [],
    props: Array.isArray(value?.props)
      ? normalizeTreeProps(value.props
        .filter((p) => p && typeof p.kind === 'string' && !p.kind.startsWith('cliff:') && String(p.kind) !== 'building:keep' && Number.isFinite(p.x) && Number.isFinite(p.z))
        .map((p) => {
          const kind=p.kind.slice('building:'.length) as BuildKind | 'crypt';
          const building=p.kind.startsWith('building:') && Object.hasOwn(BUILDING_SIZE,kind);
          return { kind:p.kind as OverlayPropKind,
            footprint:building ? {x:snapBuildingCoordinate(p.x,kind),z:snapBuildingCoordinate(p.z,kind),width:BUILDING_SIZE[kind],depth:BUILDING_SIZE[kind],rotation:0} : p.footprint && [p.footprint.x,p.footprint.z,p.footprint.width,p.footprint.depth,p.footprint.rotation].every(Number.isFinite) ? p.footprint : undefined,
            x:building ? snapBuildingCoordinate(p.x,kind) : Number(p.x),
            z:building ? snapBuildingCoordinate(p.z,kind) : Number(p.z),
            rotY:building ? Math.round(Number(p.rotY ?? 0)/(Math.PI/2))*Math.PI/2 : Number(p.rotY ?? 0),
            scale:building ? 1 : Number(p.scale ?? 1) };
        }))
      : [],
    height: Array.isArray(value?.height) && value.height.length ? value.height.map(Number) : undefined,
    paint: Array.isArray(value?.paint) && value.paint.length ? value.paint.map(Number) : undefined,
    stairs: Array.isArray(value?.stairs) ? value.stairs.filter(s => s &&
      [s.x,s.z,s.dx,s.dz,s.length,s.width,s.low,s.high].every(Number.isFinite) &&
      Math.abs(s.dx)+Math.abs(s.dz) === 1 && Number.isInteger(s.dx) && Number.isInteger(s.dz) &&
      s.length > 0 && s.length <= WORLD.half*2 && s.width > 0 && s.width <= WORLD.half*2 &&
      s.low >= 0 && s.high <= 1.2 && s.high > s.low).map(s => ({...s})) : [],
    decorReplace: Boolean(value?.decorReplace),
  };
}

const MAP_OVERLAYS = new Map<MapPresetId, MapOverlay>();

export function setMapOverlay(id: MapPresetId, overlay: MapOverlay | null): void {
  if (overlay) MAP_OVERLAYS.set(id, normalizeOverlay(overlay));
  else MAP_OVERLAYS.delete(id);
  // O modelo é cacheado; ao trocar o overlay ele precisa ser reconstruído.
  MODEL_CACHE.delete(id);
}

export function getMapOverlay(id: MapPresetId): MapOverlay | null {
  return MAP_OVERLAYS.get(id) ?? null;
}

/** Muros pintados no editor, por cima dos gerados (com remoções por célula). */
function applyOverlay(id: MapPresetId, base: MapObstacle[]): MapObstacle[] {
  const overlay = MAP_OVERLAYS.get(id);
  const n = WORLD.tiles, ts = WORLD.tileSize, half = WORLD.half;
  const removed = overlay ? new Set(overlay.removes) : null;
  const kept = base
    .filter((o) => {
      if (!removed) return true;
      const tx = Math.floor((o.x + half) / ts), tz = Math.floor((o.z + half) / ts);
      return !removed.has(tz * n + tx);
    })
    .map((o) => ({ ...o }));
  if (!overlay) return kept;
  for (const idx of overlay.adds) {
    if (!Number.isInteger(idx) || idx < 0 || idx >= n * n) continue;
    const tx = idx % n, tz = Math.floor(idx / n);
    kept.push({ x: tx * ts - half + ts / 2, z: tz * ts - half + ts / 2, width: ts, depth: ts, height: 4.5 });
  }
  return kept;
}

// ---- registro de modelos ----
const MODEL_CACHE = new Map<MapPresetId, MapModel>();

export function getMapModel(id: MapPresetId = DEFAULT_MAP_ID): MapModel {
  const cached = MODEL_CACHE.get(id);
  if (cached) return cached;
  const cfg = MAP_PRESETS[id];
  if (!cfg) throw new Error(`Preset de mapa desconhecido: ${id}`);
  const baseId = cfg.baseMapId ?? id;
  const model = withClearedTerrain(baseId === 'flat' ? buildFlatMap(id, cfg) : baseId === 'hollows' ? buildHollowsMap(cfg, getMapOverlay(id)) : buildMapModel(id, cfg), getMapOverlay(id));
  model.id = id;
  const generate = model.generateMap;
  model.generateMap = () => {
    const map = { ...generate(), id, boundary: cfg.boundary ?? DEFAULT_MAP_BOUNDARY,
    playableMargin: cfg.playableMargin ?? GAME_CONFIG.camera.playableMargin,
    treeObstacles: treeObstacles(getMapOverlay(id)?.props ?? []),
    propObstacles: (getMapOverlay(id)?.props ?? []).filter(p=>p.kind!=='tree' && p.kind!=='rock' && p.footprint).map(p=>p.footprint!),
    rockObstacles: rockObstacles(getMapOverlay(id)?.props ?? []) };
    clearRampObstacles(map,model.stairs ?? getMapOverlay(id)?.stairs ?? []);
    return map;
  };
  MODEL_CACHE.set(id, model);
  return model;
}

function buildFlatMap(id: MapPresetId, config: MapPresetConfig): MapModel {
  const overlay = getMapOverlay(id), count = WORLD.tiles * WORLD.tiles;
  return {
    id, config, compounds: [], trails: [], bridges: [], resourcePlacements: [], forestWoodNodes: [],
    obstacles: [], refugeRings: [], refugeWalls: [],
    humanSpawns: config.humanSpawns.map(p => ({ x: p.x * config.scale, z: p.z * config.scale })),
    cryptPosition: { x: config.crypt.x * config.scale, z: config.crypt.z * config.scale },
    vampireSpawnOffset: { x: config.vampireSpawnOffset.x * config.scale, z: config.vampireSpawnOffset.z * config.scale },
    compoundEntrance: c => ({ x: c.x, z: c.z }), isLandAt: () => true,
    isWaterAtWorld: () => false, isBridgeAtWorld: () => false, isForestAt: () => false,
    distanceToTrails: () => Infinity, stairs: overlay?.stairs ?? [],
    paint: overlay?.paint ?? Array(count).fill(2),
    generateMap: () => ({ id, seed: config.version, tiles: WORLD.tiles,
      height: Float32Array.from({ length: count }, (_, i) => {
        const h = overlay?.height?.[i];
        return typeof h === 'number' && Number.isFinite(h) ? Math.max(0, Math.min(1.2, h)) : FLAT_GROUND_HEIGHT;
      }), water: new Uint8Array(count), bridge: new Uint8Array(count), forest: new Float32Array(count), obstacles: [] }),
  };
}

/** Id do mapa ativo no cliente (o servidor sempre passa o modelo explicitamente). */
let activeMapId: MapPresetId = DEFAULT_MAP_ID;
export function setActiveMapId(id: MapPresetId): void { activeMapId = id; }
export function getActiveMapId(): MapPresetId { return activeMapId; }
export function activeMapModel(): MapModel { return getMapModel(activeMapId); }

export function generateMap(id: MapPresetId = DEFAULT_MAP_ID): GameMap {
  return getMapModel(id).generateMap();
}

// ---- compatibilidade: helpers do mapa padrão (labirinto) ----
// Mantidos para o código/testes que usam o mapa padrão diretamente. Código novo
// deve preferir `getMapModel(id)` / `activeMapModel()`.
const DEFAULT_MODEL = getMapModel(DEFAULT_MAP_ID);
export const HUMAN_SPAWNS = DEFAULT_MODEL.humanSpawns;
export const CRYPT_POSITION = DEFAULT_MODEL.cryptPosition;
export const COMPOUNDS = DEFAULT_MODEL.compounds;
export const TRAILS = DEFAULT_MODEL.trails;
export const BRIDGES = DEFAULT_MODEL.bridges;
export const RESOURCE_PLACEMENTS = DEFAULT_MODEL.resourcePlacements;
export const FOREST_WOOD_NODES = DEFAULT_MODEL.forestWoodNodes;
export function compoundEntrance(c: Compound): Point { return DEFAULT_MODEL.compoundEntrance(c); }
export function isLandAt(x: number, z: number): boolean { return DEFAULT_MODEL.isLandAt(x, z); }
export function isWaterAtWorld(x: number, z: number): boolean { return DEFAULT_MODEL.isWaterAtWorld(x, z); }
export function isBridgeAtWorld(x: number, z: number): boolean { return DEFAULT_MODEL.isBridgeAtWorld(x, z); }
export function distanceToTrails(x: number, z: number): number { return DEFAULT_MODEL.distanceToTrails(x, z); }
export function isForestAt(x: number, z: number): boolean { return DEFAULT_MODEL.isForestAt(x, z); }

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
