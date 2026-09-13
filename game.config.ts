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
/**
 * Estilo do relevo que cerca cada refúgio. Todos mantêm UMA única passagem e
 * NENHUM tem anel interno (nada de "refúgio dentro do refúgio").
 */
export type RefugeStyle = 'horseshoe' | 'bastion' | 'gate' | 'canyon' | 'ring' | 'jagged';
export interface RefugeConfig {
  name: string; x: number; z: number; width: number; depth: number;
  facing: 'north' | 'south' | 'east' | 'west';
  /** Layout próprio; varia o desenho da encosta. Padrão: 'horseshoe'. */
  style?: RefugeStyle;
  /** Variação inteira do contorno base (0..3). */
  variant?: number;
  /** Largura da única entrada (unidades de projeto). */
  entranceWidth?: number;
  /** Espessura da parede (unidades de projeto). */
  wallThickness?: number;
  /** Altura base da parede (unidades de projeto). */
  wallHeight?: number;
  /** Corredor de aproximação (comprimento em unidades de projeto) saindo da entrada. */
  approach?: number;
  /**
   * Tamanho da câmara nos mapas-labirinto, em células da grade (largura ×
   * profundidade). Só é usado quando o preset tem `maze`; permite refúgios de
   * tamanhos diferentes. Padrão: 2×2.
   */
  roomWidth?: number;
  roomDepth?: number;
}

/** Parâmetros do labirinto procedural (grade + backtracker + loops). */
export interface MazeConfig {
  /** Tamanho da célula em unidades de projeto. */
  cell: number;
  thickness: number;
  height: number;
  /** Raio da região do labirinto (unidades de projeto). */
  radius: number;
  /** 0 = labirinto perfeito (muitos becos); 1 = bem aberto (muitos loops). */
  braid: number;
  seed: number;
  /** Raio da praça central mantida aberta (unidades de projeto). */
  centerRadius: number;
  /** Corredores que ligam cada refúgio à grade (comprimento, projeto). */
  entranceCorridor: number;
}

/** Anel de encosta com uma abertura: esculpe labirintos em volta do centro. */
export interface MazeRing {
  /** Raio do anel (unidades de projeto). */
  radius: number;
  /** Ângulo (radianos) do centro da abertura. */
  gapAngle: number;
  /** Largura da abertura medida no arco (unidades de projeto). */
  gapWidth: number;
  thickness?: number;
  height?: number;
  /** Irregularidade do raio ao longo do anel (unidades de projeto). */
  jitter?: number;
}

export interface MapPresetConfig {
  version: number;
  name: string;
  description: string;
  scale: number;
  tiles: number;
  tileSize: number;
  humanSpawns: Array<{ x: number; z: number }>;
  crypt: { x: number; z: number };
  vampireSpawnOffset: { x: number; z: number };
  refugeWalls: { thickness: number; entranceWidth: number; height: number };
  refuges: RefugeConfig[];
  coast: {
    ru: number; rv: number; rotation: number; noiseA: number; noiseB: number;
    bays: Array<{ x: number; z: number; r: number }>;
  };
  lakes: Array<{ x: number; z: number; rx: number; rz: number }>;
  rivers: Array<{ width: number; points: Array<{ x: number; z: number }> }>;
  bridges: Array<{ x: number; z: number; width: number; depth: number }>;
  meadows: Array<{ x: number; z: number; rx: number; rz: number }>;
  rockFormations: Array<{ x: number; z: number; rx: number; rz: number; height: number; count: number }>;
  maze?: MazeConfig;
  mazeRings?: MazeRing[];
  /** Multiplicador do raio do colchão de pedras em volta de cada refúgio. */
  baseRocksScale?: number;
  resources: {
    centralWoodX: number[];
    centralWoodZ: number[];
    centralGold: Array<{ x: number; z: number }>;
    forestNodeSpacing: number;
  };
}

export type MapPresetId = 'classic' | 'labyrinth';

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

// ==========================================================================
// MAPAS
// Cada preset é autossuficiente: servidor e cliente constroem o mesmo mundo a
// partir do `mapId` escolhido no lobby. Ambos usam o mesmo tamanho de mundo
// (map.tiles/scale); o que muda é o relevo, a costa, os refúgios e os recursos.
// ==========================================================================

// ---- Mapa clássico: a ilha original do Vale da Vigília ----
const CLASSIC_MAP: MapPresetConfig = {
  version: 5,
  name: 'Vale da Vigília',
  description: 'Mapa original, mais aberto e com 8 refúgios iguais.',
  // Escala global do mundo: todas as coordenadas abaixo estão em "espaço de
  // projeto" (mundo 480). `scale` reduz o mundo e as posições proporcionalmente.
  // 1 = 480×480; 0.8 ≈ 384×384. Menor = mapa mais apertado e denso.
  // Ambos os presets compartilham a escala (o mundo é global).
  scale: 0.8,
  // Mundo de projeto: 560 × 560 unidades (×0.8 = 448 no mundo).
  tiles: 280, tileSize: 2,
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
  lakes: [],
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
};

