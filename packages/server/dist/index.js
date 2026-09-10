// src/index.ts
import http from "node:http";
import { createReadStream, promises as fsp } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import { WebSocketServer } from "ws";

// ../../game.config.ts
var MOVE_SPEED_SCALE = 7 / 367;
var GAME_CONFIG = {
  match: {
    daySeconds: 60,
    nightSeconds: 100,
    nightsToWin: 10,
    startingResources: { wood: 0, gold: 0 }
  },
  lobby: { codeLength: 5 },
  units: {
    human: {
      // Spec (seção 1): Vida máxima 200, Move Speed 367 (convertido por MOVE_SPEED_SCALE).
      hp: 200,
      speed: Math.round(367 * MOVE_SPEED_SCALE * 10) / 10,
      carry: 10,
      // Recursos por ciclo de coleta
      gatherRate: 2.5,
      // Recursos coletados por segundo
      attackDamage: 4,
      attackRange: 1.6,
      attackCooldown: 1,
      buildRate: 1
      // 2 = constrói duas vezes mais rápido
    },
    peon: {
      hp: 100,
      speed: 7,
      carry: 10,
      gatherRate: 2.5,
      attackDamage: 4,
      attackRange: 1.6,
      attackCooldown: 1,
      buildRate: 1
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
      attackDamageBuilding: 25,
      attackRange: 2.2,
      attackCooldown: 1.42,
      // Intervalo correspondente a Attack Speed 600 (1,42 × 120/600).
      minAttackCooldown: 0.284,
      bloodPerHit: 0,
      // Depreciado: o sangue agora vem de `spec.bloodPerDamage` (80% do dano)
      nightRegen: 2,
      // Vida recuperada por segundo à noite
      cryptRegen: 3e3,
      // Vida por segundo dentro da cripta (quase instantâneo)
      cryptRadius: 14
    }
  },
  // "size" é a largura/profundidade ocupada pela construção no terreno.
  // Progressões (níveis, custos de upgrade e pré-requisitos) ficam em `spec`.
  buildings: {
    bank: {
      hp: 500,
      size: 6,
      cost: { wood: 0, gold: 0, time: 5 },
      // nível 1 é gratuito (seção 4)
      // Ciclo de produção CONSTANTE (não muda com o nível). Cada ciclo entrega
      // `spec.bankLevels[nível].production` de ouro, que dobra a cada upgrade.
      cycleSeconds: 1
    },
    taverna: {
      hp: 500,
      size: 6,
      cost: { wood: 0, gold: 128, time: 5 },
      recruit: { wood: 0, gold: 50, time: 2 }
    },
    wall: {
      hp: 30,
      size: 2,
      cost: { wood: 0, gold: 4, time: 2 }
    },
    tower: {
      hp: 300,
      size: 3,
      cost: { wood: 0, gold: 4, time: 2 },
      // TODO(A CONFIRMAR): vida, alcance, Attack Speed, projétil e seleção de
      // alvo não definidos; valores atuais preservados.
      range: 15,
      cooldown: 2
    },
    // Mercado: única construção onde se troca madeira por ouro e vice-versa.
    // TODO(A CONFIRMAR): a spec não define custos/vida/níveis do Mercado;
    // valores provisórios. Nível 2 é pré-requisito do Banco nível 6.
    market: {
      hp: 500,
      size: 6,
      cost: { wood: 0, gold: 64, time: 4 },
      maxLevel: 2,
      // Chave = nível ATUAL: 1 é o custo de ir do nível 1 para o 2.
      upgradeCosts: { 1: { wood: 0, gold: 256 } }
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
    crypt: { hp: 4e3, size: 8, cycleSeconds: 1 }
  },
  buildable: ["bank", "taverna", "wall", "tower", "goldMine", "market"],
  // Itens do Vampiro (dano/vida/Attack Speed): ver `spec.vampireItemTiers`.
  // Comprados com OURO na cripta. (A antiga economia de sangue por item foi
  // substituída pela especificação; `blood` permanece só para a skill legada.)
  // Skills ativas do vampiro: compra única com sangue, depois uso com cooldown.
  vampireSkills: {
    powerStrike: {
      name: "Golpe Sombrio",
      icon: "\u{1F4A5}",
      unlockCost: 80,
      damageMultiplier: 2,
      duration: 8,
      cooldown: 50,
      description: "Dobra o dano por 8s"
    }
  },
  // No Mercado, estes valores definem a troca nos dois sentidos.
  // Exemplo: wood: 20, gold: 10 => vende 20 madeira por 10 ouro e vice-versa.
  market: { wood: 10, gold: 10 },
  camera: {
    distance: 90,
    initialZoom: 0.45,
    // Quanto MENOR, mais perto
    minZoom: 0.3,
    maxZoom: 0.6,
    wheelSensitivity: 4e-4,
    elevation: 0.75,
    depth: 0.62,
    panSpeed: 60,
    smoothing: 6,
    fov: 50
  },
  admin: { defaultResourceAmount: 1e3, maxResourceAmount: 1e5 },
  simulation: { ticksPerSecond: 15 },
  // Frequência da simulação; não é o ciclo do Banco.
  interaction: {
    buildRange: 1.8,
    repairRate: 30,
    // HP restaurado por segundo por reparador, multiplicado por buildRate
    woodGatherRange: 2.2,
    goldGatherRange: 3.5,
    formationSpacing: 1.8,
    unitRadius: 0.55,
    unitSeparation: 1.4,
    woodCollisionRadius: 0.35,
    goldCollisionRadius: 2.2,
    resourceBuildClearance: 2,
    moveArrivalRange: 0.8,
    pathRetrySeconds: 2,
    recruitSpawnClearance: 1.5,
    recruitSpawnExtraRadius: 5
  },
  map: {
    version: 5,
    // Escala global do mundo: todas as coordenadas abaixo estão em "espaço de
    // projeto" (mundo 480). `scale` reduz o mundo e as posições proporcionalmente.
    // 1 = 480×480; 0.55 ≈ 264×264. Menor = mapa mais apertado e denso.
    scale: 0.55,
    tiles: 240,
    tileSize: 2,
    // Mundo de projeto: 480 × 480 unidades
    // Um ponto para cada vaga humana. Adicionar/remover pontos altera as vagas da sala.
    // Com a cripta no centro, os humanos nascem em um anel em volta da praça.
    humanSpawns: [{ x: -30, z: -30 }, { x: 30, z: -30 }, { x: -30, z: 30 }, { x: 30, z: 30 }],
    crypt: { x: 0, z: 0 },
    vampireSpawnOffset: { x: 12, z: 10 },
    // As bases humanas são formadas pelo próprio ambiente: um anel orgânico de
    // rochedos com uma única abertura. O jogador fecha a passagem com um Muro.
    // As posições ficam num anel sobre a ilha inclinada; `facing` aponta a
    // entrada para o centro do mapa.
    refugeWalls: { thickness: 5, entranceWidth: 3, height: 5.5 },
    refuges: [
      { name: "Clareira dos Pinheiros", x: 110, z: 86, width: 56, depth: 50, facing: "west" },
      { name: "Ref\xFAgio da Pedreira", x: 29, z: 123, width: 56, depth: 50, facing: "north" },
      { name: "Bosque da Lua", x: -69, z: 88, width: 56, depth: 50, facing: "north" },
      { name: "Abrigo do Poente", x: -126, z: 2, width: 50, depth: 58, facing: "east" },
      { name: "Clareira da Aurora", x: -110, z: -86, width: 50, depth: 58, facing: "east" },
      { name: "Ref\xFAgio dos Corvos", x: -29, z: -123, width: 56, depth: 50, facing: "south" },
      { name: "Vale das Cinzas", x: 69, z: -88, width: 56, depth: 50, facing: "south" },
      { name: "Bosque da N\xE9voa", x: 126, z: -2, width: 50, depth: 58, facing: "west" }
    ],
    // Ilha inclinada: elipse girada com costa irregular, cercada de água.
    // `rotation` em radianos gira o eixo maior; `bays` recortam enseadas.
    coast: {
      ru: 225,
      rv: 180,
      rotation: 0.66,
      noiseA: 0.07,
      noiseB: 0.05,
      bays: [{ x: -80, z: -182, r: 28 }, { x: 175, z: 130, r: 26 }]
    },
    // Sem lagos nem rio: a única água é o mar em volta da ilha (a costa).
    // Todo o interior é chão transitável (sem pontes).
    lakes: [],
    rivers: [],
    // Vaus extras fixos (somados aos automáticos das trilhas).
    bridges: [],
    // Clareiras abertas no meio da floresta, boas para construir ou emboscar.
    meadows: [
      { x: -40, z: -150, rx: 22, rz: 16 },
      { x: 80, z: 152, rx: 24, rz: 16 },
      { x: -158, z: 78, rx: 20, rz: 26 },
      { x: 150, z: -92, rx: 22, rz: 18 }
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
      { x: 116, z: 152, rx: 34, rz: 26, height: 6, count: 14 }
    ],
    resources: {
      centralWoodX: [-22, 22],
      centralWoodZ: [-12, -6, 0, 6, 12],
      centralGold: [{ x: -12, z: -19 }, { x: 12, z: -19 }, { x: -12, z: 19 }, { x: 12, z: 19 }],
      forestNodeSpacing: 5.5
      // Grade de árvores coletáveis; menor = floresta mais densa
    }
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
      moveSpeed: 367
      // TODO(A CONFIRMAR): dano base, Attack Speed, alcance e regeneração não definidos.
    },
    vampireBase: {
      maxHp: 500,
      damage: 5,
      attackSpeed: 120,
      attackInterval: 1.42,
      // ~intervalo aproximado entre ataques
      moveSpeed: 400,
      maxAttackSpeed: 600
      // limite absoluto: attackSpeedFinal = min(calculado, 600)
    },
    // ---- Habilidades do Humano (seção 2) ----
    humanAbilities: {
      entangle: {
        name: "Enredar",
        icon: "\u{1F578}",
        duration: 4,
        cooldown: 32,
        // TODO(A CONFIRMAR): alcance de aplicação não definido.
        range: null,
        description: "O Vampiro n\xE3o pode atacar por 4s"
      },
      fortify: {
        name: "Fortificar",
        icon: "\u{1F6E1}",
        duration: 8,
        cooldown: 300,
        targets: ["unit", "building"],
        description: "Torna o alvo invulner\xE1vel por 8s"
      },
      teleport: {
        name: "Teleporte",
        icon: "\u2728",
        maxRange: 600,
        cooldown: 32,
        // TODO(A CONFIRMAR): canalização, animação, interrupção e custo não definidos.
        description: "Teleporta o Humano at\xE9 600 unidades"
      },
      silencer: {
        name: "Silenciador",
        icon: "\u{1F507}",
        duration: 1.5,
        cooldown: 45,
        // TODO(A CONFIRMAR): alcance de aplicação não definido.
        range: null,
        description: "O Vampiro n\xE3o pode usar habilidades por 1,5s"
      }
    },
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
      8: { upgradeCost: { gold: 3200, wood: 128 }, production: 128, prerequisite: { wallLevel: 11 } }
    },
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
      11: { cost: { gold: 4096, wood: 32 }, hp: 10240 }
    },
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
      7: { cost: { gold: 512, wood: 2 }, damage: 64 }
    },
    towerMaxLevel: 7,
    // ---- Taverna (seção 6) ----
    // TODO(A CONFIRMAR): custos, vida e progressão da própria Taverna não definidos.
    tavernaMaxCount: 3,
    // ---- Mina de Ouro (seção 10) ----
    // TODO(A CONFIRMAR): intervalo entre coletas, capacidade, duração, limite de
    // minas e semântica exata de "Gold Amount" (por coleta ou outra unidade).
    goldMine: {
      maxCount: null,
      gatherInterval: null,
      levels: {
        1: { woodCost: 8, goldAmount: 4 },
        2: { woodCost: 128, goldAmount: 32 }
      }
    },
    // ---- Trabalhadores (seções 7–11) ----
    workers: {
      // Lenhador: reduz o intervalo entre coletas; mantém 4 por coleta.
      // TODO(A CONFIRMAR): unidade do Gather Interval não definida no projeto.
      lumberjack: {
        maxCount: 20,
        lumberAmount: 4,
        gatherIntervalUnit: null,
        levels: {
          1: { goldCost: 512, gatherInterval: 8 },
          2: { goldCost: 1024, gatherInterval: 4 },
          3: { goldCost: 2048, gatherInterval: 2 },
          4: { goldCost: 4096, gatherInterval: 1 }
        }
      },
      // Minerador: constrói Minas de Ouro e extrai ouro delas.
      // TODO(A CONFIRMAR): Gather Interval do Minerador não definido.
      miner: {
        maxCount: 15,
        woodCost: 2,
        gatherInterval: null
      },
      // Reparador: repara Muros. trainingTime 0 = instantâneo.
      // TODO(A CONFIRMAR): significado/unidade exata de Repair Speed.
      repairer: {
        maxCount: 1,
        levels: {
          1: { goldCost: 8, repairSpeed: 4, trainingTime: 4 },
          2: { goldCost: 96, repairSpeed: 9, trainingTime: 0 },
          3: { goldCost: 512, repairSpeed: 12, trainingTime: 0 },
          4: { goldCost: 1500, repairSpeed: 16, trainingTime: 0 }
        }
      }
    },
    // ---- Habilidades do Vampiro (seções 15–17) ----
    vampireAbilities: {
      revealArea: {
        name: "Revelar \xC1rea",
        icon: "\u{1F441}",
        duration: 10,
        usesPerNight: 1,
        // TODO(A CONFIRMAR): raio, forma, alcance e se revela unidades invisíveis.
        radius: null,
        range: null
      },
      batForm: {
        name: "Invisibilidade / Forma de Morcego",
        icon: "\u{1F987}",
        maxDuration: 15,
        exitDuration: 1.5,
        // TODO(A CONFIRMAR): bônus de Move Speed, invulnerabilidade durante a
        // animação de saída e cancelamento manual antes dos 15s.
        moveSpeedBonus: null,
        invulnerableDuringExit: null,
        cancellable: null
      },
      teleportHome: {
        name: "Teleport para a Base",
        icon: "\u{1F3E0}",
        channelTime: 2.8,
        // TODO(A CONFIRMAR): o que interrompe a canalização (dano, ataque,
        // movimento, outra habilidade).
        interruptedByDamage: null,
        interruptedByAttack: null,
        interruptedByMove: null,
        interruptedByAbility: null
      }
    },
    // ---- Cripta (seção 19) ----
    // TODO(A CONFIRMAR): custo inicial (nível 1) e se existem níveis acima do 4.
    crypt: {
      maxLevel: 4,
      // SANGUE POR CICLO (não por segundo): o ciclo é fixo em `buildings.crypt.cycleSeconds`.
      productionByLevel: { 1: 1, 2: 2, 3: 4, 4: 8 },
      // Custo para alcançar o nível indicado.
      upgradeCosts: { 2: 190, 3: 320, 4: 480 },
      initialCost: null,
      hasLevelsAboveMax: null
    },
    // ---- Recompensa por dano (seção 18) ----
    // A spec chama de "ouro", mas o Vampiro deste projeto usa apenas SANGUE.
    bloodPerDamage: 0.8,
    // TODO(A CONFIRMAR): política de arredondamento (floor/ceil/round/decimal).
    roundingPolicy: {
      policy: null
    },
    // ---- Itens do Vampiro (seções 20–24) ----
    // Cada nível guarda `bonus` e `cost` em gold. `bonus: null` = A CONFIRMAR.
    vampireItemTiers: {
      // TODO(A CONFIRMAR): modelo cumulativo (A) ou substitutivo (B).
      accumulation: null,
      damage: {
        1: { bonus: 2, cost: 100 },
        2: { bonus: 4, cost: 200 },
        3: { bonus: 8, cost: 400 },
        4: { bonus: 16, cost: 800 },
        5: { bonus: 32, cost: 1600 },
        6: { bonus: 64, cost: 3200 },
        7: { bonus: 128, cost: 6400 },
        8: { bonus: 256, cost: 12800 }
      },
      health: {
        1: { bonus: 250, cost: 100 },
        2: { bonus: 500, cost: 200 },
        3: { bonus: 1e3, cost: 400 },
        4: { bonus: 2e3, cost: 800 },
        5: { bonus: 4e3, cost: 1600 },
        6: { bonus: 8e3, cost: 3200 },
        7: { bonus: 16e3, cost: 6400 },
        8: { bonus: 32e3, cost: 12800 }
      },
      // TODO(A CONFIRMAR): bônus dos níveis 3–6 não definidos; NÃO duplicar.
      attackSpeed: {
        1: { bonus: 20, cost: 100 },
        2: { bonus: 40, cost: 200 },
        3: { bonus: null, cost: 400 },
        4: { bonus: null, cost: 800 },
        5: { bonus: null, cost: 1600 },
        6: { bonus: null, cost: 3200 },
        7: { bonus: 500, cost: 6400 }
      }
    },
    // ---- Limites de entidades por jogador (seção 28) ----
    entityLimits: {
      wall: 2,
      taverna: 3,
      tower: 30,
      lumberjack: 20,
      miner: 15,
      repairer: 1
    }
  }
};

