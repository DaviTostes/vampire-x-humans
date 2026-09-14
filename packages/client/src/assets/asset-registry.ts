import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CLIFF_HEIGHT } from '@vampire/shared';

export { CLIFF_HEIGHT };

export type AnimationState = 'idle' | 'walking' | 'working' | 'attack';

interface VisualAnimationDefinition {
  name: AnimationState;
  src: string;
  /** Mantém o deslocamento no mundo sob controle da simulação, não do clip do Mixamo. */
  inPlace?: boolean;
  timeScale?: number;
}

interface VisualAssetDefinition {
  id: string;
  src: string;
  targetHeight?: number;
  rotationY?: number;
  /** Deslocamento somente da malha visual; não é sobrescrito por scene.ts. */
  visualOffsetY?: number;
  animations?: readonly VisualAnimationDefinition[];
}

interface LoadedAsset {
  definition: VisualAssetDefinition;
  scene: THREE.Group;
  clips: Map<AnimationState, THREE.AnimationClip>;
  timeScales: Map<AnimationState, number>;
}

interface PropAssetDefinition {
  id: string;
  src: string;
  /** Altura alvo em unidades de mundo; o modelo é escalado e apoiado em y=0. */
  targetHeight?: number;
  rotationY?: number;
}

/**
 * Modelos de relevo (GLB) para compor o terreno (falésias, mesas, rampas).
 * Diferente dos props, são normalizados por footprint: a maior dimensão
 * horizontal vira 1 e a base fica em y=0, de modo que o posicionamento define
 * largura/profundidade/altura por instância.
 */
interface TerrainAssetDefinition {
  id: string;
  src: string;
  /** Gira o modelo para alinhar a face vertical à encosta. */
  rotationY?: number;
}

interface LoadedProp {
  definition: PropAssetDefinition;
  /** Cena já normalizada (base em y=0 e centralizada em x/z). */
  template: THREE.Group;
}

/** Progresso do preload: assets concluídos/ total, para a tela de loading. */
export interface PreloadProgress {
  loaded: number;
  total: number;
}

interface BuildingAssetDefinition {
  /** Kind da construção (ex.: 'goldMine'). */
  kind: string;
  src: string;
  /** Nível mínimo (inclusive) em que este modelo é usado. Ausente = sem piso de nível. */
  minLevel?: number;
  /** Nível máximo (inclusive) em que este modelo é usado. Ausente = sem teto de nível. */
  maxLevel?: number;
  /** Altura alvo em unidades de mundo; o modelo é escalado e apoiado em y=0. */
  targetHeight?: number;
  rotationY?: number;
  /** Multiplicador extra aplicado após encaixar o modelo no footprint da construção. */
  scale?: number;
}

/**
 * Escolhe o modelo aplicável a um nível: prioriza a faixa exata (maior `minLevel`
 * que ainda cabe) e só recorre ao modelo-base (sem faixa) quando nenhuma faixa cobre
 * o nível — ex.: a Torre 4-7 mantém o modelo antigo enquanto não há variação própria.
 */
function pickBuildingDefinition(
  definitions: readonly BuildingAssetDefinition[],
  level: number,
): BuildingAssetDefinition | null {
  let best: BuildingAssetDefinition | null = null;
  let fallback: BuildingAssetDefinition | null = null;
  for (const definition of definitions) {
    const { minLevel, maxLevel } = definition;
    if (minLevel === undefined && maxLevel === undefined) {
      fallback ??= definition;
      continue;
    }
    if (minLevel !== undefined && level < minLevel) continue;
    if (maxLevel !== undefined && level > maxLevel) continue;
    if (!best || (definition.minLevel ?? -Infinity) > (best.minLevel ?? -Infinity)) best = definition;
  }
  return best ?? fallback ?? definitions[0] ?? null;
}

