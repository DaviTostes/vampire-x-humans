import { snapBuildingCoordinate } from '@vampire/shared';
// Controles RTS: câmera, seleção, ordens, ghost de construção

import { BUILDING_SIZE, BUILD_COSTS, BUILDABLE, VAMPIRE_PLAYER_ID, SPEC_ENTITY_LIMITS, HUMAN_ABILITIES, VAMPIRE_ABILITIES, canBuildKind, canPlaceBuilding, type BuildKind, type HumanAbilityId, type Snapshot, type VampireAbilityId } from '@vampire/shared';
import type { GameScene } from './scene.js';
import type { Net } from './net.js';
import { CameraController } from './camera-controller.js';

// Atalhos: construção em letras (Q/E/R/T/F) e habilidades em números (1..4),
// ambos tratados pela HUD, que clica nos botões dos painéis correspondentes.

export class RtsControls {
  selected: number[] = [];
  selectedBuilding: number | null = null;
  inspectedUnit: number | null = null;
  buildMode: BuildKind | null = null;
  abilityMode: HumanAbilityId | null = null;
  vampireAbilityMode: VampireAbilityId | null = null;
  private buildPointer: { clientX: number; clientY: number } | null = null;
  private pointer: { clientX: number; clientY: number } | null = null;
  private buildTarget: { x: number; z: number } | null = null;
  private buildValid = false;
  private dragStart: { x: number; y: number } | null = null;
  private dragBox: HTMLDivElement;
  private readonly cameraControl: CameraController;

  constructor(
    private scene: GameScene,
    private net: Net,
    private container: HTMLElement,
    private getMyId: () => number,
    private getSnap: () => Snapshot | null,
    private onSelectionChanged: () => void,
    private setActingId: (owner: number) => void = () => {},
  ) {
    this.cameraControl=new CameraController(scene);
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
      if(this.cameraControl.isBlocked()) return;
      if (key === 'escape') { this.cancelBuild(); this.cancelAbility(); this.cancelVampireAbility(); return; }
      if (e.repeat) return;
      // Espaço: foca e seleciona o personagem principal.
      if (e.code === 'Space') { e.preventDefault(); this.focusHero(); return; }
    });
    window.addEventListener('blur', () => {
      this.dragStart = null;
      this.dragBox.style.display = 'none';
    });
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

  focusOn(x:number,z:number) { this.cameraControl.focusOn(x,z); }

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
    if (this.buildMode) {
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
        } else if (this.selected.length === 0) {
          // Sem seleção ativa, clicar no inimigo inspeciona. Com seleção, o clique
          // não pode derrubar o comando no meio da briga (o Vampiro atacando
          // costumava ocupar a frente e roubar a seleção).
          this.inspectedUnit = u?.id ?? null;
        }
      } else {
        const picked = pick.buildingId !== undefined ? snap.buildings.find((bb) => bb.id === pick.buildingId) : undefined;
        const enemyBuilding = !!picked && picked.owner >= 0 && picked.owner !== myId;
        // Prédio inimigo também não derruba a seleção atual: mantém o comando
        // ativo enquanto mostra a informação da construção.
        if (!enemyBuilding || this.selected.length === 0) this.selected = [];
        this.selectedBuilding = pick.buildingId ?? null;
        // Teste solo: selecionar um prédio de qualquer lado assume o controle dele.
        if (practice && picked) {
          this.setActingId(picked.kind === 'crypt' ? VAMPIRE_PLAYER_ID : picked.owner >= 0 ? picked.owner : myId);
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
    const pick = this.scene.pickAt(n.x, n.y, false);

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
      if (b) {
        this.net.command({type:'move',ids:this.selected,x:b.x,z:b.z});
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
    // Mostra a prévia imediatamente, na posição atual do cursor (ou no centro).
    const rect = this.scene.renderer.domElement.getBoundingClientRect();
    this.buildPointer = this.pointer ?? { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 };
    this.updateBuildPreview();
    this.onSelectionChanged();
  }

  private updateBuildPreview() {
    if (!this.buildMode) return;
    const snap = this.getSnap();
    const pointer = this.buildPointer && this.ndc(this.buildPointer);
    const hit = pointer && this.scene.screenToGround(pointer.x, pointer.y);
    this.buildValid = false;
    this.buildTarget = null;
    if (!hit || !snap) {
      this.scene.setTowerRange('placement', null);
      this.scene.setBuildFootprint(null, null, false);
      return;
    }
    // Encaixa a construção para ocupar quadrados inteiros: tamanho par cai em
    // coordenada inteira; tamanho ímpar cai em meia-coordenada (borda inteira).
    const x = snapBuildingCoordinate(hit.x,this.buildMode), z = snapBuildingCoordinate(hit.z,this.buildMode);
    this.buildTarget = { x, z };
    const me = snap.players.find(p => p.id === this.getMyId());
    const cost = BUILD_COSTS[this.buildMode];
    const hasBuilder = snap.units.some(u => u.owner === this.getMyId() && this.selected.includes(u.id) && canBuildKind(u, this.buildMode!));
    const limit = (SPEC_ENTITY_LIMITS as Record<string, number | undefined>)[this.buildMode];
    const atLimit = limit !== undefined && snap.buildings.filter(b => b.owner === this.getMyId() && b.kind === this.buildMode).length >= limit;
    this.buildValid = !!me && !snap.result && hasBuilder && !atLimit && me.wood >= cost.wood && me.gold >= cost.gold &&
      canPlaceBuilding(this.scene.map, snap, this.buildMode, x, z);
    const color = this.buildValid ? 0x6ad66a : 0xff4b4b;
    this.scene.setTowerRange('placement', this.buildMode === 'tower' ? this.buildTarget : null, color);
    this.scene.setBuildFootprint(this.buildTarget, this.buildMode, this.buildValid);
  }

  cancelBuild() {
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
    this.cameraControl.update(dt);
    this.updateBuildPreview();
  }
}
