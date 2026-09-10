// Alguns ambientes gravam o *conteúdo* do shim como alvo do symlink em
// node_modules/.bin e materializam os pacotes do workspace como cópias em vez
// de links. Isso deixa `vite`, `tsx`, `tsc` e imports de `@vampire/*` quebrados.
// O script conserta os dois casos e é no-op quando está tudo certo.
import { existsSync, lstatSync, readdirSync, readlinkSync, rmSync, symlinkSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';

// 1) Atalhos de binários quebrados.
const binDir = 'node_modules/.bin';
if (existsSync(binDir)) {
  let fixed = 0;
  for (const name of readdirSync(binDir)) {
    const path = join(binDir, name);
    let target;
    try {
      if (!lstatSync(path).isSymbolicLink()) continue;
      target = readlinkSync(path);
    } catch {
      continue;
    }
    if (existsSync(resolve(binDir, target))) continue;
    const match = target.match(/\$basedir\/\.\.\/([^"\s]+)/);
    if (!match) continue;
    unlinkSync(path);
    symlinkSync(join('..', match[1]), path);
    fixed++;
  }
  if (fixed) console.log(`[fix-bins] ${fixed} atalho(s) de node_modules/.bin corrigido(s).`);
}

// 2) Pacotes do workspace que ficaram como cópia em vez de link.
const scopeDir = 'node_modules/@vampire';
if (existsSync(scopeDir)) {
  for (const name of readdirSync(scopeDir)) {
    const path = join(scopeDir, name);
    const target = join('..', '..', 'packages', name);
    if (!existsSync(target)) continue;
    try {
      if (lstatSync(path).isSymbolicLink()) continue;
    } catch {
      continue;
    }
    rmSync(path, { recursive: true, force: true });
    symlinkSync(target, path);
    console.log(`[fix-bins] link do workspace @vampire/${name} recriado.`);
  }
}