const VISUAL_ASSETS: readonly VisualAssetDefinition[] = [
  {
    id: 'unit:vampire:hero',
    // Versão rigada sem clip embutido: é a base mais limpa para receber os 3 clips externos.
    src: 'assets/characters/vampire/mixamo/vampire_rigged.fbx',
    targetHeight: 3.45,
    rotationY: 0,
    visualOffsetY: -2,
    animations: [
      { name: 'idle', src: 'assets/characters/vampire/mixamo/idle.fbx', inPlace: true },
      { name: 'walking', src: 'assets/characters/vampire/mixamo/walking.fbx', inPlace: true },
      { name: 'attack', src: 'assets/characters/vampire/mixamo/attack.fbx', inPlace: true },
    ],
  },
  {
    id: 'unit:human:hero',
    // Blueguard Sentinel rigado no Mixamo, sem animação embutida.
    src: 'assets/characters/humans/mixamo/human_rigged.fbx',
    targetHeight: 2.85,
    rotationY: 0,
    visualOffsetY: -1,
    animations: [
      { name: 'idle', src: 'assets/characters/humans/mixamo/idle.fbx', inPlace: true },
      { name: 'walking', src: 'assets/characters/humans/mixamo/walking.fbx', inPlace: true },
      { name: 'working', src: 'assets/characters/humans/mixamo/working.fbx', inPlace: true },
    ],
  },
  {
    id: 'unit:worker:peon',
    // Adventurer: visual do Peão/Worker recrutado. O FBX base não possui clip embutido.
    src: 'assets/characters/workers/mixamo/worker_rigged.fbx',
    targetHeight: 2.65,
    rotationY: 0,
    visualOffsetY: -0.95,
    animations: [
      { name: 'idle', src: 'assets/characters/workers/mixamo/idle.fbx', inPlace: true },
      { name: 'walking', src: 'assets/characters/workers/mixamo/walking.fbx', inPlace: true },
      // O clip de trabalho da V3 usa o mesmo esqueleto Mixamo e cobre coleta/construção/reparo.
      { name: 'working', src: 'assets/characters/humans/mixamo/working.fbx', inPlace: true },
      { name: 'attack', src: 'assets/characters/workers/mixamo/attack.fbx', inPlace: true },
    ],
  },
];

/** Modelos estáticos do cenário (GLB). Usados por recursos de pedra e árvore. */
const PROP_ASSETS: readonly PropAssetDefinition[] = [
  { id: 'prop:rock:stone-cluster', src: 'assets/environment/stone_cluster.glb', targetHeight: 2.35 },
  { id: 'prop:tree:evergreen', src: 'assets/environment/emerald_evergreen.glb', targetHeight: 6.1 },
];

/**
 * Modelos de relevo usados para compor o terreno: a crista de falésia (`cliff`)
 * forma as encostas contínuas, `mesa`/`moss` dão massa aos maciços e `ascent` é
 * a rampa/degraus de acesso. Ver `terrainInstance` e o posicionamento em scene.ts.
 */
const TERRAIN_ASSETS: readonly TerrainAssetDefinition[] = [
  { id: 'terrain:cliff', src: 'assets/environment/terrain/plateau_a.glb' },
  { id: 'terrain:mesa', src: 'assets/environment/terrain/plateau_b.glb' },
  { id: 'terrain:moss', src: 'assets/environment/terrain/plateau_moss.glb' },
  { id: 'terrain:ascent', src: 'assets/environment/terrain/slope_ascent.glb' },
];

/**
 * Altura física única do degrau/platô (vem do `game.config.ts` via shared):
 * todo módulo de cliff tem base em Y=0 e topo visível em Y=CLIFF_HEIGHT — a
 * mesma altura do terreno elevado.
 */
export type CliffRole = 'straight' | 'outerCorner' | 'innerCorner' | 'stairs';

/**
 * Registro EXPLÍCITO dos módulos de cliff. A função não é inferida do nome do
 * arquivo Meshy: cada entrada declara qual arquivo é cada papel e traz a
 * calibração própria (rotationY/scale/offset) — sem normalização automática por
 * bounding box. `scale`/`offset` foram medidos a partir dos bounds reais dos
 * GLBs para que a base caia em Y=0 e o topo em Y=CLIFF_HEIGHT; só X/Z (largura e
 * profundidade) variam, a altura é preservada. `length`/`depth` são a pegada em
 * unidades de mundo usada no encaixe por aresta.
 */
