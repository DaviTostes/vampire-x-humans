/**
 * CONFIGURAÇÃO CENTRAL DO JOGO
 * Edite os valores deste arquivo para balancear a partida.
 * Tempos: segundos. Distâncias e velocidades: unidades do mapa e unidades/segundo.
 * As mesmas configurações são usadas pelo servidor e pelo navegador.
 * Depois de editar, inicie uma nova sala. Em produção, gere um novo build.
 */
export type BuildKind = 'bank' | 'taverna' | 'wall' | 'tower' | 'keep' | 'goldMine' | 'market';
export type WorkerRole = 'lumberjack' | 'miner' | 'repairer';
export type VampireItemId = 'damage' | 'health' | 'attackSpeed';
export type VampireSkillId = 'powerStrike';
export interface RefugeConfig {
  name: string; x: number; z: number; width: number; depth: number;
  facing: 'north' | 'south' | 'east' | 'west';
}

// ---- Tipos das mecânicas da especificação "Humano e Vampiro" ----
// As tabelas abaixo vivem em `GAME_CONFIG.spec`. Elas são a fonte de verdade
// das etapas seguintes; nesta etapa (scaffolding) ainda não alteram a simulação.
export type HumanAbilityId = 'entangle' | 'fortify' | 'teleport' | 'silencer';
export type VampireAbilityId = 'revealArea' | 'batForm' | 'teleportHome';
export type SpecCost = { wood?: number; gold?: number };
/** Pré-requisito para alcançar um nível de construção. `null` = sem requisito. */
export type SpecPrerequisite = { wallLevel?: number; marketLevel?: number } | null;

// Conversão da unidade de Move Speed da spec (RTS) para unidades do mapa por
// segundo do projeto. A spec não define a unidade; ancoramos o Humano em 7 u/s
// (valor original do projeto). A CONFIRMAR: ajustar o fator se necessário.
const MOVE_SPEED_SCALE = 7 / 367;