// ../shared/src/constants.ts
var MAP_SCALE = GAME_CONFIG.map.scale;
var WORLD = {
  get tiles() {
    return Math.round(GAME_CONFIG.map.tiles * MAP_SCALE);
  },
  get tileSize() {
    return GAME_CONFIG.map.tileSize;
  },
  get half() {
    return this.tiles * this.tileSize / 2;
  }
};
var DAY_LENGTH = GAME_CONFIG.match.daySeconds;
var NIGHT_LENGTH = GAME_CONFIG.match.nightSeconds;
var SURVIVE_NIGHTS_TO_WIN = GAME_CONFIG.match.nightsToWin;
var START_RESOURCES = GAME_CONFIG.match.startingResources;
var MAX_HUMANS = GAME_CONFIG.map.humanSpawns.length;
var VAMPIRE_PLAYER_ID = MAX_HUMANS;
var MAX_PLAYERS = MAX_HUMANS + 1;
var WORKER = GAME_CONFIG.units.human;
var PEON = GAME_CONFIG.units.peon;
function workerStats(unit) {
  return unit.hero === false ? PEON : WORKER;
}
var VAMPIRE = GAME_CONFIG.units.vampire;
var CRYPT_RADIUS = VAMPIRE.cryptRadius;
var TOWER = GAME_CONFIG.buildings.tower;
var WALL = GAME_CONFIG.buildings.wall;
var BANK = GAME_CONFIG.buildings.bank;
var TAVERNA = GAME_CONFIG.buildings.taverna;
var KEEP = GAME_CONFIG.buildings.keep;
var CRYPT = GAME_CONFIG.buildings.crypt;
var VAMPIRE_SKILLS = GAME_CONFIG.vampireSkills;
var RECRUIT = TAVERNA.recruit;
var BUILDABLE = GAME_CONFIG.buildable;
var MARKET = GAME_CONFIG.market;
var TICK_RATE = GAME_CONFIG.simulation.ticksPerSecond;
var DT = 1 / TICK_RATE;
var INTERACTION = GAME_CONFIG.interaction;
var SPEC = GAME_CONFIG.spec;
var HUMAN_SPEC = SPEC.humanBase;
var VAMPIRE_SPEC = SPEC.vampireBase;
var HUMAN_ABILITIES = SPEC.humanAbilities;
var VAMPIRE_ABILITIES = SPEC.vampireAbilities;
var SPEC_BANK_LEVELS = SPEC.bankLevels;
var SPEC_BANK_MAX_LEVEL = SPEC.bankMaxLevel;
var SPEC_WALL_LEVELS = SPEC.wallLevels;
var SPEC_WALL_MAX_LEVEL = SPEC.wallMaxLevel;
var SPEC_TOWER_LEVELS = SPEC.towerLevels;
var SPEC_TOWER_MAX_LEVEL = SPEC.towerMaxLevel;
var SPEC_TAVERNA_MAX_COUNT = SPEC.tavernaMaxCount;
var SPEC_GOLD_MINE = SPEC.goldMine;
var SPEC_WORKERS = SPEC.workers;
var SPEC_CRYPT = SPEC.crypt;
var SPEC_VAMPIRE_ITEM_TIERS = SPEC.vampireItemTiers;
var SPEC_ENTITY_LIMITS = SPEC.entityLimits;
var SPEC_BLOOD_PER_DAMAGE = SPEC.bloodPerDamage;
var SPEC_ROUNDING_POLICY = SPEC.roundingPolicy;
var TERRAIN_MAX_SLOPE = 0.06;
var BUILD_COSTS = Object.fromEntries(
  Object.entries(GAME_CONFIG.buildings).filter(([, b]) => "cost" in b).map(([kind, b]) => [kind, "cost" in b ? b.cost : void 0])
);
var BUILDING_SIZE = Object.fromEntries(
  Object.entries(GAME_CONFIG.buildings).map(([kind, b]) => [kind, b.size])
);
var BUILD_MAX_LEVEL = GAME_CONFIG.spec.bankMaxLevel;
var WALL_MAX_LEVEL = GAME_CONFIG.spec.wallMaxLevel;
var TOWER_MAX_LEVEL = GAME_CONFIG.spec.towerMaxLevel;
function clampLevel(level, max) {
  return Math.min(max, Math.max(1, Math.floor(level)));
}
var MARKET_MAX_LEVEL = GAME_CONFIG.buildings.market.maxLevel;
function marketUpgradeCost(level) {
  return GAME_CONFIG.buildings.market.upgradeCosts[level] ?? null;
}
function bankProduction(level = 1) {
  return GAME_CONFIG.spec.bankLevels[clampLevel(level, BUILD_MAX_LEVEL)].production;
}
var BANK_CYCLE_SECONDS = GAME_CONFIG.buildings.bank.cycleSeconds;
var CRYPT_CYCLE_SECONDS = GAME_CONFIG.buildings.crypt.cycleSeconds;
function cryptProduction(level = 1) {
  return SPEC_CRYPT.productionByLevel[clampLevel(level, SPEC_CRYPT.maxLevel)] ?? 0;
}
function towerDamage(level = 1) {
  return GAME_CONFIG.spec.towerLevels[clampLevel(level, TOWER_MAX_LEVEL)].damage;
}
function workerTrainCost(role) {
  const w = GAME_CONFIG.spec.workers;
  if (role === "miner") return { wood: w.miner.woodCost };
  if (role === "lumberjack") return { gold: w.lumberjack.levels[1].goldCost };
  return { gold: w.repairer.levels[1].goldCost };
}
function workerMaxLevel(role) {
  const w = GAME_CONFIG.spec.workers;
  if (role === "lumberjack") return Object.keys(w.lumberjack.levels).length;
  if (role === "repairer") return Object.keys(w.repairer.levels).length;
  return 1;
}
function workerUpgradeCost(role, level) {
  const next = level + 1;
  const w = GAME_CONFIG.spec.workers;
  if (role === "lumberjack") {
    const e = w.lumberjack.levels[next];
    return e ? { gold: e.goldCost } : null;
  }
  if (role === "repairer") {
    const e = w.repairer.levels[next];
    return e ? { gold: e.goldCost } : null;
  }
  return null;
}
function lumberjackGatherRate(level) {
  const cfg = GAME_CONFIG.spec.workers.lumberjack;
  const entry = cfg.levels[clampLevel(level, workerMaxLevel("lumberjack"))];
  return cfg.lumberAmount / entry.gatherInterval;
}
function repairerStats(level) {
  const cfg = GAME_CONFIG.spec.workers.repairer;
  return cfg.levels[clampLevel(level, workerMaxLevel("repairer"))];
}
function repairerTrainingTime(level) {
  return repairerStats(level).trainingTime;
}
function minerGoldRate(mineLevel) {
  const mine = GAME_CONFIG.spec.goldMine;
  const entry = mine.levels[clampLevel(mineLevel, Object.keys(mine.levels).length)];
  const interval = mine.gatherInterval ?? GAME_CONFIG.spec.workers.miner.gatherInterval ?? 1;
  return entry.goldAmount / interval;
}

