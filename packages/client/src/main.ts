// Menu → preparação confirmada pelo servidor → partida.
import { GameScene } from './scene.js';
import { RtsControls } from './rts.js';
import { Hud } from './ui.js';
import { Net } from './net.js';
import { Lobby } from './lobby.js';
import { assetRegistry } from './assets/asset-registry.js';
import { installCursors } from './cursor.js';

installCursors();

const app = document.getElementById('app')!;
const visualAssetsReady = assetRegistry.preload();
const net = new Net();
const lobby = new Lobby(app, net);
const unsubscribe = net.subscribe(() => {
  if (!net.started) return;
  unsubscribe();
  void visualAssetsReady.then(() => {
    lobby.destroy();
    startGame(net);
  });
});
void net.connect().catch(() => lobby.render());

function startGame(net: Net) {
  const scene = new GameScene(app, net.lobby!.seed);
  // Fog de guerra: esconde unidades inimigas fora da visão do time local.
  scene.setLocalPlayer(net.myId);
  let hud: Hud;
  const controls = new RtsControls(scene, net, app, () => net.myId, () => net.latestSnap,
    () => { if (hud && net.latestSnap) hud.update(net.latestSnap, net.myId); });
  hud = new Hud(scene, controls, net, () => net.myId);
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
      hud.update(snap, net.myId);
    }
    controls.update(dt);
    if (snap) scene.updateDayNight(snap.phase, snap.phaseTime, snap.day);
    scene.render(dt);
  }
  requestAnimationFrame(loop);
}