// ---- Labirinto de Dédalo: denso, labiríntico e com refúgios únicos ----
const LABYRINTH_MAP: MapPresetConfig = {
  version: 6,
  name: 'Labirinto de Dédalo',
  description: 'Labirinto procedural de corredores finos, becos e salas, com refúgios únicos.',
  scale: 0.8,
  tiles: 280, tileSize: 2,
  // Humanos nascem todos na clareira logo acima da cripta (lado -z), livres
  // das paredes do labirinto. Quatro pontos = quatro vagas humanas.
  humanSpawns: [{ x: -16, z: -20 }, { x: 16, z: -20 }, { x: -16, z: -30 }, { x: 16, z: -30 }],
  crypt: { x: 0, z: 0 },
  vampireSpawnOffset: { x: 14, z: 12 },
  refugeWalls: { thickness: 5, entranceWidth: 6, height: 6 },
  // Refúgios com câmaras de tamanhos diferentes (em células da grade). Cada um
  // tem UMA entrada, onde o Muro fecha a passagem. `roomWidth`/`roomDepth`
  // valem só neste mapa-labirinto. Tamanho máximo 3×3 células (48), mínimo
  // 2×2 (32), o mesmo menor de antes; nenhum fica pequeno demais.
  refuges: [
    { name: 'Portão de Ferro', x: 139, z: 57, width: 44, depth: 40, facing: 'west', style: 'gate', variant: 1, entranceWidth: 6, wallThickness: 5, wallHeight: 6, approach: 18, roomWidth: 3, roomDepth: 3 },
    { name: 'Muralha Quebrada', x: 57, z: 139, width: 40, depth: 44, facing: 'north', style: 'jagged', variant: 3, entranceWidth: 6, wallThickness: 5, wallHeight: 6, roomWidth: 2, roomDepth: 3 },
    { name: 'Bosque Serpentino', x: -57, z: 139, width: 44, depth: 44, facing: 'north', style: 'bastion', variant: 0, entranceWidth: 6, wallThickness: 5, wallHeight: 6, approach: 14, roomWidth: 3, roomDepth: 2 },
    { name: 'Boca do Poço', x: -139, z: 57, width: 40, depth: 46, facing: 'east', style: 'canyon', variant: 2, entranceWidth: 6, wallThickness: 5, wallHeight: 6, roomWidth: 3, roomDepth: 3 },
    { name: 'Anel da Aurora', x: -139, z: -57, width: 44, depth: 44, facing: 'east', style: 'ring', variant: 1, entranceWidth: 6, wallThickness: 5, wallHeight: 6, roomWidth: 2, roomDepth: 3 },
    { name: 'Corvos Engaiolados', x: -57, z: -139, width: 40, depth: 44, facing: 'south', style: 'gate', variant: 2, entranceWidth: 6, wallThickness: 5, wallHeight: 6, approach: 16, roomWidth: 3, roomDepth: 2 },
    { name: 'Cinzas Gêmeas', x: 57, z: -139, width: 44, depth: 40, facing: 'south', style: 'jagged', variant: 0, entranceWidth: 6, wallThickness: 5, wallHeight: 6, roomWidth: 2, roomDepth: 2 },
    { name: 'Névoa Profunda', x: 139, z: -57, width: 42, depth: 46, facing: 'west', style: 'ring', variant: 3, entranceWidth: 6, wallThickness: 5, wallHeight: 6, roomWidth: 2, roomDepth: 2 },
  ] as RefugeConfig[],
  // Terra firme cobrindo todo o mundo quadrado (sem água dentro do labirinto).
  coast: {
    ru: 430, rv: 420, rotation: 0.5, noiseA: 0.04, noiseB: 0.03,
    bays: [],
  },
  lakes: [],
  rivers: [],
  bridges: [],
  // Poucas clareiras (os corredores do labirinto já abrem o terreno).
  meadows: [
    { x: 0, z: 180, rx: 18, rz: 14 },
    { x: 180, z: 0, rx: 14, rz: 18 },
    { x: 0, z: -180, rx: 18, rz: 14 },
    { x: -180, z: 0, rx: 14, rz: 18 },
  ],
  rockFormations: [],
  // Labirinto procedural: grade de corredores finos com becos e loops.
  // O labirinto ocupa o miolo do mundo, deixando uma margem de terreno em
  // volta: assim a câmera consegue trazer os cantos andáveis para a área
  // visível (fora do HUD) sem mostrar o vazio.
  maze: {
    cell: 20,
    thickness: 6,
    height: 6,
    radius: 150,
    braid: 0.35,
    seed: 1337,
    centerRadius: 40,
    entranceCorridor: 0,
  },
  // Sem colchão de pedras: câmaras grandes espalhariam pedras até a praça.
  baseRocksScale: 0,
  // Floresta densa cobrindo o mundo (menos as pedras dos refúgios/labirinto).
  resources: {
    centralWoodX: [-30, -18, 18, 30],
    centralWoodZ: [-16, -8, 0, 8, 16],
    centralGold: [
      { x: -16, z: -24 }, { x: 16, z: -24 }, { x: -16, z: 24 }, { x: 16, z: 24 },
      { x: -46, z: 0 }, { x: 46, z: 0 },
    ],
    forestNodeSpacing: 2.5,
  },
};

