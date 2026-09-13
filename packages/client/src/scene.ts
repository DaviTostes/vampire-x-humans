// Cena three.js: terreno do mapa por seed, entidades, ciclo dia/noite

import * as THREE from 'three';
import {
  MAX_HUMANS,
  BUILDING_SIZE,
  TOWER,
  BRIDGE_Y,
  INTERACTION,
  TERRAIN_MAX_SLOPE,
  canPlaceBuilding,
  type BuildKind,
  VAMPIRE,
  vampireEffectiveCooldown,
  vampireItemBonuses,
  vampireSkillMultiplier,
  SPEC_BLOOD_PER_DAMAGE,
  type BuildingKind,
  WORLD,
  getMapModel,
  getActiveMapId,
  type GameMap,
  type MapModel,
  type Snapshot,
} from '@vampire/shared';
import { createBuildingModel, createUnitModel, createResourceModel, orientEntranceWall, createPineCanopyGeometry, createMountainGeometry, createRockGeometry, createLanternModel } from './models.js';
import { RTS_CAMERA } from './camera.js';
import { UnitReveal } from './unit-reveal.js';
import { assetRegistry, updateExternalAnimation } from './assets/asset-registry.js';
import { t } from './i18n.js';
import { resourceImage, resourceIconUrl, type ResourceKind } from './resource-icons.js';

const WORLD_SIZE = WORLD.tiles * WORLD.tileSize;

/** Hash determinístico para espalhar a decoração sem depender de estado global. */
function decorHash(x: number, z: number): number {
  const h = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return h - Math.floor(h);
}

/**
 * Visão de guerra (cliente): unidades inimigas só aparecem dentro do raio de
 * visão do time local. Humanos compartilham a visão; o vampiro tem a dele.
 */
const VAMPIRE_OWNER_ID = MAX_HUMANS;
const UNIT_VISION: Record<string, number> = { worker: 16, vampire: 24 };
const BUILDING_VISION: Record<string, number> = { wall: 8, tower: 19, bank: 14, taverna: 14, keep: 18 };
const VISION_SCALE = 1.8;

interface VisionProfile {
  cosOuter: number;    // cosseno do ângulo externo do cone
  cosInner: number;    // cosseno do ângulo interno (nítido)
  peripheral: number;  // fração do raio com percepção 360°
  core: number;        // fração do raio totalmente nítida
}
// Humano: cone frontal largo (~160°) e queda contínua de nitidez.
const HUMAN_VISION: VisionProfile = {
  cosOuter: Math.cos((80 * Math.PI) / 180),
  cosInner: Math.cos((48 * Math.PI) / 180),
  peripheral: 0.5,
  core: 0.2,
};
// Vampiro: enxerga mais longe, num ângulo maior e com núcleo nítido maior.
const VAMPIRE_VISION: VisionProfile = {
  cosOuter: Math.cos((95 * Math.PI) / 180),
  cosInner: Math.cos((58 * Math.PI) / 180),
  peripheral: 0.6,
  core: 0.28,
};
// A visão depende da fase: humanos enxergam melhor de dia; o vampiro, à noite.
// O vampiro é o caçador noturno: à noite seu alcance cresce bem mais que o dos
// humanos e de dia ele fica bem limitado (reforça a janela de caça).
const PHASE_VISION = {
  human: { day: 1.35, night: 0.8 },
  vampire: { day: 0.5, night: 2.2 },
} as const;
// Teto de fontes de visão no shader (loop em tela cheia). Fontes maiores têm
// prioridade quando o time tem muitas unidades.
const MAX_VISION_SOURCES = 32;
const FOG_DAY_STRENGTH = 0.5;
const FOG_NIGHT_STRENGTH = 0.68;
// À noite o vampiro enxerga no escuro: fora do alcance de visão dele a sombra
// de guerra fica bem mais leve do que para os humanos.
const FOG_VAMPIRE_NIGHT_STRENGTH = 0.42;

function teamOf(owner: number): 'human' | 'vampire' | 'neutral' {
  if (owner < 0) return 'neutral';
  return owner === VAMPIRE_OWNER_ID ? 'vampire' : 'human';
}

/**
 * Chão do mapa: tiles pintados de grama e pedra, com o caminho (trilhas) virando
 * pedra e as texturas de transição grama↔pedra alinhadas às bordas do caminho.
 */
const GROUND_TILE_URLS = {
  grass: 'assets/environment/ground/ground_grass.jpg',
  stone: 'assets/environment/ground/ground_stone.jpg',
  edge: 'assets/environment/ground/ground_edge_south.jpg',
} as const;

const GROUND_TILE_WORLD = 7;    // Unidades de mundo por repetição da textura base.
const GROUND_PATH_HALF = 2.2;   // Meia-largura de pedra do caminho (casa com o vão dos refúgios).
const GROUND_EDGE_HALF = 3.4;   // Meia-largura visível da transição grama↔pedra.
const GROUND_FIELD_MAX = 18;    // Maior distância codificada no campo de trilhas.

function groundPublicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}

