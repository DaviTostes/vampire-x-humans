/**
 * CONFIGURAÇÃO CENTRAL DO JOGO
 * Edite os valores deste arquivo para balancear a partida.
 * Tempos: segundos. Distâncias e velocidades: unidades do mapa e unidades/segundo.
 * As mesmas configurações são usadas pelo servidor e pelo navegador.
 * Depois de editar, inicie uma nova sala. Em produção, gere um novo build.
 */
export type BuildKind = 'bank' | 'taverna' | 'wall' | 'tower' | 'keep';
export type VampireItemId = 'claws' | 'heart' | 'boots' | 'frenzy';
export type VampireSkillId = 'powerStrike';
export interface RefugeConfig {
  name: string; x: number; z: number; width: number; depth: number;
  facing: 'north' | 'south' | 'east' | 'west';
}

export const GAME_CONFIG = {
  match: {
    daySeconds: 60,
    nightSeconds: 100,
    nightsToWin: 10,
    startingResources: { wood: 0, gold: 0 },
  },
  lobby: { codeLength: 5 },

  units: {
    human: {
      hp: 100, speed: 7,
      carry: 10,            // Recursos por ciclo de coleta
      gatherRate: 2.5,      // Recursos coletados por segundo
      attackDamage: 4, attackRange: 1.6, attackCooldown: 1,
      buildRate: 1,         // 2 = constrói duas vezes mais rápido
    },
    peon: {
      hp: 100, speed: 7,
      carry: 10, gatherRate: 2.5,
      attackDamage: 4, attackRange: 1.6, attackCooldown: 1,
      buildRate: 1,
    },
    vampire: {
      hp: 1200,
      speedDay: 6, speedNight: 9.5,
      attackDamage: 50,
      dayDamageMultiplier: 0.4,
      attackDamageBuilding: 25,
      attackRange: 2.2, attackCooldown: 1.1,
      minAttackCooldown: 0.45, // Intervalo mínimo entre ataques, mesmo com muito Frenesi
      bloodPerHit: 2, // Sangue ganho por golpe acertado, contra unidades ou construções
      nightRegen: 2,        // Vida recuperada por segundo à noite
      cryptRadius: 14,
    },
  },

  // "size" é a largura/profundidade ocupada pela construção no terreno.
  buildings: {
    bank: {
      hp: 500, size: 6,
      cost: { wood: 0, gold: 0, time: 5 },
      maxLevel: 6,
      goldPerCycle: 5,      // Mesma quantidade em todos os níveis, desde o nível 1
      cycleSecondsByLevel: {
        1: 5,
        2: 4,
        3: 3,
        4: 2,
        5: 1.5,
        6: 1,
      } as Record<number, number>,
      // A chave é o nível ATUAL: 1 é o custo de ir do nível 1 para o 2.
      upgradeCosts: {
        1: { wood: 40, gold: 30 },
        2: { wood: 60, gold: 60 },
        3: { wood: 90, gold: 120 },
        4: { wood: 130, gold: 240 },
        5: { wood: 180, gold: 450 },
      } as Record<number, { wood: number; gold: number }>,
    },
    taverna: {
      hp: 500, size: 6,
      cost: { wood: 40, gold: 20, time: 5 },
      recruit: { wood: 0, gold: 50, time: 2 },
    },
    wall: {
      hp: 400, size: 2, cost: { wood: 15, gold: 0, time: 2 },
      maxLevel: 3,
      hpPerLevel: { 1: 400, 2: 800, 3: 1200 } as Record<number, number>,
      // A chave é o nível ATUAL: 1 é o custo de ir do nível 1 para o 2.
      upgradeCosts: {
        1: { wood: 60, gold: 20 },
        2: { wood: 120, gold: 40 },
      } as Record<number, { wood: number; gold: number }>,
    },
    tower: {
      hp: 300, size: 3,
      cost: { wood: 30, gold: 40, time: 2 },
      range: 15, damage: 10, cooldown: 2,
    },
    // Estruturas especiais; keep não aparece no painel por padrão.
    keep: { hp: 1200, size: 7, cost: { wood: 150, gold: 60, time: 12 } },
    crypt: { hp: 4000, size: 8 },
  },
  buildable: ['bank', 'taverna', 'wall', 'tower'] as BuildKind[],

  // Itens equipados automaticamente ao comprar com sangue. A loja só abre de dia.
  // baseCost + costGrowth: custo do nível N = baseCost * costGrowth^(N-1). maxCount Infinity = upável sem limite.
  vampireItems: {
    claws: {
      name: 'Garras Sangrentas', icon: '⚔',
      baseCost: 50, costGrowth: 1, damageBonus: 10, healthBonus: 0, speedBonus: 0, cooldownFactor: 1, maxCount: 1,
    },
    heart: {
      name: 'Coração Ancestral', icon: '♥',
      baseCost: 75, costGrowth: 1, damageBonus: 0, healthBonus: 300, speedBonus: 0, cooldownFactor: 1, maxCount: 1,
    },
    boots: {
      name: 'Botas da Névoa', icon: '🥾',
      baseCost: 30, costGrowth: 1.4, damageBonus: 0, healthBonus: 0, speedBonus: 0.5, cooldownFactor: 1, maxCount: Infinity,
    },
    frenzy: {
      name: 'Frenesi', icon: '🌀',
      baseCost: 30, costGrowth: 1.4, damageBonus: 0, healthBonus: 0, speedBonus: 0, cooldownFactor: 0.93, maxCount: Infinity,
    },
  },

  // Skills ativas do vampiro: compra única com sangue, depois uso com cooldown.
  vampireSkills: {
    powerStrike: {
      name: 'Golpe Sombrio', icon: '💥',
      unlockCost: 80, damageMultiplier: 2, duration: 8, cooldown: 50,
      description: 'Dobra o dano por 8s',
    },
  },

  // No muro, estes valores definem a troca nos dois sentidos.
  // Exemplo: wood: 20, gold: 10 => vende 20 madeira por 10 ouro e vice-versa.
  market: { wood: 10, gold: 10 },

  camera: {
    distance: 90,
    initialZoom: 0.45,      // Quanto MENOR, mais perto
    minZoom: 0.3, maxZoom: 0.6,
    wheelSensitivity: 0.0004,
    elevation: 0.75, depth: 0.62,
    panSpeed: 60,
    smoothing: 6,
    fov: 50,
  },
  admin: { defaultResourceAmount: 1000, maxResourceAmount: 100000 },
  simulation: { ticksPerSecond: 15 }, // Frequência da simulação; não é o ciclo do Banco.

  interaction: {
    buildRange: 1.8,
    repairRate: 30, // HP restaurado por segundo por reparador, multiplicado por buildRate
    woodGatherRange: 2.2, goldGatherRange: 3.5,
    formationSpacing: 1.8,
    unitRadius: 0.55, unitSeparation: 1.4,
    woodCollisionRadius: 0.7, goldCollisionRadius: 2.2,
    resourceBuildClearance: 2,
    moveArrivalRange: 0.8,
    pathRetrySeconds: 2,
    recruitSpawnClearance: 1.5,
    recruitSpawnExtraRadius: 5,
  },

  map: {
    version: 1,
    tiles: 144, tileSize: 2, // Mundo atual: 288 × 288 unidades
    // Um ponto para cada vaga humana. Adicionar/remover pontos altera as vagas da sala.
    humanSpawns: [{ x: -3, z: -3 }, { x: 3, z: -3 }, { x: -3, z: 3 }, { x: 3, z: 3 }],
    crypt: { x: 0, z: -127 },
    vampireSpawnOffset: { x: 0, z: 6 },
    refugeWalls: { thickness: 3.2, entranceWidth: 3, height: 5.5 },
    refuges: [
      { name: 'Clareira dos Pinheiros', x: -66, z: -74, width: 42, depth: 38, facing: 'south' },
      { name: 'Refúgio da Pedreira', x: 0, z: -76, width: 44, depth: 40, facing: 'south' },
      { name: 'Bosque da Lua', x: 66, z: -74, width: 40, depth: 44, facing: 'south' },
      { name: 'Abrigo do Poente', x: -104, z: 0, width: 40, depth: 46, facing: 'east' },
      { name: 'Clareira da Aurora', x: 104, z: 0, width: 40, depth: 42, facing: 'west' },
      { name: 'Refúgio dos Corvos', x: -66, z: 76, width: 46, depth: 40, facing: 'north' },
      { name: 'Vale das Cinzas', x: 0, z: 78, width: 40, depth: 42, facing: 'north' },
      { name: 'Bosque da Névoa', x: 66, z: 74, width: 42, depth: 44, facing: 'north' },
    ] as RefugeConfig[],
    forests: [
      { x: -116, z: -86, rx: 18, rz: 40 }, { x: 116, z: -86, rx: 18, rz: 40 },
      { x: -116, z: 86, rx: 18, rz: 40 }, { x: 116, z: 86, rx: 18, rz: 40 },
      { x: -52, z: -117, rx: 43, rz: 16 }, { x: 52, z: -117, rx: 43, rz: 16 },
      { x: -50, z: 116, rx: 45, rz: 18 }, { x: 50, z: 116, rx: 45, rz: 18 },
      { x: -38, z: 0, rx: 16, rz: 22 }, { x: 38, z: 0, rx: 16, rz: 22 },
      { x: -65, z: -36, rx: 25, rz: 12 }, { x: 65, z: -36, rx: 25, rz: 12 },
      { x: -65, z: 36, rx: 25, rz: 12 }, { x: 65, z: 36, rx: 25, rz: 12 },
    ],
    lakes: [{ x: 104, z: -43, rx: 14, rz: 10 }, { x: -104, z: 43, rx: 14, rz: 10 }],
    resources: {
      centralWoodX: [-22, 22], centralWoodZ: [-12, -6, 0, 6, 12],
      centralGold: [{ x: -12, z: -19 }, { x: 12, z: -19 }, { x: -12, z: 19 }, { x: 12, z: 19 }],
      forestNodeSpacing: 9, // Grade de árvores coletáveis dentro dos clusters de floresta
    },
  },
};
