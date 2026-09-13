// Controles RTS: câmera, seleção, ordens, ghost de construção

import * as THREE from 'three';
import { BUILDING_SIZE, BUILD_COSTS, BUILDABLE, VAMPIRE_PLAYER_ID, SPEC_ENTITY_LIMITS, HUMAN_ABILITIES, VAMPIRE_ABILITIES, canBuildKind, canPlaceBuilding, type BuildKind, type HumanAbilityId, type Snapshot, type VampireAbilityId } from '@vampire/shared';
import type { GameScene } from './scene.js';
import type { Net } from './net.js';
import { RTS_CAMERA } from './camera.js';

// Atalhos: construção em letras (Q/E/R/T/F) e habilidades em números (1..4),
// ambos tratados pela HUD, que clica nos botões dos painéis correspondentes.

export class RtsControls {
  selected: number[] = [];
  selectedBuilding: number | null = null;
  inspectedUnit: number | null = null;
  buildMode: BuildKind | null = null;
  abilityMode: HumanAbilityId | null = null;
  vampireAbilityMode: VampireAbilityId | null = null;
  private ghost: THREE.Mesh | null = null;
  private buildPointer: { clientX: number; clientY: number } | null = null;
  private pointer: { clientX: number; clientY: number } | null = null;
  private buildTarget: { x: number; z: number } | null = null;
  private buildValid = false;
  private dragStart: { x: number; y: number } | null = null;
  private dragBox: HTMLDivElement;
  private keys = new Set<string>();
  private camTarget = new THREE.Vector3(0, 0, 0);
  private zoom: number = RTS_CAMERA.initialZoom;