export interface CliffModuleDefinition {
  role: CliffRole;
  src: string;
  rotationY: number;
  scale: [number, number, number];
  offset: [number, number, number];
  length: number;
  depth: number;
}

export const CLIFF_MODULES: readonly CliffModuleDefinition[] = [
  {
    role: 'straight',
    src: 'assets/environment/terrain/plateau_a.glb',
    rotationY: 0,
    // Escala UNIFORME calibrada pela ALTURA DA SUPERFÍCIE DE TOPO (não pelo
    // bounding box): o topo visível fica exatamente em CLIFF_HEIGHT e a base em 0.
    scale: [7.0765, 7.0765, 7.0765],
    offset: [0.0130, 3.0939, 0.0175],
    length: 13.36,
    depth: 6.60,
  },
  {
    role: 'outerCorner',
    src: 'assets/environment/terrain/plateau_b.glb',
    rotationY: 0,
    scale: [6.8375, 6.8375, 6.8375],
    offset: [-0.0395, 3.1539, 0.0500],
    length: 12.86,
    depth: 11.72,
  },
  {
    role: 'innerCorner',
    src: 'assets/environment/terrain/plateau_moss.glb',
    rotationY: 0,
    scale: [6.1659, 6.1659, 6.1659],
    offset: [0.0153, 3.1575, 0.0104],
    length: 11.70,
    depth: 8.75,
  },
  {
    role: 'stairs',
    src: 'assets/environment/terrain/slope_ascent.glb',
    rotationY: 0,
    // Mantém a pegada pequena aprovada em X/Z; o Y é calibrado pelo último
    // degrau (topo visível) para bater com CLIFF_HEIGHT.
    scale: [3.4754, 8.1587, 4.2735],
    offset: [0.0023, 3.1744, 0.0110],
    length: 4.50,
    depth: 8.12,
  },
];

/** Modelos GLB que substituem o modelo procedural de uma construção. */
// O encaixe de escala é feito pelo footprint em createBuildingModel.
// Vários modelos podem ter o mesmo `kind`: as faixas `minLevel`/`maxLevel` definem
// em que níveis cada um aparece. O modelo sem faixa é o fallback (níveis sem variação).
// As faixas são carregadas sob demanda (só o modelo do nível 1 entra no preload).
const BUILDING_ASSETS: readonly BuildingAssetDefinition[] = [
  { kind: 'goldMine', src: 'assets/buildings/gold_mine.glb' },
  { kind: 'taverna', src: 'assets/buildings/taverna.glb' },
  // Capela gárgula: novo modelo da Cripta (base do Vampiro). O multiplicador
  // deixa a base visualmente maior que o footprint padrão.
  { kind: 'crypt', src: 'assets/buildings/crypt.glb', scale: 1.5 },
  // Banco: o modelo muda por faixa de nível (1-3, 4-6, 7-8).
  { kind: 'bank', src: 'assets/buildings/bank.glb' },
  { kind: 'bank', src: 'assets/buildings/bank_1_2_3.glb', minLevel: 1, maxLevel: 3 },
  { kind: 'bank', src: 'assets/buildings/bank_4_5_6.glb', minLevel: 4, maxLevel: 6 },
  { kind: 'bank', src: 'assets/buildings/bank_7_8.glb', minLevel: 7, maxLevel: 8 },
  // Muro: faixas 1-5, 6-10 e 11. O modelo é baixo; o multiplicador o traz para o
  // tamanho de um portão (mesma convenção do wall.glb antigo).
  { kind: 'wall', src: 'assets/buildings/wall.glb', scale: 3 },
  { kind: 'wall', src: 'assets/buildings/wall_1_2_3_4_5.glb', minLevel: 1, maxLevel: 5, scale: 3 },
  { kind: 'wall', src: 'assets/buildings/wall_6_7_8_9_10.glb', minLevel: 6, maxLevel: 10, scale: 3 },
  { kind: 'wall', src: 'assets/buildings/wall_11.glb', minLevel: 11, maxLevel: 11, scale: 3 },
  // Mercado: nv1 (reaproveitado no nv2) e nv3.
  { kind: 'market', src: 'assets/buildings/market.glb' },
  { kind: 'market', src: 'assets/buildings/market_1.glb', minLevel: 1, maxLevel: 2 },
  { kind: 'market', src: 'assets/buildings/market3.glb', minLevel: 3, maxLevel: 3 },
  // Torre: nv1-3 com modelo novo; nv4-7 seguem no modelo atual até haver variação.
  { kind: 'tower', src: 'assets/buildings/tower.glb' },
  { kind: 'tower', src: 'assets/buildings/torre_1_2_3.glb', minLevel: 1, maxLevel: 3 },
];

