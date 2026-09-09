import { BUILDING_SIZE, WORLD, INTERACTION, TICK_RATE } from './constants.js';
import { isWaterAt, type GameMap } from './mapgen.js';
import type { GameState, Unit } from './types.js';

export const UNIT_RADIUS = INTERACTION.unitRadius;
type Point = { x: number; z: number };
type Goal = Point & { range: number; half: number };
type Route = { key: string; points: Point[]; retryAt: number };
const SIZE = WORLD.tiles * WORLD.tileSize;

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

  constructor(private state: GameState, private map: GameMap) {}

  refresh() {
    const signature = this.state.buildings.map(b => `${b.id}:${b.kind}:${b.x}:${b.z}`).join('|') +
      '/' + this.state.nodes.filter(n => n.amount > 0).map(n => n.id).join(',');
    if (signature !== this.signature) {
      this.signature = signature;
      this.routes.clear();
      this.grids.clear();
    }
  }

  canStand(u: Pick<Unit, 'kind'>, x: number, z: number): boolean {
    const r = UNIT_RADIUS;
    if (!Number.isFinite(x) || !Number.isFinite(z) || Math.abs(x) + r >= WORLD.half || Math.abs(z) + r >= WORLD.half) return false;
    for (const dx of [-r, 0, r]) {
      for (const dz of [-r, 0, r]) if (isWaterAt(this.map, x + dx, z + dz)) return false;
    }
    for (const b of this.state.buildings) {
      if (b.kind === 'crypt' && u.kind === 'vampire') continue;
      if (b.kind === 'wall' && u.kind === 'worker') continue;
      const h = BUILDING_SIZE[b.kind] / 2 + r;
      if (Math.abs(x - b.x) < h && Math.abs(z - b.z) < h) return false;
    }
    for (const wall of this.map.obstacles) {
      if (Math.abs(x - wall.x) < wall.width / 2 + r && Math.abs(z - wall.z) < wall.depth / 2 + r) return false;
    }
    for (const n of this.state.nodes) {
      const radius = (n.kind === 'wood' ? INTERACTION.woodCollisionRadius : INTERACTION.goldCollisionRadius) + r;
      if (n.amount > 0 && Math.hypot(x - n.x, z - n.z) < radius) return false;
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
          this.routes.delete(u.id);
          return;
        }
      }
    }
  }

  private point(index: number): Point {
    return { x: index % SIZE - WORLD.half + 0.5, z: Math.floor(index / SIZE) - WORLD.half + 0.5 };
  }

  private findPath(u: Unit, goal: Goal): Point[] {
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
    const costs = new Float64Array(SIZE * SIZE).fill(Infinity);
    const parent = new Int32Array(SIZE * SIZE).fill(-1);
    const closed = new Uint8Array(SIZE * SIZE);
    // Min-heap para manter a busca limitada mesmo em mapas com rios e muros longos.
    const heap: Array<{ id: number; score: number }> = [];
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
    costs[start] = 0;
    push(start, heuristic(start));
    while (heap.length) {
      const current = pop();
      if (closed[current]) continue;
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
        if (closed[next] || !walkable(next)) continue;
        if (dx && dz && (!walkable(cz * SIZE + x) || !walkable(z * SIZE + cx))) continue;
        if (!this.clearSegment(u, current === start ? u : this.point(current), this.point(next))) continue;
        const cost = costs[current]! + (dx && dz ? Math.SQRT2 : 1);
        if (cost >= costs[next]!) continue;
        costs[next] = cost;
        parent[next] = current;
        push(next, cost + heuristic(next));
      }
    }
    return [];
  }

  move(u: Unit, x: number, z: number, speed: number, dt: number, range = INTERACTION.moveArrivalRange, half = 0): boolean {
    const goal = { x, z, range, half };
    if (distanceToTarget(u, goal, half) <= range) return true;
    const key = `${x.toFixed(2)},${z.toFixed(2)},${range},${half}`;
    let route = this.routes.get(u.id);
    if (!route || route.key !== key || (!route.points.length && this.state.tick >= route.retryAt)) {
      // Sem obstáculo, conserva o destino exato do clique.
      const points = !half && this.canStand(u, x, z) && this.clearSegment(u, u, goal)
        ? [{ x, z }] : this.findPath(u, goal);
      route = { key, points, retryAt: this.state.tick + Math.ceil(INTERACTION.pathRetrySeconds * TICK_RATE) };
      this.routes.set(u.id, route);
    }
    u.activity = route.points.length ? 'moving' : 'blocked';
    let budget = speed * dt;
    while (budget > 0 && route.points.length) {
      const next = route.points[0]!;
      const distance = Math.hypot(next.x - u.x, next.z - u.z);
      const step = Math.min(distance, budget);
      const p = distance < 0.001 ? next : { x: u.x + (next.x - u.x) * step / distance, z: u.z + (next.z - u.z) * step / distance };
      if (!this.clearSegment(u, u, p)) {
        this.routes.delete(u.id);
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
