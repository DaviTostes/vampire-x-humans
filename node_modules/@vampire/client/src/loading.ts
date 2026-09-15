import type { PreloadProgress } from './assets/asset-registry.js';
import { t } from './i18n.js';
import './loading.css';

// Dicas curtas (português-fonte; traduzidas na construção) exibidas durante o
// carregamento. Devem ser afirmações corretas sobre as regras (ver GUIA_DO_JOGO.md).
const DEFAULT_TIPS = [
  'O <b>Vampiro</b> fica preso ao raio da Cripta durante o dia.',
  '<b>Muros</b> bloqueiam o Vampiro, mas Humanos e Peões atravessam.',
  'As <b>torres</b> atiram de dia e de noite, se o Vampiro estiver ao alcance.',
  'Se os Humanos aguentarem a noite inteira, o <b>amanhecer</b> traz a vitória.',
  'As <b>minas de ouro</b> ficam fora dos refúgios: coletar exige se expor.',
  'À noite o Vampiro fica mais rápido e passa a <b>regenerar</b>.',
];

const TIP_INTERVAL_MS = 3600;
const TIP_FADE_MS = 300;

export class LoadingScreen {
  private el = document.createElement('div');
  private fill: HTMLElement;
  private percent: HTMLElement;
  private count: HTMLElement;
  private tip: HTMLElement;
  private readonly tips: readonly string[];
  private tipTimer: number | null = null;
  private tipIndex = 0;

  constructor(container: HTMLElement, tips: readonly string[] = DEFAULT_TIPS) {
    this.tips = tips.map((tip) => t(tip));
    this.el.className = 'vxh-loading';
    this.el.innerHTML = `
      <div class="vxh-loading-card">
        <div class="vxh-loading-brand">V<span>×</span>H</div>
        <div class="vxh-loading-subtitle">${t('Preparando o Vale da Vigília…')}</div>
        <div class="vxh-loading-flavor">${t('Carregando modelos')}</div>
        <div class="vxh-loading-track"><div class="vxh-loading-fill"></div></div>
        <div class="vxh-loading-meta"><span class="vxh-loading-count">${t('preparando…')}</span><span class="vxh-loading-percent">0%</span></div>
        <div class="vxh-loading-tip"></div>
      </div>`;
    container.appendChild(this.el);
    this.fill = this.el.querySelector<HTMLElement>('.vxh-loading-fill')!;
    this.percent = this.el.querySelector<HTMLElement>('.vxh-loading-percent')!;
    this.count = this.el.querySelector<HTMLElement>('.vxh-loading-count')!;
    this.tip = this.el.querySelector<HTMLElement>('.vxh-loading-tip')!;
    this.showTip();
    if (this.tips.length > 1) this.tipTimer = window.setInterval(() => this.cycleTip(), TIP_INTERVAL_MS);
  }

  setProgress({ loaded, total }: PreloadProgress) {
    const ratio = total > 0 ? Math.min(1, loaded / total) : 0;
    const percent = Math.round(ratio * 100);
    this.fill.style.width = `${percent}%`;
    this.percent.textContent = `${percent}%`;
    this.count.textContent = total > 0 ? t('{loaded} / {total} modelos', { loaded, total }) : t('preparando…');
  }

  /** Esmaece e remove a tela. Resolve só depois da animação, para não piscar. */
  async finish(): Promise<void> {
    if (this.tipTimer !== null) window.clearInterval(this.tipTimer);
    this.el.classList.add('leaving');
    await new Promise<void>((resolve) => window.setTimeout(resolve, 480));
    this.el.remove();
  }

  private showTip() {
    this.tip.innerHTML = this.tips[this.tipIndex] ?? '';
  }

  private cycleTip() {
    if (this.tips.length < 2) return;
    this.tip.classList.add('fading');
    window.setTimeout(() => {
      this.tipIndex = (this.tipIndex + 1) % this.tips.length;
      this.showTip();
      this.tip.classList.remove('fading');
    }, TIP_FADE_MS);
  }
}
