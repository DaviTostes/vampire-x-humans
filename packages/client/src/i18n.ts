// Internacionalização (gettext-style): a string-fonte é o português, usado como
// chave. O catálogo traz as traduções de en/es; 'pt' devolve a própria chave.
// Default: inglês. A escolha é persistida e notifica quem se inscreveu.

import './i18n.css';

export type Locale = 'en' | 'pt' | 'es';

export const LOCALES: readonly Locale[] = ['en', 'pt', 'es'];
const STORAGE_KEY = 'vxh.locale';
const DEFAULT_LOCALE: Locale = 'en';

const NATIVE_NAMES: Record<Locale, string> = { en: 'English', pt: 'Português', es: 'Español' };
const LOCALE_FLAGS: Record<Locale, string> = { en: '🇬🇧', pt: '🇧🇷', es: '🇪🇸' };

type Params = Record<string, string | number>;

// ---- catálogo (chave = português) ----
const EN: Record<string, string> = {
  // interface de idioma / menu
  'Idioma': 'Language',
  'Menu': 'Menu',
  'Sair': 'Quit',
  'Cancelar': 'Cancel',
  'Idioma do jogo': 'Game language',
  'Volume da música': 'Music volume',

  // loading
  'Preparando o Vale da Vigília…': 'Preparing the Vale of the Vigil…',
  'Carregando modelos': 'Loading models',
  'preparando…': 'preparing…',
  '{loaded} / {total} modelos': '{loaded} / {total} models',
  'O <b>Vampiro</b> fica preso ao raio da Cripta durante o dia.': 'The <b>Vampire</b> is bound to the Crypt radius during the day.',
  '<b>Muros</b> bloqueiam o Vampiro, mas Humanos e Peões atravessam.': '<b>Walls</b> block the Vampire, but Humans and Peons pass through.',
  'As <b>torres</b> atiram de dia e de noite, se o Vampiro estiver ao alcance.': '<b>Towers</b> fire day and night if the Vampire is in range.',
  'Se os Humanos aguentarem a noite inteira, o <b>amanhecer</b> traz a vitória.': 'If the Humans survive the whole night, <b>dawn</b> brings victory.',
  'As <b>minas de ouro</b> ficam fora dos refúgios: coletar exige se expor.': '<b>Gold mines</b> lie outside the refuges: gathering means exposing yourself.',
  'À noite o Vampiro fica mais rápido e passa a <b>regenerar</b>.': 'At night the Vampire becomes faster and starts to <b>regenerate</b>.',

  // lobby
  'Um vampiro caça. Os outros constroem defesas e tentam sobreviver até o amanhecer.': 'One vampire hunts. The others build defenses and try to survive until dawn.',
  'Humanos': 'Humans',
  'até {n}': 'up to {n}',
  'Vampiro': 'Vampire',
  'Humano': 'Human',
  'Seu nome': 'Your name',
  'Criando…': 'Creating…',
  'Criar sala': 'Create room',
  'ou': 'or',
  'Entrar com código': 'Join with code',
  'Código': 'Code',
  'Entrando…': 'Joining…',
  'Entrar': 'Join',
  'Reconectar': 'Reconnect',
  'Conectado': 'Online',
  'Conectando…': 'Connecting…',
  'Desconectado': 'Offline',
  'Sair da sala': 'Leave room',
  'Sala': 'Room',
  'Copiar': 'Copy',
  'Compartilhe o código': 'Share the code',
  'Código copiado': 'Code copied',
  'Compartilhe o código {code}': 'Share code {code}',
  'Jogadores': 'Players',
  'VOCÊ': 'YOU',
  'Escolhendo equipe': 'Choosing team',
  'Anfitrião': 'Host',
  'Pronto': 'Ready',
  'Preparando': 'Preparing',
  'prontos': 'ready',
  'Mapa': 'Map',
  'Tempos da partida': 'Match times',
  'Você define': 'You set them',
  'Definido pelo anfitrião': 'Set by the host',
  'Dia': 'Day',
  'Noite': 'Night',
  'Se o dia raiar de novo, os humanos vencem. O vampiro compra itens na Cripta a qualquer momento.': 'If day breaks again, the humans win. The vampire buys items at the Crypt at any time.',
  'Estou pronto': "I'm ready",
  '✓ Pronto — cancelar': '✓ Ready — cancel',
  'Pronto para testar sozinho.': 'Ready to test solo.',
  'Todos prontos.': 'Everyone ready.',
  'Iniciando…': 'Starting…',
  'Iniciar teste solo': 'Start solo test',
  'Iniciar partida': 'Start match',
  'Aguardando anfitrião': 'Waiting for host',
  'Digite o código de {n} caracteres da sala.': 'Enter the {n}-character room code.',

  // HUD
  'Selecionar e centralizar seu personagem (Espaço)': 'Select and center your character (Space)',
  'VALE DA VIGÍLIA': 'VALE OF THE VIGIL',
  'ATRIBUTOS': 'ATTRIBUTES',
  'HABILIDADES': 'ABILITIES',
  'Teste solo · ': 'Solo test · ',
  'Sair da partida?': 'Leave the match?',
  'Suas unidades ficarão abandonadas na sala. Deseja realmente voltar ao início?': 'Your units will be left behind in the room. Really return to the start?',
  'Sair da partida': 'Leave match',
  'Selecione uma unidade': 'Select a unit',
  'Sem seleção': 'No selection',
  'nível {n}': 'level {n}',
  'Obra: {pct}%': 'Work: {pct}%',
  '🛡 Fortificado ({s}s)': '🛡 Fortified ({s}s)',
  'Produção: {amount} ouro / {s}s': 'Production: {amount} gold / {s}s',
  'Produção: {amount} sangue / {s}s': 'Production: {amount} blood / {s}s',
  'Vida máxima: {hp} · Nível {next}: {nextHp} HP': 'Max HP: {hp} · Level {next}: {nextHp} HP',
  '· Nível máximo': '· Max level',
  'Danificado — clique com o botão direito com um Humano/Peão para reparar': 'Damaged — right-click with a Human/Peon to repair',
  'Treinando {name} · {s}s': 'Training {name} · {s}s',
  'Aguardando uma saída livre': 'Waiting for a free spawn',
  'Alcance: {range} · Dano: {dmg} / {cd}s': 'Range: {range} · Damage: {dmg} / {cd}s',
  'Aguardando conclusão da obra': 'Waiting for construction to finish',
  'Alvo: Vampiro — {hp}/{max} HP': 'Target: Vampire — {hp}/{max} HP',
  'Sem alvo no alcance': 'No target in range',
  'Sangue disponível: {blood}': 'Blood available: {blood}',
  '💥 Golpe ativo ({s}s)': '💥 Power Strike active ({s}s)',
  'Sangue: {blood} · Dano: {dmg}': 'Blood: {blood} · Damage: {dmg}',
  'Bônus: +{dmg} dano · +{hp} vida · +{as} vel. ataque (AS {total})': 'Bonus: +{dmg} damage · +{hp} health · +{as} attack speed (AS {total})',
  'Velocidade: {spd} · ataque a cada {cd}s': 'Speed: {spd} · attack every {cd}s',
  'Enredado ({s}s)': 'Entangled ({s}s)',
  'Silenciado ({s}s)': 'Silenced ({s}s)',
  'Forma de Morcego ({s}s)': 'Bat Form ({s}s)',
  'Retornando da Forma de Morcego': 'Returning from Bat Form',
  'Canalizando Teleport ({s}s)': 'Channeling Teleport ({s}s)',
  '{name} · {pct}% · {s}s de trabalho': '{name} · {pct}% · {s}s of work',
  '{name} · {hp}/{max} HP · Reparando…': '{name} · {hp}/{max} HP · Repairing…',
  'Reparo: {rate} HP/s': 'Repair: {rate} HP/s',
  'Reparo: {rate} HP/s (nível {n})': 'Repair: {rate} HP/s (level {n})',
  'Faltam {n} de {name}': 'Need {n} more {name}',
  '{name}: suficiente': '{name}: enough',
  'Requer Muro nível {n}': 'Requires Wall level {n}',
  'Requer Mercado nível {n} (A CONFIRMAR)': 'Requires Market level {n} (TBC)',
  'Trocar recursos': 'Trade resources',
  'Vender': 'Sell',
  'Comprar': 'Buy',
  'Inspecionando outra unidade.<br>Selecione seu personagem para dar ordens.': "Inspecting another unit.<br>Select your character to issue orders.",
  '🔨 Retomar obra': '🔨 Resume work',
  'Enviar seu Humano': 'Send your Human',
  'Nível máximo': 'Max level',
  'Melhorar para nível {n}': 'Upgrade to level {n}',
  'Produção {a} → {b} ouro/ciclo': 'Production {a} → {b} gold/cycle',
  'Limite de {name} atingido ({n})': '{name} limit reached ({n})',
  'Limite de {name} atingido ({owned}/{limit})': '{name} limit reached ({owned}/{limit})',
  '{name} — {count}/{limit}': '{name} — {count}/{limit}',
  'instantâneo': 'instant',
  '{name} Nv {lvl} → {next}': '{name} Lv {lvl} → {next}',
  ' (máx)': ' (max)',
  'Melhorar {name} para nível {n}': 'Upgrade {name} to level {n}',
  'Nível indefinido (A CONFIRMAR) ou máximo': 'Level undefined (TBC) or max',
  'Faltam {n} de sangue': 'Need {n} more blood',
  'Comprar com sangue': 'Buy with blood',
  '✓ Máximo': '✓ Max',
  'Nv {a} → {b}': 'Lv {a} → {b}',
  'Cripta no nível máximo': 'Crypt at max level',
  'Melhorar Cripta para nível {n}': 'Upgrade Crypt to level {n}',
  'Aumenta a vida máxima para {hp} HP': 'Raises max HP to {hp} HP',
  '{a} → {b} HP': '{a} → {b} HP',
  '🔨 Reparar muro': '🔨 Repair wall',
  '🔨 Vigiar muro': '🔨 Watch wall',
  'de prontidão · repara ao levar dano': 'on standby · repairs when damaged',
  'Envia um Humano/Peão para reparar': 'Sends a Human/Peon to repair',
  'Deixa um Humano/Peão de prontidão para reparar automaticamente': 'Leaves a Human/Peon on standby to auto-repair',
  'Aumenta o nível do Mercado': 'Raises the Market level',
  'Aumenta o dano para {dmg}': 'Raises damage to {dmg}',
  '{a} → {b} dano': '{a} → {b} damage',
  '🧨 Demolir': '🧨 Demolish',
  'Destrói esta construção (sem reembolso)': 'Destroys this building (no refund)',
  'Compre e melhore itens e skills na Cripta, de dia ou de noite.': 'Buy and upgrade items and skills at the Crypt, day or night.',
  'Esta unidade não constrói.<br>Use o Humano ou um Minerador.': "This unit can't build.<br>Use the Human or a Miner.",
  'Ativa · {s}s': 'Active · {s}s',
  'Disponível apenas à noite': 'Available only at night',
  'Sem usos nesta noite (1 por noite)': 'No uses left tonight (1 per night)',
  'Revela uma área do mapa por 10s': 'Reveals an area of the map for 10s',
  'Saindo da forma': 'Leaving the form',
  'Invulnerável e mais rápido por até 15s': 'Invulnerable and faster for up to 15s',
  'Canalizando · {s}s': 'Channeling · {s}s',
  'Canaliza 2,8s e retorna à base': 'Channels 2.8s and returns to base',
  'Recarga · {s}s': 'Cooldown · {s}s',
  'Vampiro indisponível': 'Vampire unavailable',
  'Sem itens equipados': 'No items equipped',
  'Bônus total: +{n}': 'Total bonus: +{n}',
  'Peão do Humano {n}': 'Human {n} Peon',
  'Humano {n}': 'Human {n}',
  '☠ {who} tombou': '☠ {who} has fallen',
  'VITÓRIA': 'VICTORY',
  'DERROTA': 'DEFEAT',
  'Voltar para a sala': 'Back to room',
  'Sair para o início': 'Quit to start',

  // nomes de construções / unidades / funções
  'Sede da vila': 'Village Keep',
  'Banco': 'Bank',
  'Taverna': 'Tavern',
  'Muro': 'Wall',
  'Torre': 'Tower',
  'Mina de Ouro': 'Gold Mine',
  'Mercado': 'Market',
  'Cripta do Vampiro': 'Vampire Crypt',
  'Cripta': 'Crypt',
  'Peão': 'Peon',
  'Lenhador': 'Lumberjack',
  'Minerador': 'Miner',
  'Reparador': 'Repairer',

  // ajuda de construções
  'Base principal da vila.': 'The village main base.',
  'Gera ouro a cada ciclo; o valor dobra a cada melhoria (1 → 2 → 4…).': 'Generates gold every cycle; the amount doubles per upgrade (1 → 2 → 4…).',
  'Recruta Peões auxiliares para coletar e construir.': 'Recruits helper Peons to gather and build.',
  'Humanos atravessam; o vampiro precisa destruí-lo.': 'Humans pass through; the vampire must destroy it.',
  'Ataca o vampiro automaticamente quando ele entra no alcance.': 'Automatically attacks the vampire when it comes into range.',
  'Única construção onde se troca madeira por ouro e vice-versa.': 'The only building where wood and gold are traded.',
  'Fonte de ouro: o Minerador extrai ouro dela.': 'Gold source: the Miner extracts gold from it.',
  'Base do Vampiro. Compre itens e desbloqueie skills a qualquer momento.': 'The Vampire base. Buy items and unlock skills at any time.',

  // atividades
  'Coletando {name}': 'Gathering {name}',
  'Construindo': 'Building',
  'Reparando muro': 'Repairing wall',
  'Atacando': 'Attacking',
  'Sem caminho — escolha outra ordem': 'No path — choose another order',
  'Indo coletar {name}': 'Going to gather {name}',
  'Indo construir': 'Going to build',
  'Indo reparar': 'Going to repair',
  'Indo atacar': 'Going to attack',
  'Movendo': 'Moving',
  'Aguardando ordem': 'Awaiting orders',
  'madeira': 'wood',
  'ouro': 'gold',

  // extensões (HUD, admin, servidor)
  'Vida máxima: {hp}': 'Max HP: {hp}',
  'tecla {n}': 'key {n}',
  'Produção {a} → {b} sangue / {s}s': 'Production {a} → {b} blood / {s}s',
  'Nv {n}': 'Lv {n}',
  'Os humanos sobreviveram a {n} noites!': 'The humans survived {n} nights!',
  'Os humanos sobreviveram à noite!': 'The humans survived the night!',
  'O vampiro foi destruído pelos humanos!': 'The vampire was destroyed by the humans!',
  'As defesas da vila destruíram o vampiro!': "The village defenses destroyed the vampire!",
  'O vampiro foi eliminado!': 'The vampire was slain!',
  'Todos os humanos foram caçados. Sangue e liberdade.': 'Every human has been hunted. Blood and freedom.',
  'Não foi possível conectar ao servidor': 'Could not connect to the server',
  'Conexão perdida. Reconecte para entrar novamente na sala.': 'Connection lost. Reconnect to rejoin the room.',
  'Sem conexão com o servidor': 'No connection to the server',
  'Cripta indisponível': 'Crypt unavailable',
  'Aproxime o Vampiro da cripta para comprar': 'Move the Vampire closer to the crypt to buy',
  'Peão pronto': 'Peon ready',
  'Obra concluída': 'Construction complete',
  'Fortificado': 'Fortified',
  'Enredado': 'Entangled',
  'Silenciado': 'Silenced',
  'Forma de Morcego': 'Bat Form',
  'Canalizando…': 'Channeling…',
  'Revelar Área': 'Reveal Area',
  'Teleportar para a Base': 'Teleport to Base',
  'Enredar': 'Entangle',
  'O Vampiro não pode atacar por 4s': 'The Vampire cannot attack for 4s',
  'Fortificar': 'Fortify',
  'Torna o alvo invulnerável por 8s': 'Makes the target invulnerable for 8s',
  'Teleporte': 'Teleport',
  'Teleporta o Humano até 600 unidades': 'Teleports the Human up to 600 units',
  'Silenciador': 'Silencer',
  'O Vampiro não pode usar habilidades por 1,5s': 'The Vampire cannot use abilities for 1.5s',
  'Lâmina Sangrenta': 'Blood Blade',
  'Aumenta o dano do Vampiro': 'Increases the Vampire damage',
  'Coração Ancestral': 'Ancestral Heart',
  'Aumenta a vida máxima': 'Increases max health',
  'Ímpeto Sanguinário': 'Bloodlust',
  'Aumenta a velocidade de ataque (máx. 600)': 'Increases attack speed (max. 600)',
  'Golpe Sombrio': 'Dark Strike',
  'Dobra o dano por 8s': 'Doubles damage for 8s',
  'Mapa original, mais aberto e com 8 refúgios iguais.': 'The original map: more open, with 8 equal refuges.',
  'Vale da Vigília': 'Vale of the Vigil',
  'Labirinto de Dédalo': "Daedalus' Labyrinth",
  'Labirinto procedural de corredores finos, becos e salas, com refúgios únicos.': 'A procedural labyrinth of narrow corridors, dead ends and rooms, with unique refuges.',

  // administração (teste solo)
  'Admin · teste solo': 'Admin · solo test',
  'Ferramentas disponíveis apenas no teste solo.': 'Tools available only in solo test.',
  'Quantidade de recursos': 'Resource amount',
  '+ Ouro': '+ Gold',
  '+ Madeira': '+ Wood',
  '+ Sangue': '+ Blood',
  'Curar unidades': 'Heal units',

  // mensagens do servidor
  'Muitas tentativas. Aguarde alguns segundos.': 'Too many attempts. Wait a few seconds.',
  'Saia da sala atual antes de criar outra': 'Leave your current room before creating another',
  'Você já está em uma sala': 'You are already in a room',
  'Sala não encontrada': 'Room not found',
  'Só é possível sair pelo lobby antes da partida': 'You can only leave from the lobby before the match',
  'Entre em uma sala primeiro': 'Join a room first',
  'Somente o anfitrião pode iniciar': 'Only the host can start',
  'Não foi possível iniciar': 'Could not start',
  'A partida já começou': 'The match has already started',
  'Equipe inválida': 'Invalid team',
  'Confirmação inválida': 'Invalid confirmation',
  'Escolha Humano ou Vampiro antes de ficar pronto': 'Choose Human or Vampire before getting ready',
  'Somente o anfitrião pode alterar os tempos': 'Only the host can change the times',
  'Somente o anfitrião pode escolher o mapa': 'Only the host can choose the map',
  'Mapa inválido': 'Invalid map',
  'Tempos inválidos': 'Invalid times',
  'A sala está vazia': 'The room is empty',
  'Todos precisam escolher uma equipe': 'Everyone must choose a team',
  'Um jogador precisa escolher Vampiro': 'One player must choose Vampire',
  'A sala precisa de pelo menos um Humano': 'The room needs at least one Human',
  'Aguardando todos ficarem prontos': 'Waiting for everyone to be ready',
  'Marque Pronto para iniciar um teste solo': 'Mark Ready to start a solo test',
  'Partida em andamento': 'Match in progress',
  'Sala cheia': 'Room full',
  'Você já está nesta sala': 'You are already in this room',
  'Outro jogador já escolheu Vampiro': 'Another player already chose Vampire',
  'A equipe humana está cheia': 'The human team is full',
};

