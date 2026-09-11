# Vampire × Humans

## Guia do jogo

**Sobreviva. Construa. Não seja encontrado.**

Vampire × Humans é um jogo de estratégia em tempo real no navegador. Um Vampiro caça os sobreviventes enquanto até quatro jogadores Humanos coletam recursos, ocupam refúgios e preparam suas defesas.

Todos jogam com uma câmera aérea de RTS: você seleciona personagens, dá ordens e acompanha a partida pelo cenário e pelo minimapa.

Este guia descreve as regras e os valores da versão atual.

---

## 1. Como começar

### Criar ou entrar em uma sala

1. Informe seu nome na tela inicial.
2. Escolha **Criar sala** para ser o anfitrião ou digite um código de cinco caracteres e clique em **Entrar**.
3. Compartilhe o código com seus amigos. O próprio lobby possui um botão para copiá-lo.
4. Cada jogador escolhe **Humano** ou **Vampiro**.
5. Todos clicam em **Estou pronto**.
6. O anfitrião inicia a partida.

### Preparação multiplayer

- A sala comporta até **cinco jogadores**.
- Uma partida multiplayer precisa de **um Vampiro** e de **um a quatro Humanos**.
- A vaga de Vampiro pertence a quem a escolher; ela não depende da ordem de entrada.
- O anfitrião também pode jogar como Vampiro.
- Trocar de equipe cancela sua confirmação de pronto.
- A entrada ou saída de alguém faz o grupo confirmar a preparação novamente.
- Se o anfitrião sair do lobby, outro jogador presente assume essa função.
- A partida só começa quando as equipes estão válidas e todos estão prontos.

### Testar sozinho

Também é possível iniciar uma sala com apenas você. Escolha sua equipe, marque **Estou pronto** e clique em **Iniciar teste solo**.

O teste solo serve para experimentar construções, economia, controles e combate. Ele possui um painel Admin, descrito ao final deste guia.

---

## 2. Objetivos e vitória

### Equipe humana

O objetivo é construir uma defesa capaz de resistir à caçada. A equipe vence se:

- **eliminar o Vampiro**; ou
- **sobreviver à noite inteira**, alcançando o amanhecer seguinte. Ao raiar o dia novamente, os humanos vencem.

Os jogadores humanos são aliados, embora cada um tenha suas próprias unidades e seus próprios recursos.

### Vampiro

O objetivo é encontrar os refúgios, romper suas defesas e eliminar os sobreviventes.

Na versão atual, o Vampiro vence quando não resta nenhuma unidade da equipe humana: nem Humanos iniciais nem Peões recrutados. Destruir construções ajuda a enfraquecer a equipe, mas, sozinho, isso não encerra a partida.

---

## 3. Personagens

### Humano

Cada jogador dessa equipe começa com:

- **um único Humano**, na praça central do mapa;
- **100 pontos de vida**;
- **zero madeira e zero ouro**;
- nenhuma construção própria.

O Humano pode coletar madeira, minerar ouro, construir e atacar o Vampiro. Ele é o personagem inicial do jogador e possui seu próprio modelo e retrato.

### Peão

Peões são auxiliares recrutados na **Taverna**. Eles ampliam sua capacidade de coleta e construção.

| Característica | Valor |
|---|---:|
| Custo de recrutamento | 50 de ouro |
| Tempo de recrutamento | 2 segundos |
| Vida | 100 |
| Funções | Coletar, construir e atacar |

Peões pertencem ao jogador que os recrutou. Eles têm modelo e retrato próprios, com roupa de trabalho e chapéu de palha, para serem reconhecidos separadamente do Humano inicial.

### Vampiro

O Vampiro começa próximo à sua cripta, afastado da praça central.

| Característica | Valor |
|---|---:|
| Vida máxima | 500 |
| Dano (unidades e construções) à noite | 5 por ataque |
| Dano (unidades e construções) de dia | 2 por ataque |
| Intervalo entre ataques | Aproximadamente 1,42 segundo |
| Regeneração noturna | 2 de vida por segundo |
| Sangue por golpe acertado | 80% do dano causado (arredondado para baixo) |

O Vampiro recebe ordens de movimento e ataque como as outras unidades. À noite, ele se move mais rápido e recupera vida gradualmente.

