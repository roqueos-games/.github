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
  // Desde 16/10/2026 (Goal 80, decisão do fundador) os outros quinze jogos são privados, para
  // poderem usar modelos 3D de mercado; repo privado não entra na página.
  { pt: "Mundos", en: "Worlds", jogos: ["roquecraft"] },
];

// Os jogos da capa, em leque. Editorial como os grupos; o gerar.mjs reprova jogo da capa
// que não esteja na página.
export const CAPA = ["roquecraft"];

export const SLUGS = GRUPOS.flatMap((g) => g.jogos);
if (SLUGS.length !== new Set(SLUGS).size)
  throw new Error("jogo repetido em GRUPOS");

export function manifesto(slug) {
  const arquivo = path.join(REPOS, slug, "jogo.json");
  if (!fs.existsSync(arquivo))
    throw new Error(`clone roqueos-games/${slug} ao lado deste repo`);
  return JSON.parse(fs.readFileSync(arquivo, "utf8"));
}