const ES: Record<string, string> = {
  // interface de idioma / menu
  'Idioma': 'Idioma',
  'Menu': 'Menú',
  'Sair': 'Salir',
  'Cancelar': 'Cancelar',
  'Idioma do jogo': 'Idioma del juego',
  'Volume da música': 'Volumen de la música',

  // loading
  'Preparando o Vale da Vigília…': 'Preparando el Valle de la Vigilia…',
  'Carregando modelos': 'Cargando modelos',
  'preparando…': 'preparando…',
  '{loaded} / {total} modelos': '{loaded} / {total} modelos',
  'O <b>Vampiro</b> fica preso ao raio da Cripta durante o dia.': 'El <b>Vampiro</b> permanece atado al radio de la Cripta durante el día.',
  '<b>Muros</b> bloqueiam o Vampiro, mas Humanos e Peões atravessam.': 'Los <b>muros</b> bloquean al Vampiro, pero Humanos y Peones los atraviesan.',
  'As <b>torres</b> atiram de dia e de noite, se o Vampiro estiver ao alcance.': 'Las <b>torres</b> disparan de día y de noche si el Vampiro está al alcance.',
  'Se os Humanos aguentarem a noite inteira, o <b>amanhecer</b> traz a vitória.': 'Si los Humanos aguantan toda la noche, el <b>amanecer</b> trae la victoria.',
  'As <b>minas de ouro</b> ficam fora dos refúgios: coletar exige se expor.': 'Las <b>minas de oro</b> están fuera de los refugios: recolectar exige exponerse.',
  'À noite o Vampiro fica mais rápido e passa a <b>regenerar</b>.': 'De noche el Vampiro se vuelve más rápido y empieza a <b>regenerarse</b>.',

  // lobby
  'Um vampiro caça. Os outros constroem defesas e tentam sobreviver até o amanhecer.': 'Un vampiro caza. Los demás construyen defensas e intentan sobrevivir hasta el amanecer.',
  'Humanos': 'Humanos',
  'até {n}': 'hasta {n}',
  'Vampiro': 'Vampiro',
  'Humano': 'Humano',
  'Seu nome': 'Tu nombre',
  'Criando…': 'Creando…',
  'Criar sala': 'Crear sala',
  'ou': 'o',
  'Entrar com código': 'Entrar con código',
  'Código': 'Código',
  'Entrando…': 'Entrando…',
  'Entrar': 'Entrar',
  'Reconectar': 'Reconectar',
  'Conectado': 'Conectado',
  'Conectando…': 'Conectando…',
  'Desconectado': 'Desconectado',
  'Sair da sala': 'Salir de la sala',
  'Sala': 'Sala',
  'Copiar': 'Copiar',
  'Compartilhe o código': 'Comparte el código',
  'Código copiado': 'Código copiado',
  'Compartilhe o código {code}': 'Comparte el código {code}',
  'Jogadores': 'Jugadores',
  'VOCÊ': 'TÚ',
  'Escolhendo equipe': 'Eligiendo equipo',
  'Anfitrião': 'Anfitrión',
  'Pronto': 'Listo',
  'Preparando': 'Preparando',
  'prontos': 'listos',
  'Mapa': 'Mapa',
  'Tempos da partida': 'Tiempos de la partida',
  'Você define': 'Tú los defines',
  'Definido pelo anfitrião': 'Definido por el anfitrión',
  'Dia': 'Día',
  'Noite': 'Noche',
  'Se o dia raiar de novo, os humanos vencem. O vampiro compra itens na Cripta a qualquer momento.': 'Si amanece de nuevo, los humanos ganan. El vampiro compra objetos en la Cripta en cualquier momento.',
  'Estou pronto': 'Estoy listo',
  '✓ Pronto — cancelar': '✓ Listo — cancelar',
  'Pronto para testar sozinho.': 'Listo para probar en solitario.',
  'Todos prontos.': 'Todos listos.',
  'Iniciando…': 'Iniciando…',
  'Iniciar teste solo': 'Iniciar prueba en solitario',
  'Iniciar partida': 'Iniciar partida',
  'Aguardando anfitrião': 'Esperando al anfitrión',
  'Digite o código de {n} caracteres da sala.': 'Ingresa el código de {n} caracteres de la sala.',

  // HUD
  'Selecionar e centralizar seu personagem (Espaço)': 'Seleccionar y centrar tu personaje (Espacio)',
  'VALE DA VIGÍLIA': 'VALLE DE LA VIGILIA',
  'ATRIBUTOS': 'ATRIBUTOS',
  'HABILIDADES': 'HABILIDADES',
  'Teste solo · ': 'Prueba en solitario · ',
  'Sair da partida?': '¿Salir de la partida?',
  'Suas unidades ficarão abandonadas na sala. Deseja realmente voltar ao início?': 'Tus unidades quedarán abandonadas en la sala. ¿Seguro que quieres volver al inicio?',
  'Sair da partida': 'Salir de la partida',
  'Selecione uma unidade': 'Selecciona una unidad',
  'Sem seleção': 'Sin selección',
  'nível {n}': 'nivel {n}',
  'Obra: {pct}%': 'Obra: {pct}%',
  '🛡 Fortificado ({s}s)': '🛡 Fortificado ({s}s)',
  'Produção: {amount} ouro / {s}s': 'Producción: {amount} oro / {s}s',
  'Produção: {amount} sangue / {s}s': 'Producción: {amount} sangre / {s}s',
  'Vida máxima: {hp} · Nível {next}: {nextHp} HP': 'Vida máxima: {hp} · Nivel {next}: {nextHp} HP',
  '· Nível máximo': '· Nivel máximo',
  'Danificado — clique com o botão direito com um Humano/Peão para reparar': 'Dañado — clic derecho con un Humano/Peón para reparar',
  'Treinando {name} · {s}s': 'Entrenando {name} · {s}s',
  'Aguardando uma saída livre': 'Esperando un punto de salida libre',
  'Alcance: {range} · Dano: {dmg} / {cd}s': 'Alcance: {range} · Daño: {dmg} / {cd}s',
  'Aguardando conclusão da obra': 'Esperando a que termine la obra',
  'Alvo: Vampiro — {hp}/{max} HP': 'Objetivo: Vampiro — {hp}/{max} HP',
  'Sem alvo no alcance': 'Sin objetivo al alcance',
  'Sangue disponível: {blood}': 'Sangre disponible: {blood}',
  '💥 Golpe ativo ({s}s)': '💥 Golpe activo ({s}s)',
  'Sangue: {blood} · Dano: {dmg}': 'Sangre: {blood} · Daño: {dmg}',
  'Bônus: +{dmg} dano · +{hp} vida · +{as} vel. ataque (AS {total})': 'Bono: +{dmg} daño · +{hp} vida · +{as} vel. de ataque (AS {total})',
  'Velocidade: {spd} · ataque a cada {cd}s': 'Velocidad: {spd} · ataque cada {cd}s',
  'Enredado ({s}s)': 'Enredado ({s}s)',
  'Silenciado ({s}s)': 'Silenciado ({s}s)',
  'Forma de Morcego ({s}s)': 'Forma de Murciélago ({s}s)',
  'Retornando da Forma de Morcego': 'Regresando de la Forma de Murciélago',
  'Canalizando Teleport ({s}s)': 'Canalizando Teletransporte ({s}s)',
  '{name} · {pct}% · {s}s de trabalho': '{name} · {pct}% · {s}s de trabajo',
  '{name} · {hp}/{max} HP · Reparando…': '{name} · {hp}/{max} HP · Reparando…',
  'Reparo: {rate} HP/s': 'Reparación: {rate} HP/s',
  'Reparo: {rate} HP/s (nível {n})': 'Reparación: {rate} HP/s (nivel {n})',
  'Faltam {n} de {name}': 'Faltan {n} de {name}',
  '{name}: suficiente': '{name}: suficiente',
  'Requer Muro nível {n}': 'Requiere Muro nivel {n}',
  'Requer Mercado nível {n} (A CONFIRMAR)': 'Requiere Mercado nivel {n} (POR CONFIRMAR)',
  'Trocar recursos': 'Intercambiar recursos',
  'Vender': 'Vender',
  'Comprar': 'Comprar',
  'Inspecionando outra unidade.<br>Selecione seu personagem para dar ordens.': 'Inspeccionando otra unidad.<br>Selecciona tu personaje para dar órdenes.',
  '🔨 Retomar obra': '🔨 Retomar obra',
  'Enviar seu Humano': 'Enviar tu Humano',
  'Nível máximo': 'Nivel máximo',
  'Melhorar para nível {n}': 'Mejorar a nivel {n}',
  'Produção {a} → {b} ouro/ciclo': 'Producción {a} → {b} oro/ciclo',
  'Limite de {name} atingido ({n})': 'Límite de {name} alcanzado ({n})',
  'Limite de {name} atingido ({owned}/{limit})': 'Límite de {name} alcanzado ({owned}/{limit})',
  '{name} — {count}/{limit}': '{name} — {count}/{limit}',
  'instantâneo': 'instantáneo',
  '{name} Nv {lvl} → {next}': '{name} Nv {lvl} → {next}',
  ' (máx)': ' (máx)',
  'Melhorar {name} para nível {n}': 'Mejorar {name} a nivel {n}',
  'Nível indefinido (A CONFIRMAR) ou máximo': 'Nivel indefinido (POR CONFIRMAR) o máximo',
  'Faltam {n} de sangue': 'Faltan {n} de sangre',
  'Comprar com sangue': 'Comprar con sangre',
  '✓ Máximo': '✓ Máximo',
  'Nv {a} → {b}': 'Nv {a} → {b}',
  'Cripta no nível máximo': 'Cripta en nivel máximo',
  'Melhorar Cripta para nível {n}': 'Mejorar Cripta a nivel {n}',
  'Aumenta a vida máxima para {hp} HP': 'Aumenta la vida máxima a {hp} HP',
  '{a} → {b} HP': '{a} → {b} HP',
  '🔨 Reparar muro': '🔨 Reparar muro',
  '🔨 Vigiar muro': '🔨 Vigilar muro',
  'de prontidão · repara ao levar dano': 'en guardia · repara al recibir daño',
  'Envia um Humano/Peão para reparar': 'Envía un Humano/Peón a reparar',
  'Deixa um Humano/Peão de prontidão para reparar automaticamente': 'Deja un Humano/Peón en guardia para reparar automáticamente',
  'Aumenta o nível do Mercado': 'Aumenta el nivel del Mercado',
  'Aumenta o dano para {dmg}': 'Aumenta el daño a {dmg}',
  '{a} → {b} dano': '{a} → {b} daño',
  '🧨 Demolir': '🧨 Demoler',
  'Destrói esta construção (sem reembolso)': 'Destruye esta construcción (sin reembolso)',
  'Compre e melhore itens e skills na Cripta, de dia ou de noite.': 'Compra y mejora objetos y habilidades en la Cripta, de día o de noche.',
  'Esta unidade não constrói.<br>Use o Humano ou um Minerador.': 'Esta unidad no construye.<br>Usa el Humano o un Minero.',
  'Ativa · {s}s': 'Activa · {s}s',
  'Disponível apenas à noite': 'Disponible solo de noche',
  'Sem usos nesta noite (1 por noite)': 'Sin usos esta noche (1 por noche)',
  'Revela uma área do mapa por 10s': 'Revela un área del mapa durante 10s',
  'Saindo da forma': 'Saliendo de la forma',
  'Invulnerável e mais rápido por até 15s': 'Invulnerable y más rápido hasta 15s',
  'Canalizando · {s}s': 'Canalizando · {s}s',
  'Canaliza 2,8s e retorna à base': 'Canaliza 2,8s y regresa a la base',
  'Recarga · {s}s': 'Recarga · {s}s',
  'Vampiro indisponível': 'Vampiro no disponible',
  'Sem itens equipados': 'Sin objetos equipados',
  'Bônus total: +{n}': 'Bono total: +{n}',
  'Peão do Humano {n}': 'Peón del Humano {n}',
  'Humano {n}': 'Humano {n}',
  '☠ {who} tombou': '☠ {who} ha caído',
  'VITÓRIA': 'VICTORIA',
  'DERROTA': 'DERROTA',
  'Voltar para a sala': 'Volver a la sala',
  'Sair para o início': 'Salir al inicio',

  // nomes
  'Sede da vila': 'Sede de la aldea',
  'Banco': 'Banco',
  'Taverna': 'Taberna',
  'Muro': 'Muro',
  'Torre': 'Torre',
  'Mina de Ouro': 'Mina de Oro',
  'Mercado': 'Mercado',
  'Cripta do Vampiro': 'Cripta del Vampiro',
  'Cripta': 'Cripta',
  'Peão': 'Peón',
  'Lenhador': 'Leñador',
  'Minerador': 'Minero',
  'Reparador': 'Reparador',

  // ajuda
  'Base principal da vila.': 'Base principal de la aldea.',
  'Gera ouro a cada ciclo; o valor dobra a cada melhoria (1 → 2 → 4…).': 'Genera oro cada ciclo; el valor se duplica por mejora (1 → 2 → 4…).',
  'Recruta Peões auxiliares para coletar e construir.': 'Recluta Peones auxiliares para recolectar y construir.',
  'Humanos atravessam; o vampiro precisa destruí-lo.': 'Los Humanos pasan; el vampiro debe destruirlo.',
  'Ataca o vampiro automaticamente quando ele entra no alcance.': 'Ataca al vampiro automáticamente cuando entra en alcance.',
  'Única construção onde se troca madeira por ouro e vice-versa.': 'Única construcción donde se cambia madera por oro y viceversa.',
  'Fonte de ouro: o Minerador extrai ouro dela.': 'Fuente de oro: el Minero extrae oro de ella.',
  'Base do Vampiro. Compre itens e desbloqueie skills a qualquer momento.': 'Base del Vampiro. Compra objetos y desbloquea habilidades en cualquier momento.',

  // atividades
  'Coletando {name}': 'Recolectando {name}',
  'Construindo': 'Construyendo',
  'Reparando muro': 'Reparando muro',
  'Atacando': 'Atacando',
  'Sem caminho — escolha outra ordem': 'Sin camino — elige otra orden',
  'Indo coletar {name}': 'Yendo a recolectar {name}',
  'Indo construir': 'Yendo a construir',
  'Indo reparar': 'Yendo a reparar',
  'Indo atacar': 'Yendo a atacar',
  'Movendo': 'Moviéndose',
  'Aguardando ordem': 'Esperando órdenes',
  'madeira': 'madera',
  'ouro': 'oro',

  // extensões (HUD, admin, servidor)
  'Vida máxima: {hp}': 'Vida máxima: {hp}',
  'tecla {n}': 'tecla {n}',
  'Produção {a} → {b} sangue / {s}s': 'Producción {a} → {b} sangre / {s}s',
  'Nv {n}': 'Nv {n}',
  'Os humanos sobreviveram a {n} noites!': '¡Los humanos sobrevivieron {n} noches!',
  'Os humanos sobreviveram à noite!': '¡Los humanos sobrevivieron a la noche!',
  'O vampiro foi destruído pelos humanos!': '¡Los humanos destruyeron al vampiro!',
  'As defesas da vila destruíram o vampiro!': '¡Las defensas de la aldea destruyeron al vampiro!',
  'O vampiro foi eliminado!': '¡El vampiro fue eliminado!',
  'Todos os humanos foram caçados. Sangue e liberdade.': 'Todos los humanos fueron cazados. Sangre y libertad.',
  'Não foi possível conectar ao servidor': 'No se pudo conectar al servidor',
  'Conexão perdida. Reconecte para entrar novamente na sala.': 'Conexión perdida. Reconéctate para volver a entrar en la sala.',
  'Sem conexão com o servidor': 'Sin conexión con el servidor',
  'Cripta indisponível': 'Cripta no disponible',
  'Aproxime o Vampiro da cripta para comprar': 'Acerca al Vampiro a la cripta para comprar',
  'Peão pronto': 'Peón listo',
  'Obra concluída': 'Obra completada',
  'Fortificado': 'Fortificado',
  'Enredado': 'Enredado',
  'Silenciado': 'Silenciado',
  'Forma de Morcego': 'Forma de Murciélago',
  'Canalizando…': 'Canalizando…',
  'Revelar Área': 'Revelar Área',
  'Teleportar para a Base': 'Teletransportar a la Base',
  'Enredar': 'Enredar',
  'O Vampiro não pode atacar por 4s': 'El Vampiro no puede atacar durante 4s',
  'Fortificar': 'Fortificar',
  'Torna o alvo invulnerável por 8s': 'Vuelve al objetivo invulnerable durante 8s',
  'Teleporte': 'Teletransporte',
  'Teleporta o Humano até 600 unidades': 'Teletransporta al Humano hasta 600 unidades',
  'Silenciador': 'Silenciador',
  'O Vampiro não pode usar habilidades por 1,5s': 'El Vampiro no puede usar habilidades durante 1,5s',
  'Lâmina Sangrenta': 'Cuchilla Sangrienta',
  'Aumenta o dano do Vampiro': 'Aumenta el daño del Vampiro',
  'Coração Ancestral': 'Corazón Ancestral',
  'Aumenta a vida máxima': 'Aumenta la vida máxima',
  'Ímpeto Sanguinário': 'Ímpetu Sanguinario',
  'Aumenta a velocidade de ataque (máx. 600)': 'Aumenta la velocidad de ataque (máx. 600)',
  'Golpe Sombrio': 'Golpe Sombrío',
  'Dobra o dano por 8s': 'Duplica el daño durante 8s',
  'Mapa original, mais aberto e com 8 refúgios iguais.': 'El mapa original: más abierto, con 8 refugios iguales.',
  'Vale da Vigília': 'Valle de la Vigilia',
  'Labirinto de Dédalo': 'Laberinto de Dédalo',
  'Labirinto procedural de corredores finos, becos e salas, com refúgios únicos.': 'Laberinto procedural de corredores finos, callejones y salas, con refugios únicos.',

  // administración (prueba en solitario)
  'Admin · teste solo': 'Admin · prueba en solitario',
  'Ferramentas disponíveis apenas no teste solo.': 'Herramientas disponibles solo en la prueba en solitario.',
  'Quantidade de recursos': 'Cantidad de recursos',
  '+ Ouro': '+ Oro',
  '+ Madeira': '+ Madera',
  '+ Sangue': '+ Sangre',
  'Curar unidades': 'Curar unidades',

  // mensajes del servidor
  'Muitas tentativas. Aguarde alguns segundos.': 'Demasiados intentos. Espera unos segundos.',
  'Saia da sala atual antes de criar outra': 'Sal de la sala actual antes de crear otra',
  'Você já está em uma sala': 'Ya estás en una sala',
  'Sala não encontrada': 'Sala no encontrada',
  'Só é possível sair pelo lobby antes da partida': 'Solo puedes salir desde el lobby antes de la partida',
  'Entre em uma sala primeiro': 'Entra en una sala primero',
  'Somente o anfitrião pode iniciar': 'Solo el anfitrión puede iniciar',
  'Não foi possível iniciar': 'No se pudo iniciar',
  'A partida já começou': 'La partida ya comenzó',
  'Equipe inválida': 'Equipo inválido',
  'Confirmação inválida': 'Confirmación inválida',
  'Escolha Humano ou Vampiro antes de ficar pronto': 'Elige Humano o Vampiro antes de estar listo',
  'Somente o anfitrião pode alterar os tempos': 'Solo el anfitrión puede cambiar los tiempos',
  'Somente o anfitrião pode escolher o mapa': 'Solo el anfitrión puede elegir el mapa',
  'Mapa inválido': 'Mapa inválido',
  'Tempos inválidos': 'Tiempos inválidos',
  'A sala está vazia': 'La sala está vacía',
  'Todos precisam escolher uma equipe': 'Todos deben elegir un equipo',
  'Um jogador precisa escolher Vampiro': 'Un jugador debe elegir Vampiro',
  'A sala precisa de pelo menos um Humano': 'La sala necesita al menos un Humano',
  'Aguardando todos ficarem prontos': 'Esperando a que todos estén listos',
  'Marque Pronto para iniciar um teste solo': 'Marca Listo para iniciar una prueba en solitario',
  'Partida em andamento': 'Partida en curso',
  'Sala cheia': 'Sala llena',
  'Você já está nesta sala': 'Ya estás en esta sala',
  'Outro jogador já escolheu Vampiro': 'Otro jugador ya eligió Vampiro',
  'A equipe humana está cheia': 'El equipo humano está lleno',
};

