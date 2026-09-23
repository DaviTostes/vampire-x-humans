import { BUILDING_SIZE, BUILD_TILE_SIZE, buildingTiles, snapBuildingCoordinate, MAP_PRESETS, type BuildingKind, type BuildKind, type MapPresetId } from '@vampire/shared';
import { RELIEF_STEP, FLAT_GROUND_HEIGHT, clearGroundCells, withClearedTerrain, clearedAreaIntersects, carveTerrainStair, type TerrainStair } from '@vampire/shared';
// Editor de mapa 3D (estilo World Editor), acessível por ?builder=1.
// Reutiliza a cena real do jogo (terreno, luzes) e permite escolher um prop da
// paleta, colocar no terreno, selecionar, arrastar, girar, escalar e remover.
// Salva via /builder/save (senha MAP_BUILDER_PASSWORD) e a próxima partida usa.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getMapModel, getMapOverlay, setMapOverlay, setActiveMapId, normalizeOverlay, WORLD, BRIDGE_Y, type MapOverlay, type OverlayProp, type OverlayPropKind } from '@vampire/shared';
import { GameScene } from './scene.js';
import { assetRegistry } from './assets/asset-registry.js';
import { LoadingScreen } from './loading.js';
import { t } from './i18n.js';
import { EditorGuides } from './editor-guides.js';
import { createBuildingModel } from './models.js';
import { loadMapCatalog } from './map-catalog.js';
import { TreeOccupancy, treeFootprint, treeObstacles, TREE_SIZE } from '@vampire/shared';
import { insideMapBoundary, insidePlayableBoundary, playableMargin } from '@vampire/shared';
import { extendTerrainRelief } from '@vampire/shared';
import { brushPolicy, brushAnchor, brushSegment, moduleAnchor, footprintsOverlap, type PropFootprint } from './builder-brush.js';

interface Placed { kind: OverlayPropKind; x: number; z: number; rotY: number; scale: number; holder?: THREE.Group; mesh?: 'tree' | 'rock'; index?: number }

const requestedMap = new URLSearchParams(location.search).get('mapId') ?? 'flat';
let MAP_ID: MapPresetId = 'flat';

const PALETTE: Array<{ group: string; items: Array<{ id: string; label: string }> }> = [
  {
    group: 'Terreno',
    items: [
      { id: 'terrain:raise', label: 'Subir relevo' },
      { id: 'terrain:lower', label: 'Descer relevo' },
      { id: 'terrain:flatten', label: 'Planificar e limpar' },
      { id: 'terrain:stairs', label: 'Escada' },
    ],
  },
  {
    group: 'Piso',
    items: [
      { id: 'paint:path', label: 'Caminho (pedra)' },
      { id: 'paint:grass', label: 'Grama' },
    ],
  },
  {
    group: 'Cliffs',
    items: [
      { id: 'cliff:straight', label: 'Reto' },
      { id: 'cliff:outerCorner', label: 'Canto externo' },
      { id: 'cliff:innerCorner', label: 'Canto interno' },
    ],
  },
  {
    group: 'Natureza',
    items: [
      { id: 'tree', label: 'Árvore' },
      { id: 'rock', label: 'Pedra' },
    ],
  },
  {
    group: 'Construções',
    items: [
      { id: 'building:bank', label: 'Banco' },
      { id: 'building:taverna', label: 'Taverna' },
      { id: 'building:wall', label: 'Muro' },
      { id: 'building:tower', label: 'Torre' },
      { id: 'building:market', label: 'Mercado' },
      { id: 'building:keep', label: 'Fortaleza' },
      { id: 'building:crypt', label: 'Cripta' },
      { id: 'building:goldMine', label: 'Mina' },
    ],
  },
];

function makePropModel(kind: OverlayPropKind): THREE.Object3D | null {
  if (kind.startsWith('cliff:')) {
    return assetRegistry.cliffModule(kind.slice('cliff:'.length) as 'straight' | 'outerCorner' | 'innerCorner' | 'stairs');
  }
  if (kind === 'tree') return assetRegistry.propModel('prop:tree:evergreen');
  if (kind === 'rock') return assetRegistry.propModel('prop:rock:stone-cluster');
  if (kind.startsWith('building:')) {
    return createBuildingModel(kind.slice('building:'.length) as BuildingKind,0,true);
  }
  return null;
}

