/**
 * CONFIGURAÇÃO CENTRAL DO JOGO
 * Edite os valores deste arquivo para balancear a partida.
 * Tempos: segundos. Distâncias e velocidades: unidades do mapa e unidades/segundo.
 * As mesmas configurações são usadas pelo servidor e pelo navegador.
 * Depois de editar, inicie uma nova sala. Em produção, gere um novo build.
 */
export type BuildKind = 'bank' | 'taverna' | 'wall' | 'tower' | 'keep';
// Lojas do vampiro: cada item tem sua própria loja, com modelo próprio.
export type VampireItemShopKind = 'forge' | 'relic' | 'mist' | 'shrine';
// Estruturas neutras do vampiro. A cripta é a base e vende apenas skills.
export type VampireBuildingKind = 'crypt' | VampireItemShopKind;
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

    // ---- Base do Vampiro ----
    // Estruturas neutras e indestrutíveis. shopRange é a distância (além da
    // borda) em que o Vampiro precisa estar para comprar naquela loja.
    // A cripta é a base e vende apenas skills; cada item tem sua própria loja.
    crypt: { hp: 4000, size: 8, shopRange: 3 },
    forge: { hp: 1400, size: 5, shopRange: 3 },   // Garras Sangrentas
    relic: { hp: 1400, size: 5, shopRange: 3 },   // Coração Ancestral
    mist: { hp: 1400, size: 5, shopRange: 3 },    // Botas da Névoa
    shrine: { hp: 1400, size: 5, shopRange: 3 },  // Frenesi
  },
  buildable: ['bank', 'taverna', 'wall', 'tower'] as BuildKind[],

  // Itens equipados automaticamente ao comprar com sangue. As lojas só abrem de dia.
  // As lojas só atendem durante o dia e perto da respectiva estrutura.
  // baseCost + costGrowth: custo do nível N = baseCost * costGrowth^(N-1). maxCount Infinity = upável sem limite.
  // shop indica em qual estrutura da base o item é comprado.
  vampireItems: {
    claws: {
      name: 'Garras Sangrentas', icon: '⚔', shop: 'forge' as const,
      baseCost: 50, costGrowth: 1.4, damageBonus: 10, healthBonus: 0, speedBonus: 0, cooldownFactor: 1, maxCount: Infinity,
    },
    heart: {
      name: 'Coração Ancestral', icon: '♥', shop: 'relic' as const,
      baseCost: 75, costGrowth: 1.4, damageBonus: 0, healthBonus: 300, speedBonus: 0, cooldownFactor: 1, maxCount: Infinity,
    },
    boots: {
      name: 'Botas da Névoa', icon: '🥾', shop: 'mist' as const,
      baseCost: 30, costGrowth: 1.4, damageBonus: 0, healthBonus: 0, speedBonus: 0.5, cooldownFactor: 1, maxCount: Infinity,
    },
    frenzy: {
      name: 'Frenesi', icon: '🌀', shop: 'shrine' as const,
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
    version: 3,
    tiles: 240, tileSize: 2, // Mundo: 480 × 480 unidades
    // Um ponto para cada vaga humana. Adicionar/remover pontos altera as vagas da sala.
    humanSpawns: [{ x: -3, z: -3 }, { x: 3, z: -3 }, { x: -3, z: 3 }, { x: 3, z: 3 }],
    crypt: { x: -154, z: -120 },
    // Lojas da base do vampiro, ao redor da cripta e dentro do raio de
    // confinamento diurno (cryptRadius). Cada item é comprado na sua loja.
    vampireShops: [
      { kind: 'forge', x: -167, z: -127 },
      { kind: 'relic', x: -141, z: -127 },
      { kind: 'mist', x: -171, z: -120 },
      { kind: 'shrine', x: -137, z: -120 },
    ] as Array<{ kind: VampireItemShopKind; x: number; z: number }>,
    vampireSpawnOffset: { x: 8, z: 6 },

    // As bases humanas são formadas pelo próprio ambiente: um anel orgânico de
    // rochedos com uma única abertura. O jogador fecha a passagem com um Muro.
    // As posições ficam num anel sobre a ilha inclinada; `facing` aponta a
    // entrada para o centro do mapa.
    refugeWalls: { thickness: 5, entranceWidth: 3, height: 5.5 },
    refuges: [
      { name: 'Clareira dos Pinheiros', x: 110, z: 86, width: 46, depth: 42, facing: 'west' },
      { name: 'Refúgio da Pedreira', x: 29, z: 123, width: 46, depth: 42, facing: 'north' },
      { name: 'Bosque da Lua', x: -69, z: 88, width: 46, depth: 42, facing: 'north' },
      { name: 'Abrigo do Poente', x: -126, z: 2, width: 42, depth: 48, facing: 'east' },
      { name: 'Clareira da Aurora', x: -110, z: -86, width: 42, depth: 48, facing: 'east' },
      { name: 'Refúgio dos Corvos', x: -29, z: -123, width: 46, depth: 42, facing: 'south' },
      { name: 'Vale das Cinzas', x: 69, z: -88, width: 46, depth: 42, facing: 'south' },
      { name: 'Bosque da Névoa', x: 126, z: -2, width: 42, depth: 48, facing: 'west' },
    ] as RefugeConfig[],

    // Ilha inclinada: elipse girada com costa irregular, cercada de água.
    // `rotation` em radianos gira o eixo maior; `bays` recortam enseadas.
    coast: {
      ru: 225, rv: 180, rotation: 0.66, noiseA: 0.07, noiseB: 0.05,
      bays: [{ x: -80, z: -182, r: 28 }, { x: 175, z: 130, r: 26 }],
    },
    lakes: [{ x: -20, z: -40, rx: 12, rz: 9 }, { x: 74, z: 34, rx: 10, rz: 8 }],
    // Rio sinuoso que corta a ilha; as pontes surgem onde as trilhas o cruzam.
    rivers: [
      { width: 15, points: [{ x: -179, z: -96 }, { x: -100, z: -34 }, { x: -22, z: 28 }, { x: 57, z: 89 }, { x: 136, z: 151 }] },
    ],
    // Vaus extras fixos (somados aos automáticos das trilhas).
    bridges: [],
    // Clareiras abertas no meio da floresta, boas para construir ou emboscar.
    meadows: [
      { x: -40, z: -150, rx: 22, rz: 16 },
      { x: 80, z: 152, rx: 24, rz: 16 },
      { x: -158, z: 78, rx: 20, rz: 26 },
      { x: 150, z: -92, rx: 22, rz: 18 },
    ],
    // Platôs elevados: colinas e mesas que dão relevo ao vale.
    highlands: [
      { x: -70, z: -70, rx: 45, rz: 38, height: 0.15 },
      { x: 60, z: 60, rx: 50, rz: 40, height: 0.17 },
      { x: -20, z: 150, rx: 40, rz: 35, height: 0.14 },
      { x: 20, z: -150, rx: 40, rz: 35, height: 0.14 },
    ],
    resources: {
      centralWoodX: [-22, 22], centralWoodZ: [-12, -6, 0, 6, 12],
      centralGold: [{ x: -12, z: -19 }, { x: 12, z: -19 }, { x: -12, z: 19 }, { x: 12, z: 19 }],
      forestNodeSpacing: 6.5, // Grade de árvores coletáveis; menor = floresta mais densa
    },
  },
};
