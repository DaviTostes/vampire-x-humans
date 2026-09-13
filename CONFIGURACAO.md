# Como configurar o jogo

Edite **[`game.config.ts`](game.config.ts)**, na raiz do projeto. Ele é a fonte das configurações usadas pelo servidor e pelo navegador.

O arquivo possui comentários em português para ajudar nas alterações.

## Onde alterar cada coisa

| Quero mudar… | Seção de `GAME_CONFIG` |
|---|---|
| Duração do dia, noite e número de noites para vencer | `match` |
| Presets de mapa (refúgios, costa, floresta, anéis de labirinto) | `MAP_PRESETS` / `GAME_CONFIG.mapPresets` |
| Ouro e madeira iniciais | `match.startingResources` |
| Vida, velocidade, coleta, dano e construção do Humano | `units.human` |
| Vida, velocidade, dano, Attack Speed (base/máx.) e intervalo do Vampiro | `units.vampire` e `spec.vampireBase` |
| Os mesmos atributos, mas apenas dos Peões | `units.peon` |
| Vida, velocidade, dano, regeneração e sangue do Vampiro | `units.vampire` |
| Itens do Vampiro: bônus e custo em sangue por nível (dano/vida/Attack Speed) | `spec.vampireItemTiers` |
| Sangue ganho por dano e política de arredondamento | `spec.bloodPerDamage` e `spec.roundingPolicy` |
| Produção em sangue (valor por ciclo) e evolução da Cripta | `spec.crypt` e `buildings.crypt.cycleSeconds` |
| Custo, tempo, vida e espaço ocupado por uma construção | `buildings.<nome>` |
| Produção em gold/s, custos e pré-requisitos do Banco (níveis 1–8) | `spec.bankLevels` |
| Custo e vida do Muro por nível (1–11) | `spec.wallLevels` |
| Custo e dano da Torre por nível (1–7) | `spec.towerLevels` |
| Custo e tempo de recrutamento de Peões | `buildings.taverna.recruit` |
| Treino e pesquisa de Lenhador/Minerador/Reparador e seus limites | `spec.workers` e `spec.entityLimits` |
| Custo, vida e ouro da Mina de Ouro | `buildings.goldMine` e `spec.goldMine` |
| Habilidades do Humano (duração, cooldown, alcance) | `spec.humanAbilities` |
| Habilidades do Vampiro (Revelar Área, Forma de Morcego, Teleport) | `spec.vampireAbilities` |
| Alcance e intervalo dos ataques da Torre | `buildings.tower` |
| Construções disponíveis no painel | `buildable` |
| Quantidades de madeira e ouro trocadas no Mercado | `market` |
| Custo, vida e níveis do Mercado | `buildings.market` |
| Zoom, inclinação, campo de visão e velocidade da câmera | `camera` |
| Quantidade padrão e limite de recursos do painel Admin | `admin` |
| Tamanho do mapa, refúgios, florestas, lagos, rios, pontes, relevo e recursos | `map` |
| Pontos iniciais e quantidade de vagas de Humanos | `map.humanSpawns` |
| Tamanho do código de convite | `lobby.codeLength` |
| Distâncias de interação e colisão | `interaction` |
| Frequência de atualização da simulação | `simulation.ticksPerSecond` |

## Unidades dos valores

- **Tempo:** segundos. `time: 8` significa 8 segundos de trabalho.
- **Velocidade:** unidades do mapa por segundo. O Move Speed da spec (367 no Humano, 400 no Vampiro) usa outra unidade e é convertido por `spec.moveSpeedScale` (âncora: Humano = 7 u/s).
- **Distância:** unidades do mapa.
- **Coleta:** `gatherRate` é a quantidade por segundo; `carry` é a quantidade por ciclo.
- **Construção:** `buildRate: 1` usa o tempo normal; `buildRate: 2` faz essa unidade construir duas vezes mais rápido.
- **Câmera:** um `zoom` menor aproxima; um valor maior afasta. Mantenha `minZoom <= initialZoom <= maxZoom`.

