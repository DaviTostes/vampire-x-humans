import { BUILDING_SIZE, WORLD, INTERACTION, TICK_RATE, TERRAIN_MAX_SLOPE } from './constants.js';
import { isWaterAt, type GameMap } from './mapgen.js';
import type { GameState, Unit } from './types.js';

export const UNIT_RADIUS = INTERACTION.unitRadius;
type Point = { x: number; z: number };
type Goal = Point & { range: number; half: number };
type Route = { key: string; order: Unit['order']; points: Point[]; retryAt: number; search?: Generator<void, Point[], void> };
type Collider = Point & { halfX: number; halfZ: number; radius?: number; kind?: string };

// Buffers reaproveitados entre buscas de uma mesma sala. Sem isso, cada A*
// aloca e preenche ~630 KB (Float32 + Int32 de SIZE²), pressionando o GC.
// `stamp` marca a geração de cada índice, evitando limpar os arrays inteiros.
interface PathBuffers {
  costs: Float32Array;
  parent: Int32Array;
  closed: Uint8Array;
  stamp: Int32Array;
  heap: Array<{ id: number; score: number }>;
}
const SIZE = WORLD.tiles * WORLD.tileSize;
const BUCKET_SIZE = 8;
const BUCKET_COUNT = Math.ceil(SIZE / BUCKET_SIZE);
// Orçamento compartilhado por todas as unidades da sala, por tick.
const PATH_STEPS_PER_TICK = 512;

/** Distância até a borda de um prédio, ou até um ponto. */
export function distanceToTarget(p: Point, target: Point, half = 0): number {
  return Math.hypot(Math.max(0, Math.abs(p.x - target.x) - half),
    Math.max(0, Math.abs(p.z - target.z) - half));
}

/** Navegação por sala. A* em grade de 1u, sem cortar quinas; movimento contínuo validado. */
export class Navigation {
  private routes = new Map<number, Route>();
  private signature = '';
  private grids = new Map<string, Uint8Array>();
  private colliders = new Map<number, Collider[]>();
  private searches: Route[] = [];
  private searchBudget = PATH_STEPS_PER_TICK;
  private indexed = false;
  private pathPool: PathBuffers[] = [];
  private pathGen = 0;

  constructor(private state: GameState, private map: GameMap) {}

  refresh() {
    const signature = this.state.buildings.map(b => `${b.id}:${b.kind}:${b.x}:${b.z}`).join('|') +
      '/' + this.state.nodes.filter(n => n.amount > 0).map(n => n.id).join(',');
    if (signature !== this.signature) {
      this.signature = signature;
      // Fecha os geradores pendentes para devolver os buffers ao pool.
      for (const route of this.routes.values()) route.search?.return([]);
      this.routes.clear();
      this.grids.clear();
      this.searches = [];
      this.rebuildColliders();
    }
    const units = new Map(this.state.units.map(u => [u.id, u]));
    for (const [id, route] of this.routes) {
      const unit = units.get(id);
      if (!unit || unit.dead || !unit.order || unit.order !== route.order) {
        route.search?.return([]);
        route.search = undefined;
        this.routes.delete(id);
      }
    }
    this.searchBudget = PATH_STEPS_PER_TICK;
    this.advanceSearches();
  }

  private acquirePathBuffers(): PathBuffers {
    const pooled = this.pathPool.pop();
    if (pooled) {
      pooled.heap.length = 0;
      return pooled;
    }
    const n = SIZE * SIZE;
    return {
      costs: new Float32Array(n),
      parent: new Int32Array(n),
      closed: new Uint8Array(n),
      stamp: new Int32Array(n),
      heap: [],
    };
  }

  private releasePathBuffers(buffers: PathBuffers): void {
    buffers.heap.length = 0;
    this.pathPool.push(buffers);
  }