// ../shared/src/mapgen.ts
var S = (value) => value * MAP_SCALE;
var MAP_SEED = GAME_CONFIG.map.version;
var HUMAN_SPAWNS = GAME_CONFIG.map.humanSpawns.map((p) => ({ x: S(p.x), z: S(p.z) }));
var CRYPT_POSITION = { x: S(GAME_CONFIG.map.crypt.x), z: S(GAME_CONFIG.map.crypt.z) };
var CRYPT_FOREST_CLEARANCE = S(44);
function withinCryptClearance(x, z) {
  return Math.hypot(x - CRYPT_POSITION.x, z - CRYPT_POSITION.z) < CRYPT_FOREST_CLEARANCE;
}
var COMPOUNDS = GAME_CONFIG.map.refuges.map((c) => ({
  ...c,
  x: Math.round(S(c.x)),
  z: Math.round(S(c.z)),
  width: S(c.width),
  depth: S(c.depth)
}));
function hash01(x, z) {
  let h = Math.imul(x, 374761393) + Math.imul(z, 668265263) | 0;
  h = Math.imul(h ^ h >>> 13, 1274126177);
  return ((h ^ h >>> 16) >>> 0) / 4294967295;
}
var COAST = (() => {
  const c = GAME_CONFIG.map.coast;
  return { ...c, ru: S(c.ru), rv: S(c.rv), bays: c.bays.map((b) => ({ x: S(b.x), z: S(b.z), r: S(b.r) })) };
})();
var LAKES = GAME_CONFIG.map.lakes.map((l) => ({ x: S(l.x), z: S(l.z), rx: S(l.rx), rz: S(l.rz) }));
var RIVERS = GAME_CONFIG.map.rivers.map((r) => ({
  ...r,
  width: S(r.width),
  points: r.points.map((p) => ({ x: S(p.x), z: S(p.z) }))
}));
function coastDistance(x, z) {
  const c = Math.cos(COAST.rotation), s = Math.sin(COAST.rotation);
  const u = (x * c + z * s) / COAST.ru;
  const v = (-x * s + z * c) / COAST.rv;
  const d = Math.hypot(u, v);
  const ang = Math.atan2(v, u);
  const noise = COAST.noiseA * Math.sin(ang * 3 + 0.7) + COAST.noiseB * Math.sin(ang * 5 - 1.1) + 0.03 * Math.sin(ang * 7 + 2.3);
  return d - noise;
}
function isLandAt(x, z) {
  if (coastDistance(x, z) >= 1) return false;
  for (const bay of COAST.bays) if (Math.hypot(x - bay.x, z - bay.z) < bay.r) return false;
  return true;
}
function distanceToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const len2 = dx * dx + dz * dz;
  const t = len2 > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / len2)) : 0;
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}
function withinRivers(x, z) {
  for (const river of RIVERS) {
    const r = river.width / 2;
    for (let i = 0; i < river.points.length - 1; i++) {
      const a = river.points[i], b = river.points[i + 1];
      if (distanceToSegment(x, z, a.x, a.z, b.x, b.z) < r) return true;
    }
  }
  return false;
}
function isWaterAtWorld(x, z) {
  if (!isLandAt(x, z)) return true;
  if (LAKES.some((p) => ((x - p.x) / p.rx) ** 2 + ((z - p.z) / p.rz) ** 2 < 1)) return true;
  return withinRivers(x, z);
}
var BASE_H = 0.24;
var LOW_RADIUS = 34;
var CLIFF_WIDTH = 2.6;
var RAMP_WIDTH = 11;
var RAMP_HALF = 7;
var RAMP_FEATHER = 2.5;
var HILL_LIFT = 0.2;
var BASE_RAISE = 0.13;
var ROCK_FORMATIONS = GAME_CONFIG.map.rockFormations.map((f) => ({ ...f, x: S(f.x), z: S(f.z), rx: S(f.rx), rz: S(f.rz) }));
function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}
function hillLift(x, z) {
  const r = Math.hypot(x, z);
  const steep = smoothstep((r - LOW_RADIUS) / CLIFF_WIDTH);
  const gentle = smoothstep((r - LOW_RADIUS) / RAMP_WIDTH);
  const dTrail = trailDistance(x, z);
  const rampness = 1 - smoothstep((dTrail - RAMP_HALF) / RAMP_FEATHER);
  return HILL_LIFT * (steep * (1 - rampness) + gentle * rampness);
}
function terrainHeight(x, z, coast) {
  let h = BASE_H;
  h += 0.018 * Math.sin(x * 0.021 + 0.5) * Math.cos(z * 0.024 - 0.7);
  h += 0.014 * Math.sin((x * 0.9 + z * 0.6) * 0.017 + 1.3);
  h += hillLift(x, z);
  const shore = smoothstep((1 - coast) / 0.09);
  h = BASE_H * 0.78 + (h - BASE_H * 0.78) * shore;
  return Math.min(0.72, Math.max(BASE_H * 0.72, h));
}
var FACING_ANGLE = {
  north: -Math.PI / 2,
  south: Math.PI / 2,
  east: 0,
  west: Math.PI
};
function compoundWalls(c) {
  const gap = Math.max(S(GAME_CONFIG.map.refugeWalls.entranceWidth), 3.4);
  const facing = FACING_ANGLE[c.facing];
  const fx = Math.cos(facing), fz = Math.sin(facing);
  const tx = -fz, tz = fx;
  const horizontal = c.facing === "north" || c.facing === "south";
  const rx = (horizontal ? c.width : c.depth) / 2;
  const rz = (horizontal ? c.depth : c.width) / 2;
  const seed = hash01(c.x, c.z);
  const outline = [
    [0.18, 1],
    [0.48, 1.02],
    [0.84, 0.72],
    [1.13, 0.18],
    [1.02, -0.43],
    [0.63, -0.98],
    [0.08, -1.18],
    [-0.56, -1.02],
    [-1.08, -0.62],
    [-1.12, 0.02],
    [-0.85, 0.62],
    [-0.45, 0.99],
    [-0.18, 1]
  ];
  const points = outline.map(([u, v], i) => {
    if (i === 0 || i === outline.length - 1) return { x: Math.sign(u) * (gap / 2 + S(2.5)), z: rz };
    const variation = 1 + Math.sin(i * 2.3 + seed * 10) * 0.12;
    return { x: u * rx * variation, z: v * rz * variation };
  });
  const walls = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i + 1];
    const count = Math.max(2, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / S(3)));
    for (let j = 0; j <= count; j++) {
      const u = j / count;
      const x = a.x + (b.x - a.x) * u, z = a.z + (b.z - a.z) * u;
      const back = Math.max(0, 1 - (z / rz + 1) / 2);
      const thickness = S(GAME_CONFIG.map.refugeWalls.thickness) + back * S(9 + seed * 5);
      const height = S(GAME_CONFIG.map.refugeWalls.height) + back * S(12) + Math.sin(i * 1.8 + u + seed * 6) * back * S(3);
      const tangent = z > rz * 0.6 ? Math.sign(x) * Math.max(Math.abs(x), gap / 2 + thickness / 2) : x;
      walls.push({
        x: c.x + tx * tangent + fx * z,
        z: c.z + tz * tangent + fz * z,
        width: thickness,
        depth: thickness,
        height
      });
    }
  }
  return walls;
}
var NATURAL_BLOCKERS = COMPOUNDS.flatMap(compoundWalls);
function nearMountain(x, z, margin) {
  if (!COMPOUNDS.some((c) => Math.abs(x - c.x) < c.width + margin && Math.abs(z - c.z) < c.depth + margin)) return false;
  return NATURAL_BLOCKERS.some((o) => Math.abs(x - o.x) < o.width / 2 + margin && Math.abs(z - o.z) < o.depth / 2 + margin);
}
function compoundEntrance(c) {
  return {
    x: c.x + (c.facing === "east" ? c.width / 2 : c.facing === "west" ? -c.width / 2 : 0),
    z: c.z + (c.facing === "south" ? c.depth / 2 : c.facing === "north" ? -c.depth / 2 : 0)
  };
}
function sampleTrail(door, bend, out) {
  const len = Math.hypot(door.x, door.z) || 1;
  const nx = -door.z / len, nz = door.x / len;
  const cx = door.x * 0.5 + nx * bend;
  const cz = door.z * 0.5 + nz * bend;
  const points = [];
  const N = Math.ceil(len / 1.5);
  for (let i = 0; i <= N; i++) {
    const t = i / N, mt = 1 - t;
    points.push({
      x: 3 * mt * mt * t * cx + 3 * mt * t * t * (door.x + out.x * S(18)) + t * t * t * door.x,
      z: 3 * mt * mt * t * cz + 3 * mt * t * t * (door.z + out.z * S(18)) + t * t * t * door.z
    });
  }
  return points;
}
var TRAILS = COMPOUNDS.map((c, i) => {
  const door = compoundEntrance(c);
  const bend = (i % 3 - 1) * 0.14 * Math.hypot(door.x, door.z);
  const angle = FACING_ANGLE[c.facing];
  return sampleTrail(door, bend, { x: Math.cos(angle), z: Math.sin(angle) });
});
var TRAIL_CELL = 4;
var TRAIL_N = Math.ceil(WORLD.half * 2 / TRAIL_CELL);
var TRAIL_MASK = new Uint8Array(TRAIL_N * TRAIL_N);
for (const trail of TRAILS) {
  for (let i = 0; i < trail.length - 1; i++) {
    const a = trail[i], b = trail[i + 1];
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 2));
    for (let s = 0; s <= steps; s++) {
      const x = a.x + (b.x - a.x) * s / steps, z = a.z + (b.z - a.z) * s / steps;
      const cx = Math.floor((x + WORLD.half) / TRAIL_CELL), cz = Math.floor((z + WORLD.half) / TRAIL_CELL);
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const nx = cx + dx, nz = cz + dz;
        if (nx >= 0 && nz >= 0 && nx < TRAIL_N && nz < TRAIL_N) TRAIL_MASK[nz * TRAIL_N + nx] = 1;
      }
    }
  }
}
function distanceToTrails(x, z) {
  const cx = Math.floor((x + WORLD.half) / TRAIL_CELL), cz = Math.floor((z + WORLD.half) / TRAIL_CELL);
  if (cx < 0 || cz < 0 || cx >= TRAIL_N || cz >= TRAIL_N || !TRAIL_MASK[cz * TRAIL_N + cx]) return Infinity;
  let best = Infinity;
  for (const trail of TRAILS) {
    for (let i = 0; i < trail.length - 1; i++) {
      const a = trail[i], b = trail[i + 1];
      const d = distanceToSegment(x, z, a.x, a.z, b.x, b.z);
      if (d < best) best = d;
    }
  }
  return best;
}
function trailDistance(x, z) {
  let best = Infinity;
  for (const trail of TRAILS) {
    for (let i = 0; i < trail.length - 1; i++) {
      const a = trail[i], b = trail[i + 1];
      const d = distanceToSegment(x, z, a.x, a.z, b.x, b.z);
      if (d < best) best = d;
    }
  }
  return best;
}
var ROCK_OBSTACLES = ROCK_FORMATIONS.flatMap((f, fi) => {
  const out = [];
  for (let i = 0; i < f.count; i++) {
    const a = i * 2.399963 + fi * 1.13;
    const dist2 = i === 0 ? 0 : 0.22 + 0.6 * hash01(i * 7 + fi, fi * 3 + i);
    const px = f.x + Math.cos(a) * f.rx * dist2;
    const pz = f.z + Math.sin(a) * f.rz * dist2;
    const center = 1 - Math.min(1, dist2);
    const size = f.rx / 3.4 * (0.55 + center * 0.9) * (0.8 + hash01(i + 5, fi) * 0.5);
    const depth = size * (0.82 + hash01(i + 9, fi) * 0.36);
    const height = f.height * (0.5 + center * 0.7) * (0.8 + hash01(i + 11, fi) * 0.45);
    if (COMPOUNDS.some((c) => Math.abs(px - c.x) < c.width / 2 + size / 2 + 2 && Math.abs(pz - c.z) < c.depth / 2 + size / 2 + 2)) continue;
    if (Math.hypot(px - CRYPT_POSITION.x, pz - CRYPT_POSITION.z) < S(26)) continue;
    if (Math.hypot(px, pz) < S(18)) continue;
    if (trailDistance(px, pz) < Math.max(size, depth) / 2 + 2) continue;
    out.push({ x: px, z: pz, width: size, depth, height });
  }
  return out;
});
var BASE_ROCKS = COMPOUNDS.flatMap((c, ci) => {
  const out = [];
  const entrance = FACING_ANGLE[c.facing];
  const r = Math.max(c.width, c.depth) / 2;
  const N = 12;
  for (let i = 0; i < N; i++) {
    const ang = i * (Math.PI * 2 / N) + hash01(ci * 5 + i, ci * 11) * 0.5;
    const diff = Math.abs((ang - entrance + Math.PI * 3) % (Math.PI * 2) - Math.PI);
    if (diff < 0.9) continue;
    const rad = r * (1.5 + hash01(i + 3, ci) * 0.4);
    const x = c.x + Math.cos(ang) * rad;
    const z = c.z + Math.sin(ang) * rad;
    const size = 2.5 + hash01(i + 7, ci) * 3;
    const depth = size * (0.8 + hash01(i + 13, ci) * 0.45);
    const height = 4 + hash01(i + 11, ci) * 5;
    if (trailDistance(x, z) < Math.max(size, depth) / 2 + 2) continue;
    out.push({ x, z, width: size, depth, height });
  }
  return out;
});
function insideRiver(river, x, z) {
  const r = river.width / 2;
  for (let i = 0; i < river.points.length - 1; i++) {
    const a = river.points[i], b = river.points[i + 1];
    if (distanceToSegment(x, z, a.x, a.z, b.x, b.z) < r) return true;
  }
  return false;
}
function computeBridges() {
  const configured = GAME_CONFIG.map.bridges;
  const out = configured.map((b) => ({
    x: S(b.x),
    z: S(b.z),
    width: S(b.width),
    depth: S(b.depth)
  }));
  for (const trail of TRAILS) {
    for (const river of RIVERS) {
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
      const flush = () => {
        if (minX === Infinity) return;
        const margin = S(4);
        out.push({
          x: (minX + maxX) / 2,
          z: (minZ + maxZ) / 2,
          width: Math.max(S(9), maxX - minX + margin * 2),
          depth: Math.max(S(9), maxZ - minZ + margin * 2)
        });
        minX = Infinity;
        maxX = -Infinity;
        minZ = Infinity;
        maxZ = -Infinity;
      };
      for (const p of trail) {
        if (!insideRiver(river, p.x, p.z)) {
          flush();
          continue;
        }
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minZ = Math.min(minZ, p.z);
        maxZ = Math.max(maxZ, p.z);
      }
      flush();
    }
  }
  const merged = [];
  for (const b of out) if (!merged.some((m) => Math.hypot(m.x - b.x, m.z - b.z) < S(9))) merged.push(b);
  return merged;
}
var BRIDGES = computeBridges();
function isBridgeAtWorld(x, z) {
  return BRIDGES.some((b) => Math.abs(x - b.x) <= b.width / 2 && Math.abs(z - b.z) <= b.depth / 2);
}
var MEADOWS = GAME_CONFIG.map.meadows.map((m) => ({ ...m, x: S(m.x), z: S(m.z), rx: S(m.rx), rz: S(m.rz) }));
var BASE_TREES = COMPOUNDS.flatMap((c, ci) => {
  const horizontal = c.facing === "north" || c.facing === "south";
  const a = FACING_ANGLE[c.facing];
  const fx = Math.cos(a), fz = Math.sin(a);
  const tx = -fz, tz = fx;
  const halfFacing = (horizontal ? c.depth : c.width) / 2;
  const halfTangent = (horizontal ? c.width : c.depth) / 2;
  const out = [];
  for (const side of [-1, 1]) {
    const back = halfFacing * (0.34 + (hash01(ci * 13, side + 5) - 0.5) * 0.12);
    const lateral = halfTangent * 0.44 * side + (hash01(ci * 17 + side, ci * 31) - 0.5) * 2.2;
    out.push({ kind: "wood", x: c.x - fx * back + tx * lateral, z: c.z - fz * back + tz * lateral });
  }
  return out;
});
function inMeadow(x, z) {
  return MEADOWS.some((m) => ((x - m.x) / m.rx) ** 2 + ((z - m.z) / m.rz) ** 2 < 1);
}
function nearCompound(x, z, margin) {
  return COMPOUNDS.some((c) => ((x - c.x) / (c.width / 2 + margin)) ** 2 + ((z - c.z) / (c.depth / 2 + margin)) ** 2 < 1);
}
function isWaterTile(x, z) {
  return isWaterAtWorld(tileToWorld(worldToTile(x)), tileToWorld(worldToTile(z)));
}
function isForestAt(x, z) {
  if (!isLandAt(x, z) || isWaterTile(x, z)) return false;
  const trailClear = Math.max(S(5.5), 4.2);
  if (trailDistance(x, z) < trailClear || isBridgeAtWorld(x, z)) return false;
  if (inMeadow(x, z)) return false;
  if (nearCompound(x, z, S(5))) return false;
  if (nearMountain(x, z, S(2))) return false;
  if (ROCK_FORMATIONS.some((f) => ((x - f.x) / (f.rx * 1.08)) ** 2 + ((z - f.z) / (f.rz * 1.08)) ** 2 < 1)) return false;
  if (withinCryptClearance(x, z)) return false;
  if (Math.hypot(x, z) < S(16)) return false;
  return true;
}
var FOREST_WOOD_NODES = (() => {
  const pts = [];
  const step2 = GAME_CONFIG.map.resources.forestNodeSpacing;
  const half = WORLD.half - S(4);
  for (let gx = -half; gx <= half; gx += step2) {
    for (let gz = -half; gz <= half; gz += step2) {
      const jx = (hash01(Math.round(gx * 10), Math.round(gz * 10)) - 0.5) * step2 * 0.6;
      const jz = (hash01(Math.round(gz * 10), Math.round(gx * 10)) - 0.5) * step2 * 0.6;
      const x = Math.round((gx + jx) * 2) / 2, z = Math.round((gz + jz) * 2) / 2;
      if (!isForestAt(x, z)) continue;
      if ([-S(3), S(3)].some((dx) => [-S(3), S(3)].some((dz) => isWaterTile(x + dx, z + dz)))) continue;
      pts.push({ kind: "wood", x, z });
    }
  }
  return pts;
})();
var RESOURCE_PLACEMENTS = [
  ...GAME_CONFIG.map.resources.centralWoodX.flatMap((x) => GAME_CONFIG.map.resources.centralWoodZ.map((z) => ({ kind: "wood", x: S(x), z: S(z) }))).filter((p) => distanceToTrails(p.x, p.z) >= S(5.5)),
  ...BASE_TREES,
  ...FOREST_WOOD_NODES
].filter((n) => !isWaterTile(n.x, n.z) && !withinCryptClearance(n.x, n.z));
var MAP_CACHE = /* @__PURE__ */ new Map();
function cloneMap(map) {
  return {
    seed: map.seed,
    tiles: map.tiles,
    height: map.height.slice(),
    water: map.water.slice(),
    bridge: map.bridge.slice(),
    forest: map.forest.slice(),
    obstacles: map.obstacles.map((o) => ({ ...o }))
  };
}
function generateMap(_seed = MAP_SEED) {
  const cached = MAP_CACHE.get(_seed);
  if (cached) return cloneMap(cached);
  const n = WORLD.tiles;
  const height = new Float32Array(n * n);
  const water = new Uint8Array(n * n);
  const bridge = new Uint8Array(n * n);
  const forest = new Float32Array(n * n);
  const FLAT_BLEND = S(6);
  for (let z = 0; z < n; z++) for (let x = 0; x < n; x++) {
    const wx = tileToWorld(x), wz = tileToWorld(z), i = z * n + x;
    const coast = coastDistance(wx, wz);
    const flooded = isWaterAtWorld(wx, wz);
    if (flooded) {
      height[i] = BASE_H * 0.3;
      water[i] = 1;
    } else {
      let h = terrainHeight(wx, wz, coast);
      const flatten = (cx, cz, radius, lift = 0) => {
        const d = Math.hypot(wx - cx, wz - cz);
        if (d >= radius + FLAT_BLEND) return;
        const t = smoothstep((d - radius) / FLAT_BLEND);
        h = h * t + (BASE_H + lift) * (1 - t);
      };
      for (const c of COMPOUNDS) {
        const r = Math.max(c.width, c.depth) / 2;
        flatten(c.x, c.z, r, HILL_LIFT);
        const a = FACING_ANGLE[c.facing], fx = Math.cos(a), fz = Math.sin(a);
        const tx = -fz, tz = fx;
        const dx = wx - c.x, dz = wz - c.z;
        const d = Math.hypot(dx, dz);
        const fwd = dx * fx + dz * fz, side = dx * tx + dz * tz;
        let width = 1.2;
        if (fwd > 0 && Math.abs(side) < RAMP_HALF && d < r * 1.4 + 14) {
          const trailNear = 1 - smoothstep((trailDistance(wx, wz) - RAMP_HALF) / RAMP_FEATHER);
          width += trailNear * 9;
        }
        h += BASE_RAISE * smoothstep((r * 1.4 + width - d) / width);
      }
      for (const b of BRIDGES) flatten(b.x, b.z, Math.max(b.width, b.depth) / 2 + S(6));
      height[i] = h;
      if (isForestAt(wx, wz)) forest[i] = 0.8;
    }
    if (isBridgeAtWorld(wx, wz)) bridge[i] = 1;
  }
  const map = { seed: MAP_SEED, tiles: n, height, water, bridge, forest, obstacles: [...NATURAL_BLOCKERS, ...ROCK_OBSTACLES, ...BASE_ROCKS].map((o) => ({ ...o })) };
  MAP_CACHE.set(_seed, map);
  return cloneMap(map);
}
function tileToWorld(tx) {
  return (tx - WORLD.tiles / 2) * WORLD.tileSize + WORLD.tileSize / 2;
}
function worldToTile(wx) {
  return Math.floor((wx + WORLD.half) / WORLD.tileSize);
}

// ../shared/src/state.ts
function createPlayers(names, ids = Array.from({ length: MAX_PLAYERS }, (_, i) => i)) {
  return ids.map((id) => ({
    id,
    name: names[id] ?? (id === VAMPIRE_PLAYER_ID ? "Vampiro" : `Humano ${id + 1}`),
    role: id === VAMPIRE_PLAYER_ID ? "vampire" : "human",
    wood: START_RESOURCES.wood,
    gold: START_RESOURCES.gold,
    alive: true
  }));
}
function createGameState(names, _seed = MAP_SEED, playerIds = Array.from({ length: MAX_PLAYERS }, (_, i) => i)) {
  const ids = [.../* @__PURE__ */ new Set([...playerIds, VAMPIRE_PLAYER_ID])].filter((id) => id >= 0 && id < MAX_PLAYERS).sort((a, b) => a - b);
  const units = ids.map((owner) => {
    const vampire = owner === VAMPIRE_PLAYER_ID;
    const position = vampire ? { x: CRYPT_POSITION.x + GAME_CONFIG.map.vampireSpawnOffset.x * MAP_SCALE, z: CRYPT_POSITION.z + GAME_CONFIG.map.vampireSpawnOffset.z * MAP_SCALE } : HUMAN_SPAWNS[owner];
    const hp = vampire ? VAMPIRE.hp : WORKER.hp;
    return {
      id: owner + 1,
      owner,
      kind: vampire ? "vampire" : "worker",
      hero: true,
      ...position,
      hp,
      maxHp: hp,
      order: null,
      activity: "idle",
      carrying: 0,
      carryRes: null,
      gatherNodeId: null,
      attackCd: 0,
      dead: false
    };
  });
  const nodes = RESOURCE_PLACEMENTS.map((node, i) => ({
    id: 200 + i,
    ...node,
    amount: node.kind === "wood" ? 600 : 2e3,
    maxAmount: node.kind === "wood" ? 600 : 2e3
  }));
  let nextId = 1;
  for (const u of units) if (u.id >= nextId) nextId = u.id + 1;
  for (const n of nodes) if (n.id >= nextId) nextId = n.id + 1;
  if (100 >= nextId) nextId = 101;
  return {
    tick: 0,
    time: 0,
    phase: "day",
    phaseTime: DAY_LENGTH,
    day: 1,
    result: null,
    players: createPlayers(names, ids),
    units,
    vampire: { blood: 0, items: {}, skills: {}, revealUses: 1 },
    seed: MAP_SEED,
    buildings: [
      {
        id: 100,
        kind: "crypt",
        owner: -1,
        ...CRYPT_POSITION,
        hp: CRYPT.hp,
        maxHp: CRYPT.hp,
        level: 1,
        progress: 1,
        done: true,
        builderId: null,
        goldAcc: 0,
        attackCd: 0
      }
    ],
    nodes,
    nextId
  };
}