Use números positivos para durações, capacidades e frequências. Custos podem ser zero. Quantidades de troca e dimensões da grade devem ser inteiras e positivas.

## Exemplos

### Tornar o Muro mais barato e rápido

Na entrada `buildings.wall`, altere:

```ts
cost: { wood: 10, gold: 0, time: 1 },
```

### Fazer o Banco produzir mais

Na seção `spec.bankLevels`, cada nível tem `production` (em **gold/s**) e `upgradeCost` (custo para alcançar aquele nível):

```ts
bankLevels: {
  1: { upgradeCost: null, production: 1, prerequisite: null },
  2: { upgradeCost: { gold: 50 }, production: 2, prerequisite: { wallLevel: 1 } },
  // ...
},
```

O Banco gera ouro continuamente conforme o nível. `prerequisite` define o pré-requisito para alcançar o nível (ex.: `{ wallLevel: 1 }` exige um Muro nível 1; `{ marketLevel: 1 }` exigiria o Mercado, ainda não implementado).

O Muro segue o mesmo formato em `spec.wallLevels` (`cost` + `hp`) e a Torre em `spec.towerLevels` (`cost` + `damage`).

### Economia do Vampiro (sangue, Cripta e itens)

O Vampiro usa **apenas sangue** como moeda. A especificação chama a recompensa por dano de "ouro", mas aqui ela é convertida em sangue.

- **Sangue por dano** (`spec.bloodPerDamage`, padrão 0,80): o Vampiro recebe sangue sempre que causa dano. O arredondamento fica centralizado em `spec.roundingPolicy` (A CONFIRMAR; hoje usa truncamento).
- **Cripta** (`spec.crypt`): gera sangue em **ciclos de duração fixa** (`buildings.crypt.cycleSeconds`), igual ao Banco. Cada upgrade aumenta o **sangue por ciclo** (`productionByLevel`: níveis 1–4 = 1/2/4/8), sem acelerar o intervalo. O Vampiro evolui a Cripta com sangue; o custo inicial do nível 1 continua A CONFIRMAR.
- **Itens** (`spec.vampireItemTiers`): três categorias — **Dano** (10 níveis), **Vida** (10 níveis) e **Attack Speed** (7 níveis) — compradas com **sangue** na cripta. Attack Speed é limitada ao máximo de 600. O acúmulo é **cumulativo** (`accumulation: 'cumulative'`): cada nível soma seu bônus ao total anterior.

O sangue também paga a skill legada "Golpe Sombrio" (fora da especificação).

### Habilidades do Vampiro

Em `spec.vampireAbilities`:

- **Revelar Área** (10s): revela uma área no mapa. **2 cargas**, cada uma com **recarga de 60s**. Só pode ser usada à noite.
- **Invisibilidade / Forma de Morcego**: o Vampiro fica **invulnerável** e mais rápido por até **15s**; ao terminar, há 1,5s de animação de saída.
- **Teleport para a Base**: canaliza **2,8s** e então retorna à base (posição obtida da cripta/spawn).

**Pendências (A CONFIRMAR):** raio/forma de Revelar Área (provisório: 30), bônus de Move Speed da Forma de Morcego, invulnerabilidade durante a saída e cancelamento manual, e as condições de interrupção do Teleport.

### Habilidades do Humano

Em `spec.humanAbilities`:

- **Enredar** (4s, recarga 32s): o Vampiro não pode atacar.
- **Fortificar** (8s, recarga 300s): alvo (unidade ou construção própria) fica invulnerável.
- **Teleporte** (recarga 32s, alcance 600): o Humano se move até o ponto escolhido.
- **Silenciador** (1,5s, recarga 45s): o Vampiro não pode usar habilidades.

No jogo, selecione o Humano, clique na habilidade e depois no alvo (Vampiro, aliado/construção ou ponto no chão). **Pendência (A CONFIRMAR):** alcance de Enredar/Silenciador não definido — hoje não há verificação de distância para essas duas.

