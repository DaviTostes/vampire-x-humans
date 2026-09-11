import { GAME_CONFIG, type Snapshot } from '@vampire/shared';
import type { Net } from './net.js';
import { onLocaleChange, t } from './i18n.js';
import { resourceIcon } from './resource-icons.js';

export class AdminPanel {
  private el = document.createElement('details');
  private amount: HTMLInputElement;

  constructor(container: HTMLElement, net: Net) {
    const style = document.createElement('style');
    style.textContent = `
      .vxh-admin { position:absolute; right:16px; top:68px; width:258px; pointer-events:auto;
        border:1px solid #6b6553; background:#101923f5; box-shadow:0 8px 24px #0006; border-radius:5px; font:13px system-ui; color:#ded7c5; }
      .vxh-admin[hidden] { display:none; }
      .vxh-admin summary { cursor:pointer; padding:11px 13px; color:#dfc18c; }
      .vxh-admin-content { padding:0 13px 13px; }
      .vxh-admin small { display:block; color:#899ba8; line-height:1.5; margin-bottom:10px; }
      .vxh-admin label { display:block; margin-bottom:5px; }
      .vxh-admin input { width:100%; padding:7px; margin-bottom:8px; background:#080f18; color:#fff; border:1px solid #475361; border-radius:3px; font:14px system-ui; }
      .vxh-admin-actions { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
      .vxh-admin button { padding:8px 5px; border:1px solid #55606b; border-radius:3px; color:#e4d5b6; background:#26313e; cursor:pointer; font:13px system-ui; }
      .vxh-admin button:hover { background:#3a4a59; }.vxh-admin button[aria-pressed=true] { border-color:#c9aa6b; }
    `;
    document.head.appendChild(style);
    this.el.className = 'vxh-admin';
    this.el.hidden = true;
    this.render();
    this.amount = this.el.querySelector('input')!;
    this.el.addEventListener('click', event => {
      const action = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-admin]')?.dataset.admin;
      if (!action) return;
      if (action === 'gold' || action === 'wood') {
        if (!this.amount.reportValidity()) return;
        const amount = this.amount.valueAsNumber;
        net.command({ type: 'admin', action: 'resources', wood: action === 'wood' ? amount : 0, gold: action === 'gold' ? amount : 0 });
      } else if (action === 'blood') {
        if (!this.amount.reportValidity()) return;
        net.command({ type: 'admin', action: 'blood', amount: this.amount.valueAsNumber });
      } else if (action === 'day' || action === 'night') net.command({ type: 'admin', action: 'phase', phase: action });
      else if (action === 'heal') net.command({ type: 'admin', action: 'heal' });
    });
    container.appendChild(this.el);
    onLocaleChange(() => {
      const value = this.amount?.value;
      this.render();
      this.amount = this.el.querySelector('input')!;
      if (value) this.amount.value = value;
    });
  }

  private render() {
    this.el.innerHTML = `<summary>${t('Admin · teste solo')}</summary><div class="vxh-admin-content">
      <small>${t('Ferramentas disponíveis apenas no teste solo.')}</small>
      <label for="admin-amount">${t('Quantidade de recursos')}</label>
      <input id="admin-amount" type="number" min="1" max="${GAME_CONFIG.admin.maxResourceAmount}" step="1" value="${GAME_CONFIG.admin.defaultResourceAmount}" required>
      <div class="vxh-admin-actions"><button data-admin="gold">${resourceIcon('gold')} ${t('+ Ouro')}</button><button data-admin="wood">${resourceIcon('wood')} ${t('+ Madeira')}</button><button data-admin="blood">${resourceIcon('blood')} ${t('+ Sangue')}</button>
      <button data-admin="day">${t('Dia')}</button><button data-admin="night">${t('Noite')}</button><button data-admin="heal">${t('Curar unidades')}</button></div></div>`;
  }

  update(snap: Snapshot) {
    this.el.hidden = !snap.practice;
    for (const phase of ['day', 'night']) this.el.querySelector(`[data-admin="${phase}"]`)!.setAttribute('aria-pressed', String(snap.phase === phase));
  }
}
