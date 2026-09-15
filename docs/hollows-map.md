# Refugios da Mata

Preset `hollows`, selecionavel no lobby e no Map Builder (`/?builder=1&mapId=hollows`).
O Labirinto e seus mapas salvos continuam separados. O novo mapa usa somente os assets atuais.

O terreno util ocupa aproximadamente 216 x 194 unidades dentro da grade original.
A grade nao foi reduzida: isso preserva coordenadas, navegacao e o formato do editor.
Os humanos iniciam na clareira central. A cripta ocupa seu setor sul; o circuito externo
permite contornar a clareira e os dois atalhos laterais encurtam perseguicoes.

| Base | Planta e compromisso defensivo |
| --- | --- |
| Recanto dos Cedros | L, sala de fundos e uma escada no braco curto |
| Fenda dos Corvos | Arena partida por rocha, dois acessos |
| Vigia da Nascente | Estreita e profunda, entrada lateral |
| Patio das Pedras | Maior area aberta, macico interno para dividir construcoes |
| Abrigo das Raizes | Dois bolsoes em cotovelo e uma segunda rota pelo sul |
| Porta do Bosque | Patio largo com aproximacao em curva |

Os corredores foram escavados em um macico continuo, com relevos de 3,6 unidades por
nivel e oito escadas produzidas pela mesma funcao do builder. Bosques decorativos
ocupam os macicos; recursos colhiveis ficam em locais alcancaveis, com ouro em cada base.
As construcoes existentes continuam disponiveis para os jogadores, sem edificios novos.

`packages/shared/src/hollows.ts` contem as plantas, rotas, recursos e geracao do preset.
O builder aplica alturas, pisos, escadas e obstaculos salvos por cima do layout.
`npm run test:hollows` verifica spawns, acesso de humanos/vampiros a todas as bases,
recursos, escadas, limites compactos e persistencia independente do Labirinto.
A validacao automatica de conectividade nao substitui ajuste de balanceamento em partida.
