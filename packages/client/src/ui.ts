// HUD estilo RTS: barra de recursos, relógio, minimap, painel de comandos

import {
  BUILDABLE,
  WORLD,
  TOWER,
  VAMPIRE,
  VAMPIRE_PLAYER_ID,
  workerStats,
  DAY_LENGTH,
  NIGHT_LENGTH,
  MARKET,
  BUILD_COSTS,
  BANK_UPGRADE_COST,
  WALL_UPGRADE_COST,
  WALL_MAX_LEVEL,
  wallMaxHp,
  BANK,
  RECRUIT,
  BUILD_MAX_LEVEL,
  bankProduction,
  bankCycleSeconds,
  BRIDGES,
  distanceToTrails,
  type BuildingKind,
  type BuildKind,
  type Snapshot,
} from '@vampire/shared';
import type { GameScene } from './scene.js';
import type { RtsControls } from './rts.js';
import type { Net } from './net.js';
import { portrait, peonPortrait } from './portraits.js';
import { activityLabel, resourceLabel } from './activity.js';
import { AdminPanel } from './admin.js';
import hudTheme from './hud-theme.css?inline';
import { commandArt, factionCrest } from './hud-icons.js';
import { VAMPIRE_ITEMS, VAMPIRE_SKILLS, vampireEffectiveCooldown, vampireEffectiveSpeed, vampireItemBonuses, vampireItemCost, vampireShopAccess, vampireSkillMultiplier, type VampireItemId, type VampireSkillId } from '@vampire/shared';

const BUILDING_NAMES: Record<BuildingKind, string> = {
  keep: 'Sede da vila', bank: 'Banco', taverna: 'Taverna', wall: 'Muro', tower: 'Torre',
  crypt: 'Cripta do Vampiro',
  forge: 'Forja de Sangue', relic: 'Relicário Ancestral', mist: 'Portal da Névoa', shrine: 'Santuário do Frenesi',
};
const BUILDING_HELP: Record<BuildingKind, string> = {
  keep: 'Base principal da vila.',
  bank: `Gera ${BANK.goldPerCycle} de ouro por ciclo desde o nível 1. As melhorias reduzem o intervalo.`,
  taverna: 'Recruta Peões auxiliares para coletar e construir.',
  wall: 'Humanos atravessam; o vampiro precisa destruí-lo. Selecione para comprar e vender recursos.', tower: 'Ataca o vampiro automaticamente quando ele entra no alcance.',
  crypt: 'Base do Vampiro. Desbloqueie skills e consulte o inventário.',
  forge: 'Loja das Garras Sangrentas: aumente o dano contra unidades e construções.',
  relic: 'Loja do Coração Ancestral: aumente a vida máxima do Vampiro.',
  mist: 'Loja das Botas da Névoa: aumente a velocidade de movimento.',
  shrine: 'Loja do Frenesi: acelere os ataques do Vampiro.',
};
// Itens vendidos em cada estrutura da base (a cripta vende skills).
const SHOP_ITEMS = (Object.keys(VAMPIRE_ITEMS) as VampireItemId[]);
function itemsForShop(kind: BuildingKind): VampireItemId[] {
  return SHOP_ITEMS.filter(id => VAMPIRE_ITEMS[id].shop === kind);
}