**Inspeção:** um jogador humano pode clicar no Vampiro para consultar sua vida, sangue, dano e ação atual no HUD. Inspecionar uma unidade de outro jogador não permite controlá-la.

### Base do Vampiro: a cripta

A qualquer momento, **de dia ou de noite**, o Vampiro pode trocar sangue por equipamento na sua base, no centro do vale. Tudo é comprado na **Cripta**: itens e skills.

1. Acumule sangue acertando ataques.
2. Aproxime o Vampiro da cripta (o dia ou a noite não importam).
3. Clique na cripta para abrir a loja no HUD.
4. Escolha o item ou a skill. O sangue é descontado e o equipamento fica ativo imediatamente.

| Item | Preço | Efeito |
|---|---:|---|---|
| Garras Sangrentas | 50 de sangue, +40% por nível | +10 de dano por nível contra unidades e construções, sem limite |
| Coração Ancestral | 75 de sangue, +40% por nível | +300 de vida máxima por nível, sem limite |
| Botas da Névoa | 30 de sangue, +40% por nível | +0,5 de velocidade de movimento por nível, sem limite |
| Frenesi | 30 de sangue, +40% por nível | Ataques ~7% mais rápidos por nível (mínimo 0,45s), sem limite |

### Skill do Vampiro: Golpe Sombrio

- **Apenas as skills são compradas na cripta.** Perto da cripta, o Vampiro desbloqueia o **Golpe Sombrio** por 80 de sangue.
- Depois de desbloqueada, a skill aparece no painel do vampiro e pode ser ativada **a qualquer hora**, sem custo extra.
- Ao ativar, o dano dobra por 8 segundos, com 50 segundos de recarga.

- A cripta atende o Vampiro a qualquer momento, desde que ele esteja na região da base.
- Todos os itens são comprados na cripta e são **infinitos**: podem ser comprados quantas vezes o sangue permitir, e cada nível custa mais que o anterior.
- Depois da primeira compra de um item, ele pode ser upado **a qualquer hora pelo painel do vampiro**, sem voltar à base.
- Os itens equipados aparecem na ficha do Vampiro e no painel da base.
- As Garras também recebem o modificador de dano diurno nos ataques contra unidades e construções.
- O Coração soma seu bônus à vida atual e à máxima, preservando o dano já sofrido; não é uma cura completa.
- Os itens permanecem ativos durante a noite. Uma nova partida começa com o inventário vazio.
- Preços, bônus e a distância de compra podem ser ajustados na configuração do jogo.

---

## 4. Dia e noite

A partida tem **um dia curto** (60 segundos por padrão) e **uma noite longa** (20 minutos por padrão). O anfitrião pode alterar as duas durações no lobby, antes de iniciar. Os valores padrão e as faixas permitidas ficam em `match` no `game.config.ts`.

### Dia — 1 minuto (padrão)

- Serve quase só para os Humanos coletarem o básico, escolherem um refúgio e levantarem a base inicial.
- O Vampiro fica limitado à região da cripta, em um raio de 14 unidades do mapa.
- Ele pode se movimentar nessa região, comprar itens e melhorar a cripta, mas não sair para caçar pelo vale.

### Noite — 20 minutos (padrão)

- O Vampiro pode circular pelo mapa, caçar e comprar itens na cripta como faria de dia.
- Sua velocidade aumenta e sua regeneração fica ativa.
- A iluminação do cenário muda e as defesas são o que garante a sobrevivência.
- **Se os humanos aguentarem a noite inteira, o amanhecer chega e eles vencem.**

O relógio no topo da tela mostra a fase atual e o tempo restante. As torres funcionam **tanto de dia quanto à noite**, desde que estejam prontas e o Vampiro esteja ao alcance.

---

## 5. O mapa: Vale da Vigília

O Vale da Vigília é um **mapa fixo**, com a mesma disposição em todas as partidas. Conhecer seus caminhos, recursos e entradas faz parte da estratégia.

### Elementos principais