// ../shared/src/navigation.ts
var UNIT_RADIUS = INTERACTION.unitRadius;
var SIZE = WORLD.tiles * WORLD.tileSize;
var BUCKET_SIZE = 8;
var BUCKET_COUNT = Math.ceil(SIZE / BUCKET_SIZE);
var PATH_STEPS_PER_TICK = 512;
var PATH_MS_PER_TICK = 12;
function distanceToTarget(p, target, half = 0) {
  const dx = Math.max(0, Math.abs(p.x - target.x) - half);
  const dz = Math.max(0, Math.abs(p.z - target.z) - half);
  return Math.sqrt(dx * dx + dz * dz);
}
var Navigation = class {
  constructor(state, map) {
    this.state = state;
    this.map = map;
  }
  state;
  map;
  routes = /* @__PURE__ */ new Map();
  bCount = 0;
  bIdSum = 0;
  nCount = 0;
  nIdSum = 0;
  grids = /* @__PURE__ */ new Map();
  colliders = [];
  searches = [];
  searchBudget = PATH_STEPS_PER_TICK;
  searchStart = 0;
  indexed = false;
  separationBuckets = /* @__PURE__ */ new Map();
  pathPool = [];
  pathGen = 0;
  invTile = 1 / WORLD.tileSize;
  refresh() {
    let bCount = 0, bIdSum = 0, nCount = 0, nIdSum = 0;
    for (const b of this.state.buildings) {
      bCount++;
      bIdSum += b.id;
    }
    for (const n of this.state.nodes) if (n.amount > 0) {
      nCount++;
      nIdSum += n.id;
    }
    if (bCount !== this.bCount || bIdSum !== this.bIdSum || nCount !== this.nCount || nIdSum !== this.nIdSum) {
      this.bCount = bCount;
      this.bIdSum = bIdSum;
      this.nCount = nCount;
      this.nIdSum = nIdSum;
      for (const route of this.routes.values()) route.search?.return([]);
      this.routes.clear();
      this.grids.clear();
      this.searches = [];
      this.rebuildColliders();
    }
    const units = new Map(this.state.units.map((u) => [u.id, u]));
    for (const [id, route] of this.routes) {
      const unit = units.get(id);
      if (!unit || unit.dead || !unit.order || unit.order !== route.order) {
        route.search?.return([]);
        route.search = void 0;
        this.routes.delete(id);
      }
    }
    this.searchBudget = PATH_STEPS_PER_TICK;
    this.searchStart = performance.now();
    this.advanceSearches();
  }
  acquirePathBuffers() {
    const pooled = this.pathPool.pop();
    if (pooled) {
      pooled.heap.length = 0;
      return pooled;
    }
    const n = SIZE * SIZE;
    return {
      costs: new Float32Array(n),
      parent: new Int32Array(n),
      closed: new Uint8Array(n),
      stamp: new Int32Array(n),
      heap: []
    };
  }
  releasePathBuffers(buffers) {
    buffers.heap.length = 0;
    this.pathPool.push(buffers);
  }
  rebuildColliders() {
    this.colliders.length = 0;
    const add = (c) => {
      const minX = Math.max(0, Math.floor((c.x - c.halfX + WORLD.half) / BUCKET_SIZE));
      const maxX = Math.min(BUCKET_COUNT - 1, Math.floor((c.x + c.halfX + WORLD.half) / BUCKET_SIZE));
      const minZ = Math.max(0, Math.floor((c.z - c.halfZ + WORLD.half) / BUCKET_SIZE));
      const maxZ = Math.min(BUCKET_COUNT - 1, Math.floor((c.z + c.halfZ + WORLD.half) / BUCKET_SIZE));
      for (let z = minZ; z <= maxZ; z++) for (let x = minX; x <= maxX; x++) {
        const key = z * BUCKET_COUNT + x;
        let bucket = this.colliders[key];
        if (!bucket) this.colliders[key] = bucket = [];
        bucket.push(c);
      }
    };
    for (const b of this.state.buildings) {
      const half = BUILDING_SIZE[b.kind] / 2 + UNIT_RADIUS;
      add({ x: b.x, z: b.z, halfX: half, halfZ: half, kind: b.kind });
    }
    for (const wall of this.map.obstacles) {
      add({ x: wall.x, z: wall.z, halfX: wall.width / 2 + UNIT_RADIUS, halfZ: wall.depth / 2 + UNIT_RADIUS });
    }
    for (const n of this.state.nodes) {
      if (n.amount <= 0) continue;
      const radius = (n.kind === "wood" ? INTERACTION.woodCollisionRadius : INTERACTION.goldCollisionRadius) + UNIT_RADIUS;
      add({ x: n.x, z: n.z, halfX: radius, halfZ: radius, radius });
    }
    this.indexed = true;
  }
  advanceSearches() {
    while (this.searchBudget > 0 && this.searches.length) {
      if ((this.searchBudget & 31) === 0 && performance.now() - this.searchStart > PATH_MS_PER_TICK) break;
      const route = this.searches.shift();
      if (!route.search) continue;
      this.searchBudget--;
      const next = route.search.next();
      if (next.done) {
        route.points = next.value;
        route.search = void 0;
        route.retryAt = this.state.tick + Math.ceil(INTERACTION.pathRetrySeconds * TICK_RATE);
      } else {
        this.searches.push(route);
      }
    }
  }
  /** Altura do terreno (unidades de mapa) por interpolação bilinear. */
  groundHeight(x, z) {
    const n = this.map.tiles, height = this.map.height, half = WORLD.half, ts = WORLD.tileSize;
    const gx = Math.max(0, Math.min(n - 1.0001, (x + half) / ts));
    const gz = Math.max(0, Math.min(n - 1.0001, (z + half) / ts));
    const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
    const x1 = Math.min(n - 1, tx + 1), z1 = Math.min(n - 1, tz + 1);
    const h00 = height[tz * n + tx] ?? 0, h10 = height[tz * n + x1] ?? 0;
    const h01 = height[z1 * n + tx] ?? 0, h11 = height[z1 * n + x1] ?? 0;
    return (h00 * (1 - fx) + h10 * fx) * (1 - fz) + (h01 * (1 - fx) + h11 * fx) * fz;
  }
  /** Só a falésia (inclinação acima do limite) bloqueia; o platô é andável. */
  tooSteep(x, z) {
    const step2 = WORLD.tileSize;
    const h0 = this.groundHeight(x, z);
    const slope = Math.max(
      Math.abs(this.groundHeight(x + step2, z) - h0),
      Math.abs(this.groundHeight(x - step2, z) - h0),
      Math.abs(this.groundHeight(x, z + step2) - h0),
      Math.abs(this.groundHeight(x, z - step2) - h0)
    ) / step2;
    return slope > TERRAIN_MAX_SLOPE;
  }
  canStand(u, x, z) {
    const r = UNIT_RADIUS;
    const half = WORLD.half;
    if (!Number.isFinite(x) || !Number.isFinite(z) || Math.abs(x) + r >= half || Math.abs(z) + r >= half) return false;
    const map = this.map, n = map.tiles, water = map.water, bridge = map.bridge, inv = this.invTile;
    const bx = (x + half) * inv, bz = (z + half) * inv, ro = r * inv;
    for (let i = -1; i <= 1; i++) {
      const tx = Math.floor(bx + i * ro);
      if (tx < 0 || tx >= n) return false;
      for (let j = -1; j <= 1; j++) {
        const tz = Math.floor(bz + j * ro);
        if (tz < 0 || tz >= n) return false;
        const idx = tz * n + tx;
        if (water[idx] === 1 && bridge[idx] !== 1) return false;
      }
    }
    if (this.tooSteep(x, z)) return false;
    if (!this.indexed) this.rebuildColliders();
    const key = Math.floor((z + half) / BUCKET_SIZE) * BUCKET_COUNT + Math.floor((x + half) / BUCKET_SIZE);
    const bucket = this.colliders[key];
    if (bucket) for (const c of bucket) {
      if (c.kind === "crypt" && u.kind === "vampire") continue;
      if (c.kind === "wall" && u.kind === "worker") continue;
      const dx = x - c.x, dz = z - c.z;
      if (c.radius !== void 0 ? dx * dx + dz * dz < c.radius * c.radius : Math.abs(dx) < c.halfX && Math.abs(dz) < c.halfZ) return false;
    }
    return true;
  }
  clearSegment(u, a, b) {
    return this.clearSegmentXZ(u, a.x, a.z, b.x, b.z);
  }
  clearSegmentXZ(u, ax, az, bx, bz) {
    const dx = bx - ax, dz = bz - az;
    const steps = Math.max(1, Math.ceil(Math.sqrt(dx * dx + dz * dz) / 0.25));
    for (let i = 1; i <= steps; i++) {
      if (!this.canStand(u, ax + dx * i / steps, az + dz * i / steps)) return false;
    }
    return true;
  }
  /** Resolve spawn/construção sobre unidade antes de calcular caminhos. */
  recover(u) {
    if (this.canStand(u, u.x, u.z)) return;
    for (let r = 0.5; r <= 24; r += 0.5) {
      for (let a = 0; a < 32; a++) {
        const x = u.x + Math.cos(a * Math.PI / 16) * r;
        const z = u.z + Math.sin(a * Math.PI / 16) * r;
        if (this.canStand(u, x, z)) {
          u.x = x;
          u.z = z;
          this.cancelRoute(u.id);
          return;
        }
      }
    }
  }
  *findPath(u, goal) {
    const buffers = this.acquirePathBuffers();
    try {
      const gen = ++this.pathGen;
      let grid = this.grids.get(u.kind);
      if (!grid) {
        grid = new Uint8Array(SIZE * SIZE);
        this.grids.set(u.kind, grid);
      }
      const walkable = (index) => {
        if (!grid[index]) {
          const px = index % SIZE - WORLD.half + 0.5;
          const pz = (index / SIZE | 0) - WORLD.half + 0.5;
          grid[index] = this.canStand(u, px, pz) ? 1 : 2;
        }
        return grid[index] === 1;
      };
      const sx = Math.floor(u.x + WORLD.half), sz = Math.floor(u.z + WORLD.half);
      const start = sz * SIZE + sx;
      let reachableGoal = false;
      const reach = goal.half + goal.range;
      for (let z = Math.max(0, Math.floor(goal.z - reach + WORLD.half)); z < SIZE && z <= goal.z + reach + WORLD.half; z++) {
        for (let x = Math.max(0, Math.floor(goal.x - reach + WORLD.half)); x < SIZE && x <= goal.x + reach + WORLD.half; x++) {
          const id = z * SIZE + x;
          const px = x - WORLD.half + 0.5, pz = z - WORLD.half + 0.5;
          const ddx = Math.max(0, Math.abs(px - goal.x) - goal.half);
          const ddz = Math.max(0, Math.abs(pz - goal.z) - goal.half);
          if (Math.sqrt(ddx * ddx + ddz * ddz) <= goal.range + 1e-3 && walkable(id)) reachableGoal = true;
        }
      }
      if (!reachableGoal) return [];
      const { costs, parent, closed, stamp, heap } = buffers;
      const push = (id, score) => {
        heap.push({ id, score });
        let i = heap.length - 1;
        while (i > 0) {
          const p = i - 1 >> 1;
          if (heap[p].score <= score) break;
          [heap[p], heap[i]] = [heap[i], heap[p]];
          i = p;
        }
      };
      const pop = () => {
        const first = heap[0];
        const last = heap.pop();
        if (heap.length) {
          heap[0] = last;
          let i = 0;
          while (i * 2 + 1 < heap.length) {
            let c = i * 2 + 1;
            if (c + 1 < heap.length && heap[c + 1].score < heap[c].score) c++;
            if (heap[i].score <= heap[c].score) break;
            [heap[i], heap[c]] = [heap[c], heap[i]];
            i = c;
          }
        }
        return first.id;
      };
      const heuristic = (id) => {
        const px = id % SIZE - WORLD.half + 0.5;
        const pz = (id / SIZE | 0) - WORLD.half + 0.5;
        const ddx = Math.max(0, Math.abs(px - goal.x) - goal.half);
        const ddz = Math.max(0, Math.abs(pz - goal.z) - goal.half);
        return Math.max(0, Math.sqrt(ddx * ddx + ddz * ddz) - goal.range);
      };
      stamp[start] = gen;
      costs[start] = 0;
      parent[start] = -1;
      closed[start] = 0;
      push(start, heuristic(start));
      while (heap.length) {
        yield;
        const current = pop();
        if (stamp[current] === gen && closed[current]) continue;
        stamp[current] = gen;
        closed[current] = 1;
        if (heuristic(current) <= 1e-3 && walkable(current)) {
          const path2 = [];
          for (let id = current; id !== start; id = parent[id]) {
            path2.push({ x: id % SIZE - WORLD.half + 0.5, z: (id / SIZE | 0) - WORLD.half + 0.5 });
          }
          path2.reverse();
          return path2;
        }
        const cx = current % SIZE, cz = current / SIZE | 0;
        const cwx = current === start ? u.x : cx - WORLD.half + 0.5;
        const cwz = current === start ? u.z : cz - WORLD.half + 0.5;
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dz) continue;
          const x = cx + dx, z = cz + dz;
          if (x < 0 || z < 0 || x >= SIZE || z >= SIZE) continue;
          const next = z * SIZE + x;
          if (stamp[next] === gen && closed[next] || !walkable(next)) continue;
          if (dx && dz && (!walkable(cz * SIZE + x) || !walkable(z * SIZE + cx))) continue;
          if (!this.clearSegmentXZ(u, cwx, cwz, x - WORLD.half + 0.5, z - WORLD.half + 0.5)) continue;
          const cost = costs[current] + (dx && dz ? Math.SQRT2 : 1);
          if (stamp[next] === gen && cost >= costs[next]) continue;
          stamp[next] = gen;
          costs[next] = cost;
          parent[next] = current;
          closed[next] = 0;
          push(next, cost + heuristic(next));
        }
      }
      return [];
    } finally {
      this.releasePathBuffers(buffers);
    }
  }
  move(u, x, z, speed, dt, range = INTERACTION.moveArrivalRange, half = 0) {
    const goal = { x, z, range, half };
    if (distanceToTarget(u, goal, half) <= range) {
      this.cancelRoute(u.id);
      return true;
    }
    const key = `${x.toFixed(2)},${z.toFixed(2)},${range},${half}`;
    let route = this.routes.get(u.id);
    const pursuing = route && route.order === u.order && u.order?.t === "attack" && (route.search || route.points.length > 0 && this.state.tick < route.retryAt);
    if (!route || route.key !== key && !pursuing || !route.search && !route.points.length && this.state.tick >= route.retryAt) {
      this.cancelRoute(u.id);
      const direct = !half && this.canStand(u, x, z) && this.clearSegment(u, u, goal);
      const points = direct ? [{ x, z }] : [];
      route = { key, order: u.order, points, retryAt: this.state.tick + Math.ceil(INTERACTION.pathRetrySeconds * TICK_RATE) };
      this.routes.set(u.id, route);
      if (!direct) {
        route.search = this.findPath({ ...u }, goal);
        this.searches.push(route);
        this.advanceSearches();
      }
    }
    u.activity = route.points.length ? "moving" : "blocked";
    let budget = speed * dt;
    while (budget > 0 && route.points.length) {
      const next = route.points[0];
      const ddx = next.x - u.x, ddz = next.z - u.z;
      const distance = Math.sqrt(ddx * ddx + ddz * ddz);
      const step2 = Math.min(distance, budget);
      const p = distance < 1e-3 ? next : { x: u.x + (next.x - u.x) * step2 / distance, z: u.z + (next.z - u.z) * step2 / distance };
      if (!this.clearSegment(u, u, p)) {
        this.cancelRoute(u.id);
        break;
      }
      u.x = p.x;
      u.z = p.z;
      budget -= step2;
      if (distance <= step2 + 1e-3) route.points.shift();
      if (distanceToTarget(u, goal, half) <= range) return true;
    }
    return false;
  }
  cancelRoute(id) {
    const route = this.routes.get(id);
    if (route?.search) {
      route.search.return([]);
      route.search = void 0;
    }
    this.routes.delete(id);
  }
  separate(units) {
    const count = units.length;
    if (count < 2) return;
    const sep = INTERACTION.unitSeparation;
    const cell = sep;
    const cols = Math.ceil(WORLD.half * 2 / cell) + 1;
    const colOf = (x) => Math.max(0, Math.min(cols - 1, Math.floor((x + WORLD.half) / cell)));
    const rowOf = (z) => Math.max(0, Math.min(cols - 1, Math.floor((z + WORLD.half) / cell)));
    const buckets = this.separationBuckets;
    for (let pass = 0; pass < 3; pass++) {
      buckets.clear();
      for (let i = 0; i < count; i++) {
        const u = units[i];
        const key = rowOf(u.z) * cols + colOf(u.x);
        const bucket = buckets.get(key);
        if (bucket) bucket.push(i);
        else buckets.set(key, [i]);
      }
      for (let i = 0; i < count; i++) {
        const a = units[i];
        const cx = colOf(a.x), cz = rowOf(a.z);
        for (let dz = -1; dz <= 1; dz++) {
          const nz = cz + dz;
          if (nz < 0 || nz >= cols) continue;
          for (let dx = -1; dx <= 1; dx++) {
            const nx = cx + dx;
            if (nx < 0 || nx >= cols) continue;
            const bucket = buckets.get(nz * cols + nx);
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue;
              const b = units[j];
              const ddx = b.x - a.x, ddz = b.z - a.z;
              const d = Math.sqrt(ddx * ddx + ddz * ddz);
              if (d >= sep) continue;
              const nxv = d > 1e-3 ? ddx / d : 1, nzv = d > 1e-3 ? ddz / d : 0;
              const push = (sep - d) / 2;
              const ax = a.x - nxv * push, az = a.z - nzv * push;
              const bx = b.x + nxv * push, bz = b.z + nzv * push;
              if (this.canStand(a, ax, az)) {
                a.x = ax;
                a.z = az;
              }
              if (this.canStand(b, bx, bz)) {
                b.x = bx;
                b.z = bz;
              }
            }
          }
        }
      }
    }
  }
};

