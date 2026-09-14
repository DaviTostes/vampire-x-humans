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

interface Placed { kind: OverlayPropKind; x: number; z: number; rotY: number; scale: number; holder?: THREE.Group; mesh?: 'tree' | 'rock'; index?: number }

const MAP_ID = 'labyrinth' as const;

const PALETTE: Array<{ group: string; items: Array<{ id: string; label: string }> }> = [
  {
    group: 'Terreno',
    items: [
      { id: 'terrain:raise', label: 'Subir relevo' },
      { id: 'terrain:lower', label: 'Descer relevo' },
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
      { id: 'cliff:stairs', label: 'Escada' },
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
    const template = assetRegistry.buildingTemplate(kind.slice('building:'.length), 1);
    return template ? (template.template.clone(true) as THREE.Group) : null;
  }
  return null;
}

export async function startMapBuilder(container: HTMLElement) {
  const key = new URLSearchParams(location.search).get('key') ?? '';
  console.log('[builder] start, key?', Boolean(key));

  // Sem senha: pede antes de carregar qualquer coisa.
  const auth = await ensureAuthorized(key);
  if (!auth) { console.warn('[builder] não autorizado'); return; }

  container.innerHTML = '';
  const loading = new LoadingScreen(container);
  await assetRegistry.preload((p) => loading.setProgress(p));
  await assetRegistry.loadCliffModules();
  await loading.finish();
  console.log('[builder] assets prontos');

  setActiveMapId(MAP_ID);
  const overlay = normalizeOverlay(await fetch(`/api/map-overlay?mapId=${MAP_ID}`).then((r) => r.json()).catch(() => null));
  setMapOverlay(MAP_ID, overlay);
  console.log('[builder] overlay', overlay.props.length, 'props');

  const world = new GameScene(container, getMapModel(MAP_ID).config.version, MAP_ID);
  // Garante iluminação/céu de dia (o editor não roda o ciclo dia/noite).
  world.updateDayNight('day', 0, 1, 60);
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
  world.camera = camera;
  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    world.renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  // ---------- estado dos props ----------
  const placed: Placed[] = [];
  let selected: Placed | null = null;
  let brush: string | null = null;
  let brushSize = 2;
  let terrainDirty = false;
  const n = world.map.tiles;
  const paintGrid = new Uint8Array(n * n);
  const overlayPaint = overlay.paint;
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

  // Recalcula a malha do terreno a partir de `world.map.height` (relevo editado).
  const refreshTerrain = () => {
    const geo = world.terrainMesh.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let iz = 0; iz <= n; iz++) for (let ix = 0; ix <= n; ix++) {
      const tx = Math.min(n - 1, ix), tz = Math.min(n - 1, iz), i = tz * n + tx;
      const y = world.map.bridge[i] ? BRIDGE_Y : world.map.water[i] ? 1 : (world.map.height[i] ?? 0) * 14;
      pos.setY(iz * (n + 1) + ix, y);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  };

  const tileAt = (point: THREE.Vector3): [number, number] => {
    const ts = WORLD.tileSize, half = WORLD.half;
    return [Math.floor((point.x + half) / ts), Math.floor((point.z + half) / ts)];
  };

  // Relevo por QUADRADOS: cada tile do pincel sobe/desce o mesmo tanto (sem curva).
  const paintTerrain = (point: THREE.Vector3) => {
    const [tx, tz] = tileAt(point);
    const delta = brush === 'terrain:raise' ? 0.06 : -0.06;
    const r = brushSize - 1;
    for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
      const x = tx + dx, z = tz + dz;
      if (x < 0 || z < 0 || x >= n || z >= n) continue;
      const i = z * n + x;
      if (world.map.water[i] || world.map.bridge[i]) continue;
      world.map.height[i] = Math.max(0, Math.min(1.2, (world.map.height[i] ?? 0) + delta));
    }
    terrainDirty = true;
    instancesDirty = true;
  };

  // Piso por quadrados: 1 = caminho (pedra), 2 = grama, 0 = automático.
  const paintTiles = (point: THREE.Vector3, value: number) => {
    const [tx, tz] = tileAt(point);
    const r = brushSize - 1;
    for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
      const x = tx + dx, z = tz + dz;
      if (x < 0 || z < 0 || x >= n || z >= n) continue;
      paintGrid[z * n + x] = value;
    }
    world.setGroundPaint(paintGrid);
  };

  const addPlaced = (data: Omit<Placed, 'holder' | 'mesh' | 'index'>): Placed | null => {
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
    for (const kind of ['tree', 'rock'] as const) {
      const list = placed.filter((p) => p.kind === kind);
      const previous = instanceMeshes[kind];
      if (!list.length) {
        if (previous) { world.scene.remove(previous); previous.geometry.dispose(); instanceMeshes[kind] = undefined; instanceItemIndex[kind] = undefined; }
        continue;
      }
      const instance = assetRegistry.propInstance(kind === 'tree' ? 'prop:tree:evergreen' : 'prop:rock:stone-cluster');
      if (!instance) continue;
      if (previous && previous.count !== list.length) {
        world.scene.remove(previous);
        previous.geometry.dispose();
        instanceMeshes[kind] = undefined;
      }
      const mesh = instanceMeshes[kind] ?? new THREE.InstancedMesh(instance.geometry, instance.material.clone(), list.length);
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
        matrix.compose(new THREE.Vector3(item.x, y, item.z), quaternion, scale);
        mesh.setMatrixAt(i, matrix);
        mapping.push(placed.indexOf(item));
      });
      mesh.count = list.length;
      mesh.instanceMatrix.needsUpdate = true;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (!previous) world.scene.add(mesh);
      instanceMeshes[kind] = mesh;
      instanceItemIndex[kind] = mapping;
    }
    instancesDirty = false;
  };

  for (const p of overlay.props) addPlaced({ kind: p.kind, x: p.x, z: p.z, rotY: p.rotY, scale: p.scale });
  // Primeira abertura com o overlay "cru": importa a decoração procedural
  // (árvores + pedras soltas) para a lista, então TUDO vira editável.
  if (!overlay.decorReplace) {
    for (const spot of world.decorTreeSpots) addPlaced({ kind: 'tree', x: spot.x, z: spot.z, rotY: spot.rotY, scale: spot.scale });
    for (const spot of world.scatterRockSpots) addPlaced({ kind: 'rock', x: spot.x, z: spot.z, rotY: spot.rotY, scale: spot.scale });
    overlay.decorReplace = true;
    overlay.props = placed.map((p) => ({ kind: p.kind, x: p.x, z: p.z, rotY: p.rotY, scale: p.scale }));
  }

  // ---------- seleção / colocação / arrasto ----------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const ground = new THREE.Vector3();
  const dom = world.renderer.domElement;

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
  const applyBrush = (point: THREE.Vector3) => {
    if (!brush) return;
    if (brush.startsWith('terrain:')) paintTerrain(point);
    else if (brush.startsWith('paint:')) paintTiles(point, brush === 'paint:path' ? 1 : 2);
    else select(addPlaced({ kind: brush as OverlayPropKind, x: point.x, z: point.z, rotY: 0, scale: 1 }));
  };
  const updateHover = (event: PointerEvent) => {
    if (!brush) { hover.visible = false; return; }
    const p = groundPoint(event);
    if (!p) { hover.visible = false; return; }
    const [tx, tz] = tileAt(p);
    const size = brushSize * WORLD.tileSize;
    hover.position.set((tx + 0.5) * WORLD.tileSize - WORLD.half, world.heightAt(p.x, p.z) + 0.2, (tz + 0.5) * WORLD.tileSize - WORLD.half);
    hover.scale.set(size, size, 1);
    hover.visible = true;
  };
  dom.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    // 1) Clicou num prop já colocado? Seleciona/move (nunca cria por cima).
    const hit = pickPlaced(event);
    if (hit) { select(hit); dragging = true; return; }
    // 2) Pincel ativo (terreno/piso/prop): aplica e continua ao arrastar.
    if (brush) { const p = groundPoint(event); if (p) { applyBrush(p); painting = true; } return; }
    select(null);
  });
  dom.addEventListener('pointermove', (event) => {
    updateHover(event);
    if (painting && brush) { const p = groundPoint(event); if (p) applyBrush(p); return; }
    if (!dragging || !selected) return;
    const point = groundPoint(event);
    if (!point) return;
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
  dom.addEventListener('pointerleave', () => { hover.visible = false; });
  window.addEventListener('pointerup', () => { dragging = false; painting = false; });

  const removeSelected = () => {
    if (!selected) return;
    if (selected.holder) world.scene.remove(selected.holder);
    placed.splice(placed.indexOf(selected), 1);
    instancesDirty = true;
    select(null);
    setStatus(`${placed.length} props`);
  };
  const rotateSelected = (delta: number) => {
    if (!selected) return;
    selected.rotY += delta;
    if (selected.holder) {
      selected.holder.rotation.y = selected.rotY;
      selected.holder.updateMatrixWorld(true);
      selectionBox.box.setFromObject(selected.holder);
    } else { instancesDirty = true; highlight(selected); }
  };
  const scaleSelected = (factor: number) => {
    if (!selected) return;
    selected.scale = Math.max(0.2, Math.min(6, selected.scale * factor));
    if (selected.holder) {
      selected.holder.scale.setScalar(selected.scale);
      selected.holder.updateMatrixWorld(true);
      selectionBox.box.setFromObject(selected.holder);
    } else { instancesDirty = true; highlight(selected); }
    setStatus(`escala ${selected.scale.toFixed(2)}`);
  };
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') { removeSelected(); event.preventDefault(); }
    if (event.key === 'r' || event.key === 'R') rotateSelected(Math.PI / 4);
    if (event.key === '[') scaleSelected(0.9);
    if (event.key === ']') scaleSelected(1.1);
  });

  // ---------- paleta / barra ----------
  const ui = buildUi();
  container.appendChild(ui.root);
  let statusEl: HTMLElement;
  function setStatus(text: string) { if (statusEl) statusEl.textContent = text; }
  function setBrush(kind: string | null) {
    brush = kind;
    for (const button of ui.paletteButtons) button.classList.toggle('active', button.dataset.kind === kind);
    ui.root.classList.toggle('placing', kind !== null);
  }
  for (const button of ui.paletteButtons) {
    button.addEventListener('click', () => setBrush(brush === button.dataset.kind ? null : (button.dataset.kind ?? null)));
  }
  ui.deleteBtn.addEventListener('click', removeSelected);
  ui.rotBtn.addEventListener('click', () => rotateSelected(Math.PI / 4));
  ui.plusBtn.addEventListener('click', () => scaleSelected(1.1));
  ui.minusBtn.addEventListener('click', () => scaleSelected(0.9));
  ui.saveBtn.addEventListener('click', () => void save());
  ui.reloadBtn.addEventListener('click', () => location.reload());
  ui.brushInput.addEventListener('change', () => { brushSize = Math.max(1, Math.min(8, Math.floor(Number(ui.brushInput.value) || 1))); ui.brushInput.value = String(brushSize); });
  statusEl = ui.status;
  setStatus(`${placed.length} props carregados`);

  async function save() {
    setStatus('salvando…');
    const payload: MapOverlay = {
      version: 1,
      adds: overlay.adds,
      removes: overlay.removes,
      decorReplace: true,
      props: placed.map((p) => ({ kind: p.kind, x: round(p.x), z: round(p.z), rotY: round(p.rotY, 4), scale: round(p.scale, 3) })),
      // Relevo esculpido no editor (unidades de mapa, grid completo).
      height: Array.from(world.map.height).map((v) => Math.round(v * 1000) / 1000),
      // Pintura de piso (0 auto / 1 caminho / 2 grama).
      paint: Array.from(paintGrid),
    };
    try {
      const res = await fetch(`/builder/save?key=${encodeURIComponent(key)}`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
      });
      setStatus(res.ok ? `salvo ✓ (${placed.length} props) — a próxima partida usa` : 'falha ao salvar');
    } catch {
      setStatus('falha ao salvar');
    }
  }

  // ---------- loop ----------
  let last = performance.now();
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (terrainDirty) { terrainDirty = false; refreshTerrain(); }
    if (instancesDirty) { instancesDirty = false; rebuildInstances(); highlight(selected); }
    controls.update();
    world.setShadowFocus(controls.target.x, controls.target.z);
    world.renderer.render(world.scene, camera);
    void dt;
  };
  requestAnimationFrame(loop);
}