function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}

function prepareMeshes(root: THREE.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.castShadow = true;
    object.receiveShadow = true;
    object.frustumCulled = true;
  });
}

/**
 * Converte clips do Mixamo para "in place". O servidor/snapshot já define X/Z da unidade;
 * manter root motion no FBX causaria avanço/deslizamento adicional da malha.
 */
function makeClipInPlace(source: THREE.AnimationClip): THREE.AnimationClip {
  const clip = source.clone();
  for (const track of clip.tracks) {
    if (!(track instanceof THREE.VectorKeyframeTrack)) continue;
    if (!/(?:Hips|Root)\.position$/i.test(track.name)) continue;
    const values = track.values;
    if (values.length < 3) continue;
    const x = values[0]!;
    const z = values[2]!;
    for (let i = 0; i + 2 < values.length; i += 3) {
      values[i] = x;
      values[i + 2] = z;
    }
  }
  clip.optimize();
  return clip;
}

function disposeAnimationScene(root: THREE.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry?.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      for (const value of Object.values(material as unknown as Record<string, unknown>)) {
        if (value instanceof THREE.Texture) value.dispose();
      }
      material.dispose();
    }
  });
}

/**
 * Normaliza o filho visual, nunca o Group lógico da unidade. Assim GameScene pode atualizar
 * g.position.y pelo relevo a cada frame sem desfazer o grounding do personagem.
 */
function normalizeVisual(visual: THREE.Group, definition: VisualAssetDefinition) {
  visual.updateMatrixWorld(true);
  const initialBounds = new THREE.Box3().setFromObject(visual);
  const size = initialBounds.getSize(new THREE.Vector3());

  if (definition.targetHeight && size.y > 1e-6) {
    visual.scale.multiplyScalar(definition.targetHeight / size.y);
  }
  visual.rotation.y += definition.rotationY ?? 0;
  visual.updateMatrixWorld(true);

  const groundedBounds = new THREE.Box3().setFromObject(visual);
  if (Number.isFinite(groundedBounds.min.y)) visual.position.y -= groundedBounds.min.y;
  visual.position.y += definition.visualOffsetY ?? 0;
  visual.updateMatrixWorld(true);
}

/**
 * Normaliza props estáticos: escala para a altura alvo e apoia a base em y=0,
 * centralizando em x/z para que posicionamento e instanciamento usem o centro no chão.
 */
function normalizeProp(visual: THREE.Group, definition: { targetHeight?: number; rotationY?: number }) {
  visual.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(visual).getSize(new THREE.Vector3());
  if (definition.targetHeight && size.y > 1e-6) visual.scale.multiplyScalar(definition.targetHeight / size.y);
  visual.rotation.y += definition.rotationY ?? 0;
  visual.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(visual);
  visual.position.x -= (bounds.min.x + bounds.max.x) * 0.5;
  visual.position.z -= (bounds.min.z + bounds.max.z) * 0.5;
  visual.position.y -= bounds.min.y;
  visual.updateMatrixWorld(true);
}

/**
 * Normaliza um modelo de relevo: a maior dimensão horizontal vira 1, a base
 * apoia em y=0 e o centro em x/z é o centro do chão. Assim cada instância
 * escolhe largura/profundidade/altura em unidades de mundo e escala por eixo.
 */
