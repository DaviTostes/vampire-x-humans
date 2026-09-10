// Cena three.js: terreno do mapa por seed, entidades, ciclo dia/noite

import * as THREE from 'three';
import {
  DAY_LENGTH,
  NIGHT_LENGTH,
  BUILDING_SIZE,
  TOWER,
  COMPOUNDS,
  compoundEntrance,
  CRYPT_POSITION,
  type BuildingKind,
  WORLD,
  generateMap,
  type GameMap,
  type Snapshot,
} from '@vampire/shared';
import { createBuildingModel, createUnitModel, createResourceModel, orientEntranceWall, createPineCanopyGeometry, createRockGeometry, createLanternModel } from './models.js';
import { RTS_CAMERA } from './camera.js';
import { UnitReveal } from './unit-reveal.js';

const WORLD_SIZE = WORLD.tiles * WORLD.tileSize;


export class GameScene {
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  map: GameMap;

  private container: HTMLElement;
  private unitMeshes = new Map<number, THREE.Group>();
  private buildingMeshes = new Map<number, THREE.Group>();
  private nodeMeshes = new Map<number, THREE.Group>();
  private woodTrunks: THREE.InstancedMesh | null = null;
  private woodCrowns: THREE.InstancedMesh | null = null;
  private woodKey = '';
  private hpBars = new Map<number, THREE.Mesh>();
  private selectionRings = new Map<number, THREE.Mesh>();
  private sun: THREE.DirectionalLight;
  private hemi: THREE.HemisphereLight;
  private fog: THREE.Fog;
  private torches: THREE.PointLight[] = [];
  private raycaster = new THREE.Raycaster();
  private terrain!: THREE.Mesh;
  private buildingSelection: THREE.LineLoop | null = null;
  private towerRanges = new Map<'placement' | 'selection', THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>>();
  private mapOccluders: THREE.Mesh[] = [];
  private unitReveal = new UnitReveal();
  private animationTime = 0;
  private effects: Array<{ object: THREE.Object3D; age: number; lifetime: number; velocity: THREE.Vector3; spin: boolean; onComplete?: () => void }> = [];

  constructor(container: HTMLElement, seed: number) {
    this.container = container;
    this.map = generateMap(seed);

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
      600,
    );
    const initialDistance = RTS_CAMERA.distance * RTS_CAMERA.initialZoom;
    const groundHeight = this.heightAt(0, 0);
    this.camera.position.set(0, groundHeight + initialDistance * RTS_CAMERA.elevation, initialDistance * RTS_CAMERA.depth);
    this.camera.lookAt(0, groundHeight, 0);

    this.fog = new THREE.Fog(0x8a9db8, 120, 400);
    this.scene.fog = this.fog;