// ../shared/src/placement.ts
function groundHeight(map, x, z) {
  const n = map.tiles;
  const gx = Math.max(0, Math.min(n - 1.0001, (x + WORLD.half) / WORLD.tileSize));
  const gz = Math.max(0, Math.min(n - 1.0001, (z + WORLD.half) / WORLD.tileSize));
  const tx = Math.floor(gx), tz = Math.floor(gz), fx = gx - tx, fz = gz - tz;
  const h = (dx, dz) => map.height[Math.min(n - 1, tz + dz) * n + Math.min(n - 1, tx + dx)] ?? 0;
  return (h(0, 0) * (1 - fx) + h(1, 0) * fx) * (1 - fz) + (h(0, 1) * (1 - fx) + h(1, 1) * fx) * fz;
}
function tooSteep(map, x, z) {
  const step2 = WORLD.tileSize;
  const h0 = groundHeight(map, x, z);
  return Math.max(
    Math.abs(groundHeight(map, x + step2, z) - h0),
    Math.abs(groundHeight(map, x - step2, z) - h0),
    Math.abs(groundHeight(map, x, z + step2) - h0),
    Math.abs(groundHeight(map, x, z - step2) - h0)
  ) / step2 > TERRAIN_MAX_SLOPE;
}
function canPlaceBuilding(map, state, kind, x, z) {
  const half = BUILDING_SIZE[kind] / 2;
  if (!Number.isFinite(half) || !Number.isFinite(x) || !Number.isFinite(z) || Math.abs(x) + half >= WORLD.half || Math.abs(z) + half >= WORLD.half) return false;
  if (tooSteep(map, x, z)) return false;
  for (let tx = worldToTile(x - half); tx <= worldToTile(x + half); tx++) {
    for (let tz = worldToTile(z - half); tz <= worldToTile(z + half); tz++) {
      if (tx < 0 || tz < 0 || tx >= map.tiles || tz >= map.tiles || map.water[tz * map.tiles + tx] === 1 || map.bridge[tz * map.tiles + tx] === 1) return false;
    }
  }
  for (const obstacle of map.obstacles) {
    if (Math.abs(obstacle.x - x) < obstacle.width / 2 + half && Math.abs(obstacle.z - z) < obstacle.depth / 2 + half) return false;
  }
  for (const b of state.buildings) {
    const bh = BUILDING_SIZE[b.kind] / 2;
    if (Math.abs(b.x - x) < bh + half && Math.abs(b.z - z) < bh + half) return false;
  }
  for (const node of state.nodes) {
    if (node.amount > 0 && Math.abs(node.x - x) < half + INTERACTION.resourceBuildClearance && Math.abs(node.z - z) < half + INTERACTION.resourceBuildClearance) return false;
  }
  return !state.units.some((u) => !u.dead && Math.abs(u.x - x) < half + UNIT_RADIUS && Math.abs(u.z - z) < half + UNIT_RADIUS);
}

// ../shared/src/vampire-items.ts
var VAMPIRE_ITEM_IDS = ["damage", "health", "attackSpeed"];
var VAMPIRE_ITEM_INFO = {
  damage: { name: "L\xE2mina Sangrenta", icon: "\u2694", description: "Aumenta o dano do Vampiro" },
  health: { name: "Cora\xE7\xE3o Ancestral", icon: "\u2665", description: "Aumenta a vida m\xE1xima" },
  attackSpeed: { name: "\xCDmpeto Sanguin\xE1rio", icon: "\u{1F300}", description: `Aumenta a velocidade de ataque (m\xE1x. ${VAMPIRE_SPEC.maxAttackSpeed})` }
};
function tiers(id) {
  return SPEC_VAMPIRE_ITEM_TIERS[id];
}
function vampireItemNextLevel(id, owned) {
  const next = owned + 1;
  const tier = tiers(id)[next];
  if (!tier || tier.bonus == null) return null;
  return next;
}
function vampireItemCost(id, owned) {
  const next = vampireItemNextLevel(id, owned);
  return next == null ? null : tiers(id)[next].cost;
}
function singleBonus(id, level) {
  if (level <= 0) return 0;
  return tiers(id)[level]?.bonus ?? 0;
}
function vampireItemBonus(id, level) {
  if (SPEC_VAMPIRE_ITEM_TIERS.accumulation === "cumulative") {
    let total = 0;
    for (let l = 1; l <= level; l++) total += singleBonus(id, l);
    return total;
  }
  return singleBonus(id, level);
}
function vampireItemBonuses(items = {}) {
  let damage = 0, health = 0, attackSpeed = 0;
  for (const id of VAMPIRE_ITEM_IDS) {
    const level = items[id] ?? 0;
    if (!level) continue;
    const value = vampireItemBonus(id, level);
    if (id === "damage") damage += value;
    else if (id === "health") health += value;
    else attackSpeed += value;
  }
  return { damage, health, attackSpeed };
}
function vampireAttackSpeed(items = {}) {
  return Math.min(VAMPIRE_SPEC.attackSpeed + vampireItemBonuses(items).attackSpeed, VAMPIRE_SPEC.maxAttackSpeed);
}
function vampireEffectiveSpeed(phase, _items = {}) {
  return phase === "night" ? VAMPIRE.speedNight : VAMPIRE.speedDay;
}
function vampireEffectiveCooldown(items = {}) {
  const speed = vampireAttackSpeed(items);
  const ratio = VAMPIRE_SPEC.attackSpeed / Math.max(1, speed);
  return Math.max(VAMPIRE.minAttackCooldown, VAMPIRE.attackCooldown * ratio);
}
function vampireSkillMultiplier(skills = {}) {
  for (const id of Object.keys(VAMPIRE_SKILLS)) {
    if ((skills[id]?.buff ?? 0) > 0) return VAMPIRE_SKILLS[id].damageMultiplier;
  }
  return 1;
}
function vampireShopAccess(phase, vampire, crypt) {
  if (phase !== "day") return "A loja da cripta s\xF3 abre durante o dia";
  if (!vampire || vampire.kind !== "vampire" || vampire.hp <= 0) return "Vampiro indispon\xEDvel";
  if (!crypt || crypt.kind !== "crypt" || !crypt.done || crypt.hp <= 0) return "Cripta indispon\xEDvel";
  const distance = Math.hypot(vampire.x - crypt.x, vampire.z - crypt.z);
  return distance > CRYPT_RADIUS ? "Aproxime o Vampiro da cripta para comprar" : null;
}

