import { gridFootprintFree } from './occupancy-grid.js';
import { unitFootprintSize, BUILDING_SIZE, BUILD_TILE_SIZE, WORLD, INTERACTION, TICK_RATE } from './constants.js';
import type { GameMap } from './mapgen.js';
import type { GameState, Unit } from './types.js';
import { insidePlayableBoundary } from './map-boundary.js';
import { rockIntersectsUnit, type RockCollider } from './rock-collision.js';

export const UNIT_RADIUS = unitFootprintSize('worker')/2;

/**
 * Raio de ocupação por tipo (FT5): humano 1×1 tile, vampiro 2×2 tiles.
 * Usado na colisão contínua e na validação de construção.
 */
export function unitRadius(kind: string): number {
  return unitFootprintSize(kind)/2;
}
type Point = { x: number; z: number };
type Goal = Point & { range: number; half: number };
type Route = { key: string; order: Unit['order']; points: Point[]; retryAt: number; resolved?:Point; search?: Generator<void, Point[], void> };
type Collider = Point & { halfX: number; halfZ: number; radius?: number; kind?: string; rock?:RockCollider };

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
// Half a construction tile reaches both 1x1 and 2x2 corridor centerlines.
const PATH_STEP = BUILD_TILE_SIZE / 2;
const PATH_HALF = Math.ceil(WORLD.half / PATH_STEP) * PATH_STEP;
const SIZE = Math.round(PATH_HALF * 2 / PATH_STEP) + 1;
const pathWorld = (index: number) => index * PATH_STEP - PATH_HALF;
const pathCell = (position: number) => Math.round((position + PATH_HALF) / PATH_STEP);
const BUCKET_SIZE = 8;
const BUCKET_COUNT = Math.ceil(WORLD.half * 2 / BUCKET_SIZE);
// Orçamento compartilhado por todas as unidades da sala, por tick. As expansões
// ficaram baratas o bastante (uma amostra por vizinho) para caminhos de labirinto
// ficarem prontos em poucos ticks, em vez de segundos parados.
const PATH_STEPS_PER_TICK = 2048;
// Rede de segurança: mesmo com expansões caras, não gastar mais que isto por
// tick em busca de caminhos (deixa o restante para os próximos ticks).
const PATH_MS_PER_TICK = 12;
// Teto de expansões de uma busca. Um destino inalcançável (fora do labirinto,
// por exemplo) não pode drenar o orçamento do tick para sempre; ao estourar, a
// unidade segue até a célula alcançável mais próxima do destino.
const PATH_MAX_EXPANSIONS = SIZE * SIZE;

/** Distância até a borda de um prédio, ou até um ponto. */
export function distanceToTarget(p: Point, target: Point, half = 0): number {
  // Math.sqrt é ~5x mais rápido que Math.hypot neste caminho quente.
  const dx = Math.max(0, Math.abs(p.x - target.x) - half);
  const dz = Math.max(0, Math.abs(p.z - target.z) - half);
  return Math.sqrt(dx * dx + dz * dz);
}

/** Navegação por sala. A* em grade de 1u, sem cortar quinas; movimento contínuo validado. */
export class Navigation {
  private routes = new Map<number, Route>();
  private bCount = 0;
  private bIdSum = 0;
  private nCount = 0;
  private nIdSum = 0;
  private grids = new Map<string, Uint8Array>();
  private colliders: Collider[][] = [];
  private searches: Route[] = [];
  private searchBudget = PATH_STEPS_PER_TICK;
  private searchStart = 0;
  private indexed = false;
  private separationBuckets = new Map<number, number[]>();
  private pathPool: PathBuffers[] = [];
  private pathGen = 0;

  constructor(private state: GameState, private map: GameMap) {}