const CATALOGS: Record<Locale, Record<string, string>> = { en: EN, es: ES, pt: {} };

let current: Locale = loadLocale();
const listeners = new Set<() => void>();

function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'pt' || value === 'es';
}

function loadLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch { /* armazenamento indisponível */ }
  return DEFAULT_LOCALE;
}

export function getLocale(): Locale {
  return current;
}

export function setLocale(locale: Locale): void {
  if (!isLocale(locale) || locale === current) return;
  current = locale;
  try { localStorage.setItem(STORAGE_KEY, locale); } catch { /* armazenamento indisponível */ }
  for (const listener of listeners) listener();
}

export function onLocaleChange(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function localeNativeName(locale: Locale): string {
  return NATIVE_NAMES[locale];
}

function interpolate(template: string, params?: Params): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match);
}

/**
 * Traduz uma string-fonte em português para o idioma atual.
 * `t('Faltam {n} de {name}', { n: 5, name: t('ouro') })`
 */
export function t(source: string, params?: Params): string {
  const template = current === 'pt' ? source : (CATALOGS[current][source] ?? source);
  return interpolate(template, params);
}

/** Aplica `t()` a uma frase vinda do servidor (em português). */
export function tServer(source: string | null | undefined): string {
  if (!source) return '';
  return t(source);
}

/** Bandeirinhas de idioma lado a lado; a ativa fica destacada. */
export function createLocaleSwitcher(className = 'vxh-lang-switch'): HTMLElement {
  const group = document.createElement('div');
  group.className = className;
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', t('Idioma do jogo'));
  for (const locale of LOCALES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'vxh-lang-btn';
    button.dataset.locale = locale;
    button.textContent = LOCALE_FLAGS[locale];
    button.title = NATIVE_NAMES[locale];
    button.setAttribute('aria-label', NATIVE_NAMES[locale]);
    const active = locale === current;
    button.setAttribute('aria-pressed', String(active));
    if (active) button.classList.add('active');
    button.addEventListener('click', () => setLocale(locale));
    group.appendChild(button);
  }
  return group;
}
