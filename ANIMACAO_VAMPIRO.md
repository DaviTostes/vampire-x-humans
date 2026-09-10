# Animações do Vampiro (Mixamo)

A versão atual usa o personagem rigado do Mixamo apenas na camada visual. A lógica, velocidade, dano, alcance e cooldown continuam controlados pela simulação existente.

Arquivos:
- `packages/client/public/assets/characters/vampire/mixamo/vampire_rigged.fbx` — personagem/rig base.
- `idle.fbx` — `Standing Idle 02`.
- `walking.fbx` — `Crouched Walking`.
- `attack.fbx` — `Zombie Attack`.

Estados visuais:
- parado → `idle`;
- `activity === "moving"` com deslocamento → `walking`;
- `activity === "attacking"` → `attack` (inclui ataque contra muros/construções e unidades).

Os clips são convertidos para *in place*: a translação X/Z do quadril/root é neutralizada para que o FBX não altere a movimentação calculada pelo jogo. Há transição suave entre os clips com `AnimationMixer`.

Se o FBX não carregar, o factory mantém o Vampiro procedural original como fallback.
