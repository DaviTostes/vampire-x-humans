# Humano animado (Mixamo)

O Humano principal (`kind === 'human' && hero === true`) usa o Blueguard Sentinel rigado no Mixamo.

Arquivos:
- `packages/client/public/assets/characters/humans/mixamo/human_rigged.fbx`
- `idle.fbx` = `Breathing Idle`
- `walking.fbx` = `Slow Run`
- `working.fbx` = `Working On Device`

Mapeamento visual:
- parado -> `Idle`
- movendo -> Walking
- coletando/construindo/reparando -> Working

A movimentação X/Z dos clips é neutralizada para a simulação continuar controlando a posição real da unidade.
O Peão/Worker (`hero === false`) agora usa o Low Poly Adventurer animado; consulte `ANIMACAO_WORKER.md`.

Ajustes rápidos de altura/tamanho ficam em `packages/client/src/assets/asset-registry.ts`, no bloco `unit:human:hero`:
- `targetHeight`
- `visualOffsetY`
- `rotationY`
