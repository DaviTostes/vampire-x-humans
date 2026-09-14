// Área de teste dos módulos de cliff (acessível por ?cliffTest=1).
// Mostra straight + outerCorner + innerCorner + stairs lado a lado, com um
// platô de altura CLIFF_HEIGHT e o chão baixo em Y=0, para conferir base/topo,
// encaixe de aresta e orientação antes de aplicar no mapa.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { assetRegistry, CLIFF_HEIGHT, CLIFF_MODULES, type CliffRole } from './assets/asset-registry.js';

export async function startCliffTest(container: HTMLElement) {
  container.innerHTML = '';
  const width = container.clientWidth || 1280;
  const height = container.clientHeight || 720;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9db7d8);
  scene.fog = new THREE.Fog(0x9db7d8, 200, 600);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
  camera.position.set(0, 30, 62);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, CLIFF_HEIGHT * 0.5, -2);
  controls.update();

  scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x3a4a33, 1.0));
  const sun = new THREE.DirectionalLight(0xffeecc, 1.5);
  sun.position.set(40, 80, 60);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -60, right: 60, top: 60, bottom: -60, near: 1, far: 400 });
  sun.shadow.camera.updateProjectionMatrix();
  scene.add(sun);

  // Chão baixo (Y=0) e platô elevado (topo em Y=CLIFF_HEIGHT), frente em z=0.
  const low = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 160),
    new THREE.MeshLambertMaterial({ color: 0x4f7a34 }),
  );
  low.rotation.x = -Math.PI / 2;
  low.receiveShadow = true;
  scene.add(low);

  const plateau = new THREE.Mesh(
    new THREE.BoxGeometry(150, CLIFF_HEIGHT, 24),
    new THREE.MeshLambertMaterial({ color: 0x5c6350 }),
  );
  plateau.position.set(0, CLIFF_HEIGHT / 2, -12);
  plateau.receiveShadow = true;
  plateau.castShadow = true;
  scene.add(plateau);

  const grid = new THREE.GridHelper(200, 100, 0x2a3a22, 0x36502a);
  grid.position.y = 0.02;
  scene.add(grid);
  scene.add(new THREE.AxesHelper(8));

  await assetRegistry.loadCliffModules();

  // Lado a lado ao longo da frente do platô (z=0).
  const row: Array<{ role: CliffRole; x: number; rotY: number }> = [
    { role: 'straight', x: -66, rotY: 0 },
    { role: 'straight', x: -51, rotY: 0 },
    { role: 'straight', x: -36, rotY: 0 },
    { role: 'stairs', x: -20, rotY: 0 },
    { role: 'innerCorner', x: -4, rotY: 0 },
    { role: 'outerCorner', x: 18, rotY: 0 },
    { role: 'straight', x: 40, rotY: 0 },
  ];

  const labels = new Map<CliffRole, number>();
  const labelSprite = (text: string, x: number): THREE.Sprite => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0b1424';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 64px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }));
    sprite.scale.set(9, 2.25, 1);
    sprite.position.set(x, CLIFF_HEIGHT + 3, 0);
    return sprite;
  };
  for (const item of row) {
    const module = assetRegistry.cliffModule(item.role);
    if (!module) continue;
    // Holder: preserva o offset calibrado do módulo (base em Y=0) e só posiciona.
    const holder = new THREE.Group();
    holder.add(module);
    holder.position.set(item.x, 0, 0);
    holder.rotation.y = item.rotY;
    holder.updateMatrixWorld(true);
    scene.add(holder);
    scene.add(labelSprite(item.role, item.x));

    // Referência visual da faixa Y=0..CLIFF_HEIGHT em volta de cada módulo.
    const box = new THREE.Box3().setFromObject(holder);
    scene.add(new THREE.Box3Helper(box, 0xffd166));
    labels.set(item.role, (labels.get(item.role) ?? 0) + 1);

    if (import.meta.env.DEV) {
      console.log(`[cliffTest] ${item.role} @ x=${item.x}: min.y=${box.min.y.toFixed(3)} max.y=${box.max.y.toFixed(3)} altura=${(box.max.y - box.min.y).toFixed(3)}`);
    }
  }

  // Linha do topo esperado, para comparar a altura física de todos.
  const topLine = new THREE.Mesh(
    new THREE.BoxGeometry(150, 0.06, 0.06),
    new THREE.MeshBasicMaterial({ color: 0xff5a5a }),
  );
  topLine.position.set(0, CLIFF_HEIGHT, 0);
  scene.add(topLine);
  console.log('[cliffTest] papéis:', [...labels.keys()].join(', '), '| CLIFF_HEIGHT =', CLIFF_HEIGHT, '| módulos no registro:', CLIFF_MODULES.map((m) => m.role).join(', '));

  const onResize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  let last = performance.now();
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    controls.update();
    renderer.render(scene, camera);
    void dt;
  };
  requestAnimationFrame(loop);
}