  refresh() {
    // Assinatura numérica (contagem + soma de ids): evita montar uma string com
    // todos os prédios e nós a cada tick. Posições/tipos não mudam; o que muda é
    // adicionar/remover prédio ou esvaziar um nó.
    let bCount = 0, bIdSum = 0, nCount = 0, nIdSum = 0;
    for (const b of this.state.buildings) { bCount++; bIdSum += b.id; }
    for (const n of this.state.nodes) if (n.amount > 0) { nCount++; nIdSum += n.id; }
    if (bCount !== this.bCount || bIdSum !== this.bIdSum || nCount !== this.nCount || nIdSum !== this.nIdSum) {
      this.bCount = bCount; this.bIdSum = bIdSum; this.nCount = nCount; this.nIdSum = nIdSum;
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
    this.searchStart = performance.now();
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
    this.colliders.length = 0;
    const add = (c: Collider) => {
      const margin=INTERACTION.vampireUnitRadius;
      const minX = Math.max(0, Math.floor((c.x - c.halfX - margin + WORLD.half) / BUCKET_SIZE));
      const maxX = Math.min(BUCKET_COUNT - 1, Math.floor((c.x + c.halfX + margin + WORLD.half) / BUCKET_SIZE));
      const minZ = Math.max(0, Math.floor((c.z - c.halfZ - margin + WORLD.half) / BUCKET_SIZE));
      const maxZ = Math.min(BUCKET_COUNT - 1, Math.floor((c.z + c.halfZ + margin + WORLD.half) / BUCKET_SIZE));
      for (let z = minZ; z <= maxZ; z++) for (let x = minX; x <= maxX; x++) {
        const key = z * BUCKET_COUNT + x;
        let bucket = this.colliders[key];
        if (!bucket) this.colliders[key] = bucket = [];
        bucket.push(c);
      }
    };
    for (const b of this.state.buildings) {
      const half = BUILDING_SIZE[b.kind] / 2;
      add({ x: b.x, z: b.z, halfX: half, halfZ: half, kind: b.kind });
    }
    for (const wall of [...this.map.obstacles, ...(this.map.treeObstacles ?? [])]) {
      add({ x: wall.x, z: wall.z, halfX: wall.width / 2, halfZ: wall.depth / 2 });
    }
    for (const rock of this.map.rockObstacles ?? []) {
      const c=Math.abs(Math.cos(rock.rotation)),s=Math.abs(Math.sin(rock.rotation));
      add({x:rock.x,z:rock.z,halfX:(rock.width*c+rock.depth*s)/2,halfZ:(rock.width*s+rock.depth*c)/2,rock});
    }
    for (const n of this.state.nodes) {
      if (n.amount <= 0) continue;
      const radius = n.kind === 'wood' ? INTERACTION.woodCollisionRadius : INTERACTION.goldCollisionRadius;
      add({ x: n.x, z: n.z, halfX: radius, halfZ: radius, radius });
    }
    this.indexed = true;
  }

  private advanceSearches() {
    while (this.searchBudget > 0 && this.searches.length) {
      // Checa o relógio a cada 32 expansões para não pagar o custo por passo.
      if ((this.searchBudget & 31) === 0 && performance.now() - this.searchStart > PATH_MS_PER_TICK) break;
      const route = this.searches.shift()!;
      if (!route.search) continue;
      this.searchBudget--;
      const next = route.search.next();
      if (next.done) {
        route.points = next.value;
        route.resolved=next.value.at(-1);
        route.search = undefined;
        route.retryAt = this.state.tick + Math.ceil(INTERACTION.pathRetrySeconds * TICK_RATE);
      } else {
        // Rodízio: uma busca sem saída não impede as outras de avançar.
        this.searches.push(route);
      }
    }
  }

  canStand(u: Pick<Unit, 'kind'>, x: number, z: number): boolean {
    const r = unitRadius(u.kind);
    const half = WORLD.half;
    if (!insidePlayableBoundary(this.map,x,z,r)) return false;
    if (!gridFootprintFree(this.map,x,z,r)) return false;
    if (!this.indexed) this.rebuildColliders();
    const key = Math.floor((z + half) / BUCKET_SIZE) * BUCKET_COUNT + Math.floor((x + half) / BUCKET_SIZE);
    const bucket = this.colliders[key];
    if (bucket) for (const c of bucket) {
      // O Vampiro pode entrar na Cripta (sua base); os demais respeitam o bloco.
      if (c.kind === 'crypt' && u.kind === 'vampire') continue;
      const dx = x - c.x, dz = z - c.z;
      const hit = c.rock ? rockIntersectsUnit(c.rock,x,z,r) : c.radius !== undefined
        ? dx * dx + dz * dz < (c.radius + r) * (c.radius + r)
        : Math.abs(dx) < c.halfX + r - 1e-7 && Math.abs(dz) < c.halfZ + r - 1e-7;
      if (hit) return false;
    }
    return true;
  }

  private clearSegment(u: Unit, a: Point, b: Point): boolean {
    return this.clearSegmentXZ(u, a.x, a.z, b.x, b.z);
  }

  private clearSegmentXZ(u: Unit, ax: number, az: number, bx: number, bz: number): boolean {
    const dx = bx - ax, dz = bz - az;
    const steps = Math.max(1, Math.ceil(Math.sqrt(dx * dx + dz * dz) / 0.25));
    for (let i = 1; i <= steps; i++) {
      if (!this.canStand(u, ax + dx * i / steps, az + dz * i / steps)) return false;
    }
    return true;
  }

  /** Resolve spawn/construção sobre unidade antes de calcular caminhos. */
  placeSpawn(u:Unit, placed:readonly Unit[]):boolean {
    const free=(x:number,z:number)=>this.canStand(u,x,z) && placed.every(other=>
      Math.hypot(x-other.x,z-other.z)>=unitRadius(u.kind)+unitRadius(other.kind));
    if(free(u.x,u.z)) return true;
    const sx=Math.round(u.x/PATH_STEP),sz=Math.round(u.z/PATH_STEP);
    const max=Math.ceil((WORLD.half+Math.max(Math.abs(u.x),Math.abs(u.z)))/PATH_STEP)+1;
    for(let ring=1;ring<=max;ring++) {
      for(let offset=-ring;offset<=ring;offset++) {
        const candidates=[[sx+offset,sz-ring],[sx+offset,sz+ring]];
        if(Math.abs(offset)<ring) candidates.push([sx-ring,sz+offset],[sx+ring,sz+offset]);
        for(const [gx,gz] of candidates) {
          const x=gx!*PATH_STEP,z=gz!*PATH_STEP;
          if(free(x,z)) { u.x=x;u.z=z;return true; }
        }
      }
    }
    return false;
  }

  recover(u: Unit) {
    if (this.canStand(u, u.x, u.z)) return;
    // Sample the navigation lattice: angular probes almost never hit the
    // exact centerline of a one-tile corridor.
    let best:Point|undefined,distance=Infinity;
    const sx=pathCell(u.x),sz=pathCell(u.z);
    for(let dz=-24;dz<=24;dz++)for(let dx=-24;dx<=24;dx++) {
      const x=pathWorld(sx+dx),z=pathWorld(sz+dz),d=Math.hypot(x-u.x,z-u.z);
      if(d<distance && this.canStand(u,x,z)){best={x,z};distance=d;}
    }
    if(best){u.x=best.x;u.z=best.z;this.cancelRoute(u.id);}
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
          // Sem alocar objeto de ponto: o índice carrega x,z da grade.
          const px = pathWorld(index % SIZE);
          const pz = pathWorld((index / SIZE) | 0);
          grid![index] = this.canStand(u, px, pz) ? 1 : 2;
        }
        return grid![index] === 1;
      };
      if(u.order?.t==='move' && !this.canStand(u,goal.x,goal.z)) {
        goal={...goal,x:Math.max(-WORLD.half,Math.min(WORLD.half,goal.x)),z:Math.max(-WORLD.half,Math.min(WORLD.half,goal.z))};
        const gx=Math.max(0,Math.min(SIZE-1,pathCell(goal.x))),gz=Math.max(0,Math.min(SIZE-1,pathCell(goal.z)));
        let best:Point|undefined,bestDistance=Infinity;
        for(let ring=0;ring<SIZE;ring++) {
          const perimeter:Array<[number,number]>=[];
          if(ring===0)perimeter.push([0,0]);
          else for(let offset=-ring;offset<=ring;offset++) {
            perimeter.push([offset,-ring],[offset,ring]);
            if(Math.abs(offset)<ring)perimeter.push([-ring,offset],[ring,offset]);
          }
          for(const [dx,dz] of perimeter) {
            const x=gx+dx,z=gz+dz;if(x<0||z<0||x>=SIZE||z>=SIZE)continue;
            yield;
            if(!walkable(z*SIZE+x))continue;
            const px=pathWorld(x),pz=pathWorld(z),distance=Math.hypot(px-goal.x,pz-goal.z);
            if(distance<bestDistance){best={x:px,z:pz};bestDistance=distance;}
          }
          if(best && ring*PATH_STEP>bestDistance+PATH_STEP)break;
        }
        // Keep the clicked position as the reference. Equally close cells on
        // different sides of an obstacle are alternative goals, not a single
        // arbitrary cell that may belong to a disconnected region.
        if(best)goal={...goal,range:bestDistance+1e-6};
      }
      // Connect the actual position to a valid navigation sample, rather than
      // seeding a blocked rounded coordinate beside a one-tile corridor.
      let sx=pathCell(u.x),sz=pathCell(u.z),startDistance=Infinity;
      for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++) {
        const x=pathCell(u.x)+dx,z=pathCell(u.z)+dz;
        if(x<0||z<0||x>=SIZE||z>=SIZE||!walkable(z*SIZE+x))continue;
        const distance=Math.hypot(pathWorld(x)-u.x,pathWorld(z)-u.z);
        if(distance<startDistance && this.clearSegmentXZ(u,u.x,u.z,pathWorld(x),pathWorld(z))) {
          sx=x;sz=z;startDistance=distance;
        }
      }
      if(!Number.isFinite(startDistance))return [];
      const start=sz*SIZE+sx;
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
      const heuristic = (id: number) => {
        const px = pathWorld(id % SIZE);
        const pz = pathWorld((id / SIZE) | 0);
        const ddx = Math.max(0, Math.abs(px - goal.x) - goal.half);
        const ddz = Math.max(0, Math.abs(pz - goal.z) - goal.half);
        return Math.max(0, Math.sqrt(ddx * ddx + ddz * ddz) - goal.range);
      };
      const buildPath = (endId: number): Point[] => {
        const path: Point[] = [];
        for (let id = endId; id !== start; id = parent[id]!) {
          path.push({ x: pathWorld(id % SIZE), z: pathWorld((id / SIZE) | 0) });
        }
        path.push({x:pathWorld(sx),z:pathWorld(sz)});
        path.reverse();
        const end=path.at(-1)!;
        if(u.order?.t==='move' && this.canStand(u,goal.x,goal.z) && this.clearSegmentXZ(u,end.x,end.z,goal.x,goal.z))path.push({x:goal.x,z:goal.z});
        return path;
      };
      stamp[start] = gen;
      costs[start] = 0;
      parent[start] = -1;
      closed[start] = 0;
      // Melhor célula alcançável visitada, para quando o destino exato não existe
      // (ponto em outra região, dentro de parede/lago). Assim a unidade anda até
      // o mais perto possível em vez de ficar parada.
      let bestId = start;
      let bestH = heuristic(start);
      let expansions = 0;
      push(start, heuristic(start));
      while (heap.length) {
        yield;
        const current = pop();
        if (stamp[current] === gen && closed[current]) continue;
        if (expansions++ >= PATH_MAX_EXPANSIONS) break;
        stamp[current] = gen;
        closed[current] = 1;
        const h = heuristic(current);
        if (h < bestH) { bestH = h; bestId = current; }
        if (h <= 0.001 && walkable(current)) return buildPath(current);
        const cx = current % SIZE, cz = (current / SIZE) | 0;
        const cwx = pathWorld(cx);
        const cwz = pathWorld(cz);
        // A fractional click is not a lattice node. Connect the final short
        // segment explicitly instead of exhausting the entire map looking
        // for an integer coordinate within 0.01 of that click.
        if(u.order?.t==='move' && !goal.half && h<=PATH_STEP*Math.SQRT2 &&
          this.canStand(u,goal.x,goal.z) && this.clearSegmentXZ(u,cwx,cwz,goal.x,goal.z))return buildPath(current);
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dz) continue;
          const x = cx + dx, z = cz + dz;
          if (x < 0 || z < 0 || x >= SIZE || z >= SIZE) continue;
          const next = z * SIZE + x;
          if ((stamp[next] === gen && closed[next]) || !walkable(next)) continue;
          if (dx && dz && (!walkable(cz * SIZE + x) || !walkable(z * SIZE + cx))) continue;
          // As duas células já são caminháveis (com o raio da unidade), então a
          // única amostra que falta é o meio do passo — bem mais barato que o
          // clearSegment completo por vizinho. O movimento contínuo em `move()`
          // continua validando o trajeto real antes de andar.
          if (!this.clearSegmentXZ(u,cwx,cwz,pathWorld(x),pathWorld(z))) continue;
          const cost = costs[current]! + (dx && dz ? Math.SQRT2 : 1)*PATH_STEP;
          if (stamp[next] === gen && cost >= costs[next]!) continue;
          stamp[next] = gen;
          costs[next] = cost;
          parent[next] = current;
          closed[next] = 0;
          push(next, cost + heuristic(next));
        }
      }
      // Sem caminho exato: aproxima o máximo possível do destino.
      return buildPath(bestId);
    } finally {
      this.releasePathBuffers(buffers);
    }
  }

  move(u: Unit, x: number, z: number, speed: number, dt: number, range = INTERACTION.moveArrivalRange, half = 0): boolean {
    const movement=u.order?.t==='move';
    if(movement)range=0.01;
    const goal = { x, z, range, half };
    if (distanceToTarget(u, goal, half) <= range && (!movement || this.canStand(u,x,z))) { this.cancelRoute(u.id); return true; }
    const key = `${x.toFixed(2)},${z.toFixed(2)},${range},${half}`;
    let route = this.routes.get(u.id);
    if(movement && route?.order===u.order && route.key===key && !route.search && route.resolved && !route.points.length &&
      Math.hypot(u.x-route.resolved.x,u.z-route.resolved.z)<=0.01) {this.cancelRoute(u.id);return true;}
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
    if(movement && !route.search && route.resolved && Math.hypot(u.x-route.resolved.x,u.z-route.resolved.z)<=0.01) {
      this.cancelRoute(u.id);return true;
    }
    u.activity = route.points.length ? 'moving' : 'blocked';
    let budget = speed * dt;
    while (budget > 0 && route.points.length) {
      const next = route.points[0]!;
      const ddx = next.x - u.x, ddz = next.z - u.z;
      const distance = Math.sqrt(ddx * ddx + ddz * ddz);
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
    const count = units.length;
    if (count < 2) return;
    // Célula = maior diâmetro (Vampiro). A separação de cada par é a soma dos
    // raios de ocupação (FT5): humano+humano = 2, vampiro+humano = 3 etc.
    const cell = INTERACTION.vampireUnitRadius * 2;
    const cols = Math.ceil((WORLD.half * 2) / cell) + 1;
    const colOf = (x: number) => Math.max(0, Math.min(cols - 1, Math.floor((x + WORLD.half) / cell)));
    const rowOf = (z: number) => Math.max(0, Math.min(cols - 1, Math.floor((z + WORLD.half) / cell)));
    const buckets = this.separationBuckets;
    for (let pass = 0; pass < 3; pass++) {
      buckets.clear();
      for (let i = 0; i < count; i++) {
        const u = units[i]!;
        const key = rowOf(u.z) * cols + colOf(u.x);
        const bucket = buckets.get(key);
        if (bucket) bucket.push(i);
        else buckets.set(key, [i]);
      }
      for (let i = 0; i < count; i++) {
        const a = units[i]!;
        const cx = colOf(a.x), cz = rowOf(a.z);
        for (let dz = -1; dz <= 1; dz++) {
          const nz = cz + dz;
          if (nz < 0 || nz >= cols) continue;
          for (let dx = -1; dx <= 1; dx++) {
            const nx = cx + dx;
            if (nx < 0 || nx >= cols) continue;
            const bucket = buckets.get(nz * cols + nx);
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue;
              const b = units[j]!;
              const ddx = b.x - a.x, ddz = b.z - a.z;
              const d = Math.sqrt(ddx * ddx + ddz * ddz);
              // Separação proporcional ao tamanho, mas mantendo a folga base de
              // `unitSeparation` para os humanos (senão unidades ficam presas).
              const sep = (unitRadius(a.kind) + unitRadius(b.kind)) * (INTERACTION.unitSeparation / (2 * UNIT_RADIUS));
              if (d >= sep) continue;
              const nxv = d > 0.001 ? ddx / d : 1, nzv = d > 0.001 ? ddz / d : 0;
              const push = (sep - d) / 2;
              const ax = a.x - nxv * push, az = a.z - nzv * push;
              const bx = b.x + nxv * push, bz = b.z + nzv * push;
              if (this.canStand(a, ax, az)) { a.x = ax; a.z = az; }
              if (this.canStand(b, bx, bz)) { b.x = bx; b.z = bz; }
            }
          }
        }
      }
    }
  }
}