  constructor(
    private scene: GameScene,
    private net: Net,
    private container: HTMLElement,
    private getMyId: () => number,
    private getSnap: () => Snapshot | null,
    private onSelectionChanged: () => void,
    private setActingId: (owner: number) => void = () => {},
  ) {
    // caixa de seleção
    this.dragBox = document.createElement('div');
    this.dragBox.style.cssText = `
      position: fixed; display: none; border: 2px solid #6ad66a;
      background: rgba(106, 214, 106, 0.12); pointer-events: none; z-index: 10;
    `;
    document.body.appendChild(this.dragBox);

    window.addEventListener('keydown', (e) => {
      if ((e.target as HTMLElement).matches('input, textarea, select')) return;
      const key = e.key.toLowerCase();
      this.keys.add(key);
      if (key === 'escape') { this.cancelBuild(); this.cancelAbility(); this.cancelVampireAbility(); return; }
      if (e.repeat) return;
      // Espaço: foca e seleciona o personagem principal.
      if (e.code === 'Space') { e.preventDefault(); this.focusHero(); return; }
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.dragStart = null;
      this.dragBox.style.display = 'none';
    });
    this.scene.renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom = THREE.MathUtils.clamp(
        this.zoom + e.deltaY * RTS_CAMERA.wheelSensitivity, RTS_CAMERA.minZoom, RTS_CAMERA.maxZoom,
      );
    }, { passive: false });

    const dom = this.scene.renderer.domElement;
    dom.addEventListener('pointerdown', (e) => this.onDown(e));
    dom.addEventListener('pointermove', (e) => this.onMove(e));
    dom.addEventListener('pointerleave', () => {
      this.buildPointer = null;
      this.updateBuildPreview();
      this.scene.setHoverEnemy(null);
      this.scene.clearAbilityMarker();
      this.scene.renderer.domElement.style.cursor = '';
    });
    dom.addEventListener('pointerup', (e) => this.onUp(e));
    dom.addEventListener('pointercancel', () => {
      this.dragStart = null;
      this.dragBox.style.display = 'none';
    });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // ---------- câmera ----------

  /**
   * Limita o alvo da câmera à parte do mapa que ainda aparece na tela.
   * Calcula a pegada visível no chão (por eixo) a partir do FOV/zoom, para a
   * câmera chegar o mais perto possível da borda SEM mostrar o vazio.
   */
  private clampTarget() {
    const dist = RTS_CAMERA.distance * this.zoom;
    const vf = THREE.MathUtils.degToRad(RTS_CAMERA.fov) / 2;
    const pitch = Math.atan(RTS_CAMERA.elevation / RTS_CAMERA.depth);
    const h = dist * RTS_CAMERA.elevation;
    const near = h / Math.tan(pitch + vf);
    const farG = h / Math.tan(Math.max(0.02, pitch - vf));
    const D = dist * RTS_CAMERA.depth;
    const hf = Math.atan(Math.tan(vf) * this.scene.camera.aspect);
    // Limita à área jogável (não ao mundo inteiro): sem isso a câmera anda
    // muito além das fileiras de pedra e mostra o vazio inacessível.
    const { minX, minZ, maxX, maxZ } = this.scene.playableBounds();
    const cap = Math.min(maxX - minX, maxZ - minZ) * 0.5;
    // Margem de segurança pequena: com a folga do recorte, não corta as bordas.
    const marginX = Math.min(cap, farG * Math.tan(hf) * 1.05);
    const marginZback = Math.min(cap, farG - D); // lado oposto à câmera (topo)
    const marginZfront = Math.min(cap, Math.max(0, D - near)); // lado da câmera (base)
    const loX = minX + marginX, hiX = maxX - marginX;
    const loZ = minZ + marginZback, hiZ = maxZ - marginZfront;
    this.camTarget.x = loX <= hiX ? THREE.MathUtils.clamp(this.camTarget.x, loX, hiX) : (minX + maxX) / 2;
    this.camTarget.z = loZ <= hiZ ? THREE.MathUtils.clamp(this.camTarget.z, loZ, hiZ) : (minZ + maxZ) / 2;
  }

  private updateCamera(dt: number) {
    const speed = RTS_CAMERA.panSpeed * dt * this.zoom;
    const k = this.keys;
    if (k.has('w') || k.has('arrowup')) this.camTarget.z -= speed;
    if (k.has('s') || k.has('arrowdown')) this.camTarget.z += speed;
    if (k.has('a') || k.has('arrowleft')) this.camTarget.x -= speed;
    if (k.has('d') || k.has('arrowright')) this.camTarget.x += speed;
    this.clampTarget();
    const dist = RTS_CAMERA.distance * this.zoom;

    // A altura do alvo é suavizada: os platôs dos refúgios têm degraus, e
    // seguir o terreno direto fazia a câmera pular ao cruzar a borda.
    const groundY = this.scene.heightAt(this.camTarget.x, this.camTarget.z);
    this.camTarget.y += (groundY - this.camTarget.y) * Math.min(1, dt * RTS_CAMERA.heightSmoothing);
    const cam = this.scene.camera;
    const desired = new THREE.Vector3(
      this.camTarget.x,
      this.camTarget.y + dist * RTS_CAMERA.elevation,
      this.camTarget.z + dist * RTS_CAMERA.depth,
    );
    cam.position.lerp(desired, Math.min(1, dt * RTS_CAMERA.smoothing));
    cam.lookAt(this.camTarget);
    // A sombra acompanha o alvo da câmera para manter a resolução concentrada.
    this.scene.setShadowFocus(this.camTarget.x, this.camTarget.z);
  }

  focusOn(x: number, z: number) {
    this.camTarget.set(x, this.scene.heightAt(x, z), z);
    this.clampTarget();
    this.camTarget.y = this.scene.heightAt(this.camTarget.x, this.camTarget.z);
    // Encaixa a câmera na hora: sem "wobble" de girar o alvo antes da posição
    // alcançar (o que dava a sensação de shake ao clicar no minimapa).
    const dist = RTS_CAMERA.distance * this.zoom;
    const cam = this.scene.camera;
    cam.position.set(
      this.camTarget.x,
      this.camTarget.y + dist * RTS_CAMERA.elevation,
      this.camTarget.z + dist * RTS_CAMERA.depth,
    );
    cam.lookAt(this.camTarget);
  }

  /** Seleciona e centraliza o personagem principal (tecla Espaço). */
  focusHero() {
    const snap = this.getSnap();
    if (!snap) return;
    const units = snap.units.filter(u => u.owner === this.getMyId() && u.hp > 0);
    const hero = units.find(u => u.kind === 'vampire' || u.hero) ?? units[0];
    if (!hero) return;
    this.selected = [hero.id];
    this.selectedBuilding = null;
    this.inspectedUnit = null;
    this.focusOn(hero.x, hero.z);
    this.scene.setSelection(this.selected);
    this.scene.setBuildingSelection(null);
    this.onSelectionChanged();
  }

  // ---------- mouse ----------

  private ndc(e: { clientX: number; clientY: number }): { x: number; y: number } {
    const r = this.scene.renderer.domElement.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: -((e.clientY - r.top) / r.height) * 2 + 1,
    };
  }

  private onDown(e: PointerEvent) {
    e.preventDefault();
    if (e.button === 0) {
      if (this.buildMode) {
        this.placeBuild(e);
        return;
      }
      if (this.abilityMode) {
        this.castAbility(e);
        return;
      }
      if (this.vampireAbilityMode) {
        this.castVampireAbility(e);
        return;
      }
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.scene.renderer.domElement.setPointerCapture(e.pointerId);
    } else if (e.button === 2) {
      this.rightClick(e);
    }
  }

  private onMove(e: PointerEvent) {
    this.pointer = { clientX: e.clientX, clientY: e.clientY };
    if (this.buildMode && this.ghost) {
      this.buildPointer = this.pointer;
      this.updateBuildPreview();
    }
    if (this.abilityMode || this.vampireAbilityMode) {
      // Pré-visualização da habilidade no chão/alvo.
      this.updateAbilityMarker(e);
      this.scene.setHoverEnemy(null);
    } else if (!this.buildMode) {
      // Indicador de alvo: retículo vermelho ao passar o mouse sobre um inimigo.
      this.updateHoverEnemy(e);
    }
    if (this.dragStart) {
      const x = Math.min(this.dragStart.x, e.clientX);
      const y = Math.min(this.dragStart.y, e.clientY);
      const w = Math.abs(e.clientX - this.dragStart.x);
      const h = Math.abs(e.clientY - this.dragStart.y);
      this.dragBox.style.cssText += `display:block; left:${x}px; top:${y}px; width:${w}px; height:${h}px;`;
    }
  }

  /** Mostra o retículo sobre uma unidade inimiga sob o cursor. */
  private updateHoverEnemy(e: { clientX: number; clientY: number }) {
    const n = this.ndc(e);
    const id = this.scene.unitUnderCursor(n.x, n.y);
    const snap = this.getSnap();
    const unit = id !== undefined ? snap?.units.find(u => u.id === id) : undefined;
    const myId = this.getMyId();
    const enemy = unit && (unit.owner === VAMPIRE_PLAYER_ID) !== (myId === VAMPIRE_PLAYER_ID) ? unit.id : null;
    this.scene.setHoverEnemy(enemy);
    this.scene.renderer.domElement.style.cursor = enemy !== null ? 'crosshair' : '';
  }

  /** Pré-visualização do alvo/área da habilidade em modo de mira. */
  private updateAbilityMarker(e: { clientX: number; clientY: number }) {
    const snap = this.getSnap();
    if (!snap) return;
    const n = this.ndc(e);
    if (this.vampireAbilityMode === 'revealArea') {
      const hit = this.scene.screenToGround(n.x, n.y);
      if (!hit) { this.scene.clearAbilityMarker(); return; }
      const valid = !this.scene.model.isWaterAtWorld(hit.x, hit.z);
      this.scene.setAbilityMarker(hit.x, hit.z, VAMPIRE_ABILITIES.revealArea.radius ?? 30, valid ? 0x9fd0ff : 0xff5a5a);
      return;
    }
    if (this.abilityMode === 'teleport') {
      const hit = this.scene.screenToGround(n.x, n.y);
      if (!hit) { this.scene.clearAbilityMarker(); return; }
      const hero = snap.units.find(u => u.owner === this.getMyId() && u.kind === 'worker' && u.hero);
      const range = HUMAN_ABILITIES.teleport.maxRange ?? 0;
      const valid = !!hero && Math.hypot(hit.x - hero.x, hit.z - hero.z) <= range && !this.scene.model.isWaterAtWorld(hit.x, hit.z);
      this.scene.setAbilityMarker(hit.x, hit.z, 0, valid ? 0x6ad6ff : 0xff5a5a);
      return;
    }
    // Habilidades com alvo: destaca a unidade/prédio sob o cursor.
    const pick = this.scene.pickAt(n.x, n.y);
    const id = pick.unitId ?? pick.buildingId;
    const unit = id !== undefined ? snap.units.find(u => u.id === id) : undefined;
    const bld = id !== undefined ? snap.buildings.find(b => b.id === id) : undefined;
    const position = unit ?? bld;
    if (!position) { this.scene.clearAbilityMarker(); return; }
    const myId = this.getMyId();
    const valid = this.abilityMode === 'fortify'
      ? unit?.owner === myId || bld?.owner === myId
      : this.abilityMode === 'entangle' || this.abilityMode === 'silencer'
        ? unit?.kind === 'vampire'
        : false;
    this.scene.setAbilityMarker(position.x, position.z, 0, valid ? 0x6ad6ff : 0xff5a5a);
  }

  private onUp(e: PointerEvent) {
    if (this.scene.renderer.domElement.hasPointerCapture(e.pointerId)) {
      this.scene.renderer.domElement.releasePointerCapture(e.pointerId);
    }
    this.dragBox.style.display = 'none';
    if (!this.dragStart || e.button !== 0) {
      this.dragStart = null;
      return;
    }
    const start = this.dragStart;
    this.dragStart = null;
    const dragged = Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8;

    const snap = this.getSnap();
    if (!snap) return;
    const practice = !!snap.practice;
    let myId = this.getMyId();
    this.selectedBuilding = null;
    this.inspectedUnit = null;

    if (!dragged) {
      // seleção simples
      const n = this.ndc(e);
      const ground = this.scene.screenToGround(n.x, n.y);
      if (ground) this.scene.clickMarker(ground.x, ground.z, 0xf0d9a8);
      const pick = this.scene.pickAt(n.x, n.y);
      if (pick.unitId !== undefined) {
        const u = snap.units.find((uu) => uu.id === pick.unitId);
        // Teste solo: clicar numa unidade de qualquer lado assume o controle dela.
        if (practice && u) {
          if (u.owner !== myId) this.selected = [];
          this.setActingId(u.owner);
          myId = u.owner;
        }
        // Trabalhador em cima do prédio que constrói/repara: prioriza o prédio,
        // para selecioná-lo (ex.: melhorar o muro) mesmo com a unidade ocupando.
        const workTarget = u && u.owner === myId && (u.orderType === 'build' || u.orderType === 'repair') ? u.targetId : null;
        const buildingUnder = workTarget != null ? this.scene.buildingUnderCursor(n.x, n.y) : undefined;
        if (buildingUnder !== undefined && buildingUnder === workTarget) {
          this.selected = [];
          this.selectedBuilding = buildingUnder;
        } else if (u && u.owner === myId) {
          this.selected = e.shiftKey ? (this.selected.includes(u.id) ? this.selected.filter(id => id !== u.id) : [...this.selected, u.id]) : [u.id];
        } else {
          this.selected = [];
          this.inspectedUnit = u?.id ?? null;
        }
      } else {
        this.selected = [];
        this.selectedBuilding = pick.buildingId ?? null;
        // Teste solo: selecionar um prédio de qualquer lado assume o controle dele.
        if (practice && pick.buildingId !== undefined) {
          const b = snap.buildings.find((bb) => bb.id === pick.buildingId);
          if (b) this.setActingId(b.kind === 'crypt' ? VAMPIRE_PLAYER_ID : b.owner >= 0 ? b.owner : myId);
        }
      }
    } else {
      // seleção em caixa — só unidades próprias
      const r = this.scene.renderer.domElement.getBoundingClientRect();
      const x0 = Math.min(start.x, e.clientX);
      const x1 = Math.max(start.x, e.clientX);
      const y0 = Math.min(start.y, e.clientY);
      const y1 = Math.max(start.y, e.clientY);
      if (!e.shiftKey) this.selected = [];
      for (const u of snap.units) {
        if (u.owner !== myId) continue;
        const v = this.scene.unitScreenPosition(u.id);
        if (!v || v.z < -1 || v.z > 1) continue;
        const sx = r.left + ((v.x + 1) / 2) * r.width;
        const sy = r.top + ((1 - v.y) / 2) * r.height;
        if (sx >= x0 && sx <= x1 && sy >= y0 && sy <= y1 && !this.selected.includes(u.id)) this.selected.push(u.id);
      }
    }
    this.scene.setSelection(this.inspectedUnit === null ? this.selected : [this.inspectedUnit]);
    this.scene.setBuildingSelection(this.selectedBuilding);
    this.onSelectionChanged();
  }

  private rightClick(e: PointerEvent) {
    if (this.buildMode) { this.cancelBuild(); return; }
    if (this.abilityMode) { this.cancelAbility(); return; }
    if (this.vampireAbilityMode) { this.cancelVampireAbility(); return; }
    const n = this.ndc(e);
    const ground = this.scene.screenToGround(n.x, n.y);
    if (ground) this.scene.clickMarker(ground.x, ground.z, 0x8fe07a);
    if (this.selected.length === 0) return;
    const snap = this.getSnap();
    if (!snap) return;
    const pick = this.scene.pickAt(n.x, n.y);

    if (pick.nodeId !== undefined) {
      if (this.getMyId() !== VAMPIRE_PLAYER_ID) {
        this.net.command({ type: 'gather', ids: this.selected, nodeId: pick.nodeId });
        return;
      }
    }
    if (pick.unitId !== undefined) {
      const u = snap.units.find((uu) => uu.id === pick.unitId);
      if (u && (u.owner === VAMPIRE_PLAYER_ID) !== (this.getMyId() === VAMPIRE_PLAYER_ID)) {
        this.net.command({ type: 'attack', ids: this.selected, targetId: pick.unitId });
        this.scene.clickMarker(u.x, u.z, 0xff5a5a);
        return;
      }
    }
    if (pick.buildingId !== undefined) {
      const b = snap.buildings.find((bb) => bb.id === pick.buildingId);
      if (b && b.owner >= 0 && (b.owner === VAMPIRE_PLAYER_ID) !== (this.getMyId() === VAMPIRE_PLAYER_ID)) {
        this.net.command({ type: 'attack', ids: this.selected, targetId: pick.buildingId });
        this.scene.clickMarker(b.x, b.z, 0xff5a5a);
        return;
      }
      // Mina de Ouro própria e concluída: clicar inicia a extração (comando gather).
      if (b && b.done && b.kind === 'goldMine' && b.owner === this.getMyId() && this.getMyId() !== VAMPIRE_PLAYER_ID) {
        this.net.command({ type: 'gather', ids: this.selected, nodeId: b.id });
        return;
      }
      if (b && !b.done && b.owner === this.getMyId()) {
        this.net.command({ type: 'resumeBuild', ids: this.selected, targetId: b.id });
        return;
      }
      if (b && b.done && b.kind === 'wall' && b.owner === this.getMyId()) {
        // Mesmo com o muro cheio: deixa o construtor de prontidão para reparar.
        const canRepair = this.selected.some(id => {
          const u = snap.units.find(uu => uu.id === id);
          return !!u && u.owner === this.getMyId() && u.kind === 'worker' && u.workerRole !== 'lumberjack' && u.workerRole !== 'miner';
        });
        if (canRepair) {
          this.net.command({ type: 'repair', ids: this.selected, targetId: b.id });
          return;
        }
      }
      // Aproximação pela borda do prédio, em vez de ordenar entrada no centro.
      if (b) {
        const unit = snap.units.find(u => this.selected.includes(u.id));
        if (unit) {
          const h = BUILDING_SIZE[b.kind] / 2 + 2;
          const dx = unit.x - b.x, dz = unit.z - b.z;
          const x = Math.abs(dx) > Math.abs(dz) ? b.x + Math.sign(dx || 1) * h : b.x;
          const z = Math.abs(dx) > Math.abs(dz) ? b.z : b.z + Math.sign(dz || 1) * h;
          this.net.command({ type: 'move', ids: this.selected, x, z });
        }
        return;
      }
    }
    const hit = this.scene.screenToGround(n.x, n.y);
    if (hit) {
      this.net.command({ type: 'move', ids: this.selected, x: hit.x, z: hit.z });
    }
  }

  // ---------- construção ----------

  enterBuild(kind: BuildKind) {
    const snap = this.getSnap();
    if (!snap?.units.some(u => u.owner === this.getMyId() && this.selected.includes(u.id) && canBuildKind(u, kind))) return;
    this.cancelBuild();
    this.buildMode = kind;
    this.scene.setBuildGridVisible(true, kind);
    const size = BUILDING_SIZE[kind];
    const geo =
      kind === 'tower'
        ? new THREE.CylinderGeometry(size / 2.4, size / 2, 6, 8)
        : new THREE.BoxGeometry(size, 3, size);
    this.ghost = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: 0x6ad66a, transparent: true, opacity: 0.45, depthWrite: false, depthTest: false }),
    );
    this.ghost.visible = false;
    this.ghost.renderOrder = 11;
    this.scene.scene.add(this.ghost);
    // Mostra a prévia imediatamente, na posição atual do cursor (ou no centro).
    const rect = this.scene.renderer.domElement.getBoundingClientRect();
    this.buildPointer = this.pointer ?? { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 };
    this.updateBuildPreview();
    this.onSelectionChanged();
  }

  private updateBuildPreview() {
    if (!this.buildMode || !this.ghost) return;
    const snap = this.getSnap();
    const pointer = this.buildPointer && this.ndc(this.buildPointer);
    const hit = pointer && this.scene.screenToGround(pointer.x, pointer.y);
    this.buildValid = false;
    this.buildTarget = null;
    if (!hit || !snap) {
      this.ghost.visible = false;
      this.scene.setTowerRange('placement', null);
      this.scene.setBuildFootprint(null, null, false);
      return;
    }
    // Encaixa a construção para ocupar quadrados inteiros: tamanho par cai em
    // coordenada inteira; tamanho ímpar cai em meia-coordenada (borda inteira).
    const offset = BUILDING_SIZE[this.buildMode] % 2 === 0 ? 0 : 0.5;
    const x = Math.round(hit.x - offset) + offset, z = Math.round(hit.z - offset) + offset;
    this.buildTarget = { x, z };
    const me = snap.players.find(p => p.id === this.getMyId());
    const cost = BUILD_COSTS[this.buildMode];
    const hasBuilder = snap.units.some(u => u.owner === this.getMyId() && this.selected.includes(u.id) && canBuildKind(u, this.buildMode!));
    const limit = (SPEC_ENTITY_LIMITS as Record<string, number | undefined>)[this.buildMode];
    const atLimit = limit !== undefined && snap.buildings.filter(b => b.owner === this.getMyId() && b.kind === this.buildMode).length >= limit;
    this.buildValid = !!me && !snap.result && hasBuilder && !atLimit && me.wood >= cost.wood && me.gold >= cost.gold &&
      canPlaceBuilding(this.scene.map, snap, this.buildMode, x, z);
    const color = this.buildValid ? 0x6ad66a : 0xff4b4b;
    (this.ghost.material as THREE.MeshBasicMaterial).color.setHex(color);
    this.ghost.visible = true;
    this.ghost.position.set(x, this.scene.heightAt(x, z) + (this.buildMode === 'tower' ? 3 : 1.5), z);
    this.scene.setTowerRange('placement', this.buildMode === 'tower' ? this.buildTarget : null, color);
    this.scene.setBuildFootprint(this.buildTarget, this.buildMode, this.buildValid);
  }

  cancelBuild() {
    if (this.ghost) {
      this.scene.scene.remove(this.ghost);
      this.ghost.geometry.dispose();
      (this.ghost.material as THREE.Material).dispose();
      this.ghost = null;
    }
    this.buildMode = null;
    this.buildPointer = null;
    this.buildTarget = null;
    this.buildValid = false;
    this.scene.setTowerRange('placement', null);
    this.scene.setBuildGridVisible(false);
    this.scene.setBuildFootprint(null, null, false);
    this.onSelectionChanged();
  }

  /** Ativa/desativa o modo de alvo de uma habilidade do Humano. */
  enterAbility(id: HumanAbilityId) {
    if (this.getMyId() === VAMPIRE_PLAYER_ID) return;
    const snap = this.getSnap();
    const hero = snap?.units.find(u => u.owner === this.getMyId() && u.kind === 'worker' && u.hero && u.hp > 0);
    if (!hero) return;
    this.cancelBuild();
    this.cancelVampireAbility();
    this.abilityMode = this.abilityMode === id ? null : id;
    if (!this.abilityMode) this.scene.clearAbilityMarker();
    this.onSelectionChanged();
  }

  cancelAbility() {
    if (!this.abilityMode) return;
    this.abilityMode = null;
    this.scene.clearAbilityMarker();
    this.onSelectionChanged();
  }

  private castAbility(e: PointerEvent) {
    const id = this.abilityMode;
    if (!id) return;
    const snap = this.getSnap();
    if (!snap) return;
    const n = this.ndc(e);
    const pick = this.scene.pickAt(n.x, n.y);
    if (id === 'teleport') {
      const hit = this.scene.screenToGround(n.x, n.y);
      if (!hit) return;
      this.net.command({ type: 'castHumanAbility', ability: 'teleport', x: hit.x, z: hit.z });
    } else if (id === 'entangle' || id === 'silencer') {
      const target = pick.unitId !== undefined ? snap.units.find(u => u.id === pick.unitId) : undefined;
      if (!target || target.kind !== 'vampire') return;
      this.net.command({ type: 'castHumanAbility', ability: id, targetId: target.id });
    } else {
      const targetId = pick.unitId ?? pick.buildingId;
      if (targetId === undefined) return;
      const unit = snap.units.find(u => u.id === targetId);
      const bld = snap.buildings.find(b => b.id === targetId);
      if (!(unit?.owner === this.getMyId() || bld?.owner === this.getMyId())) return;
      this.net.command({ type: 'castHumanAbility', ability: 'fortify', targetId });
    }
    this.cancelAbility();
  }

  /** Modo de alvo no chão para Revelar Área (habilidade do Vampiro). */
  enterVampireAbility(id: VampireAbilityId) {
    if (this.getMyId() !== VAMPIRE_PLAYER_ID) return;
    this.cancelBuild();
    this.cancelAbility();
    this.vampireAbilityMode = this.vampireAbilityMode === id ? null : id;
    if (!this.vampireAbilityMode) this.scene.clearAbilityMarker();
    this.onSelectionChanged();
  }

  cancelVampireAbility() {
    if (!this.vampireAbilityMode) return;
    this.vampireAbilityMode = null;
    this.scene.clearAbilityMarker();
    this.onSelectionChanged();
  }

  private castVampireAbility(e: PointerEvent) {
    const id = this.vampireAbilityMode;
    if (!id) return;
    const n = this.ndc(e);
    const hit = this.scene.screenToGround(n.x, n.y);
    if (!hit) return;
    this.net.command({ type: 'castVampireAbility', ability: id, x: hit.x, z: hit.z });
    this.cancelVampireAbility();
  }

  private placeBuild(e: PointerEvent) {
    if (!this.buildMode) return;
    this.buildPointer = { clientX: e.clientX, clientY: e.clientY };
    this.updateBuildPreview();
    // Mantém a prévia vermelha e permite escolher outro local sem gastar recursos.
    if (!this.buildValid || !this.buildTarget) return;
    this.net.command({
      type: 'build',
      ids: this.selected,
      kind: this.buildMode,
      x: this.buildTarget.x,
      z: this.buildTarget.z,
    });
    this.cancelBuild();
  }

  buildable(): BuildKind[] {
    return [...BUILDABLE];
  }

  update(dt: number) {
    const snap = this.getSnap();
    if (snap) {
      const ids = this.selected.filter(id => snap.units.some(u => u.id === id && u.owner === this.getMyId()));
      if (ids.length !== this.selected.length) {
        this.selected = ids;
        this.scene.setSelection(ids);
        this.onSelectionChanged();
      }
      if (this.selectedBuilding !== null && !snap.buildings.some(b => b.id === this.selectedBuilding)) {
        this.selectedBuilding = null;
        this.scene.setBuildingSelection(null);
        this.onSelectionChanged();
      }
      if (this.inspectedUnit !== null && !snap.units.some(u => u.id === this.inspectedUnit)) {
        this.inspectedUnit = null;
        this.scene.setSelection(this.selected);
        this.onSelectionChanged();
      }
    }
    this.updateCamera(dt);
    this.updateBuildPreview();
  }
}
