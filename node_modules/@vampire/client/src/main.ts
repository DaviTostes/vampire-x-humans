// Menu → preparação confirmada pelo servidor → partida.
import { GameScene } from './scene.js';
import { RtsControls } from './rts.js';
import { Hud } from './ui.js';
import { Net } from './net.js';
import { Lobby } from './lobby.js';
import { assetRegistry } from './assets/asset-registry.js';
import { LoadingScreen } from './loading.js';
import { startCliffTest } from './cliff-test.js';
import { startMapBuilder } from './map-builder.js';
import { startMatchMusic } from './music.js';
import { installCursors } from './cursor.js';
import { preloadResourceIcons } from './resource-icons.js';
import { setActiveMapId } from '@vampire/shared';
import { setMapOverlay } from '@vampire/shared';
import { loadMapCatalog } from './map-catalog.js';

installCursors();
preloadResourceIcons();

const app = document.getElementById('app')!;

if (new URLSearchParams(location.search).has('builder')) {
  // Editor de mapa 3D (rota secreta, com senha via MAP_BUILDER_PASSWORD).
  void startMapBuilder(app);
} else if (new URLSearchParams(location.search).has('cliffTest')) {
  // Área de teste dos módulos de cliff (?cliffTest=1): não sobe sala nem partida.
  void startCliffTest(app);
} else {
  const net = new Net();
  const lobby = new Lobby(app, net);
  // Os modelos pesam ~100 MB e o parse dos FBX prende a thread principal. Em vez
  // de baixar tudo no menu (o que travava todo mundo), carregamos os assets no
  // início da partida, atrás de uma tela de loading, em sequência.
  const unsubscribe = net.subscribe(() => {
    if (!net.started) return;
    unsubscribe();
    lobby.destroy();
    const loading = new LoadingScreen(app);
    void assetRegistry.preload((progress) => loading.setProgress(progress)).then(async () => {
      // Overlay do editor de mapa (muros pintados), se houver — precisa ser
      // aplicado ANTES de montar a cena, para cliente e servidor concordarem.
      const mapId = net.lobby!.mapId;
      await loadMapCatalog();
      try {
        const res = await fetch(`/api/map-overlay?mapId=${encodeURIComponent(mapId)}`);
        if (res.ok) {
          const overlay = await res.json();
          setMapOverlay(mapId, overlay && overlay.version ? overlay : null);
        }
      } catch { /* sem overlay: usa o mapa procedural */ }
      // Monta a cena já carregada e só então revela o jogo, para não aparecer um
      // quadro vazio entre a tela de loading e a partida.
      startGame(net);
      return loading.finish();
    });
  });
  void loadMapCatalog().then(() => net.connect()).then(() => { lobby.maybeRejoin(); }).catch(() => lobby.render());
}

function startGame(net: Net) {
  // Música de fundo da partida (em loop).
  startMatchMusic();
  // O mapa escolhido no lobby define o mundo que a cena constrói.
  setActiveMapId(net.lobby!.mapId);
  const scene = new GameScene(app, net.lobby!.seed, net.lobby!.mapId);
  // Fog de guerra: esconde unidades inimigas fora da visão do time local.
  scene.setLocalPlayer(net.myId);
  // No teste solo o jogador controla os dois lados: o "dono ativo" segue a
  // seleção atual (unidade/prédio) em vez do jogador conectado.
  let actingId = net.myId;
  let practice = false;
  const getActingId = () => actingId;
  let hud: Hud;
  const controls = new RtsControls(scene, net, app, getActingId, () => net.latestSnap,
    () => { if (hud && net.latestSnap) hud.update(net.latestSnap, getActingId()); },
    (owner: number) => { actingId = owner; });
  hud = new Hud(scene, controls, net, getActingId);
  let lastSnapTick = -1;
  let last = performance.now();
  let focused = false;

  function loop(now: number) {
    requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const snap = net.latestSnap;
    if (snap && snap.tick !== lastSnapTick) {
      lastSnapTick = snap.tick;
      // Teste solo: sem névoa, para enxergar e comandar as duas facções.
      if (snap.practice && !practice) { practice = true; scene.setLocalPlayer(-1); }
      scene.sync(snap);
      if (!focused) {
        const mine = snap.units.find(u => u.owner === net.myId);
        if (mine) {
          controls.focusOn(mine.x, mine.z);
          controls.selected = [mine.id];
          scene.setSelection(controls.selected);
          focused = true;
        }
      }
      hud.update(snap, getActingId());
    }
    controls.update(dt);
    if (snap) scene.updateDayNight(snap.phase, snap.phaseTime, snap.day, snap.phase === 'day' ? snap.daySeconds : snap.nightSeconds);
    scene.render(dt);
  }
  requestAnimationFrame(loop);
}