  private rebuildColliders() {
    this.colliders.clear();
    const add = (c: Collider) => {
      const minX = Math.max(0, Math.floor((c.x - c.halfX + WORLD.half) / BUCKET_SIZE));
      const maxX = Math.min(BUCKET_COUNT - 1, Math.floor((c.x + c.halfX + WORLD.half) / BUCKET_SIZE));
      const minZ = Math.max(0, Math.floor((c.z - c.halfZ + WORLD.half) / BUCKET_SIZE));
      const maxZ = Math.min(BUCKET_COUNT - 1, Math.floor((c.z + c.halfZ + WORLD.half) / BUCKET_SIZE));
      for (let z = minZ; z <= maxZ; z++) for (let x = minX; x <= maxX; x++) {
        const key = z * BUCKET_COUNT + x;
        let bucket = this.colliders.get(key);
        if (!bucket) this.colliders.set(key, bucket = []);
        bucket.push(c);
      }
    };
    for (const b of this.state.buildings) {
      const half = BUILDING_SIZE[b.kind] / 2 + UNIT_RADIUS;
      add({ x: b.x, z: b.z, halfX: half, halfZ: half, kind: b.kind });
    }
    for (const wall of this.map.obstacles) {
      add({ x: wall.x, z: wall.z, halfX: wall.width / 2 + UNIT_RADIUS, halfZ: wall.depth / 2 + UNIT_RADIUS });
    }
    for (const n of this.state.nodes) {
      if (n.amount <= 0) continue;
      const radius = (n.kind === 'wood' ? INTERACTION.woodCollisionRadius : INTERACTION.goldCollisionRadius) + UNIT_RADIUS;
      add({ x: n.x, z: n.z, halfX: radius, halfZ: radius, radius });
    }
    this.indexed = true;
  }

  private advanceSearches() {
    while (this.searchBudget > 0 && this.searches.length) {
      const route = this.searches.shift()!;
      if (!route.search) continue;
      this.searchBudget--;
      const next = route.search.next();
      if (next.done) {
        route.points = next.value;
        route.search = undefined;
        route.retryAt = this.state.tick + Math.ceil(INTERACTION.pathRetrySeconds * TICK_RATE);
      } else {
        // Rodízio: uma busca sem saída não impede as outras de avançar.
        this.searches.push(route);
      }
    }
  }

  /** Altura do terreno (unidades de mapa) por interpolação bilinear. */
  private groundHeight(x: number, z: number): number {
    const n = this.map.tiles;
    const gx = Math.max(0, Math.min(n - 1.0001, (x + WORLD.half) / WORLD.tileSize));
    const gz = Math.max(0, Math.min(n - 1.0001, (z + WORLD.half) / WORLD.tileSize));
    const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
    const h = (dx: number, dz: number) => this.map.height[Math.min(n - 1, tz + dz) * n + Math.min(n - 1, tx + dx)] ?? 0;
    return (h(0, 0) * (1 - fx) + h(1, 0) * fx) * (1 - fz) + (h(0, 1) * (1 - fx) + h(1, 1) * fx) * fz;
  }

  /** Só a falésia (inclinação acima do limite) bloqueia; o platô é andável. */
  private tooSteep(x: number, z: number): boolean {
    const step = WORLD.tileSize;
    const h0 = this.groundHeight(x, z);
    const slope = Math.max(
      Math.abs(this.groundHeight(x + step, z) - h0),
      Math.abs(this.groundHeight(x - step, z) - h0),
      Math.abs(this.groundHeight(x, z + step) - h0),
      Math.abs(this.groundHeight(x, z - step) - h0),
    ) / step;
    return slope > TERRAIN_MAX_SLOPE;
  }

  canStand(u: Pick<Unit, 'kind'>, x: number, z: number): boolean {
    const r = UNIT_RADIUS;
    if (!Number.isFinite(x) || !Number.isFinite(z) || Math.abs(x) + r >= WORLD.half || Math.abs(z) + r >= WORLD.half) return false;
    for (const dx of [-r, 0, r]) {
      for (const dz of [-r, 0, r]) if (isWaterAt(this.map, x + dx, z + dz)) return false;
    }
    if (this.tooSteep(x, z)) return false;
    if (!this.indexed) this.rebuildColliders();
    const key = Math.floor((z + WORLD.half) / BUCKET_SIZE) * BUCKET_COUNT + Math.floor((x + WORLD.half) / BUCKET_SIZE);
    for (const c of this.colliders.get(key) ?? []) {
      if (c.kind === 'crypt' && u.kind === 'vampire') continue;
      if (c.kind === 'wall' && u.kind === 'worker') continue;
      const dx = x - c.x, dz = z - c.z;
      if (c.radius !== undefined ? dx * dx + dz * dz < c.radius * c.radius : Math.abs(dx) < c.halfX && Math.abs(dz) < c.halfZ) return false;
    }
    return true;
  }

