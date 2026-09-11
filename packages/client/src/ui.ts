// HUD estilo RTS: barra de recursos, relógio, minimap, painel de comandos

import {
  BUILDABLE,
  GAME_CONFIG,
  WORLD,
  TOWER,
  VAMPIRE,
  VAMPIRE_PLAYER_ID,
  workerStats,
  MARKET,
  BUILD_COSTS,
  WALL_MAX_LEVEL,
  TOWER_MAX_LEVEL,
  MARKET_MAX_LEVEL,
  wallMaxHp,
  wallUpgradeCost,
  marketUpgradeCost,
  bankUpgradeCost,
  bankPrerequisite,
  towerUpgradeCost,
  towerDamage,
  meetsPrerequisite,
  canBuildKind,
  HUMAN_ABILITIES,
  SPEC_CRYPT,
  workerTrainCost,
  workerUpgradeCost,
  workerMaxLevel,
  repairerTrainingTime,
  SPEC_ENTITY_LIMITS,
  RECRUIT,
  BUILD_MAX_LEVEL,
  bankProduction,
  BANK_CYCLE_SECONDS,
  cryptProduction,
  CRYPT_CYCLE_SECONDS,
  type BuildingKind,
  type BuildKind,
  type HumanAbilityId,
  type MapPresetId,
  type SpecPrerequisite,
  type Snapshot,
  type VampireAbilityId,
  type WorkerRole,
} from '@vampire/shared';
import type { GameScene } from './scene.js';
import type { RtsControls } from './rts.js';
import { rememberRejoin, forgetRejoin, type Net } from './net.js';
import { portrait, buildingPortrait, buildingIcon, unitPortrait, type UnitPortraitKind } from './portraits.js';
import { activityLabel, resourceLabel } from './activity.js';
import { AdminPanel } from './admin.js';
import hudTheme from './hud-theme.css?inline';
import { commandArt, factionCrest } from './hud-icons.js';
import { resourceIcon } from './resource-icons.js';
import { createLocaleSwitcher, onLocaleChange, t, tServer } from './i18n.js';
import { createVolumeControl } from './music.js';
import { VAMPIRE_ITEM_IDS, VAMPIRE_ITEM_INFO, VAMPIRE_SKILLS, vampireAttackSpeed, vampireEffectiveCooldown, vampireEffectiveSpeed, vampireItemBonuses, vampireItemCost, vampireItemBonus, vampireItemMaxLevel, vampireItemNextLevel, vampireShopAccess, vampireSkillMultiplier, repairerRepairRate, type VampireItemId, type VampireSkillId } from '@vampire/shared';

const WORKER_ROLE_SOURCES: Record<WorkerRole, string> = {
  lumberjack: 'Lenhador', miner: 'Minerador', repairer: 'Reparador',
};
const WORKER_ROLES: WorkerRole[] = ['lumberjack', 'miner', 'repairer'];
const HUMAN_ABILITY_IDS: HumanAbilityId[] = ['entangle', 'fortify', 'teleport', 'silencer'];
const HUMAN_ABILITY_KEYS = ['Q', 'E', 'R', 'T'];
const VAMPIRE_ABILITY_KEYS: Record<string, string> = { revealArea: 'Q', batForm: 'E', teleportHome: 'R' };

function workerRoleName(role: WorkerRole): string {
  return t(WORKER_ROLE_SOURCES[role]);
}

function unitDisplayName(u: { kind: string; hero?: boolean; workerRole?: WorkerRole }): string {
  if (u.kind === 'vampire') return t('Vampiro');
  if (u.hero === false) return u.workerRole ? workerRoleName(u.workerRole) : t('Peão');
  return t('Humano');
}
const BUILDING_NAME_SOURCES: Record<BuildingKind, string> = {
  keep: 'Sede da vila', bank: 'Banco', taverna: 'Taverna', wall: 'Muro', tower: 'Torre',
  goldMine: 'Mina de Ouro', market: 'Mercado', crypt: 'Cripta do Vampiro',
};
const BUILDING_HELP_SOURCES: Record<BuildingKind, string> = {
  keep: 'Base principal da vila.',
  bank: 'Gera ouro a cada ciclo; o valor dobra a cada melhoria (1 → 2 → 4…).',
  taverna: 'Recruta Peões auxiliares para coletar e construir.',
  wall: 'Humanos atravessam; o vampiro precisa destruí-lo.', tower: 'Ataca o vampiro automaticamente quando ele entra no alcance.',
  market: 'Única construção onde se troca madeira por ouro e vice-versa.',
  goldMine: 'Fonte de ouro: o Minerador extrai ouro dela.',
  crypt: 'Base do Vampiro. Compre itens e desbloqueie skills a qualquer momento.',
};
function buildingName(kind: BuildingKind): string {
  return t(BUILDING_NAME_SOURCES[kind]);
}
function buildingHelp(kind: BuildingKind): string {
  return t(BUILDING_HELP_SOURCES[kind]);
}

/** Traduz o motivo do resultado (vem do servidor em português). */
function localizeResultReason(reason: string): string {
  const survived = /^Os humanos sobreviveram a (\d+) noites!$/.exec(reason);
  if (survived) return t('Os humanos sobreviveram a {n} noites!', { n: survived[1]! });
  return tServer(reason);
}
// Itens vendidos na cripta (dano/vida/Attack Speed).

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
.vxh-btn { position: relative; overflow: hidden; }
.vxh-cd { position: absolute; left: 0; right: 0; top: 0; background: rgba(5,5,10,.62); pointer-events: none; }
.vxh-btn small { display: block; opacity: .65; font-size: 11px; margin-top: 2px; }
.vxh-result { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 14px;
  align-items: center; justify-content: center; background: rgba(5,5,10,.85);
  font-size: 34px; font-weight: 700; text-align: center; pointer-events: auto; }
.vxh-result small { font-size: 18px; font-weight: 400; opacity: .8; }
.vxh-result-actions { display: flex; gap: 12px; margin-top: 12px; }
.vxh-modal { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse at 50% 40%, rgba(20,10,14,.72), rgba(3,3,6,.9));
  pointer-events: auto; z-index: 40; animation: vxh-fade .16s ease-out; }