function normalizeTerrain(visual: THREE.Group, definition: { rotationY?: number }) {
  visual.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(visual).getSize(new THREE.Vector3());
  const footprint = Math.max(size.x, size.z);
  if (footprint > 1e-6) visual.scale.multiplyScalar(1 / footprint);
  visual.rotation.y += definition.rotationY ?? 0;
  visual.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(visual);
  visual.position.x -= (bounds.min.x + bounds.max.x) * 0.5;
  visual.position.z -= (bounds.min.z + bounds.max.z) * 0.5;
  visual.position.y -= bounds.min.y;
  visual.updateMatrixWorld(true);
}

/** Concatena as malhas de um prop em uma única geometria (espaço local do root). */
function collectGeometry(root: THREE.Object3D): THREE.BufferGeometry | null {
  root.updateMatrixWorld(true);
  const parts: THREE.BufferGeometry[] = [];
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const geometry = object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    if (geometry.index) {
      const nonIndexed = geometry.toNonIndexed();
      geometry.dispose();
      parts.push(nonIndexed);
    } else {
      parts.push(geometry);
    }
  });
  if (!parts.length) return null;
  if (parts.length === 1) return parts[0]!;
  const merged = mergeGeometries(parts);
  for (const geometry of parts) geometry.dispose();
  return merged;
}

function firstMaterial(root: THREE.Object3D): THREE.Material | null {
  let found: THREE.Material | null = null;
  root.traverse((object) => {
    if (found || !(object instanceof THREE.Mesh)) return;
    found = Array.isArray(object.material) ? object.material[0] ?? null : object.material;
  });
  return found;
}

/**
 * Toca a animação pedida. `targetDuration` (usado no ataque) força o clipe a
 * durar exatamente esse tempo em segundos, casando a animação com a cadência
 * real da simulação (ex.: cooldown de ataque do Vampiro).
 */
export function updateExternalAnimation(root: THREE.Group, requested: AnimationState, dt: number, targetDuration?: number) {
  const mixer = root.userData.animationMixer as THREE.AnimationMixer | undefined;
  const actions = root.userData.animationActions as Map<AnimationState, THREE.AnimationAction> | undefined;
  if (!mixer || !actions?.size) return;

  const desired: AnimationState | undefined = actions.has(requested)
    ? requested
    : actions.has('idle') ? 'idle' : undefined;

  if (desired) {
    const next = actions.get(desired)!;
    const scales = root.userData.animationTimeScales as Map<AnimationState, number> | undefined;
    const clipDuration = next.getClip().duration;
    // Duração alvo (ataque): um ciclo do clipe por ataque real.
    const timeScale = targetDuration && targetDuration > 0 && clipDuration > 0
      ? clipDuration / targetDuration
      : (scales?.get(desired) ?? 1);
    if (root.userData.animationState !== desired) {
      const previousName = root.userData.animationState as AnimationState | undefined;
      const previous = previousName ? actions.get(previousName) : undefined;
      next.enabled = true;
      next.setLoop(THREE.LoopRepeat, Infinity);
      next.timeScale = timeScale;
      next.reset().fadeIn(0.15).play();
      previous?.fadeOut(0.15);
      root.userData.animationState = desired;
    } else if (targetDuration !== undefined) {
      // Ajusta a velocidade em tempo real (ex.: velocidade de ataque do vampiro).
      next.timeScale = timeScale;
    }
  }

  mixer.update(dt);
}

class AssetRegistry {
  private readonly fbxLoader = new FBXLoader();
  private readonly gltfLoader = new GLTFLoader();
  private readonly loaded = new Map<string, LoadedAsset>();
  private readonly props = new Map<string, LoadedProp>();
  /** Templates de relevo (falésias/mesas/rampas) já normalizados. */
  private readonly terrains = new Map<string, THREE.Group>();
  /** Módulos de cliff calibrados, por papel (straight/outerCorner/...). */
  private readonly cliffs = new Map<CliffRole, THREE.Group>();
  /** Templates de construção carregados, por `src` (vários níveis por `kind`). */
  private readonly buildingTemplates = new Map<string, THREE.Group>();
  /** Carregamentos de construção em andamento, por `src`, para deduplicar pedidos. */
  private readonly buildingLoads = new Map<string, Promise<boolean>>();
  private preloadPromise: Promise<void> | null = null;
  private preloadLoaded = 0;
  private preloadTotal = 0;
  private preloadListeners = new Set<(progress: PreloadProgress) => void>();

