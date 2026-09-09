// Controles RTS: câmera, seleção, ordens, ghost de construção

import * as THREE from 'three';
import { BUILDING_SIZE, BUILD_COSTS, BUILDABLE, WORLD, VAMPIRE_PLAYER_ID, canPlaceBuilding, type BuildKind, type Snapshot } from '@vampire/shared';
import type { GameScene } from './scene.js';
import type { Net } from './net.js';
import { RTS_CAMERA } from './camera.js';

export class RtsControls {
  selected: number[] = [];
  selectedBuilding: number | null = null;
  inspectedUnit: number | null = null;
  buildMode: BuildKind | null = null;
  private ghost: THREE.Mesh | null = null;
  private buildPointer: { clientX: number; clientY: number } | null = null;
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
      this.keys.add(e.key.toLowerCase());
      if (e.key.toLowerCase() === 'escape') this.cancelBuild();
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
    });
    dom.addEventListener('pointerup', (e) => this.onUp(e));
    dom.addEventListener('pointercancel', () => {
      this.dragStart = null;
      this.dragBox.style.display = 'none';
    });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // ---------- câmera ----------

  private updateCamera(dt: number) {
    const speed = RTS_CAMERA.panSpeed * dt * this.zoom;
    const k = this.keys;
    if (k.has('w') || k.has('arrowup')) this.camTarget.z -= speed;
    if (k.has('s') || k.has('arrowdown')) this.camTarget.z += speed;
    if (k.has('a') || k.has('arrowleft')) this.camTarget.x -= speed;
    if (k.has('d') || k.has('arrowright')) this.camTarget.x += speed;
    const lim = WORLD.half - 1;
    this.camTarget.x = THREE.MathUtils.clamp(this.camTarget.x, -lim, lim);
    this.camTarget.z = THREE.MathUtils.clamp(this.camTarget.z, -lim, lim);

    this.camTarget.y = this.scene.heightAt(this.camTarget.x, this.camTarget.z);
    const dist = RTS_CAMERA.distance * this.zoom;
    const cam = this.scene.camera;
    const desired = new THREE.Vector3(
      this.camTarget.x,
      this.camTarget.y + dist * RTS_CAMERA.elevation,
      this.camTarget.z + dist * RTS_CAMERA.depth,
    );
    cam.position.lerp(desired, Math.min(1, dt * RTS_CAMERA.smoothing));
    cam.lookAt(this.camTarget);
  }

  focusOn(x: number, z: number) {
    this.camTarget.set(x, this.scene.heightAt(x, z), z);
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
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.scene.renderer.domElement.setPointerCapture(e.pointerId);
    } else if (e.button === 2) {
      this.rightClick(e);
    }
  }

  private onMove(e: PointerEvent) {
    if (this.buildMode && this.ghost) {
      this.buildPointer = { clientX: e.clientX, clientY: e.clientY };
      this.updateBuildPreview();
    }
    if (this.dragStart) {
      const x = Math.min(this.dragStart.x, e.clientX);
      const y = Math.min(this.dragStart.y, e.clientY);
      const w = Math.abs(e.clientX - this.dragStart.x);
      const h = Math.abs(e.clientY - this.dragStart.y);
      this.dragBox.style.cssText += `display:block; left:${x}px; top:${y}px; width:${w}px; height:${h}px;`;
    }
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
    const myId = this.getMyId();
    this.selectedBuilding = null;
    this.inspectedUnit = null;

    if (!dragged) {
      // seleção simples
      const n = this.ndc(e);
      const pick = this.scene.pickAt(n.x, n.y);
      if (pick.unitId !== undefined) {
        const u = snap.units.find((uu) => uu.id === pick.unitId);
        if (u && u.owner === myId) {
          this.selected = e.shiftKey ? (this.selected.includes(u.id) ? this.selected.filter(id => id !== u.id) : [...this.selected, u.id]) : [u.id];
        } else {
          this.selected = [];
          this.inspectedUnit = u?.id ?? null;
        }
      } else {
        this.selected = [];
        this.selectedBuilding = pick.buildingId ?? null;
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
    if (this.selected.length === 0) return;
    const snap = this.getSnap();
    if (!snap) return;
    const n = this.ndc(e);
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
        return;
      }
    }
    if (pick.buildingId !== undefined) {
      const b = snap.buildings.find((bb) => bb.id === pick.buildingId);
      if (b && b.owner >= 0 && (b.owner === VAMPIRE_PLAYER_ID) !== (this.getMyId() === VAMPIRE_PLAYER_ID)) {
        this.net.command({ type: 'attack', ids: this.selected, targetId: pick.buildingId });
        return;
      }
      if (b && !b.done && b.owner === this.getMyId()) {
        this.net.command({ type: 'resumeBuild', ids: this.selected, targetId: b.id });
        return;
      }
      if (b && b.done && b.kind === 'wall' && b.owner === this.getMyId() && b.hp < b.maxHp) {
        this.net.command({ type: 'repair', ids: this.selected, targetId: b.id });
        return;
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
    if (!snap?.units.some(u => u.owner === this.getMyId() && u.kind === 'worker' && this.selected.includes(u.id))) return;
    this.cancelBuild();
    this.buildMode = kind;
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
      return;
    }
    const x = Math.round(hit.x), z = Math.round(hit.z);
    this.buildTarget = { x, z };
    const me = snap.players.find(p => p.id === this.getMyId());
    const cost = BUILD_COSTS[this.buildMode];
    const hasBuilder = snap.units.some(u => u.owner === this.getMyId() && u.kind === 'worker' && this.selected.includes(u.id));
    this.buildValid = !!me && !snap.result && hasBuilder && me.wood >= cost.wood && me.gold >= cost.gold &&
      canPlaceBuilding(this.scene.map, snap, this.buildMode, x, z);
    const color = this.buildValid ? 0x6ad66a : 0xff4b4b;
    (this.ghost.material as THREE.MeshBasicMaterial).color.setHex(color);
    this.ghost.visible = true;
    this.ghost.position.set(x, this.scene.heightAt(x, z) + (this.buildMode === 'tower' ? 3 : 1.5), z);
    this.scene.setTowerRange('placement', this.buildMode === 'tower' ? this.buildTarget : null, color);
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
