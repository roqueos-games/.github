// Gera o profile/README.md a partir do scripts/readme.modelo.md e do jogo.json de cada
// jogo, para a tabela não divergir do manifesto. Rode depois de mudar nome ou descrição de
// um jogo, ou de acrescentar um em scripts/jogos.mjs:
//   node scripts/readme.mjs && npx prettier --write profile/README.md
import fs from "node:fs";
import path from "node:path";
import { GRUPOS, ORG, manifesto } from "./jogos.mjs";

const RAW =
  "https://raw.githubusercontent.com/roqueos-games/.github/main/profile";

function descricao(j, idioma) {
  const nome = j.nome[idioma];
  let d = j.descricao[idioma].trim().replace(/\s+-\s+/g, ", ");
  if (d.startsWith(`${nome}, `)) d = d.slice(nome.length + 2);
  d = d.charAt(0).toUpperCase() + d.slice(1);
  return /[.!?]$/.test(d) ? d : `${d}.`;
}

function tabela(slugs, idioma) {
  const [colJogo, colDesc, jogar] =
    idioma === "pt-BR"
      ? ["Jogo", "O que é", "Jogar"]
      : ["Game", "What it is", "Play"];
  const linhas = slugs.map((slug) => {
    const j = manifesto(slug);
    const icone = `<img src="${RAW}/icones/${slug}.png" width="40" height="40" alt="">`;
    return `| ${icone} | [**${j.nome[idioma]}**](https://github.com/roqueos-games/${slug}) | ${descricao(j, idioma)} | [${jogar}](https://roqueos.com.br/jogar/${slug}) |`;
  });
  return [
    `| | ${colJogo} | ${colDesc} | |`,
    "| :-: | --- | --- | :-: |",
    ...linhas,
  ].join("\n");
}

const secoes = (idioma) =>
  GRUPOS.map(
    (g) =>
      `### ${idioma === "pt-BR" ? g.pt : g.en}\n\n${tabela(g.jogos, idioma)}`,
  ).join("\n\n");

const md = fs
  .readFileSync(path.join(ORG, "scripts/readme.modelo.md"), "utf8")
  .replace("{{JOGOS_PT}}", secoes("pt-BR"))
  .replace("{{JOGOS_EN}}", secoes("en-US"))
  .replaceAll("{{RAW}}", RAW);
if (/\{\{[A-Z_]+\}\}/.test(md))
  throw new Error("marcador sem substituir no modelo");
fs.writeFileSync(path.join(ORG, "profile/README.md"), md);
console.log("ok profile/README.md");
