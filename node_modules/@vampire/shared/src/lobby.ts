import type { Role, MapPresetId } from './types.js';

export interface LobbyPlayer {
  id: string;
  playerId: number;
  name: string;
  role: Role | null;
  ready: boolean;
}

export interface LobbyInfo {
  code: string;
  hostId: string | null;
  players: LobbyPlayer[];
  seed: number;
  // Durações configuradas pelo anfitrião (segundos), aplicadas ao iniciar.
  daySeconds: number;
  nightSeconds: number;
  // Mapa escolhido pelo anfitrião.
  mapId: MapPresetId;
  canStart: boolean;
  startReason: string | null;
}
