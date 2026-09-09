import { DAY_LENGTH, START_RESOURCES, VAMPIRE, WORKER, CRYPT, GAME_CONFIG, MAX_PLAYERS, VAMPIRE_PLAYER_ID } from './constants.js';
import { CRYPT_POSITION, HUMAN_SPAWNS, MAP_SEED, RESOURCE_PLACEMENTS } from './mapgen.js';
import type { GameState, PlayerState, Unit } from './types.js';

export function createPlayers(names: string[], ids = Array.from({ length: MAX_PLAYERS }, (_, i) => i)): PlayerState[] {
  return ids.map(id => ({ id, name: names[id] ?? (id === VAMPIRE_PLAYER_ID ? 'Vampiro' : `Humano ${id + 1}`),
    role: id === VAMPIRE_PLAYER_ID ? 'vampire' : 'human', wood: START_RESOURCES.wood, gold: START_RESOURCES.gold, alive: true }));
}

export function createGameState(names: string[], _seed = MAP_SEED, playerIds = Array.from({ length: MAX_PLAYERS }, (_, i) => i)): GameState {
  // A cripta mantém o vampiro para testes de sala incompleta. Humanos só existem se conectados ao iniciar.
  const ids = [...new Set([...playerIds, VAMPIRE_PLAYER_ID])].filter(id => id >= 0 && id < MAX_PLAYERS).sort((a, b) => a - b);
  const units: Unit[] = ids.map(owner => {
    const vampire = owner === VAMPIRE_PLAYER_ID;
    const position = vampire ? { x: CRYPT_POSITION.x + GAME_CONFIG.map.vampireSpawnOffset.x, z: CRYPT_POSITION.z + GAME_CONFIG.map.vampireSpawnOffset.z } : HUMAN_SPAWNS[owner]!;
    const hp = vampire ? VAMPIRE.hp : WORKER.hp;
    return { id: owner + 1, owner, kind: vampire ? 'vampire' : 'worker', hero: true, ...position, hp, maxHp: hp,
      order: null, activity: 'idle', carrying: 0, carryRes: null, gatherNodeId: null, attackCd: 0, dead: false };
  });
  return {
    tick: 0, time: 0, phase: 'day', phaseTime: DAY_LENGTH, day: 1, result: null,
    players: createPlayers(names, ids), units, vampire: { blood: 0, items: {}, skills: {} }, seed: MAP_SEED,
    buildings: [{ id: 100, kind: 'crypt', owner: -1, ...CRYPT_POSITION, hp: CRYPT.hp, maxHp: CRYPT.hp,
      level: 1, progress: 1, done: true, builderId: null, goldAcc: 0, attackCd: 0 }],
    nodes: RESOURCE_PLACEMENTS.map((node, i) => ({ id: 200 + i, ...node,
      amount: node.kind === 'wood' ? 600 : 2000, maxAmount: node.kind === 'wood' ? 600 : 2000 })),
  };
}