const CSS = `
.vxh-hud { position: fixed; inset: 0; pointer-events: none; z-index: 20;
  font-family: 'Palatino Linotype','Book Antiqua',Palatino,Georgia,'Times New Roman',serif; color: #e8e0d0; }
.vxh-topbar { position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  display: flex; gap: 24px; align-items: center; padding: 8px 24px;
  background: linear-gradient(180deg, rgba(10,10,18,.92), rgba(10,10,18,.75));
  border-bottom: 2px solid #3a2a2a; border-radius: 0 0 12px 12px; font-size: 17px; }
.vxh-topbar .res { display: flex; align-items: center; gap: 6px; }
.vxh-clock { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.vxh-clock.night { color: #9aa8e8; }
.vxh-clock.day { color: #e8c86a; }
.vxh-minimap { position: absolute; left: 16px; bottom: 16px; width: 210px; height: 210px;
  background: #05050a; border: 3px solid #3a2a2a; border-radius: 8px; pointer-events: auto; cursor: crosshair; }
.vxh-panel { position: absolute; left: 240px; right: 16px; bottom: 0;
  display: flex; align-items: flex-end; gap: 12px; padding: 12px 20px 14px;
  background: linear-gradient(0deg, rgba(10,10,18,.94), rgba(10,10,18,.7));
  border-top: 2px solid #3a2a2a; border-radius: 14px 14px 0 0; pointer-events: auto;
  justify-content: center; flex-wrap: wrap; }
.vxh-selinfo { position: absolute; left: 240px; bottom: 140px; font-size: 14px;
  background: rgba(10,10,18,.85); padding: 8px 12px; border-radius: 8px; max-width: 480px; }
.vxh-selinfo:empty { display: none; }
.vxh-btn:disabled { cursor: default; color: #aab4c0; border-color: #3c4653; }
.vxh-btn:disabled .vxh-command-icon { opacity: .55; }
.vxh-btn { background: #1c1420; color: #e8d8b8; border: 2px solid #4a3a2a; border-radius: 8px;
  padding: 8px 10px; font-size: 13px; cursor: pointer; min-width: 76px; }
.vxh-btn:hover { background: #2c2030; border-color: #8a6a4a; }
.vxh-btn.active { border-color: #db3a3a; color: #ff9a9a; }
.vxh-btn small { display: block; opacity: .65; font-size: 11px; margin-top: 2px; }
.vxh-result { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 14px;
  align-items: center; justify-content: center; background: rgba(5,5,10,.85);
  font-size: 34px; font-weight: 700; text-align: center; pointer-events: auto; }
.vxh-result small { font-size: 18px; font-weight: 400; opacity: .8; }
.vxh-portrait { position: absolute; top: 12px; left: 16px; display: flex; flex-direction: column; gap: 4px;
  padding: 10px; background: rgba(10,10,18,.85); border: 2px solid #3a2a2a; border-radius: 10px; width: 170px; }
.vxh-portrait .name { font-weight: 700; font-size: 14px; }
.vxh-bar { height: 8px; border-radius: 4px; background: #221; overflow: hidden; }
.vxh-bar > div { height: 100%; border-radius: 4px; }

/* Faixa clássica de RTS com talha medieval: ferro escuro, rebites dourados e luz de vela. */
.vxh-hud { --iron:#1a1d22; --iron-lit:#3a3f47; --rim:#565d66; --blood:#8e2a35; --gold:#c9a86a; --gold-hi:#e9d3a0; --parch:#d9caa4; }
.vxh-topbar { left: auto; right: 12px; transform: none; top: 10px; gap: 0; padding: 0;
  border: 1px solid #08090c; border-radius: 4px;
  background: linear-gradient(180deg,#262a31,#0c0e13 85%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 3px #10131a, inset 0 1px 0 rgba(233,211,160,.08), 0 6px 18px #000a; }
.vxh-topbar .res { padding: 9px 22px; border-right: 1px solid #0c0f13;
  box-shadow: 1px 0 0 rgba(233,211,160,.06); min-width: 105px; }
.vxh-clock { position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  align-items: center; gap: 8px; padding: 9px 22px; font-weight: 600; font-size: 17px;
  border: 1px solid #08090c; border-radius: 4px;
  background: linear-gradient(180deg,#262a31,#0c0e13 85%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 3px #10131a, inset 0 1px 0 rgba(233,211,160,.08), 0 6px 18px #000a; }
.vxh-topbar b { font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: .5px; text-shadow: 0 1px 2px #000; }
.vxh-topbar .res-icon { color: var(--gold-hi); font-size: 21px; filter: drop-shadow(0 0 4px rgba(201,168,106,.35)); }
.vxh-hero { position: absolute; top: 10px; left: 14px; width: 68px; padding: 3px; cursor: pointer;
  border: 1px solid #08090c; border-radius: 4px; background: linear-gradient(160deg,#23262d,#0b0d12 70%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 3px #10131a, 0 4px 12px #000b; pointer-events: auto; }
.vxh-hero svg { display: block; width: 100%; height: 65px; }
.vxh-hero .vxh-bar { height: 5px; border-radius: 0; }
.vxh-bottom { position: absolute; left: 10px; right: 10px; bottom: 8px; height: 230px;
  display: grid; grid-template-columns: 214px 148px minmax(180px,1fr) 360px; grid-template-rows: minmax(0,1fr); gap: 12px; align-items: stretch; }
.vxh-frame { position: relative; min-height: 0; border: 1px solid #08090c; border-radius: 4px;
  background:
    repeating-linear-gradient(115deg, rgba(255,255,255,.015) 0 2px, transparent 2px 6px),
    linear-gradient(160deg,#23262d,#0b0d12 70%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 4px #10131a, inset 0 2px 10px rgba(233,211,160,.06), inset 0 0 26px #000, 0 8px 20px #000c; }
.vxh-frame::before, .vxh-frame::after { content: ''; position: absolute; width: 12px; height: 12px;
  transform: rotate(45deg); border: 2px solid #08090c; z-index: 2; pointer-events: none;
  background: radial-gradient(circle at 35% 35%, var(--gold-hi), #8a6d3a 60%, #4a3a1e);
  box-shadow: 0 0 6px #000b; }
.vxh-frame::before { left: -8px; top: -8px; } .vxh-frame::after { right: -8px; bottom: -8px; }
.vxh-mapframe { margin-top: -14px; padding: 4px; }
.vxh-mapframe::after { width: auto; height: auto; transform: none; right: 0; left: 0; bottom: 0;
  content: 'VALE DA VIGÍLIA'; font: 10px Georgia,serif; letter-spacing: 3px; text-align: center; padding: 3px;
  background: #0a0c10ee; color: var(--gold); border-top: 1px solid #10131a; text-shadow: 0 1px 1px #000; }
.vxh-minimap { position: static; display: block; width: 100%; height: 100%; border: 1px solid #10131a; border-radius: 0; }
.vxh-portrait { position: relative; top: auto; left: auto; width: auto; padding: 5px; gap: 3px;
  display: flex; background: linear-gradient(180deg,#1c1f25,#0b0d12); }
.vxh-portrait-art { flex: 1; min-height: 0; overflow: hidden; border: 1px solid #2f353d; background: #090c14;
  box-shadow: inset 0 0 14px #000; }
.vxh-portrait-art svg { width: 100%; height: 100%; object-fit: cover; }
.vxh-portrait .name { font-size: 12px; text-align: center; color: var(--gold-hi);
  font-variant: small-caps; letter-spacing: 1px; text-shadow: 0 1px 1px #000; }
.vxh-statbar { position: relative; height: 16px; background: #0a0c10; border: 1px solid #3a3f47;
  box-shadow: inset 0 0 0 1px #10131a, inset 0 2px 4px #000; }
.vxh-statbar > i { position: absolute; inset: 0; right: auto; background: linear-gradient(#5b9b46,#244b27);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
.vxh-statbar.bloodbar > i { background: linear-gradient(#3d6694,#192d49); }
.vxh-statbar span { position: relative; display: block; text-align: center; line-height: 14px; font-size: 11px; text-shadow: 1px 1px #000; }
.vxh-sheet { padding: 14px 16px; overflow: hidden; }
.vxh-sheet-heading { font-size: 11px; color: var(--gold); letter-spacing: 3px; font-variant: small-caps;
  padding-bottom: 9px; border-bottom: 1px solid #3a342a; box-shadow: 0 1px 0 rgba(233,211,160,.05);
  margin-bottom: 10px; text-shadow: 0 1px 1px #000; }
.vxh-selinfo { position: static; padding: 0; background: none; max-width: none; font-size: 13px; line-height: 1.7; }
.vxh-selinfo b { font-size: 18px; color: var(--gold-hi); font-variant: small-caps; letter-spacing: .5px; text-shadow: 0 1px 2px #000; }
.vxh-panel { position: relative; left: auto; right: auto; bottom: auto; padding: 8px;
  display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); grid-template-rows: repeat(2,minmax(min-content,1fr)); gap: 6px;
  border-radius: 4px; align-items: stretch; overflow-y: auto; }
.vxh-panel > span { grid-column: 1/-1; font-size: 12px; line-height: 1.6; color: #a89a78; font-style: italic;
  align-self: center; text-align: center; letter-spacing: .4px; text-shadow: 0 1px 1px #000; }
.vxh-btn { position: relative; min-width: 0; padding: 5px 3px; font-size: 14px; border-radius: 3px;
  border: 1px solid #08090c;
  background: radial-gradient(ellipse at 50% 18%, #2b2f37, #0b0d12 85%);
  color: var(--parch);
  box-shadow: inset 0 0 0 2px #454b54, inset 0 0 0 3px #14171c, inset 0 2px 6px rgba(233,211,160,.05), inset 0 -8px 14px rgba(0,0,0,.45); }
.vxh-btn:hover:not(:disabled) {
  box-shadow: inset 0 0 0 2px #8a7344, inset 0 0 0 3px #14171c, inset 0 0 16px rgba(201,168,106,.18), inset 0 -8px 14px rgba(0,0,0,.45);
  color: var(--gold-hi); }
.vxh-btn small { font-size: 15px; line-height: 1.25; opacity: 1; font-weight: 650; color: #f0d9a8; font-variant-numeric: tabular-nums; }
.vxh-btn:disabled small { color: #9aa2ab; }
.vxh-btn .vxh-resource-cost { color: #f0d9a8; }
.vxh-btn .vxh-resource-cost.vxh-resource-missing { color: #ff9292; }
.vxh-btn .vxh-cost { white-space: nowrap; }
.vxh-item-button small { font-size:12px; }
.vxh-item-button .vxh-item-price { font-size:15px; }
.vxh-item-button .vxh-command-icon { font-size:20px; }
.vxh-item-equipped { color:#a8d8b1; }
.vxh-inventory { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
.vxh-inventory > span { border:1px solid #08090c; border-radius:3px; padding:5px 8px; color:#d5c397; font-size:12px;
  background: radial-gradient(ellipse at 50% 20%,#262a31,#0d1015 85%);
  box-shadow: inset 0 0 0 2px #33383f, inset 0 0 8px #000; }
.vxh-command-icon { display: block; font-size: 23px; line-height: 1.1; margin-bottom: 2px; }
.vxh-activity { color: #e4c579; margin-top: 6px; }
.vxh-progress { height: 8px; background: #080b10; border: 1px solid #3a3f47; margin: 6px 0;
  box-shadow: inset 0 1px 3px #000; }
.vxh-progress > div { height: 100%; background: linear-gradient(90deg,#8a693b,#e9c47b); }
.vxh-btn.active { border-color: #08090c; color: #ffb9b9;
  box-shadow: inset 0 0 0 2px #7c2a33, inset 0 0 0 3px #14171c, inset 0 0 18px #8e2a35, inset 0 -8px 14px rgba(0,0,0,.45); }
.vxh-quit { pointer-events: auto; padding: 9px 16px; border: 1px solid #08090c; border-radius: 3px;
  background: radial-gradient(ellipse at 50% 20%,#5a2530,#1c0b10 85%);
  box-shadow: inset 0 0 0 2px #6e3a41, inset 0 0 0 3px #140b0d, inset 0 0 12px rgba(142,42,53,.35);
  color: #ffd9dc; font: 650 13px 'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif; cursor: pointer; }
.vxh-quit:hover { color: #ffe9ec;
  box-shadow: inset 0 0 0 2px #a2525b, inset 0 0 0 3px #140b0d, inset 0 0 16px rgba(224,138,146,.3); }
@media(max-width: 1000px) {
  .vxh-bottom { height: 218px; grid-template-columns: 172px 120px minmax(120px,1fr) 324px; gap: 8px; }
  .vxh-topbar .res { padding: 7px 12px; min-width: 75px; }
  .vxh-clock { padding: 7px 12px; font-size: 14px; }
  .vxh-sheet { padding: 9px; } .vxh-selinfo { font-size: 11px; }
}
@media(max-width: 720px) {
  .vxh-bottom { height: 218px; grid-template-columns: 132px 94px 1fr; }
  .vxh-sheet { display: none; } .vxh-topbar { font-size: 12px; }
  .vxh-topbar .res { padding: 6px 8px; min-width: 50px; }
  .vxh-clock { padding: 6px 10px; font-size: 12px; }
}
`;