### Trabalhadores (Lenhador, Minerador, Reparador)

A Taverna treina três funções, com limites por jogador em `spec.entityLimits`. **O Humano (herói) não coleta** — só trabalhadores especializados:

- **Lenhador** (máx. 20): coleta madeira. `spec.workers.lumberjack` define o custo de treino (custo do nível 1) e a progressão: `gatherInterval` cai de 8 para 1 segundo mantendo `lumberAmount: 4` por coleta.
- **Minerador** (máx. 15): custa 2 madeiras, coleta ouro e constrói Minas de Ouro.
- **Reparador** (máx. 1): repara Muros. `spec.workers.repairer` define custo, `repairSpeed` e `trainingTime` (0 = instantâneo). O reparo do Humano foi reduzido em 1/3 (`interaction.repairRate`: 30 → 20 HP/s).

Construção: **Lenhador e Reparador não constroem**. O **Humano** ergue todas as construções, exceto a Mina de Ouro; o **Minerador** constrói **apenas** a Mina de Ouro.

A pesquisa de nível é comprada na própria Taverna (comando `upgradeWorker`) e vale para o jogador. **Pendências (A CONFIRMAR):** unidade de `Gather Interval`/`Repair Speed`, custo de treino de Lenhador/Reparador e semântica de progressão por unidade vs. por jogador.

### Melhorar apenas os Peões

Em `units.peon`, aumente `gatherRate`, `carry` ou `buildRate`. Isso não altera o Humano inicial.

### Trocar 20 de madeira por 10 de ouro

```ts
market: { wood: 20, gold: 10 },
```

A troca acontece no **Mercado** (única construção com essa função): a venda usa 20 de madeira e entrega 10 de ouro; a compra faz a operação inversa. Os botões e a sinalização de recursos insuficientes acompanham os valores.

### Ajustar o mapa e as vagas

O mapa continua fixo. `map.scale` reduz (ou amplia) o mundo inteiro de uma vez: todas as coordenadas abaixo continuam no espaço de projeto do mundo 480 e são multiplicadas por essa escala. Com `0.55`, por exemplo, o mundo vira ~264 × 264 e os refúgios, rios, lagos e recursos acompanham proporcionalmente. Um valor menor deixa o mapa mais apertado e denso; `1` mantém as dimensões originais. `tiles`/`tileSize` seguem definindo o mundo de projeto, não o final.

`map.coast` define o contorno e a inclinação da ilha. `rivers` e `lakes` desenham a água (as trilhas geram pontes automaticamente ao cruzar rios, se houver). `meadows` abre clareiras extras. O relevo vem das pedras: `rockFormations` gera os maciços rochosos (visual + colisão) — `rx`/`rz` dão o tamanho da base, `height` a altura e `count` quantas pilhas de pedra. O terreno em si é plano. `resources.forestNodeSpacing` controla a densidade da floresta. Os refúgios são reentrâncias rochosas assimétricas: `facing` define a única passagem para o muro e `refugeWalls` ajusta o sopé e a altura inicial das encostas.

Cada entrada em `map.humanSpawns` representa uma vaga humana. O lobby acrescenta uma vaga de Vampiro automaticamente. Ajuste os pontos de início e os refúgios para acomodar o número de jogadores desejado.

## Aplicar as mudanças

1. Salve `game.config.ts`.
2. Em desenvolvimento, os processos com observação de arquivos recarregam as alterações. Recarregue o navegador e crie uma nova sala.
3. Se os processos estiverem parados, execute `npm run dev` e `npm run dev:client`, em terminais separados.
4. Para a versão de produção, execute `npm run build` e reinicie o servidor.

`npm run check` verifica erros de TypeScript. O guia `GUIA_DO_JOGO.md` descreve o balanceamento padrão; depois de personalizá-lo, atualize suas tabelas se quiser distribuir o guia com os novos valores.