function round(value: number, digits = 2): number {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}

/** Pede a senha e valida no servidor antes de liberar o editor. */
async function ensureAuthorized(initialKey: string): Promise<boolean> {
  let key = initialKey;
  for (;;) {
    if (key) {
      const res = await fetch(`/builder/state?key=${encodeURIComponent(key)}`).catch(() => null);
      if (res?.ok) return true;
    }
    const entered = window.prompt(t('Senha do editor de mapa:'));
    if (entered === null) return false;
    key = entered.trim();
    const res = await fetch(`/builder/state?key=${encodeURIComponent(key)}`).catch(() => null);
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
  paletteButtons: HTMLButtonElement[];
  deleteBtn: HTMLButtonElement;
  rotBtn: HTMLButtonElement;
  plusBtn: HTMLButtonElement;
  minusBtn: HTMLButtonElement;
  saveBtn: HTMLButtonElement;
  reloadBtn: HTMLButtonElement;
  brushInput: HTMLInputElement;
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
    #vxh-builder .status { color:#9fb0c0; margin-left:8px; }
    #vxh-builder.placing canvas { cursor: copy; }
    #vxh-builder .hint { top:12px; right:12px; max-width:230px; padding:10px; color:#9fb0c0; line-height:1.5; }
  `;
  root.appendChild(style);

  const palette = document.createElement('div');
  palette.className = 'panel palette';
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
  hint.innerHTML = 'Escolha um prop e clique no terreno para colocar.<br>Clique num prop para selecionar e <b>arrastar</b>.<br><b>R</b> gira, <b>[</b>/<b>]</b> escala, <b>Delete</b> remove.<br>Botão direito gira a câmera; meio move; roda dá zoom.';
  root.appendChild(hint);

  const bar = document.createElement('div');
  bar.className = 'panel bar';
  const mk = (label: string, primary = false) => { const b = document.createElement('button'); b.textContent = label; if (primary) b.className = 'primary'; bar.appendChild(b); return b; };
  const deleteBtn = mk('Remover');
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
  const status = document.createElement('span');
  status.className = 'status';
  bar.appendChild(status);
  root.appendChild(bar);

  return { root, paletteButtons, deleteBtn, rotBtn, plusBtn, minusBtn, saveBtn, reloadBtn, brushInput, status };
}