export class Hud {
  private el: HTMLDivElement;
  private gold!: HTMLSpanElement;
  private wood!: HTMLSpanElement;
  private blood!: HTMLSpanElement;
  private clock!: HTMLDivElement;
  private selInfo!: HTMLDivElement;
  private cmdPanel!: HTMLDivElement;
  private minimap!: HTMLCanvasElement;
  private resultEl: HTMLDivElement | null = null;
  private shownResult: string | null = null;
  private admin: AdminPanel;
  private portraitKind: 'human' | 'vampire' | 'peon' | null = null;

  constructor(
    private scene: GameScene,
    private controls: RtsControls,
    private net: Net,
    private getMyId: () => number,
  ) {
    const style = document.createElement('style');
    style.textContent = CSS + hudTheme;
    document.head.appendChild(style);

    this.el = document.createElement('div');
    this.el.className = 'vxh-hud';
    this.el.dataset.faction = this.getMyId() === VAMPIRE_PLAYER_ID ? 'vampire' : 'human';
    this.el.innerHTML = `
      <button class="vxh-hero" title="Selecionar e centralizar seu personagem">${portrait(this.getMyId() === VAMPIRE_PLAYER_ID)}<div class="vxh-bar"><div style="width:100%;background:#539541"></div></div><span class="vxh-hero-crest" aria-hidden="true">${factionCrest(this.getMyId() === VAMPIRE_PLAYER_ID)}</span></button>
      <div class="vxh-topbar">
        <span class="res" data-wood>🪵 <b class="wood">0</b></span>
        <span class="res" data-gold>🪙 <b class="gold">0</b></span>
        <span class="res" data-blood style="display:none">🩸 <b class="blood">0</b></span>
        <button class="vxh-quit" title="Sair da partida e voltar ao início">✕ Sair</button>
      </div>
      <div class="vxh-clock"><span class="icon">☀️</span><span class="time">--</span></div>
      <div class="vxh-bottom">
      <div class="vxh-frame vxh-mapframe"><div class="vxh-compass" aria-hidden="true"><span>N</span></div><canvas class="vxh-minimap" width="210" height="210"></canvas><span class="vxh-map-caption">VALE DA VIGÍLIA</span></div>
      <div class="vxh-portrait vxh-frame">
        <div class="vxh-crest" aria-hidden="true"><span>${factionCrest(this.getMyId() === VAMPIRE_PLAYER_ID)}</span></div>
        <div class="vxh-portrait-art">${portrait(this.getMyId() === VAMPIRE_PLAYER_ID)}</div>
        <span class="name">—</span>
        <div class="vxh-statbar healthbar"><i style="width:100%"></i><span>—</span></div>
        <div class="vxh-statbar bloodbar"><i style="width:100%"></i><span>—</span></div>
      </div>
      <div class="vxh-frame vxh-sheet"><div class="vxh-sheet-heading">ATRIBUTOS</div><div class="vxh-selinfo"></div></div>
      <div class="vxh-frame vxh-commands"><div class="vxh-commands-heading">VAMPIRE × HUMANS</div><div class="vxh-panel"></div></div>
      </div>
    `;
    document.body.appendChild(this.el);
    this.admin = new AdminPanel(this.el, net);

    this.gold = this.el.querySelector('.gold')!;
    this.wood = this.el.querySelector('.wood')!;
    this.blood = this.el.querySelector('.blood')!;
    this.clock = this.el.querySelector('.vxh-clock')!;
    this.selInfo = this.el.querySelector('.vxh-selinfo')!;
    this.cmdPanel = this.el.querySelector('.vxh-panel')!;
    this.minimap = this.el.querySelector('.vxh-minimap')!;
    this.el.querySelector('.vxh-hero')!.addEventListener('click', () => {
      const unit = this.net.latestSnap?.units.find(u => u.owner === this.getMyId());
      if (!unit) return;
      this.controls.selected = [unit.id];
      this.controls.selectedBuilding = null;
      this.controls.inspectedUnit = null;
      this.controls.focusOn(unit.x, unit.z);
      this.scene.setSelection([unit.id]);
      this.scene.setBuildingSelection(null);
      if (this.net.latestSnap) this.update(this.net.latestSnap, this.getMyId());
    });
    this.el.querySelector('.vxh-quit')!.addEventListener('click', () => {
      if (confirm('Sair da partida? Suas unidades ficarão abandonadas na sala.')) location.reload();
    });

    // Delegação mantém o clique válido enquanto chegam snapshots.
    this.cmdPanel.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
      if (!b || b.disabled) return;
      if (b.dataset.build) this.controls.enterBuild(b.dataset.build as BuildKind);
      if (b.dataset.market) this.net.command({ type: 'market', targetId: Number(b.dataset.marketTarget), trade: b.dataset.market as 'woodToGold' | 'goldToWood', amount: b.dataset.market === 'woodToGold' ? MARKET.wood : MARKET.gold });
      if (b.dataset.upgrade) this.net.command({ type: 'upgrade', ids: [], targetId: Number(b.dataset.upgrade) });
      if (b.dataset.recruit) this.net.command({ type: 'recruit', targetId: Number(b.dataset.recruit) });
      if (b.dataset.vampireItem) this.net.command({ type: 'buyVampireItem', shopId: Number(b.dataset.shop), itemId: b.dataset.vampireItem as VampireItemId });
      if (b.dataset.vampireSkillBuy) this.net.command({ type: 'buyVampireSkill', cryptId: Number(b.dataset.crypt), skillId: b.dataset.vampireSkillBuy as VampireSkillId });
      if (b.dataset.vampireSkillCast) this.net.command({ type: 'castVampireSkill', skillId: b.dataset.vampireSkillCast as VampireSkillId });
      if (b.dataset.vampireItemUp) this.net.command({ type: 'upgradeVampireItem', itemId: b.dataset.vampireItemUp as VampireItemId });
      if (b.dataset.resume) {
        const snap = this.net.latestSnap;
        const site = snap?.buildings.find(site => site.id === Number(b.dataset.resume));
        const worker = site && snap?.units.filter(u => u.owner === this.getMyId() && u.kind === 'worker')
          .sort((a, b) => Math.hypot(a.x - site.x, a.z - site.z) - Math.hypot(b.x - site.x, b.z - site.z))[0];
        if (worker && site) this.net.command({ type: 'resumeBuild', ids: [worker.id], targetId: site.id });
      }
      if (b.dataset.repair) {
        const snap = this.net.latestSnap;
        const wall = snap?.buildings.find(w => w.id === Number(b.dataset.repair));
        const workers = wall && snap?.units.filter(u => u.owner === this.getMyId() && u.kind === 'worker')
          .sort((a, c) => Math.hypot(a.x - wall.x, a.z - wall.z) - Math.hypot(c.x - wall.x, c.z - wall.z)).slice(0, 3).map(u => u.id);
        if (workers?.length && wall) this.net.command({ type: 'repair', ids: workers, targetId: wall.id });
      }
    });

    this.minimap.addEventListener('pointerdown', (e) => {
      const r = this.minimap.getBoundingClientRect();
      const wx = ((e.clientX - r.left) / r.width - 0.5) * WORLD.half * 2;
      const wz = ((e.clientY - r.top) / r.height - 0.5) * WORLD.half * 2;
      this.controls.focusOn(wx, wz);
    });
  }

  update(snap: Snapshot, myId: number) {
    this.admin.update(snap);
    const me = snap.players.find((p) => p.id === myId);
    if (me) {
      this.gold.textContent = String(me.gold);
      this.wood.textContent = String(me.wood);
    }
    const isVamp = myId === VAMPIRE_PLAYER_ID;
    this.el.querySelector<HTMLElement>('[data-blood]')!.style.display = isVamp ? 'flex' : 'none';
    for (const res of this.el.querySelectorAll<HTMLElement>('.vxh-topbar .res[data-wood], .vxh-topbar .res[data-gold]'))
      res.style.display = isVamp ? 'none' : 'flex';
    this.blood.textContent = String(snap.blood);

    // relógio
    const total = snap.phase === 'day' ? DAY_LENGTH : NIGHT_LENGTH;
    const rem = Math.max(0, Math.ceil(snap.phaseTime));
    const icon = snap.phase === 'day' ? '☀️' : '🌙';
    const label = `${snap.practice ? 'Teste solo · ' : ''}${snap.phase === 'day' ? 'Dia' : 'Noite'} ${snap.day}`;
    this.clock.className = `vxh-clock ${snap.phase}`;
    this.clock.innerHTML = `<span class="icon">${icon}</span><span class="time">${label} · ${Math.floor(rem / 60)}:${String(rem % 60).padStart(2, '0')}</span>`;

    // seleção
    const sel = (this.controls.inspectedUnit != null ? [this.controls.inspectedUnit] : this.controls.selected)
      .map((id) => snap.units.find((u) => u.id === id))
      .filter(Boolean);
    const building = snap.buildings.find(b => b.id === this.controls.selectedBuilding);
    if (building) {
      this.selInfo.innerHTML = `<b>${BUILDING_NAMES[building.kind]} · nível ${building.level}</b>
        <div>${building.hp}/${building.maxHp} HP${building.done ? '' : ` · Obra: ${Math.floor(building.progress * 100)}%`}</div>
        ${building.kind === 'bank' && building.done ? `<div>Produção: ${bankProduction()} ouro / ${bankCycleSeconds(building.level)}s</div>` : ''}
        ${building.kind === 'wall' && building.done ? `<div>Vida máxima: ${building.maxHp}${building.level < WALL_MAX_LEVEL ? ` · Nível ${building.level + 1}: ${wallMaxHp(building.level + 1)} HP` : ' · Nível máximo'}</div>` : ''}
        ${building.kind === 'wall' && building.done && building.hp < building.maxHp ? `<div class="vxh-activity">Danificado — clique com o botão direito com um Humano/Peão para reparar</div>` : ''}`;
      if (building.recruitment) {
        const progress = 1 - building.recruitment.remaining / building.recruitment.total;
        this.selInfo.innerHTML += `<div class="vxh-activity">${building.recruitment.remaining > 0 ? `Recrutando Peão · ${Math.ceil(building.recruitment.remaining)}s` : 'Aguardando uma saída livre'}</div>
          <div class="vxh-progress"><div style="width:${progress * 100}%"></div></div>`;
      }
      if (building.kind === 'tower') {
        const vampire = snap.units.find(u => u.kind === 'vampire' && Math.hypot(u.x - building.x, u.z - building.z) <= TOWER.range);
        this.selInfo.innerHTML += `<div>Alcance: ${TOWER.range} · Dano: ${TOWER.damage} / ${TOWER.cooldown}s</div>
          <div class="vxh-activity">${!building.done ? 'Aguardando conclusão da obra' : vampire ? `Alvo: Vampiro — ${vampire.hp}/${vampire.maxHp} HP` : 'Sem alvo no alcance'}</div>`;
      }
      if (building.kind === 'crypt' || itemsForShop(building.kind).length > 0) {
        const vampire = snap.units.find(u => u.kind === 'vampire');
        if (isVamp) {
          const base = snap.buildings.find(b => b.kind === 'crypt');
          const shopAccess = vampireShopAccess(snap.phase, vampire, building, base);
          if (shopAccess) this.selInfo.innerHTML += `<div class="vxh-activity">${shopAccess}</div>`;
          this.selInfo.innerHTML += `<div>Sangue disponível: ${snap.blood}</div>${this.inventoryMarkup(snap)}`;
        }
      }
    } else if (sel.length === 0) {
      this.selInfo.innerHTML = '';
    } else {
      this.selInfo.innerHTML = sel
        .map(
          (u) =>
            `<b>${u!.kind === 'vampire' ? 'Vampiro' : u!.hero === false ? 'Peão' : 'Humano'}</b><div>${u!.hp}/${u!.maxHp} HP</div>
            <div class="vxh-activity">${activityLabel(u!, snap)}</div>
            ${u!.orderType === 'gather' ? `<div>${resourceLabel(u!.carryRes ?? snap.nodes.find(n => n.id === u!.targetId)?.kind).icon} Coleta: ${u!.carrying} / ${workerStats(u!).carry}</div>` : ''}`,
        )
        .join('');
      const unit = sel[0];
      if (unit?.kind === 'vampire') {
        const bonus = vampireItemBonuses(snap.vampireItems);
        const damage = (VAMPIRE.attackDamage + bonus.damage) * vampireSkillMultiplier(snap.vampireSkills) * (snap.phase === 'night' ? 1 : VAMPIRE.dayDamageMultiplier);
        const speed = vampireEffectiveSpeed(snap.phase, snap.vampireItems);
        const cooldown = vampireEffectiveCooldown(snap.vampireItems);
        const buff = (snap.vampireSkills?.powerStrike?.buff ?? 0) > 0 ? ` · 💥 Golpe ativo (${Math.ceil(snap.vampireSkills!.powerStrike!.buff)}s)` : '';
        this.selInfo.innerHTML += `<div>Sangue: ${snap.blood} · Dano: ${Math.round(damage * 10) / 10}${buff}</div>
          <div>Bônus: +${bonus.damage} dano · +${bonus.health} vida · +${Math.round(bonus.moveSpeed * 10) / 10} veloc. · ataque a cada ${Math.round(cooldown * 100) / 100}s</div>${this.inventoryMarkup(snap)}`;
      }
      const site = snap.buildings.find(b => b.id === unit?.targetId && !b.done);
      if (site && unit?.orderType === 'build') {
        const seconds = Math.ceil((1 - site.progress) * BUILD_COSTS[site.kind as BuildKind].time / workerStats(unit).buildRate);
        this.selInfo.innerHTML += `<div>${BUILDING_NAMES[site.kind]} · ${Math.floor(site.progress * 100)}% · ${seconds}s de trabalho</div>
          <div class="vxh-progress"><div style="width:${site.progress * 100}%"></div></div>`;
      }
      const repairTarget = snap.buildings.find(b => b.id === unit?.targetId && b.done);
      if (repairTarget && unit?.orderType === 'repair') {
        this.selInfo.innerHTML += `<div>${BUILDING_NAMES[repairTarget.kind]} · ${repairTarget.hp}/${repairTarget.maxHp} HP · Reparando…</div>
          <div class="vxh-progress"><div style="width:${repairTarget.hp / repairTarget.maxHp * 100}%"></div></div>`;
      }
    }
    const focus = building ?? sel[0];
    const selectedVampire = sel[0]?.kind === 'vampire';
    const portraitKind = sel[0] ? (selectedVampire ? 'vampire' : sel[0].hero === false ? 'peon' : 'human') : isVamp ? 'vampire' : 'human';
    if (this.portraitKind !== portraitKind) {
      this.portraitKind = portraitKind;
      this.el.querySelector('.vxh-portrait-art')!.innerHTML = portraitKind === 'peon' ? peonPortrait() : portrait(portraitKind === 'vampire');
    }
    this.el.querySelector<HTMLElement>('.vxh-portrait .name')!.textContent = building ? BUILDING_NAMES[building.kind] :
      sel[0] ? (sel[0].kind === 'vampire' ? 'Vampiro' : sel[0].hero === false ? 'Peão' : 'Humano') : 'Selecione uma unidade';
    this.el.querySelector<HTMLElement>('.healthbar > i')!.style.width = `${focus ? Math.max(0, focus.hp / focus.maxHp * 100) : 0}%`;
    this.el.querySelector<HTMLElement>('.healthbar > span')!.textContent = focus ? `${focus.hp} / ${focus.maxHp}` : 'Sem seleção';
    this.el.querySelector<HTMLElement>('.bloodbar > span')!.textContent = selectedVampire ? `${snap.blood} sangue` : building && !building.done ? `Obra: ${Math.floor(building.progress * 100)}%` : sel[0]?.orderType === 'gather' ? `${resourceLabel(sel[0].carryRes ?? snap.nodes.find(n => n.id === sel[0]!.targetId)?.kind).icon} ${sel[0].carrying} / ${workerStats(sel[0]).carry}` : 'Sem coleta';
    this.el.querySelector<HTMLElement>('.bloodbar > i')!.style.width = `${selectedVampire ? 100 : building && !building.done ? building.progress * 100 : (sel[0]?.carrying ?? 0) / workerStats(sel[0] ?? {}).carry * 100}%`;
    const hero = snap.units.find(u => u.owner === myId);
    this.el.querySelector<HTMLElement>('.vxh-hero .vxh-bar > div')!.style.width = `${hero ? Math.max(0, hero.hp / hero.maxHp * 100) : 0}%`;

    this.renderCmdPanel(snap, myId, sel.length > 0);
    this.renderMinimap(snap, myId);

    if (snap.result && !this.resultEl) {
      this.shownResult = snap.result.reason;
      this.showResult(snap.result.winner, snap.result.reason, myId);
    }
  }

  private renderCmdPanel(snap: Snapshot, myId: number, hasSel: boolean) {
    const isVamp = myId === VAMPIRE_PLAYER_ID;
    const me = snap.players.find((p) => p.id === myId);
    const building = snap.buildings.find(b => b.id === this.controls.selectedBuilding);
    const resourceCost = (kind: 'wood' | 'gold', amount: number) => {
      const missing = Math.max(0, amount - (me?.[kind] ?? 0));
      const { icon, name } = resourceLabel(kind);
      return `<span class="vxh-resource-cost ${missing > 0 ? 'vxh-resource-missing' : ''}" data-resource="${kind}" title="${missing > 0 ? `Faltam ${missing} de ${name}` : `${name}: suficiente`}">${amount}${icon}</span>`;
    };
    const costMarkup = (cost: { wood: number; gold: number }) =>
      [cost.wood > 0 ? resourceCost('wood', cost.wood) : '', cost.gold > 0 ? resourceCost('gold', cost.gold) : ''].filter(Boolean).join(' ');
    const shortageText = (cost: { wood: number; gold: number }) => (['wood', 'gold'] as const)
      .filter(kind => cost[kind] > (me?.[kind] ?? 0))
      .map(kind => `Faltam ${cost[kind] - (me?.[kind] ?? 0)} de ${resourceLabel(kind).name}`).join('; ');
    const marketButtons = () => (['woodToGold', 'goldToWood'] as const).map(trade => {
      const selling = trade === 'woodToGold';
      const spend = selling ? MARKET.wood : MARKET.gold;
      const receive = selling ? MARKET.gold : MARKET.wood;
      const afford = me && (selling ? me.wood : me.gold) >= spend;
      return `<button class="vxh-btn ${afford ? '' : 'vxh-unavailable'}" data-market="${trade}" data-market-target="${building?.id}" title="${afford ? 'Trocar recursos' : shortageText({ wood: selling ? spend : 0, gold: selling ? 0 : spend })}" ${afford ? '' : 'disabled'}>
        ${selling ? 'Vender 🪵' : 'Comprar 🪵'}<small>${resourceCost(selling ? 'wood' : 'gold', spend)} → <span class="vxh-resource-cost">${receive}${selling ? '🪙' : '🪵'}</span></small></button>`;
    }).join('');
    let html = '';
    if (this.controls.inspectedUnit != null) {
      html = '<span>Inspecionando outra unidade.<br>Selecione seu personagem para dar ordens.</span>';
    } else if (building) {
      if (building.owner === myId && !building.done) {
        const hasWorker = snap.units.some(u => u.owner === myId && u.kind === 'worker');
        html = `<button class="vxh-btn" data-resume="${building.id}" ${hasWorker ? '' : 'disabled'}>🔨 Retomar obra<small>Enviar seu Humano</small></button>`;
      } else if (building.owner === myId && building.kind === 'bank') {
        const cost = BANK_UPGRADE_COST[building.level];
        const max = building.level >= BUILD_MAX_LEVEL;
        const afford = cost && me && me.wood >= cost.wood && me.gold >= cost.gold;
        html = `<button class="vxh-btn ${!max && !afford ? 'vxh-unavailable' : ''}" title="${!max && !afford && cost ? shortageText(cost) : 'Melhoria do Banco'}" data-upgrade="${building.id}" ${!max && afford ? '' : 'disabled'}>
          ${max ? 'Nível máximo' : `Melhorar para nível ${building.level + 1}`}<small>${!max && cost ? costMarkup(cost) : ''}</small></button>`;
      } else if (building.owner === myId && building.kind === 'taverna') {
        const busy = !!building.recruitment;
        const afford = me && me.gold >= RECRUIT.gold && me.wood >= RECRUIT.wood;
        html = `<button class="vxh-btn ${!busy && !afford ? 'vxh-unavailable' : ''}" data-recruit="${building.id}" title="${!afford ? shortageText(RECRUIT) : 'Recrutar um Peão auxiliar'}" ${busy || !afford ? 'disabled' : ''}>
          ${busy ? 'Recrutando…' : 'Recrutar Peão'}<small>${costMarkup(RECRUIT)}</small><small>${RECRUIT.time}s</small></button>`;
      } else if (building.kind === 'crypt' && isVamp) {
        // A cripta é a base: apenas skills são compradas aqui.
        const vampire = snap.units.find(u => u.kind === 'vampire' && u.owner === myId);
        const access = vampireShopAccess(snap.phase, vampire, building, building);
        for (const id of Object.keys(VAMPIRE_SKILLS) as VampireSkillId[]) {
          const skill = VAMPIRE_SKILLS[id];
          const unlocked = !!snap.vampireSkills?.[id];
          const afford = snap.blood >= skill.unlockCost;
          const reason = access ?? (unlocked ? 'Skill desbloqueada — use pelo painel do vampiro' : !afford ? `Faltam ${skill.unlockCost - snap.blood} de sangue` : 'Desbloquear skill');
          html += `<button class="vxh-btn vxh-item-button" data-vampire-skill-buy="${id}" data-crypt="${building.id}" title="${reason}" ${access || unlocked || !afford ? 'disabled' : ''}>
            ${commandArt(id)}${skill.name}<small>${skill.description}</small>
            ${unlocked ? '<small class="vxh-item-equipped">✓ Desbloqueada</small>' : `<small class="vxh-item-price"><span class="vxh-resource-cost ${afford ? '' : 'vxh-resource-missing'}">${skill.unlockCost}🩸</span></small>`}</button>`;
        }
        if (!html) html = '<span>Nenhuma skill disponível.</span>';
        if (access) html += `<span>${access}</span>`;
      } else if (isVamp && itemsForShop(building.kind).length > 0) {
        // Cada item é comprado na sua própria loja, com visual e painel próprios.
        const vampire = snap.units.find(u => u.kind === 'vampire' && u.owner === myId);
        const base = snap.buildings.find(b => b.kind === 'crypt');
        const access = vampireShopAccess(snap.phase, vampire, building, base);
        for (const id of itemsForShop(building.kind)) {
          const item = VAMPIRE_ITEMS[id];
          const count = snap.vampireItems?.[id] ?? 0;
          const cost = vampireItemCost(id, count);
          const full = count >= item.maxCount;
          const afford = snap.blood >= cost;
          const reason = access ?? (full ? 'Limite de compras atingido' : !afford ? `Faltam ${cost - snap.blood} de sangue` : 'Comprar e equipar');
          const bonuses = [item.damageBonus ? `+${item.damageBonus} dano` : '', item.healthBonus ? `+${item.healthBonus} vida` : '',
            item.speedBonus ? `+${item.speedBonus} veloc.` : '',
            item.cooldownFactor < 1 ? `ataque ${Math.round((1 - item.cooldownFactor) * 100)}% mais rápido` : ''].filter(Boolean).join(' · ');
          const level = item.maxCount === Infinity ? `<small>Nv ${count} → ${count + 1}</small>` : '';
          html += `<button class="vxh-btn vxh-item-button" data-vampire-item="${id}" data-shop="${building.id}" title="${reason}" ${access || full || !afford ? 'disabled' : ''}>
            ${commandArt(id)}${item.name}<small>${bonuses}</small>${level}
            ${full ? '<small class="vxh-item-equipped">✓ Equipado</small>' : `<small class="vxh-item-price"><span class="vxh-resource-cost ${afford ? '' : 'vxh-resource-missing'}">${cost}🩸</span></small>`}</button>`;
        }
        if (access) html += `<span>${access}</span>`;
      } else if (building.owner === myId && building.kind === 'wall' && building.done) {
        const cost = WALL_UPGRADE_COST[building.level];
        const max = building.level >= WALL_MAX_LEVEL;
        const afford = cost && me && me.wood >= cost.wood && me.gold >= cost.gold;
        const upgradeBtn = `<button class="vxh-btn ${!max && !afford ? 'vxh-unavailable' : ''}" title="${!max && !afford && cost ? shortageText(cost) : `Aumenta a vida máxima para ${max ? building.maxHp : wallMaxHp(building.level + 1)} HP`}" data-upgrade="${building.id}" ${!max && afford ? '' : 'disabled'}>
          ${max ? 'Nível máximo' : `Melhorar para nível ${building.level + 1}`}<small>${!max && cost ? costMarkup(cost) : ''}</small>${!max ? `<small>${building.maxHp} → ${wallMaxHp(building.level + 1)} HP</small>` : ''}</button>`;
        const damaged = building.hp < building.maxHp;
        const hasWorker = snap.units.some(u => u.owner === myId && u.kind === 'worker');
        const repairBtn = damaged ? `<button class="vxh-btn" data-repair="${building.id}" ${hasWorker ? '' : 'disabled'}>🔨 Reparar muro<small>${building.hp}/${building.maxHp} HP</small></button>` : '';
        html = upgradeBtn + repairBtn + marketButtons();
      }
      else html = '';
    } else if (isVamp) {
      html = '';
      for (const id of Object.keys(VAMPIRE_SKILLS) as VampireSkillId[]) {
        const skill = VAMPIRE_SKILLS[id];
        const state = snap.vampireSkills?.[id];
        if (!state) {
          html += `<button class="vxh-btn" disabled title="Desbloqueie na cripta durante o dia">${commandArt(id)}${skill.name}<small>🔒 ${skill.unlockCost}🩸</small></button>`;
        } else if (state.buff > 0) {
          html += `<button class="vxh-btn active" disabled>${commandArt(id)}${skill.name}<small>ativo · ${Math.ceil(state.buff)}s</small></button>`;
        } else if (state.cd > 0) {
          html += `<button class="vxh-btn" disabled>${commandArt(id)}${skill.name}<small>recarga · ${Math.ceil(state.cd)}s</small></button>`;
        } else {
          html += `<button class="vxh-btn" data-vampire-skill-cast="${id}" title="${skill.description} — clique para ativar">${commandArt(id)}${skill.name}<small>${skill.description}</small></button>`;
        }
      }
      for (const id of SHOP_ITEMS) {
        const count = snap.vampireItems?.[id] ?? 0;
        if (!count) continue; // primeira compra é na loja do item
        const item = VAMPIRE_ITEMS[id];
        const cost = vampireItemCost(id, count);
        const afford = snap.blood >= cost;
        html += `<button class="vxh-btn vxh-item-button" data-vampire-item-up="${id}" title="Upar a qualquer hora por ${cost} de sangue" ${afford ? '' : 'disabled'}>
          ${commandArt(id)}${item.name}<small>Nv ${count} → ${count + 1}</small>
          <small class="vxh-item-price"><span class="vxh-resource-cost ${afford ? '' : 'vxh-resource-missing'}">${cost}🩸</span></small></button>`;
      }
    } else if (hasSel) {
      for (const kind of BUILDABLE) {
        const c = BUILD_COSTS[kind];
        const afford = me && me.wood >= c.wood && me.gold >= c.gold;
        html += `<button class="vxh-btn ${afford ? '' : 'vxh-unavailable'}" data-build="${kind}" title="${afford ? BUILDING_HELP[kind] : shortageText(c)}" ${afford ? '' : 'disabled'}>
          ${commandArt(kind)}${BUILDING_NAMES[kind]}
          <small class="vxh-cost">${costMarkup(c)}</small><small>${Number((c.time / workerStats(snap.units.find(u => this.controls.selected.includes(u.id)) ?? {}).buildRate).toFixed(1))}s</small></button>`;
      }
    }
    if (html !== this.panelHtml) {
      this.cmdPanel.innerHTML = html;
      this.panelHtml = html;
    }
  }

  private panelHtml = '';

  private inventoryMarkup(snap: Snapshot): string {
    const ids = (Object.keys(VAMPIRE_ITEMS) as VampireItemId[]).filter(id => (snap.vampireItems?.[id] ?? 0) > 0);
    if (!ids.length) return '<div class="vxh-inventory"><span>Sem itens equipados</span></div>';
    return `<div class="vxh-inventory">${ids.map(id => {
      const item = VAMPIRE_ITEMS[id], count = snap.vampireItems![id]!;
      return `<span title="+${item.damageBonus * count} dano · +${item.healthBonus * count} vida máxima">${item.icon} ${item.name}${count > 1 ? ` ×${count}` : ''}</span>`;
    }).join('')}</div>`;
  }

  private minimapTerrain: ImageData | null = null;
  private minimapCameraKey = '';
  private minimapCorners: Array<{ x: number; z: number } | null> = [];

  private renderMinimap(snap: Snapshot, myId: number) {
    const ctx = this.minimap.getContext('2d');
    if (!ctx) return;
    const S = 210;
    const map = this.scene.map;
    const n = map.tiles;
    const img = this.minimapTerrain ?? ctx.createImageData(S, S);
    if (!this.minimapTerrain) {
      for (let py = 0; py < S; py++) {
        for (let px = 0; px < S; px++) {
          const tx = Math.floor((px / S) * n);
          const tz = Math.floor((py / S) * n);
          const i = tz * n + tx;
          const h = map.height[i] ?? 0;
          let r: number, g: number, b: number;
          if (map.water[i]) {
            r = 30; g = 60; b = 110;
          } else if (distanceToTrails(tx * WORLD.tileSize - WORLD.half, tz * WORLD.tileSize - WORLD.half) < 3.5) {
            r = 165; g = 141; b = 99;
          } else if ((map.forest[i] ?? 0) > 0.5) {
            r = 24; g = 48; b = 43;
          } else if (h > 0.62) {
            r = 100; g = 100; b = 105;
          } else {
            r = 45 + h * 40; g = 80 + h * 30; b = 40;
          }
          const o = (py * S + px) * 4;
          img.data[o] = r;
          img.data[o + 1] = g;
          img.data[o + 2] = b;
          img.data[o + 3] = 255;
        }
      }
      this.minimapTerrain = img;
    }
    ctx.putImageData(img, 0, 0);
    const W = WORLD.half * 2;
    const toMap = (x: number, z: number): [number, number] => [
      ((x + W / 2) / W) * S,
      ((z + W / 2) / W) * S,
    ];
    // Pontes: vaus fixos sobre a água.
    ctx.fillStyle = '#7a5f3e';
    for (const b of BRIDGES) {
      const [x, z] = toMap(b.x - b.width / 2, b.z - b.depth / 2);
      ctx.fillRect(x, z, Math.max(1, b.width / W * S), Math.max(1, b.depth / W * S));
    }
    // Paredes permanentes e passagens dos recintos fazem parte do mapa tático.
    ctx.fillStyle = '#687166';
    for (const wall of map.obstacles) {
      const [x, z] = toMap(wall.x - wall.width / 2, wall.z - wall.depth / 2);
      ctx.fillRect(x, z, Math.max(1, wall.width / W * S), Math.max(1, wall.depth / W * S));
    }
    // nós
    for (const nd of snap.nodes) {
      const [mx, mz] = toMap(nd.x, nd.z);
      ctx.fillStyle = nd.kind === 'gold' ? '#e8c83a' : '#2d5a2d';
      const size = nd.kind === 'gold' ? 3 : 1;
      ctx.fillRect(mx - size / 2, mz - size / 2, size, size);
    }
    // prédios
    for (const b of snap.buildings) {
      const [mx, mz] = toMap(b.x, b.z);
      ctx.fillStyle = b.owner < 0 ? '#555' : b.owner === myId ? '#6ad6ff' : '#d6b06a';
      ctx.fillRect(mx - 2, mz - 2, 5, 5);
    }
    // unidades
    for (const u of snap.units) {
      const [mx, mz] = toMap(u.x, u.z);
      ctx.fillStyle = u.kind === 'vampire' ? '#ff2a2a' : u.owner === myId ? '#ffffff' : '#88aaff';
      ctx.beginPath();
      ctx.arc(mx, mz, u.kind === 'vampire' ? 3.5 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
    this.scene.camera.updateMatrixWorld(true);
    const cameraKey = [...this.scene.camera.matrixWorld.elements, ...this.scene.camera.projectionMatrix.elements].join(',');
    if (cameraKey !== this.minimapCameraKey) {
      this.minimapCameraKey = cameraKey;
      this.minimapCorners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => this.scene.screenToGround(x!, y!));
    }
    const corners = this.minimapCorners;
    if (corners.every(Boolean)) {
      ctx.strokeStyle = '#ddd7b4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      corners.forEach((p, i) => { const [x, z] = toMap(p!.x, p!.z); if (i === 0) ctx.moveTo(x, z); else ctx.lineTo(x, z); });
      ctx.closePath();
      ctx.stroke();
    }
  }

  private showResult(winner: 'human' | 'vampire', reason: string, myId: number) {
    const won = (winner === 'vampire') === (myId === VAMPIRE_PLAYER_ID);
    const div = document.createElement('div');
    div.className = 'vxh-result';
    div.innerHTML = `
      <div style="color: ${winner === 'vampire' ? '#ff5a5a' : '#6ad66a'}">
        ${won ? 'VITÓRIA' : 'DERROTA'}
      </div>
      <small>${reason}</small>
      <small style="margin-top:20px;opacity:.5">recarregue a página para jogar novamente</small>
    `;
    this.el.appendChild(div);
    this.resultEl = div;
  }
}
