import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { WebSocket } from 'ws';
import { createRoom, joinRoom, chooseRole, setReady, startRoom, startReason, stepRoom, leaveRoom, lobbyInfo, rooms } from '../src/rooms.js';
import { step } from '@vampire/shared';

function join(room: ReturnType<typeof createRoom>, name: string) {
  const ws = { readyState: 1, send() {} } as unknown as WebSocket;
  const client = joinRoom(room, ws, name);
  if ('error' in client) throw new Error(client.error);
  return client;
}

test('teste solo permite humano ou vampiro depois da escolha e confirmação', () => {
  for (const role of ['human', 'vampire'] as const) {
    const room = createRoom();
    const host = join(room, 'Solo');
    assert.equal(startRoom(room, host.id), false);
    chooseRole(room, host, role);
    assert.equal(startRoom(room, host.id), false);
    setReady(room, host, true);
    assert.equal(startRoom(room, host.id), true);
    assert.equal(room.session!.state.practice, true);
    step(room.session!, []);
    assert.equal(room.session!.state.result, null);
  }
});

test('preparação exige equipes, um vampiro e todos prontos; anfitrião pode ser vampiro', () => {
  const room = createRoom();
  const host = join(room, 'Anfitrião');
  const guest = join(room, 'Humano');
  assert.equal(setReady(room, host, true), 'Escolha Humano ou Vampiro antes de ficar pronto');
  assert.equal(startRoom(room, host.id), false);
  assert.equal(chooseRole(room, host, 'vampire'), null);
  assert.equal(chooseRole(room, guest, 'vampire'), 'Outro jogador já escolheu Vampiro');
  assert.equal(chooseRole(room, guest, 'human'), null);
  setReady(room, host, true);
  assert.equal(startRoom(room, host.id), false);
  setReady(room, guest, true);
  assert.equal(lobbyInfo(room).canStart, true);
  assert.equal(startRoom(room, guest.id), false);
  assert.equal(startRoom(room, host.id), true);
  assert.equal(host.playerId, 4);
  assert.equal(guest.playerId, 0);
  assert.equal(room.session!.state.units.length, 2);
  assert.equal(chooseRole(room, host, 'human'), 'A partida já começou');
  assert.equal(setReady(room, host, false), 'A partida já começou');
});

test('trocar equipe cancela a confirmação; humanos sozinhos não iniciam', () => {
  const room = createRoom();
  const host = join(room, 'A');
  const guest = join(room, 'B');
  chooseRole(room, host, 'human'); chooseRole(room, guest, 'human');
  setReady(room, host, true); setReady(room, guest, true);
  assert.equal(startReason(room), 'Um jogador precisa escolher Vampiro');
  chooseRole(room, host, 'vampire');
  assert.equal(host.ready, false);
  assert.equal(startRoom(room, host.id), false);
  setReady(room, host, true);
  assert.equal(startRoom(room, host.id), true);
});

test('entradas duplicadas são rejeitadas e a saída transfere o anfitrião', () => {
  const room = createRoom();
  const host = join(room, 'A');
  const guest = join(room, '<b>B</b>');
  assert.ok('error' in joinRoom(room, host.ws, 'Duplicado'));
  assert.equal(room.clients.length, 2);
  chooseRole(room, host, 'vampire'); chooseRole(room, guest, 'human');
  setReady(room, guest, true);
  leaveRoom(room, host.ws);
  assert.equal(room.hostId, guest.id);
  assert.equal(guest.ready, true);
  assert.equal(chooseRole(room, guest, 'vampire'), null);
  leaveRoom(room, guest.ws);
  assert.equal(rooms.has(room.code), false);
});

test('sala tem no máximo 5 jogadores e 4 vagas de humano', () => {
  const room = createRoom();
  const clients = Array.from({ length: 5 }, (_, i) => join(room, String(i)));
  for (const client of clients.slice(0, 4)) assert.equal(chooseRole(room, client, 'human'), null);
  assert.equal(chooseRole(room, clients[4]!, 'human'), 'A equipe humana está cheia');
  assert.equal(chooseRole(room, clients[4]!, 'vampire'), null);
  assert.ok('error' in joinRoom(room, {} as WebSocket, 'Extra'));
  assert.equal(room.clients.length, 5);
});

test('ao terminar a partida a sala volta ao lobby pronta para revanche', () => {
  const room = createRoom();
  const host = join(room, 'A');
  const guest = join(room, 'B');
  chooseRole(room, host, 'vampire'); chooseRole(room, guest, 'human');
  setReady(room, host, true); setReady(room, guest, true);
  assert.equal(startRoom(room, host.id), true);
  assert.equal(room.status, 'playing');
  room.session!.state.result = { winner: 'vampire', reason: 'teste' };
  stepRoom(room);
  assert.equal(room.status, 'lobby', 'a sala reabre no lobby');
  assert.equal(room.session, null);
  assert.ok(room.clients.every(c => !c.ready), 'as confirmações caem');
  assert.equal(lobbyInfo(room).canStart, false);
  // Os mesmos jogadores continuam na sala e podem marcar pronto de novo.
  assert.equal(room.clients.length, 2);
  setReady(room, host, true); setReady(room, guest, true);
  assert.equal(lobbyInfo(room).canStart, true);
});
