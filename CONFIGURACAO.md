# Como configurar o jogo

Edite **[`game.config.ts`](game.config.ts)**, na raiz do projeto. Ele é a fonte das configurações usadas pelo servidor e pelo navegador.

O arquivo possui comentários em português para ajudar nas alterações.

## Onde alterar cada coisa

| Quero mudar… | Seção de `GAME_CONFIG` |
|---|---|
| Duração do dia, noite e número de noites para vencer | `match` |
| Ouro e madeira iniciais | `match.startingResources` |
| Vida, velocidade, coleta, dano e construção do Humano | `units.human` |
| Os mesmos atributos, mas apenas dos Peões | `units.peon` |
| Vida, velocidade, dano, regeneração e sangue do Vampiro | `units.vampire` |
| Preços em sangue, nomes, bônus, loja e limite de cópias dos itens | `vampireItems` |
| Distância extra para comprar ao encostar na loja (fora da base) | `buildings.<loja>.shopRange` |
| Posição das lojas da base do Vampiro | `map.vampireShops` |
| Custo, tempo, vida e espaço ocupado por uma construção | `buildings.<nome>` |
| Ouro por ciclo, intervalo de cada nível e melhorias do Banco | `buildings.bank` |
| Custo e tempo de recrutamento de Peões | `buildings.taverna.recruit` |
| Alcance, dano e intervalo dos ataques da Torre | `buildings.tower` |
| Construções disponíveis no painel | `buildable` |
| Quantidades de madeira e ouro trocadas no Muro | `market` |
| Zoom, inclinação, campo de visão e velocidade da câmera | `camera` |
| Quantidade padrão e limite de recursos do painel Admin | `admin` |
| Tamanho do mapa, refúgios, florestas, lagos, rios, pontes, relevo e recursos | `map` |
| Pontos iniciais e quantidade de vagas de Humanos | `map.humanSpawns` |
| Tamanho do código de convite | `lobby.codeLength` |
| Distâncias de interação e colisão | `interaction` |
| Frequência de atualização da simulação | `simulation.ticksPerSecond` |

## Unidades dos valores

- **Tempo:** segundos. `time: 8` significa 8 segundos de trabalho.
- **Velocidade:** unidades do mapa por segundo.
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

### Fazer o Banco produzir mais frequentemente

Na entrada `buildings.bank`:

```ts
goldPerCycle: 5,
cycleSecondsByLevel: {
  1: 5,
  2: 4,
  3: 3,
  4: 2,
  5: 1.5,
  6: 1,
},
```

O Banco gera **5 de ouro em todos os níveis**. Neste exemplo, o nível 1 produz a cada 5 segundos e o nível 6 produz a cada segundo. Diminua o intervalo de um nível para acelerar sua renda.

Os intervalos em `cycleSecondsByLevel` são os ciclos econômicos do Banco. Eles são independentes de `simulation.ticksPerSecond`, que controla a frequência da simulação.

Ao aumentar `maxLevel`, inclua os custos das novas melhorias em `upgradeCosts` e os intervalos dos novos níveis em `cycleSecondsByLevel`. Nos custos, a chave indica o nível de origem: a chave `3` é o custo de melhorar do nível 3 para o 4.

### Melhorar apenas os Peões

Em `units.peon`, aumente `gatherRate`, `carry` ou `buildRate`. Isso não altera o Humano inicial.

### Trocar 20 de madeira por 10 de ouro

```ts
market: { wood: 20, gold: 10 },
```

A venda usa 20 de madeira e entrega 10 de ouro; a compra faz a operação inversa. Os botões e a sinalização de recursos insuficientes acompanham os valores.

### Ajustar o mapa e as vagas

O mapa continua fixo. Alterar `tiles` ou `tileSize` muda suas dimensões; as posições dos refúgios e recursos permanecem nas coordenadas indicadas no arquivo.

`map.coast` define o contorno e a inclinação da ilha. `rivers` e `lakes` desenham a água; as trilhas abrem corredores na floresta e geram pontes ao cruzar rios. `meadows` abre clareiras extras. `resources.forestNodeSpacing` controla a densidade da floresta. Os refúgios são reentrâncias rochosas assimétricas: `facing` define a única passagem para o muro e `refugeWalls` ajusta o sopé e a altura inicial das encostas.

Cada entrada em `map.humanSpawns` representa uma vaga humana. O lobby acrescenta uma vaga de Vampiro automaticamente. Ajuste os pontos de início e os refúgios para acomodar o número de jogadores desejado.

## Aplicar as mudanças

1. Salve `game.config.ts`.
2. Em desenvolvimento, os processos com observação de arquivos recarregam as alterações. Recarregue o navegador e crie uma nova sala.
3. Se os processos estiverem parados, execute `npm run dev` e `npm run dev:client`, em terminais separados.
4. Para a versão de produção, execute `npm run build` e reinicie o servidor.

`npm run check` verifica erros de TypeScript. O guia `GUIA_DO_JOGO.md` descreve o balanceamento padrão; depois de personalizá-lo, atualize suas tabelas se quiser distribuir o guia com os novos valores.