// ../shared/src/sim.ts
function buildTickIndex(s) {
  const units = /* @__PURE__ */ new Map();
  for (const u of s.units) units.set(u.id, u);
  const buildings = /* @__PURE__ */ new Map();
  for (const b of s.buildings) buildings.set(b.id, b);
  const nodes = /* @__PURE__ */ new Map();
  for (const n of s.nodes) nodes.set(n.id, n);
  return { units, buildings, nodes };
}
function createSession(names, seed, playerIds) {
  const state = createGameState(names, seed, playerIds);
  const map = generateMap(seed);
  return { state, map, commandSeq: {}, navigation: new Navigation(state, map) };
}
function dist(ax, az, bx, bz) {
  const dx = ax - bx, dz = az - bz;
  return Math.sqrt(dx * dx + dz * dz);
}
function unitById(s, id) {
  return s.units.find((u) => u.id === id && !u.dead);
}
function buildingById(s, id) {
  return s.buildings.find((b) => b.id === id);
}
function nextEntityId(s) {
  const id = s.nextId ?? 1001;
  s.nextId = id + 1;
  return id;
}
function buildingHalf(b) {
  return BUILDING_SIZE[b.kind] / 2;
}
function canPlace(session, kind, x, z) {
  return canPlaceBuilding(session.map, session.state, kind, x, z);
}
function meetsPrerequisite(state, playerId, prereq) {
  if (!prereq) return true;
  if (prereq.wallLevel !== void 0) {
    return state.buildings.some((b) => b.owner === playerId && b.kind === "wall" && b.done && b.level >= prereq.wallLevel);
  }
  if (prereq.marketLevel !== void 0) {
    return state.buildings.some((b) => b.owner === playerId && b.kind === "market" && b.done && b.level >= prereq.marketLevel);
  }
  return true;
}
function canPay(p, cost) {
  return !!cost && p.wood >= (cost.wood ?? 0) && p.gold >= (cost.gold ?? 0);
}
function pay(p, cost) {
  p.wood -= cost.wood ?? 0;
  p.gold -= cost.gold ?? 0;
}
function tryUpgradeBuilding(s, playerId, b) {
  if (!b.done) return false;
  if (b.kind !== "crypt" && b.owner !== playerId) return false;
  const p = s.players.find((pl) => pl.id === playerId);
  if (!p) return false;
  const next = b.level + 1;
  if (b.kind === "bank") {
    const level = GAME_CONFIG.spec.bankLevels[next];
    if (!level || !canPay(p, level.upgradeCost) || !meetsPrerequisite(s, playerId, level.prerequisite)) return false;
    pay(p, level.upgradeCost);
    b.level = next;
    b.goldAcc = 0;
    return true;
  }
  if (b.kind === "wall") {
    const level = GAME_CONFIG.spec.wallLevels[next];
    if (!level || !canPay(p, level.cost)) return false;
    pay(p, level.cost);
    const oldMax = b.maxHp;
    b.level = next;
    b.maxHp = level.hp;
    b.hp = Math.min(b.maxHp, b.hp + (b.maxHp - oldMax));
    return true;
  }
  if (b.kind === "tower") {
    const level = GAME_CONFIG.spec.towerLevels[next];
    if (!level || !canPay(p, level.cost)) return false;
    pay(p, level.cost);
    b.level = next;
    return true;
  }
  if (b.kind === "market") {
    if (b.level >= MARKET_MAX_LEVEL) return false;
    const cost = marketUpgradeCost(b.level);
    if (!cost || !canPay(p, cost)) return false;
    pay(p, cost);
    b.level = next;
    return true;
  }
  if (b.kind === "crypt") {
    if (playerId !== VAMPIRE_PLAYER_ID) return false;
    const cost = SPEC_CRYPT.upgradeCosts[next];
    if (cost == null || s.vampire.blood < cost) return false;
    s.vampire.blood -= cost;
    b.level = next;
    b.goldAcc = 0;
    return true;
  }
  return false;
}
function playerWorkerLevel(s, owner, role) {
  const p = s.players.find((pl) => pl.id === owner);
  return Math.max(1, p?.workerLevels?.[role] ?? 1);
}
function canGatherRole(role, resource) {
  if (role === "lumberjack") return resource === "wood";
  if (role === "miner") return resource === "gold";
  return false;
}
function canRepairRole(role) {
  return role === void 0 || role === "repairer";
}
function canBuildKind(u, kind) {
  if (kind === "goldMine") return u.workerRole === "miner";
  return u.hero === true;
}
function countRole(s, owner, role) {
  return s.units.filter((u) => !u.dead && u.owner === owner && u.kind === "worker" && u.workerRole === role).length;
}
function vampireStatus(s, status) {
  return s.vampire.statuses?.[status] ?? 0;
}
function setVampireStatus(s, status, duration) {
  s.vampire.statuses = { ...s.vampire.statuses ?? {}, [status]: Math.max(vampireStatus(s, status), duration) };
}
function vampireCanAttack(s) {
  return vampireStatus(s, "entangled") <= 0;
}
function vampireCanCast(s) {
  return vampireStatus(s, "silenced") <= 0;
}
function vampireInBatForm(s) {
  return vampireStatus(s, "batForm") > 0 || vampireStatus(s, "exitingBatForm") > 0;
}
function vampireInvulnerable(s) {
  return vampireStatus(s, "batForm") > 0;
}
function clearVampireStatus(s, status) {
  if (s.vampire.statuses) delete s.vampire.statuses[status];
}
var DEFAULT_REVEAL_RADIUS = 30;
function vampireBasePosition(s) {
  const crypt = s.buildings.find((b) => b.kind === "crypt" && b.done);
  if (crypt) return { x: crypt.x, z: crypt.z };
  return {
    x: CRYPT_POSITION.x + GAME_CONFIG.map.vampireSpawnOffset.x * MAP_SCALE,
    z: CRYPT_POSITION.z + GAME_CONFIG.map.vampireSpawnOffset.z * MAP_SCALE
  };
}
function roundBlood(value) {
  const policy = SPEC_ROUNDING_POLICY.policy;
  if (policy === "ceil") return Math.ceil(value);
  if (policy === "round") return Math.round(value);
  if (policy === "none") return value;
  return Math.floor(value);
}
function creditVampireBloodFromDamage(s, damage) {
  s.vampire.blood += roundBlood(damage * SPEC_BLOOD_PER_DAMAGE);
}
function buyVampireItem(s, owner, itemId) {
  const owned = s.vampire.items[itemId] ?? 0;
  const next = vampireItemNextLevel(itemId, owned);
  if (next == null) return false;
  const cost = vampireItemCost(itemId, owned);
  if (cost == null || s.vampire.blood < cost) return false;
  s.vampire.blood -= cost;
  s.vampire.items[itemId] = next;
  const vampire = s.units.find((u) => u.kind === "vampire" && u.owner === owner && !u.dead);
  if (vampire && itemId === "health") {
    const delta = vampireItemBonus("health", next) - vampireItemBonus("health", owned);
    vampire.maxHp += delta;
    vampire.hp = Math.min(vampire.maxHp, vampire.hp + delta);
  }
  return true;
}
function completeVampireTeleport(s) {
  const vampire = s.units.find((u) => u.kind === "vampire" && !u.dead);
  if (vampire) {
    const base = vampireBasePosition(s);
    vampire.x = base.x;
    vampire.z = base.z;
    vampire.order = null;
    vampire.gatherNodeId = null;
  }
  clearVampireStatus(s, "channelingTeleport");
}
function applyCommand(session, playerId, cmd) {
  const s = session.state;
  if (s.result) return;
  switch (cmd.type) {
    case "buyVampireItem": {
      if (playerId !== VAMPIRE_PLAYER_ID || !VAMPIRE_ITEM_IDS.includes(cmd.itemId)) return;
      const vampire = s.units.find((u) => u.kind === "vampire" && u.owner === playerId && !u.dead);
      const crypt = buildingById(s, cmd.cryptId);
      if (!vampire || vampireShopAccess(s.phase, vampire, crypt)) return;
      buyVampireItem(s, playerId, cmd.itemId);
      break;
    }
    case "upgradeVampireItem": {
      if (playerId !== VAMPIRE_PLAYER_ID || !VAMPIRE_ITEM_IDS.includes(cmd.itemId)) return;
      if ((s.vampire.items[cmd.itemId] ?? 0) < 1) return;
      buyVampireItem(s, playerId, cmd.itemId);
      break;
    }
    case "buyVampireSkill": {
      if (playerId !== VAMPIRE_PLAYER_ID || !Object.hasOwn(VAMPIRE_SKILLS, cmd.skillId)) return;
      const vampire = s.units.find((u) => u.kind === "vampire" && u.owner === playerId && !u.dead);
      const crypt = buildingById(s, cmd.cryptId);
      if (!vampire || !crypt || crypt.kind !== "crypt") return;
      if (vampireShopAccess(s.phase, vampire, crypt)) return;
      const skill = VAMPIRE_SKILLS[cmd.skillId];
      if (s.vampire.skills[cmd.skillId] || s.vampire.blood < skill.unlockCost) return;
      s.vampire.blood -= skill.unlockCost;
      s.vampire.skills[cmd.skillId] = { cd: 0, buff: 0 };
      break;
    }
    case "castVampireSkill": {
      if (playerId !== VAMPIRE_PLAYER_ID || !Object.hasOwn(VAMPIRE_SKILLS, cmd.skillId)) return;
      const vampire = s.units.find((u) => u.kind === "vampire" && u.owner === playerId && !u.dead);
      const state = s.vampire.skills[cmd.skillId];
      if (!vampire || !state || state.cd > 0) return;
      if (!vampireCanCast(s)) return;
      const skill = VAMPIRE_SKILLS[cmd.skillId];
      state.buff = skill.duration;
      state.cd = skill.cooldown;
      break;
    }
    case "castVampireAbility": {
      if (playerId !== VAMPIRE_PLAYER_ID) return;
      const vampire = s.units.find((u) => u.kind === "vampire" && u.owner === playerId && !u.dead);
      if (!vampire || !Object.hasOwn(VAMPIRE_ABILITIES, cmd.ability)) return;
      if (!vampireCanCast(s)) return;
      if (cmd.ability === "revealArea") {
        if (s.phase !== "night" || (s.vampire.revealUses ?? 0) <= 0) return;
        if (!Number.isFinite(cmd.x) || !Number.isFinite(cmd.z)) return;
        const ability = VAMPIRE_ABILITIES.revealArea;
        s.vampire.reveal = {
          x: cmd.x,
          z: cmd.z,
          remaining: ability.duration,
          radius: ability.radius ?? DEFAULT_REVEAL_RADIUS
        };
        s.vampire.revealUses = (s.vampire.revealUses ?? 0) - 1;
      } else if (cmd.ability === "batForm") {
        if (vampireInBatForm(s)) {
          if (VAMPIRE_ABILITIES.batForm.cancellable === true) clearVampireStatus(s, "batForm");
          return;
        }
        setVampireStatus(s, "batForm", VAMPIRE_ABILITIES.batForm.maxDuration);
      } else if (cmd.ability === "teleportHome") {
        if (vampireStatus(s, "channelingTeleport") > 0) return;
        setVampireStatus(s, "channelingTeleport", VAMPIRE_ABILITIES.teleportHome.channelTime);
      } else {
        return;
      }
      break;
    }
    case "admin": {
      if (!s.practice) return;
      const player = s.players.find((p) => p.id === playerId);
      if (!player) return;
      if (cmd.action === "resources") {
        if (![cmd.wood, cmd.gold].every((n) => Number.isSafeInteger(n) && n >= 0 && n <= GAME_CONFIG.admin.maxResourceAmount)) return;
        player.wood += cmd.wood;
        player.gold += cmd.gold;
      } else if (cmd.action === "blood") {
        if (playerId !== VAMPIRE_PLAYER_ID) return;
        if (!Number.isSafeInteger(cmd.amount) || cmd.amount < 0 || cmd.amount > GAME_CONFIG.admin.maxResourceAmount) return;
        s.vampire.blood += cmd.amount;
      } else if (cmd.action === "phase" && (cmd.phase === "day" || cmd.phase === "night")) {
        s.phase = cmd.phase;
        s.phaseTime = cmd.phase === "day" ? DAY_LENGTH : NIGHT_LENGTH;
        if (cmd.phase === "night") s.vampire.revealUses = 1;
      } else if (cmd.action === "heal") {
        for (const unit of s.units) if (unit.owner === playerId && !unit.dead) unit.hp = unit.maxHp;
      }
      break;
    }
    case "move": {
      if (!Number.isFinite(cmd.x) || !Number.isFinite(cmd.z)) return;
      const units = s.units.filter((u) => !u.dead && u.owner === playerId && cmd.ids.includes(u.id));
      const width = Math.ceil(Math.sqrt(units.length));
      for (const [i, u] of units.entries()) {
        const x = Math.max(-WORLD.half + 1, Math.min(WORLD.half - 1, cmd.x + (i % width - (width - 1) / 2) * INTERACTION.formationSpacing));
        const z = Math.max(-WORLD.half + 1, Math.min(WORLD.half - 1, cmd.z + (Math.floor(i / width) - (Math.ceil(units.length / width) - 1) / 2) * INTERACTION.formationSpacing));
        u.order = { t: "move", x, z };
        u.gatherNodeId = null;
      }
      break;
    }
    case "gather": {
      const node = s.nodes.find((n) => n.id === cmd.nodeId && n.amount > 0);
      const mine = node ? void 0 : s.buildings.find((b) => b.id === cmd.nodeId && b.kind === "goldMine" && b.done && b.hp > 0 && b.owner === playerId);
      if (!node && !mine) return;
      const resource = node ? node.kind : "gold";
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId && u.kind === "worker" && canGatherRole(u.workerRole, resource)) {
          u.order = { t: "gather", targetId: cmd.nodeId };
          u.gatherNodeId = cmd.nodeId;
        }
      }
      break;
    }
    case "attack": {
      const target = unitById(s, cmd.targetId) ?? buildingById(s, cmd.targetId);
      if (!target) return;
      if (target.owner < 0 || target.owner === VAMPIRE_PLAYER_ID === (playerId === VAMPIRE_PLAYER_ID)) return;
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId) {
          u.order = { t: "attack", targetId: cmd.targetId };
        }
      }
      break;
    }
    case "build": {
      if (!BUILDABLE.includes(cmd.kind)) return;
      const p = s.players.find((pl) => pl.id === playerId);
      if (!p || p.role !== "human") return;
      const builders = s.units.filter((u) => !u.dead && u.owner === playerId && u.kind === "worker" && cmd.ids.includes(u.id) && canBuildKind(u, cmd.kind));
      if (!builders.length) return;
      const cost = BUILD_COSTS[cmd.kind];
      if (!cost) return;
      const limit = SPEC_ENTITY_LIMITS[cmd.kind];
      if (limit !== void 0 && s.buildings.filter((b2) => b2.owner === playerId && b2.kind === cmd.kind).length >= limit) return;
      if (p.wood < cost.wood || p.gold < cost.gold) return;
      if (!canPlace(session, cmd.kind, cmd.x, cmd.z)) return;
      p.wood -= cost.wood;
      p.gold -= cost.gold;
      const hpByKind = {
        bank: BANK.hp,
        taverna: TAVERNA.hp,
        wall: WALL.hp,
        tower: TOWER.hp,
        keep: KEEP.hp,
        goldMine: GAME_CONFIG.buildings.goldMine.hp,
        market: GAME_CONFIG.buildings.market.hp
      };
      const b = {
        id: nextEntityId(s),
        kind: cmd.kind,
        owner: playerId,
        x: cmd.x,
        z: cmd.z,
        hp: 1,
        maxHp: hpByKind[cmd.kind] ?? 100,
        level: 1,
        progress: 0,
        done: false,
        builderId: builders[0].id,
        goldAcc: 0,
        attackCd: 0
      };
      s.buildings.push(b);
      for (const uid of cmd.ids) {
        const u = unitById(s, uid);
        if (u && u.owner === playerId && u.kind === "worker" && canBuildKind(u, cmd.kind)) {
          u.order = { t: "build", targetId: b.id };
          u.gatherNodeId = null;
        }
      }
      break;
    }
    case "resumeBuild": {
      const site = buildingById(s, cmd.targetId);
      if (!site || site.done || site.owner !== playerId) return;
      for (const u of s.units) {
        if (!u.dead && u.owner === playerId && u.kind === "worker" && cmd.ids.includes(u.id) && canBuildKind(u, site.kind)) {
          u.order = { t: "build", targetId: site.id };
          u.gatherNodeId = null;
        }
      }
      break;
    }
    case "demolish": {
      const p = s.players.find((pl) => pl.id === playerId);
      if (!p || p.role !== "human") return;
      const b = buildingById(s, cmd.targetId);
      if (!b || b.owner !== playerId) return;
      for (const u of s.units) {
        if (u.dead || u.owner !== playerId) continue;
        if (u.order?.targetId === b.id || u.gatherNodeId === b.id) {
          u.order = null;
          u.gatherNodeId = null;
        }
      }
      s.buildings = s.buildings.filter((bb) => bb.id !== b.id);
      break;
    }
    case "repair": {
      const wall = buildingById(s, cmd.targetId);
      if (!wall || !wall.done || wall.owner !== playerId || wall.kind !== "wall") return;
      if (wall.hp >= wall.maxHp) return;
      let any = false;
      for (const u of s.units) {
        if (!u.dead && u.owner === playerId && u.kind === "worker" && cmd.ids.includes(u.id) && canRepairRole(u.workerRole)) {
          u.order = { t: "repair", targetId: wall.id };
          u.gatherNodeId = null;
          any = true;
        }
      }
      if (!any) return;
      break;
    }
    case "upgrade": {
      const b = buildingById(s, cmd.targetId);
      if (b) tryUpgradeBuilding(s, playerId, b);
      break;
    }
    case "recruit": {
      const player = s.players.find((p) => p.id === playerId && p.role === "human");
      const tavern = buildingById(s, cmd.targetId);
      if (!player || !tavern || tavern.owner !== playerId || tavern.kind !== "taverna" || !tavern.done || tavern.recruitment) return;
      const role = cmd.role ?? "lumberjack";
      if (role !== "lumberjack" && role !== "miner" && role !== "repairer") return;
      if (countRole(s, playerId, role) >= SPEC_ENTITY_LIMITS[role]) return;
      const cost = workerTrainCost(role);
      if (player.gold < (cost.gold ?? 0) || player.wood < (cost.wood ?? 0)) return;
      player.gold -= cost.gold ?? 0;
      player.wood -= cost.wood ?? 0;
      const time = role === "repairer" ? repairerTrainingTime(playerWorkerLevel(s, playerId, "repairer")) : RECRUIT.time;
      tavern.recruitment = { remaining: time, total: time, role };
      break;
    }
    case "upgradeWorker": {
      const player = s.players.find((p) => p.id === playerId && p.role === "human");
      const tavern = buildingById(s, cmd.targetId);
      if (!player || !tavern || tavern.owner !== playerId || tavern.kind !== "taverna" || !tavern.done) return;
      const role = cmd.role;
      if (role !== "lumberjack" && role !== "miner" && role !== "repairer") return;
      const level = playerWorkerLevel(s, playerId, role);
      if (level >= workerMaxLevel(role)) return;
      const cost = workerUpgradeCost(role, level);
      if (!cost || player.gold < (cost.gold ?? 0) || player.wood < (cost.wood ?? 0)) return;
      player.gold -= cost.gold ?? 0;
      player.wood -= cost.wood ?? 0;
      player.workerLevels = { ...player.workerLevels ?? {}, [role]: level + 1 };
      break;
    }
    case "castHumanAbility": {
      const player = s.players.find((p) => p.id === playerId && p.role === "human");
      const hero = s.units.find((u) => u.owner === playerId && u.kind === "worker" && u.hero && !u.dead);
      if (!player || !hero || !Object.hasOwn(HUMAN_ABILITIES, cmd.ability)) return;
      if ((player.abilityCooldowns?.[cmd.ability] ?? 0) > 0) return;
      const ability = HUMAN_ABILITIES[cmd.ability];
      const vampire = s.units.find((u) => u.kind === "vampire" && !u.dead);
      const inRange = (target) => ability.range == null || dist(hero.x, hero.z, target.x, target.z) <= ability.range;
      if (cmd.ability === "entangle" || cmd.ability === "silencer") {
        if (!vampire || cmd.targetId !== vampire.id || !inRange(vampire)) return;
        setVampireStatus(s, cmd.ability === "entangle" ? "entangled" : "silenced", ability.duration ?? 0);
      } else if (cmd.ability === "fortify") {
        const target = unitById(s, cmd.targetId ?? -1) ?? buildingById(s, cmd.targetId ?? -1);
        if (!target || target.owner !== playerId) return;
        target.fortify = Math.max(target.fortify ?? 0, ability.duration ?? 0);
      } else if (cmd.ability === "teleport") {
        if (!Number.isFinite(cmd.x) || !Number.isFinite(cmd.z)) return;
        if (dist(hero.x, hero.z, cmd.x, cmd.z) > (ability.maxRange ?? 0)) return;
        if (!session.navigation.canStand(hero, cmd.x, cmd.z)) return;
        hero.x = cmd.x;
        hero.z = cmd.z;
        hero.order = null;
        hero.gatherNodeId = null;
      } else {
        return;
      }
      player.abilityCooldowns = { ...player.abilityCooldowns ?? {}, [cmd.ability]: ability.cooldown };
      break;
    }
    case "market": {
      const p = s.players.find((pl) => pl.id === playerId);
      if (!p || p.role !== "human") return;
      const market = buildingById(s, cmd.targetId);
      if (!market || market.kind !== "market" || market.owner !== playerId || !market.done) return;
      if (!Number.isSafeInteger(cmd.amount) || cmd.amount <= 0) return;
      const selling = cmd.trade === "woodToGold";
      if (!selling && cmd.trade !== "goldToWood") return;
      const units = Math.floor(cmd.amount / (selling ? MARKET.wood : MARKET.gold));
      if (units <= 0) return;
      if (selling && p.wood >= units * MARKET.wood) {
        p.wood -= units * MARKET.wood;
        p.gold += units * MARKET.gold;
      } else if (!selling && p.gold >= units * MARKET.gold) {
        p.gold -= units * MARKET.gold;
        p.wood += units * MARKET.wood;
      }
      break;
    }
  }
}
function updatePhase(s, dt) {
  s.phaseTime -= dt;
  if (s.phaseTime > 0) return;
  if (s.phase === "day") {
    s.phase = "night";
    s.phaseTime = NIGHT_LENGTH;
    s.vampire.revealUses = 1;
  } else {
    s.phase = "day";
    s.phaseTime = DAY_LENGTH;
    s.day++;
    if (s.day > SURVIVE_NIGHTS_TO_WIN) {
      s.result = { winner: "human", reason: `Os humanos sobreviveram a ${SURVIVE_NIGHTS_TO_WIN} noites!` };
    }
  }
}
function vampireSpeed(s) {
  const base = vampireEffectiveSpeed(s.phase, s.vampire.items);
  const bonus = vampireInBatForm(s) ? VAMPIRE_ABILITIES.batForm.moveSpeedBonus ?? 0 : 0;
  return base + bonus;
}
function vampireOutsideCrypt(s) {
  if (s.phase === "night") return false;
  const crypt = s.buildings.find((b) => b.kind === "crypt");
  if (!crypt) return false;
  const vamp = s.units.find((u) => u.kind === "vampire" && !u.dead);
  if (!vamp) return false;
  return dist(vamp.x, vamp.z, crypt.x, crypt.z) > CRYPT_RADIUS;
}
function updateGather(s, nav, u, dt, index) {
  const stats = workerStats(u);
  const rawNode = index.nodes.get(u.gatherNodeId ?? -1);
  const node = rawNode && rawNode.amount > 0 ? rawNode : void 0;
  const rawMine = node ? void 0 : index.buildings.get(u.gatherNodeId ?? -1);
  const mine = rawMine && rawMine.kind === "goldMine" && rawMine.done && rawMine.hp > 0 && rawMine.owner === u.owner ? rawMine : void 0;
  if (!node && !mine) {
    u.order = null;
    u.gatherNodeId = null;
    u.carrying = 0;
    u.carryRes = null;
    return;
  }
  const resource = node ? node.kind : "gold";
  const target = node ?? mine;
  const range = resource === "wood" ? INTERACTION.woodGatherRange : INTERACTION.goldGatherRange;
  const half = mine ? buildingHalf(mine) : 0;
  if (!nav.move(u, target.x, target.z, stats.speed, dt, range, half)) return;
  u.activity = "gathering";
  u.carryRes = resource;
  const rate = u.workerRole === "lumberjack" && resource === "wood" ? lumberjackGatherRate(playerWorkerLevel(s, u.owner, "lumberjack")) : u.workerRole === "miner" && mine ? minerGoldRate(mine.level) : stats.gatherRate;
  u.carrying += rate * dt;
  const whole = Math.floor(u.carrying + 1e-9);
  if (whole > 0) {
    const p = s.players.find((pl) => pl.id === u.owner);
    if (p) p[resource] = Math.round((p[resource] + whole) * 1e6) / 1e6;
    u.carrying -= whole;
  }
}
function updateAttackOrder(s, nav, u, dt, index) {
  const stats = workerStats(u);
  const rawUnit = index.units.get(u.order?.targetId ?? -1);
  const targetUnit = rawUnit && !rawUnit.dead ? rawUnit : void 0;
  const targetBuilding = index.buildings.get(u.order?.targetId ?? -1);
  const tx = targetUnit ? targetUnit.x : targetBuilding?.x;
  const tz = targetUnit ? targetUnit.z : targetBuilding?.z;
  if (tx === void 0 || tz === void 0) {
    u.order = null;
    return;
  }
  const range = u.kind === "vampire" ? VAMPIRE.attackRange : stats.attackRange;
  if (!nav.move(
    u,
    tx,
    tz,
    u.kind === "vampire" ? vampireSpeed(s) : stats.speed,
    dt,
    range,
    targetBuilding ? buildingHalf(targetBuilding) : 0
  )) {
    return;
  }
  u.activity = "attacking";
  if (u.attackCd > 0) return;
  u.attackCd = u.kind === "vampire" ? vampireEffectiveCooldown(s.vampire.items) : stats.attackCooldown;
  if (targetUnit) {
    if ((targetUnit.fortify ?? 0) > 0) return;
    if (targetUnit.kind === "vampire" && vampireInvulnerable(s)) return;
    const vampireDamage = (VAMPIRE.attackDamage + vampireItemBonuses(s.vampire.items).damage) * vampireSkillMultiplier(s.vampire.skills);
    const dmg = u.kind === "vampire" ? vampireDamage * (s.phase === "night" ? 1 : VAMPIRE.dayDamageMultiplier) : stats.attackDamage;
    targetUnit.hp -= dmg;
    if (u.kind === "vampire") creditVampireBloodFromDamage(s, dmg);
    if (targetUnit.hp <= 0) {
      targetUnit.dead = true;
      if (targetUnit.kind === "vampire") {
        s.result = { winner: "human", reason: "O vampiro foi destru\xEDdo pelos humanos!" };
      }
    }
  } else if (targetBuilding) {
    if ((targetBuilding.fortify ?? 0) > 0) return;
    const dmg = u.kind === "vampire" ? (VAMPIRE.attackDamageBuilding + vampireItemBonuses(s.vampire.items).damage) * vampireSkillMultiplier(s.vampire.skills) : stats.attackDamage;
    targetBuilding.hp -= dmg;
    if (u.kind === "vampire") creditVampireBloodFromDamage(s, dmg);
    if (targetBuilding.hp <= 0) {
      if (targetBuilding.kind === "crypt") return;
      s.buildings = s.buildings.filter((b) => b.id !== targetBuilding.id);
      index.buildings.delete(targetBuilding.id);
    }
  }
}
function updateBuild(s, nav, u, dt, index) {
  const stats = workerStats(u);
  const site = index.buildings.get(u.order?.targetId ?? -1);
  if (!site || site.done) {
    u.order = null;
    return;
  }
  if (!nav.move(u, site.x, site.z, stats.speed, dt, INTERACTION.buildRange, buildingHalf(site))) return;
  u.activity = "building";
  const totalWork = BUILD_COSTS[site.kind]?.time ?? 10;
  site.progress += stats.buildRate * dt / totalWork;
  site.hp = Math.max(site.hp, site.maxHp * site.progress);
  if (site.progress >= 1) {
    site.progress = 1;
    site.done = true;
    site.hp = site.maxHp;
    if (site.kind === "goldMine" && u.workerRole === "miner") {
      u.order = { t: "gather", targetId: site.id };
      u.gatherNodeId = site.id;
    } else {
      u.order = null;
    }
  }
}
function updateRepair(s, nav, u, dt, index) {
  const stats = workerStats(u);
  const wall = index.buildings.get(u.order?.targetId ?? -1);
  if (!wall || !wall.done || wall.kind !== "wall" || wall.hp >= wall.maxHp) {
    u.order = null;
    return;
  }
  if (!nav.move(u, wall.x, wall.z, stats.speed, dt, INTERACTION.buildRange, buildingHalf(wall))) return;
  u.activity = "repairing";
  wall.hp = Math.min(wall.maxHp, wall.hp + INTERACTION.repairRate * stats.buildRate * dt);
  if (wall.hp >= wall.maxHp) u.order = null;
}
function clampVampireToCrypt(s) {
  if (s.phase === "night") return;
  const crypt = s.buildings.find((b) => b.kind === "crypt");
  const vamp = s.units.find((u) => u.kind === "vampire" && !u.dead);
  if (!crypt || !vamp) return;
  const dx = vamp.x - crypt.x;
  const dz = vamp.z - crypt.z;
  const d = Math.hypot(dx, dz);
  if (d > CRYPT_RADIUS) {
    vamp.x = crypt.x + dx / d * CRYPT_RADIUS;
    vamp.z = crypt.z + dz / d * CRYPT_RADIUS;
  }
}
function updateUnits(session, dt, index) {
  const s = session.state;
  const nav = session.navigation;
  nav.refresh();
  const vampOut = vampireOutsideCrypt(s);
  for (const p of s.players) {
    if (!p.abilityCooldowns) continue;
    for (const key of Object.keys(p.abilityCooldowns)) {
      p.abilityCooldowns[key] = Math.max(0, (p.abilityCooldowns[key] ?? 0) - dt);
    }
  }
  for (const u of s.units) {
    if (u.dead) continue;
    u.activity = "idle";
    nav.recover(u);
    u.attackCd = Math.max(0, u.attackCd - dt);
    if ((u.fortify ?? 0) > 0) u.fortify = Math.max(0, (u.fortify ?? 0) - dt);
    const canAct = !(u.kind === "vampire" && vampOut);
    const canAttackStatus = u.kind !== "vampire" || vampireCanAttack(s);
    if (u.kind === "vampire") {
      const wasBatForm = vampireStatus(s, "batForm") > 0;
      const wasChanneling = vampireStatus(s, "channelingTeleport") > 0;
      if (s.vampire.statuses) {
        for (const key of Object.keys(s.vampire.statuses)) {
          s.vampire.statuses[key] = Math.max(0, (s.vampire.statuses[key] ?? 0) - dt);
        }
      }
      if (wasBatForm && vampireStatus(s, "batForm") <= 0) {
        setVampireStatus(s, "exitingBatForm", VAMPIRE_ABILITIES.batForm.exitDuration);
      }
      if (wasChanneling && vampireStatus(s, "channelingTeleport") <= 0) {
        completeVampireTeleport(s);
      }
      if (s.vampire.reveal) {
        s.vampire.reveal.remaining -= dt;
        if (s.vampire.reveal.remaining <= 0) s.vampire.reveal = null;
      }
    }
    if (u.kind === "vampire") {
      if (!vampOut) u.hp = Math.min(u.maxHp, u.hp + VAMPIRE.cryptRegen * dt);
      else if (s.phase === "night") u.hp = Math.min(u.maxHp, u.hp + VAMPIRE.nightRegen * dt);
    }
    if (u.kind === "vampire") {
      for (const id of Object.keys(s.vampire.skills)) {
        const skill = s.vampire.skills[id];
        skill.cd = Math.max(0, skill.cd - dt);
        skill.buff = Math.max(0, skill.buff - dt);
      }
    }
    const o = u.order;
    if (!o) continue;
    if (!canAct && o.t !== "move") {
      continue;
    }
    switch (o.t) {
      case "move":
        if (nav.move(u, o.x, o.z, u.kind === "vampire" ? vampireSpeed(s) : workerStats(u).speed, dt)) {
          u.order = null;
        }
        break;
      case "gather":
        updateGather(s, nav, u, dt, index);
        break;
      case "attack":
        if (canAct && canAttackStatus) updateAttackOrder(s, nav, u, dt, index);
        break;
      case "build":
        updateBuild(s, nav, u, dt, index);
        break;
      case "repair":
        updateRepair(s, nav, u, dt, index);
        break;
      case "upgrade":
        u.order = null;
        break;
    }
  }
  nav.separate(s.units.filter((u) => !u.dead));
  clampVampireToCrypt(s);
}
function updateEconomy(s, dt) {
  for (const b of s.buildings) {
    if ((b.fortify ?? 0) > 0) b.fortify = Math.max(0, (b.fortify ?? 0) - dt);
    if (!b.done) continue;
    if (b.kind === "bank") {
      b.goldAcc += dt;
      if (b.goldAcc + 1e-9 < BANK_CYCLE_SECONDS) continue;
      const cycles = Math.floor((b.goldAcc + 1e-9) / BANK_CYCLE_SECONDS);
      const whole = cycles * bankProduction(b.level);
      b.goldAcc -= cycles * BANK_CYCLE_SECONDS;
      const p = s.players.find((pl) => pl.id === b.owner);
      if (p) {
        p.gold += whole;
        b.goldProduced = (b.goldProduced ?? 0) + whole;
      }
    } else if (b.kind === "crypt") {
      b.goldAcc += dt;
      if (b.goldAcc + 1e-9 < CRYPT_CYCLE_SECONDS) continue;
      const cycles = Math.floor((b.goldAcc + 1e-9) / CRYPT_CYCLE_SECONDS);
      const whole = cycles * cryptProduction(b.level);
      b.goldAcc -= cycles * CRYPT_CYCLE_SECONDS;
      s.vampire.blood += whole;
      b.goldProduced = (b.goldProduced ?? 0) + whole;
    }
  }
}
function updateRecruitment(session, dt) {
  const s = session.state;
  for (const tavern of s.buildings) {
    if (tavern.kind !== "taverna" || !tavern.done || !tavern.recruitment) continue;
    tavern.recruitment.remaining = Math.max(0, tavern.recruitment.remaining - dt);
    if (tavern.recruitment.remaining > 1e-7) continue;
    const half = buildingHalf(tavern);
    let spawn = null;
    for (let r = half + 1; r <= half + INTERACTION.recruitSpawnExtraRadius && !spawn; r += 1) {
      for (let i = 0; i < 24; i++) {
        const angle = i * Math.PI / 12;
        const x = tavern.x + Math.sin(angle) * r, z = tavern.z + Math.cos(angle) * r;
        if (session.navigation.canStand({ kind: "worker" }, x, z) && !s.units.some((u) => !u.dead && Math.hypot(u.x - x, u.z - z) < INTERACTION.recruitSpawnClearance)) {
          spawn = { x, z };
          break;
        }
      }
    }
    if (!spawn) continue;
    s.units.push({
      id: nextEntityId(s),
      kind: "worker",
      hero: false,
      workerRole: tavern.recruitment.role ?? "lumberjack",
      owner: tavern.owner,
      ...spawn,
      hp: PEON.hp,
      maxHp: PEON.hp,
      order: null,
      activity: "idle",
      carrying: 0,
      carryRes: null,
      gatherNodeId: null,
      attackCd: 0,
      dead: false
    });
    tavern.recruitment = null;
  }
}
function updateTowers(s, dt) {
  const vamp = s.units.find((u) => u.kind === "vampire" && !u.dead);
  if (!vamp) return;
  for (const b of s.buildings) {
    if (b.kind !== "tower" || !b.done) continue;
    b.attackCd = Math.max(0, b.attackCd - dt);
    if (dist(b.x, b.z, vamp.x, vamp.z) > TOWER.range) continue;
    if (b.attackCd > 0) continue;
    if (vampireInvulnerable(s)) continue;
    b.attackCd = TOWER.cooldown;
    const damage = towerDamage(b.level);
    vamp.hp -= damage;
    b.lastShot = { tick: s.tick, targetId: vamp.id, x: vamp.x, z: vamp.z, damage };
    if (vamp.hp <= 0) {
      vamp.dead = true;
      s.result = { winner: "human", reason: "As defesas da vila destru\xEDram o vampiro!" };
      return;
    }
  }
}
function updateVictory(s) {
  if (s.result) return;
  const vamp = s.units.find((u) => u.kind === "vampire" && !u.dead);
  if (!vamp) {
    s.result = { winner: "human", reason: "O vampiro foi eliminado!" };
    return;
  }
  const humansAlive = s.players.filter((p) => p.role === "human");
  if (s.practice && humansAlive.length === 0) return;
  const anyWorker = s.units.some((u) => u.kind === "worker" && !u.dead);
  if (!anyWorker) {
    s.result = { winner: "vampire", reason: "Todos os humanos foram ca\xE7ados. Sangue e liberdade." };
    void humansAlive;
  }
}
function step(session, commands) {
  const s = session.state;
  for (const { playerId, cmd } of commands) {
    applyCommand(session, playerId, cmd);
  }
  if (s.result) {
    s.tick++;
    return;
  }
  const index = buildTickIndex(s);
  updatePhase(s, DT);
  updateUnits(session, DT, index);
  updateEconomy(s, DT);
  updateRecruitment(session, DT);
  updateTowers(s, DT);
  updateVictory(s);
  s.time += DT;
  s.tick++;
}
function makeSnapshot(s, includeNodes = true) {
  return {
    practice: s.practice ?? false,
    tick: s.tick,
    time: s.time,
    phase: s.phase,
    phaseTime: s.phaseTime,
    day: s.day,
    result: s.result,
    units: s.units.filter((u) => !u.dead).map((u) => ({
      id: u.id,
      kind: u.kind,
      hero: u.hero,
      workerRole: u.workerRole,
      owner: u.owner,
      x: Math.round(u.x * 100) / 100,
      z: Math.round(u.z * 100) / 100,
      hp: Math.round(u.hp),
      maxHp: u.maxHp,
      carrying: Math.floor(u.carrying + 1e-7),
      carryRes: u.carryRes,
      activity: u.activity,
      orderType: u.order?.t ?? null,
      targetId: u.order?.targetId ?? null
    })),
    buildings: s.buildings.map((b) => ({
      id: b.id,
      kind: b.kind,
      owner: b.owner,
      x: b.x,
      z: b.z,
      hp: Math.round(b.hp),
      maxHp: b.maxHp,
      level: b.level,
      progress: Math.round(b.progress * 100) / 100,
      done: b.done,
      goldProduced: b.goldProduced ?? 0,
      lastShot: b.lastShot ? { ...b.lastShot } : void 0,
      recruitment: b.recruitment ? { ...b.recruitment } : null
    })),
    nodes: includeNodes ? s.nodes.filter((n) => n.amount > 0) : [],
    players: s.players.map((p) => ({
      id: p.id,
      wood: Math.floor(p.wood),
      gold: Math.floor(p.gold),
      alive: p.alive,
      workerLevels: p.workerLevels ? { ...p.workerLevels } : void 0,
      abilityCooldowns: p.abilityCooldowns ? Object.fromEntries(Object.entries(p.abilityCooldowns).map(([k, v]) => [k, Math.round(v * 10) / 10])) : void 0
    })),
    blood: s.vampire.blood,
    vampireItems: { ...s.vampire.items },
    vampireSkills: Object.fromEntries(
      Object.entries(s.vampire.skills).map(([id, v]) => [id, { cd: Math.round(v.cd * 10) / 10, buff: Math.round(v.buff * 10) / 10 }])
    ),
    vampireStatuses: s.vampire.statuses ? Object.fromEntries(Object.entries(s.vampire.statuses).map(([k, v]) => [k, Math.round((v ?? 0) * 10) / 10])) : void 0,
    vampireReveal: s.vampire.reveal ? { ...s.vampire.reveal, remaining: Math.round(s.vampire.reveal.remaining * 10) / 10 } : null,
    vampireRevealUses: s.vampire.revealUses ?? 0
  };
}

