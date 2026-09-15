// Música de fundo da partida. Toca em loop a partir do início da partida.
// Navegadores bloqueiam autoplay sem gesto do usuário; nesse caso, retomamos no
// primeiro clique/tecla (o jogador já interagiu no lobby, mas o convidado pode
// não ter clicado em "Iniciar").

import { t } from './i18n.js';

const MUSIC_URL = `${import.meta.env.BASE_URL}assets/audio/loch-modan.mp3`;
// Padrão bem baixo: música de fundo não deve competir com o jogo.
const DEFAULT_VOLUME = 0.15;
// versão na chave: descarta valores 0 gravados por builds antigas.
const VOLUME_KEY = 'vxh.musicVolume.v2';

function loadVolume(): number {
  try {
    const raw = localStorage.getItem(VOLUME_KEY);
    if (raw === null || raw === '') return DEFAULT_VOLUME;
    const stored = Number(raw);
    if (Number.isFinite(stored) && stored >= 0 && stored <= 1) return stored;
  } catch { /* armazenamento indisponível */ }
  return DEFAULT_VOLUME;
}

let volume = loadVolume();
let audio: HTMLAudioElement | null = null;
let gestureBound = false;

export function getMusicVolume(): number {
  return volume;
}

export function setMusicVolume(value: number): void {
  volume = Math.min(1, Math.max(0, value));
  try { localStorage.setItem(VOLUME_KEY, String(volume)); } catch { /* armazenamento indisponível */ }
  if (audio) audio.volume = volume;
}

function resumeOnGesture(): void {
  if (gestureBound) return;
  gestureBound = true;
  const resume = () => {
    void audio?.play().catch(() => { /* ainda bloqueado; nova tentativa no próximo gesto */ });
    if (audio && !audio.paused) {
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
      gestureBound = false;
    }
  };
  window.addEventListener('pointerdown', resume);
  window.addEventListener('keydown', resume);
}

/** Inicia (ou retoma) a música da partida. Idempotente. */
export function startMatchMusic(): void {
  if (audio) {
    void audio.play().catch(() => resumeOnGesture());
    return;
  }
  audio = new Audio(MUSIC_URL);
  audio.loop = true;
  audio.volume = volume;
  audio.preload = 'auto';
  void audio.play().catch(() => resumeOnGesture());
}

/** Pausa a música (ex.: ao voltar para o lobby). */
export function stopMatchMusic(): void {
  audio?.pause();
}

/** Controle de volume reutilizável (lobby e menu do jogo). */
export function createVolumeControl(className = 'vxh-volume'): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = className;
  const icon = document.createElement('span');
  icon.className = 'vxh-volume-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '🔊';
  const input = document.createElement('input');
  input.type = 'range';
  input.min = '0';
  input.max = '1';
  input.step = '0.01';
  input.value = String(volume);
  input.setAttribute('aria-label', t('Volume da música'));
  input.addEventListener('input', () => setMusicVolume(Number(input.value)));
  wrap.append(icon, input);
  return wrap;
}
