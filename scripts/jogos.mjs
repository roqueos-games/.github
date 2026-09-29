// A lista dos jogos abertos da página da organização, em grupos. Jogo novo entra aqui e
// o resto (tabela do README, ícone, imagem social) sai do jogo.json do repo dele.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ORG = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
// Os repos da organização são clonados lado a lado com este.
export const REPOS = path.resolve(ORG, "..");

export const GRUPOS = [
  { pt: "Mundos", en: "Worlds", jogos: ["roquecraft", "runa"] },
  {
    pt: "Tabuleiro e mesa",
    en: "Board and table",
    jogos: ["xadrez", "damas", "jogo-da-velha-3d", "sinuca"],
  },
  {
    pt: "Arcade 3D",
    en: "3D arcade",
    jogos: ["skystack", "prisma", "tora", "nova", "eko", "lumen", "snake"],
  },
  {
    pt: "Clássicos 2D",
    en: "2D classics",
    jogos: ["2048", "breakout", "jogo-da-memoria", "nexo"],
  },
];

// Os seis jogos da capa, em leque. Editorial como os grupos; o gerar.mjs reprova jogo da capa
// que não esteja na página.
export const CAPA = [
  "roquecraft",
  "runa",
  "sinuca",
  "xadrez",
  "nova",
  "prisma",
];

export const SLUGS = GRUPOS.flatMap((g) => g.jogos);
if (SLUGS.length !== new Set(SLUGS).size)
  throw new Error("jogo repetido em GRUPOS");

export function manifesto(slug) {
  const arquivo = path.join(REPOS, slug, "jogo.json");
  if (!fs.existsSync(arquivo))
    throw new Error(`clone roqueos-games/${slug} ao lado deste repo`);
  return JSON.parse(fs.readFileSync(arquivo, "utf8"));
}