export async function startMapBuilder(container: HTMLElement) {
  try { await loadMapCatalog(); }
  catch { container.textContent = 'Não foi possível carregar os mapas. Recarregue para tentar novamente.'; return; }
  MAP_ID = Object.hasOwn(MAP_PRESETS, requestedMap) ? requestedMap as MapPresetId : 'flat';
  let key = new URLSearchParams(location.search).get('key') ?? '';
  console.log('[builder] start, key?', Boolean(key));

  // Sem senha: pede antes de carregar qualquer coisa.
  const auth = await ensureAuthorized(key);
  if (!auth) { console.warn('[builder] não autorizado'); return; }
  key = new URLSearchParams(location.search).get('key') ?? key;

  container.innerHTML = '';
  const loading = new LoadingScreen(container);
  await assetRegistry.preload((p) => loading.setProgress(p));
  await assetRegistry.loadCliffModules();
  await loading.finish();
  console.log('[builder] assets prontos');

  setActiveMapId(MAP_ID);
  const overlay = normalizeOverlay(await fetch(`/api/map-overlay?mapId=${MAP_ID}`).then((r) => r.json()).catch(() => null));
  // Legacy saves have no reservation mask. Compare against the original height
  // grid, ignoring the existing save's 0.001 rounding and explicitly flattened ground.
  if (!overlay.reliefOccupied && overlay.height) {
    const base = getMapModel(MAP_ID).generateMap().height;
    const clearedCells = new Set(overlay.cleared ?? []);
    overlay.reliefOccupied = overlay.height.flatMap((h,i) =>
      Math.abs(h-(base[i] ?? h))>0.0011 && !(clearedCells.has(i) && Math.abs(h-FLAT_GROUND_HEIGHT)<0.0011) ? [i] : []);
  }
  setMapOverlay(MAP_ID, overlay);
  console.log('[builder] overlay', overlay.props.length, 'props');

  let renderDirty = true, shadowsDirty = true;
  const invalidate = (shadows = false) => { renderDirty = true; shadowsDirty ||= shadows; };
  const world = new GameScene(container, getMapModel(MAP_ID).config.version, MAP_ID, true);
  const initialModel = world.model;
  const initialWater = world.map.water.slice(), initialBridge = world.map.bridge.slice(), initialForest = world.map.forest.slice();
  let cleared = new Set(overlay.cleared ?? []);
  let clearanceDirty = false;
  let lighting: 'day' | 'night' = 'day';
  let gridVisible = true, gridDirty = true, measuring = false;
  let referenceKind: BuildKind = 'wall';
  const invalidateGrid = () => { gridDirty=true; world.invalidateEditorBuildGrid(); };
  world.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
  world.renderer.shadowMap.autoUpdate = false;
  // Garante iluminação/céu de dia (o editor não roda o ciclo dia/noite).
  world.updateDayNight('day', 30, 1, 60);
  world.renderer.setClearColor(0x9db7d8, 1);
  console.log('[builder] cena criada; canvas', world.renderer.domElement.width, 'x', world.renderer.domElement.height);

  // ---------- câmera livre ----------
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 1, 2000);
  camera.position.set(0, 120, 160);
  const controls = new OrbitControls(camera, world.renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.update();
  controls.addEventListener('change', () => invalidate(true));
  world.camera = camera;
  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    world.renderer.setSize(container.clientWidth, container.clientHeight);
    invalidate(true);
  };
  window.addEventListener('resize', onResize);

  // ---------- estado dos props ----------
  const placed: Placed[] = [];
  const treeOccupancy = new TreeOccupancy();
  let treeGridDirty = true;
  const treesChanged = () => { treeGridDirty = true; invalidateGrid(); };
  const syncTreeGrid = () => {
    if (!treeGridDirty) return;
    world.map.treeObstacles = treeObstacles(placed);
    treeGridDirty = false;
  };
  const overlapsTree = (kind: BuildingKind, x: number, z: number) => {
    syncTreeGrid();
    const half = BUILDING_SIZE[kind] / 2;
    return world.map.treeObstacles!.some(tree => Math.abs(tree.x-x) < TREE_SIZE/2+half && Math.abs(tree.z-z) < TREE_SIZE/2+half);
  };
  let selected: Placed | null = null;
  let brush: string | null = null;
  let brushSize = 2;
  let pathPoint: THREE.Vector3 | null = null;
  let dragPoint: THREE.Vector3 | null = null;
  let terrainDirty = false;
  let strokeHeight: number | null = null;
  let reliefOccupied = new Set(overlay.reliefOccupied ?? []);
  let stairs: TerrainStair[] = [...(world.model.stairs ?? overlay.stairs ?? [])];
  const n = world.map.tiles;
  const paintGrid = new Uint8Array(n * n);
  const overlayPaint = overlay.paint ?? world.model.paint;
  if (overlayPaint) for (let i = 0; i < n * n && i < overlayPaint.length; i++) paintGrid[i] = overlayPaint[i] ?? 0;

  const selectionBox = new THREE.Box3Helper(new THREE.Box3(), 0xffd166);
  selectionBox.visible = false;
  world.scene.add(selectionBox);

  // Cursor de pincel: mostra exatamente os quadrados que serão afetados.
  const hover = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffd166, wireframe: true, transparent: true, opacity: 0.8, depthTest: false }),
  );
  hover.rotation.x = -Math.PI / 2;
  hover.visible = false;
  hover.renderOrder = 999;
  world.scene.add(hover);
  const guides = new EditorGuides(world);
  world.setEditorGridVisible(true);
  world.invalidateEditorBuildGrid();

  // Recalcula a malha do terreno a partir de `world.map.height` (relevo editado).
  const refreshTerrain = () => {
    world.refreshTerrainRelief(stairs);
    guides.refresh();
    invalidateGrid();
    for (const item of placed) if (item.holder) {
      item.holder.position.y = world.heightAt(item.x, item.z);
      item.holder.updateMatrixWorld(true);
    }
  };

  const tileAt = (point: THREE.Vector3): [number, number] => {
    const ts = WORLD.tileSize, half = WORLD.half;
    return [Math.floor((point.x + half) / ts), Math.floor((point.z + half) / ts)];
  };

  // Relevo por QUADRADOS: cada tile do pincel sobe/desce o mesmo tanto (sem curva).
  const paintTerrain = (point: THREE.Vector3) => {
    const [tx, tz] = tileAt(point);
    if (tx < 0 || tz < 0 || tx >= n || tz >= n) return;
    if (strokeHeight === null) {
      const height = world.map.height[tz*n+tx] ?? 0;
      strokeHeight = Math.max(0, Math.min(1.2, height + (brush === 'terrain:raise' ? RELIEF_STEP : -RELIEF_STEP)));
    }
    const r = brushSize - 1;
    const cells:number[]=[];
    for (let dz = -r; dz <= r + 1; dz++) for (let dx = -r; dx <= r + 1; dx++) {
      const x = tx + dx, z = tz + dz;
      if (x < 0 || z < 0 || x >= n || z >= n) continue;
      if (!insideMapBoundary(world.map,x*WORLD.tileSize-WORLD.half,z*WORLD.tileSize-WORLD.half)) continue;
      const i = z * n + x;
      if (world.map.water[i] || world.map.bridge[i]) continue;
      const wx=x*WORLD.tileSize-WORLD.half,wz=z*WORLD.tileSize-WORLD.half;
      // Authored stairs and cliff modules remain intact when a path touches them.
      if(stairs.some(s=>{const f=stairFootprint(s); return Math.abs(wx-f.x)<=f.width/2+WORLD.tileSize && Math.abs(wz-f.z)<=f.depth/2+WORLD.tileSize;})) continue;
      if(placed.some(p=>p.kind.startsWith('cliff:') && footprintsOverlap({x:wx,z:wz,width:WORLD.tileSize,depth:WORLD.tileSize,rotation:0},propFootprint(p)))) continue;
      cells.push(i);
    }
    cells.sort((a,b)=>Math.hypot(a%n-tx,Math.floor(a/n)-tz)-Math.hypot(b%n-tx,Math.floor(b/n)-tz));
    const result=extendTerrainRelief(world.map.height,reliefOccupied,cells,strokeHeight,n);
    strokeHeight=result.height;
    if (result.changed) { terrainDirty = true; instancesDirty = true; }
  };

  // Piso por quadrados: 1 = caminho (pedra), 2 = grama, 0 = automático.
  const paintTiles = (point: THREE.Vector3, value: number) => {
    const [tx, tz] = tileAt(point);
    const r = brushSize - 1;
    for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
      const x = tx + dx, z = tz + dz;
      if (x < 0 || z < 0 || x >= n || z >= n) continue;
      if (!insideMapBoundary(world.map,(x+0.5)*WORLD.tileSize-WORLD.half,(z+0.5)*WORLD.tileSize-WORLD.half,WORLD.tileSize/2)) continue;
      paintGrid[z * n + x] = value;
    }
    world.setGroundPaint(paintGrid);
  };

  const propBounds = new Map<OverlayPropKind, THREE.Box3>();
  type PropData = Pick<Placed,'kind'|'x'|'z'|'scale'|'rotY'>;
  const footprintCache = new WeakMap<PropData,{key:string; footprint:PropFootprint}>();
  const propFootprint = (data: PropData): PropFootprint => {
    const key=`${data.x},${data.z},${data.scale},${data.rotY}`;
    const cached=footprintCache.get(data);
    if(cached?.key===key) return cached.footprint;
    let footprint:PropFootprint;
    if(data.kind==='tree') footprint={x:data.x,z:data.z,width:TREE_SIZE,depth:TREE_SIZE,rotation:0};
    else if(data.kind.startsWith('building:')) {
      const size=BUILDING_SIZE[data.kind.slice(9) as BuildingKind];
      footprint={x:data.x,z:data.z,width:size,depth:size,rotation:0};
    } else {
      let bounds=propBounds.get(data.kind);
      if(!bounds) {
        const model=makePropModel(data.kind);
        bounds=model ? new THREE.Box3().setFromObject(model) : new THREE.Box3(new THREE.Vector3(-2,0,-2),new THREE.Vector3(2,4,2));
        propBounds.set(data.kind,bounds);
      }
      const center=bounds.getCenter(new THREE.Vector3()).multiplyScalar(data.scale);
      const size=bounds.getSize(new THREE.Vector3()).multiplyScalar(data.scale);
      const c=Math.cos(data.rotY),s=Math.sin(data.rotY);
      footprint={x:data.x+center.x*c+center.z*s,z:data.z-center.x*s+center.z*c,
        width:size.x,depth:size.z,rotation:data.rotY};
    }
    footprintCache.set(data,{key,footprint});
    return footprint;
  };
  const stairFootprint = (s:TerrainStair):PropFootprint => ({x:s.x+s.dx*s.length/2,z:s.z+s.dz*s.length/2,
    width:s.dx ? s.length : s.width,depth:s.dz ? s.length : s.width,rotation:0});
  const placementAnchor = (kind:string,x:number,z:number,scale?:number,rotY?:number) => {
    if(!kind.startsWith('cliff:')) return brushAnchor(kind,x,z);
    const footprint=propFootprint({kind:kind as OverlayPropKind,x:0,z:0,
      scale:scale ?? readBrushSetting(ui.propScaleInput,1,0.2,6),
      rotY:rotY ?? readBrushSetting(ui.propRotationInput,0,0,360)*Math.PI/180});
    return moduleAnchor(x,z,footprint);
  };
  const propInsideBoundary = (data: Pick<Placed,'kind'|'x'|'z'|'scale'|'rotY'>): boolean => {
    if (data.kind === 'tree') return insideMapBoundary(world.map,data.x,data.z,TREE_SIZE/2);
    if (data.kind.startsWith('building:')) return insidePlayableBoundary(world.map,data.x,data.z,BUILDING_SIZE[data.kind.slice(9) as BuildingKind]/2);
    let bounds = propBounds.get(data.kind);
    if (!bounds) {
      const model = makePropModel(data.kind);
      if (!model) return false;
      bounds = new THREE.Box3().setFromObject(model);
      propBounds.set(data.kind,bounds);
    }
    const matrix = new THREE.Matrix4().makeRotationY(data.rotY)
      .scale(new THREE.Vector3(data.scale,data.scale,data.scale)).setPosition(data.x,0,data.z);
    const transformed = bounds.clone().applyMatrix4(matrix);
    const center = transformed.getCenter(new THREE.Vector3()), size = transformed.getSize(new THREE.Vector3());
    return insideMapBoundary(world.map,center.x,center.z,size.x/2,size.z/2);
  };
  const validPropPlacement = (data:PropData, ignore?:Placed):boolean => {
    if(!propInsideBoundary(data)) return false;
    const footprint=propFootprint(data);
    if(data.kind.startsWith('cliff:')) {
      for(const vertex of reliefOccupied) {
        if(footprintsOverlap(footprint,{x:(vertex%n)*WORLD.tileSize-WORLD.half,z:Math.floor(vertex/n)*WORLD.tileSize-WORLD.half,
          width:WORLD.tileSize,depth:WORLD.tileSize,rotation:0})) return false;
      }
    }
    if(placed.some(item=>item!==ignore && footprintsOverlap(footprint,propFootprint(item)))) return false;
    if(clearanceDirty) syncClearance();
    if(world.map.obstacles.some(obstacle=>footprintsOverlap(footprint,{...obstacle,rotation:0}))) return false;
    if(stairs.some(stair=>footprintsOverlap(footprint,stairFootprint(stair)))) return false;
    if(data.kind.startsWith('building:')) {
      if(clearanceDirty) syncClearance();
      syncTreeGrid();
      if(!world.editorCanBuild(data.kind.slice(9) as BuildKind,data.x,data.z)) return false;
    }
    return true;
  };
  const addPlaced = (data: Omit<Placed, 'holder' | 'mesh' | 'index'>, validate = false): Placed | null => {
    if (data.kind === 'tree') {
      const { x, z } = treeFootprint(data.x, data.z);
      data = { ...data, x, z };
    }
    if (data.kind.startsWith('building:')) {
      const kind=data.kind.slice('building:'.length) as BuildingKind;
      data={...data,x:snapBuildingCoordinate(data.x,kind),z:snapBuildingCoordinate(data.z,kind),scale:1,rotY:Math.round(data.rotY/(Math.PI/2))*Math.PI/2};
    }
    if (!propInsideBoundary(data)) return null;
    if (validate && !validPropPlacement(data)) return null;
    if (data.kind === 'tree') {
      if (!treeOccupancy.reserve(data.x,data.z)) return null;
      treesChanged();
    }
    if (data.kind === 'tree' || data.kind === 'rock') {
      // Em massa (a decoração importada pode ter milhares): renderizado instanciado.
      const item: Placed = { ...data, mesh: data.kind as 'tree' | 'rock', index: placed.length };
      placed.push(item);
      instancesDirty = true;
      return item;
    }
    const model = makePropModel(data.kind);
    if (!model) return null;
    const holder = new THREE.Group();
    holder.add(model);
    holder.position.set(data.x, world.heightAt(data.x, data.z), data.z);
    holder.rotation.y = data.rotY;
    holder.scale.setScalar(data.scale || 1);
    holder.updateMatrixWorld(true);
    holder.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
    world.scene.add(holder);
    const item: Placed = { ...data, holder };
    holder.userData.placed = item;
    placed.push(item);
    return item;
  };

  // Árvores/pedras: InstancedMesh por tipo (são milhares; Groups travariam).
  const instanceMeshes: Partial<Record<'tree' | 'rock', THREE.InstancedMesh>> = {};
  const instanceItemIndex: Partial<Record<'tree' | 'rock', number[]>> = {};
  let instancesDirty = true;

  const rebuildInstances = () => {
    const indices = new Map(placed.map((item,index) => [item,index]));
    const disposeMesh = (mesh: THREE.InstancedMesh) => {
      world.scene.remove(mesh); mesh.geometry.dispose(); mesh.dispose();
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach(material => material.dispose());
    };
    for (const kind of ['tree', 'rock'] as const) {
      const list = placed.filter((p) => p.kind === kind);
      const previous = instanceMeshes[kind];
      if (!list.length) {
        if (previous) { disposeMesh(previous); instanceMeshes[kind] = undefined; instanceItemIndex[kind] = undefined; }
        continue;
      }
      if (previous && previous.count !== list.length) {
        disposeMesh(previous); instanceMeshes[kind] = undefined;
      }
      let mesh = instanceMeshes[kind];
      if (!mesh) {
        const instance = assetRegistry.propInstance(kind === 'tree' ? 'prop:tree:evergreen' : 'prop:rock:stone-cluster');
        if (!instance) continue;
        mesh = new THREE.InstancedMesh(instance.geometry, instance.material.clone(), list.length);
        world.scene.add(mesh);
      }
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      const position = new THREE.Vector3();
      const up = new THREE.Vector3(0, 1, 0);
      const mapping: number[] = [];
      list.forEach((item, i) => {
        const y = world.heightAt(item.x, item.z);
        quaternion.setFromAxisAngle(up, item.rotY);
        scale.setScalar(item.scale || 1);
        matrix.compose(position.set(item.x, y, item.z), quaternion, scale);
        mesh!.setMatrixAt(i, matrix);
        mapping.push(indices.get(item)!);
      });
      mesh.count = list.length;
      mesh.instanceMatrix.needsUpdate = true;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.computeBoundingSphere();
      instanceMeshes[kind] = mesh;
      instanceItemIndex[kind] = mapping;
    }
    instancesDirty = false;
  };

  for (const p of overlay.props) addPlaced({ kind: p.kind, x: p.x, z: p.z, rotY: p.rotY, scale: p.scale });
  // Primeira abertura com o overlay "cru": importa a decoração procedural
  // (árvores + pedras soltas) para a lista, então TUDO vira editável.
  if (!overlay.decorReplace && world.model.config.baseMapId !== 'flat') {
    for (const spot of world.decorTreeSpots) addPlaced({ kind: 'tree', x: spot.x, z: spot.z, rotY: spot.rotY, scale: spot.scale });
    for (const spot of world.scatterRockSpots) addPlaced({ kind: 'rock', x: spot.x, z: spot.z, rotY: spot.rotY, scale: spot.scale });
    overlay.decorReplace = true;
    overlay.props = placed.map((p) => ({ kind: p.kind, x: p.x, z: p.z, rotY: p.rotY, scale: p.scale }));
  }

  const syncClearance = () => {
    world.model = withClearedTerrain(initialModel, {...overlay, cleared: [...cleared]});
    world.map.obstacles = world.model.obstacles.map(o => ({...o}));
    world.map.water.set(initialWater); world.map.bridge.set(initialBridge); world.map.forest.set(initialForest);
    clearGroundCells(world.map, cleared);
    for (let i=0;i<n*n;i++) if (world.map.bridge[i] && !world.model.isBridgeAtWorld((i%n)*WORLD.tileSize-WORLD.half,Math.floor(i/n)*WORLD.tileSize-WORLD.half)) world.map.bridge[i]=0;
    world.setClearedVisuals(cleared);
    clearanceDirty = false;
  };

  const snapshot = () => ({
    reliefOccupied: [...reliefOccupied],
    height: world.map.height.slice(), paint: paintGrid.slice(), cleared: [...cleared],
    stairs: stairs.map(s => ({...s})), lighting,
    props: placed.map(({kind,x,z,rotY,scale}) => ({kind,x,z,rotY,scale})),
  });
  type EditSnapshot = ReturnType<typeof snapshot>;
  const undoStack: EditSnapshot[] = [];
  let pendingEdit: EditSnapshot | null = null;
  const beginEdit = () => { if (!pendingEdit) pendingEdit = snapshot(); };
  const finishEdit = () => {
    if (!pendingEdit) return;
    const before = pendingEdit; pendingEdit = null;
    const after = snapshot();
    const changed = before.height.some((v,i) => v !== after.height[i]) || before.paint.some((v,i) => v !== after.paint[i]) ||
      JSON.stringify([before.props,before.stairs,before.cleared,before.lighting,before.reliefOccupied]) !== JSON.stringify([after.props,after.stairs,after.cleared,after.lighting,after.reliefOccupied]);
    if (changed) {
      undoStack.push(before);
      if (undoStack.length > 30) undoStack.shift();
    }
    ui.undoBtn.disabled = undoStack.length === 0;
  };
  const undo = () => {
    pathPoint = null;
    finishEdit();
    dragging = false; painting = false; strokeHeight = null;
    const state = undoStack.pop();
    if (!state) return;
    select(null);
    for (const item of placed) if (item.holder) world.scene.remove(item.holder);
    placed.length = 0;
    treeOccupancy.clear(); treesChanged();
    world.map.height.set(state.height); paintGrid.set(state.paint);
    reliefOccupied = new Set(state.reliefOccupied);
    cleared = new Set(state.cleared); stairs = state.stairs;
    syncClearance();
    for (const item of state.props) addPlaced(item);
    world.setGroundPaint(paintGrid);
    lighting = state.lighting; ui.lightingSelect.value = lighting;
    world.updateDayNight(lighting,30,1,60);
    terrainDirty = true; instancesDirty = true;
    invalidate(true);
    ui.undoBtn.disabled = undoStack.length === 0;
    setStatus('Ação desfeita.');
  };

  const flattenTerrain = (point: THREE.Vector3) => {
    const [tx,tz] = tileAt(point), r = brushSize-1;
    const cells = new Set<number>();
    for (let z=Math.max(0,tz-r);z<=Math.min(n-1,tz+r);z++) for (let x=Math.max(0,tx-r);x<=Math.min(n-1,tx+r);x++) {
      if (!insideMapBoundary(world.map,(x+0.5)*WORLD.tileSize-WORLD.half,(z+0.5)*WORLD.tileSize-WORLD.half,WORLD.tileSize/2)) continue;
      const i=z*n+x; cells.add(i); cleared.add(i); paintGrid[i]=2;
      for (let dz=0;dz<=1;dz++) for (let dx=0;dx<=1;dx++) if (x+dx<n && z+dz<n) {
        const vertex=(z+dz)*n+x+dx;
        world.map.height[vertex]=FLAT_GROUND_HEIGHT; reliefOccupied.delete(vertex);
      }
    }
    if (!cells.size) return;
    const center = new THREE.Vector3(), size = new THREE.Vector3();
    const bounds = new THREE.Box3(), transform = new THREE.Matrix4();
    for (let i=placed.length-1;i>=0;i--) {
      const item=placed[i]!;
      if (item.holder) bounds.setFromObject(item.holder);
      else {
        const geometry = instanceMeshes[item.kind as 'tree'|'rock']?.geometry;
        if (geometry) {
          if (!geometry.boundingBox) geometry.computeBoundingBox();
          bounds.copy(geometry.boundingBox!);
          transform.makeRotationY(item.rotY).scale(new THREE.Vector3(item.scale,item.scale,item.scale)).setPosition(item.x,0,item.z);
          bounds.applyMatrix4(transform);
        } else bounds.setFromCenterAndSize(new THREE.Vector3(item.x,0,item.z),new THREE.Vector3(4*item.scale,4*item.scale,4*item.scale));
      }
      bounds.getCenter(center); bounds.getSize(size);
      if (!clearedAreaIntersects(cells,center.x,center.z,size.x,size.z)) continue;
      if (selected === item) select(null);
      if (item.kind === 'tree') { treeOccupancy.release(item.x, item.z); treesChanged(); }
      if (item.holder) world.scene.remove(item.holder);
      placed.splice(i,1);
    }
    stairs = stairs.filter(s => !clearedAreaIntersects(cells,s.x+s.dx*s.length/2,s.z+s.dz*s.length/2,
      s.dx ? s.length : s.width, s.dz ? s.length : s.width));
    clearGroundCells(world.map,cells);
    world.setGroundPaint(paintGrid);
    terrainDirty = true; instancesDirty = true; clearanceDirty = true;
  };

  // ---------- seleção / colocação / arrasto ----------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const ground = new THREE.Vector3();
  const dom = world.renderer.domElement;
  dom.addEventListener('pointermove', () => invalidate(dragging));
  dom.addEventListener('pointerdown', () => invalidate(true));
  dom.addEventListener('pointerleave', () => invalidate());
  window.addEventListener('pointerup', () => invalidate(true));
  window.addEventListener('keydown', () => invalidate(true));
  document.addEventListener('visibilitychange', () => invalidate(true));

  const groundPoint = (event: PointerEvent | MouseEvent): THREE.Vector3 | null => {
    const rect = dom.getBoundingClientRect();
    ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObject(world.terrainMesh, false)[0];
    if (hit) return hit.point.clone();
    // Sem acerto no terreno: projeta no plano y=0 como fallback.
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    return raycaster.ray.intersectPlane(plane, ground) ? ground.clone() : null;
  };

  const pickPlaced = (event: PointerEvent | MouseEvent): Placed | null => {
    const rect = dom.getBoundingClientRect();
    ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const holders = placed.filter((p) => p.holder);
    const hit = raycaster.intersectObjects(holders.map((p) => p.holder!), true)[0];
    if (hit) {
      let node: THREE.Object3D | null = hit.object;
      while (node && !node.userData.placed) node = node.parent;
      const item = node?.userData.placed as Placed | undefined;
      if (item) return item;
    }
    // Instanciados (árvores/pedras): o hit traz o `instanceId`.
    for (const kind of ['tree', 'rock'] as const) {
      const mesh = instanceMeshes[kind];
      if (!mesh) continue;
      const instanceHit = raycaster.intersectObject(mesh, false)[0];
      if (instanceHit?.instanceId === undefined) continue;
      const itemIndex = instanceItemIndex[kind]?.[instanceHit.instanceId];
      if (itemIndex !== undefined) return placed[itemIndex] ?? null;
    }
    return null;
  };

  /** Destaca o item selecionado (Group ou instanciado). */
  const highlight = (item: Placed | null) => {
    if (!item) { selectionBox.visible = false; return; }
    const size = item.kind === 'tree' ? 5 : item.kind === 'rock' ? 3.4 : 4;
    selectionBox.box.set(
      new THREE.Vector3(item.x - size * 0.5 * item.scale, 0, item.z - size * 0.5 * item.scale),
      new THREE.Vector3(item.x + size * 0.5 * item.scale, (size + 1.5) * item.scale, item.z + size * 0.5 * item.scale),
    );
    selectionBox.visible = true;
  };

  const select = (item: Placed | null) => {
    selected = item;
    highlight(item);
  };

  let dragging = false;
  let painting = false;
  const strokeTiles = new Set<string>();
  const applyBrush = (point: THREE.Vector3) => {
    if (!brush) return;
    if (!insideMapBoundary(world.map,point.x,point.z)) return;
    const anchor=placementAnchor(brush,point.x,point.z), policy=brushPolicy(brush);
    if(strokeTiles.has(anchor.key)) return;
    strokeTiles.add(anchor.key);
    if (!policy.surface) {
      const baseScale = policy.scale ? readBrushSetting(ui.propScaleInput, 1, 0.2, 6) : 1;
      let baseRotation = readBrushSetting(ui.propRotationInput, 0, 0, 360);
      baseRotation=Math.round(baseRotation/policy.rotationStep)*policy.rotationStep;
      const randomize = policy.randomize && ui.propVariationInput.checked;
      const item = addPlaced({ kind: brush as OverlayPropKind, x: anchor.x, z: anchor.z,
        rotY: (baseRotation + (randomize ? (Math.random() * 2 - 1) * 15 : 0)) * Math.PI / 180,
        scale: baseScale * (randomize ? 0.9 + Math.random() * 0.2 : 1) },true);
      if (item) select(item);
      return;
    }
    if (brush === 'terrain:flatten') {
      flattenTerrain(point); return;
    }
    if (brush === 'terrain:stairs') {
      if (clearanceDirty) syncClearance();
      const previousHeight=world.map.height.slice();
      const stair = carveTerrainStair(world.map, point.x, point.z, brushSize);
      if (!stair) { setStatus('Escada: use uma borda baixa e livre (máximo 4 × 4 tiles).'); return; }
      const footprint=stairFootprint(stair);
      if(!insideMapBoundary(world.map,footprint.x,footprint.z,footprint.width/2,footprint.depth/2) ||
        stairs.some(s=>footprintsOverlap(footprint,stairFootprint(s))) ||
        placed.some(p=>footprintsOverlap(footprint,propFootprint(p)))) {
        world.map.height.set(previousHeight); return;
      }
      stairs.push(stair);
      terrainDirty = true;
      instancesDirty = true;
      setStatus('Escada criada: passagem compacta entre os dois níveis.');
    }
    else if (brush.startsWith('terrain:')) paintTerrain(point);
    else if (brush.startsWith('paint:')) paintTiles(point, brush === 'paint:path' ? 1 : 2);
  };
  const paintSegment = (a:THREE.Vector3,b:THREE.Vector3) => {
    if(!brush) return;
    for(const point of brushSegment(brush,a,b)) applyBrush(new THREE.Vector3(point.x,0,point.z));
  };
  const updateHover = (event: PointerEvent) => {
    syncTreeGrid();
    const p = groundPoint(event);
    if (!p || !insideMapBoundary(world.map,p.x,p.z)) {
      hover.visible = false; world.setBuildFootprint(null,null,false);
      ui.spatialStatus.textContent='Fora dos limites do mapa: não é possível construir.'; return;
    }
    if (measuring) {
      hover.visible=false; world.setBuildFootprint(null,null,false);
      ui.spatialStatus.textContent=guides.previewMeasurement(p); return;
    }
    const snapped={x:snapBuildingCoordinate(p.x,referenceKind),z:snapBuildingCoordinate(p.z,referenceKind)};
    const valid=world.editorCanBuild(referenceKind,snapped.x,snapped.z);
    world.setBuildFootprint(gridVisible ? snapped : null,referenceKind,valid);
    const edge=Math.min(WORLD.half-Math.abs(snapped.x),WORLD.half-Math.abs(snapped.z));
    ui.spatialStatus.textContent=`X ${snapped.x} · Z ${snapped.z} · Borda a ${(edge/BUILD_TILE_SIZE).toFixed(1)} tiles. ${valid ? 'Cabe aqui' : 'Área bloqueada'}: ${buildingTiles(referenceKind)} × ${buildingTiles(referenceKind)} tiles.`;
    if (!brush) { hover.visible = false; return; }
    if (!brushPolicy(brush).surface) {
      const anchor=placementAnchor(brush,p.x,p.z), policy=brushPolicy(brush);
      const footprint=propFootprint({kind:brush as OverlayPropKind,x:anchor.x,z:anchor.z,
        scale:policy.scale ? Number(ui.propScaleInput.value)||1 : 1,
        rotY:Math.round((Number(ui.propRotationInput.value)||0)/policy.rotationStep)*policy.rotationStep*Math.PI/180});
      hover.position.set(footprint.x, world.heightAt(footprint.x, footprint.z) + 0.2, footprint.z);
      hover.rotation.z=footprint.rotation;
      hover.scale.set(footprint.width, footprint.depth, 1);
      hover.visible = true;
      return;
    }
    const [tx, tz] = tileAt(p);
    hover.rotation.z=0;
    const size = (brushSize * 2 - 1) * WORLD.tileSize;
    hover.position.set((tx + 0.5) * WORLD.tileSize - WORLD.half, world.heightAt(p.x, p.z) + 0.2, (tz + 0.5) * WORLD.tileSize - WORLD.half);
    hover.scale.set(size, size, 1);
    hover.visible = true;
  };
  dom.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    if (measuring) {
      const p=groundPoint(event);
      if (p && Math.abs(p.x)<WORLD.half && Math.abs(p.z)<WORLD.half) {
        const complete=guides.measure(p);
        ui.spatialStatus.textContent=guides.previewMeasurement(p)+(complete ? ' · Clique para iniciar outra medição.' : ' · Clique no fim.');
      }
      return;
    }
    finishEdit(); beginEdit(); strokeTiles.clear();
    strokeHeight = null;
    if (brush && ui.pointsInput.checked) {
      const point = groundPoint(event);
      if (!point || !insideMapBoundary(world.map,point.x,point.z)) {
        finishEdit(); return;
      }
      const end = brushAnchor(brush,point.x, point.z);
      const start = pathPoint ?? new THREE.Vector3(end.x, 0, end.z);
      const before = placed.length;
      paintSegment(start,new THREE.Vector3(end.x,0,end.z));
      pathPoint = new THREE.Vector3(end.x, 0, end.z);
      finishEdit();
      setStatus(`${brushPolicy(brush).surface ? 'Trecho aplicado.' : `${placed.length-before} objetos adicionados.`} Clique no próximo ponto; Esc encerra o trajeto.`);
      return;
    }
    if (brush) {
      const p = groundPoint(event); if (p) { applyBrush(p); painting = true; dragPoint=p.clone(); } return;
    }
    // 1) Clicou num prop já colocado? Seleciona/move (nunca cria por cima).
    const hit = pickPlaced(event);
    if (hit) { select(hit); dragging = true; return; }
    // 2) Pincel ativo (terreno/piso/prop): aplica e continua ao arrastar.
    select(null);
  });
  dom.addEventListener('pointermove', (event) => {
    updateHover(event);
    if (painting && brush) {
      const p = groundPoint(event);
      if (p && insideMapBoundary(world.map,p.x,p.z)) { paintSegment(dragPoint ?? p,p); dragPoint=p.clone(); }
      else dragPoint=null;
      return;
    }
    if (!dragging || !selected) return;
    const point = groundPoint(event);
    if (!point) return;
    const target=placementAnchor(selected.kind,point.x,point.z,selected.scale,selected.rotY);
    point.x=target.x; point.z=target.z;
    if(!validPropPlacement({...selected,x:point.x,z:point.z},selected)) return;
    if (selected.kind === 'tree') {
      const target = treeFootprint(point.x, point.z);
      if (target.x === selected.x && target.z === selected.z) return;
      if (!propInsideBoundary({...selected,x:target.x,z:target.z})) return;
      treeOccupancy.release(selected.x, selected.z);
      if (!treeOccupancy.reserve(target.x, target.z)) {
        treeOccupancy.reserve(selected.x, selected.z); return;
      }
      point.x = target.x; point.z = target.z;
      treesChanged();
    }
    if (selected.kind.startsWith('building:')) {
      const kind=selected.kind.slice('building:'.length) as BuildingKind;
      point.x=snapBuildingCoordinate(point.x,kind); point.z=snapBuildingCoordinate(point.z,kind);
      if (overlapsTree(kind, point.x, point.z)) return;
    }
    if (!propInsideBoundary({...selected,x:point.x,z:point.z})) return;
    selected.x = point.x; selected.z = point.z;
    if (selected.holder) {
      selected.holder.position.set(point.x, world.heightAt(point.x, point.z), point.z);
      selected.holder.updateMatrixWorld(true);
      selectionBox.box.setFromObject(selected.holder);
    } else {
      instancesDirty = true;
      highlight(selected);
    }
  });
  dom.addEventListener('pointerleave', () => { hover.visible = false; world.setBuildFootprint(null,null,false); });
  const endGesture = () => { dragging = false; painting = false; dragPoint=null; strokeHeight = null; strokeTiles.clear(); finishEdit(); };
  window.addEventListener('pointerup', endGesture);
  window.addEventListener('pointercancel', endGesture);
  window.addEventListener('blur', endGesture);

  const removeSelected = () => {
    if (!selected) return;
    beginEdit();
    if (selected.kind === 'tree') { treeOccupancy.release(selected.x, selected.z); treesChanged(); }
    if (selected.holder) world.scene.remove(selected.holder);
    placed.splice(placed.indexOf(selected), 1);
    instancesDirty = true;
    select(null);
    setStatus(`${placed.length} props`);
    finishEdit();
  };
  const rotateSelected = (delta: number) => {
    if (!selected) return;
    const rotY = selected.rotY + (selected.kind.startsWith('building:') ? Math.sign(delta)*Math.PI/2 : delta);
    if (!validPropPlacement({...selected,rotY},selected)) return;
    beginEdit();
    selected.rotY = rotY;
    if (selected.holder) {
      selected.holder.rotation.y = selected.rotY;
      selected.holder.updateMatrixWorld(true);
      selectionBox.box.setFromObject(selected.holder);
    } else { instancesDirty = true; highlight(selected); }
    finishEdit();
  };
  const scaleSelected = (factor: number) => {
    if (!selected) return;
    if (selected.kind.startsWith('building:')) { setStatus('Construções usam o tamanho padrão de tiles do jogo.'); return; }
    const scale = Math.max(0.2, Math.min(6, selected.scale * factor));
    if (!validPropPlacement({...selected,scale},selected)) return;
    beginEdit();
    selected.scale = scale;
    if (selected.holder) {
      selected.holder.scale.setScalar(selected.scale);
      selected.holder.updateMatrixWorld(true);
      selectionBox.box.setFromObject(selected.holder);
    } else { instancesDirty = true; highlight(selected); }
    setStatus(`escala ${selected.scale.toFixed(2)}`);
    finishEdit();
  };
  window.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'Escape' && measuring) { setMeasuring(false); return; }
    if (event.key === 'Escape' && pathPoint) {
      pathPoint = null; setStatus('Trajeto encerrado. Clique para iniciar outro.'); return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
      event.preventDefault(); undo(); return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === 'Delete' || event.key === 'Backspace') { removeSelected(); event.preventDefault(); }
    if (event.key === 'r' || event.key === 'R') rotateSelected(Math.PI / 4);
    if (event.key === '[') scaleSelected(0.9);
    if (event.key === ']') scaleSelected(1.1);
  });

  // ---------- paleta / barra ----------
  const ui = buildUi();
  container.appendChild(ui.root);
  ui.root.addEventListener('click', () => invalidate(true));
  ui.root.addEventListener('change', () => invalidate());
  let statusEl: HTMLElement;
  const brushSettings = new Map<string,{scale:string;rotation:string;random:boolean}>();
  function setStatus(text: string) { if (statusEl) statusEl.textContent = text; }
  function setBrush(kind: string | null) {
    finishEdit(); painting=false; dragging=false; dragPoint=null; strokeTiles.clear(); strokeHeight=null;
    if(brush) brushSettings.set(brush,{scale:ui.propScaleInput.value,rotation:ui.propRotationInput.value,random:ui.propVariationInput.checked});
    pathPoint = null;
    if (measuring) setMeasuring(false);
    brush = kind;
    const settings=brushSettings.get(kind ?? '') ?? {scale:'1',rotation:'0',random:true};
    const policy=brushPolicy(kind ?? 'paint:');
    ui.propScaleInput.value=policy.scale ? settings.scale : '1';
    ui.propRotationInput.value=settings.rotation;
    ui.propVariationInput.checked=settings.random;
    ui.propScaleInput.disabled=!kind || !policy.scale;
    ui.propRotationInput.disabled=!kind || !policy.rotation;
    ui.propRotationInput.step=String(policy.rotationStep);
    ui.propVariationInput.disabled=!kind || !policy.randomize;
    ui.brushInput.disabled=!kind || !policy.surface;
    ui.brushNote.textContent=policy.surface ? 'Pisos e relevo usam células do terreno e o tamanho do pincel. Escadas só são criadas em bordas válidas, sem sobreposição.' :
      policy.building ? 'Construções: tamanho fixo, encaixe no grid e rotação em passos de 90°. Sem variação automática.' :
      kind?.startsWith('cliff:') ? 'Cliffs: encaixe pelas dimensões reais do módulo, escala e rotação manuais. Sem variação automática para preservar o encaixe.' :
      `Variação: escala ±10% e rotação ±15° da base. ${kind==='tree' ? 'Árvores ocupam sempre 2×2 tiles.' : 'Pedras reservam a área do modelo, considerando escala e rotação.'}`;
    for (const button of ui.paletteButtons) button.classList.toggle('active', button.dataset.kind === kind);
    ui.root.classList.toggle('placing', kind !== null);
  }
  for (const button of ui.paletteButtons) {
    button.addEventListener('click', () => setBrush(brush === button.dataset.kind ? null : (button.dataset.kind ?? null)));
  }
  ui.pointsInput.addEventListener('change', () => {
    finishEdit(); painting = false; dragging = false; strokeTiles.clear();
    pathPoint = null;
    dragPoint=null; strokeHeight=null;
    setStatus(ui.pointsInput.checked ? 'Escolha um elemento e clique nos pontos do trajeto. Esc encerra; cada trecho pode ser desfeito.' : 'Pintura por arraste ativada.');
  });
  ui.pathResetBtn.addEventListener('click', () => {
    pathPoint = null;
    setStatus('Trajeto encerrado. Clique para iniciar outro.');
  });
  ui.selectToolBtn.addEventListener('click',()=>setBrush(null));
  ui.deleteBtn.addEventListener('click', removeSelected);
  function setMeasuring(value:boolean) {
    if(value) { finishEdit(); painting=false; dragging=false; dragPoint=null; pathPoint=null; strokeTiles.clear(); }
    measuring=value; guides.clearMeasurement();
    ui.measureBtn.classList.toggle('active',value);
    ui.measureBtn.setAttribute('aria-pressed',String(value));
    world.setBuildFootprint(null,null,false); hover.visible=false;
    ui.spatialStatus.textContent=value ? 'Régua: clique em dois pontos para medir. Esc cancela.' : 'Mova o cursor para consultar os tiles.';
    invalidate();
  }
  ui.measureBtn.addEventListener('click',()=>setMeasuring(!measuring));
  ui.gridInput.addEventListener('change',()=>{
    gridVisible=ui.gridInput.checked; world.setEditorGridVisible(gridVisible);
    if (gridVisible) invalidateGrid();
    invalidate();
  });
  ui.guidesInput.addEventListener('change',()=>{guides.setVisible(ui.guidesInput.checked);invalidate();});
  ui.referenceSelect.addEventListener('change',()=>{
    referenceKind=ui.referenceSelect.value as BuildKind;
    world.setBuildFootprint(null,null,false); invalidateGrid(); invalidate();
  });
  const focus = (x:number,z:number,distance:number) => {
    const y=world.heightAt(x,z);
    controls.target.set(x,y,z); camera.position.set(x,y+distance,z+distance*0.65);
    controls.update(); invalidate(true);
  };
  ui.cryptBtn.addEventListener('click',()=>focus(world.model.cryptPosition.x,world.model.cryptPosition.z,55));
  ui.overviewBtn.addEventListener('click',()=>focus(0,0,WORLD.half*2.6/Math.min(camera.aspect,1)));
  ui.undoBtn.addEventListener('click', undo);
  ui.lightingSelect.addEventListener('change', () => {
    beginEdit();
    lighting = ui.lightingSelect.value === 'night' ? 'night' : 'day';
    world.updateDayNight(lighting,30,1,60);
    invalidate(true); finishEdit();
  });
  ui.rotBtn.addEventListener('click', () => rotateSelected(Math.PI / 4));
  ui.plusBtn.addEventListener('click', () => scaleSelected(1.1));
  ui.minusBtn.addEventListener('click', () => scaleSelected(0.9));
  ui.saveBtn.addEventListener('click', () => void save());
  ui.saveAsBtn.addEventListener('click', () => void save(true));
  ui.newMapBtn.addEventListener('click', () => {
    if (!window.confirm('Abrir a base de grama plana? Alterações não salvas serão descartadas.')) return;
    const url = new URL(location.href); url.searchParams.set('mapId', 'flat'); location.href = url.toString();
  });
  ui.deleteMapBtn.disabled = !MAP_ID.startsWith('custom-');
  ui.deleteMapBtn.title = 'Exclui mapas criados. Os modelos padrão são preservados.';
  ui.deleteMapBtn.addEventListener('click', async () => {
    if (!window.confirm(`Excluir o mapa “${MAP_PRESETS[MAP_ID]!.name}” permanentemente?`)) return;
    ui.deleteMapBtn.disabled = true;
    try {
      const res = await fetch(`/builder/delete?mapId=${MAP_ID}&key=${encodeURIComponent(key)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Falha ao excluir o mapa.');
      const url = new URL(location.href); url.searchParams.set('mapId', 'flat'); location.href = url.toString();
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Falha ao excluir o mapa.'); ui.deleteMapBtn.disabled = false; }
  });
  ui.reloadBtn.addEventListener('click', () => location.reload());
  ui.brushInput.addEventListener('change', () => { brushSize = Math.max(1, Math.min(8, Math.floor(Number(ui.brushInput.value) || 1))); ui.brushInput.value = String(brushSize); });
  statusEl = ui.status;
  ui.gridStatus.title = `Margem externa de ${playableMargin(world.map)} unidades reservada para a câmera. A borda amarela é física; a linha laranja é o limite jogável. Árvores e decoração podem compor a margem.`;
  setStatus(`${placed.length} props carregados`);

  async function save(asNew = false) {
    asNew ||= MAP_ID === 'flat';
    const name = asNew ? window.prompt('Nome do novo mapa (até 60 caracteres):')?.trim() : undefined;
    if (asNew && !name) return;
    if (name && name.length > 60) { setStatus('O nome deve ter até 60 caracteres.'); return; }
    ui.saveBtn.disabled = true; ui.saveAsBtn.disabled = true;
    finishEdit();
    setStatus('salvando…');
    const payload: MapOverlay = {
      version: 1,
      reliefOccupied: [...reliefOccupied],
      adds: overlay.adds,
      removes: overlay.removes,
      cleared: [...cleared],
      decorReplace: true,
      props: placed.map((p) => ({ kind: p.kind, x: round(p.x), z: round(p.z), rotY: round(p.rotY, 4), scale: round(p.scale, 3) })),
      // Relevo esculpido no editor (unidades de mapa, grid completo).
      height: Array.from(world.map.height).map((v) => Math.round(v * 1000) / 1000),
      // Pintura de piso (0 auto / 1 caminho / 2 grama).
      paint: Array.from(paintGrid),
      stairs,
    };
    try {
      const res = await fetch(`/builder/${asNew ? 'create' : 'save'}?mapId=${MAP_ID}&key=${encodeURIComponent(key)}`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(asNew ? { name, overlay: payload } : payload),
      });
      if (res.ok && asNew) {
        const saved = await res.json();
        const url = new URL(location.href); url.searchParams.set('mapId', saved.mapId); location.href = url.toString();
      }
      setStatus(res.ok ? `salvo ✓ (${placed.length} props) — a próxima partida usa` : 'falha ao salvar');
    } catch {
      setStatus('falha ao salvar');
    } finally {
      ui.saveBtn.disabled = false; ui.saveAsBtn.disabled = false;
    }
  }

  // ---------- loop ----------
  let lastFrame = -Infinity;
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    if (document.hidden || now-lastFrame < 1000/30) return;
    controls.update();
    if (!renderDirty && !terrainDirty && !instancesDirty && !clearanceDirty) return;
    lastFrame = now;
    if (clearanceDirty) syncClearance();
    syncTreeGrid();
    if (terrainDirty) { terrainDirty = false; refreshTerrain(); shadowsDirty = true; }
    if (instancesDirty) { instancesDirty = false; rebuildInstances(); highlight(selected); shadowsDirty = true; }
    if (gridDirty && gridVisible && !painting && !dragging) {
      gridDirty=false; ui.gridStatus.textContent='Calculando áreas de construção…';
      void world.refreshEditorBuildGrid(referenceKind).then(updated=>{
        if (!updated) return;
        ui.gridStatus.textContent=`Branco: cabe ${ui.referenceSelect.selectedOptions[0]!.text}. Vermelho: bloqueio ou margem não jogável. Amarelo: borda física. Laranja: limite jogável (${playableMargin(world.map)} unidades de recuo).`;
        invalidate();
      });
    }
    world.setShadowFocus(controls.target.x, controls.target.z);
    world.renderer.shadowMap.needsUpdate = shadowsDirty;
    world.renderer.render(world.scene, camera);
    renderDirty = false; shadowsDirty = false;
  };
  requestAnimationFrame(loop);
}

function round(value: number, digits = 2): number {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}

function readBrushSetting(input: HTMLInputElement, fallback: number, min: number, max: number): number {
  const value = input.valueAsNumber;
  const normalized = Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
  input.value = String(normalized);
  return normalized;
}

/** Pede a senha e valida no servidor antes de liberar o editor. */
async function ensureAuthorized(initialKey: string): Promise<boolean> {
  let key = initialKey;
  for (;;) {
    if (key) {
      const res = await fetch(`/builder/state?mapId=${MAP_ID}&key=${encodeURIComponent(key)}`).catch(() => null);
      if (res?.ok) return true;
    }
    const entered = window.prompt(t('Senha do editor de mapa:'));
    if (entered === null) return false;
    key = entered.trim();
    const res = await fetch(`/builder/state?mapId=${MAP_ID}&key=${encodeURIComponent(key)}`).catch(() => null);
    if (res?.ok) {
      const url = new URL(location.href);
      url.searchParams.set('key', key);
      history.replaceState(null, '', url);
      return true;
    }
    window.alert(t('Senha inválida (ou builder desativado).'));
  }
}

interface BuilderUi {
  root: HTMLElement;
  gridInput: HTMLInputElement;
  guidesInput: HTMLInputElement;
  referenceSelect: HTMLSelectElement;
  measureBtn: HTMLButtonElement;
  cryptBtn: HTMLButtonElement;
  overviewBtn: HTMLButtonElement;
  spatialStatus: HTMLElement;
  gridStatus: HTMLElement;
  paletteButtons: HTMLButtonElement[];
  deleteBtn: HTMLButtonElement;
  undoBtn: HTMLButtonElement;
  lightingSelect: HTMLSelectElement;
  rotBtn: HTMLButtonElement;
  plusBtn: HTMLButtonElement;
  minusBtn: HTMLButtonElement;
  saveBtn: HTMLButtonElement;
  saveAsBtn: HTMLButtonElement;
  newMapBtn: HTMLButtonElement;
  deleteMapBtn: HTMLButtonElement;
  reloadBtn: HTMLButtonElement;
  brushInput: HTMLInputElement;
  propVariationInput: HTMLInputElement;
  brushNote: HTMLElement;
  selectToolBtn: HTMLButtonElement;
  pointsInput: HTMLInputElement;
  pathResetBtn: HTMLButtonElement;
  propScaleInput: HTMLInputElement;
  propRotationInput: HTMLInputElement;
  status: HTMLElement;
}

function buildUi(): BuilderUi {
  const root = document.createElement('div');
  root.id = 'vxh-builder';
  const style = document.createElement('style');
  style.textContent = `
    #vxh-builder { position:absolute; inset:0; pointer-events:none; font:13px system-ui, sans-serif; color:#dbe4ef; }
    #vxh-builder .panel { position:absolute; pointer-events:auto; background:#0b1424ee; border:1px solid #22324a; border-radius:6px; }
    #vxh-builder .palette { top:12px; left:12px; width:190px; max-height:80vh; overflow:auto; padding:10px; }
    #vxh-builder .palette h4 { margin:8px 0 6px; color:#ffd166; font-size:12px; text-transform:uppercase; letter-spacing:.5px; }
    #vxh-builder .palette button { display:block; width:100%; text-align:left; margin:2px 0; padding:6px 8px; background:#1b2735; color:#dbe4ef; border:1px solid #33465c; border-radius:4px; cursor:pointer; }
    #vxh-builder .palette button.active { border-color:#ffd166; background:#3a3320; }
    #vxh-builder .bar { bottom:12px; left:50%; transform:translateX(-50%); display:flex; gap:8px; align-items:center; padding:8px 10px; }
    #vxh-builder .bar button { padding:6px 10px; background:#26313e; color:#e4d5b6; border:1px solid #55606b; border-radius:4px; cursor:pointer; }
    #vxh-builder .bar button.primary { background:#2e5d3a; border-color:#4f8a5e; color:#eaffea; }
    #vxh-builder button:disabled { opacity:.4; cursor:default; }
    #vxh-builder .bar { max-width:calc(100% - 40px); flex-wrap:wrap; justify-content:center; }
    #vxh-builder .status { color:#9fb0c0; margin-left:8px; }
    #vxh-builder.placing canvas { cursor: copy; }
    #vxh-builder .hint { top:12px; right:12px; max-width:230px; padding:10px; color:#9fb0c0; line-height:1.5; }
    #vxh-builder .hint { max-height:calc(100vh - 125px); overflow:auto; }
    #vxh-builder .guide-controls { border-top:1px solid #33465c; margin-top:10px; padding-top:10px; }
    #vxh-builder .guide-controls label { display:block; margin:5px 0; }
    #vxh-builder .guide-controls select { width:100%; margin:4px 0; }
    #vxh-builder .guide-controls button { color:#dbe4ef; background:#1b2735; border:1px solid #55606b; border-radius:4px; padding:5px; margin:3px; cursor:pointer; }
    #vxh-builder .guide-controls button.active { color:#72eeff; border-color:#72eeff; }
    #vxh-builder .spatial-status { color:#72eeff; margin-top:8px; }
  `;
  root.appendChild(style);

  const palette = document.createElement('div');
  palette.className = 'panel palette';
  const mapSelect = document.createElement('select');
  mapSelect.style.cssText = 'width:100%;margin-bottom:8px';
  mapSelect.title = 'Salve suas mudanças antes de trocar de mapa.';
  mapSelect.setAttribute('aria-label', 'Mapa');
  for (const [id,config] of Object.entries(MAP_PRESETS)) {
    const option = document.createElement('option'); option.value=id; option.textContent=config.name; option.selected=id===MAP_ID; mapSelect.appendChild(option);
  }
  mapSelect.addEventListener('change', () => {
    const url=new URL(location.href);url.searchParams.set('mapId',mapSelect.value);location.href=url.toString();
  });
  palette.appendChild(mapSelect);
  const lightingLabel = document.createElement('label');
  lightingLabel.textContent = 'Iluminação (prévia) ';
  const lightingSelect = document.createElement('select');
  lightingSelect.setAttribute('aria-label', 'Iluminação do mapa');
  lightingSelect.innerHTML = '<option value="day">Dia</option><option value="night">Noite</option>';
  lightingLabel.appendChild(lightingSelect);
  palette.appendChild(lightingLabel);
  const brushControls = document.createElement('div');
  brushControls.className = 'guide-controls';
  const brushTitle = document.createElement('h4');
  brushTitle.textContent = 'Ferramentas do pincel';
  brushControls.appendChild(brushTitle);
  const brushSetting = (labelText: string, value: string, min: string, max: string, step: string) => {
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'number'; input.value = value; input.min = min; input.max = max; input.step = step;
    input.style.width = '64px';
    label.appendChild(input); brushControls.appendChild(label);
    return input;
  };
  const propScaleInput = brushSetting('Escala base ', '1', '0.2', '6', '0.05');
  const propRotationInput = brushSetting('Rotação base (°) ', '0', '0', '360', '1');
  propScaleInput.disabled=true; propRotationInput.disabled=true;
  const variationLabel = document.createElement('label');
  const propVariationInput = document.createElement('input');
  propVariationInput.type = 'checkbox'; propVariationInput.checked = true;
  propVariationInput.disabled=true;
  variationLabel.append(propVariationInput, document.createTextNode(' Variação aleatória'));
  brushControls.appendChild(variationLabel);
  const brushNote = document.createElement('div');
  brushNote.textContent = 'Escolha um elemento. As opções disponíveis respeitam as regras da categoria.';
  brushControls.appendChild(brushNote);
  const pointsLabel = document.createElement('label');
  const pointsInput = document.createElement('input');
  pointsInput.type = 'checkbox';
  pointsLabel.append(pointsInput, document.createTextNode(' Preencher por pontos'));
  brushControls.appendChild(pointsLabel);
  const pathNote = document.createElement('div');
  pathNote.textContent = 'Clique em A, B, C… para pintar o trajeto com o elemento ativo. Desativado: clique ou arraste. Esc encerra. Ctrl+Z desfaz o último trecho.';
  brushControls.appendChild(pathNote);
  const pathResetBtn = document.createElement('button');
  pathResetBtn.textContent = 'Encerrar trajeto';
  brushControls.appendChild(pathResetBtn);
  const selectToolBtn=document.createElement('button');
  selectToolBtn.textContent='Selecionar / mover objetos';
  brushControls.appendChild(selectToolBtn);
  palette.appendChild(brushControls);
  const paletteButtons: HTMLButtonElement[] = [];
  for (const group of PALETTE) {
    const title = document.createElement('h4');
    title.textContent = group.group;
    palette.appendChild(title);
    for (const item of group.items) {
      const button = document.createElement('button');
      button.textContent = item.label;
      button.dataset.kind = item.id;
      palette.appendChild(button);
      paletteButtons.push(button);
    }
  }
  root.appendChild(palette);

  const hint = document.createElement('div');
  hint.className = 'panel hint';
  hint.innerHTML = 'Subir/Descer cria um patamar por traço.<br>Planificar: clique e arraste para limpar e deixar grama.<br>Escada: clique numa borda baixa; máximo 4 × 4 tiles.<br>Clique num prop para selecionar e <b>arrastar</b>.<br><b>Ctrl+Z</b> desfaz (até 30 ações).<br><b>R</b> gira, <b>[</b>/<b>]</b> escala, <b>Delete</b> remove.<br>Botão direito gira a câmera; meio move; roda dá zoom.';
  root.appendChild(hint);
  const guideControls=document.createElement('div'); guideControls.className='guide-controls';
  const checkbox=(text:string) => {
    const label=document.createElement('label'), input=document.createElement('input');
    input.type='checkbox'; input.checked=true; label.append(input,document.createTextNode(text)); guideControls.appendChild(label); return input;
  };
  const gridInput=checkbox(' Grade de construção');
  const guidesInput=checkbox(' Cripta, nascimento e borda');
  const referenceLabel=document.createElement('label'); referenceLabel.textContent='Testar espaço para:';
  const referenceSelect=document.createElement('select'); referenceSelect.setAttribute('aria-label','Construção de referência');
  for (const [kind,label] of [['wall','Muro'],['tower','Torre'],['bank','Banco'],['keep','Fortaleza']] as const) {
    const option=document.createElement('option'); option.value=kind; option.textContent=`${label} (${buildingTiles(kind)} × ${buildingTiles(kind)})`; referenceSelect.appendChild(option);
  }
  referenceLabel.appendChild(referenceSelect); guideControls.appendChild(referenceLabel);
  const guideButton=(text:string) => {
    const button=document.createElement('button'); button.textContent=text; guideControls.appendChild(button); return button;
  };
  const measureBtn=guideButton('Régua'); measureBtn.setAttribute('aria-pressed','false');
  const cryptBtn=guideButton('Ver cripta');
  const overviewBtn=guideButton('Ver mapa inteiro');
  const scaleNote=document.createElement('div');
  scaleNote.textContent=`1 tile de construção = ${BUILD_TILE_SIZE} unidade. Linhas fortes a cada 5 tiles. O pincel de terreno usa células de ${WORLD.tileSize} unidades. Mapa: ${(WORLD.half*2/BUILD_TILE_SIZE).toFixed(1)} tiles por lado.`;
  guideControls.appendChild(scaleNote);
  const gridStatus=document.createElement('div'); gridStatus.textContent='Calculando áreas de construção…'; guideControls.appendChild(gridStatus);
  const spatialStatus=document.createElement('div'); spatialStatus.className='spatial-status'; spatialStatus.setAttribute('role','status');
  spatialStatus.textContent='Mova o cursor para consultar os tiles.'; guideControls.appendChild(spatialStatus);
  hint.appendChild(guideControls);

  const bar = document.createElement('div');
  bar.className = 'panel bar';
  const mk = (label: string, primary = false) => { const b = document.createElement('button'); b.textContent = label; if (primary) b.className = 'primary'; bar.appendChild(b); return b; };
  const deleteBtn = mk('Remover');
  const undoBtn = mk('↶ Desfazer');
  undoBtn.title = 'Desfazer a última ação (Ctrl+Z)'; undoBtn.disabled = true;
  const rotBtn = mk('Girar');
  const minusBtn = mk('–');
  const plusBtn = mk('+');
  const brushLabel = document.createElement('label');
  brushLabel.textContent = 'Pincel ';
  brushLabel.style.color = '#9fb0c0';
  const brushInput = document.createElement('input');
  brushInput.type = 'number'; brushInput.min = '1'; brushInput.max = '8'; brushInput.value = '2';
  brushInput.style.width = '48px';
  brushLabel.appendChild(brushInput);
  bar.appendChild(brushLabel);
  const reloadBtn = mk('Recarregar');
  const saveBtn = mk('Salvar', true);
  const saveAsBtn = mk('Salvar como novo');
  const newMapBtn = mk('Novo mapa plano');
  const deleteMapBtn = mk('Excluir mapa');
  const status = document.createElement('span');
  status.className = 'status';
  bar.appendChild(status);
  root.appendChild(bar);

  return { root, gridInput, guidesInput, referenceSelect, measureBtn, cryptBtn, overviewBtn, spatialStatus, gridStatus, paletteButtons, deleteBtn, undoBtn, lightingSelect, rotBtn, plusBtn, minusBtn, saveBtn, saveAsBtn, newMapBtn, deleteMapBtn, reloadBtn, brushInput, propVariationInput, pointsInput, pathResetBtn, propScaleInput, propRotationInput, brushNote, selectToolBtn, status };
}
