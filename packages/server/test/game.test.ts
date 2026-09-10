// Teste de integração: 5 clientes conectam, criam sala, iniciam e jogam via ws
import { WebSocket } from "ws";
import assert from 'node:assert/strict';

const URL = 'ws://localhost:3000';

function client(name) {
  const ws = new WebSocket(URL);
  const state: any = { name, snaps: 0, lastSnap: null, result: null, lastLobby: null, nodes: [] };
  ws.on('message', (raw) => {
    const msg = JSON.parse(String(raw));
    if (msg.type === 'snap') {
      state.snaps++;
      state.lastSnap = msg.snap;
    }
    if (msg.type === 'result') state.result = msg.result;
    if (msg.type === 'started') state.playerId = msg.playerId;
    if (msg.type === 'started' && Array.isArray(msg.nodes)) state.nodes = msg.nodes;
    if (msg.type === 'created' || msg.type === 'joined' || msg.type === 'lobby') {
      state.lastLobby = msg.lobby;
      if (msg.playerId !== undefined) state.playerId = msg.playerId;
    }
  });
  ws.on('open', () => (state.open = true));
  state.ws = ws;
  return state;
}

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));
const until = async (fn: () => boolean, timeout = 10000, step = 100) => {
  const t0 = Date.now();
  while (!fn()) {
    if (Date.now() - t0 > timeout) throw new Error('timeout');
    await waitFor(step);
  }
};

async function main() {
  const host = client('Host');
  const others = [2, 3, 4, 5].map((i) => client(`P${i}`));
  const all = [host, ...others];
  await until(() => all.every((c) => c.open));

  host.ws.send(JSON.stringify({ type: 'create', name: 'Host' }));
  await until(() => host.lastLobby?.code);
  const code = host.lastLobby.code;
  console.log('sala criada:', code);

  for (const c of others) {
    c.ws.send(JSON.stringify({ type: 'join', code, name: c.name }));
    await waitFor(150);
  }
  await until(() => host.lastLobby.players.length === 5);
  console.log('5 jogadores na sala:', host.lastLobby.players.map((p: any) => p.name).join(', '));
  for (const [i, c] of all.entries()) {
    c.ws.send(JSON.stringify({ type: 'role', role: i === 4 ? 'vampire' : 'human' }));
    c.ws.send(JSON.stringify({ type: 'ready', ready: true }));
  }
  await until(() => host.lastLobby.canStart);

  host.ws.send(JSON.stringify({ type: 'start' }));
  await until(() => all.every((c) => c.lastSnap));
  const snap0 = host.lastSnap;
  console.log(
    `partida iniciada — unidades: ${snap0.units.length} | prédios: ${snap0.buildings.length} | fase: ${snap0.phase} dia ${snap0.day}`,
  );

  const myUnits = (c: any) => c.lastSnap.units.filter((u: any) => u.owner === c.playerId);
  console.log('host playerId:', host.playerId, '— unidades:', myUnits(host).length);

  const workers = myUnits(host).map((u: any) => u.id);
  assert.equal(workers.length, 1);
  assert.equal(snap0.units.length, 5);
  const woodNode = host.nodes.find((n: any) => n.kind === 'wood');
  host.ws.send(
    JSON.stringify({ type: 'cmd', command: { type: 'gather', ids: workers, nodeId: woodNode.id } }),
  );
  console.log('ordem de coleta enviada para', workers.length, 'humanos');

  const vamp = others[3];
  const vampUnit = vamp.lastSnap.units.find((u: any) => u.kind === 'vampire');
  if (vampUnit) {
    vamp.ws.send(
      JSON.stringify({ type: 'cmd', command: { type: 'move', ids: [vampUnit.id], x: 30, z: 30 } }),
    );
    console.log('vampiro mandado para (30,30)');
  }

  console.log('humanos iniciam sem prédios nem recursos');

  await waitFor(12000);
  const s1 = host.lastSnap;
  const me = s1.players.find((p: any) => p.id === host.playerId);
  console.log('--- após 12s ---');
  console.log(`fase: ${s1.phase} | madeira: ${me.wood} | ouro: ${me.gold}`);
  console.log(`prédios: ${s1.buildings.length} (canteiro em progresso? ${s1.buildings.some((b: any) => !b.done)})`);
  const worker = s1.units.find((u: any) => u.owner === host.playerId);
  console.log(`humano: carregando ${worker.carrying} ${worker.carryRes === 'gold' ? '🪙' : '🪵'}`);

  const v = host.lastSnap.units.find((u: any) => u.kind === 'vampire');
  const v0 = snap0.units.find((u: any) => u.kind === 'vampire');
  console.log(`vampiro: (${v0.x}) → (${v.x.toFixed(1)}, ${v.z.toFixed(1)}) | sangue: ${host.lastSnap.blood}`);

  console.log(`\ntotal de snapshots recebidos: ${host.snaps}`);
  console.log(host.snaps > 100 ? '✅ netcode OK (15Hz)' : '⚠️ poucos snapshots');
  assert.ok(host.snaps > 100);
  process.exit(0);
}

main().catch((e) => {
  console.error('❌ FALHA:', e.message);
  process.exit(1);
});