  preload(onProgress?: (progress: PreloadProgress) => void): Promise<void> {
    if (this.preloadPromise) {
      if (onProgress) {
        this.preloadListeners.add(onProgress);
        onProgress(this.preloadProgress());
      }
      return this.preloadPromise;
    }
    // Sequencial de propósito: disparar os ~100 MB em paralelo saturava a
    // rede do VPS e concentrava o parse dos FBX na thread principal (travava
    // a página). Carregando um por vez a interface continua respondendo.
    // Das construções só entra o modelo do nível 1; as variações de nível são
    // grandes (~10-20 MB cada) e carregam sob demanda quando o prédio evolui.
    const initialBuildings = BUILDING_ASSETS
      .map((definition) => definition.kind)
      .filter((kind, index, kinds) => kinds.indexOf(kind) === index)
      .map((kind) => pickBuildingDefinition(BUILDING_ASSETS.filter((definition) => definition.kind === kind), 1))
      .filter((definition): definition is BuildingAssetDefinition => definition !== null);
    const jobs: Array<() => Promise<unknown>> = [
      ...VISUAL_ASSETS.map((definition) => () => this.load(definition)),
      ...PROP_ASSETS.map((definition) => () => this.loadProp(definition)),
      ...TERRAIN_ASSETS.map((definition) => () => this.loadTerrain(definition)),
      ...initialBuildings.map((definition) => () => this.loadBuilding(definition)),
    ];
    this.preloadLoaded = 0;
    this.preloadTotal = jobs.length;
    if (onProgress) {
      this.preloadListeners.add(onProgress);
      onProgress(this.preloadProgress());
    }
    this.preloadPromise = (async () => {
      for (const job of jobs) {
        await job();
        this.preloadLoaded += 1;
        this.emitPreloadProgress();
        await new Promise<void>((resolve) => setTimeout(resolve, 0));
      }
      this.preloadListeners.clear();
    })();
    return this.preloadPromise;
  }

  private preloadProgress(): PreloadProgress {
    return { loaded: this.preloadLoaded, total: this.preloadTotal };
  }

  private emitPreloadProgress() {
    const progress = this.preloadProgress();
    for (const listener of this.preloadListeners) listener(progress);
  }

  /** `src` do modelo ideal para o nível (mesmo que ainda não tenha sido carregado). */
  buildingVariantSrc(kind: string, level = 1): string | null {
    const definitions = BUILDING_ASSETS.filter((definition) => definition.kind === kind);
    return pickBuildingDefinition(definitions, level)?.src ?? null;
  }

  /**
   * Cópia independente do modelo GLB da construção (materiais/texturas
   * compartilhados). Usa a melhor variação já carregada para o nível; `null`
   * enquanto nada do tipo estiver pronto — cai no modelo procedural.
   */
  buildingTemplate(kind: string, level = 1): { template: THREE.Group; src: string } | null {
    const definitions = BUILDING_ASSETS.filter((definition) => definition.kind === kind);
    if (!definitions.length) return null;
    const ideal = pickBuildingDefinition(definitions, level);
    const chosen = ideal && this.buildingTemplates.has(ideal.src)
      ? ideal
      : pickBuildingDefinition(definitions.filter((definition) => this.buildingTemplates.has(definition.src)), level);
    if (!chosen) return null;
    const template = this.buildingTemplates.get(chosen.src);
    return template ? { template: template.clone(true) as THREE.Group, src: chosen.src } : null;
  }

  /**
   * Garante que o modelo ideal do nível esteja carregado (ex.: Banco nv4).
   * Deduplica pedidos simultâneos; o chamador recria a malha quando a promise resolve.
   */
  ensureBuildingVariant(kind: string, level = 1): Promise<boolean> {
    const definitions = BUILDING_ASSETS.filter((definition) => definition.kind === kind);
    const target = pickBuildingDefinition(definitions, level);
    if (!target || this.buildingTemplates.has(target.src)) return Promise.resolve(true);
    const pending = this.buildingLoads.get(target.src);
    if (pending) return pending;
    const promise = this.loadBuilding(target).finally(() => this.buildingLoads.delete(target.src));
    this.buildingLoads.set(target.src, promise);
    return promise;
  }

