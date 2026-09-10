# Worker / Peão animado (Mixamo)

O Peão recrutado (`kind === 'worker' && hero === false`) usa o Low Poly Adventurer rigado no Mixamo.

Arquivos:
- `packages/client/public/assets/characters/workers/mixamo/worker_rigged.fbx` = modelo base rigado, com textura incorporada
- `idle.fbx` = `Arm Stretching`
- `walking.fbx` = `Run Forward`
- `attack.fbx` = `Double Dagger Stab`
- coleta/construção/reparo reutilizam `assets/characters/humans/mixamo/working.fbx` da V3 (`Working On Device`), pois os rigs usam a mesma nomenclatura Mixamo

Mapeamento visual:
- parado -> `Idle` / Arm Stretching
- movendo -> `Walking` / Run Forward
- coletando/construindo/reparando -> `Working`
- atacando -> `Attack` / Double Dagger Stab

Os clips de locomoção têm o deslocamento X/Z neutralizado para que a posição da unidade continue controlada pela simulação.

Ajustes de altura/orientação ficam em `packages/client/src/assets/asset-registry.ts`, no bloco `unit:worker:peon`:
- `targetHeight`
- `visualOffsetY`
- `rotationY`