- **Clareira central:** ponto de partida dos Humanos, com chão natural e trilhas entre as árvores.
- **Ilha florestal:** terreno de contorno irregular e eixo inclinado, cercado pelo mar, com enseadas e praias.
- **Base do Vampiro:** a Cripta e as quatro lojas, a noroeste da ilha.
- **Rios e pontes:** canais sinuosos dividem o vale em regiões. As **pontes** são o único caminho sobre a água — unidades atravessam, mas não é possível construir sobre elas.
- **Relevo:** colinas e mesas elevadas dão altura ao terreno; o interior das bases é plano para construir.
- **Florestas e árvores de coleta:** fontes de madeira.
- **Minas:** 4 na praça central e 1 exposta fora da entrada de cada refúgio — ouro exige sair das muralhas.
- **Oito refúgios:** clareiras naturais distribuídas pelo vale.

### Refúgios

1. Clareira dos Pinheiros
2. Refúgio da Pedreira
3. Bosque da Lua
4. Abrigo do Poente
5. Clareira da Aurora
6. Refúgio dos Corvos
7. Vale das Cinzas
8. Bosque da Névoa

Cada refúgio é uma **base natural**: uma clareira abrigada numa reentrância da montanha. Maciços assimétricos, encostas e floresta delimitam o espaço. O interior fica livre para construir; a coleta acontece fora, com minas ao lado das trilhas.

### A entrada e o muro

Cada refúgio possui **uma única passagem** entre as encostas. Colocar um **Muro** nessa passagem protege o refúgio sem impedir a circulação da equipe humana:

- Humanos e Peões conseguem atravessar o muro.
- O Vampiro fica bloqueado e precisa destruí-lo para entrar.

Assim, suas unidades podem sair para coletar enquanto as torres protegem o acesso. Escolher a posição do muro e a cobertura das torres é uma decisão central da partida.

---

## 6. Recursos e coleta

Existem dois recursos econômicos:

| Recurso | Onde obter | Principais usos |
|---|---|---|
| Madeira | Árvores de coleta | Construções e melhorias do Banco |
| Ouro | Banco e trocas | Construções, melhorias e recrutamento |

As **minas de ouro não existem** no mapa: o ouro vem do Banco e do mercado.

### Como coletar

1. Selecione seu Humano ou um Peão.
2. Clique com o botão direito em qualquer árvore.
3. A unidade vai até a árvore e começa a trabalhar automaticamente.

A coleta é contínua: **cada recurso vai direto para a reserva do jogador, 1 a 1**, assim que é extraído, além do deslocamento inicial.

- A unidade não acumula carga nem precisa voltar a um depósito.
- Árvores são **fontes infinitas**: não encolhem nem desaparecem com a coleta.
- A coleta continua enquanto a unidade mantiver a ordem e permanecer viva.

O registro do relevo é feito pelas **formações rochosas** (bloqueiam a passagem); as trilhas são os caminhos que ligam o centro às bases.

### Mercado

Comprar e vender recursos é uma função dos **Muros**. Para abrir as trocas, selecione um muro seu que já esteja concluído.

Os botões de compra e venda permitem trocar recursos na proporção de **1 para 1**:

- **Vender madeira:** 10 de madeira → 10 de ouro.
- **Comprar madeira:** 10 de ouro → 10 de madeira.

Use essas trocas para cobrir uma falta pontual e concluir uma construção ou melhoria.

---

## 7. Construções

### Custos e tempos

| Construção | Madeira | Ouro | Tempo com um construtor | Vida |
|---|---:|---:|---:|---:|
| Banco | 0 | 0 | 5 segundos | 500 |
| Taverna | 60 | 20 | 5 segundos | 500 |
| Muro | 15 | 0 | 2 segundos | 400 |
| Torre | 70 | 40 | 2 segundos | 300 |

Os custos são pagos ao confirmar uma construção válida. O tempo de trabalho começa quando o construtor chega perto da obra.

### Posicionamento

1. Selecione um Humano ou Peão.
2. Escolha a construção no painel de comandos.
3. Mova a prévia pelo terreno.
4. Clique com o botão esquerdo para confirmar.

**Prévia verde:** o local é válido e você pode construir.

**Prévia vermelha:** não é possível construir naquela situação. A área pode estar ocupada por unidades, outra construção, recursos, água ou rochedos; também é necessário ter os recursos e um construtor selecionado.

