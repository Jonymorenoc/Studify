import { cpSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist");
const docsDir = resolve("docs");

if (!existsSync(distDir)) {
  console.error('dist/ no existe. Ejecuta "pnpm build" antes de sincronizar.');
  process.exit(1);
}

rmSync(docsDir, { recursive: true, force: true });
cpSync(distDir, docsDir, { recursive: true });
writeFileSync(resolve(docsDir, '.nojekyll'), '');
console.log('Sincronizado dist/ -> docs/');
