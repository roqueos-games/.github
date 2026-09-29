// O único comando da página da organização: descobre os repos pelo gh e confere contra os
// grupos, gera o profile/README.md, os ícones, a capa e as imagens sociais, escreve o
// profile/vitrine.json e formata. Rode depois de abrir, criar ou arquivar um repo, ou de
// mudar nome, descrição ou ícone num jogo.json; o gate perfil-da-org do roqueos-kit reprova o
// push do jogo até a página acompanhar.
//   node scripts/gerar.mjs [pasta-das-imagens-sociais]
// Precisa do gh logado e dos repos e do roqueos-front clonados ao lado deste.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ORG, CAPA } from "./jogos.mjs";
import { FRONT, descobrir, vitrine } from "./org.mjs";

// A conferência vem antes de tudo: jogo sem grupo não chega a gerar página nenhuma.
const itens = descobrir();
await import("./readme.mjs");
await import("./imagens.mjs");
const arquivoVitrine = path.join(ORG, "profile/vitrine.json");
fs.writeFileSync(
  arquivoVitrine,
  `${JSON.stringify(vitrine(itens, CAPA), null, 2)}\n`,
);
execFileSync(
  path.join(FRONT, "node_modules/.bin/prettier"),
  ["--write", path.join(ORG, "profile/README.md"), arquivoVitrine],
  { stdio: "ignore" },
);
for (const i of itens)
  console.log(
    `${i.tipo.padEnd(10)} ${i.repo}${i.motivo ? ` (${i.motivo})` : ""}${i.grupo ? `: ${i.grupo}` : ""}`,
  );