  clone(id: string): THREE.Group | null {
    const source = this.loaded.get(id);
    if (!source) return null;

    const clonedScene = cloneSkeleton(source.scene) as THREE.Group;
    const visual = new THREE.Group();
    visual.name = 'externalVisual';
    visual.add(clonedScene);
    normalizeVisual(visual, source.definition);
    prepareMeshes(visual);

    const root = new THREE.Group();
    root.name = 'externalAssetRoot';
    root.add(visual);
    root.userData.externalAsset = true;
    root.userData.assetId = id;

    if (source.clips.size) {
      const mixer = new THREE.AnimationMixer(root);
      const actions = new Map<AnimationState, THREE.AnimationAction>();
      for (const [name, clip] of source.clips) actions.set(name, mixer.clipAction(clip));
      root.userData.animationMixer = mixer;
      root.userData.animationActions = actions;
      root.userData.animationTimeScales = source.timeScales;
      root.userData.animationState = undefined;
      updateExternalAnimation(root, 'idle', 0);
    }

    root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(root);
    root.userData.healthBarHeight = Number.isFinite(bounds.max.y) ? bounds.max.y + 0.35 : 3.8;
    return root;
  }

  /**
   * Geometria e material achatados do prop, prontos para InstancedMesh.
   * Retorna uma geometria nova a cada chamada; quem instancia deve descartá-la.
   */
  propInstance(id: string): { geometry: THREE.BufferGeometry; material: THREE.Material } | null {
    const source = this.props.get(id);
    if (!source) return null;
    const geometry = collectGeometry(source.template);
    const material = firstMaterial(source.template);
    if (!geometry || !material) {
      geometry?.dispose();
      return null;
    }
    return { geometry, material };
  }

  /**
   * Geometria e material achatados de um modelo de relevo, prontos para
   * InstancedMesh. A geometria já vem normalizada (maior lado horizontal = 1,
   * base em y=0), então o chamador escala por eixo para obter o tamanho desejado.
   */
  terrainInstance(id: string): { geometry: THREE.BufferGeometry; material: THREE.Material } | null {
    const template = this.terrains.get(id);
    if (!template) return null;
    const geometry = collectGeometry(template);
    const material = firstMaterial(template);
    if (!geometry || !material) {
      geometry?.dispose();
      return null;
    }
    return { geometry, material };
  }

  /**
   * Carrega os módulos de cliff calibrados. Sem normalização por bounding box:
   * aplica rotationY/scale/offset explícitos do registro. Garante (e confere em
   * dev) que a base caia em Y=0 e o topo exatamente em Y=CLIFF_HEIGHT.
   */
  async loadCliffModules(): Promise<void> {
    for (const definition of CLIFF_MODULES) {
      if (this.cliffs.has(definition.role)) continue;
      try {
        const gltf = await this.gltfLoader.loadAsync(publicUrl(definition.src));
        const template = gltf.scene;
        prepareMeshes(template);
        template.rotation.set(0, definition.rotationY, 0);
        template.scale.set(definition.scale[0], definition.scale[1], definition.scale[2]);
        template.position.set(definition.offset[0], definition.offset[1], definition.offset[2]);
        template.updateMatrixWorld(true);
        this.cliffs.set(definition.role, template);
        if (import.meta.env.DEV) {
          const box = new THREE.Box3().setFromObject(template);
          const eps = 0.03;
          // Base em 0 e topo alcançando CLIFF_HEIGHT (a superfície de topo fica
          // exatamente em CLIFF_HEIGHT; o bbox pode passar um pouco por causa de
          // quinas/arestas).
          if (Math.abs(box.min.y) > eps || box.max.y < CLIFF_HEIGHT - eps * 10) {
            console.warn(`[cliffs] ${definition.role}: base/topo fora do esperado (min.y=${box.min.y.toFixed(3)}, max.y=${box.max.y.toFixed(3)}; esperado base 0 e topo >= ${CLIFF_HEIGHT}).`);
          }
        }
      } catch (error) {
        console.warn(`[cliffs] Falha ao carregar o módulo ${definition.role} (${definition.src}).`, error);
      }
    }
  }