    this.hemi = new THREE.HemisphereLight(0xbfd4ff, 0x3a4a33, 0.9);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffeecc, 1.6);
    this.sun.position.set(60, 100, 30);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    Object.assign(this.sun.shadow.camera, { left: -WORLD.half, right: WORLD.half, top: WORLD.half, bottom: -WORLD.half, near: 1, far: 500 });
    this.sun.shadow.bias = -0.001;
    this.scene.add(this.sun);
    this.scene.add(new THREE.AmbientLight(0x404060, 0.4));

    this.buildTerrain();
    this.buildFixedMap();
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

    const cGrass = new THREE.Color('#415549');
    const cDry = new THREE.Color('#65654b');
    const cRock = new THREE.Color('#65717a');
    const cSand = new THREE.Color('#7a7864');
    const tmp = new THREE.Color();

    for (let iy = 0; iy <= seg; iy++) {
      for (let ix = 0; ix <= seg; ix++) {
        const vi = iy * (seg + 1) + ix;
        const tx = Math.min(n - 1, ix);
        const tz = Math.min(n - 1, iy);
        const i = tz * n + tx;
        const h = this.map.height[i] ?? 0;
        const y = this.map.water[i] ? 1 : h * 14;
        pos.setY(vi, y);
        if (this.map.water[i]) tmp.copy(cSand).lerp(cRock, 0.2);
        else if (h > 0.62) tmp.copy(cRock);
        else tmp.copy(cGrass).lerp(cDry, (h - 0.22) * 1.5);
        // Clareiras suaves na própria terra, sem pisos quadrados destacados.
        const wx = tx * WORLD.tileSize - WORLD.half, wz = tz * WORLD.tileSize - WORLD.half;
        for (const c of COMPOUNDS) {
          const d = Math.hypot((wx - c.x) / (c.width * 0.55), (wz - c.z) / (c.depth * 0.55));
          if (d < 1.3) tmp.lerp(new THREE.Color('#72774b'), Math.max(0, 1 - d / 1.3) * 0.4);
        }
        colors[vi * 3] = tmp.r;
        colors[vi * 3 + 1] = tmp.g;
        colors[vi * 3 + 2] = tmp.b;
      }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
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
    this.scene.add(water);
  }

  private buildFixedMap() {
    const stone = new THREE.MeshLambertMaterial({ color: 0x465366 });
    const addBox = (x: number, z: number, w: number, d: number, h: number, mat: THREE.Material, base = 3) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(x, base + h / 2, z);
      this.unitReveal.apply(mesh);
      this.scene.add(mesh);
      return mesh;
    };
    // Trilhas gastas e esparsas, em vez de avenidas retas até bases artificiais.
    for (const c of COMPOUNDS) {
      const door = compoundEntrance(c);
      const length = Math.hypot(door.x, door.z);
      for (let d = 12; d < length; d += 4) {
        const t = d / length;
        const patch = new THREE.Mesh(new THREE.CircleGeometry(1.5, 7), new THREE.MeshLambertMaterial({ color: '#817355', transparent: true, opacity: 0.14 }));
        patch.rotation.x = -Math.PI / 2;
        patch.position.set(door.x * t + Math.sin(d * 0.13), 3.04, door.z * t);
        patch.scale.set(1, 1.8, 1);
        this.scene.add(patch);
      }
      for (const side of [-1, 1]) {
        const horizontal = c.facing === 'north' || c.facing === 'south';
        const x = door.x + (horizontal ? side * 2.2 : 0);
        const z = door.z + (horizontal ? 0 : side * 2.2);
        addBox(x, z, 0.3, 0.3, 3, new THREE.MeshLambertMaterial({ color: 0x3c2c25 }));
        const lamp = createLanternModel();
        lamp.position.set(x, 5.25, z + 0.18);
        this.scene.add(lamp);
      }
    }
    const rockTransforms: THREE.Matrix4[] = [], rockColors: THREE.Color[] = [];
    const rockDummy = new THREE.Object3D();
    const mossTransforms: THREE.Matrix4[] = [];
    for (const wall of this.map.obstacles) {
      const horizontal = wall.width > wall.depth;
      const length = Math.max(wall.width, wall.depth);
      // Maciço rochoso contínuo, coberto por blocos facetados e musgo.
      this.mapOccluders.push(addBox(wall.x, wall.z, wall.width, wall.depth, 2.1, stone));
      const count = Math.ceil(length / 3);
      const step = length / count;
      for (let i = 0; i < count; i++) {
        const pos = -length / 2 + step * (i + 0.5);
        const height = 4.3 + (Math.sin(i * 2.7 + wall.x) + 1) * 1.8;
        rockDummy.scale.set(horizontal ? step * 0.65 : wall.width / 2, height / 2, horizontal ? wall.depth / 2 : step * 0.65);
        rockDummy.position.set(wall.x + (horizontal ? pos : 0), 3 + height / 2, wall.z + (horizontal ? 0 : pos));
        rockDummy.rotation.set(0, 0, 0);
        rockDummy.updateMatrix(); rockTransforms.push(rockDummy.matrix.clone());
        rockColors.push(new THREE.Color(i % 3 ? '#657078' : '#77807c'));
        if (i % 3 === 0) {
          rockDummy.position.y += height * 0.35;
          rockDummy.scale.set(1.1, 0.3, 1);
          rockDummy.updateMatrix(); mossTransforms.push(rockDummy.matrix.clone());
        }
      }
    }
    const rocks = new THREE.InstancedMesh(createRockGeometry(), new THREE.MeshLambertMaterial({ color: 0xffffff }), rockTransforms.length);
    rockTransforms.forEach((matrix, i) => { rocks.setMatrixAt(i, matrix); rocks.setColorAt(i, rockColors[i]!); });
    rocks.castShadow = true; rocks.receiveShadow = true;
    this.unitReveal.apply(rocks);
    this.scene.add(rocks); this.mapOccluders.push(rocks);
    const moss = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.8), new THREE.MeshLambertMaterial({ color: '#425341' }), mossTransforms.length);
    mossTransforms.forEach((matrix, i) => moss.setMatrixAt(i, matrix));
    this.unitReveal.apply(moss);
    this.scene.add(moss);
    const plaza = new THREE.Mesh(new THREE.CircleGeometry(10, 32), new THREE.MeshLambertMaterial({ color: 0x707775 }));
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.y = 3.06;
    this.scene.add(plaza);
    const ring = new THREE.Mesh(new THREE.RingGeometry(8.7, 9, 32), new THREE.MeshBasicMaterial({ color: 0xa49b7e }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 3.08;
    this.scene.add(ring);
    // Base do vampiro: piso sombrio e círculo rúnico. O terreno sobe perto da
    // borda norte, então cada vértice acompanha a altura para o círculo fechar.
    const drape = (geo: THREE.BufferGeometry, lift: number) => {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, this.heightAt(CRYPT_POSITION.x + pos.getX(i), CRYPT_POSITION.z + pos.getZ(i)) + lift);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    };
    const baseGeo = new THREE.RingGeometry(0.02, 16, 64, 8);
    baseGeo.rotateX(-Math.PI / 2);
    drape(baseGeo, 0.02);
    const base = new THREE.Mesh(baseGeo, new THREE.MeshLambertMaterial({ color: 0x2a2130 }));
    base.position.set(CRYPT_POSITION.x, 0, CRYPT_POSITION.z);
    this.scene.add(base);
    const runeGeo = new THREE.RingGeometry(14.2, 14.6, 64, 1);
    runeGeo.rotateX(-Math.PI / 2);
    drape(runeGeo, 0.05);
    const rune = new THREE.Mesh(runeGeo, new THREE.MeshBasicMaterial({ color: 0x8e2a35 }));
    rune.position.set(CRYPT_POSITION.x, 0, CRYPT_POSITION.z);
    this.scene.add(rune);
  }

  /** altura do terreno em coordenadas de mundo */
  heightAt(x: number, z: number): number {
    const n = this.map.tiles;
    const gx = THREE.MathUtils.clamp((x + WORLD.half) / WORLD.tileSize, 0, n - 0.0001);
    const gz = THREE.MathUtils.clamp((z + WORLD.half) / WORLD.tileSize, 0, n - 0.0001);
    const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
    const height = (dx: number, dz: number) => {
      const i = Math.min(n - 1, tz + dz) * n + Math.min(n - 1, tx + dx);
      return this.map.water[i] ? 1 : (this.map.height[i] ?? 0) * 14;
    };
    const a = height(0, 0), b = height(1, 0), c = height(0, 1), d = height(1, 1);
    // Mesma diagonal e interpolação dos triângulos da PlaneGeometry.
    return fx + fz <= 1 ? a + (b - a) * fx + (c - a) * fz :
      d + (c - d) * (1 - fx) + (b - d) * (1 - fz);
  }

  // ---------- sync de entidades ----------

  sync(snap: Snapshot) {
    const seenUnits = new Set<number>();
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
      g.userData.tx = u.x;
      g.userData.tz = u.z;
      g.userData.kind = u.kind;
      g.userData.hp = u.hp;
      g.userData.maxHp = u.maxHp;
      g.userData.activity = u.activity;
      g.userData.resource = u.carryRes ?? snap.nodes.find(n => n.id === u.targetId)?.kind;
      const target = snap.nodes.find(n => n.id === u.targetId) ?? snap.buildings.find(b => b.id === u.targetId) ?? snap.units.find(t => t.id === u.targetId);
      if (target && (u.activity === 'gathering' || u.activity === 'building' || u.activity === 'repairing' || u.activity === 'attacking')) {
        g.rotation.y = Math.atan2(target.x - g.position.x, target.z - g.position.z);
      }
      if (!g.userData.bar) this.addHealthBar(g, u.id);
      this.updateHealthBar(u.id, u.hp, u.maxHp);
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
      if (g && (g.userData.done !== b.done || (b.kind === 'wall' && g.userData.level !== b.level))) {
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
      g.userData.kind = b.kind;
      g.userData.hp = b.hp;
      g.userData.maxHp = b.maxHp;
      g.userData.done = b.done;
      g.userData.level = b.level;
      g.userData.goldProduced = b.goldProduced ?? 0;
      g.userData.recruiting = !!b.recruitment;
      if (recruited) this.floatingText('Peão pronto', g.position.clone().add(new THREE.Vector3(0, 5, 0)), '#c0e4a7');
      if (b.lastShot && b.lastShot.tick !== g.userData.lastShotTick) {
        if (g.userData.lastShotTick !== undefined || snap.tick - b.lastShot.tick <= 2) this.towerShotEffect(g, b.lastShot);
        g.userData.lastShotTick = b.lastShot.tick;
      }
      if (goldDelta > 0) this.productionEffect(g.position, goldDelta);
      if (completed) {
        this.floatingText('Obra concluída', g.position.clone().add(new THREE.Vector3(0, 5, 0)), '#c0e4a7');
        this.dustEffect(g.position, '#bca77f');
      }
      g.scale.y = b.done ? 1 : Math.max(0.15, b.progress);
      if (!g.userData.bar) this.addBuildingHealthBar(g, b.id, b.kind);
      else if (!this.hpBars.has(b.id)) this.hpBars.set(b.id, g.userData.bar);
      // Reaproveita a barra ao reconstruir o modelo na conclusão da obra.
      g.userData.bar = this.hpBars.get(b.id);
      this.updateHealthBar(b.id, b.hp, b.maxHp);
    }
    for (const [id, g] of this.buildingMeshes) {
      if (!seenBuildings.has(id)) {
        this.scene.remove(g);
        this.buildingMeshes.delete(id);
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
  }

  /** Toda árvore de madeira é um nó coletável: render instanciado, 3 árvores por nó. */
  private syncWoodNodes(wood: Array<{ id: number; x: number; z: number }>) {
    const key = wood.map(n => n.id).join(',');
    if (key === this.woodKey) return;
    this.woodKey = key;
    if (this.woodTrunks) {
      this.scene.remove(this.woodTrunks);
      this.woodTrunks.geometry.dispose();
      (this.woodTrunks.material as THREE.Material).dispose();
      this.woodTrunks = null;
    }
    if (this.woodCrowns) {
      this.scene.remove(this.woodCrowns);
      this.woodCrowns.geometry.dispose();
      (this.woodCrowns.material as THREE.Material).dispose();
      this.woodCrowns = null;
    }
    const PER = 3;
    const ids: number[] = [];
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
    const m = new THREE.Matrix4();
    const rotation = new THREE.Quaternion(), scale = new THREE.Vector3(), position = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    let k = 0;
    for (const nd of wood) {
      const y = this.heightAt(nd.x, nd.z);
      for (let t = 0; t < PER; t++) {
        const a = nd.id * 2.4 + t * 2.1;
        const size = 0.75 + (((nd.id * 13 + t * 7) % 9) / 9) * 0.45;
        rotation.setFromAxisAngle(up, a);
        scale.set(size * 0.88, size, size * 0.88);
        position.set(nd.x + Math.sin(a) * 1.7, y + 1.5 * size, nd.z + Math.cos(a) * 1.7);
        m.compose(position, rotation, scale);
        trunks.setMatrixAt(k, m);
        position.set(nd.x + Math.sin(a) * 1.7, y + 2.1 * size, nd.z + Math.cos(a) * 1.7);
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
    this.woodTrunks = trunks;
    this.woodCrowns = crowns;
    this.scene.add(trunks, crowns);
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
      case 'forge': return 6.6;
      case 'relic': return 8.4;
      case 'mist': return 7.2;
      case 'shrine': return 7.4;
      default: return 8;
    }
  }

  private sizeLabel(label: THREE.Sprite) {
    const unit = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) / this.container.clientHeight;
    label.scale.set(180 * unit, 32 * unit, 1);
  }

  private addEffect(object: THREE.Object3D, velocity: THREE.Vector3, lifetime: number, spin = false, onComplete?: () => void) {
    if (this.effects.length >= 100) this.disposeEffect(this.effects.shift()!.object);
    this.scene.add(object);
    this.effects.push({ object, velocity, lifetime, age: 0, spin, onComplete });
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
    this.sizeLabel(sprite); sprite.position.copy(position);
    this.addEffect(sprite, new THREE.Vector3(0, 1.8, 0), 1.8);
  }

  private productionEffect(position: THREE.Vector3, amount: number) {
    this.floatingText(`+${amount} ouro`, position.clone().add(new THREE.Vector3(0, 8, 0)), '#ffe48b');
    for (let i = 0; i < Math.min(3, amount + 1); i++) {
      const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 12), new THREE.MeshBasicMaterial({ color: '#f8ca4f', transparent: true }));
      coin.position.copy(position).add(new THREE.Vector3((i - 1) * 0.6, 7, 0));
      coin.rotation.x = Math.PI / 2;
      this.addEffect(coin, new THREE.Vector3((i - 1) * 0.4, 2 + i * 0.2, 0), 1.5, true);
    }
  }

  private dustEffect(position: THREE.Vector3, color: string) {
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      const dust = new THREE.Mesh(new THREE.IcosahedronGeometry(0.35), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6, depthWrite: false }));
      dust.position.copy(position).add(new THREE.Vector3(0, 0.5, 0));
      this.addEffect(dust, new THREE.Vector3(Math.sin(a) * 1.5, 0.8, Math.cos(a) * 1.5), 1.2);
    }
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
    if (!g) return null;
    this.camera.updateMatrixWorld(true);
    return g.position.clone().add(new THREE.Vector3(0, g.userData.kind === 'vampire' ? 1.8 : 1, 0)).project(this.camera);
  }

  // ---------- dia / noite ----------

  updateDayNight(phase: 'day' | 'night', phaseTime: number, day: number) {
    const DAY_SKY = new THREE.Color(0x87b5e0);
    const NIGHT_SKY = new THREE.Color(0x0a0d1f);
    const DUSK_SKY = new THREE.Color(0xc07050);

    // t: 0 início do dia → 1 fim
    const total = phase === 'day' ? DAY_LENGTH : NIGHT_LENGTH;
    const elapsed = total - phaseTime;
    const t = Math.min(1, elapsed / total);

    const sky = new THREE.Color();
    if (phase === 'day') {
      // amanhecer (dusk color) → dia claro → entardecer
      if (t < 0.15) sky.copy(DUSK_SKY).lerp(DAY_SKY, t / 0.15);
      else if (t > 0.85) sky.copy(DAY_SKY).lerp(DUSK_SKY, (t - 0.85) / 0.15);
      else sky.copy(DAY_SKY);
      const ang = t * Math.PI; // sol nasce e se põe
      this.sun.position.set(Math.cos(ang) * 120, Math.max(10, Math.sin(ang) * 140), 40);
      this.sun.intensity = 1.6 * Math.max(0.2, Math.sin(ang));
      this.sun.color.setHex(t > 0.8 ? 0xffb080 : 0xffeecc);
      this.hemi.intensity = 1.4;
      this.fog.near = 120;
      this.fog.far = 400;
    } else {
      sky.copy(NIGHT_SKY);
      // lua fixa
      this.sun.position.set(-80, 100, -60);
      this.sun.color.setHex(0x8a9cd8);
      this.sun.intensity = 0.35;
      this.hemi.intensity = 0.25;
      this.fog.near = 40;
      this.fog.far = 180;
    }
    this.fog.color.copy(sky);
    this.scene.background = sky;

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
      const b = [...this.buildingMeshes.values()].filter((g) => g.userData.done &&
        !['crypt', 'forge', 'relic', 'mist', 'shrine'].includes(g.userData.kind));
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
    return this.raycaster.intersectObject(this.terrain, false)[0]?.point ?? null;
  }

  pickAt(nx: number, ny: number): { unitId?: number; nodeId?: number; buildingId?: number } {
    this.camera.updateMatrixWorld(true);
    this.scene.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2(nx, ny), this.camera);
    // Unidades reveladas têm prioridade sobre copas/telhados que as encobrem.
    const unitHit = this.raycaster.intersectObjects([...this.unitMeshes.values()], true)[0];
    if (unitHit) {
      for (let o: THREE.Object3D | null = unitHit.object; o; o = o.parent) {
        if (o.userData.pick) return o.userData.pick;
      }
    }
    // Pequena tolerância em pixels, inclusive sob árvores e estruturas.
    const rect = this.renderer.domElement.getBoundingClientRect();
    let nearest = 10;
    let unitId: number | undefined;
    for (const [id] of this.unitMeshes) {
      const p = this.unitScreenPosition(id)!;
      if (p.z < -1 || p.z > 1) continue;
      const d = Math.hypot((p.x - nx) * rect.width / 2, (p.y - ny) * rect.height / 2);
      if (d < nearest) { nearest = d; unitId = id; }
    }
    if (unitId !== undefined) return { unitId };
    // Entre estruturas e recursos, conserva a ordem de profundidade.
    const hits = this.raycaster.intersectObjects([
      ...this.buildingMeshes.values(), ...this.nodeMeshes.values(),
      ...(this.woodTrunks ? [this.woodTrunks, this.woodCrowns!] : []),
      ...this.mapOccluders, this.terrain,
    ], true);
    const hit = hits[0];
    if (hit) {
      // Árvores de madeira são instanciadas: instanceId → nó (3 instâncias por nó).
      const ids = (hit.object.userData as { woodNodeIds?: number[] }).woodNodeIds;
      if (ids && hit.instanceId !== undefined) {
        const nodeId = ids[hit.instanceId];
        if (nodeId !== undefined) return { nodeId };
      }
      if (hit.object !== this.terrain) {
        for (let o: THREE.Object3D | null = hit.object; o; o = o.parent) {
          if (o.userData.pick) return o.userData.pick;
        }
      }
    }
    return {};
  }

  render(dt: number) {
    this.animationTime += dt;
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const effect = this.effects[i]!;
      effect.age += dt;
      if (effect.age >= effect.lifetime) {
        this.disposeEffect(effect.object); this.effects.splice(i, 1); effect.onComplete?.(); continue;
      }
      effect.object.position.addScaledVector(effect.velocity, dt);
      if (effect.spin) effect.object.rotation.z += dt * 5;
      effect.object.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const mat of materials) if (mat.transparent) mat.opacity = Math.min(1, (effect.lifetime - effect.age) * 2);
        }
      });
    }
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
    this.renderer.render(this.scene, this.camera);
  }
}