// src/rooms.ts
import { randomUUID } from "node:crypto";
var rooms = /* @__PURE__ */ new Map();
var MAX_COMMANDS_PER_PLAYER_PER_TICK = 32;
function genCode() {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < GAME_CONFIG.lobby.codeLength; i++) code += abc[Math.floor(Math.random() * abc.length)];
  return rooms.has(code) ? genCode() : code;
}
function createRoom() {
  const code = genCode();
  const room = {
    code,
    hostId: null,
    clients: [],
    status: "lobby",
    session: null,
    seed: MAP_SEED,
    queue: [],
    cmdCount: /* @__PURE__ */ new Map(),
    nodeAmounts: /* @__PURE__ */ new Map()
  };
  rooms.set(code, room);
  return room;
}
function getRoom(code) {
  return rooms.get(code.toUpperCase().trim());
}
function joinRoom(room, ws, name) {
  if (room.status !== "lobby") return { error: "Partida em andamento" };
  if (room.clients.length >= MAX_PLAYERS) return { error: "Sala cheia" };
  if (room.clients.some((c) => c.ws === ws)) return { error: "Voc\xEA j\xE1 est\xE1 nesta sala" };
  const client = {
    id: randomUUID(),
    ws,
    playerId: -1,
    name: name.trim().slice(0, 24) || `Jogador ${room.clients.length + 1}`,
    role: null,
    ready: false
  };
  room.clients.push(client);
  room.hostId ??= client.id;
  return client;
}
function chooseRole(room, client, role) {
  if (room.status !== "lobby") return "A partida j\xE1 come\xE7ou";
  if (role !== "human" && role !== "vampire") return "Equipe inv\xE1lida";
  if (client.role === role) return null;
  const count = room.clients.filter((c) => c.id !== client.id && c.role === role).length;
  if (count >= (role === "vampire" ? 1 : MAX_HUMANS)) return role === "vampire" ? "Outro jogador j\xE1 escolheu Vampiro" : "A equipe humana est\xE1 cheia";
  client.role = role;
  client.ready = false;
  return null;
}
function setReady(room, client, ready) {
  if (room.status !== "lobby") return "A partida j\xE1 come\xE7ou";
  if (typeof ready !== "boolean") return "Confirma\xE7\xE3o inv\xE1lida";
  if (!client.role) return "Escolha Humano ou Vampiro antes de ficar pronto";
  client.ready = ready;
  return null;
}
function startReason(room) {
  if (room.status !== "lobby") return "A partida j\xE1 come\xE7ou";
  if (room.clients.length === 0) return "A sala est\xE1 vazia";
  if (room.clients.some((c) => c.role === null)) return "Todos precisam escolher uma equipe";
  if (room.clients.length === 1) return room.clients[0].ready ? null : "Marque Pronto para iniciar um teste solo";
  if (room.clients.filter((c) => c.role === "vampire").length !== 1) return "Um jogador precisa escolher Vampiro";
  if (!room.clients.some((c) => c.role === "human")) return "A sala precisa de pelo menos um Humano";
  if (room.clients.some((c) => !c.ready)) return "Aguardando todos ficarem prontos";
  return null;
}
function startRoom(room, requesterId) {
  if (requesterId !== room.hostId || startReason(room)) return false;
  const names = Array.from({ length: MAX_PLAYERS }, (_, id) => id === VAMPIRE_PLAYER_ID ? "Vampiro" : `Humano ${id + 1}`);
  let humanId = 0;
  for (const c of room.clients) {
    c.playerId = c.role === "vampire" ? VAMPIRE_PLAYER_ID : humanId++;
    names[c.playerId] = c.name;
  }
  const playerIds = room.clients.map((c) => c.playerId);
  const solo = room.clients.length === 1;
  if (solo && room.clients[0].role === "vampire") {
    playerIds.push(0);
    names[0] = "Humano (treino)";
  }
  room.session = createSession(names, room.seed, playerIds);
  room.session.state.practice = solo;
  room.nodeAmounts.clear();
  for (const node of room.session.state.nodes) room.nodeAmounts.set(node.id, node.amount);
  room.status = "playing";
  return true;
}
function activeNodes(room) {
  return room.session?.state.nodes.filter((n) => n.amount > 0) ?? [];
}
function changedNodes(room) {
  if (!room.session) return [];
  const changed = [];
  for (const node of room.session.state.nodes) {
    if (room.nodeAmounts.get(node.id) === node.amount) continue;
    room.nodeAmounts.set(node.id, node.amount);
    changed.push({ id: node.id, amount: node.amount });
  }
  return changed;
}
function leaveRoom(room, ws) {
  room.clients = room.clients.filter((c) => c.ws !== ws);
  if (!room.clients.some((c) => c.id === room.hostId)) room.hostId = room.clients[0]?.id ?? null;
  if (!room.clients.length) rooms.delete(room.code);
}
function broadcastLobby(room) {
  const message = JSON.stringify({ type: "lobby", lobby: lobbyInfo(room) });
  for (const client of room.clients) if (client.ws.readyState === 1) client.ws.send(message);
}
function stepRoom(room) {
  if (room.status !== "playing" || !room.session) return;
  const commands = room.queue;
  room.queue = [];
  room.cmdCount.clear();
  step(room.session, commands);
  const snap = makeSnapshot(room.session.state, false);
  snap.nodes = void 0;
  const payload = JSON.stringify({ type: "snap", snap });
  for (const c of room.clients) {
    if (c.ws.readyState === 1 && c.ws.bufferedAmount === 0) c.ws.send(payload);
  }
  const nodes = changedNodes(room);
  if (nodes.length) {
    const nodePayload = JSON.stringify({ type: "nodes", nodes });
    for (const c of room.clients) if (c.ws.readyState === 1) c.ws.send(nodePayload);
  }
  if (room.session.state.result) {
    room.status = "ended";
    room.endedAt = Date.now();
    const res = JSON.stringify({ type: "result", result: room.session.state.result });
    for (const c of room.clients) {
      if (c.ws.readyState === 1) c.ws.send(res);
    }
  }
}
var ENDED_ROOM_TTL_MS = 5 * 6e4;
function purgeRooms(now = Date.now()) {
  for (const [code, room] of rooms) {
    if (room.clients.length === 0) {
      rooms.delete(code);
      continue;
    }
    if (room.status === "ended" && room.endedAt !== void 0 && now - room.endedAt > ENDED_ROOM_TTL_MS) {
      for (const c of room.clients) {
        try {
          c.ws.close(1e3, "partida encerrada");
        } catch {
        }
      }
      rooms.delete(code);
    }
  }
}
function queueCommand(room, playerId, cmd) {
  if (room.status !== "playing") return;
  const used = room.cmdCount.get(playerId) ?? 0;
  if (used >= MAX_COMMANDS_PER_PLAYER_PER_TICK) return;
  room.cmdCount.set(playerId, used + 1);
  room.queue.push({ playerId, cmd });
}
function lobbyInfo(room) {
  return {
    code: room.code,
    hostId: room.hostId,
    players: room.clients.map(({ id, playerId, name, role, ready }) => ({ id, playerId, name, role, ready })),
    seed: room.seed,
    canStart: startReason(room) === null,
    startReason: startReason(room)
  };
}