  /** Cópia independente do módulo calibrado (base em Y=0, topo em CLIFF_HEIGHT). */
  cliffModule(role: CliffRole): THREE.Group | null {
    const template = this.cliffs.get(role);
    return template ? (template.clone(true) as THREE.Group) : null;
  }

  /** Cópia independente de um prop estático (árvore/pedra) já normalizado. */
  propModel(id: string): THREE.Group | null {
    const source = this.props.get(id);
    return source ? (source.template.clone(true) as THREE.Group) : null;
  }

  private async loadAnimation(definition: VisualAnimationDefinition): Promise<THREE.AnimationClip | null> {
    const scene = await this.fbxLoader.loadAsync(publicUrl(definition.src));
    const sourceClip = scene.animations[0];
    if (!sourceClip) {
      disposeAnimationScene(scene);
      console.warn(`[assets] O arquivo ${definition.src} não contém AnimationClip.`);
      return null;
    }
    const clip = definition.inPlace ? makeClipInPlace(sourceClip) : sourceClip.clone();
    clip.name = definition.name;
    disposeAnimationScene(scene);
    return clip;
  }

  private async load(definition: VisualAssetDefinition): Promise<void> {
    try {
      const scene = await this.fbxLoader.loadAsync(publicUrl(definition.src));
      prepareMeshes(scene);

      const clips = new Map<AnimationState, THREE.AnimationClip>();
      const timeScales = new Map<AnimationState, number>();
      for (const animation of definition.animations ?? []) {
        try {
          const clip = await this.loadAnimation(animation);
          if (!clip) continue;
          clips.set(animation.name, clip);
          timeScales.set(animation.name, animation.timeScale ?? 1);
        } catch (error) {
          console.warn(`[assets] Falha ao carregar animação ${animation.name} (${animation.src}).`, error);
        }
      }

      this.loaded.set(definition.id, { definition, scene, clips, timeScales });
    } catch (error) {
      // Falha visual não pode impedir uma partida: createUnitModel usa o Vampiro procedural original.
      console.warn(`[assets] Falha ao carregar ${definition.id}; usando Vampiro original.`, error);
    }
  }

  private async loadProp(definition: PropAssetDefinition): Promise<void> {
    try {
      const gltf = await this.gltfLoader.loadAsync(publicUrl(definition.src));
      const template = gltf.scene;
      prepareMeshes(template);
      normalizeProp(template, definition);
      this.props.set(definition.id, { definition, template });
    } catch (error) {
      // Sem o prop, createResourceModel e syncWoodNodes caem nos modelos procedurais.
      console.warn(`[assets] Falha ao carregar ${definition.id}; usando modelo procedural.`, error);
    }
  }

  private async loadTerrain(definition: TerrainAssetDefinition): Promise<void> {
    try {
      const gltf = await this.gltfLoader.loadAsync(publicUrl(definition.src));
      const template = gltf.scene;
      prepareMeshes(template);
      normalizeTerrain(template, definition);
      this.terrains.set(definition.id, template);
    } catch (error) {
      // Sem o relevo, o terreno cai nas pilhas de pedra procedurais.
      console.warn(`[assets] Falha ao carregar o relevo ${definition.id}; usando pedras procedurais.`, error);
    }
  }

  private async loadBuilding(definition: BuildingAssetDefinition): Promise<boolean> {
    try {
      const gltf = await this.gltfLoader.loadAsync(publicUrl(definition.src));
      const template = gltf.scene;
      prepareMeshes(template);
      normalizeProp(template, definition);
      template.userData.buildingScale = definition.scale ?? 1;
      template.userData.buildingSrc = definition.src;
      this.buildingTemplates.set(definition.src, template);
      return true;
    } catch (error) {
      // Sem o GLB, createBuildingModel usa o modelo procedural da construção.
      console.warn(`[assets] Falha ao carregar a construção ${definition.kind} (${definition.src}); usando procedural.`, error);
      return false;
    }
  }
}

export const assetRegistry = new AssetRegistry();