Um clique em local inválido não gasta recursos e mantém o modo de posicionamento ativo. Escolha outro lugar ou cancele com **Esc** ou botão direito.

### Obras em andamento

- A porcentagem aparece sobre a obra e no HUD.
- O personagem mostra a ação de construção e usa sua ferramenta de trabalho.
- Uma obra interrompida pode ser retomada sem pagar novamente.
- Para retomar, selecione um construtor e clique com o botão direito na obra, ou use **Retomar obra** no painel da construção.
- Quando fica pronta, a construção recebe um efeito visual de conclusão.

### Reparo e melhoria do Muro

- O Muro pode ser **reparado** por Humanos e Peões: clique com o botão direito nele com um construtor selecionado, ou use **Reparar muro** no painel da construção.
- O Muro pode ser **melhorado até o nível 3**, como o Banco: nível 1 tem 400 HP, nível 2 tem 800 HP e nível 3 tem 1200 HP.
- Melhorar custa 60 de madeira + 20 de ouro (nível 1 → 2) e 120 de madeira + 40 de ouro (nível 2 → 3), preservando o dano atual.

---

## 8. Banco

O **Banco** é a construção de renda passiva. Ele possui um modelo próprio e pode ser melhorado até o **nível 6**.

### Produção

Cada ciclo de produção, também chamado de *tick de ouro*, gera **5 de ouro**, desde o nível 1. Melhorar o Banco reduz o intervalo entre os ciclos.

| Nível | Ouro por ciclo | Intervalo |
|---|---:|---:|
| 1 | 5 | 5 segundos |
| 2 | 5 | 4 segundos |
| 3 | 5 | 3 segundos |
| 4 | 5 | 2 segundos |
| 5 | 5 | 1,5 segundo |
| 6 | 5 | 1 segundo |

O Banco começa a gerar renda assim que sua construção é concluída. A quantidade de ouro por ciclo permanece a mesma; os níveis superiores produzem com mais frequência.

Ao receber uma produção, moedas sobem do Banco e aparece o aviso **“+5 ouro”**. O efeito acompanha o crédito real dos recursos.

### Melhorias

Clique no Banco e use o botão de melhoria disponível no painel.

| Melhoria | Madeira | Ouro |
|---|---:|---:|
| Nível 1 → 2 | 40 | 30 |
| Nível 2 → 3 | 60 | 60 |
| Nível 3 → 4 | 90 | 120 |
| Nível 4 → 5 | 130 | 240 |
| Nível 5 → 6 | 180 | 450 |

A melhoria de nível é imediata após o pagamento. Para começar a produzir, basta concluir o Banco, que é **gratuito**.

---

## 9. Taverna

A **Taverna** é responsável pelo recrutamento de Peões. Ela tem função diferente do Banco: sua utilidade é aumentar a força de trabalho.

### Recrutar um Peão

1. Construa e conclua uma Taverna.
2. Clique nela para abrir seu painel.
3. Clique em **Recrutar Peão**.
4. Pague **50 de ouro** e aguarde **2 segundos**.

Cada Taverna recruta um Peão por vez. O progresso aparece no HUD e sobre a construção. O Peão surge próximo à Taverna, em um local livre.

Se não houver espaço de saída, o recrutamento aguarda uma posição livre. O ouro não é cobrado novamente por essa espera.

Peões podem receber ordens individualmente ou em grupo. Use-os para dividir a coleta entre madeira e ouro, construir defesas e ajudar a combater o Vampiro.

---

## 10. Torre e defesa

A Torre ataca automaticamente o Vampiro quando ele entra em seu alcance.

| Característica | Valor |
|---|---:|
| Alcance | 18 unidades do mapa |
| Dano por disparo | 15 |
| Intervalo entre disparos | Aproximadamente 1,5 segundo |
| Vida | 300 |

- Uma torre em construção ainda não ataca.
- Uma torre concluída funciona durante o dia e a noite.
- Um círculo mostra o alcance durante o posicionamento.
- O círculo também aparece ao selecionar uma torre existente.
- O disparo possui projétil visível e indicação de dano no alvo.
- O painel informa o alcance, o dano e a vida do Vampiro quando ele está dentro da área de ataque.