// src/index.ts
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var PORT = Number(process.env.PORT ?? 3e3);
var CLIENT_DIST = path.resolve(__dirname, "../../client/dist");
var MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".glb": "model/gltf-binary",
  ".fbx": "application/octet-stream",
  ".wasm": "application/wasm"
};
var COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml|wasm)|image\/svg)/;
var MAX_COMPRESS_BYTES = 4e6;
var statCache = /* @__PURE__ */ new Map();
var compressedCache = /* @__PURE__ */ new Map();
async function statFile(full) {
  const cached = statCache.get(full);
  if (cached) return cached;
  try {
    const st = await fsp.stat(full);
    if (!st.isFile()) return null;
    const type = MIME[path.extname(full).toLowerCase()] ?? "application/octet-stream";
    const entry = { size: st.size, mtimeMs: st.mtimeMs, type, etag: `W/"${st.size}-${Math.floor(st.mtimeMs)}"` };
    statCache.set(full, entry);
    return entry;
  } catch {
    return null;
  }
}
function cacheControlFor(full) {
  const base = path.basename(full);
  if (base === "index.html") return "no-cache";
  if (/-[A-Za-z0-9_]{8}\.(js|css|woff2?)$/.test(base)) return "public, max-age=31536000, immutable";
  return "public, max-age=86400";
}
function chooseEncoding(req) {
  const accept = String(req.headers["accept-encoding"] ?? "");
  if (/\bbr\b/.test(accept)) return "br";
  if (/\bgzip\b/.test(accept)) return "gzip";
  return null;
}
function compress(raw, enc) {
  return new Promise((resolve, reject) => {
    const done = (err, out) => err ? reject(err) : resolve(out);
    if (enc === "br") zlib.brotliCompress(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } }, done);
    else zlib.gzip(raw, { level: 6 }, done);
  });
}
async function sendFile(req, res, full, entry) {
  const method = req.method ?? "GET";
  const cacheControl = cacheControlFor(full);
  const headers = {
    "Content-Type": entry.type,
    "Content-Length": entry.size,
    ETag: entry.etag,
    "Last-Modified": new Date(entry.mtimeMs).toUTCString(),
    "Cache-Control": cacheControl,
    "X-Content-Type-Options": "nosniff"
  };
  const ifNoneMatch = req.headers["if-none-match"];
  if (ifNoneMatch && String(ifNoneMatch).split(",").some((tag) => tag.trim() === entry.etag)) {
    res.writeHead(304, { ETag: entry.etag, "Cache-Control": cacheControl });
    res.end();
    return;
  }
  const enc = COMPRESSIBLE.test(entry.type) && entry.size <= MAX_COMPRESS_BYTES ? chooseEncoding(req) : null;
  if (enc) {
    const key = `${full}|${enc}|${entry.etag}`;
    let body = compressedCache.get(key);
    if (!body) {
      body = await compress(await fsp.readFile(full), enc);
      compressedCache.set(key, body);
    }
    headers["Content-Encoding"] = enc;
    headers.Vary = "Accept-Encoding";
    headers["Content-Length"] = body.length;
    res.writeHead(200, headers);
    if (method === "HEAD") res.end();
    else res.end(body);
    return;
  }
  res.writeHead(200, headers);
  if (method === "HEAD") {
    res.end();
    return;
  }
  createReadStream(full).on("error", () => res.destroy()).pipe(res);
}
function send404(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 Not Found");
}
async function handleRequest(req, res) {
  const method = req.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return;
  }
  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url ?? "/").split("?")[0] || "/");
  } catch {
    res.writeHead(400).end("Bad Request");
    return;
  }
  const rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const full = path.resolve(CLIENT_DIST, rel);
  if (full !== CLIENT_DIST && !full.startsWith(CLIENT_DIST + path.sep)) {
    send404(res);
    return;
  }
  const entry = await statFile(full);
  if (entry) {
    await sendFile(req, res, full, entry);
    return;
  }
  if (!path.extname(urlPath)) {
    const indexFull = path.join(CLIENT_DIST, "index.html");
    const indexEntry = await statFile(indexFull);
    if (indexEntry) {
      await sendFile(req, res, indexFull, indexEntry);
      return;
    }
  }
  if (urlPath === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, game: "vampire-x-humans" }));
    return;
  }
  send404(res);
}
var server = http.createServer((req, res) => {
  handleRequest(req, res).catch((error) => {
    console.warn("[vampire] erro no HTTP:", error);
    if (!res.headersSent) res.writeHead(500, { "Content-Type": "text/plain" });
    res.end();
  });
});
var wss = new WebSocketServer({ server, maxPayload: 64 * 1024 });
var clientRoom = /* @__PURE__ */ new Map();
var alive = /* @__PURE__ */ new WeakSet();
var joinAttempts = /* @__PURE__ */ new WeakMap();
var JOIN_ATTEMPT_LIMIT = 20;
var JOIN_WINDOW_MS = 1e4;
function allowJoinAttempt(ws) {
  const now = Date.now();
  const record = joinAttempts.get(ws);
  if (!record || now > record.resetAt) {
    joinAttempts.set(ws, { count: 1, resetAt: now + JOIN_WINDOW_MS });
    return true;
  }
  record.count++;
  return record.count <= JOIN_ATTEMPT_LIMIT;
}
wss.on("connection", (ws) => {
  alive.add(ws);
  ws.on("pong", () => alive.add(ws));
  ws.on("error", (error) => {
    console.warn("[vampire] erro na conex\xE3o WebSocket:", error.message);
    ws.terminate();
  });
  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(String(raw));
    } catch {
      return;
    }
    if (!msg || typeof msg !== "object") return;
    const error = (message) => ws.send(JSON.stringify({ type: "error", message }));
    if (msg.type === "create") {
      if (!allowJoinAttempt(ws)) {
        error("Muitas tentativas. Aguarde alguns segundos.");
        ws.close(1008, "rate limit");
        return;
      }
      if (clientRoom.has(ws)) {
        error("Saia da sala atual antes de criar outra");
        return;
      }
      const room = createRoom();
      const client = joinRoom(room, ws, String(msg.name ?? ""));
      if ("error" in client) return;
      clientRoom.set(ws, room);
      ws.send(JSON.stringify({ type: "created", clientId: client.id, playerId: client.playerId, lobby: lobbyInfo(room) }));
      return;
    }
    if (msg.type === "join") {
      if (!allowJoinAttempt(ws)) {
        error("Muitas tentativas. Aguarde alguns segundos.");
        ws.close(1008, "rate limit");
        return;
      }
      if (clientRoom.has(ws)) {
        error("Voc\xEA j\xE1 est\xE1 em uma sala");
        return;
      }
      const room = getRoom(String(msg.code ?? ""));
      if (!room) {
        ws.send(JSON.stringify({ type: "error", message: "Sala n\xE3o encontrada" }));
        return;
      }
      const client = joinRoom(room, ws, String(msg.name ?? ""));
      if ("error" in client) {
        ws.send(JSON.stringify({ type: "error", message: client.error }));
        return;
      }
      clientRoom.set(ws, room);
      ws.send(JSON.stringify({ type: "joined", clientId: client.id, playerId: client.playerId, lobby: lobbyInfo(room) }));
      broadcastLobby(room);
      return;
    }
    if (msg.type === "leave") {
      const room = clientRoom.get(ws);
      if (room?.status !== "lobby") {
        error("S\xF3 \xE9 poss\xEDvel sair pelo lobby antes da partida");
        return;
      }
      leaveRoom(room, ws);
      clientRoom.delete(ws);
      ws.send(JSON.stringify({ type: "left" }));
      broadcastLobby(room);
      return;
    }
    if (msg.type === "role" || msg.type === "ready") {
      const room = clientRoom.get(ws);
      const client = room?.clients.find((c) => c.ws === ws);
      if (!room || !client) {
        error("Entre em uma sala primeiro");
        return;
      }
      const message = msg.type === "role" ? chooseRole(room, client, msg.role) : setReady(room, client, msg.ready);
      if (message) error(message);
      else broadcastLobby(room);
      return;
    }
    if (msg.type === "start") {
      const room = clientRoom.get(ws);
      const client = room?.clients.find((c) => c.ws === ws);
      if (!room || !client) {
        error("Entre em uma sala primeiro");
        return;
      }
      if (client.id !== room.hostId) {
        error("Somente o anfitri\xE3o pode iniciar");
        return;
      }
      if (!startRoom(room, client.id)) {
        error(startReason(room) ?? "N\xE3o foi poss\xEDvel iniciar");
        return;
      }
      for (const c of room.clients) if (c.ws.readyState === 1) c.ws.send(JSON.stringify({
        type: "started",
        playerId: c.playerId,
        seed: room.seed,
        lobby: lobbyInfo(room),
        nodes: activeNodes(room)
      }));
      return;
    }
    if (msg.type === "cmd") {
      const room = clientRoom.get(ws);
      if (!room || !msg.command) return;
      const client = room.clients.find((c) => c.ws === ws);
      if (!client) return;
      queueCommand(room, client.playerId, msg.command);
      return;
    }
  });
  ws.on("close", () => {
    const room = clientRoom.get(ws);
    if (room) {
      leaveRoom(room, ws);
      clientRoom.delete(ws);
      if (room.status === "lobby") {
        broadcastLobby(room);
      }
    }
  });
});
var HEARTBEAT_MS = 3e4;
var heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (!alive.has(ws)) {
      ws.terminate();
      continue;
    }
    alive.delete(ws);
    ws.ping();
  }
}, HEARTBEAT_MS);
var TICK_MS = 1e3 / TICK_RATE;
var lastSlowTickLog = -Infinity;
var tickTimer = setInterval(() => {
  const started = performance.now();
  let slowestRoom = "";
  let slowestMs = 0;
  for (const room of rooms.values()) {
    const roomStarted = performance.now();
    try {
      stepRoom(room);
    } catch (error) {
      console.error(`[vampire] erro ao simular a sala ${room.code}:`, error);
    }
    const duration = performance.now() - roomStarted;
    if (duration > slowestMs) {
      slowestMs = duration;
      slowestRoom = room.code;
    }
  }
  const elapsed = performance.now() - started;
  purgeRooms();
  if (elapsed > TICK_MS && started - lastSlowTickLog >= 5e3) {
    lastSlowTickLog = started;
    console.warn(`[vampire] tick lento: ${elapsed.toFixed(1)}ms (limite ${TICK_MS.toFixed(1)}ms); sala ${slowestRoom}: ${slowestMs.toFixed(1)}ms`);
  }
}, TICK_MS);
function shutdown(signal) {
  console.log(`[vampire] ${signal} recebido; encerrando...`);
  clearInterval(tickTimer);
  clearInterval(heartbeat);
  for (const ws of wss.clients) ws.close(1001, "servidor encerrando");
  wss.close();
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 5e3).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
server.listen(PORT, () => {
  console.log(`[vampire] servidor em http://localhost:${PORT}`);
  console.log(`[vampire] ws pronto \u2014 crie uma sala pelo cliente`);
});