.vxh-modal[hidden] { display: none; }
@keyframes vxh-fade { from { opacity: 0; } to { opacity: 1; } }
.vxh-modal-panel { position: relative; width: min(440px, calc(100vw - 40px)); padding: 26px 28px 22px;
  text-align: center; border: 1px solid #08090c; border-radius: 6px;
  background:
    repeating-linear-gradient(115deg, rgba(255,255,255,.015) 0 2px, transparent 2px 6px),
    linear-gradient(160deg,#23262d,#0b0d12 70%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 4px #10131a, inset 0 2px 10px rgba(233,211,160,.06),
    inset 0 0 26px #000, 0 18px 46px #000e; animation: vxh-pop .18s ease-out; }
@keyframes vxh-pop { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: none; } }
.vxh-modal-panel::before, .vxh-modal-panel::after { content: ''; position: absolute; width: 12px; height: 12px;
  transform: rotate(45deg); border: 2px solid #08090c; pointer-events: none;
  background: radial-gradient(circle at 35% 35%, var(--gold-hi), #8a6d3a 60%, #4a3a1e); }
.vxh-modal-panel::before { top: -7px; left: -7px; }
.vxh-modal-panel::after { bottom: -7px; right: -7px; }
.vxh-modal-crest { color: var(--gold-hi); font-size: 30px; line-height: 1;
  filter: drop-shadow(0 0 8px rgba(201,168,106,.35)); }
.vxh-modal-title { margin: 8px 0 6px; font-size: 24px; font-weight: 700; letter-spacing: .5px;
  color: #f0e2c2; text-shadow: 0 2px 6px #000; }
.vxh-modal-text { margin: 0 0 20px; font-size: 14px; line-height: 1.5; color: #c9bda1; opacity: .9; }
.vxh-modal-actions { display: flex; gap: 12px; justify-content: center; }
.vxh-menu-lang { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 4px 0 18px; }
.vxh-menu-lang > span { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #a89673; }
.vxh-menu-lang .vxh-lang-switch button { background: #1c1f25; }
.vxh-modal-btn { pointer-events: auto; min-width: 130px; padding: 10px 18px; border: 1px solid #08090c;
  border-radius: 4px; cursor: pointer; color: #e8d8b8;
  font: 650 14px 'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif;
  background: linear-gradient(180deg,#2a2e36,#12151b);
  box-shadow: inset 0 0 0 2px #3a3f47, inset 0 0 0 3px #10131a; }
.vxh-modal-btn:hover { color: #fff; box-shadow: inset 0 0 0 2px #5a626d, inset 0 0 0 3px #10131a; }
.vxh-modal-btn.danger { background: radial-gradient(ellipse at 50% 20%, #5a2530, #1c0b10 85%);
  box-shadow: inset 0 0 0 2px #6e3a41, inset 0 0 0 3px #140b0d, inset 0 0 12px rgba(142,42,53,.35); color: #ffd9dc; }
.vxh-modal-btn.danger:hover { color: #ffe9ec;
  box-shadow: inset 0 0 0 2px #a2525b, inset 0 0 0 3px #140b0d, inset 0 0 16px rgba(224,138,146,.3); }
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
.vxh-res-icon { display: inline-block; width: 1.15em; height: 1.15em; object-fit: contain; vertical-align: -0.2em; filter: drop-shadow(0 1px 2px #000); }
.vxh-topbar .vxh-res-icon { width: 22px; height: 22px; vertical-align: -5px; filter: drop-shadow(0 0 4px rgba(201,168,106,.35)); }
.vxh-topbar .res[data-blood] .vxh-res-icon { filter: drop-shadow(0 0 4px rgba(180,40,60,.45)); }
.vxh-res-emoji { font-size: 1.1em; line-height: 1; }
.vxh-hero { position: absolute; top: 10px; left: 14px; width: 68px; padding: 3px; cursor: pointer;
  border: 1px solid #08090c; border-radius: 4px; background: linear-gradient(160deg,#23262d,#0b0d12 70%);
  box-shadow: inset 0 0 0 2px var(--iron-lit), inset 0 0 0 3px #10131a, 0 4px 12px #000b; pointer-events: auto; }
.vxh-hero svg, .vxh-hero img { display: block; width: 100%; height: 65px; object-fit: cover; }
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
.vxh-map-caption { display: block; font: 10px Georgia,serif; letter-spacing: 3px; text-align: center; padding: 3px;
  background: #0a0c10ee; color: var(--gold); border-top: 1px solid #10131a; text-shadow: 0 1px 1px #000; }
.vxh-minimap { position: static; display: block; width: 100%; height: 100%; border: 1px solid #10131a; border-radius: 0; }
.vxh-portrait { position: relative; top: auto; left: auto; width: auto; padding: 5px; gap: 3px;
  display: flex; background: linear-gradient(180deg,#1c1f25,#0b0d12); }
.vxh-portrait-art { flex: 1; min-height: 0; overflow: hidden; border: 1px solid #2f353d; background: #090c14;
  box-shadow: inset 0 0 14px #000; }
.vxh-portrait-art svg, .vxh-portrait-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
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
.vxh-hotkey { position: absolute; top: 3px; right: 4px; font-size: 10px; line-height: 1; padding: 1px 4px;
  color: #0b0d12; font-weight: 700; border: 1px solid #08090c; border-radius: 3px;
  background: linear-gradient(#e9d3a0,#a8895a); box-shadow: 0 1px 2px #000a; pointer-events: none; }
.vxh-btn:disabled .vxh-hotkey { opacity: .5; }
.vxh-activity { color: #e4c579; margin-top: 6px; }
.vxh-portrait-activity { text-align: center; font-size: 12px; margin-top: 2px; min-height: 15px; line-height: 15px;
  color: #e4c579; text-shadow: 0 1px 1px #000; }
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
  private abilityPanel!: HTMLDivElement;
  private abilityBlock!: HTMLDivElement;
  private minimap!: HTMLCanvasElement;
  private resultEl: HTMLDivElement | null = null;
  private quitModal!: HTMLDivElement;
  private feedEl!: HTMLDivElement;
  private tipEl!: HTMLDivElement;
  private tipTitle!: HTMLDivElement;
  private tipBody!: HTMLDivElement;
  private shownResult: string | null = null;
  private admin: AdminPanel;
  private portraitKind: string | null = null;
  private heroFaction: boolean | null = null;
  // Rastreio de unidades humanas para avisar a todos quando uma tomba.
  private knownHumanUnits = new Map<number, { owner: number; kind: string; hero?: boolean; x: number; z: number }>();
  private deathMarks: Array<{ x: number; z: number; until: number }> = [];

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
      <button class="vxh-hero" title="${t('Selecionar e centralizar seu personagem (Espaço)')}">${portrait(this.getMyId() === VAMPIRE_PLAYER_ID)}<div class="vxh-bar"><div style="width:100%;background:#539541"></div></div><span class="vxh-hero-crest" aria-hidden="true">${factionCrest(this.getMyId() === VAMPIRE_PLAYER_ID)}</span></button>
      <div class="vxh-topbar">
        <span class="res" data-wood>${resourceIcon('wood')} <b class="wood">0</b></span>
        <span class="res" data-gold>${resourceIcon('gold')} <b class="gold">0</b></span>
        <span class="res" data-blood style="display:none">${resourceIcon('blood')} <b class="blood">0</b></span>
        <button class="vxh-quit vxh-menu-btn" title="${t('Menu')}">☰ ${t('Menu')}</button>
      </div>
      <div class="vxh-clock"><span class="icon">☀️</span><span class="time">--</span></div>
      <div class="vxh-bottom">
      <div class="vxh-frame vxh-mapframe"><div class="vxh-compass" aria-hidden="true"><span>N</span></div><canvas class="vxh-minimap" width="210" height="210"></canvas><span class="vxh-map-caption"></span></div>
      <div class="vxh-portrait vxh-frame">
        <div class="vxh-portrait-art">${portrait(this.getMyId() === VAMPIRE_PLAYER_ID)}</div>
        <span class="name">—</span>
        <div class="vxh-statbar healthbar"><i style="width:100%"></i><span>—</span></div>
        <div class="vxh-activity vxh-portrait-activity">—</div>
      </div>
      <div class="vxh-frame vxh-sheet">
        <div class="vxh-sheet-heading">${t('ATRIBUTOS')}</div>
        <div class="vxh-selinfo"></div>
        <div class="vxh-abilities-block">
          <div class="vxh-abilities-heading">${t('HABILIDADES')}</div>
          <div class="vxh-abilities-grid"></div>
        </div>
      </div>
      <div class="vxh-frame vxh-commands"><div class="vxh-commands-heading">VAMPIRE × HUMANS</div><div class="vxh-panel"></div></div>
      </div>
      <div class="vxh-feed" aria-live="polite"></div>
      <div class="vxh-tip" hidden><div class="vxh-tip-title"></div><div class="vxh-tip-body"></div></div>
    `;
    document.body.appendChild(this.el);
    this.admin = new AdminPanel(this.el, net);

    this.quitModal = document.createElement('div');
    this.quitModal.className = 'vxh-modal';
    this.quitModal.hidden = true;
    this.el.appendChild(this.quitModal);
    this.renderMenuModal();
    onLocaleChange(() => {
      if (this.mapCaptionId) {
        const caption = this.el.querySelector('.vxh-map-caption');
        if (caption) caption.textContent = t(GAME_CONFIG.mapPresets[this.mapCaptionId]?.name ?? '');
      }
      const menuBtn = this.el.querySelector<HTMLElement>('.vxh-menu-btn');
      if (menuBtn) menuBtn.textContent = `☰ ${t('Menu')}`;
      this.renderMenuModal();
      // Força os painéis a se re-renderizarem no próximo snapshot.
      this.panelHtml = '';
      this.abilityHtml = '';
    });

    this.gold = this.el.querySelector('.gold')!;
    this.wood = this.el.querySelector('.wood')!;
    this.blood = this.el.querySelector('.blood')!;
    this.clock = this.el.querySelector('.vxh-clock')!;
    this.selInfo = this.el.querySelector('.vxh-selinfo')!;
    this.cmdPanel = this.el.querySelector('.vxh-panel')!;
    this.abilityPanel = this.el.querySelector('.vxh-abilities-grid')!;
    this.abilityBlock = this.el.querySelector('.vxh-abilities-block')!;
    this.minimap = this.el.querySelector('.vxh-minimap')!;
    this.feedEl = this.el.querySelector('.vxh-feed')!;
    this.tipEl = this.el.querySelector('.vxh-tip')!;
    this.tipTitle = this.el.querySelector('.vxh-tip-title')!;
    this.tipBody = this.el.querySelector('.vxh-tip-body')!;
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
      this.quitModal.hidden = false;
    });
    this.quitModal.addEventListener('click', (e) => {
      const action = (e.target as HTMLElement).closest<HTMLElement>('[data-quit]');
      if (e.target === this.quitModal || action?.dataset.quit === 'cancel') {
        this.quitModal.hidden = true;
        return;
      }
      if (action?.dataset.quit === 'confirm') location.reload();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.quitModal.hidden) this.quitModal.hidden = true;
    });

    // Delegação mantém o clique válido enquanto chegam snapshots.
    const onPanelClick = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
      if (!b || b.disabled) return;
      if (b.dataset.build) this.controls.enterBuild(b.dataset.build as BuildKind);
      if (b.dataset.market) this.net.command({ type: 'market', targetId: Number(b.dataset.marketTarget), trade: b.dataset.market as 'woodToGold' | 'goldToWood', amount: b.dataset.market === 'woodToGold' ? MARKET.wood : MARKET.gold });
      if (b.dataset.upgrade) this.net.command({ type: 'upgrade', ids: [], targetId: Number(b.dataset.upgrade) });
      if (b.dataset.recruit) this.net.command({ type: 'recruit', targetId: Number(b.dataset.recruit) });
      if (b.dataset.recruitRole) this.net.command({ type: 'recruit', targetId: Number(b.dataset.recruitTarget), role: b.dataset.recruitRole as WorkerRole });
      if (b.dataset.upgradeWorker) this.net.command({ type: 'upgradeWorker', targetId: Number(b.dataset.recruitTarget), role: b.dataset.upgradeWorker as WorkerRole });
      if (b.dataset.humanAbility) this.controls.enterAbility(b.dataset.humanAbility as HumanAbilityId);
      if (b.dataset.vampireAbility) {
        const ability = b.dataset.vampireAbility as VampireAbilityId;
        if (ability === 'revealArea') this.controls.enterVampireAbility('revealArea');
        else this.net.command({ type: 'castVampireAbility', ability });
      }
      if (b.dataset.vampireItem) this.net.command({ type: 'buyVampireItem', cryptId: Number(b.dataset.crypt), itemId: b.dataset.vampireItem as VampireItemId });
      if (b.dataset.vampireSkillBuy) this.net.command({ type: 'buyVampireSkill', cryptId: Number(b.dataset.crypt), skillId: b.dataset.vampireSkillBuy as VampireSkillId });
      if (b.dataset.vampireSkillCast) this.net.command({ type: 'castVampireSkill', skillId: b.dataset.vampireSkillCast as VampireSkillId });
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
        const canRepair = (role?: WorkerRole) => role === undefined || role === 'repairer';
        const workers = wall && snap?.units.filter(u => u.owner === this.getMyId() && u.kind === 'worker' && canRepair(u.workerRole))
          .sort((a, c) => Math.hypot(a.x - wall.x, a.z - wall.z) - Math.hypot(c.x - wall.x, c.z - wall.z)).slice(0, 3).map(u => u.id);
        if (workers?.length && wall) this.net.command({ type: 'repair', ids: workers, targetId: wall.id });
      }
      if (b.dataset.demolish) this.net.command({ type: 'demolish', targetId: Number(b.dataset.demolish) });
    };
    this.cmdPanel.addEventListener('click', onPanelClick);
    this.abilityPanel.addEventListener('click', onPanelClick);

    // Tooltip das habilidades: quadrados só com ícone, a descrição aparece no hover.
    const showTip = (btn: HTMLElement) => {
      const title = btn.dataset.tipTitle ?? '';
      const body = btn.dataset.tipBody ?? '';
      if (!title && !body) { this.tipEl.hidden = true; return; }
      this.tipTitle.textContent = title;
      this.tipBody.textContent = body;
      this.tipBody.hidden = body === '';
      this.tipEl.hidden = false;
      const rect = btn.getBoundingClientRect();
      const tip = this.tipEl.getBoundingClientRect();
      const left = Math.max(8, Math.min(window.innerWidth - tip.width - 8, rect.left + rect.width / 2 - tip.width / 2));
      let top = rect.top - tip.height - 8;
      if (top < 8) top = rect.bottom + 8;
      this.tipEl.style.left = `${left}px`;
      this.tipEl.style.top = `${top}px`;
    };
    const hideTip = () => { this.tipEl.hidden = true; };
    this.abilityPanel.addEventListener('mouseover', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('button[data-tip-title]');
      if (btn) showTip(btn); else hideTip();
    });
    this.abilityPanel.addEventListener('mouseleave', hideTip);
    this.abilityPanel.addEventListener('click', hideTip);

    // Atalhos 1..9: acionam o botão correspondente do painel de comandos
    // (construções de unidade ou ações de construção selecionada).
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if ((e.target as HTMLElement).matches('input, textarea, select')) return;
      if (!/^[1-9]$/.test(e.key)) return;
      const btn = this.cmdPanel.querySelector<HTMLButtonElement>(`button[data-hotkey="${e.key}"]`);
      if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
    });

    this.minimap.addEventListener('pointerdown', (e) => {
      const r = this.minimap.getBoundingClientRect();
      const view = this.minimapView;
      const px = ((e.clientX - r.left) / r.width) * this.minimap.width;
      const py = ((e.clientY - r.top) / r.height) * this.minimap.height;
      this.controls.focusOn(view.minX + (px - view.offX) / view.scale, view.minZ + (py - view.offZ) / view.scale);
    });
  }

  update(snap: Snapshot, myId: number) {
    this.admin.update(snap);
    this.detectDeaths(snap);
    // No teste solo mostra a economia humana e o sangue ao mesmo tempo; o dono
    // ativo (myId) acompanha a facção selecionada.
    const practice = !!snap.practice;
    const isVamp = myId === VAMPIRE_PLAYER_ID;
    const me = snap.players.find((p) => p.id === myId);
    const resPlayer = practice ? (snap.players.find((p) => p.id !== VAMPIRE_PLAYER_ID) ?? snap.players[0]) : me;
    if (resPlayer) {
      this.gold.textContent = String(resPlayer.gold);
      this.wood.textContent = String(resPlayer.wood);
    }
    this.updateMapCaption(snap.mapId);
    this.el.dataset.phase = snap.phase;
    // Facção ativa (segue a seleção no teste solo) define o tema e o retrato.
    this.el.dataset.faction = isVamp ? 'vampire' : 'human';
    if (this.heroFaction !== isVamp) {
      this.heroFaction = isVamp;
      this.el.querySelector<HTMLElement>('.vxh-hero')!.innerHTML =
        `${portrait(isVamp)}<div class="vxh-bar"><div style="width:100%;background:#539541"></div></div><span class="vxh-hero-crest" aria-hidden="true">${factionCrest(isVamp)}</span>`;
    }
    // O Vampiro usa apenas SANGUE; madeira e ouro ficam ocultos. No teste solo
    // os três recursos ficam visíveis.
    this.el.querySelector<HTMLElement>('[data-blood]')!.style.display = isVamp || practice ? 'flex' : 'none';
    for (const res of this.el.querySelectorAll<HTMLElement>('.vxh-topbar .res[data-wood], .vxh-topbar .res[data-gold]'))
      res.style.display = isVamp && !practice ? 'none' : 'flex';
    this.blood.textContent = String(snap.blood);

    // relógio
    const total = snap.phase === 'day' ? snap.daySeconds : snap.nightSeconds;
    const rem = Math.max(0, Math.ceil(snap.phaseTime));
    const icon = snap.phase === 'day' ? '☀️' : '🌙';
    const label = `${snap.practice ? t('Teste solo · ') : ''}${snap.phase === 'day' ? t('Dia') : t('Noite')} ${snap.day}`;
    this.clock.className = `vxh-clock ${snap.phase}`;
    this.clock.innerHTML = `<span class="icon">${icon}</span><span class="time">${label} · ${Math.floor(rem / 60)}:${String(rem % 60).padStart(2, '0')}</span>`;

    // seleção
    const sel = (this.controls.inspectedUnit != null ? [this.controls.inspectedUnit] : this.controls.selected)
      .map((id) => snap.units.find((u) => u.id === id))
      .filter(Boolean);
    const building = snap.buildings.find(b => b.id === this.controls.selectedBuilding);
    if (building) {
      const level = building.level;
      this.selInfo.innerHTML = `<b>${buildingName(building.kind)} · ${t('nível {n}', { n: level })}</b>
        <div>${building.hp}/${building.maxHp} HP${building.done ? '' : ` · ${t('Obra: {pct}%', { pct: Math.floor(building.progress * 100) })}`}${(building.fortify ?? 0) > 0 ? ` · ${t('🛡 Fortificado ({s}s)', { s: Math.ceil(building.fortify!) })}` : ''}</div>
        ${building.kind === 'bank' && building.done ? `<div>${resourceIcon('gold')} ${t('Produção: {amount} ouro / {s}s', { amount: bankProduction(level), s: BANK_CYCLE_SECONDS })}</div>` : ''}
        ${building.kind === 'crypt' && building.done ? `<div>${resourceIcon('blood')} ${t('Produção: {amount} sangue / {s}s', { amount: cryptProduction(level), s: CRYPT_CYCLE_SECONDS })}</div>` : ''}
        ${building.kind === 'wall' && building.done ? `<div>${level < WALL_MAX_LEVEL
          ? t('Vida máxima: {hp} · Nível {next}: {nextHp} HP', { hp: building.maxHp, next: level + 1, nextHp: wallMaxHp(level + 1) })
          : `${t('Vida máxima: {hp}', { hp: building.maxHp })} ${t('· Nível máximo')}`}</div>` : ''}
        ${building.kind === 'wall' && building.done && building.hp < building.maxHp ? `<div class="vxh-activity">${t('Danificado — clique com o botão direito com um Humano/Peão para reparar')}</div>` : ''}`;
      if (building.recruitment) {
        const progress = 1 - building.recruitment.remaining / building.recruitment.total;
        const recruitingName = building.recruitment.role ? workerRoleName(building.recruitment.role) : t('Peão');
        this.selInfo.innerHTML += `<div class="vxh-activity">${building.recruitment.remaining > 0 ? t('Treinando {name} · {s}s', { name: recruitingName, s: Math.ceil(building.recruitment.remaining) }) : t('Aguardando uma saída livre')}</div>
          <div class="vxh-progress"><div style="width:${progress * 100}%"></div></div>`;
      }
      if (building.kind === 'tower') {
        const vampire = snap.units.find(u => u.kind === 'vampire' && Math.hypot(u.x - building.x, u.z - building.z) <= TOWER.range);
        this.selInfo.innerHTML += `<div>${t('Alcance: {range} · Dano: {dmg} / {cd}s', { range: TOWER.range, dmg: towerDamage(level), cd: TOWER.cooldown })}</div>
          <div class="vxh-activity">${!building.done ? t('Aguardando conclusão da obra') : vampire ? t('Alvo: Vampiro — {hp}/{max} HP', { hp: vampire.hp, max: vampire.maxHp }) : t('Sem alvo no alcance')}</div>`;
      }
      if (building.kind === 'crypt') {
        const vampire = snap.units.find(u => u.kind === 'vampire');
        if (isVamp) {
          const shopAccess = vampireShopAccess(snap.phase, vampire, building);
          if (shopAccess) this.selInfo.innerHTML += `<div class="vxh-activity">${tServer(shopAccess)}</div>`;
          this.selInfo.innerHTML += `<div>${resourceIcon('blood')} ${t('Sangue disponível: {blood}', { blood: snap.blood })}</div>${this.inventoryMarkup(snap)}`;
        }
      }
    } else if (sel.length === 0) {
      this.selInfo.innerHTML = '';
    } else {
      this.selInfo.innerHTML = sel
        .map(
          (u) =>
            `<b>${unitDisplayName(u!)}</b><div>${u!.hp}/${u!.maxHp} HP${(u!.fortify ?? 0) > 0 ? ` · ${t('🛡 Fortificado ({s}s)', { s: Math.ceil(u!.fortify!) })}` : ''}</div>`,
        )
        .join('');
      const unit = sel[0];
      if (unit?.kind === 'vampire') {
        const bonus = vampireItemBonuses(snap.vampireItems);
        const damage = (VAMPIRE.attackDamage + bonus.damage) * vampireSkillMultiplier(snap.vampireSkills) * (snap.phase === 'night' ? 1 : VAMPIRE.dayDamageMultiplier);
        const speed = vampireEffectiveSpeed(snap.phase, snap.vampireItems);
        const attackSpeed = vampireAttackSpeed(snap.vampireItems);
        const cooldown = vampireEffectiveCooldown(snap.vampireItems);
        const buff = (snap.vampireSkills?.powerStrike?.buff ?? 0) > 0 ? ` · ${t('💥 Golpe ativo ({s}s)', { s: Math.ceil(snap.vampireSkills!.powerStrike!.buff) })}` : '';
        this.selInfo.innerHTML += `<div>${resourceIcon('blood')} ${t('Sangue: {blood} · Dano: {dmg}', { blood: snap.blood, dmg: Math.round(damage * 10) / 10 })}${buff}</div>
          <div>${t('Bônus: +{dmg} dano · +{hp} vida · +{as} vel. ataque (AS {total})', { dmg: bonus.damage, hp: bonus.health, as: bonus.attackSpeed, total: Math.round(attackSpeed) })}</div>
          <div>${t('Velocidade: {spd} · ataque a cada {cd}s', { spd: Math.round(speed * 10) / 10, cd: Math.round(cooldown * 100) / 100 })}</div>${this.inventoryMarkup(snap)}`;
        const st = snap.vampireStatuses;
        const parts = [
          (st?.entangled ?? 0) > 0 ? t('Enredado ({s}s)', { s: Math.ceil(st!.entangled!) }) : '',
          (st?.silenced ?? 0) > 0 ? t('Silenciado ({s}s)', { s: Math.ceil(st!.silenced!) }) : '',
          (st?.batForm ?? 0) > 0 ? t('Forma de Morcego ({s}s)', { s: Math.ceil(st!.batForm!) }) : '',
          (st?.exitingBatForm ?? 0) > 0 ? t('Retornando da Forma de Morcego') : '',
          (st?.channelingTeleport ?? 0) > 0 ? t('Canalizando Teleport ({s}s)', { s: Math.ceil(st!.channelingTeleport!) }) : '',
        ].filter(Boolean);
        if (parts.length) this.selInfo.innerHTML += `<div class="vxh-activity">${parts.join(' · ')}</div>`;
      }
      const site = snap.buildings.find(b => b.id === unit?.targetId && !b.done);
      if (site && unit?.orderType === 'build') {
        const seconds = Math.ceil((1 - site.progress) * BUILD_COSTS[site.kind as BuildKind].time / workerStats(unit).buildRate);
        this.selInfo.innerHTML += `<div>${t('{name} · {pct}% · {s}s de trabalho', { name: buildingName(site.kind), pct: Math.floor(site.progress * 100), s: seconds })}</div>
          <div class="vxh-progress"><div style="width:${site.progress * 100}%"></div></div>`;
      }
      const repairTarget = snap.buildings.find(b => b.id === unit?.targetId && b.done);
      if (repairTarget && unit?.orderType === 'repair') {
        this.selInfo.innerHTML += `<div>${t('{name} · {hp}/{max} HP · Reparando…', { name: buildingName(repairTarget.kind), hp: repairTarget.hp, max: repairTarget.maxHp })}</div>
          <div class="vxh-progress"><div style="width:${repairTarget.hp / repairTarget.maxHp * 100}%"></div></div>`;
      }
      // Potencial de reparo do Humano/Reparador selecionado.
      if (unit?.kind === 'worker' && unit.workerRole !== 'lumberjack' && unit.workerRole !== 'miner') {
        const level = unit.workerRole === 'repairer' ? (me?.workerLevels?.repairer ?? 1) : 1;
        this.selInfo.innerHTML += `<div>${unit.workerRole === 'repairer' ? t('Reparo: {rate} HP/s (nível {n})', { rate: repairerRepairRate(level), n: level }) : t('Reparo: {rate} HP/s', { rate: repairerRepairRate(level) })}</div>`;
      }
    }
    const focus = building ?? sel[0];
    const selectedVampire = sel[0]?.kind === 'vampire';
    const factionKind: UnitPortraitKind = isVamp ? 'vampire' : 'human';
    const portraitKey = building ? `b:${building.kind}`
      : sel[0] ? `u:${selectedVampire ? 'vampire' : sel[0].hero === false ? 'peon' : 'human'}`
        : `u:${factionKind}`;
    if (this.portraitKind !== portraitKey) {
      this.portraitKind = portraitKey;
      this.el.querySelector('.vxh-portrait-art')!.innerHTML = building
        ? buildingPortrait(building.kind, factionKind)
        : unitPortrait(portraitKey.slice(2) as UnitPortraitKind);
    }
    this.el.querySelector<HTMLElement>('.vxh-portrait .name')!.textContent = building ? buildingName(building.kind) :
      sel[0] ? unitDisplayName(sel[0]) : t('Selecione uma unidade');
    this.el.querySelector<HTMLElement>('.healthbar > i')!.style.width = `${focus ? Math.max(0, focus.hp / focus.maxHp * 100) : 0}%`;
    this.el.querySelector<HTMLElement>('.healthbar > span')!.textContent = focus ? `${focus.hp} / ${focus.maxHp}` : t('Sem seleção');
    // Ação da unidade logo abaixo da vida, no painel do retrato.
    this.el.querySelector<HTMLElement>('.vxh-portrait-activity')!.textContent = sel[0] ? activityLabel(sel[0], snap) : '—';
    const hero = snap.units.find(u => u.owner === myId);
    this.el.querySelector<HTMLElement>('.vxh-hero .vxh-bar > div')!.style.width = `${hero ? Math.max(0, hero.hp / hero.maxHp * 100) : 0}%`;

    this.renderCmdPanel(snap, myId, sel.length > 0);
    this.renderAbilities(snap, myId);
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
      return `<span class="vxh-resource-cost ${missing > 0 ? 'vxh-resource-missing' : ''}" data-resource="${kind}" title="${missing > 0 ? t('Faltam {n} de {name}', { n: missing, name }) : t('{name}: suficiente', { name })}">${amount}${icon}</span>`;
    };
    const normalizeCost = (cost: { wood?: number; gold?: number } | null | undefined) => ({ wood: cost?.wood ?? 0, gold: cost?.gold ?? 0 });
    const prereqText = (prereq: SpecPrerequisite) => !prereq ? ''
      : prereq.wallLevel !== undefined ? t('Requer Muro nível {n}', { n: prereq.wallLevel })
        : prereq.marketLevel !== undefined ? t('Requer Mercado nível {n} (A CONFIRMAR)', { n: prereq.marketLevel }) : '';
    const costMarkup = (cost: { wood: number; gold: number }) =>
      [cost.wood > 0 ? resourceCost('wood', cost.wood) : '', cost.gold > 0 ? resourceCost('gold', cost.gold) : ''].filter(Boolean).join(' ');
    const shortageText = (cost: { wood: number; gold: number }) => (['wood', 'gold'] as const)
      .filter(kind => cost[kind] > (me?.[kind] ?? 0))
      .map(kind => t('Faltam {n} de {name}', { n: cost[kind] - (me?.[kind] ?? 0), name: resourceLabel(kind).name })).join('; ');
    const marketButtons = () => (['woodToGold', 'goldToWood'] as const).map(trade => {
      const selling = trade === 'woodToGold';
      const spend = selling ? MARKET.wood : MARKET.gold;
      const receive = selling ? MARKET.gold : MARKET.wood;
      const afford = me && (selling ? me.wood : me.gold) >= spend;
      return `<button class="vxh-btn ${afford ? '' : 'vxh-unavailable'}" data-market="${trade}" data-market-target="${building?.id}" title="${afford ? t('Trocar recursos') : shortageText({ wood: selling ? spend : 0, gold: selling ? 0 : spend })}" ${afford ? '' : 'disabled'}>
        ${selling ? t('Vender') : t('Comprar')} ${resourceIcon('wood')}<small>${resourceCost(selling ? 'wood' : 'gold', spend)} → <span class="vxh-resource-cost">${receive}${selling ? resourceIcon('gold') : resourceIcon('wood')}</span></small></button>`;
    }).join('');
    let html = '';
    if (this.controls.inspectedUnit != null) {
      html = `<span>${t('Inspecionando outra unidade.<br>Selecione seu personagem para dar ordens.')}</span>`;
    } else if (building) {
      if (building.owner === myId && !building.done) {
        const hasWorker = snap.units.some(u => u.owner === myId && u.kind === 'worker');
        html = `<button class="vxh-btn" data-resume="${building.id}" ${hasWorker ? '' : 'disabled'}>${t('🔨 Retomar obra')}<small>${t('Enviar seu Humano')}</small></button>`;
      } else if (building.owner === myId && building.kind === 'bank') {
        const max = building.level >= BUILD_MAX_LEVEL;
        const nextLevel = building.level + 1;
        const cost = normalizeCost(bankUpgradeCost(building.level));
        const prereq = bankPrerequisite(building.level);
        const prereqOk = meetsPrerequisite(snap, myId, prereq);
        const afford = !!me && me.wood >= cost.wood && me.gold >= cost.gold;
        const reason = max ? t('Nível máximo') : !prereqOk ? prereqText(prereq) : !afford ? shortageText(cost)
          : t('Produção {a} → {b} ouro/ciclo', { a: bankProduction(building.level), b: bankProduction(nextLevel) });
        html = `<button class="vxh-btn ${!max && (!prereqOk || !afford) ? 'vxh-unavailable' : ''}" title="${reason}" data-upgrade="${building.id}" ${!max && prereqOk && afford ? '' : 'disabled'}>
          ${max ? t('Nível máximo') : t('Melhorar para nível {n}', { n: nextLevel })}<small>${!max ? costMarkup(cost) : ''}</small>${!max ? `<small>${t('Produção {a} → {b} ouro/ciclo', { a: bankProduction(building.level), b: bankProduction(nextLevel) })}</small>` : ''}</button>`;
        if (!max && !prereqOk) html += `<span>${prereqText(prereq)}</span>`;
      } else if (building.owner === myId && building.kind === 'taverna') {
        const busy = !!building.recruitment;
        const levels = me?.workerLevels ?? {};
        for (const role of WORKER_ROLES) {
          const cost = normalizeCost(workerTrainCost(role));
          const count = snap.units.filter(u => u.owner === myId && u.kind === 'worker' && u.workerRole === role).length;
          const limit = SPEC_ENTITY_LIMITS[role];
          const full = count >= limit;
          const afford = !!me && me.wood >= cost.wood && me.gold >= cost.gold;
          const level = levels[role] ?? 1;
          const trainTime = role === 'repairer' ? repairerTrainingTime(level) : RECRUIT.time;
          const reason = full ? t('Limite de {name} atingido ({n})', { name: workerRoleName(role), n: limit })
            : !afford ? shortageText(cost) : t('{name} — {count}/{limit}', { name: workerRoleName(role), count, limit });
          html += `<button class="vxh-btn ${!busy && !full && afford ? '' : 'vxh-unavailable'}" data-recruit-role="${role}" data-recruit-target="${building.id}" title="${reason}" ${busy || full || !afford ? 'disabled' : ''}>
            ${workerRoleName(role)}<small>${costMarkup(cost)}</small><small>${trainTime > 0 ? `${trainTime}s` : t('instantâneo')} · ${count}/${limit}</small></button>`;
        }
        for (const role of WORKER_ROLES) {
          if (role === 'miner') continue; // Minerador sem progressão definida (A CONFIRMAR)
          const level = levels[role] ?? 1;
          const max = level >= workerMaxLevel(role);
          const cost = normalizeCost(workerUpgradeCost(role, level));
          const afford = !!me && me.wood >= cost.wood && me.gold >= cost.gold;
          html += `<button class="vxh-btn ${!max && !afford ? 'vxh-unavailable' : ''}" data-upgrade-worker="${role}" data-recruit-target="${building.id}" title="${max ? t('Nível máximo') : !afford ? shortageText(cost) : t('Melhorar {name} para nível {n}', { name: workerRoleName(role), n: level + 1 })}" ${!max && afford ? '' : 'disabled'}>
            ${t('{name} Nv {lvl} → {next}', { name: workerRoleName(role), lvl: level, next: level + 1 })}${max ? t(' (máx)') : ''}<small>${!max ? costMarkup(cost) : ''}</small></button>`;
        }
      } else if (building.kind === 'crypt' && isVamp) {
        // A cripta é a base e vende itens e skills.
        const vampire = snap.units.find(u => u.kind === 'vampire' && u.owner === myId);
        const access = vampireShopAccess(snap.phase, vampire, building);
        for (const id of VAMPIRE_ITEM_IDS) {
          const info = VAMPIRE_ITEM_INFO[id];
          const level = snap.vampireItems?.[id] ?? 0;
          const next = vampireItemNextLevel(id, level);
          const cost = vampireItemCost(id, level);
          const max = next == null;
          const afford = cost != null && snap.blood >= cost;
          const reason = access ? tServer(access) : (max ? t('Nível indefinido (A CONFIRMAR) ou máximo') : !afford ? t('Faltam {n} de sangue', { n: (cost ?? 0) - snap.blood }) : t('Comprar com sangue'));
          const previewBonus = vampireItemBonus(id, next ?? Math.max(1, level));
          html += `<button class="vxh-btn vxh-item-button" data-vampire-item="${id}" data-crypt="${building.id}" title="${reason}" ${access || max || !afford ? 'disabled' : ''}>
            ${commandArt(id)}${t(info.name)}<small>${t(info.description)}: +${previewBonus}</small>
            ${max ? `<small class="vxh-item-equipped">${t('✓ Máximo')}</small>` : `<small>${t('Nv {a} → {b}', { a: level, b: next })}</small><small class="vxh-item-price"><span class="vxh-resource-cost ${afford ? '' : 'vxh-resource-missing'}">${cost}${resourceIcon('blood')}</span></small>`}</button>`;
        }
        // Habilidade "Golpe Sombrio" removida por enquanto.
        // Evolução da Cripta (paga com sangue).
        const cryptNext = building.level + 1;
        const cryptCost = SPEC_CRYPT.upgradeCosts[cryptNext];
        const cryptMax = cryptCost == null;
        const cryptAfford = cryptCost != null && snap.blood >= cryptCost;
        html += `<button class="vxh-btn ${!cryptMax && !cryptAfford ? 'vxh-unavailable' : ''}" title="${cryptMax ? t('Nível máximo') : !cryptAfford ? t('Faltam {n} de sangue', { n: cryptCost - snap.blood }) : t('Produção {a} → {b} sangue / {s}s', { a: cryptProduction(building.level), b: cryptProduction(cryptNext), s: CRYPT_CYCLE_SECONDS })}" data-upgrade="${building.id}" ${!cryptMax && cryptAfford ? '' : 'disabled'}>
          ${cryptMax ? t('Cripta no nível máximo') : t('Melhorar Cripta para nível {n}', { n: cryptNext })}<small>${!cryptMax ? `${cryptCost}${resourceIcon('blood')}` : ''}</small></button>`;
        if (access) html += `<span>${tServer(access)}</span>`;
      } else if (building.owner === myId && building.kind === 'wall' && building.done) {
        const cost = normalizeCost(wallUpgradeCost(building.level));
        const max = building.level >= WALL_MAX_LEVEL;
        const afford = !!me && me.wood >= cost.wood && me.gold >= cost.gold;
        const upgradeBtn = `<button class="vxh-btn ${!max && !afford ? 'vxh-unavailable' : ''}" title="${!max && !afford ? shortageText(cost) : t('Aumenta a vida máxima para {hp} HP', { hp: max ? building.maxHp : wallMaxHp(building.level + 1) })}" data-upgrade="${building.id}" ${!max && afford ? '' : 'disabled'}>
          ${max ? t('Nível máximo') : t('Melhorar para nível {n}', { n: building.level + 1 })}<small>${!max ? costMarkup(cost) : ''}</small>${!max ? `<small>${t('{a} → {b} HP', { a: building.maxHp, b: wallMaxHp(building.level + 1) })}</small>` : ''}</button>`;
        const damaged = building.hp < building.maxHp;
        const hasWorker = snap.units.some(u => u.owner === myId && u.kind === 'worker' && u.workerRole !== 'lumberjack' && u.workerRole !== 'miner');
        // A ordem de reparo pode ser dada com o muro cheio: a unidade fica de
        // prontidão e repara sozinha quando ele levar dano.
        const repairLabel = damaged ? `${t('🔨 Reparar muro')}<small>${building.hp}/${building.maxHp} HP</small>`
          : `${t('🔨 Vigiar muro')}<small>${t('de prontidão · repara ao levar dano')}</small>`;
        const repairBtn = `<button class="vxh-btn" data-repair="${building.id}" ${hasWorker ? '' : 'disabled'} title="${damaged ? t('Envia um Humano/Peão para reparar') : t('Deixa um Humano/Peão de prontidão para reparar automaticamente')}">${repairLabel}</button>`;
        html = upgradeBtn + repairBtn;
      } else if (building.owner === myId && building.kind === 'market' && building.done) {
        const upgradeCost = normalizeCost(marketUpgradeCost(building.level));
        const max = building.level >= MARKET_MAX_LEVEL;
        const afford = !!me && me.wood >= upgradeCost.wood && me.gold >= upgradeCost.gold;
        const upgradeBtn = max ? '' : `<button class="vxh-btn ${!afford ? 'vxh-unavailable' : ''}" title="${afford ? t('Aumenta o nível do Mercado') : shortageText(upgradeCost)}" data-upgrade="${building.id}" ${afford ? '' : 'disabled'}>
          ${t('Melhorar para nível {n}', { n: building.level + 1 })}<small>${costMarkup(upgradeCost)}</small></button>`;
        html = upgradeBtn + marketButtons();
      } else if (building.owner === myId && building.kind === 'tower' && building.done) {
        const cost = normalizeCost(towerUpgradeCost(building.level));
        const max = building.level >= TOWER_MAX_LEVEL;
        const afford = !!me && me.wood >= cost.wood && me.gold >= cost.gold;
        html = `<button class="vxh-btn ${!max && !afford ? 'vxh-unavailable' : ''}" title="${!max && !afford ? shortageText(cost) : t('Aumenta o dano para {dmg}', { dmg: max ? building.level : towerDamage(building.level + 1) })}" data-upgrade="${building.id}" ${!max && afford ? '' : 'disabled'}>
          ${max ? t('Nível máximo') : t('Melhorar para nível {n}', { n: building.level + 1 })}<small>${!max ? costMarkup(cost) : ''}</small>${!max ? `<small>${t('{a} → {b} dano', { a: towerDamage(building.level), b: towerDamage(building.level + 1) })}</small>` : ''}</button>`;
      }
      else html = '';
      // O Humano pode demolir as construções que ele mesmo criou (a Cripta é
      // neutra e não pertence a ninguém). O servidor revalida a posse.
      if (!isVamp && building.owner === myId) {
        html += `<button class="vxh-btn vxh-danger" data-demolish="${building.id}" title="${t('Destrói esta construção (sem reembolso)')}">${t('🧨 Demolir')}</button>`;
      }
    } else if (isVamp) {
      // Itens e skills só se compram/melhoram na Cripta (painel da construção).
      html = `<span>${t('Compre e melhore itens e skills na Cripta, de dia ou de noite.')}</span>`;
    } else if (hasSel) {
      const selectedUnits = snap.units.filter(u => this.controls.selected.includes(u.id));
      // Só o Humano e o Minerador constroem; a Mina de Ouro é exclusiva do Minerador.
      const kinds = BUILDABLE.filter(k => selectedUnits.some(u => canBuildKind(u, k)));
      if (!kinds.length) {
        html = `<span>${t('Esta unidade não constrói.<br>Use o Humano ou um Minerador.')}</span>`;
      }
      for (const [i, kind] of kinds.entries()) {
        const c = BUILD_COSTS[kind];
        const limit = (SPEC_ENTITY_LIMITS as Record<string, number | undefined>)[kind];
        const owned = limit !== undefined ? snap.buildings.filter(b => b.owner === myId && b.kind === kind).length : 0;
        const atLimit = limit !== undefined && owned >= limit;
        const afford = !!me && me.wood >= c.wood && me.gold >= c.gold && !atLimit;
        const active = this.controls.buildMode === kind;
        const reason = atLimit ? t('Limite de {name} atingido ({owned}/{limit})', { name: buildingName(kind), owned, limit: limit ?? 0 })
          : afford ? `${buildingHelp(kind)} — ${t('tecla {n}', { n: i + 1 })}` : shortageText(c);
        html += `<button class="vxh-btn ${afford ? '' : 'vxh-unavailable'} ${active ? 'active' : ''}" data-build="${kind}" title="${reason}" ${afford ? '' : 'disabled'}>
          ${buildingIcon(kind) ?? commandArt(kind)}${buildingName(kind)}${limit !== undefined ? `<small>${owned}/${limit}</small>` : ''}<span class="vxh-hotkey">${i + 1}</span>
          <small class="vxh-cost">${costMarkup(c)}</small><small>${Number((c.time / workerStats(selectedUnits.find(u => canBuildKind(u, kind)) ?? {}).buildRate).toFixed(1))}s</small></button>`;
      }
    }
    if (html !== this.panelHtml) {
      this.cmdPanel.innerHTML = html;
      this.panelHtml = html;
      this.assignCommandHotkeys();
    }
  }

  /** Numera os botões do painel de comandos (1..9) e exibe o atalho no canto. */
  private assignCommandHotkeys() {
    const buttons = this.cmdPanel.querySelectorAll<HTMLButtonElement>('button.vxh-btn');
    buttons.forEach((btn, index) => {
      const n = index + 1;
      let badge = btn.querySelector<HTMLSpanElement>('.vxh-hotkey');
      if (n > 9) {
        delete btn.dataset.hotkey;
        badge?.remove();
        return;
      }
      btn.dataset.hotkey = String(n);
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'vxh-hotkey';
        btn.appendChild(badge);
      }
      badge.textContent = String(n);
    });
  }

  private panelHtml = '';
  private abilityHtml = '';

  /** Painel próprio de habilidades, à direita das construções. */
  private renderAbilities(snap: Snapshot, myId: number) {
    const isVamp = myId === VAMPIRE_PLAYER_ID;
    const me = snap.players.find(p => p.id === myId);
    // Habilidades são por classe: só o herói humano e o vampiro as têm. O painel
    // só aparece quando a unidade dessa classe está selecionada (peão não tem).
    const casterSelected = this.controls.selected.some(id => {
      const unit = snap.units.find(u => u.id === id);
      if (!unit) return false;
      return isVamp ? unit.kind === 'vampire' : unit.kind === 'worker' && unit.hero === true;
    });
    if (!casterSelected) {
      this.controls.cancelAbility();
      this.controls.cancelVampireAbility();
      this.abilityBlock.hidden = true;
      if (this.abilityHtml !== '') {
        this.abilityPanel.innerHTML = '';
        this.abilityHtml = '';
      }
      return;
    }
    let html = '';
    if (isVamp) {
      const st = snap.vampireStatuses ?? {};
      const reveal = snap.vampireReveal;
      const revealActive = !!reveal && reveal.remaining > 0;
      const revealUses = snap.vampireRevealUses ?? 0;
      const revealDisabled = revealActive || snap.phase !== 'night' || revealUses <= 0;
      const revealState = revealActive ? t('Ativa · {s}s', { s: Math.ceil(reveal!.remaining) })
        : snap.phase !== 'night' ? t('Disponível apenas à noite')
          : revealUses <= 0 ? t('Sem usos nesta noite (1 por noite)') : t('Revela uma área do mapa por 10s');
      html += `<button class="vxh-btn ${this.controls.vampireAbilityMode === 'revealArea' ? 'active' : ''}" data-vampire-ability="revealArea" data-tip-title="${t('Revelar Área')}" data-tip-body="${revealState}" ${revealDisabled ? 'disabled' : ''}>
        ${commandArt('revealArea')}<span class="vxh-hotkey">${VAMPIRE_ABILITY_KEYS.revealArea}</span></button>`;
      const bat = st.batForm ?? 0;
      const exiting = st.exitingBatForm ?? 0;
      const batState = bat > 0 ? t('Ativa · {s}s', { s: Math.ceil(bat) }) : exiting > 0 ? t('Saindo da forma') : t('Invulnerável e mais rápido por até 15s');
      html += `<button class="vxh-btn ${bat > 0 ? 'active' : ''}" data-vampire-ability="batForm" data-tip-title="${t('Forma de Morcego')}" data-tip-body="${batState}" ${bat > 0 || exiting > 0 ? 'disabled' : ''}>
        ${commandArt('batForm')}<span class="vxh-hotkey">${VAMPIRE_ABILITY_KEYS.batForm}</span></button>`;
      const chan = st.channelingTeleport ?? 0;
      const tpState = chan > 0 ? t('Canalizando · {s}s', { s: Math.ceil(chan * 10) / 10 }) : t('Canaliza 2,8s e retorna à base');
      html += `<button class="vxh-btn ${chan > 0 ? 'active' : ''}" data-vampire-ability="teleportHome" data-tip-title="${t('Teleportar para a Base')}" data-tip-body="${tpState}" ${chan > 0 ? 'disabled' : ''}>
        ${commandArt('teleportHome')}<span class="vxh-hotkey">${VAMPIRE_ABILITY_KEYS.teleportHome}</span></button>`;
      // Habilidade "Golpe Sombrio" removida por enquanto.
    } else {
      const vampireAlive = snap.units.some(u => u.kind === 'vampire');
      HUMAN_ABILITY_IDS.forEach((id, i) => {
        const ability = HUMAN_ABILITIES[id];
        const cd = me?.abilityCooldowns?.[id] ?? 0;
        const active = this.controls.abilityMode === id;
        const needsVampire = id === 'entangle' || id === 'silencer';
        const disabled = cd > 0 || (needsVampire && !vampireAlive);
        const state = cd > 0 ? t('Recarga · {s}s', { s: Math.ceil(cd) })
          : needsVampire && !vampireAlive ? t('Vampiro indisponível') : t(ability.description);
        const pct = cd > 0 ? Math.min(100, (cd / ability.cooldown) * 100) : 0;
        html += `<button class="vxh-btn ${active ? 'active' : ''}" data-human-ability="${id}" data-tip-title="${t(ability.name)}" data-tip-body="${state}" ${disabled ? 'disabled' : ''}>
          ${commandArt(id)}<span class="vxh-hotkey">${HUMAN_ABILITY_KEYS[i]}</span>${pct > 0 ? `<span class="vxh-cd" style="height:${pct.toFixed(0)}%"></span>` : ''}</button>`;
      });
    }
    if (html !== this.abilityHtml) {
      this.abilityPanel.innerHTML = html;
      this.abilityHtml = html;
      this.tipEl.hidden = true;
    }
    this.abilityBlock.hidden = html === '';
  }

  private inventoryMarkup(snap: Snapshot): string {
    const ids = VAMPIRE_ITEM_IDS.filter(id => (snap.vampireItems?.[id] ?? 0) > 0);
    if (!ids.length) return `<div class="vxh-inventory"><span>${t('Sem itens equipados')}</span></div>`;
    return `<div class="vxh-inventory">${ids.map(id => {
      const info = VAMPIRE_ITEM_INFO[id], level = snap.vampireItems![id]!;
      const bonus = vampireItemBonus(id, level);
      return `<span title="${t('Bônus total: +{n}', { n: bonus })}">${info.icon} ${t(info.name)} ${t('Nv {n}', { n: level })}${bonus ? ` (+${bonus})` : ''}</span>`;
    }).join('')}</div>`;
  }

  private minimapTerrain: ImageData | null = null;
  private mapCaptionId: MapPresetId | null = null;
  private minimapCameraKey = '';
  private minimapCorners: Array<{ x: number; z: number } | null> = [];
  private minimapViewCache: { minX: number; minZ: number; scale: number; offX: number; offZ: number } | null = null;

  /**
   * Recorte do minimapa: mostra só a região jogável (refúgios, cripta, recursos,
   * spawns e pontes), escondendo as florestas/margens inacessíveis dos cantos.
   */
  private get minimapView() {
    if (this.minimapViewCache) return this.minimapViewCache;
    const model = this.scene.model;
    const S = 210;
    let minX = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity;
    const include = (x: number, z: number, pad: number) => {
      if (!Number.isFinite(x) || !Number.isFinite(z)) return;
      minX = Math.min(minX, x - pad); maxX = Math.max(maxX, x + pad);
      minZ = Math.min(minZ, z - pad); maxZ = Math.max(maxZ, z + pad);
    };
    include(model.cryptPosition.x, model.cryptPosition.z, 40);
    for (const p of model.humanSpawns) include(p.x, p.z, 20);
    for (const c of model.compounds) include(c.x, c.z, Math.max(c.width, c.depth) / 2 + 8);
    for (const b of model.bridges) include(b.x, b.z, Math.max(b.width, b.depth) / 2 + 8);
    // Paredes e maciços delimitam a área jogável (ex.: o miolo do labirinto).
    // Recursos ficam de fora: no labirinto as árvores cobrem o mundo todo.
    for (const o of model.obstacles) {
      include(o.x - o.width / 2, o.z - o.depth / 2, 0);
      include(o.x + o.width / 2, o.z + o.depth / 2, 0);
    }
    if (!Number.isFinite(minX)) {
      const half = WORLD.half;
      this.minimapViewCache = { minX: -half, minZ: -half, scale: S / (half * 2), offX: 0, offZ: 0 };
      return this.minimapViewCache;
    }
    const margin = 8;
    minX -= margin; maxX += margin; minZ -= margin; maxZ += margin;
    const w = maxX - minX, h = maxZ - minZ;
    const scale = S / Math.max(w, h);
    this.minimapViewCache = { minX, minZ, scale, offX: (S - w * scale) / 2, offZ: (S - h * scale) / 2 };
    return this.minimapViewCache;
  }

  /**
   * Detecta quedas comparando as unidades vivas do snapshot com o tick anterior.
   * Como todos recebem o mesmo estado, o aviso aparece para todos os jogadores.
   */
  private detectDeaths(snap: Snapshot) {
    const current = new Map<number, { owner: number; kind: string; hero?: boolean; x: number; z: number }>();
    for (const u of snap.units) current.set(u.id, { owner: u.owner, kind: u.kind, hero: u.hero, x: u.x, z: u.z });
    for (const [id, prev] of this.knownHumanUnits) {
      if (current.has(id) || prev.owner < 0 || prev.owner >= VAMPIRE_PLAYER_ID) continue;
      this.reportDeath(prev);
    }
    this.knownHumanUnits.clear();
    for (const [id, v] of current) if (v.owner >= 0 && v.owner < VAMPIRE_PLAYER_ID) this.knownHumanUnits.set(id, v);
  }

  private reportDeath(prev: { owner: number; kind: string; hero?: boolean; x: number; z: number }) {
    const who = prev.hero === false ? t('Peão do Humano {n}', { n: prev.owner + 1 }) : t('Humano {n}', { n: prev.owner + 1 });
    this.pushFeed(t('☠ {who} tombou', { who }));
    this.deathMarks.push({ x: prev.x, z: prev.z, until: performance.now() + 6000 });
    // O pulso no mundo só aparece se a morte foi vista (o aviso na lista é global).
    if (this.scene.isVisibleToPlayer(prev.owner, prev.x, prev.z)) this.scene.deathPulse(prev.x, prev.z, who);
  }

  private pushFeed(text: string) {
    const toast = document.createElement('div');
    toast.className = 'vxh-toast';
    toast.textContent = text;
    this.feedEl.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  /** Mostra no HUD o nome do mapa realmente escolhido na sala. */
  private updateMapCaption(mapId: MapPresetId) {
    if (this.mapCaptionId === mapId) return;
    this.mapCaptionId = mapId;
    const caption = this.el.querySelector('.vxh-map-caption');
    if (caption) caption.textContent = t(GAME_CONFIG.mapPresets[mapId]?.name ?? '');
  }

  private renderMinimap(snap: Snapshot, myId: number) {
    const ctx = this.minimap.getContext('2d');
    if (!ctx) return;
    const S = 210;
    const map = this.scene.map;
    const n = map.tiles;
    const img = this.minimapTerrain ?? ctx.createImageData(S, S);
    const view = this.minimapView;
    if (!this.minimapTerrain) {
      for (let py = 0; py < S; py++) {
        for (let px = 0; px < S; px++) {
          const o = (py * S + px) * 4;
          const wx = view.minX + ((px + 0.5) - view.offX) / view.scale;
          const wz = view.minZ + ((py + 0.5) - view.offZ) / view.scale;
          const tx = Math.floor((wx + WORLD.half) / WORLD.tileSize);
          const tz = Math.floor((wz + WORLD.half) / WORLD.tileSize);
          // Fora do recorte jogável: deixa transparente (aparece o fundo do canvas).
          if (tx < 0 || tz < 0 || tx >= n || tz >= n) { img.data[o + 3] = 0; continue; }
          const i = tz * n + tx;
          const h = map.height[i] ?? 0;
          let r: number, g: number, b: number;
          if (map.water[i]) {
            r = 30; g = 60; b = 110;
          } else if (this.scene.model.distanceToTrails(wx, wz) < 3.5) {
            r = 165; g = 141; b = 99;
          } else if ((map.forest[i] ?? 0) > 0.5) {
            r = 24; g = 48; b = 43;
          } else if (h > 0.62) {
            r = 100; g = 100; b = 105;
          } else {
            r = 45 + h * 40; g = 80 + h * 30; b = 40;
          }
          img.data[o] = r;
          img.data[o + 1] = g;
          img.data[o + 2] = b;
          img.data[o + 3] = 255;
        }
      }
      this.minimapTerrain = img;
    }
    ctx.putImageData(img, 0, 0);
    const toMap = (x: number, z: number): [number, number] => [
      view.offX + (x - view.minX) * view.scale,
      view.offZ + (z - view.minZ) * view.scale,
    ];
    // Pontes: vaus fixos sobre a água.
    ctx.fillStyle = '#7a5f3e';
    for (const b of this.scene.model.bridges) {
      const [x, z] = toMap(b.x - b.width / 2, b.z - b.depth / 2);
      ctx.fillRect(x, z, Math.max(1, b.width * view.scale), Math.max(1, b.depth * view.scale));
    }
    // Paredes permanentes e passagens dos recintos fazem parte do mapa tático.
    ctx.fillStyle = '#687166';
    for (const wall of map.obstacles) {
      const [x, z] = toMap(wall.x - wall.width / 2, wall.z - wall.depth / 2);
      ctx.fillRect(x, z, Math.max(1, wall.width * view.scale), Math.max(1, wall.depth * view.scale));
    }
    // nós
    for (const nd of snap.nodes) {
      const [mx, mz] = toMap(nd.x, nd.z);
      ctx.fillStyle = nd.kind === 'gold' ? '#e8c83a' : '#2d5a2d';
      const size = nd.kind === 'gold' ? 3 : 1;
      ctx.fillRect(mx - size / 2, mz - size / 2, size, size);
    }
    // prédios (a névoa vale também aqui)
    for (const b of snap.buildings) {
      if (!this.scene.isVisibleToPlayer(b.owner, b.x, b.z)) continue;
      const [mx, mz] = toMap(b.x, b.z);
      ctx.fillStyle = b.owner < 0 ? '#555' : b.owner === myId ? '#6ad6ff' : '#d6b06a';
      ctx.fillRect(mx - 2, mz - 2, 5, 5);
    }
    // Bases: refúgios humanos e cripta do vampiro (sempre visíveis, discretas).
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = '#8fc7ff';
    ctx.lineWidth = 1;
    for (const c of this.scene.model.compounds) {
      const [mx, mz] = toMap(c.x, c.z);
      ctx.strokeRect(mx - 3, mz - 3, 6, 6);
    }
    const [cxm, czm] = toMap(this.scene.model.cryptPosition.x, this.scene.model.cryptPosition.z);
    ctx.fillStyle = '#ff5a6a';
    ctx.beginPath();
    ctx.arc(cxm, czm, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // unidades
    for (const u of snap.units) {
      if (!this.scene.isVisibleToPlayer(u.owner, u.x, u.z)) continue;
      const [mx, mz] = toMap(u.x, u.z);
      ctx.fillStyle = u.kind === 'vampire' ? '#ff2a2a' : u.owner === myId ? '#ffffff' : '#88aaff';
      ctx.beginPath();
      ctx.arc(mx, mz, u.kind === 'vampire' ? 3.5 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
    // Quedas recentes: um X vermelho no minimapa, visível para todos.
    const now = performance.now();
    this.deathMarks = this.deathMarks.filter((m) => m.until > now);
    ctx.strokeStyle = '#ff5a5a';
    ctx.lineWidth = 2;
    for (const m of this.deathMarks) {
      const [mx, mz] = toMap(m.x, m.z);
      ctx.beginPath();
      ctx.moveTo(mx - 3, mz - 3); ctx.lineTo(mx + 3, mz + 3);
      ctx.moveTo(mx + 3, mz - 3); ctx.lineTo(mx - 3, mz + 3);
      ctx.stroke();
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

  /** Conteúdo do modal de menu (idioma + sair). Reconstruído ao trocar idioma. */
  private renderMenuModal() {
    this.quitModal.innerHTML = `
      <div class="vxh-modal-panel" role="dialog" aria-modal="true" aria-labelledby="vxh-quit-title">
        <h2 class="vxh-modal-title" id="vxh-quit-title">${t('Menu')}</h2>
        <div class="vxh-menu-lang"><span>${t('Idioma')}</span><div class="vxh-menu-lang-select"></div></div>
        <div class="vxh-menu-lang"><span>${t('Volume da música')}</span><div class="vxh-menu-volume"></div></div>
        <p class="vxh-modal-text">${t('Suas unidades ficarão abandonadas na sala. Deseja realmente voltar ao início?')}</p>
        <div class="vxh-modal-actions">
          <button class="vxh-modal-btn" data-quit="cancel">${t('Cancelar')}</button>
          <button class="vxh-modal-btn danger" data-quit="confirm">${t('Sair da partida')}</button>
        </div>
      </div>`;
    this.quitModal.querySelector('.vxh-menu-lang-select')?.appendChild(createLocaleSwitcher());
    this.quitModal.querySelector('.vxh-menu-volume')?.appendChild(createVolumeControl());
  }

  private showResult(winner: 'human' | 'vampire', reason: string, myId: number) {
    const won = (winner === 'vampire') === (myId === VAMPIRE_PLAYER_ID);
    // Guarda o código para reentrar automaticamente na sala ao voltar ao lobby.
    if (this.net.lobby?.code) rememberRejoin(this.net.lobby.code);
    const div = document.createElement('div');
    div.className = 'vxh-result';
    div.innerHTML = `
      <div style="color: ${winner === 'vampire' ? '#ff5a5a' : '#6ad66a'}">
        ${won ? t('VITÓRIA') : t('DERROTA')}
      </div>
      <small>${localizeResultReason(reason)}</small>
      <div class="vxh-result-actions">
        <button class="vxh-modal-btn" data-result="lobby">${t('Voltar para a sala')}</button>
        <button class="vxh-modal-btn danger" data-result="home">${t('Sair para o início')}</button>
      </div>
    `;
    div.addEventListener('click', (e) => {
      const button = (e.target as HTMLElement).closest<HTMLElement>('[data-result]');
      if (!button) return;
      if (button.dataset.result === 'home') {
        // Sem reentrada: a próxima carga mostra a tela inicial.
        forgetRejoin();
      }
      location.reload();
    });
    this.el.appendChild(div);
    this.resultEl = div;
  }
}
