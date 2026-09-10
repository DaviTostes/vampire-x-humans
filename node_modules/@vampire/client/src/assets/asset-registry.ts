import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';

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

export function updateExternalAnimation(root: THREE.Group, requested: AnimationState, dt: number) {
  const mixer = root.userData.animationMixer as THREE.AnimationMixer | undefined;
  const actions = root.userData.animationActions as Map<AnimationState, THREE.AnimationAction> | undefined;
  if (!mixer || !actions?.size) return;

  const desired: AnimationState | undefined = actions.has(requested)
    ? requested
    : actions.has('idle') ? 'idle' : undefined;

  if (desired && root.userData.animationState !== desired) {
    const previousName = root.userData.animationState as AnimationState | undefined;
    const previous = previousName ? actions.get(previousName) : undefined;
    const next = actions.get(desired)!;
    const scales = root.userData.animationTimeScales as Map<AnimationState, number> | undefined;

    next.enabled = true;
    next.setLoop(THREE.LoopRepeat, Infinity);
    next.timeScale = scales?.get(desired) ?? 1;
    next.reset().fadeIn(0.15).play();
    previous?.fadeOut(0.15);
    root.userData.animationState = desired;
  }

  mixer.update(dt);
}

class AssetRegistry {
  private readonly fbxLoader = new FBXLoader();
  private readonly loaded = new Map<string, LoadedAsset>();
  private preloadPromise: Promise<void> | null = null;

  preload(): Promise<void> {
    if (this.preloadPromise) return this.preloadPromise;
    this.preloadPromise = Promise.all(VISUAL_ASSETS.map((definition) => this.load(definition))).then(() => undefined);
    return this.preloadPromise;
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
}

export const assetRegistry = new AssetRegistry();