  private clearSegment(u: Unit, a: Point, b: Point): boolean {
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 0.25));
    for (let i = 1; i <= steps; i++) {
      if (!this.canStand(u, a.x + (b.x - a.x) * i / steps, a.z + (b.z - a.z) * i / steps)) return false;
    }
    return true;
  }

  /** Resolve spawn/construção sobre unidade antes de calcular caminhos. */
  recover(u: Unit) {
    if (this.canStand(u, u.x, u.z)) return;
    for (let r = 0.5; r <= 24; r += 0.5) {
      for (let a = 0; a < 32; a++) {
        const x = u.x + Math.cos(a * Math.PI / 16) * r;
        const z = u.z + Math.sin(a * Math.PI / 16) * r;
        if (this.canStand(u, x, z)) {
          u.x = x;
          u.z = z;
          this.cancelRoute(u.id);
          return;
        }
      }
    }
  }

  private point(index: number): Point {
    return { x: index % SIZE - WORLD.half + 0.5, z: Math.floor(index / SIZE) - WORLD.half + 0.5 };
  }

  private *findPath(u: Unit, goal: Goal): Generator<void, Point[], void> {
    const buffers = this.acquirePathBuffers();
    try {
      const gen = ++this.pathGen;
      let grid = this.grids.get(u.kind);
      if (!grid) {
        grid = new Uint8Array(SIZE * SIZE);
        this.grids.set(u.kind, grid);
      }
      const walkable = (index: number) => {
        if (!grid![index]) {
          const p = this.point(index);
          grid![index] = this.canStand(u, p.x, p.z) ? 1 : 2;
        }
        return grid![index] === 1;
      };
      const sx = Math.floor(u.x + WORLD.half), sz = Math.floor(u.z + WORLD.half);
      const start = sz * SIZE + sx;
      // Um clique no meio de um lago/prédio não deve explorar o mapa inteiro.
      let reachableGoal = false;
      const reach = goal.half + goal.range;
      for (let z = Math.max(0, Math.floor(goal.z - reach + WORLD.half)); z < SIZE && z <= goal.z + reach + WORLD.half; z++) {
        for (let x = Math.max(0, Math.floor(goal.x - reach + WORLD.half)); x < SIZE && x <= goal.x + reach + WORLD.half; x++) {
          const id = z * SIZE + x;
          if (distanceToTarget(this.point(id), goal, goal.half) <= goal.range + 0.001 && walkable(id)) reachableGoal = true;
        }
      }
      if (!reachableGoal) return [];
      const { costs, parent, closed, stamp, heap } = buffers;
      // Min-heap para manter a busca limitada mesmo em mapas com rios e muros longos.
      const push = (id: number, score: number) => {
        heap.push({ id, score });
        let i = heap.length - 1;
        while (i > 0) {
          const p = (i - 1) >> 1;
          if (heap[p]!.score <= score) break;
          [heap[p], heap[i]] = [heap[i]!, heap[p]!];
          i = p;
        }
      };
      const pop = () => {
        const first = heap[0]!;
        const last = heap.pop()!;
        if (heap.length) {
          heap[0] = last;
          let i = 0;
          while (i * 2 + 1 < heap.length) {
            let c = i * 2 + 1;
            if (c + 1 < heap.length && heap[c + 1]!.score < heap[c]!.score) c++;
            if (heap[i]!.score <= heap[c]!.score) break;
            [heap[i], heap[c]] = [heap[c]!, heap[i]!];
            i = c;
          }
        }
        return first.id;
      };
      const heuristic = (id: number) => Math.max(0, distanceToTarget(this.point(id), goal, goal.half) - goal.range);
      stamp[start] = gen;
      costs[start] = 0;
      parent[start] = -1;
      closed[start] = 0;
      push(start, heuristic(start));
      while (heap.length) {
        yield;
        const current = pop();
        if (stamp[current] === gen && closed[current]) continue;
        stamp[current] = gen;
        closed[current] = 1;
        if (heuristic(current) <= 0.001 && walkable(current)) {
          const path: Point[] = [];
          for (let id = current; id !== start; id = parent[id]!) path.push(this.point(id));
          path.reverse();
          return path;
        }
        const cx = current % SIZE, cz = Math.floor(current / SIZE);
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dz) continue;
          const x = cx + dx, z = cz + dz;
          if (x < 0 || z < 0 || x >= SIZE || z >= SIZE) continue;
          const next = z * SIZE + x;
          if ((stamp[next] === gen && closed[next]) || !walkable(next)) continue;
          if (dx && dz && (!walkable(cz * SIZE + x) || !walkable(z * SIZE + cx))) continue;
          if (!this.clearSegment(u, current === start ? u : this.point(current), this.point(next))) continue;
          const cost = costs[current]! + (dx && dz ? Math.SQRT2 : 1);
          if (stamp[next] === gen && cost >= costs[next]!) continue;
          stamp[next] = gen;
          costs[next] = cost;
          parent[next] = current;
          closed[next] = 0;
          push(next, cost + heuristic(next));
        }
      }
      return [];
    } finally {
      this.releasePathBuffers(buffers);
    }
  }

  move(u: Unit, x: number, z: number, speed: number, dt: number, range = INTERACTION.moveArrivalRange, half = 0): boolean {
    const goal = { x, z, range, half };
    if (distanceToTarget(u, goal, half) <= range) { this.cancelRoute(u.id); return true; }
    const key = `${x.toFixed(2)},${z.toFixed(2)},${range},${half}`;
    let route = this.routes.get(u.id);
    // Perseguição: deixe a busca terminar e avance antes de recalcular para um
    // alvo móvel. Cancelar a cada posição recebida impediria o vampiro de andar.
    const pursuing = route && route.order === u.order && u.order?.t === 'attack' &&
      (route.search || (route.points.length > 0 && this.state.tick < route.retryAt));
    if (!route || (route.key !== key && !pursuing) || (!route.search && !route.points.length && this.state.tick >= route.retryAt)) {
      this.cancelRoute(u.id);
      // Sem obstáculo, conserva o destino exato do clique.
      const direct = !half && this.canStand(u, x, z) && this.clearSegment(u, u, goal);
      const points = direct ? [{ x, z }] : [];
      route = { key, order: u.order, points, retryAt: this.state.tick + Math.ceil(INTERACTION.pathRetrySeconds * TICK_RATE) };
      this.routes.set(u.id, route);
      if (!direct) {
        // Captura a origem: a separação de unidades pode movê-la durante a busca.
        route.search = this.findPath({ ...u }, goal);
        this.searches.push(route);
        this.advanceSearches();
      }
    }
    u.activity = route.points.length ? 'moving' : 'blocked';
    let budget = speed * dt;
    while (budget > 0 && route.points.length) {
      const next = route.points[0]!;
      const distance = Math.hypot(next.x - u.x, next.z - u.z);
      const step = Math.min(distance, budget);
      const p = distance < 0.001 ? next : { x: u.x + (next.x - u.x) * step / distance, z: u.z + (next.z - u.z) * step / distance };
      if (!this.clearSegment(u, u, p)) {
        this.cancelRoute(u.id);
        break;
      }
      u.x = p.x;
      u.z = p.z;
      budget -= step;
      if (distance <= step + 0.001) route.points.shift();
      if (distanceToTarget(u, goal, half) <= range) return true;
    }
    return false;
  }

  private cancelRoute(id: number) {
    const route = this.routes.get(id);
    if (route?.search) {
      route.search.return([]);
      route.search = undefined;
    }
    this.routes.delete(id);
  }

  separate(units: Unit[]) {
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < units.length; i++) for (let j = i + 1; j < units.length; j++) {
        const a = units[i]!, b = units[j]!;
        const dx = b.x - a.x, dz = b.z - a.z;
        const d = Math.hypot(dx, dz);
        if (d >= INTERACTION.unitSeparation) continue;
        const nx = d > 0.001 ? dx / d : 1, nz = d > 0.001 ? dz / d : 0;
        const push = (INTERACTION.unitSeparation - d) / 2;
        const ax = a.x - nx * push, az = a.z - nz * push;
        const bx = b.x + nx * push, bz = b.z + nz * push;
        if (this.canStand(a, ax, az)) { a.x = ax; a.z = az; }
        if (this.canStand(b, bx, bz)) { b.x = bx; b.z = bz; }
      }
    }
  }
}