export const MAP_PRESETS: Record<MapPresetId, MapPresetConfig> = {
  classic: CLASSIC_MAP,
  labyrinth: LABYRINTH_MAP,
};
export const DEFAULT_MAP_ID: MapPresetId = 'classic';

export const GAME_CONFIG = {
  match: {
    // Um único dia curto (construção) e uma única noite longa (sobrevivência).
    // Os humanos vencem ao ver o amanhecer depois da noite.
    daySeconds: 60,
    nightSeconds: 1200,
    nightsToWin: 1,
    // Faixas aceitas no lobby (segundos). O anfitrião pode alterar antes de iniciar.
    daySecondsMin: 15,
    daySecondsMax: 300,
    nightSecondsMin: 60,
    nightSecondsMax: 3600,
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
      maxLevel: 3,
      // Chave = nível ATUAL: 1 é o custo de ir do nível 1 para o 2.
      // Nível 3 tem modelo próprio (market3.glb); o nível 2 reaproveita o do nível 1.
      upgradeCosts: { 1: { wood: 0, gold: 256 }, 2: { wood: 0, gold: 512 } } as Record<number, { wood: number; gold: number }>,
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
  // Comprados com SANGUE na cripta (o preço de cada nível está na tabela).

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
    heightSmoothing: 8,     // Suaviza a altura do alvo ao passar por platôs degraus
    fov: 50,
  },
  admin: { defaultResourceAmount: 1000, maxResourceAmount: 100000 },
  simulation: { ticksPerSecond: 15 }, // Frequência da simulação; não é o ciclo do Banco.

  interaction: {
    buildRange: 1.8,
    // HP restaurado por segundo por reparador, multiplicado por buildRate.
    // Reduzido em 1/3 (30 → 20): o Humano repara o Muro mais devagar.
    repairRate: 20,
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

  // Presets de mapa selecionáveis no lobby (ver MAP_PRESETS acima).
  map: CLASSIC_MAP,
  mapPresets: MAP_PRESETS,
  defaultMapId: DEFAULT_MAP_ID,

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
        name: 'Revelar Área', icon: '👁', duration: 10, cooldown: 60,
        // Duas cargas; cada carga recarrega em `cooldown` segundos (60s).
        charges: 2,
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
    // Cada nível guarda `bonus` e `cost` em SANGUE (moeda do Vampiro).
    // Os valores são INCREMENTAIS: o bônus total no nível é a soma dos níveis
    // anteriores até o atual (ver `vampireItemBonus`).
    vampireItemTiers: {
      accumulation: 'cumulative' as const,
      damage: {
        1: { bonus: 2, cost: 100 }, 2: { bonus: 4, cost: 100 },
        3: { bonus: 8, cost: 200 }, 4: { bonus: 16, cost: 400 },
        5: { bonus: 32, cost: 800 }, 6: { bonus: 64, cost: 1600 },
        7: { bonus: 128, cost: 3200 }, 8: { bonus: 256, cost: 6400 },
        9: { bonus: 256, cost: 12800 }, 10: { bonus: 256, cost: 12800 },
      } as Record<number, { bonus: number; cost: number }>,
      health: {
        1: { bonus: 250, cost: 100 }, 2: { bonus: 500, cost: 100 },
        3: { bonus: 1000, cost: 200 }, 4: { bonus: 2000, cost: 400 },
        5: { bonus: 4000, cost: 800 }, 6: { bonus: 8000, cost: 1600 },
        7: { bonus: 16000, cost: 3200 }, 8: { bonus: 32000, cost: 6400 },
        9: { bonus: 32000, cost: 12800 }, 10: { bonus: 32000, cost: 12800 },
      } as Record<number, { bonus: number; cost: number }>,
      attackSpeed: {
        1: { bonus: 10, cost: 100 }, 2: { bonus: 10, cost: 100 },
        3: { bonus: 20, cost: 200 }, 4: { bonus: 40, cost: 400 },
        5: { bonus: 80, cost: 800 }, 6: { bonus: 120, cost: 1600 },
        7: { bonus: 200, cost: 3200 },
      } as Record<number, { bonus: number; cost: number }>,
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