**Dica:** coloque a torre de modo que o círculo cubra a entrada do refúgio. O muro segura o Vampiro enquanto a torre causa dano.

---

## 11. Controles

| Ação | Controle |
|---|---|
| Mover a câmera | W, A, S, D ou setas |
| Aproximar ou afastar a câmera | Roda do mouse, dentro de uma faixa curta de zoom |
| Selecionar unidade ou construção | Clique esquerdo |
| Selecionar várias unidades próprias | Arrastar com o botão esquerdo |
| Adicionar ou remover unidade da seleção | Shift + clique |
| Mover unidades selecionadas | Clique direito no terreno |
| Coletar | Clique direito no recurso |
| Atacar | Clique direito no inimigo com suas unidades selecionadas |
| Retomar obra | Clique direito na obra com um construtor selecionado |
| Confirmar posicionamento | Clique esquerdo em local válido |
| Cancelar posicionamento | Esc ou clique direito |
| Centralizar seu personagem | Clique no retrato do canto superior esquerdo |
| Navegar pelo mapa | Clique no minimapa |
| Inspecionar o Vampiro | Clique esquerdo no Vampiro |

Ao terminar de inspecionar uma unidade de outro jogador, selecione novamente suas unidades para dar ordens.

---

## 12. Lendo a interface

### Barra superior

Mostra seus recursos e o relógio de dia/noite. No teste solo, a fase também é identificada como **Teste solo**.

### Minimap

Mostra o vale, as áreas dos refúgios, recursos, construções e unidades. Use-o para encontrar entradas e mover rapidamente a câmera.

### Retrato e ficha

O painel inferior acompanha a seleção:

- **Humano:** retrato do personagem inicial, vida e ação atual.
- **Peão:** retrato próprio de trabalhador, vida e ação atual.
- **Vampiro:** retrato do Vampiro, vida, sangue e informações de combate.
- **Construção:** nome, vida, nível, função e ações disponíveis.

### Ação atual

Avisos no HUD e sobre as unidades ajudam a entender o que está acontecendo:

- Aguardando ordem
- Movendo
- Indo coletar madeira ou ouro
- Coletando madeira ou ouro
- Indo construir
- Construindo
- Indo atacar
- Atacando
- Sem caminho

As ferramentas e animações também acompanham o trabalho: corte de madeira, mineração e construção têm apresentações diferentes.

### Recursos insuficientes

A sinalização é feita **por recurso**:

- madeira suficiente e ouro insuficiente: só o custo de ouro fica vermelho;
- ouro suficiente e madeira insuficiente: só o custo de madeira fica vermelho;
- ambos insuficientes: ambos ficam vermelhos.

O botão permanece desabilitado enquanto faltar algum recurso. O tempo de construção e os recursos que você já possui não são marcados como se estivessem faltando.

---

## 13. Painel Admin do teste solo

Abra **Admin · teste solo**, no canto superior direito da tela durante uma partida solo.

O painel permite:

- definir uma quantidade e adicionar **ouro**;
- definir uma quantidade e adicionar **madeira**;
- mudar imediatamente para **dia**;
- mudar imediatamente para **noite**;
- curar suas unidades vivas.

O limite por adição é de **100.000 recursos**. Essas ferramentas são exclusivas do teste solo e não ficam disponíveis em partidas multiplayer.

Para testar o combate, você pode construir torres, alternar a fase e acompanhar o alcance e a vida do Vampiro pelo HUD. Para testar a economia, adicione recursos para construir e melhorar o Banco ou recrutar Peões na Taverna.

---

## 14. Uma primeira partida como Humano

1. Comece pela coleta na região central.
2. Obtenha madeira e ouro antes de escolher seus primeiros investimentos.
3. Encontre um refúgio e observe sua única passagem.
4. Proteja a entrada com um muro.
5. Coloque uma torre cobrindo a entrada.
6. Escolha entre investir no Banco para obter renda ou na Taverna para recrutar auxiliares.
7. Use Peões para dividir o trabalho entre recursos e construção.
8. Acompanhe o relógio: termine as defesas antes do anoitecer.
9. Durante a caçada, acompanhe a vida do muro, da torre e do Vampiro.

**O dia prepara a defesa. A noite coloca suas escolhas à prova.**

**Sangue, ou liberdade.**