function loadGroundTexture(path: string, clampVertical: boolean): THREE.Texture {
  const texture = new THREE.TextureLoader().load(groundPublicUrl(path));
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = clampVertical ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/**
 * Campo de distância até as trilhas (r = d / MAX), com 1 unidade de mundo por
 * texel. É a máscara que decide onde há pedra e a orientação da transição.
 */
function createPathField(map: GameMap): THREE.DataTexture {
  const model = getMapModel(map.id);
  const res = map.tiles * 2;
  const cell = WORLD_SIZE / res;
  const data = new Uint8Array(res * res * 4);
  for (let tz = 0; tz < res; tz++) {
    for (let tx = 0; tx < res; tx++) {
      const wx = -WORLD.half + (tx + 0.5) * cell;
      const wz = -WORLD.half + (tz + 0.5) * cell;
      const d = Math.min(model.distanceToTrails(wx, wz), GROUND_FIELD_MAX) / GROUND_FIELD_MAX;
      const v = Math.round(d * 255);
      const i = (tz * res + tx) * 4;
      data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, res, res, THREE.RGBAFormat);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/** Material do terreno que mistura grama, pedra e a transição ao longo do caminho. */
function createGroundMaterial(field: THREE.DataTexture): THREE.MeshStandardMaterial {
  const grass = loadGroundTexture(GROUND_TILE_URLS.grass, false);
  const stone = loadGroundTexture(GROUND_TILE_URLS.stone, false);
  const edge = loadGroundTexture(GROUND_TILE_URLS.edge, true);

  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.97, metalness: 0 });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uGroundGrass = { value: grass };
    shader.uniforms.uGroundStone = { value: stone };
    shader.uniforms.uGroundEdge = { value: edge };
    shader.uniforms.uGroundField = { value: field };
    shader.uniforms.uGroundHalf = { value: WORLD.half };
    shader.uniforms.uGroundSize = { value: WORLD_SIZE };
    shader.uniforms.uGroundPathHalf = { value: GROUND_PATH_HALF };
    shader.uniforms.uGroundEdgeHalf = { value: GROUND_EDGE_HALF };
    shader.uniforms.uGroundTileWorld = { value: GROUND_TILE_WORLD };
    shader.uniforms.uGroundFieldMax = { value: GROUND_FIELD_MAX };
    shader.uniforms.uGroundFieldTexel = { value: WORLD_SIZE / field.image.width };

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGroundWorld;')
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n  vGroundWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;',
      );

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vGroundWorld;
        uniform sampler2D uGroundGrass;
        uniform sampler2D uGroundStone;
        uniform sampler2D uGroundEdge;
        uniform sampler2D uGroundField;
        uniform float uGroundHalf;
        uniform float uGroundSize;
        uniform float uGroundPathHalf;
        uniform float uGroundEdgeHalf;
        uniform float uGroundTileWorld;
        uniform float uGroundFieldMax;
        uniform float uGroundFieldTexel;
        float groundHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
        float groundFieldAt(vec2 world) {
          vec2 uv = clamp((world + vec2(uGroundHalf)) / uGroundSize, 0.0, 1.0);
          return texture2D(uGroundField, uv).r * uGroundFieldMax;
        }`)
      .replace('#include <map_fragment>', `
        vec2 groundWorld = vGroundWorld.xz;
        float groundDist = groundFieldAt(groundWorld);
        float groundEps = uGroundFieldTexel;
        float groundDX = groundFieldAt(groundWorld + vec2(groundEps, 0.0)) - groundFieldAt(groundWorld - vec2(groundEps, 0.0));
        float groundDZ = groundFieldAt(groundWorld + vec2(0.0, groundEps)) - groundFieldAt(groundWorld - vec2(0.0, groundEps));
        vec2 groundGrad = normalize(vec2(groundDX, groundDZ) + vec2(1e-4));
        float groundWobble = (groundHash(floor(groundWorld * 1.7)) - 0.5) * 0.8;
        float groundD = groundDist + groundWobble;
        vec2 groundUv = groundWorld / uGroundTileWorld;
        vec3 groundGrass = texture2D(uGroundGrass, groundUv).rgb;
        vec3 groundStone = texture2D(uGroundStone, groundUv).rgb;
        float groundStoneMask = 1.0 - smoothstep(uGroundPathHalf - 0.7, uGroundPathHalf + 0.7, groundD);
        vec3 groundPlain = mix(groundGrass, groundStone, groundStoneMask);
        vec2 groundTangent = vec2(-groundGrad.y, groundGrad.x);
        float groundV = 0.5 + (groundD - uGroundPathHalf) / (2.0 * uGroundEdgeHalf);
        float groundU = dot(groundWorld, groundTangent) / uGroundTileWorld;
        vec3 groundEdge = texture2D(uGroundEdge, vec2(groundU, groundV)).rgb;
        float groundEdgeWeight = 1.0 - smoothstep(0.6, 1.0, abs(2.0 * groundV - 1.0));
        diffuseColor.rgb = mix(groundPlain, groundEdge, groundEdgeWeight);
      `);
  };
  material.customProgramCacheKey = () => 'ground-splat-v1';
  return material;
}

// ---------- Piso da cripta: praça de pedra texturizada ----------
// O piso usa um tile de pedra do spawn com alpha radial suave, dissolvendo na grama.
const CRYPT_DECAL_RADIUS = 10;
const CRYPT_FLOOR_URL = 'assets/environment/ground/ground_crypt.jpg';
const CRYPT_FLOOR_TILE = 7; // unidades de mundo por repetição do tile de pedra.

function cryptFloorMap(): THREE.Texture {
  const texture = new THREE.TextureLoader().load(groundPublicUrl(CRYPT_FLOOR_URL));
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const repeat = (CRYPT_DECAL_RADIUS * 2) / CRYPT_FLOOR_TILE;
  texture.repeat.set(repeat, repeat);
  return texture;
}

/** Máscara radial: opaca no centro e dissolvendo na grama na borda. */
function cryptFloorAlphaTexture(): THREE.CanvasTexture {
  const SZ = 512, R = SZ / 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SZ;
  const ctx = canvas.getContext('2d')!;
  const mask = ctx.createRadialGradient(R, R, 0, R, R, R);
  mask.addColorStop(0.0, 'rgba(255,255,255,1)');
  mask.addColorStop(0.55, 'rgba(255,255,255,0.98)');
  mask.addColorStop(0.80, 'rgba(255,255,255,0.45)');
  mask.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, SZ, SZ);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

export class GameScene {
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  map: GameMap;
  model: MapModel;

  private container: HTMLElement;
  private unitMeshes = new Map<number, THREE.Group>();
  private buildingMeshes = new Map<number, THREE.Group>();
  private nodeMeshes = new Map<number, THREE.Group>();
  /** Construções cujo modelo de nível terminou de carregar e devem ser recriadas. */
  private buildingRefresh = new Set<number>();
  private hoverEnemyId: number | null = null;
  private hoverRing: THREE.Group | null = null;
  private woodInstances: THREE.InstancedMesh[] = [];
  private woodKey = '';
  private hpBars = new Map<number, THREE.Mesh>();
  private selectionRings = new Map<number, THREE.Mesh>();
  private sun: THREE.DirectionalLight;
  private hemi: THREE.HemisphereLight;
  // Direção do sol e ponto do chão observado. A câmera de sombra acompanha o
  // foco para concentrar a resolução do mapa perto de onde o jogador olha.
  private sunDir = new THREE.Vector3(0.55, 0.8, 0.35).normalize();
  private readonly sunDistance = 320;
  private shadowFocus = new THREE.Vector3(0, 0, 0);
  private fog: THREE.Fog;
  private torches: THREE.PointLight[] = [];
  private raycaster = new THREE.Raycaster();
  private terrain!: THREE.Mesh;
  private bridgeDecks: THREE.Mesh[] = [];
  private buildingSelection: THREE.LineLoop | null = null;
  // Grade de posicionamento: overlay de tiles (livre/bloqueado) no modo de construção.
  private buildGrid: THREE.Mesh | null = null;
  private buildGridTexture: THREE.DataTexture | null = null;
  private buildGridData: Uint8Array | null = null;
  private readonly buildGridStaticByKind = new Map<BuildKind, Uint8Array>();
  private buildGridKind: BuildKind | null = null;
  private buildGridMaterial: THREE.ShaderMaterial | null = null;
  private buildGridRes = 0;
  private buildGridVisible = false;
  private lastSnap: Snapshot | null = null;
  private towerRanges = new Map<'placement' | 'selection', THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>>();
  private mapOccluders: THREE.Mesh[] = [];
  private unitReveal = new UnitReveal();
  private localOwner = -1;
  private visionSources: Array<{
    x: number; z: number; r: number; dir: number; cone: boolean;
    unitId?: number; buildingId?: number;
    cosOuter: number; cosInner: number; peripheral: number; core: number;
  }> = [];
  // Direção para onde cada unidade aliada olha (derivada do movimento/alvo).
  private unitHeading = new Map<number, number>();
  private unitPrev = new Map<number, { x: number; z: number }>();
  // Sombra de guerra: sobreposição em tela cheia que escurece o terreno fora da
  // visão do time. Os círculos de visão vão como uniforms (sem textura por tick).
  private fogScene = new THREE.Scene();
  private fogCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private fogMesh!: THREE.Mesh;
  private fogUniforms = {
    uInvViewProj: { value: new THREE.Matrix4() },
    uVision: { value: Array.from({ length: MAX_VISION_SOURCES }, () => new THREE.Vector4()) },
    uVisionDir: { value: Array.from({ length: MAX_VISION_SOURCES }, () => new THREE.Vector2()) },
    uVisionShape: { value: Array.from({ length: MAX_VISION_SOURCES }, () => new THREE.Vector4()) },
    uVisionCount: { value: 0 },
    uWorldHalf: { value: WORLD.half },
    uGroundY: { value: 3.2 },
    uFogColor: { value: new THREE.Color(0x0b1424) },
    uFogStrength: { value: FOG_DAY_STRENGTH },
  };
  private animationTime = 0;
  private effects: Array<{ object: THREE.Object3D; age: number; lifetime: number; velocity: THREE.Vector3; spin: boolean; growth: number; onComplete?: () => void }> = [];
  // Efeito persistente de Revelar Área (habilidade do Vampiro).
  private revealEffect: THREE.Group | null = null;
  private prevRevealKey = '';
  private revealLabelSecond = -1;
  // Vida do snapshot anterior (unidades e prédios) para detectar dano recebido.
  private prevHp = new Map<number, number>();

  constructor(container: HTMLElement, seed: number, mapId = getActiveMapId()) {
    this.container = container;
    this.model = getMapModel(mapId);
    this.map = this.model.generateMap();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      RTS_CAMERA.fov,
      container.clientWidth / container.clientHeight,
      1,
      1200,
    );
    const initialDistance = RTS_CAMERA.distance * RTS_CAMERA.initialZoom;
    const groundHeight = this.heightAt(0, 0);
    this.camera.position.set(0, groundHeight + initialDistance * RTS_CAMERA.elevation, initialDistance * RTS_CAMERA.depth);
    this.camera.lookAt(0, groundHeight, 0);

    this.fog = new THREE.Fog(0x8a9db8, 110, 420);
    this.scene.fog = this.fog;

    this.hemi = new THREE.HemisphereLight(0xbfd4ff, 0x3a4a33, 0.9);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffeecc, 1.6);
    this.sun.position.set(60, 100, 30);
    this.sun.castShadow = true;
    // Frustum pequeno (a sombra segue a câmera): com 2048² a resolução fica
    // concentrada na área visível, deixando as silhuetas nítidas de verdade.
    this.sun.shadow.mapSize.set(2048, 2048);
    Object.assign(this.sun.shadow.camera, { left: -85, right: 85, top: 85, bottom: -85, near: 1, far: 1000 });
    this.sun.shadow.camera.updateProjectionMatrix();
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.04;
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);
    this.scene.add(new THREE.AmbientLight(0x404060, 0.22));

    this.buildTerrain();
    this.buildFixedMap();
    this.buildDecorTrees();
    this.buildPlacementGrid();
    this.buildFogOfWar();
    window.addEventListener('resize', () => this.onResize());
  }

  private onResize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  // ---------- terreno ----------

  private buildTerrain() {
    const n = this.map.tiles;
    const seg = n;
    const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    // Tons suaves aplicados sobre a textura pintada: areia no litoral, terra
    // seca em altitude e clareiras. A pedra do caminho vem do shader.
    const tWhite = new THREE.Color(1, 1, 1);
    const tDry = new THREE.Color(0.9, 0.88, 0.74);
    const tRock = new THREE.Color(0.82, 0.84, 0.86);
    const tSand = new THREE.Color(1.14, 1.05, 0.78);
    const tMeadow = new THREE.Color(1.02, 1.04, 0.86);
    const tmp = new THREE.Color();

    for (let iy = 0; iy <= seg; iy++) {
      for (let ix = 0; ix <= seg; ix++) {
        const vi = iy * (seg + 1) + ix;
        const tx = Math.min(n - 1, ix);
        const tz = Math.min(n - 1, iy);
        const i = tz * n + tx;
        const h = this.map.height[i] ?? 0;
        const y = this.map.bridge[i] ? BRIDGE_Y : this.map.water[i] ? 1 : h * 14;
        pos.setY(vi, y);
        // Faixa de areia acompanhando o litoral.
        let beach = false;
        if (!this.map.water[i]) {
          for (let dz2 = -2; dz2 <= 2 && !beach; dz2++) for (let dx2 = -2; dx2 <= 2; dx2++) {
            const nx2 = tx + dx2, nz2 = tz + dz2;
            if (nx2 < 0 || nz2 < 0 || nx2 >= n || nz2 >= n || this.map.water[nz2 * n + nx2]) { beach = true; break; }
          }
        }
        if (this.map.water[i] || beach) tmp.copy(tSand);
        else if (h > 0.42) tmp.copy(tWhite).lerp(tRock, Math.min(1, (h - 0.42) * 3.5));
        else tmp.copy(tWhite).lerp(tDry, Math.max(0, (h - 0.2) * 1.6));
        // Clareiras suaves na própria terra, sem pisos quadrados destacados.
        const wx = tx * WORLD.tileSize - WORLD.half, wz = tz * WORLD.tileSize - WORLD.half;
        for (const c of this.model.compounds) {
          const d = Math.hypot((wx - c.x) / (c.width * 0.55), (wz - c.z) / (c.depth * 0.55));
          if (d < 1.3) tmp.lerp(tMeadow, Math.max(0, 1 - d / 1.3) * 0.35);
        }
        if (!this.map.water[i]) {
          const clearing = Math.max(0, 1 - Math.hypot(wx, wz) / (13 + Math.sin(Math.atan2(wz, wx) * 3) * 2));
          tmp.lerp(tMeadow, clearing * 0.25);
        }
        colors[vi * 3] = tmp.r;
        colors[vi * 3 + 1] = tmp.g;
        colors[vi * 3 + 2] = tmp.b;
      }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = createGroundMaterial(createPathField(this.map));
    const terrain = new THREE.Mesh(geo, mat);
    terrain.receiveShadow = true;
    this.terrain = terrain;
    this.scene.add(terrain);

    // água (plano no nível baixo)
    const waterGeo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshLambertMaterial({
      color: 0x2a5a8a,
      transparent: true,
      opacity: 0.85,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 2.4;
    water.receiveShadow = true;
    this.scene.add(water);

    // "Saia" de chão ao redor do mapa: chegando perto da borda, o horizonte
    // mostra terreno (mesmo material de grama) em vez do vazio.
    const skirtGeo = new THREE.PlaneGeometry(WORLD_SIZE * 4, WORLD_SIZE * 4);
    skirtGeo.rotateX(-Math.PI / 2);
    const skirt = new THREE.Mesh(skirtGeo, new THREE.MeshLambertMaterial({ color: 0x2f4a22 }));
    skirt.position.y = 2.25;
    this.scene.add(skirt);
  }

  /**
   * Sombra de guerra: quad em tela cheia desenhado por último. Reconstrói a
   * posição de mundo no plano do chão e escurece o que estiver fora da visão.
   * Unidades projetam um cone frontal suave (olho humano) com queda por
   * distância e uma percepção periférica curta; prédios veem em volta. Escurece
   * terreno, árvores e prédios inimigos; aliados ficam iluminados por serem
   * fontes de visão.
   */
  private buildFogOfWar() {
    const material = new THREE.ShaderMaterial({
      uniforms: this.fogUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform mat4 uInvViewProj;
        uniform vec4 uVision[${MAX_VISION_SOURCES}];
        uniform vec2 uVisionDir[${MAX_VISION_SOURCES}];
        uniform vec4 uVisionShape[${MAX_VISION_SOURCES}];
        uniform int uVisionCount;
        uniform float uWorldHalf;
        uniform float uGroundY;
        uniform vec3 uFogColor;
        uniform float uFogStrength;

        void main() {
          vec4 nearW = uInvViewProj * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);
          vec4 farW = uInvViewProj * vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
          vec3 nearP = nearW.xyz / nearW.w;
          vec3 farP = farW.xyz / farW.w;
          vec3 dir = farP - nearP;
          if (abs(dir.y) < 1e-5) discard;
          // Interseção do raio com o plano médio do chão (aproxima o relevo).
          float t = (uGroundY - nearP.y) / dir.y;
          if (t < 0.0 || t > 1.0) discard;
          vec2 world = nearP.xz + dir.xz * t;
          if (abs(world.x) > uWorldHalf || abs(world.y) > uWorldHalf) discard;

          float vis = 0.0;
          for (int i = 0; i < ${MAX_VISION_SOURCES}; i++) {
            if (i >= uVisionCount) break;
            vec4 s = uVision[i];
            vec4 shape = uVisionShape[i];
            float d = distance(world, s.xy);
            // Queda contínua de nitidez (fóvea → periferia) com a distância.
            float radial = 1.0 - smoothstep(s.z * shape.w, s.z, d);
            float coverage;
            if (s.w > 0.5) {
              // Olho humano: cone frontal suave + percepção periférica curta.
              float peripheralR = s.z * shape.z;
              float peripheral = 1.0 - smoothstep(peripheralR * 0.35, peripheralR, d);
              vec2 toPoint = world - s.xy;
              float cosA = d > 1e-4 ? dot(toPoint / d, uVisionDir[i]) : 1.0;
              float angular = smoothstep(shape.x, shape.y, cosA);
              float cone = radial * angular;
              // União suave cone+periferia: sem a "quina" que o max criava.
              coverage = cone + peripheral - cone * peripheral;
            } else {
              coverage = radial;
            }
            // União suave entre fontes, para não criar vincos onde elas se cruzam.
            vis = vis + coverage - vis * coverage;
          }
          float alpha = (1.0 - vis) * uFogStrength;
          // Ruído ordenado de ~1/255 evita faixas no degradê da sombra.
          float grain = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
          alpha += (grain - 0.5) / 255.0;
          if (alpha < 0.004) discard;
          gl_FragColor = vec4(uFogColor, alpha);
        }
      `,
    });
    this.fogMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    this.fogMesh.frustumCulled = false;
    this.fogScene.add(this.fogMesh);
  }

  private buildFixedMap() {
    // Um lampião baixo sinaliza a passagem entre as encostas.
    for (const c of this.model.compounds) {
      const door = this.model.compoundEntrance(c);
      const horizontal = c.facing === 'north' || c.facing === 'south';
      const x = door.x + (horizontal ? 2.8 : 0), z = door.z + (horizontal ? 0 : 2.8);
      const lamp = createLanternModel();
      lamp.position.set(x, this.heightAt(x, z) + 1.2, z);
      this.scene.add(lamp);
    }
    // As bases humanas são montadas com o aglomerado de pedra (GLB): cada
    // obstáculo da encosta vira uma pilha, com altura limitada para não virar
    // agulha. Sem o GLB, mantém o maciço procedural.
    const stone = assetRegistry.propInstance('prop:rock:stone-cluster');
    const stoneMatrices: THREE.Matrix4[] = [];
    const mountainTransforms: THREE.Matrix4[][] = Array.from({ length: 4 }, () => []);
    const rockDummy = new THREE.Object3D();
    const mossTransforms: THREE.Matrix4[] = [];
    for (const [i, wall] of this.map.obstacles.entries()) {
      const base = this.heightAt(wall.x, wall.z) - (stone ? 0.4 : 0.5);
      if (stone) {
        rockDummy.rotation.set(0, (i % 4) * Math.PI / 2 + Math.sin(i * 1.7) * 0.4, 0);
        rockDummy.scale.set(wall.width / 3.5, Math.min(wall.height, 7.5) / 2.35, wall.depth / 3.4);
        rockDummy.position.set(wall.x, base, wall.z);
        rockDummy.updateMatrix(); stoneMatrices.push(rockDummy.matrix.clone());
      } else {
        rockDummy.rotation.set(0, (i % 4) * Math.PI / 2, 0);
        rockDummy.scale.set(wall.width, wall.height, wall.depth);
        rockDummy.position.set(wall.x, base, wall.z);
        rockDummy.updateMatrix(); mountainTransforms[i % 4]!.push(rockDummy.matrix.clone());
      }
      // Musgo nas saliências, em manchas grandes e irregulares.
      if (i % 4 === 0) {
        rockDummy.position.set(wall.x + wall.width * 0.14, base + wall.height * 0.53, wall.z + wall.depth * 0.21);
        rockDummy.scale.set(wall.width * 0.27, 0.3, wall.depth * 0.2);
        rockDummy.updateMatrix(); mossTransforms.push(rockDummy.matrix.clone());
      }
    }
    if (!stone) {
      mountainTransforms.forEach((transforms, variant) => {
        const mountains = new THREE.InstancedMesh(createMountainGeometry(variant),
          new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }), transforms.length);
        transforms.forEach((matrix, i) => mountains.setMatrixAt(i, matrix));
        mountains.castShadow = true; mountains.receiveShadow = true;
        this.unitReveal.apply(mountains);
        this.scene.add(mountains); this.mapOccluders.push(mountains);
      });
    }
    const moss = new THREE.InstancedMesh(createRockGeometry(3), new THREE.MeshLambertMaterial({ color: '#4c6242' }), mossTransforms.length);
    mossTransforms.forEach((matrix, i) => moss.setMatrixAt(i, matrix));
    moss.castShadow = true;
    moss.receiveShadow = true;
    this.unitReveal.apply(moss);
    this.scene.add(moss);

    // Pedras soltas espalhadas pelo chão plano, no mesmo InstancedMesh.
    if (stone) {
      const scatter = new THREE.Object3D();
      const step = 11, half = WORLD.half - 28;
      for (let gx = -half; gx <= half; gx += step) {
        for (let gz = -half; gz <= half; gz += step) {
          const h = Math.abs(Math.sin(gx * 12.9898 + gz * 78.233) * 43758.5453) % 1;
          if (h > 0.5) continue;
          const x = gx + (h * 2 - 1) * step * 0.38;
          const z = gz + (((h * 7) % 1) * 2 - 1) * step * 0.38;
          if (!this.model.isLandAt(x, z) || this.model.isWaterAtWorld(x, z)) continue;
          if (this.model.distanceToTrails(x, z) < 3.5) continue;
          if (Math.hypot(x, z) < 12) continue;
          if (Math.hypot(x - this.model.cryptPosition.x, z - this.model.cryptPosition.z) < 15) continue;
          if (this.model.compounds.some(c => Math.abs(x - c.x) < c.width / 2 + 3 && Math.abs(z - c.z) < c.depth / 2 + 3)) continue;
          const s = 0.5 + h * 0.7;
          scatter.position.set(x, this.heightAt(x, z) - 0.2, z);
          scatter.rotation.set(0, h * Math.PI * 2, 0);
          scatter.scale.set(s, s * (0.85 + h * 0.3), s);
          scatter.updateMatrix();
          stoneMatrices.push(scatter.matrix.clone());
        }
      }
    }
    if (stone) {
      if (stoneMatrices.length) {
        const rocks = new THREE.InstancedMesh(stone.geometry, stone.material.clone(), stoneMatrices.length);
        const rockTint = new THREE.Color();
        stoneMatrices.forEach((matrix, i) => {
          rocks.setMatrixAt(i, matrix);
          const shade = 0.8 + ((i * 61) % 100) / 100 * 0.28;
          rocks.setColorAt(i, rockTint.setRGB(shade * 0.98, shade * 0.99, shade));
        });
        rocks.castShadow = true;
        rocks.receiveShadow = true;
        rocks.instanceMatrix.needsUpdate = true;
        if (rocks.instanceColor) rocks.instanceColor.needsUpdate = true;
        this.unitReveal.apply(rocks);
        this.scene.add(rocks);
        this.mapOccluders.push(rocks);
      } else {
        stone.geometry.dispose();
      }
    }
    // Pontes sobre os rios.
    const plankMat = new THREE.MeshLambertMaterial({ color: '#6b5236' });
    const railMat = new THREE.MeshLambertMaterial({ color: '#4a3827' });
    for (const b of this.model.bridges) {
      const horizontal = b.width >= b.depth;
      const deck = new THREE.Mesh(new THREE.BoxGeometry(b.width, 0.4, b.depth), plankMat);
      deck.position.set(b.x, BRIDGE_Y - 0.2, b.z);
      deck.castShadow = true; deck.receiveShadow = true;
      this.unitReveal.apply(deck);
      this.scene.add(deck);
      this.bridgeDecks.push(deck);
      const long = horizontal ? b.width : b.depth;
      const short = horizontal ? b.depth : b.width;
      for (const side of [-1, 1]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(horizontal ? long : 0.3, 0.6, horizontal ? 0.3 : long), railMat);
        rail.position.set(
          b.x + (horizontal ? 0 : side * (short / 2 - 0.3)),
          BRIDGE_Y + 0.35,
          b.z + (horizontal ? side * (short / 2 - 0.3) : 0),
        );
        rail.castShadow = true;
        this.scene.add(rail);
      }
      const planks = Math.max(3, Math.round(long / 3));
      for (let i = 1; i < planks; i++) {
        const p = -long / 2 + (long * i) / planks;
        const plank = new THREE.Mesh(
          new THREE.BoxGeometry(horizontal ? 0.25 : short * 0.86, 0.1, horizontal ? short * 0.86 : 0.25),
          railMat,
        );
        plank.position.set(b.x + (horizontal ? p : 0), BRIDGE_Y - 0.01, b.z + (horizontal ? 0 : p));
        this.scene.add(plank);
      }
    }
    // Base do vampiro: praça de pedra de borda suave.
    // Cada vértice acompanha o terreno para o piso assentar no platô.
    const drape = (geo: THREE.BufferGeometry, lift: number) => {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, this.heightAt(this.model.cryptPosition.x + pos.getX(i), this.model.cryptPosition.z + pos.getZ(i)) + lift);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    };
    const decalAt = (map: THREE.Texture, lift: number, order: number, factor: number, alphaMap?: THREE.Texture) => {
      const geo = new THREE.CircleGeometry(CRYPT_DECAL_RADIUS, 128);
      geo.rotateX(-Math.PI / 2);
      drape(geo, lift);
      const mat = new THREE.MeshLambertMaterial({ map, alphaMap, transparent: true, depthWrite: false });
      mat.polygonOffset = true;
      mat.polygonOffsetFactor = factor;
      mat.polygonOffsetUnits = factor * 2;
      const decal = new THREE.Mesh(geo, mat);
      decal.position.set(this.model.cryptPosition.x, 0, this.model.cryptPosition.z);
      decal.renderOrder = order;
      this.scene.add(decal);
    };
    decalAt(cryptFloorMap(), 0.05, 1, -2, cryptFloorAlphaTexture());
  }

  /** altura do terreno em coordenadas de mundo */
  heightAt(x: number, z: number): number {
    if (this.model.isBridgeAtWorld(x, z)) return BRIDGE_Y;
    const n = this.map.tiles;
    const gx = THREE.MathUtils.clamp((x + WORLD.half) / WORLD.tileSize, 0, n - 0.0001);
    const gz = THREE.MathUtils.clamp((z + WORLD.half) / WORLD.tileSize, 0, n - 0.0001);
    const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
    const height = (dx: number, dz: number) => {
      const i = Math.min(n - 1, tz + dz) * n + Math.min(n - 1, tx + dx);
      if (this.map.bridge[i] === 1) return BRIDGE_Y;
      return this.map.water[i] ? 1 : (this.map.height[i] ?? 0) * 14;
    };
    const a = height(0, 0), b = height(1, 0), c = height(0, 1), d = height(1, 1);
    // Mesma diagonal e interpolação dos triângulos da PlaneGeometry.
    return fx + fz <= 1 ? a + (b - a) * fx + (c - a) * fz :
      d + (c - d) * (1 - fx) + (b - d) * (1 - fz);
  }

  /** Define o jogador local; a visão do time esconde inimigos fora do alcance. */
  setLocalPlayer(owner: number) {
    this.localOwner = owner;
  }

  /**
   * Limites da área jogável: refúgios, cripta, spawns, pontes e obstáculos
   * (as fileiras de pedra). Usado pela câmera e pelo minimapa para não mostrar
   * o vazio inacessível além da borda.
   */
  playableBounds(): { minX: number; minZ: number; maxX: number; maxZ: number } {
    const model = this.model;
    let minX = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity;
    const include = (x: number, z: number, pad: number) => {
      if (!Number.isFinite(x) || !Number.isFinite(z)) return;
      minX = Math.min(minX, x - pad); maxX = Math.max(maxX, x + pad);
      minZ = Math.min(minZ, z - pad); maxZ = Math.max(maxZ, z + pad);
    };
    include(model.cryptPosition.x, model.cryptPosition.z, 40);
    for (const p of model.humanSpawns) include(p.x, p.z, 20);
    for (const c of model.compounds) include(c.x, c.z, Math.max(c.width, c.depth) / 2 + 8);
    for (const b of model.bridges) include(b.x, b.z, Math.max(b.width, b.depth) / 2 + 8);
    // Recursos (inclusive as árvores de coleta) delimitam o mapa jogável real —
    // sem eles, o recorte cortava as laterais da ilha no mapa clássico.
    for (const p of model.resourcePlacements) include(p.x, p.z, 6);
    for (const o of model.obstacles) {
      include(o.x - o.width / 2, o.z - o.depth / 2, 0);
      include(o.x + o.width / 2, o.z + o.depth / 2, 0);
    }
    if (!Number.isFinite(minX)) return { minX: -WORLD.half, minZ: -WORLD.half, maxX: WORLD.half, maxZ: WORLD.half };
    // Folga extra: mostra um pouco da área bloqueada em vez de cortar as bordas.
    const pad = 20;
    return { minX: minX - pad, minZ: minZ - pad, maxX: maxX + pad, maxZ: maxZ + pad };
  }

  private computeVision(snap: Snapshot) {
    const sources: typeof this.visionSources = [];
    const myTeam = teamOf(this.localOwner);
    if (this.localOwner >= 0 && myTeam !== 'neutral') {
      const nodeById = new Map(snap.nodes.map((n) => [n.id, n] as const));
      const buildingById = new Map(snap.buildings.map((b) => [b.id, b] as const));
      const unitById = new Map(snap.units.map((u) => [u.id, u] as const));
      const heading = new Map<number, number>();
      const prev = new Map<number, { x: number; z: number }>();
      for (const u of snap.units) {
        if (teamOf(u.owner) !== myTeam) continue;
        // Direção do olhar: para onde anda; parado, para o alvo da ordem.
        let dir = this.unitHeading.get(u.id) ?? 0;
        const before = this.unitPrev.get(u.id);
        let moved = false;
        if (before) {
          const mx = u.x - before.x, mz = u.z - before.z;
          if (mx * mx + mz * mz > 0.01) { dir = Math.atan2(mx, mz); moved = true; }
        }
        if (!moved && u.targetId != null) {
          const target = nodeById.get(u.targetId) ?? buildingById.get(u.targetId) ?? unitById.get(u.targetId);
          if (target) {
            const tx = target.x - u.x, tz = target.z - u.z;
            if (tx * tx + tz * tz > 0.01) dir = Math.atan2(tx, tz);
          }
        }
        heading.set(u.id, dir);
        prev.set(u.id, { x: u.x, z: u.z });
        // O vampiro enxerga mais longe e num cone mais amplo que os humanos,
        // mas de dia o humano leva vantagem (e à noite o vampiro).
        const profile = u.kind === 'vampire' ? VAMPIRE_VISION : HUMAN_VISION;
        const phase = snap.phase;
        const group = u.kind === 'vampire' ? 'vampire' : 'human';
        const radius = (UNIT_VISION[u.kind] ?? 16) * VISION_SCALE * PHASE_VISION[group][phase];
        sources.push({ x: u.x, z: u.z, r: radius, dir, cone: true, unitId: u.id, ...profile });
      }
      this.unitHeading = heading;
      this.unitPrev = prev;
      for (const b of snap.buildings) {
        if (teamOf(b.owner) !== myTeam) continue;
        const radius = (BUILDING_VISION[b.kind] ?? 12) * VISION_SCALE * PHASE_VISION[myTeam][snap.phase];
        sources.push({ x: b.x, z: b.z, r: radius, dir: 0, cone: false, buildingId: b.id, ...HUMAN_VISION });
      }
      // Revelar Área: fonte de visão temporária do Vampiro (seção 15).
      const reveal = snap.vampireReveal;
      if (reveal && myTeam === 'vampire') {
        sources.push({ x: reveal.x, z: reveal.z, r: reveal.radius, dir: 0, cone: false, ...HUMAN_VISION });
      }
    } else {
      this.unitHeading.clear();
      this.unitPrev.clear();
    }
    this.visionSources = sources;
  }

  /** Visibilidade de uma entidade para o jogador local (3D e minimapa). */
  isVisibleToPlayer(owner: number, x: number, z: number): boolean {
    return this.isVisibleToLocal(owner, x, z);
  }

  private isVisibleToLocal(owner: number, x: number, z: number): boolean {
    if (this.localOwner < 0) return true;
    if (owner < 0) return true;
    if (teamOf(owner) === teamOf(this.localOwner)) return true;
    for (const s of this.visionSources) {
      const dx = x - s.x, dz = z - s.z;
      const d2 = dx * dx + dz * dz;
      if (!s.cone) {
        if (d2 <= s.r * s.r) return true;
        continue;
      }
      // Mesma regra do shader: periferia curta em 360° + cone frontal.
      const peripheral = s.r * s.peripheral;
      if (d2 <= peripheral * peripheral) return true;
      if (d2 > s.r * s.r) continue;
      const d = Math.sqrt(d2);
      const cos = (dx * Math.sin(s.dir) + dz * Math.cos(s.dir)) / d;
      if (cos >= s.cosOuter) return true;
    }
    return false;
  }

  /** Atualiza os círculos/cone de visão usados pela sombra de guerra. */
  private updateFogVision() {
    const uniforms = this.fogUniforms;
    let sources = this.visionSources;
    if (this.localOwner < 0 || sources.length === 0) {
      uniforms.uVisionCount.value = 0;
      return;
    }
    // A visão segue o modelo já interpolado (posição e facing por frame), não a
    // posição discreta do snapshot — andando, a luz deixa de atrasar/saltar.
    for (const s of sources) {
      const mesh = s.unitId !== undefined ? this.unitMeshes.get(s.unitId)
        : s.buildingId !== undefined ? this.buildingMeshes.get(s.buildingId) : undefined;
      if (!mesh) continue;
      s.x = mesh.position.x;
      s.z = mesh.position.z;
      if (s.cone) s.dir = mesh.rotation.y;
    }
    if (sources.length > MAX_VISION_SOURCES) {
      // Mantém as maiores visões quando o time tem muitas fontes.
      sources = [...sources].sort((a, b) => b.r - a.r).slice(0, MAX_VISION_SOURCES);
    }
    for (let i = 0; i < sources.length; i++) {
      const s = sources[i]!;
      uniforms.uVision.value[i]!.set(s.x, s.z, s.r, s.cone ? 1 : 0);
      uniforms.uVisionShape.value[i]!.set(s.cosOuter, s.cosInner, s.peripheral, s.core);
      if (s.cone) uniforms.uVisionDir.value[i]!.set(Math.sin(s.dir), Math.cos(s.dir));
    }
    uniforms.uVisionCount.value = sources.length;
  }

  // ---------- sync de entidades ----------

  sync(snap: Snapshot) {
    this.lastSnap = snap;
    this.computeVision(snap);
    this.syncReveal(snap);
    // Dano causado neste tick (para o número de dano e o sangue do Vampiro).
    const drops = new Map<number, number>();
    for (const u of snap.units) {
      const prev = this.prevHp.get(u.id);
      if (prev !== undefined && prev - u.hp >= 1) drops.set(u.id, prev - u.hp);
    }
    for (const b of snap.buildings) {
      const prev = this.prevHp.get(b.id);
      if (prev !== undefined && prev - b.hp >= 1) drops.set(b.id, prev - b.hp);
    }
    if (this.buildGridVisible && this.buildGridKind) this.refreshBuildGrid(snap, this.buildGridKind);
    const seenUnits = new Set<number>();
    // Alvos atingidos por torres neste tick: o projétil já mostra o dano, então o
    // feedback genérico de perda de vida não deve duplicar.
    const towerHits = new Set<number>();
    for (const b of snap.buildings) {
      if (b.lastShot && snap.tick - b.lastShot.tick <= 1) towerHits.add(b.lastShot.targetId);
    }
    for (const u of snap.units) {
      seenUnits.add(u.id);
      let g = this.unitMeshes.get(u.id);
      if (!g) {
        g = createUnitModel(u.kind, u.owner, u.hero !== false);
        g.position.set(u.x, this.heightAt(u.x, u.z), u.z);
        g.userData.pick = { unitId: u.id };
        this.unitMeshes.set(u.id, g);
        this.scene.add(g);
        // interpolação: começa onde o snapshot diz
        g.userData.tx = u.x;
        g.userData.tz = u.z;
      }
      const prevPos = g.userData.snapX !== undefined
        ? { x: g.userData.snapX as number, z: g.userData.snapZ as number } : null;
      g.userData.tx = u.x;
      g.userData.tz = u.z;
      g.userData.snapX = u.x;
      g.userData.snapZ = u.z;
      g.userData.kind = u.kind;
      g.userData.hp = u.hp;
      g.userData.maxHp = u.maxHp;
      g.userData.activity = u.activity;
      // Duração real de um ataque do vampiro (cooldown efetivo), para casar a
      // animação com a cadência da simulação.
      g.userData.attackDuration = u.kind === 'vampire'
        ? vampireEffectiveCooldown(snap.vampireItems)
        : undefined;
      g.userData.resource = u.carryRes ?? snap.nodes.find(n => n.id === u.targetId)?.kind;
      const target = snap.nodes.find(n => n.id === u.targetId) ?? snap.buildings.find(b => b.id === u.targetId) ?? snap.units.find(t => t.id === u.targetId);
      if (target && (u.activity === 'gathering' || u.activity === 'building' || u.activity === 'repairing' || u.activity === 'attacking')) {
        g.rotation.y = Math.atan2(target.x - g.position.x, target.z - g.position.z);
      }
      const visible = this.isVisibleToLocal(u.owner, u.x, u.z);
      g.visible = visible;
      g.userData.visionVisible = visible;
      if (!g.userData.bar) this.addHealthBar(g, u.id);
      this.updateHealthBar(u.id, u.hp, u.maxHp);
      const bar = this.hpBars.get(u.id);
      if (bar) bar.visible = visible;

      // Auras de status e bursts de início (Fortificar vale para todos; o resto é
      // do Vampiro).
      const statuses = u.kind === 'vampire' ? snap.vampireStatuses ?? {} : {};
      const flags: Record<string, boolean> = {
        fortify: (u.fortify ?? 0) > 0,
        entangle: (statuses.entangled ?? 0) > 0,
        silenced: (statuses.silenced ?? 0) > 0,
        batForm: (statuses.batForm ?? 0) > 0 || (statuses.exitingBatForm ?? 0) > 0,
        channelingTeleport: (statuses.channelingTeleport ?? 0) > 0,
      };
      this.applyStatusAuras(g, flags);

      // Dano recebido (o Vampiro atacando unidades) e teleporte (salto de posição).
      const dealt = drops.get(u.id);
      if (visible && dealt !== undefined && !towerHits.has(u.id)) {
        this.hitFeedback(u.x, u.z, dealt, u.kind === 'vampire' ? 2.6 : 2.0);
      }
      // Sangue ganho pelo Vampiro no golpe (80% do dano causado).
      if (visible && u.kind === 'vampire' && u.targetId != null && drops.has(u.targetId)) {
        const damage = (VAMPIRE.attackDamage + vampireItemBonuses(snap.vampireItems).damage)
          * vampireSkillMultiplier(snap.vampireSkills)
          * (snap.phase === 'night' ? 1 : VAMPIRE.dayDamageMultiplier);
        const blood = Math.floor(damage * SPEC_BLOOD_PER_DAMAGE);
        if (blood > 0) {
          this.bloodFloating(new THREE.Vector3(u.x, this.heightAt(u.x, u.z) + 4.4, u.z), blood);
        }
      }
      if (visible && prevPos && u.activity !== 'moving' && Math.hypot(u.x - prevPos.x, u.z - prevPos.z) > 8) {
        this.teleportFeedback(prevPos.x, prevPos.z, u.x, u.z);
      }
    }
    // remove mortos
    for (const [id, g] of this.unitMeshes) {
      if (!seenUnits.has(id)) {
        this.scene.remove(g);
        const bar = this.hpBars.get(id);
        if (bar) this.scene.remove(bar);
        this.hpBars.delete(id);
        const ring = this.selectionRings.get(id);
        if (ring) this.scene.remove(ring);
        this.selectionRings.delete(id);
        this.unitMeshes.delete(id);
      }
    }

    const seenBuildings = new Set<number>();
    for (const b of snap.buildings) {
      seenBuildings.add(b.id);
      let g = this.buildingMeshes.get(b.id);
      const completed = g && g.userData.done === false && b.done;
      const recruited = g?.userData.recruiting && !b.recruitment;
      const goldDelta = g ? Math.max(0, (b.goldProduced ?? 0) - (g.userData.goldProduced ?? b.goldProduced ?? 0)) : 0;
      if (g && (g.userData.done !== b.done || g.userData.level !== b.level || this.buildingRefresh.has(b.id))) {
        this.buildingRefresh.delete(b.id);
        this.scene.remove(g);
        g = undefined;
      }
      if (!g) {
        g = createBuildingModel(b.kind, b.owner, b.done, b.level);
        this.unitReveal.apply(g);
        if (b.kind === 'wall') orientEntranceWall(g, b.x, b.z);
        g.position.set(b.x, this.heightAt(b.x, b.z), b.z);
        this.buildingMeshes.set(b.id, g);
        this.scene.add(g);
        g.userData.pick = { buildingId: b.id };
      }
      // Variação de nível: se o GLB ideal do nível ainda não está pronto, usa o
      // fallback já exibido e busca o modelo em segundo plano. Ao chegar, a malha
      // é recriada no próximo snapshot (buildingRefresh).
      if (g && !g.userData.variantPending) {
        const desiredSrc = assetRegistry.buildingVariantSrc(b.kind, b.level);
        if (desiredSrc && g.userData.modelSrc !== desiredSrc) {
          g.userData.variantPending = true;
          const buildingId = b.id;
          assetRegistry.ensureBuildingVariant(b.kind, b.level).then((ready) => {
            // Só recria quando o modelo chegou; falha mantém o fallback (sem repetir).
            if (ready) this.buildingRefresh.add(buildingId);
          }).catch(() => {
            // Sem o GLB da variação, mantém o modelo atual (fallback/procedural).
          });
        }
      }
      const visible = this.isVisibleToLocal(b.owner, b.x, b.z);
      g.userData.kind = b.kind;
      g.userData.hp = b.hp;
      g.userData.maxHp = b.maxHp;
      g.userData.done = b.done;
      g.userData.level = b.level;
      g.userData.goldProduced = b.goldProduced ?? 0;
      g.userData.recruiting = !!b.recruitment;
      if (visible && recruited) this.floatingText(t('Peão pronto'), g.position.clone().add(new THREE.Vector3(0, 5, 0)), '#c0e4a7');
      if (b.lastShot && b.lastShot.tick !== g.userData.lastShotTick) {
        if (g.userData.lastShotTick !== undefined || snap.tick - b.lastShot.tick <= 2) {
          if (visible) this.towerShotEffect(g, b.lastShot);
        }
        g.userData.lastShotTick = b.lastShot.tick;
      }
      if (visible && goldDelta > 0) {
        const isCrypt = b.kind === 'crypt';
        // O sangue da Cripta é informação do Vampiro.
        if (!isCrypt || teamOf(this.localOwner) === 'vampire') {
          this.productionEffect(g.position, goldDelta, isCrypt ? 'sangue' : 'ouro',
            isCrypt ? '#ff8b8b' : '#ffe48b');
        }
      }
      if (visible && completed) {
        this.floatingText(t('Obra concluída'), g.position.clone().add(new THREE.Vector3(0, 5, 0)), '#c0e4a7');
        this.dustEffect(g.position, '#bca77f');
      }
      g.scale.y = b.done ? 1 : Math.max(0.15, b.progress);
      // Aura de Fortificar (o escudo acompanha o tamanho da construção).
      const buildHalf = BUILDING_SIZE[b.kind] ?? 6;
      this.applyStatusAuras(g, { fortify: (b.fortify ?? 0) > 0 }, Math.max(1.2, buildHalf * 0.55));
      const dealtBuilding = drops.get(b.id);
      if (visible && dealtBuilding !== undefined) {
        this.hitFeedback(b.x, b.z, dealtBuilding, Math.max(1.6, buildHalf * 0.45));
      }
      // A Cripta é indestrutível: não mostra barra de vida.
      if (b.kind !== 'crypt') {
        if (!g.userData.bar) this.addBuildingHealthBar(g, b.id, b.kind);
        else if (!this.hpBars.has(b.id)) this.hpBars.set(b.id, g.userData.bar);
        // Reaproveita a barra ao reconstruir o modelo na conclusão da obra.
        g.userData.bar = this.hpBars.get(b.id);
        this.updateHealthBar(b.id, b.hp, b.maxHp);
      }
      // Construções inimigas fora da visão do time também somem (fog de guerra).
      g.visible = visible;
      g.userData.visionVisible = visible;
      if (g.userData.bar) g.userData.bar.visible = visible;
    }
    for (const [id, g] of this.buildingMeshes) {
      if (!seenBuildings.has(id)) {
        this.scene.remove(g);
        this.buildingMeshes.delete(id);
        this.buildingRefresh.delete(id);
        const bar = this.hpBars.get(id);
        if (bar) this.scene.remove(bar);
        this.hpBars.delete(id);
      }
    }

    const seenNodes = new Set<number>();
    const woodNodes = snap.nodes.filter(nd => nd.kind === 'wood');
    this.syncWoodNodes(woodNodes);
    for (const nd of snap.nodes) {
      if (nd.kind === 'wood') { seenNodes.add(nd.id); continue; }
      seenNodes.add(nd.id);
      let g = this.nodeMeshes.get(nd.id);
      if (!g) {
        g = createResourceModel(nd.kind);
        this.unitReveal.apply(g);
        g.position.set(nd.x, this.heightAt(nd.x, nd.z), nd.z);
        g.userData.x = nd.x;
        g.userData.z = nd.z;
        g.userData.nodeId = nd.id;
        g.userData.pick = { nodeId: nd.id };
        this.nodeMeshes.set(nd.id, g);
        this.scene.add(g);
      }
      const f = nd.amount / nd.maxAmount;
      g.scale.setScalar(0.4 + 0.6 * f);
    }
    for (const [id, g] of this.nodeMeshes) {
      if (!seenNodes.has(id)) {
        this.dustEffect(g.position, '#9b8c69');
        this.scene.remove(g);
        this.nodeMeshes.delete(id);
      }
    }

    // Guarda a vida deste tick para o próximo comparar e detectar dano.
    this.prevHp.clear();
    for (const u of snap.units) this.prevHp.set(u.id, u.hp);
    for (const b of snap.buildings) this.prevHp.set(b.id, b.hp);
  }

  /** Bosques coletáveis: quatro árvores por nó, instanciadas em uma ou duas chamadas. */
  private syncWoodNodes(wood: Array<{ id: number; x: number; z: number }>) {
    const key = wood.map(n => n.id).join(',');
    if (key === this.woodKey) return;
    this.woodKey = key;
    for (const instances of this.woodInstances) {
      this.scene.remove(instances);
      instances.geometry.dispose();
      (instances.material as THREE.Material).dispose();
    }
    this.woodInstances = [];

    const ids: number[] = [];
    const m = new THREE.Matrix4();
    const rotation = new THREE.Quaternion(), scale = new THREE.Vector3(), position = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    let k = 0;

    // GLB decimado da árvore: uma malha instanciada por nó (tronco + copa juntos).
    // Cor e escala variam por instância; projeta e recebe sombra como os demais modelos.
    const tree = assetRegistry.propInstance('prop:tree:evergreen');
    if (tree) {
      const trees = new THREE.InstancedMesh(tree.geometry, tree.material.clone(), Math.max(1, wood.length));
      trees.castShadow = true;
      trees.receiveShadow = true;
      this.unitReveal.apply(trees);
      const treeTint = new THREE.Color();
      for (const nd of wood) {
        const a = nd.id * 2.4;
        const h1 = ((nd.id * 13) % 9) / 9;
        const h2 = ((nd.id * 29) % 7) / 7;
        const size = 0.68 + h1 * 0.5;
        rotation.setFromAxisAngle(up, a);
        scale.set(size * (0.82 + h2 * 0.16), size * (0.92 + h1 * 0.25), size * (0.82 + h2 * 0.16));
        const x = nd.x + Math.sin(a) * 0.5, z = nd.z + Math.cos(a) * 0.5;
        position.set(x, this.heightAt(x, z), z);
        m.compose(position, rotation, scale);
        trees.setMatrixAt(k, m);
        const shade = 0.8 + ((nd.id * 37) % 100) / 100 * 0.3;
        treeTint.setRGB(shade * 0.93, shade, shade * 0.86);
        trees.setColorAt(k, treeTint);
        ids.push(nd.id);
        k++;
      }
      trees.count = k;
      trees.instanceMatrix.needsUpdate = true;
      if (trees.instanceColor) trees.instanceColor.needsUpdate = true;
      trees.userData.woodNodeIds = ids;
      this.woodInstances = [trees];
      this.scene.add(trees);
      return;
    }

    const PER = 4;
    // Fallback procedural: troncos e copas em duas chamadas instanciadas.
    const trunks = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.19, 0.35, 3, 7),
      new THREE.MeshLambertMaterial({ color: 0x493b31 }),
      Math.max(1, wood.length * PER),
    );
    const crowns = new THREE.InstancedMesh(
      createPineCanopyGeometry(),
      new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }),
      Math.max(1, wood.length * PER),
    );
    trunks.castShadow = true;
    crowns.castShadow = true;
    this.unitReveal.apply(trunks);
    this.unitReveal.apply(crowns);
    for (const nd of wood) {
      for (let t = 0; t < PER; t++) {
        const a = nd.id * 2.4 + t * 2.1;
        const size = 0.75 + (((nd.id * 13 + t * 7) % 9) / 9) * 0.45;
        rotation.setFromAxisAngle(up, a);
        scale.set(size * 0.88, size, size * 0.88);
        const x = nd.x + Math.sin(a) * 1.7, z = nd.z + Math.cos(a) * 1.7;
        const y = this.heightAt(x, z);
        position.set(x, y + 1.5 * size, z);
        m.compose(position, rotation, scale);
        trunks.setMatrixAt(k, m);
        position.set(x, y + 2.1 * size, z);
        m.compose(position, rotation, scale);
        crowns.setMatrixAt(k, m);
        ids.push(nd.id);
        k++;
      }
    }
    trunks.count = k;
    crowns.count = k;
    trunks.instanceMatrix.needsUpdate = true;
    crowns.instanceMatrix.needsUpdate = true;
    trunks.userData.woodNodeIds = ids;
    crowns.userData.woodNodeIds = ids;
    this.woodInstances = [trunks, crowns];
    this.scene.add(trunks, crowns);
  }

  /**
   * Floresta decorativa: preenche os vazios entre as árvores coletáveis. É puramente
   * visual — não entra no estado, não colide e não bloqueia construção — mas respeita
   * trilhas, bases, pedras, água, cripta e a posição das árvores que dão madeira.
   */
  private buildDecorTrees() {
    const tree = assetRegistry.propInstance('prop:tree:evergreen');
    if (!tree) return;
    // Células (3×3) ocupadas por nós de madeira, para não sobrepor a coleta.
    const cell = 2;
    const occupied = new Set<string>();
    for (const n of this.model.resourcePlacements) {
      const cx = Math.floor(n.x / cell), cz = Math.floor(n.z / cell);
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) occupied.add(`${cx + dx},${cz + dz}`);
    }
    const obstacles = this.map.obstacles;
    const step = 2.8;
    const half = WORLD.half - 4;
    const cryptX = this.model.cryptPosition.x, cryptZ = this.model.cryptPosition.z;
    // No labirinto, atrás das fileiras de pedra não existe floresta; mantém a
    // floresta de dentro. O limite acompanha os refúgios.
    const maze = this.model.config.maze;
    const mapScale = this.model.config.scale;
    const playableForestRadius = maze
      ? this.model.compounds.reduce(
        (max, c) => Math.max(max, Math.hypot(c.x - cryptX, c.z - cryptZ) + Math.max(c.width, c.depth) / 2), 0) + 6 * mapScale
      : Infinity;
    // Centro (spawn) hoje vazio: preenche com árvores, sem tocar nos tiles da cripta.
    const centerRadius = 42;
    const cryptTileRadius = CRYPT_DECAL_RADIUS + 3;
    const spawns = this.model.humanSpawns;
    const vampireSpawn = {
      x: cryptX + this.model.vampireSpawnOffset.x,
      z: cryptZ + this.model.vampireSpawnOffset.z,
    };
    const spots: Array<[number, number, number, number]> = [];
    for (let gx = -half; gx <= half; gx += step) {
      for (let gz = -half; gz <= half; gz += step) {
        const jx = (decorHash(gx * 0.7, gz * 1.3) - 0.5) * step * 0.9;
        const jz = (decorHash(gz * 1.1, gx * 0.5) - 0.5) * step * 0.9;
        const x = gx + jx, z = gz + jz;
        const r = Math.hypot(x - cryptX, z - cryptZ);
        if (this.model.isForestAt(x, z)) {
          if (playableForestRadius !== Infinity && r > playableForestRadius) continue;
        } else {
          // Fora da floresta só entra no centro, longe dos tiles da cripta.
          if (r >= centerRadius || r < cryptTileRadius) continue;
          if (this.model.distanceToTrails(x, z) < 5) continue;
          if (spawns.some(s => Math.hypot(x - s.x, z - s.z) < 7)) continue;
          if (Math.hypot(x - vampireSpawn.x, z - vampireSpawn.z) < 7) continue;
        }
        if (occupied.has(`${Math.floor(x / cell)},${Math.floor(z / cell)}`)) continue;
        if (obstacles.some(o => Math.abs(x - o.x) < o.width / 2 + 1.6 && Math.abs(z - o.z) < o.depth / 2 + 1.6)) continue;
        spots.push([x, z, decorHash(x, z), decorHash(z, x)]);
      }
    }
    if (!spots.length) return;
    const trees = new THREE.InstancedMesh(tree.geometry, tree.material.clone(), spots.length);
    trees.castShadow = true;
    trees.receiveShadow = true;
    this.unitReveal.apply(trees);
    const m = new THREE.Matrix4();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const position = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const tint = new THREE.Color();
    for (let i = 0; i < spots.length; i++) {
      const [x, z, h1, h2] = spots[i]!;
      const size = 0.5 + h1 * 0.55;
      rotation.setFromAxisAngle(up, h1 * Math.PI * 2);
      scale.set(size * (0.8 + h2 * 0.2), size * (0.9 + h1 * 0.3), size * (0.8 + h2 * 0.2));
      position.set(x, this.heightAt(x, z), z);
      m.compose(position, rotation, scale);
      trees.setMatrixAt(i, m);
      const shade = 0.72 + h2 * 0.34;
      tint.setRGB(shade * 0.93, shade, shade * 0.86);
      trees.setColorAt(i, tint);
    }
    trees.instanceMatrix.needsUpdate = true;
    if (trees.instanceColor) trees.instanceColor.needsUpdate = true;
    this.scene.add(trees);
  }

  /**
   * Grade de posicionamento (estilo RTS): quadrados de 1 unidade alinhados às
   * coordenadas inteiras. Branco = livre, vermelho = bloqueado. As construções
   * são encaixadas para ocupar quadrados inteiros (ver `updateBuildPreview`).
   */
  private buildPlacementGrid() {
    const res = Math.round(WORLD_SIZE);
    this.buildGridRes = res;
    this.buildGridData = new Uint8Array(res * res * 4);
    const data = this.buildGridData as Uint8Array<ArrayBuffer>;
    const texture = new THREE.DataTexture(data, res, res, THREE.RGBAFormat);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    this.buildGridTexture = texture;

    // Reaproveita a malha do terreno (já ajustada ao relevo) e sobe um pouco.
    const geometry = this.terrain.geometry.clone();
    const position = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < position.count; i++) position.setY(i, position.getY(i) + 0.12);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uGrid: { value: texture },
        uHalf: { value: WORLD.half },
        uWorldSize: { value: WORLD_SIZE },
        // Pegada da construção sob o cursor (minX, minZ, maxX, maxZ) e estado:
        // 0 = sem pegada, 1 = válida, 2 = inválida.
        uFootprint: { value: new THREE.Vector4() },
        uFootprintState: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vWorld;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: `
        uniform sampler2D uGrid;
        uniform float uHalf;
        uniform float uWorldSize;
        uniform vec4 uFootprint;
        uniform float uFootprintState;
        varying vec2 vWorld;
        void main() {
          vec2 uv = (vWorld + uHalf) / uWorldSize;
          if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
          float blocked = 1.0 - texture2D(uGrid, uv).r;
          vec3 color = mix(vec3(0.93, 0.96, 1.0), vec3(1.0, 0.22, 0.24), blocked);
          float alpha = mix(0.05, 0.28, blocked);
          // A pegada da construção cobre exatamente os quadrados do footprint e
          // responde se cabe ali (verde) ou não (vermelho).
          if (uFootprintState > 0.5 && vWorld.x >= uFootprint.x && vWorld.x <= uFootprint.z
              && vWorld.y >= uFootprint.y && vWorld.y <= uFootprint.w) {
            color = uFootprintState > 1.5 ? vec3(1.0, 0.22, 0.24) : vec3(0.34, 0.94, 0.42);
            alpha = 0.5;
          }
          // Linhas nas coordenadas inteiras: o quadrado fecha certinho no prédio.
          vec2 g = abs(fract(vWorld + 0.5) - 0.5) / fwidth(vWorld);
          float line = 1.0 - min(min(g.x, g.y), 1.0);
          gl_FragColor = vec4(color, clamp(alpha + line * 0.45, 0.0, 0.85));
        }
      `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 2;
    mesh.visible = false;
    this.buildGrid = mesh;
    this.buildGridMaterial = material;
    this.scene.add(mesh);
    this.refreshBuildGrid(null, null);
  }

  /** Encosta íngreme demais (mesma regra do posicionamento autoritativo). */
  private tooSteepAt(x: number, z: number): boolean {
    const map = this.map, n = map.tiles, half = WORLD.half, ts = WORLD.tileSize;
    const ground = (px: number, pz: number) => {
      const gx = Math.max(0, Math.min(n - 1.0001, (px + half) / ts));
      const gz = Math.max(0, Math.min(n - 1.0001, (pz + half) / ts));
      const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
      const h = (dx: number, dz: number) => map.height[Math.min(n - 1, tz + dz) * n + Math.min(n - 1, tx + dx)] ?? 0;
      return (h(0, 0) * (1 - fx) + h(1, 0) * fx) * (1 - fz) + (h(0, 1) * (1 - fx) + h(1, 1) * fx) * fz;
    };
    const step = ts;
    const h0 = ground(x, z);
    return Math.max(
      Math.abs(ground(x + step, z) - h0),
      Math.abs(ground(x - step, z) - h0),
      Math.abs(ground(x, z + step) - h0),
      Math.abs(ground(x, z - step) - h0),
    ) / step > TERRAIN_MAX_SLOPE;
  }

  /**
   * Camada estática exata para a construção: cada célula é avaliada pelo próprio
   * `canPlaceBuilding` na posição de encaixe (centro da célula). Com todos os
   * tamanhos ímpares, o encaixe cai sempre no centro, então não há deslocamento.
   */
  private staticPlacementGrid(kind: BuildKind): Uint8Array {
    const cached = this.buildGridStaticByKind.get(kind);
    if (cached) return cached;
    const res = this.buildGridRes, worldHalf = WORLD.half;
    const even = BUILDING_SIZE[kind] % 2 === 0;
    const empty = { buildings: [], nodes: [], units: [] };
    const grid = new Uint8Array(res * res);
    for (let iz = 0; iz < res; iz++) {
      const cz = iz - worldHalf + 0.5;
      const sz = even ? Math.round(cz) : cz;
      for (let ix = 0; ix < res; ix++) {
        const cx = ix - worldHalf + 0.5;
        const sx = even ? Math.round(cx) : cx;
        grid[iz * res + ix] = canPlaceBuilding(this.map, empty, kind, sx, sz) ? 1 : 0;
      }
    }
    this.buildGridStaticByKind.set(kind, grid);
    return grid;
  }

  /** Recalcula os quadrados para a construção selecionada (terreno + entidades). */
  private refreshBuildGrid(snap: Snapshot | null, kind: BuildKind | null) {
    const data = this.buildGridData;
    const texture = this.buildGridTexture;
    if (!data || !texture) return;
    const res = this.buildGridRes, worldHalf = WORLD.half;
    const grid = kind ? this.staticPlacementGrid(kind) : null;
    for (let i = 0; i < res * res; i++) {
      const free = grid && grid[i] ? 255 : 0;
      const o = i * 4;
      data[o] = free; data[o + 1] = free; data[o + 2] = free; data[o + 3] = 255;
    }
    if (kind && snap) {
      const half = BUILDING_SIZE[kind] / 2;
      // Célula que representa o encaixe: par = canto (x-0.5), ímpar = centro.
      const shift = BUILDING_SIZE[kind] % 2 === 0 ? 0.5 : 0;
      const mark = (minX: number, maxX: number, minZ: number, maxZ: number) => {
        const ix0 = Math.max(0, Math.floor(minX + worldHalf - 0.5 - shift) + 1);
        const ix1 = Math.min(res - 1, Math.ceil(maxX + worldHalf - 0.5 - shift) - 1);
        const iz0 = Math.max(0, Math.floor(minZ + worldHalf - 0.5 - shift) + 1);
        const iz1 = Math.min(res - 1, Math.ceil(maxZ + worldHalf - 0.5 - shift) - 1);
        for (let iz = iz0; iz <= iz1; iz++) {
          for (let ix = ix0; ix <= ix1; ix++) {
            const o = (iz * res + ix) * 4;
            data[o] = 0; data[o + 1] = 0; data[o + 2] = 0;
          }
        }
      };
      const clearance = INTERACTION.resourceBuildClearance;
      for (const b of snap.buildings) {
        const e = BUILDING_SIZE[b.kind] / 2 + half;
        mark(b.x - e, b.x + e, b.z - e, b.z + e);
      }
      for (const node of snap.nodes) {
        if (node.amount <= 0) continue;
        const e = half + clearance;
        mark(node.x - e, node.x + e, node.z - e, node.z + e);
      }
      const unitRange = half + INTERACTION.unitRadius;
      for (const u of snap.units) mark(u.x - unitRange, u.x + unitRange, u.z - unitRange, u.z + unitRange);
    }
    texture.needsUpdate = true;
  }

  /** Liga/desliga a grade de posicionamento (modo de construção). */
  setBuildGridVisible(visible: boolean, kind?: BuildKind) {
    this.buildGridVisible = visible;
    this.buildGridKind = visible ? (kind ?? this.buildGridKind) : null;
    if (this.buildGrid) this.buildGrid.visible = visible;
    if (visible && this.buildGridKind) this.refreshBuildGrid(this.lastSnap, this.buildGridKind);
  }

  /** Atualiza a pegada destacada na grade (posição, tamanho e se cabe). */
  setBuildFootprint(center: { x: number; z: number } | null, kind: BuildKind | null, valid: boolean) {
    const material = this.buildGridMaterial;
    if (!material) return;
    if (!center || !kind) {
      material.uniforms.uFootprintState!.value = 0;
      return;
    }
    const h = BUILDING_SIZE[kind] / 2;
    (material.uniforms.uFootprint!.value as THREE.Vector4).set(center.x - h, center.z - h, center.x + h, center.z + h);
    material.uniforms.uFootprintState!.value = valid ? 1 : 2;
  }

  private addHealthBar(unitGroup: THREE.Group, unitId: number) {
    const bar = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.18),
      new THREE.MeshBasicMaterial({ color: 0x3adb5a, depthTest: false, transparent: true }),
    );
    bar.renderOrder = 20;
    bar.position.y = 4.4;
    this.scene.add(bar);
    this.hpBars.set(unitId, bar);
    unitGroup.userData.bar = bar;
  }

  private addBuildingHealthBar(buildingGroup: THREE.Group, buildingId: number, kind: string) {
    const existing = this.hpBars.get(buildingId);
    if (existing) {
      buildingGroup.userData.bar = existing;
      return;
    }
    const width = kind === 'wall' ? 2.4 : kind === 'tower' ? 3.2 : 5;
    const bar = new THREE.Mesh(
      new THREE.PlaneGeometry(width, 0.35),
      new THREE.MeshBasicMaterial({ color: 0x3adb5a, depthTest: false, transparent: true }),
    );
    bar.renderOrder = 20;
    this.scene.add(bar);
    this.hpBars.set(buildingId, bar);
    buildingGroup.userData.bar = bar;
  }

  private updateHealthBar(id: number, hp: number, maxHp: number) {
    const bar = this.hpBars.get(id);
    if (!bar) return;
    const f = maxHp > 0 ? Math.max(0, hp / maxHp) : 0;
    bar.scale.x = Math.max(0.01, f);
    (bar.material as THREE.MeshBasicMaterial).color.setHex(
      f > 0.5 ? 0x3adb5a : f > 0.25 ? 0xdbb13a : 0xdb3a3a,
    );
  }

  private buildingBarHeight(kind: string): number {
    switch (kind) {
      case 'wall': return 4.6;
      case 'tower': return 9.2;
      case 'bank': return 7.8;
      case 'keep': return 10.2;
      case 'taverna': return 8.2;
      case 'crypt': return 11.5;
      default: return 8;
    }
  }

  private sizeLabel(label: THREE.Sprite) {
    const unit = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) / this.container.clientHeight;
    label.scale.set(180 * unit, 32 * unit, 1);
  }

  private addEffect(object: THREE.Object3D, velocity: THREE.Vector3, lifetime: number, spin = false, onComplete?: () => void, growth = 0) {
    if (this.effects.length >= 100) this.disposeEffect(this.effects.shift()!.object);
    this.scene.add(object);
    this.effects.push({ object, velocity, lifetime, age: 0, spin, growth, onComplete });
  }

  /**
   * Marcador do clique: anel que expande e some, com faíscas em volta.
   * `color` diferencia seleção (dourado) de ordem (verde).
   */
  clickMarker(x: number, z: number, color = 0x9fe08a) {
    const group = new THREE.Group();
    group.position.set(x, this.heightAt(x, z) + 0.1, z);
    group.renderOrder = 12;
    const ring = (inner: number, outer: number, opacity: number) => {
      const mesh = new THREE.Mesh(
        new THREE.RingGeometry(inner, outer, 32),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false, depthTest: false, toneMapped: false }),
      );
      mesh.rotation.x = -Math.PI / 2;
      return mesh;
    };
    group.add(ring(0.62, 0.82, 0.95));
    group.add(ring(0.2, 0.34, 0.85));
    for (let i = 0; i < 7; i++) {
      const a = i * (Math.PI * 2 / 7) + 0.35;
      const spark = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false, toneMapped: false }),
      );
      spark.position.set(Math.cos(a) * 0.55, 0.08, Math.sin(a) * 0.55);
      spark.rotation.y = a;
      group.add(spark);
    }
    group.scale.setScalar(0.45);
    this.addEffect(group, new THREE.Vector3(0, 0, 0), 0.6, false, undefined, 1.9);
  }

  private disposeEffect(object: THREE.Object3D) {
    this.scene.remove(object);
    object.traverse(child => {
      if (child instanceof THREE.Mesh) child.geometry.dispose();
      if (child instanceof THREE.Mesh || child instanceof THREE.Sprite) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        for (const material of materials) {
          (material as THREE.SpriteMaterial).map?.dispose();
          material.dispose();
        }
      }
    });
  }

  private towerShotEffect(tower: THREE.Group, shot: NonNullable<Snapshot['buildings'][number]['lastShot']>) {
    const start = tower.position.clone().add(new THREE.Vector3(0, 7.2, 0));
    const end = new THREE.Vector3(shot.x, this.heightAt(shot.x, shot.z) + 1.3, shot.z);
    const turret = tower.getObjectByName('turret');
    if (turret) turret.rotation.y = Math.atan2(shot.x - tower.position.x, shot.z - tower.position.z);
    const arrow = new THREE.Group();
    arrow.userData.effect = 'tower-shot';
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 1.5), new THREE.MeshBasicMaterial({ color: '#ffdb91' }));
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.4, 4), new THREE.MeshBasicMaterial({ color: '#e8f2ff' }));
    tip.rotation.x = Math.PI / 2;
    tip.position.z = 0.9;
    arrow.add(shaft, tip);
    arrow.position.copy(start);
    arrow.lookAt(end);
    const duration = THREE.MathUtils.clamp(start.distanceTo(end) / 40, 0.12, 0.5);
    this.addEffect(arrow, end.clone().sub(start).divideScalar(duration), duration, false,
      () => this.floatingText(`−${shot.damage} HP`, end, '#ff8585'));
  }

  private floatingText(text: string, position: THREE.Vector3, color: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 96;
    const ctx = canvas.getContext('2d')!;
    ctx.font = 'bold 46px system-ui'; ctx.textAlign = 'center';
    ctx.lineWidth = 6; ctx.strokeStyle = '#111821'; ctx.strokeText(text, 256, 63);
    ctx.fillStyle = color; ctx.fillText(text, 256, 63);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, sizeAttenuation: false, toneMapped: false }));
    sprite.userData.feedback = text;
    sprite.renderOrder = 999;
    this.sizeLabel(sprite); sprite.position.copy(position);
    this.addEffect(sprite, new THREE.Vector3(0, 1.8, 0), 1.8);
  }

  /** Número flutuante de ganho com a ilustração do recurso (ouro/sangue). */
  private resourceFloating(position: THREE.Vector3, amount: number, kind: ResourceKind, color: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 96;
    const ctx = canvas.getContext('2d')!;
    const text = `+${amount}`;
    ctx.font = 'bold 48px system-ui';
    const textW = ctx.measureText(text).width;
    const iconH = 56, gap = 14;
    const image = resourceImage(kind);
    const iconW = image ? iconH : iconH * 0.66;
    const startX = (canvas.width - (iconW + gap + textW)) / 2;
    const cy = canvas.height / 2;
    if (image) {
      ctx.drawImage(image, startX, cy - iconH / 2, iconH, iconH);
    } else if (kind === 'blood') {
      // Fallback vetorial (gota) enquanto a imagem não carregou.
      const cx = startX + iconH * 0.33;
      const grad = ctx.createLinearGradient(cx, cy - iconH / 2, cx, cy + iconH / 2);
      grad.addColorStop(0, '#ffb3c4');
      grad.addColorStop(1, '#b3122f');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx, cy - iconH / 2);
      ctx.bezierCurveTo(cx + iconH * 0.44, cy - iconH * 0.02, cx + iconH * 0.34, cy + iconH / 2, cx, cy + iconH / 2);
      ctx.bezierCurveTo(cx - iconH * 0.34, cy + iconH / 2, cx - iconH * 0.44, cy - iconH * 0.02, cx, cy - iconH / 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath();
      ctx.ellipse(cx - iconH * 0.1, cy + iconH * 0.1, iconH * 0.06, iconH * 0.12, -0.35, 0, Math.PI * 2);
      ctx.fill();
    }
    const tx = startX + iconW + gap;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 7; ctx.strokeStyle = '#111821';
    ctx.strokeText(text, tx, cy + 2);
    ctx.fillStyle = color;
    ctx.fillText(text, tx, cy + 2);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, sizeAttenuation: false, toneMapped: false }));
    sprite.userData.feedback = text;
    sprite.renderOrder = 999;
    this.sizeLabel(sprite); sprite.position.copy(position);
    this.addEffect(sprite, new THREE.Vector3(0, 1.8, 0), 1.8);
  }

  /** Número flutuante de sangue (ganho de sangue). */
  private bloodFloating(position: THREE.Vector3, amount: number, color = '#ff5b7a') {
    this.resourceFloating(position, amount, 'blood', color);
  }

  private productionEffect(position: THREE.Vector3, amount: number, label = 'ouro', textColor = '#ffe48b') {
    if (label === 'sangue') {
      this.bloodFloating(position.clone().add(new THREE.Vector3(0, 12, 0)), amount);
      return;
    }
    this.resourceFloating(position.clone().add(new THREE.Vector3(0, 8, 0)), amount, 'gold', textColor);
  }

  private dustEffect(position: THREE.Vector3, color: string) {
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      const dust = new THREE.Mesh(new THREE.IcosahedronGeometry(0.35), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6, depthWrite: false }));
      dust.position.copy(position).add(new THREE.Vector3(0, 0.5, 0));
      this.addEffect(dust, new THREE.Vector3(Math.sin(a) * 1.5, 0.8, Math.cos(a) * 1.5), 1.2);
    }
  }

  // ---------- feedback de habilidades ----------

  /** Pulso de anel no chão (usado por habilidades e teleportes). */
  private ringPulse(x: number, z: number, color: THREE.ColorRepresentation, radius = 1, growth = 3, duration = 0.9) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(radius * 0.78, radius, 40),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, this.heightAt(x, z) + 0.18, z);
    this.addEffect(ring, new THREE.Vector3(0, 0, 0), duration, false, undefined, growth / Math.max(0.2, radius));
  }

  /** Explosão curta de partículas coloridas (início de habilidade / impacto). */
  private sparkBurst(position: THREE.Vector3, color: THREE.ColorRepresentation, count = 12, speed = 4, life = 0.9) {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const spark = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.14 + Math.random() * 0.12),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false, toneMapped: false }),
      );
      spark.position.copy(position).add(new THREE.Vector3(0, 0.6, 0));
      this.addEffect(spark, new THREE.Vector3(Math.cos(a) * speed, 1.6 + Math.random() * 2.4, Math.sin(a) * speed), life);
    }
  }

  /** Aura presa à entidade, ligada/desligada por status (geometria por tipo). */
  private setAura(g: THREE.Group, key: string, color: number, active: boolean, radius: number) {
    const slot = `aura_${key}`;
    let aura = g.userData[slot] as THREE.Group | undefined;
    if (!active) {
      if (aura) aura.visible = false;
      return;
    }
    if (!aura) {
      aura = this.buildAura(key, color, radius);
      g.userData[slot] = aura;
      g.add(aura);
    }
    aura.visible = true;
    const sy = g.scale.y || 1;
    aura.scale.set(1, 1 / sy, 1);
    aura.position.y = 0.12 / sy;
    for (const mat of aura.userData.mats as THREE.MeshBasicMaterial[]) mat.color.setHex(color);
  }

  /** Constrói a aura de um status: sigilo grande no chão, coluna de luz, selo e orbitadores. */
  private buildAura(key: string, color: number, radius: number): THREE.Group {
    const aura = new THREE.Group();
    const mats: THREE.MeshBasicMaterial[] = [];
    const mat = (opacity: number, additive = false) => {
      const m = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity, depthWrite: false,
        side: THREE.DoubleSide, toneMapped: false,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      m.userData.baseOpacity = opacity;
      mats.push(m);
      return m;
    };
    const disc = (r0: number, r1: number, opacity = 0.75, additive = true, seg = 56) => {
      const m = new THREE.Mesh(new THREE.RingGeometry(r0, r1, seg), mat(opacity, additive));
      m.rotation.x = -Math.PI / 2;
      aura.add(m);
      return m;
    };
    const R = radius;
    const spin = new THREE.Group(); aura.add(spin);
    const counter = new THREE.Group(); aura.add(counter);
    const pulse = new THREE.Group(); aura.add(pulse);

    // Base comum: brilho no chão + anel externo + raios + coluna de luz.
    const glow = new THREE.Mesh(new THREE.CircleGeometry(R * 2.5, 48), mat(0.22, true));
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.02;
    aura.add(glow);
    disc(R * 1.7, R * 1.85, 0.9);
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.PlaneGeometry(0.18, R * 0.62), mat(0.7, true));
      spoke.rotation.x = -Math.PI / 2;
      spoke.rotation.z = -a;
      spoke.position.set(Math.cos(a) * R * 1.45, 0.03, Math.sin(a) * R * 1.45);
      counter.add(spoke);
    }
    const beamH = Math.min(R * 6, 11);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.95, R * 1.25, beamH, 24, 1, true), mat(0.12, true));
    beam.position.y = beamH / 2;
    aura.add(beam);
    const beamCore = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.36, R * 0.5, beamH, 16, 1, true), mat(0.2, true));
    beamCore.position.y = beamH / 2;
    pulse.add(beamCore);
    counter.userData.spin = -0.6;

    if (key === 'fortify') {
      disc(R * 0.66, R * 0.78, 0.85);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(R * 1.05, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat(0.22));
      dome.scale.y = 1.2; pulse.add(dome);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.26, R * 0.7, 0.5), mat(0.9, true));
        plate.position.set(Math.cos(a) * R * 1.0, R * 0.65, Math.sin(a) * R * 1.0);
        plate.rotation.y = -a;
        spin.add(plate);
      }
      spin.userData.spin = 0.8;
    } else if (key === 'entangle') {
      disc(R * 0.6, R * 0.72, 0.85);
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        const spike = new THREE.Mesh(new THREE.ConeGeometry(R * 0.15, R * 1.35, 5), mat(0.9, true));
        spike.position.set(Math.cos(a) * R * 0.95, R * 0.55, Math.sin(a) * R * 0.95);
        spike.rotation.z = Math.cos(a) * 0.55;
        spike.rotation.x = -Math.sin(a) * 0.55;
        spin.add(spike);
      }
      for (const [y, s] of [[0.5, 1.05], [1.05, 0.85], [1.6, 0.6]] as const) {
        const band = new THREE.Mesh(new THREE.TorusGeometry(R * s, 0.075, 6, 30), mat(0.7, true));
        band.rotation.x = Math.PI / 2;
        band.position.y = y * R;
        counter.add(band);
      }
      spin.userData.spin = 0.6;
    } else if (key === 'silenced') {
      disc(R * 0.66, R * 0.78, 0.8);
      for (let i = 0; i < 4; i++) {
        const wave = new THREE.Mesh(new THREE.TorusGeometry(R * (0.5 + i * 0.24), 0.07, 6, 34), mat(0.62 - i * 0.09, true));
        wave.rotation.x = Math.PI / 2;
        wave.position.y = R * (0.4 + i * 0.44);
        wave.userData.pulse = 0.16 + i * 0.05;
        wave.userData.phase = i * 1.7;
        pulse.add(wave);
      }
      spin.userData.spin = 1.1;
    } else if (key === 'batForm') {
      disc(R * 0.72, R * 0.86, 0.75);
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(R * (0.2 + (i % 3) * 0.06)), mat(0.6, true));
        shard.position.set(Math.cos(a) * R * 0.8, R * (0.35 + (i % 4) * 0.4), Math.sin(a) * R * 0.8);
        spin.add(shard);
      }
      const mist = new THREE.Mesh(new THREE.SphereGeometry(R * 1.0, 16, 10), mat(0.18, true));
      mist.scale.y = 1.5; pulse.add(mist);
      spin.userData.spin = 1.9;
    } else if (key === 'channelingTeleport') {
      disc(R * 0.62, R * 0.76, 0.85);
      disc(R * 0.28, R * 0.36, 0.7);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const tick = new THREE.Mesh(new THREE.PlaneGeometry(0.16, R * 0.34), mat(0.9, true));
        tick.rotation.x = -Math.PI / 2;
        tick.rotation.z = -a;
        tick.position.set(Math.cos(a) * R * 0.92, 0.03, Math.sin(a) * R * 0.92);
        spin.add(tick);
      }
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const spark = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.14), mat(0.95, true));
        spark.position.set(Math.cos(a) * R * 0.85, 0.2, Math.sin(a) * R * 0.85);
        spark.userData.rise = 2 + i * 0.25;
        spark.userData.maxY = R * 3.4;
        pulse.add(spark);
      }
      spin.userData.spin = 0.7;
    } else {
      disc(R * 0.72, R * 0.86, 0.7);
      spin.userData.spin = 0.8;
    }

    aura.userData.mats = mats;
    aura.userData.spinGroup = spin;
    aura.userData.counterGroup = counter;
    aura.userData.pulseGroup = pulse;
    return aura;
  }

  /** Liga as auras de status da entidade e dispara bursts quando um status começa. */
  private applyStatusAuras(g: THREE.Group, flags: Record<string, boolean>, scale = 1) {
    const prev = g.userData.statusFlags as Record<string, boolean> | undefined;
    const started = (k: string) => !!flags[k] && !prev?.[k];
    this.setAura(g, 'fortify', 0xffd76a, !!flags.fortify, 1.15 * scale);
    this.setAura(g, 'entangle', 0x6ad06a, !!flags.entangle, 1.1);
    this.setAura(g, 'silenced', 0xb06aff, !!flags.silenced, 1.32);
    this.setAura(g, 'batForm', 0x9a3bff, !!flags.batForm, 1.5);
    this.setAura(g, 'channelingTeleport', 0x5aa9ff, !!flags.channelingTeleport, 1.7);
    const pos = g.position.clone();
    const head = pos.clone().add(new THREE.Vector3(0, 3.1 * scale, 0));
    if (started('fortify')) { this.ringPulse(pos.x, pos.z, 0xffd76a, 1.2 * scale, 2.6, 0.7); this.floatingText(t('Fortificado'), head, '#ffe7a6'); }
    if (started('entangle')) { this.sparkBurst(pos, 0x7ee07e, 14, 3.5, 0.9); this.floatingText(t('Enredado'), head, '#b7f5a8'); }
    if (started('silenced')) { this.sparkBurst(pos, 0xc78aff, 14, 3.5, 0.9); this.floatingText(t('Silenciado'), head, '#dcbcff'); }
    if (started('batForm')) { this.sparkBurst(pos, 0x7a4dff, 20, 4.2, 1); this.floatingText(t('Forma de Morcego'), head, '#c9b6ff'); }
    if (started('channelingTeleport')) { this.ringPulse(pos.x, pos.z, 0x5aa9ff, 1.1, 2.4, 0.8); this.floatingText(t('Canalizando…'), head, '#bcdcff'); }
    g.userData.statusFlags = flags;
  }

  /** Feedback de dano recebido: número flutuante e faíscas. */
  private hitFeedback(x: number, z: number, amount: number, height: number) {
    const base = new THREE.Vector3(x, this.heightAt(x, z), z);
    this.floatingText(`−${amount} HP`, base.clone().add(new THREE.Vector3(0, height, 0)), '#ff8585');
    this.sparkBurst(base.clone().add(new THREE.Vector3(0, height * 0.6, 0)), 0xff6a5a, 5, 2.2, 0.5);
  }

  /** Feedback de teleporte: rastro na origem e explosão no destino. */
  private teleportFeedback(fromX: number, fromZ: number, toX: number, toZ: number) {
    this.ringPulse(fromX, fromZ, 0x9fd0ff, 1, 2.6, 0.6);
    this.sparkBurst(new THREE.Vector3(toX, this.heightAt(toX, toZ), toZ), 0xbfe0ff, 14, 3.2, 0.8);
    this.ringPulse(toX, toZ, 0xbfe0ff, 1.1, 2.4, 0.7);
  }

  /** Efeito persistente de Revelar Área (visível só para o Vampiro) + burst ao iniciar. */
  private syncReveal(snap: Snapshot) {
    const reveal = snap.vampireReveal;
    const visible = !!reveal && teamOf(this.localOwner) === 'vampire';
    if (!visible) {
      if (this.revealEffect) this.revealEffect.visible = false;
      this.prevRevealKey = '';
      this.revealLabelSecond = -1;
      return;
    }
    const r = reveal!;
    const key = `${r.x.toFixed(1)}:${r.z.toFixed(1)}:${r.radius}`;
    if (!this.revealEffect || this.revealEffect.userData.radius !== r.radius) {
      if (this.revealEffect) this.disposeEffect(this.revealEffect);
      this.revealEffect = this.buildRevealEffect(r.radius);
      this.scene.add(this.revealEffect);
    }
    this.revealEffect.visible = true;
    this.revealEffect.position.set(r.x, this.heightAt(r.x, r.z), r.z);
    if (key !== this.prevRevealKey) {
      this.prevRevealKey = key;
      this.revealLabelSecond = -1;
      this.ringPulse(r.x, r.z, 0x9fd0ff, r.radius * 0.15, 8, 1);
      this.floatingText(t('Revelar Área'), new THREE.Vector3(r.x, this.heightAt(r.x, r.z) + 6, r.z), '#bfe4ff');
    }
    // Contagem regressiva legível enquanto a área fica revelada.
    const second = Math.ceil(r.remaining);
    if (second !== this.revealLabelSecond && second > 0) {
      this.revealLabelSecond = second;
      this.floatingText(`${second}s`, new THREE.Vector3(r.x, this.heightAt(r.x, r.z) + 3.4, r.z), '#cfe6ff');
    }
  }

  /** Círculo ritual de Revelar Área: brilho, anéis girando, raios e colunas. */
  private buildRevealEffect(radius: number): THREE.Group {
    const fx = new THREE.Group();
    fx.userData.radius = radius;
    const mats: THREE.MeshBasicMaterial[] = [];
    const mat = (opacity: number) => {
      const m = new THREE.MeshBasicMaterial({
        color: 0x9fd0ff, transparent: true, opacity, depthWrite: false,
        side: THREE.DoubleSide, toneMapped: false, blending: THREE.AdditiveBlending,
      });
      m.userData.baseOpacity = opacity;
      mats.push(m);
      return m;
    };
    const flat = (mesh: THREE.Mesh, y: number) => { mesh.rotation.x = -Math.PI / 2; mesh.position.y = y; return mesh; };
    const spin = new THREE.Group(); fx.add(spin);
    const counter = new THREE.Group(); fx.add(counter);
    const pulse = new THREE.Group(); fx.add(pulse);

    const glow = flat(new THREE.Mesh(new THREE.CircleGeometry(radius, 96), mat(0.14)), 0.03);
    fx.add(glow);
    counter.add(flat(new THREE.Mesh(new THREE.RingGeometry(radius * 0.86, radius * 1.02, 96), mat(0.28)), 0.04));
    fx.add(flat(new THREE.Mesh(new THREE.RingGeometry(radius * 0.965, radius, 96), mat(0.9)), 0.06));
    spin.add(flat(new THREE.Mesh(new THREE.RingGeometry(radius * 0.7, radius * 0.73, 96), mat(0.7)), 0.07));
    counter.add(flat(new THREE.Mesh(new THREE.RingGeometry(radius * 0.42, radius * 0.45, 96), mat(0.55)), 0.07));

    // Raios radiais girando (marca bem o círculo de longe).
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.PlaneGeometry(0.5, radius * 0.18), mat(0.8));
      flat(spoke, 0.08);
      spoke.rotation.z = -a;
      spoke.position.set(Math.cos(a) * radius * 0.84, 0.08, Math.sin(a) * radius * 0.84);
      spin.add(spoke);
    }

    // Colunas na borda e uma coluna central, para o volume saltar à vista.
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 7, 10, 1, true), mat(0.5));
      pillar.position.set(Math.cos(a) * radius * 0.995, 3.4, Math.sin(a) * radius * 0.995);
      pillar.userData.pulse = 0.25;
      pillar.userData.phase = i * 0.7;
      pulse.add(pillar);
    }
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.1, 11, 20, 1, true), mat(0.4));
    column.position.y = 5.4;
    pulse.add(column);

    fx.userData.mats = mats;
    fx.userData.spin = spin;
    fx.userData.counter = counter;
    fx.userData.pulse = pulse;
    return fx;
  }

  /** Gira, pulsa e anima as auras de status das entidades. */
  private animateAuras(g: THREE.Group, dt: number) {
    const t = this.animationTime;
    for (const key of Object.keys(g.userData)) {
      if (!key.startsWith('aura_')) continue;
      const aura = g.userData[key] as THREE.Group;
      if (!aura.visible) continue;
      const spin = aura.userData.spinGroup as THREE.Group | undefined;
      const counter = aura.userData.counterGroup as THREE.Group | undefined;
      const pulse = aura.userData.pulseGroup as THREE.Group | undefined;
      if (spin) spin.rotation.y += dt * ((spin.userData.spin as number) ?? 0.8);
      if (counter) counter.rotation.y += dt * ((counter.userData.spin as number) ?? -0.8);
      if (pulse) {
        pulse.children.forEach((child, i) => {
          if (child.userData.rise) {
            child.position.y += dt * (child.userData.rise as number);
            if (child.position.y > (child.userData.maxY as number)) child.position.y = 0.2;
          }
          if (child.userData.pulse) {
            const s = 1 + Math.sin(t * 4.5 + (child.userData.phase as number ?? i)) * (child.userData.pulse as number);
            child.scale.setScalar(s);
          }
        });
        const breath = 1 + Math.sin(t * 2.2) * 0.035;
        pulse.scale.set(breath, 1, breath);
      }
      const mats = aura.userData.mats as THREE.MeshBasicMaterial[];
      for (let i = 0; i < mats.length; i++) {
        const mat = mats[i]!;
        const base = (mat.userData.baseOpacity as number) ?? 0.6;
        mat.opacity = Math.max(0.05, base * (0.78 + Math.sin(t * 4 + i * 1.3) * 0.22));
      }
    }
  }

  /** Gira e pulsa o círculo de Revelar Área. */
  private animateReveal(dt: number) {
    const fx = this.revealEffect;
    if (!fx?.visible) return;
    const t = this.animationTime;
    const spin = fx.userData.spin as THREE.Group | undefined;
    const counter = fx.userData.counter as THREE.Group | undefined;
    const pulse = fx.userData.pulse as THREE.Group | undefined;
    if (spin) spin.rotation.y += dt * 0.4;
    if (counter) counter.rotation.y -= dt * 0.7;
    if (pulse) {
      pulse.children.forEach((child, i) => {
        if (child.userData.pulse) {
          const s = 1 + Math.sin(t * 3 + (child.userData.phase as number ?? i)) * (child.userData.pulse as number);
          child.scale.set(1, s, 1);
        }
      });
    }
    const mats = fx.userData.mats as THREE.MeshBasicMaterial[];
    for (let i = 0; i < mats.length; i++) {
      const mat = mats[i]!;
      const base = (mat.userData.baseOpacity as number) ?? 0.5;
      mat.opacity = Math.max(0.04, base * (0.72 + Math.sin(t * 2.6 + i * 0.9) * 0.28));
    }
  }

  /** Marcador global de morte: texto flutuante, poeira escura e um anel que se abre. */
  deathPulse(x: number, z: number, label: string) {
    const base = new THREE.Vector3(x, this.heightAt(x, z) + 1.2, z);
    this.floatingText(`☠ ${label}`, base.clone().add(new THREE.Vector3(0, 1.4, 0)), '#ff8a8a');
    this.dustEffect(base, '#6d1620');
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.0, 1.4, 32),
      new THREE.MeshBasicMaterial({ color: '#c0392b', transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.copy(base);
    this.addEffect(ring, new THREE.Vector3(0, 0, 0), 1.6, false, undefined, 3.2);
  }

  // ---------- seleção ----------

  setSelection(ids: number[]) {
    for (const [, ring] of this.selectionRings) {
      this.scene.remove(ring);
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
    }
    this.selectionRings.clear();
    for (const id of ids) {
      const g = this.unitMeshes.get(id);
      if (!g) continue;
      const isVamp = g.userData.kind === 'vampire';
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.9, 1.15, 24),
        new THREE.MeshBasicMaterial({
          color: isVamp ? 0xdb2a2a : 0x3adb8a,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.copy(g.position).add(new THREE.Vector3(0, 0.15, 0));
      this.scene.add(ring);
      this.selectionRings.set(id, ring);
    }
  }

  setBuildingSelection(id: number | null) {
    this.setTowerRange('selection', null);
    if (this.buildingSelection) {
      this.scene.remove(this.buildingSelection);
      this.buildingSelection.geometry.dispose();
      (this.buildingSelection.material as THREE.Material).dispose();
      this.buildingSelection = null;
    }
    const g = id === null ? undefined : this.buildingMeshes.get(id);
    if (!g) return;
    const h = BUILDING_SIZE[g.userData.kind as BuildingKind] / 2 + 0.3;
    const points = [[-h, -h], [h, -h], [h, h], [-h, h]].map(([x, z]) =>
      new THREE.Vector3(g.position.x + x!, this.heightAt(g.position.x + x!, g.position.z + z!) + 0.2, g.position.z + z!));
    this.buildingSelection = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x6ad6ff, depthTest: false }));
    this.scene.add(this.buildingSelection);
    if (g.userData.kind === 'tower') this.setTowerRange('selection', g.position);
  }

  /** O raio visual usa a mesma constante do combate autoritativo. */
  setTowerRange(source: 'placement' | 'selection', center: { x: number; z: number } | null, color = 0x7fcaff) {
    let ring = this.towerRanges.get(source);
    if (!center) {
      if (ring) {
        this.scene.remove(ring);
        ring.geometry.dispose();
        ring.material.dispose();
        this.towerRanges.delete(source);
      }
      return;
    }
    if (!ring) {
      const geometry = new THREE.RingGeometry(TOWER.range - 0.10, TOWER.range + 0.10, 128);
      geometry.rotateX(-Math.PI / 2);
      ring = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false, depthTest: false,
      }));
      ring.renderOrder = 10;
      this.scene.add(ring);
      this.towerRanges.set(source, ring);
    }
    ring.material.color.setHex(color);
    const key = `${center.x}:${center.z}`;
    if (ring.userData.center === key) return;
    ring.userData.center = key;
    ring.position.set(center.x, 0, center.z);
    const points = ring.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < points.count; i++) {
      points.setY(i, this.heightAt(center.x + points.getX(i), center.z + points.getZ(i)) + 0.16);
    }
    points.needsUpdate = true;
    ring.geometry.computeBoundingSphere();
  }

  unitScreenPosition(id: number): THREE.Vector3 | null {
    const g = this.unitMeshes.get(id);
    if (!g || !g.visible) return null;
    this.camera.updateMatrixWorld(true);
    return g.position.clone().add(new THREE.Vector3(0, g.userData.kind === 'vampire' ? 1.8 : 1, 0)).project(this.camera);
  }

  /** Unidade mais próxima do cursor (em pixels), para o indicador de alvo. */
  unitUnderCursor(nx: number, ny: number, maxPx = 18): number | undefined {
    const rect = this.renderer.domElement.getBoundingClientRect();
    let nearest = maxPx;
    let found: number | undefined;
    for (const [id, g] of this.unitMeshes) {
      if (!g.visible) continue;
      const p = this.unitScreenPosition(id);
      if (!p || p.z < -1 || p.z > 1) continue;
      const d = Math.hypot((p.x - nx) * rect.width / 2, (p.y - ny) * rect.height / 2);
      if (d < nearest) { nearest = d; found = id; }
    }
    return found;
  }

  /** Retículo vermelho sobre o inimigo sob o cursor (null esconde). */
  setHoverEnemy(id: number | null): void {
    if (this.hoverEnemyId === id) return;
    this.hoverEnemyId = id;
    if (id === null) {
      if (this.hoverRing) this.hoverRing.visible = false;
      return;
    }
    if (!this.hoverRing) {
      const group = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({ color: 0xff4b4b, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthTest: false, depthWrite: false, toneMapped: false });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.95, 1.14, 28), mat);
      ring.rotation.x = -Math.PI / 2;
      group.add(ring);
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2;
        const tick = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.42), mat);
        tick.rotation.x = -Math.PI / 2;
        tick.rotation.z = -a;
        tick.position.set(Math.cos(a) * 1.4, 0, Math.sin(a) * 1.4);
        group.add(tick);
      }
      group.renderOrder = 13;
      this.hoverRing = group;
      this.scene.add(group);
    }
    this.hoverRing.visible = true;
  }

  // ---------- marcador de habilidade ----------

  private abilityMarker: THREE.Group | null = null;

  /** Anel de pré-visualização da habilidade no chão (raio 0 = marcador de alvo). */
  setAbilityMarker(x: number, z: number, radius: number, color: number): void {
    if (!this.abilityMarker) {
      const group = new THREE.Group();
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.94, 1, 64),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.75, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
      );
      ring.name = 'ring';
      ring.rotation.x = -Math.PI / 2;
      const dot = new THREE.Mesh(
        new THREE.RingGeometry(0.2, 0.32, 24),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
      );
      dot.name = 'dot';
      dot.rotation.x = -Math.PI / 2;
      group.add(ring, dot);
      group.renderOrder = 6;
      this.abilityMarker = group;
      this.scene.add(group);
    }
    const ring = this.abilityMarker.getObjectByName('ring') as THREE.Mesh;
    const dot = this.abilityMarker.getObjectByName('dot') as THREE.Mesh;
    ring.scale.setScalar(Math.max(1.2, radius));
    (ring.material as THREE.MeshBasicMaterial).color.setHex(color);
    (dot.material as THREE.MeshBasicMaterial).color.setHex(color);
    this.abilityMarker.position.set(x, this.heightAt(x, z) + 0.14, z);
    this.abilityMarker.visible = true;
  }

  clearAbilityMarker(): void {
    if (this.abilityMarker) this.abilityMarker.visible = false;
  }

  // ---------- dia / noite ----------

  /** Ponto do chão que a câmera observa; usado para posicionar a sombra. */
  setShadowFocus(x: number, z: number) {
    this.shadowFocus.set(x, 0, z);
  }

  /** Posiciona sol e alvo acompanhando o foco, mantendo o frustum de sombra pequeno. */
  private updateSunFollow() {
    const y = this.heightAt(this.shadowFocus.x, this.shadowFocus.z);
    const { x, z } = this.shadowFocus;
    this.sun.target.position.set(x, y, z);
    this.sun.position.set(
      x + this.sunDir.x * this.sunDistance,
      y + this.sunDir.y * this.sunDistance,
      z + this.sunDir.z * this.sunDistance,
    );
    this.sun.target.updateMatrixWorld();
  }

  updateDayNight(phase: 'day' | 'night', phaseTime: number, day: number, phaseTotal: number) {
    const DAY_SKY = new THREE.Color(0x87b5e0);
    const NIGHT_SKY = new THREE.Color(0x0a0d1f);
    const DUSK_SKY = new THREE.Color(0xc07050);

    // t: 0 início da fase → 1 fim (duração configurada no lobby)
    const total = Math.max(1, phaseTotal);
    const elapsed = total - phaseTime;
    const t = Math.min(1, elapsed / total);

    const sky = new THREE.Color();
    if (phase === 'day') {
      // amanhecer (dusk color) → dia claro → entardecer
      if (t < 0.15) sky.copy(DUSK_SKY).lerp(DAY_SKY, t / 0.15);
      else if (t > 0.85) sky.copy(DAY_SKY).lerp(DUSK_SKY, (t - 0.85) / 0.15);
      else sky.copy(DAY_SKY);
      const ang = t * Math.PI; // sol nasce e se põe
      // Sol alto: sombras curtas e "sentadas" nos modelos (sem esticar demais),
      // mas nítidas e escuras pelo frustum pequeno + pouca luz de preenchimento.
      this.sunDir.set(Math.cos(ang) * 75, Math.max(150, Math.sin(ang) * 35 + 145), 45).normalize();
      this.sun.intensity = 1.6 * Math.max(0.2, Math.sin(ang));
      this.sun.color.setHex(t > 0.8 ? 0xffb080 : 0xffeecc);
      // Luz de preenchimento baixa: aumenta o contraste e escurece as sombras.
      this.hemi.intensity = 1.0;
      this.fog.near = 240;
      this.fog.far = 900;
    } else {
      sky.copy(NIGHT_SKY);
      // lua fixa
      this.sunDir.set(-80, 100, -60).normalize();
      this.sun.color.setHex(0x8a9cd8);
      this.sun.intensity = 0.35;
      this.hemi.intensity = 0.25;
      this.fog.near = 60;
      this.fog.far = 320;
    }
    this.fog.color.copy(sky);
    this.scene.background = sky;
    // À noite o vampiro vê melhor no escuro: sombra de guerra mais leve para ele.
    const vampireAtNight = phase === 'night' && teamOf(this.localOwner) === 'vampire';
    this.fogUniforms.uFogStrength.value = phase === 'night'
      ? vampireAtNight ? FOG_VAMPIRE_NIGHT_STRENGTH : FOG_NIGHT_STRENGTH
      : FOG_DAY_STRENGTH;

    // tochas piscam à noite
    if (phase === 'night' && this.torches.length === 0) {
      for (let i = 0; i < 6; i++) {
        const pl = new THREE.PointLight(0xffa030, 0, 26, 1.8);
        this.torches.push(pl);
        this.scene.add(pl);
      }
    }
    for (let i = 0; i < this.torches.length; i++) {
      const pl = this.torches[i]!;
      // Tochas da vila: nunca nas estruturas da base do vampiro.
      const b = [...this.buildingMeshes.values()].filter((g) => g.userData.done && g.userData.kind !== 'crypt');
      if (b.length === 0) continue;
      const target = b[i % b.length]!;
      pl.position.set(target.position.x, this.heightAt(target.position.x, target.position.z) + 4, target.position.z);
      pl.intensity = phase === 'night' ? 12 + Math.sin(this.renderer.info.render.frame * 0.2 + i) * 3 : 0;
    }
  }

  // ---------- picking ----------

  screenToGround(nx: number, ny: number): THREE.Vector3 | null {
    this.camera.updateMatrixWorld(true);
    this.terrain.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    for (const deck of this.bridgeDecks) deck.updateMatrixWorld(true);
    return this.raycaster.intersectObjects([this.terrain, ...this.bridgeDecks], false)[0]?.point ?? null;
  }

  pickAt(nx: number, ny: number): { unitId?: number; nodeId?: number; buildingId?: number } {
    this.camera.updateMatrixWorld(true);
    this.scene.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    // Unidades reveladas têm prioridade sobre copas/telhados que as encobrem.
    const unitHit = this.raycaster.intersectObjects([...this.unitMeshes.values()].filter(g => g.visible), true)[0];
    if (unitHit) {
      for (let o: THREE.Object3D | null = unitHit.object; o; o = o.parent) {
        if (o.userData.pick) return o.userData.pick;
      }
    }
    // Tolerância em pixels igual à do retículo de alvo (unitUnderCursor): se o
    // cursor marcou uma unidade, o clique deve acertá-la mesmo que a geometria
    // esteja escondida por uma copa, tronco ou estrutura.
    const unitId = this.unitUnderCursor(nx, ny);
    if (unitId !== undefined) return { unitId };

    const rect = this.renderer.domElement.getBoundingClientRect();
    // Entre estruturas e recursos, conserva a ordem de profundidade.
    const hits = this.raycaster.intersectObjects([
      ...[...this.buildingMeshes.values()].filter(g => g.visible), ...this.nodeMeshes.values(),
      ...this.woodInstances,
      ...this.mapOccluders, this.terrain,
    ], true);
    const hit = hits[0];
    let hitPick: { unitId?: number; nodeId?: number; buildingId?: number } | undefined;
    let woodNodeId: number | undefined;
    if (hit) {
      // Árvores de madeira são instanciadas: instanceId → nó.
      const ids = (hit.object.userData as { woodNodeIds?: number[] }).woodNodeIds;
      if (ids && hit.instanceId !== undefined) {
        woodNodeId = ids[hit.instanceId];
      } else if (hit.object !== this.terrain) {
        for (let o: THREE.Object3D | null = hit.object; o; o = o.parent) {
          if (o.userData.pick) { hitPick = o.userData.pick; break; }
        }
      }
    }
    // Muros e estruturas finas/vasadas são difíceis de acertar no pixel: escolhe
    // o prédio mais próximo na tela dentro da folga; se não houver nenhum perto
    // do centro projetado (construções grandes, como a Cripta), usa a área do
    // prédio no mundo sob o clique. A construção vence a árvore do raio: sob
    // uma copa, clicar na edificação não deve virar coleta de madeira.
    const groundPoint = hits.find((h) => h.object === this.terrain)?.point;
    const buildingId = hitPick?.buildingId
      ?? this.buildingAtScreen(nx, ny, rect)
      ?? (groundPoint ? this.buildingAtWorld(groundPoint.x, groundPoint.z) : undefined);
    if (buildingId !== undefined) return { buildingId };
    if (woodNodeId !== undefined) return { nodeId: woodNodeId };
    return hitPick ?? {};
  }

  /** Prédio (visível) cuja área no mundo contém ou beira o ponto clicado. */
  private buildingAtWorld(x: number, z: number): number | undefined {
    let nearest = 2 * 2;
    let found: number | undefined;
    for (const [id, g] of this.buildingMeshes) {
      if (!g.visible) continue;
      const half = (BUILDING_SIZE[g.userData.kind as BuildKind] ?? 6) * 0.5 + 2;
      const dx = Math.max(0, Math.abs(x - g.position.x) - half);
      const dz = Math.max(0, Math.abs(z - g.position.z) - half);
      const d2 = dx * dx + dz * dz;
      if (d2 < nearest) { nearest = d2; found = id; }
    }
    return found;
  }

  /** Prédio (visível) mais próximo do cursor, para seleção tolerante. */
  buildingUnderCursor(nx: number, ny: number): number | undefined {
    const rect = this.renderer.domElement.getBoundingClientRect();
    return this.buildingAtScreen(nx, ny, rect);
  }

  /** Prédio cujo centro projetado está mais perto do cursor, dentro da folga. */
  private buildingAtScreen(nx: number, ny: number, rect: DOMRect): number | undefined {
    let nearest = 28;
    let found: number | undefined;
    const center = new THREE.Vector3();
    for (const [id, g] of this.buildingMeshes) {
      if (!g.visible) continue;
      new THREE.Box3().setFromObject(g).getCenter(center);
      const v = center.project(this.camera);
      if (v.z < -1 || v.z > 1) continue;
      const d = Math.hypot((v.x - nx) * rect.width / 2, (v.y - ny) * rect.height / 2);
      if (d < nearest) { nearest = d; found = id; }
    }
    return found;
  }

  render(dt: number) {
    this.animationTime += dt;
    if (this.hoverEnemyId !== null && this.hoverRing) {
      const target = this.unitMeshes.get(this.hoverEnemyId);
      if (target && target.visible) {
        this.hoverRing.visible = true;
        this.hoverRing.position.set(target.position.x, this.heightAt(target.position.x, target.position.z) + 0.16, target.position.z);
        this.hoverRing.scale.setScalar(1 + Math.sin(this.animationTime * 6) * 0.08);
      } else {
        this.hoverRing.visible = false;
      }
    }
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const effect = this.effects[i]!;
      effect.age += dt;
      if (effect.age >= effect.lifetime) {
        this.disposeEffect(effect.object); this.effects.splice(i, 1); effect.onComplete?.(); continue;
      }
      effect.object.position.addScaledVector(effect.velocity, dt);
      if (effect.growth) effect.object.scale.addScalar(dt * effect.growth);
      if (effect.spin) effect.object.rotation.z += dt * 5;
      effect.object.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const mat of materials) if (mat.transparent) mat.opacity = Math.min(1, (effect.lifetime - effect.age) * 2);
        }
      });
    }
    for (const g of this.unitMeshes.values()) this.animateAuras(g, dt);
    for (const g of this.buildingMeshes.values()) this.animateAuras(g, dt);
    this.animateReveal(dt);
    for (const g of this.buildingMeshes.values()) {
      const sign = g.getObjectByName('tavernSign');
      if (sign) sign.rotation.z = Math.sin(this.animationTime * 1.8 + g.position.x) * 0.08;
    }
    // interpolação das unidades
    for (const g of this.unitMeshes.values()) {
      const tx = g.userData.tx ?? g.position.x;
      const tz = g.userData.tz ?? g.position.z;
      const dx = tx - g.position.x, dz = tz - g.position.z;
      const walking = g.userData.activity === 'moving' && Math.hypot(dx, dz) > 0.015;
      const working = ['gathering', 'building', 'repairing', 'attacking'].includes(g.userData.activity);
      if (walking) g.rotation.y = Math.atan2(dx, dz);
      if (g.userData.externalAsset) {
        const externalWorking = ['gathering', 'building', 'repairing'].includes(g.userData.activity);
        const animation = g.userData.activity === 'attacking'
          ? 'attack'
          : externalWorking
            ? 'working'
            : walking
              ? 'walking'
              : 'idle';
        updateExternalAnimation(g, animation, dt, animation === 'attack' ? (g.userData.attackDuration as number | undefined) : undefined);
      }
      const swing = Math.sin(this.animationTime * (working ? 11 : 9));
      for (const [name, sign] of [['leftLeg', 1], ['rightLeg', -1]] as const) {
        const limb = g.getObjectByName(name);
        if (limb) limb.rotation.x = walking ? swing * 0.6 * sign : 0;
      }
      const leftArm = g.getObjectByName('leftArm'), rightArm = g.getObjectByName('rightArm');
      if (leftArm) leftArm.rotation.x = walking ? -swing * 0.45 : working ? -0.5 : 0;
      if (rightArm) rightArm.rotation.x = working ? -0.85 + swing * 0.6 : walking ? swing * 0.35 : -0.15;
      const heldTool = g.getObjectByName('tool');
      if (heldTool) {
        heldTool.rotation.z = working ? Math.PI - 0.1 : -2.25;
        heldTool.rotation.x = 0;
      }
      for (const name of ['axe', 'pickaxe', 'hammer']) {
        const tool = g.getObjectByName(name);
        if (tool) tool.visible = name === ((g.userData.activity === 'building' || g.userData.activity === 'repairing') ? 'hammer' : g.userData.resource === 'gold' ? 'pickaxe' : 'axe');
      }
      const cloak = g.getObjectByName('cloak');
      if (cloak) {
        cloak.rotation.x = walking ? -0.1 + Math.sin(this.animationTime * 5) * 0.055 : Math.sin(this.animationTime * 1.8) * 0.015;
        cloak.rotation.z = Math.sin(this.animationTime * (walking ? 4 : 1.4)) * (walking ? 0.025 : 0.008);
      }
      g.position.x += (tx - g.position.x) * Math.min(1, dt * 10);
      g.position.z += (tz - g.position.z) * Math.min(1, dt * 10);
      g.position.y = this.heightAt(g.position.x, g.position.z);
      const bar = g.userData.bar as THREE.Mesh | undefined;
      if (bar) {
        bar.visible = g.visible;
        bar.position.set(g.position.x, g.position.y + (g.userData.healthBarHeight ?? 4.4), g.position.z);
        bar.quaternion.copy(this.camera.quaternion);
      }
    }
    for (const g of this.buildingMeshes.values()) {
      const bar = g.userData.bar as THREE.Mesh | undefined;
      if (bar) {
        bar.position.set(g.position.x, g.position.y + (g.userData.healthBarHeight ?? this.buildingBarHeight(g.userData.kind)) * g.scale.y, g.position.z);
        bar.quaternion.copy(this.camera.quaternion);
      }
    }
    // anéis seguem unidades
    for (const [id, ring] of this.selectionRings) {
      const g = this.unitMeshes.get(id);
      if (g) ring.position.set(g.position.x, g.position.y + 0.15, g.position.z);
    }
    this.unitReveal.update(this.renderer, this.camera, this.unitMeshes);
    // Atualiza a visão com as posições/facing já interpolados deste frame.
    this.updateFogVision();
    this.updateSunFollow();
    this.renderer.render(this.scene, this.camera);
    // Sombra de guerra por cima de tudo (sem teste de profundidade): reconstrói o
    // mundo no shader e escurece o que está fora da visão do time.
    if (this.fogUniforms.uVisionCount.value > 0) {
      this.fogUniforms.uInvViewProj.value.multiplyMatrices(this.camera.matrixWorld, this.camera.projectionMatrixInverse);
      this.renderer.autoClear = false;
      this.renderer.render(this.fogScene, this.fogCamera);
      this.renderer.autoClear = true;
    }
  }
}
