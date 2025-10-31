import { cpSync, rmSync, existsSync, writeFileSync, copyFileSync } from "node:fs";
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
copyFileSync(resolve(docsDir, 'index.html'), resolve(docsDir, '404.html'));
console.log('Sincronizado dist/ -> docs/');