export const GAME_CONFIG = {
  match: {
    daySeconds: 60,
    nightSeconds: 100,
    nightsToWin: 10,
    startingResources: { wood: 0, gold: 30 },
  },
  lobby: { codeLength: 5 },

  units: {
    human: {
      // Spec (seção 1): Vida máxima 200, Move Speed 367 (convertido por MOVE_SPEED_SCALE).
      hp: 200, speed: Math.round(367 * MOVE_SPEED_SCALE * 10) / 10,
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
      // Spec (seção 13): Vida 500, Dano 5, Attack Speed 120 (máx 600), Move Speed 400.
      // Move Speed convertido por MOVE_SPEED_SCALE; attackCooldown é o intervalo
      // base em Attack Speed 120 (1,42s).
      hp: 500,
      speedDay: Math.round(400 * MOVE_SPEED_SCALE * 10) / 10,
      speedNight: Math.round(400 * MOVE_SPEED_SCALE * 10) / 10,
      attackDamage: 5,
      dayDamageMultiplier: 0.4,
      attackRange: 2.2, attackCooldown: 1.42,
      // Intervalo correspondente a Attack Speed 600 (1,42 × 120/600).
      minAttackCooldown: 0.284,
      bloodPerHit: 0, // Depreciado: o sangue agora vem de `spec.bloodPerDamage` (80% do dano)
      nightRegen: 2,        // Vida recuperada por segundo à noite
      cryptRegen: 3000,     // Vida por segundo dentro da cripta (quase instantâneo)
      cryptRadius: 14,
    },
  },

  // "size" é a largura/profundidade ocupada pela construção no terreno.
  // Progressões (níveis, custos de upgrade e pré-requisitos) ficam em `spec`.
  buildings: {
    bank: {
      hp: 500, size: 5,
      cost: { wood: 0, gold: 0, time: 5 }, // nível 1 é gratuito (seção 4)
      // Ciclo de produção CONSTANTE (não muda com o nível). Cada ciclo entrega
      // `spec.bankLevels[nível].production` de ouro, que dobra a cada upgrade.
      cycleSeconds: 1,
    },
    taverna: {
      hp: 500, size: 5,
      cost: { wood: 0, gold: 128, time: 5 },
      recruit: { wood: 0, gold: 50, time: 2 },
    },
    wall: {
      hp: 30, size: 3, cost: { wood: 0, gold: 4, time: 2 },
    },
    tower: {
      hp: 300, size: 3,
      cost: { wood: 0, gold: 4, time: 2 },
      // TODO(A CONFIRMAR): vida, alcance, Attack Speed, projétil e seleção de
      // alvo não definidos; valores atuais preservados.
      range: 15, cooldown: 2,
    },
    // Mercado: única construção onde se troca madeira por ouro e vice-versa.
    // TODO(A CONFIRMAR): a spec não define custos/vida/níveis do Mercado;
    // valores provisórios. Nível 2 é pré-requisito do Banco nível 6.
    market: {
      hp: 500, size: 5,
      cost: { wood: 0, gold: 64, time: 4 },
      maxLevel: 2,
      // Chave = nível ATUAL: 1 é o custo de ir do nível 1 para o 2.
      upgradeCosts: { 1: { wood: 0, gold: 256 } } as Record<number, { wood: number; gold: number }>,
    },
    // Mina de Ouro: construída pelo Minerador e fonte de ouro (seção 10).
    // TODO(A CONFIRMAR): vida e tempo de obra não definidos; valor provisório.
    goldMine: { hp: 400, size: 5, cost: { wood: 8, gold: 0, time: 3 } },
    // Estruturas especiais; keep não aparece no painel por padrão.
    keep: { hp: 1200, size: 7, cost: { wood: 150, gold: 60, time: 12 } },

    // ---- Base do Vampiro ----
    // Estrutura neutra e indestrutível. A cripta é a base e vende itens e skills.
    // Ciclo de produção FIXO (como o Banco): só a quantidade por ciclo cresce
    // com os upgrades, o intervalo entre os ticks não muda.
    crypt: { hp: 4000, size: 7, cycleSeconds: 1 },
  },
  buildable: ['bank', 'taverna', 'wall', 'tower', 'goldMine', 'market'] as BuildKind[],

  // Itens do Vampiro (dano/vida/Attack Speed): ver `spec.vampireItemTiers`.
  // Comprados com OURO na cripta. (A antiga economia de sangue por item foi
  // substituída pela especificação; `blood` permanece só para a skill legada.)

  // Skills ativas do vampiro: compra única com sangue, depois uso com cooldown.
  vampireSkills: {
    powerStrike: {
      name: 'Golpe Sombrio', icon: '💥',
      unlockCost: 80, damageMultiplier: 2, duration: 8, cooldown: 50,
      description: 'Dobra o dano por 8s',
    },
  },

  // No Mercado, estes valores definem a troca nos dois sentidos.
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
    woodCollisionRadius: 0.35, goldCollisionRadius: 2.2,
    resourceBuildClearance: 2,
    moveArrivalRange: 0.8,
    pathRetrySeconds: 2,
    recruitSpawnClearance: 1.5,
    recruitSpawnExtraRadius: 5,
  },

  map: {
    version: 5,
    // Escala global do mundo: todas as coordenadas abaixo estão em "espaço de
    // projeto" (mundo 480). `scale` reduz o mundo e as posições proporcionalmente.
    // 1 = 480×480; 0.55 ≈ 264×264. Menor = mapa mais apertado e denso.
    scale: 0.55,
    tiles: 240, tileSize: 2, // Mundo de projeto: 480 × 480 unidades
    // Um ponto para cada vaga humana. Adicionar/remover pontos altera as vagas da sala.
    // Com a cripta no centro, os humanos nascem em um anel em volta da praça.
    humanSpawns: [{ x: -30, z: -30 }, { x: 30, z: -30 }, { x: -30, z: 30 }, { x: 30, z: 30 }],
    crypt: { x: 0, z: 0 },
    vampireSpawnOffset: { x: 12, z: 10 },

    // As bases humanas são formadas pelo próprio ambiente: um anel orgânico de
    // rochedos com uma única abertura. O jogador fecha a passagem com um Muro.
    // As posições ficam num anel sobre a ilha inclinada; `facing` aponta a
    // entrada para o centro do mapa.
    refugeWalls: { thickness: 5, entranceWidth: 8, height: 5.5 },
    refuges: [
      { name: 'Clareira dos Pinheiros', x: 110, z: 86, width: 64, depth: 58, facing: 'west' },
      { name: 'Refúgio da Pedreira', x: 29, z: 123, width: 64, depth: 58, facing: 'north' },
      { name: 'Bosque da Lua', x: -69, z: 88, width: 64, depth: 58, facing: 'north' },
      { name: 'Abrigo do Poente', x: -126, z: 2, width: 58, depth: 66, facing: 'east' },
      { name: 'Clareira da Aurora', x: -110, z: -86, width: 58, depth: 66, facing: 'east' },
      { name: 'Refúgio dos Corvos', x: -29, z: -123, width: 64, depth: 58, facing: 'south' },
      { name: 'Vale das Cinzas', x: 69, z: -88, width: 64, depth: 58, facing: 'south' },
      { name: 'Bosque da Névoa', x: 126, z: -2, width: 58, depth: 66, facing: 'west' },
    ] as RefugeConfig[],

    // Ilha inclinada: elipse girada com costa irregular, cercada de água.
    // `rotation` em radianos gira o eixo maior; `bays` recortam enseadas.
    coast: {
      ru: 225, rv: 180, rotation: 0.66, noiseA: 0.07, noiseB: 0.05,
      bays: [{ x: -80, z: -182, r: 28 }, { x: 175, z: 130, r: 26 }],
    },
    // Sem lagos nem rio: a única água é o mar em volta da ilha (a costa).
    // Todo o interior é chão transitável (sem pontes).
    lakes: [] as Array<{ x: number; z: number; rx: number; rz: number }>,
    rivers: [],
    // Vaus extras fixos (somados aos automáticos das trilhas).
    bridges: [],
    // Clareiras abertas no meio da floresta, boas para construir ou emboscar.
    meadows: [
      { x: -40, z: -150, rx: 22, rz: 16 },
      { x: 80, z: 152, rx: 24, rz: 16 },
      { x: -158, z: 78, rx: 20, rz: 26 },
      { x: 150, z: -92, rx: 22, rz: 18 },
    ],
    // Relevo feito de pedra: cada formação vira um conjunto de pilhas do
    // aglomerado rochoso (visual + colisão). O terreno fica plano.
    // `rx`/`rz` dão o tamanho da base, `height` a altura e `count` quantas pilhas.
    rockFormations: [
      { x: -70, z: -70, rx: 42, rz: 32, height: 7, count: 22 },
      { x: 62, z: 58, rx: 46, rz: 36, height: 8, count: 26 },
      { x: -18, z: 150, rx: 38, rz: 30, height: 6, count: 16 },
      { x: 22, z: -150, rx: 38, rz: 30, height: 6, count: 16 },
      { x: 152, z: -52, rx: 34, rz: 26, height: 5, count: 14 },
      { x: -152, z: 60, rx: 36, rz: 28, height: 5, count: 14 },
      { x: -108, z: -156, rx: 32, rz: 26, height: 6, count: 14 },
      { x: 116, z: 152, rx: 34, rz: 26, height: 6, count: 14 },
    ],
    resources: {
      centralWoodX: [-22, 22], centralWoodZ: [-12, -6, 0, 6, 12],
      centralGold: [{ x: -12, z: -19 }, { x: 12, z: -19 }, { x: -12, z: 19 }, { x: 12, z: 19 }],
      forestNodeSpacing: 5.5, // Grade de árvores coletáveis; menor = floresta mais densa
    },
  },

  // ==========================================================================
  // ESPECIFICAÇÃO "HUMANO E VAMPIRO"
  // Tabelas da especificação de implementação. Fonte de verdade a partir das
  // etapas seguintes. Valores marcados com TODO(A CONFIRMAR) NÃO foram definidos
  // na especificação e não devem ser preenchidos por suposição.
  // ==========================================================================
  spec: {
    // ---- Atributos iniciais (seções 1 e 13) ----
    // Observação: a spec usa números em unidade de RTS (ex.: Move Speed 367/400),
    // diferentes da escala atual do projeto (speed 6–9.5). A conversão/adoção
    // desses valores será tratada na etapa de atributos; aqui ficam os valores crus.
    // Fator de conversão do Move Speed da spec para unidades do projeto.
    moveSpeedScale: MOVE_SPEED_SCALE,
    humanBase: {
      maxHp: 200,
      moveSpeed: 367,
      // TODO(A CONFIRMAR): dano base, Attack Speed, alcance e regeneração não definidos.
    },
    vampireBase: {
      maxHp: 500,
      damage: 5,
      attackSpeed: 120,
      attackInterval: 1.42, // ~intervalo aproximado entre ataques
      moveSpeed: 400,
      maxAttackSpeed: 600, // limite absoluto: attackSpeedFinal = min(calculado, 600)
    },

    // ---- Habilidades do Humano (seção 2) ----
    humanAbilities: {
      entangle: {
        name: 'Enredar', icon: '🕸', duration: 4, cooldown: 32,
        // TODO(A CONFIRMAR): alcance de aplicação não definido.
        range: null as number | null,
        description: 'O Vampiro não pode atacar por 4s',
      },
      fortify: {
        name: 'Fortificar', icon: '🛡', duration: 8, cooldown: 300,
        targets: ['unit', 'building'] as const,
        description: 'Torna o alvo invulnerável por 8s',
      },
      teleport: {
        name: 'Teleporte', icon: '✨', maxRange: 600, cooldown: 32,
        // TODO(A CONFIRMAR): canalização, animação, interrupção e custo não definidos.
        description: 'Teleporta o Humano até 600 unidades',
      },
      silencer: {
        name: 'Silenciador', icon: '🔇', duration: 1.5, cooldown: 45,
        // TODO(A CONFIRMAR): alcance de aplicação não definido.
        range: null as number | null,
        description: 'O Vampiro não pode usar habilidades por 1,5s',
      },
    } as Record<HumanAbilityId, {
      name: string; icon: string; duration?: number; cooldown: number;
      range?: number | null; maxRange?: number; targets?: readonly ('unit' | 'building')[];
      description: string;
    }>,

    // ---- Banco (seção 4) ----
    // Chave = nível alcançado. `upgradeCost` é o custo para chegar nesse nível
    // (nível 1 é gratuito). `production` em gold/s. `prerequisite` para o nível.
    bankLevels: {
      1: { upgradeCost: null, production: 1, prerequisite: null },
      2: { upgradeCost: { gold: 50 }, production: 2, prerequisite: { wallLevel: 1 } },
      3: { upgradeCost: { gold: 100 }, production: 4, prerequisite: { wallLevel: 4 } },
      4: { upgradeCost: { gold: 200 }, production: 8, prerequisite: { marketLevel: 1 } },
      5: { upgradeCost: { gold: 400 }, production: 16, prerequisite: { wallLevel: 6 } },
      6: { upgradeCost: { gold: 800, wood: 32 }, production: 32, prerequisite: { marketLevel: 2 } },
      7: { upgradeCost: { gold: 1600, wood: 64 }, production: 64, prerequisite: { wallLevel: 9 } },
      8: { upgradeCost: { gold: 3200, wood: 128 }, production: 128, prerequisite: { wallLevel: 11 } },
    } as Record<number, { upgradeCost: SpecCost | null; production: number; prerequisite: SpecPrerequisite }>,
    bankMaxLevel: 8,

    // ---- Muro (seção 5) ----
    // Chave = nível alcançado. Nível 1 é o custo de construção; os demais, o de upgrade.
    wallLevels: {
      1: { cost: { gold: 4 }, hp: 30 },
      2: { cost: { gold: 8 }, hp: 60 },
      3: { cost: { gold: 16 }, hp: 120 },
      4: { cost: { gold: 32 }, hp: 160 },
      5: { cost: { gold: 64 }, hp: 240 },
      6: { cost: { gold: 128 }, hp: 480 },
      7: { cost: { gold: 256 }, hp: 800 },
      8: { cost: { gold: 512 }, hp: 1280 },
      9: { cost: { gold: 1024 }, hp: 2560 },
      10: { cost: { gold: 2048 }, hp: 5120 },
      11: { cost: { gold: 4096, wood: 32 }, hp: 10240 },
    } as Record<number, { cost: SpecCost; hp: number }>,
    wallMaxLevel: 11,

    // ---- Torre (seção 12) ----
    // TODO(A CONFIRMAR): vida, alcance, Attack Speed, projétil, seleção de alvo e níveis > 7.
    towerLevels: {
      1: { cost: { gold: 4 }, damage: 1 },
      2: { cost: { gold: 16 }, damage: 2 },
      3: { cost: { gold: 32 }, damage: 4 },
      4: { cost: { gold: 64 }, damage: 8 },
      5: { cost: { gold: 128 }, damage: 16 },
      6: { cost: { gold: 256 }, damage: 32 },
      7: { cost: { gold: 512, wood: 2 }, damage: 64 },
    } as Record<number, { cost: SpecCost; damage: number }>,
    towerMaxLevel: 7,

    // ---- Taverna (seção 6) ----
    // TODO(A CONFIRMAR): custos, vida e progressão da própria Taverna não definidos.
    tavernaMaxCount: 3,

    // ---- Mina de Ouro (seção 10) ----
    // TODO(A CONFIRMAR): intervalo entre coletas, capacidade, duração, limite de
    // minas e semântica exata de "Gold Amount" (por coleta ou outra unidade).
    goldMine: {
      maxCount: null as number | null,
      gatherInterval: null as number | null,
      levels: {
        1: { woodCost: 8, goldAmount: 4 },
        2: { woodCost: 128, goldAmount: 32 },
      } as Record<number, { woodCost: number; goldAmount: number }>,
    },

    // ---- Trabalhadores (seções 7–11) ----
    workers: {
      // Lenhador: reduz o intervalo entre coletas; mantém 4 por coleta.
      // TODO(A CONFIRMAR): unidade do Gather Interval não definida no projeto.
      lumberjack: {
        maxCount: 20,
        lumberAmount: 4,
        gatherIntervalUnit: null as string | null,
        levels: {
          1: { goldCost: 512, gatherInterval: 8 },
          2: { goldCost: 1024, gatherInterval: 4 },
          3: { goldCost: 2048, gatherInterval: 2 },
          4: { goldCost: 4096, gatherInterval: 1 },
        } as Record<number, { goldCost: number; gatherInterval: number }>,
      },
      // Minerador: constrói Minas de Ouro e extrai ouro delas.
      // TODO(A CONFIRMAR): Gather Interval do Minerador não definido.
      miner: {
        maxCount: 15,
        woodCost: 2,
        gatherInterval: null as number | null,
      },
      // Reparador: repara Muros. trainingTime 0 = instantâneo.
      // TODO(A CONFIRMAR): significado/unidade exata de Repair Speed.
      repairer: {
        maxCount: 1,
        levels: {
          1: { goldCost: 8, repairSpeed: 4, trainingTime: 4 },
          2: { goldCost: 96, repairSpeed: 9, trainingTime: 0 },
          3: { goldCost: 512, repairSpeed: 12, trainingTime: 0 },
          4: { goldCost: 1500, repairSpeed: 16, trainingTime: 0 },
        } as Record<number, { goldCost: number; repairSpeed: number; trainingTime: number }>,
      },
    },

    // ---- Habilidades do Vampiro (seções 15–17) ----
    vampireAbilities: {
      revealArea: {
        name: 'Revelar Área', icon: '👁', duration: 10, usesPerNight: 1,
        // TODO(A CONFIRMAR): raio, forma, alcance e se revela unidades invisíveis.
        radius: null as number | null,
        range: null as number | null,
      },
      batForm: {
        name: 'Invisibilidade / Forma de Morcego', icon: '🦇',
        maxDuration: 15, exitDuration: 1.5,
        // TODO(A CONFIRMAR): bônus de Move Speed, invulnerabilidade durante a
        // animação de saída e cancelamento manual antes dos 15s.
        moveSpeedBonus: null as number | null,
        invulnerableDuringExit: null as boolean | null,
        cancellable: null as boolean | null,
      },
      teleportHome: {
        name: 'Teleport para a Base', icon: '🏠', channelTime: 2.8,
        // TODO(A CONFIRMAR): o que interrompe a canalização (dano, ataque,
        // movimento, outra habilidade).
        interruptedByDamage: null as boolean | null,
        interruptedByAttack: null as boolean | null,
        interruptedByMove: null as boolean | null,
        interruptedByAbility: null as boolean | null,
      },
    },

    // ---- Cripta (seção 19) ----
    // TODO(A CONFIRMAR): custo inicial (nível 1) e se existem níveis acima do 4.
    crypt: {
      maxLevel: 4,
      // SANGUE POR CICLO (não por segundo): o ciclo é fixo em `buildings.crypt.cycleSeconds`.
      productionByLevel: { 1: 1, 2: 2, 3: 4, 4: 8 } as Record<number, number>,
      // Custo para alcançar o nível indicado.
      upgradeCosts: { 2: 190, 3: 320, 4: 480 } as Record<number, number>,
      initialCost: null as SpecCost | null,
      hasLevelsAboveMax: null as boolean | null,
    },

    // ---- Recompensa por dano (seção 18) ----
    // A spec chama de "ouro", mas o Vampiro deste projeto usa apenas SANGUE.
    bloodPerDamage: 0.8,
    // TODO(A CONFIRMAR): política de arredondamento (floor/ceil/round/decimal).
    roundingPolicy: {
      policy: null as 'floor' | 'ceil' | 'round' | 'none' | null,
    },

    // ---- Itens do Vampiro (seções 20–24) ----
    // Cada nível guarda `bonus` e `cost` em gold. `bonus: null` = A CONFIRMAR.
    vampireItemTiers: {
      // TODO(A CONFIRMAR): modelo cumulativo (A) ou substitutivo (B).
      accumulation: null as 'cumulative' | 'substitutive' | null,
      damage: {
        1: { bonus: 2, cost: 100 }, 2: { bonus: 4, cost: 200 },
        3: { bonus: 8, cost: 400 }, 4: { bonus: 16, cost: 800 },
        5: { bonus: 32, cost: 1600 }, 6: { bonus: 64, cost: 3200 },
        7: { bonus: 128, cost: 6400 }, 8: { bonus: 256, cost: 12800 },
      } as Record<number, { bonus: number; cost: number }>,
      health: {
        1: { bonus: 250, cost: 100 }, 2: { bonus: 500, cost: 200 },
        3: { bonus: 1000, cost: 400 }, 4: { bonus: 2000, cost: 800 },
        5: { bonus: 4000, cost: 1600 }, 6: { bonus: 8000, cost: 3200 },
        7: { bonus: 16000, cost: 6400 }, 8: { bonus: 32000, cost: 12800 },
      } as Record<number, { bonus: number; cost: number }>,
      // TODO(A CONFIRMAR): bônus dos níveis 3–6 não definidos; NÃO duplicar.
      attackSpeed: {
        1: { bonus: 20, cost: 100 }, 2: { bonus: 40, cost: 200 },
        3: { bonus: null, cost: 400 }, 4: { bonus: null, cost: 800 },
        5: { bonus: null, cost: 1600 }, 6: { bonus: null, cost: 3200 },
        7: { bonus: 500, cost: 6400 },
      } as Record<number, { bonus: number | null; cost: number }>,
    },

    // ---- Limites de entidades por jogador (seção 28) ----
    entityLimits: {
      bank: 1,
      wall: 2,
      taverna: 3,
      tower: 30,
      lumberjack: 20,
      miner: 15,
      repairer: 1,
    },
  },
};
