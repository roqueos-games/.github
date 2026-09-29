// Descobre os repos da organização pelo gh e confere a página contra eles: todo repo público
// com jogo.json está num grupo de scripts/jogos.mjs, todo jogo dos grupos é repo público, e a
// capa só mostra jogo da página. Os grupos são editoriais (o gh não sabe se um jogo é de
// tabuleiro), então jogo novo reprova aqui até alguém escolher o grupo dele; e o gate
// perfil-da-org do roqueos-kit reprova o push do jogo até a vitrine publicada o mostrar como
// ele é agora (a regra do founder de 29/09/2026: a capa da org acompanha os jogos, sempre).
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { CAPA, GRUPOS, REPOS } from "./jogos.mjs";

export const ORG_NOME = "roqueos-games";
export const FRONT = path.join(REPOS, "roqueos-front");
export const MANIFESTO = "jogo.json";
// O que a página mostra de cada jogo; "sha256:icone" é o hash do SVG que o campo icone
// aponta, porque o desenho pode mudar sem o caminho mudar.
export const CAMPOS = [
  "nome.pt-BR",
  "nome.en-US",
  "descricao.pt-BR",
  "descricao.en-US",
  "sha256:icone",
];

function ambienteLimpo() {
  const env = { ...process.env };
  for (const k of Object.keys(env)) if (k.startsWith("GIT_")) delete env[k];
  return env;
}
const git = (dir, args) =>
  execFileSync("git", ["-C", dir, ...args], {
    encoding: "utf8",
    env: ambienteLimpo(),
  }).trim();
const gh = (args) =>
  JSON.parse(
    execFileSync("gh", args, { encoding: "utf8", maxBuffer: 64 << 20 }),
  );

export const valor = (obj, campo) =>
  campo.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

export function valorDoCampo(manifesto, campo, dir) {
  if (!campo.startsWith("sha256:")) return valor(manifesto, campo);
  const alvo = valor(manifesto, campo.slice(7));
  const bytes = fs.readFileSync(path.join(dir, String(alvo)));
  return createHash("sha256").update(bytes).digest("hex").slice(0, 16);
}

function clone(slug, ramo) {
  const dir = path.join(REPOS, slug);
  if (!fs.existsSync(path.join(dir, ".git")))
    throw new Error(`clone ${ORG_NOME}/${slug} ao lado deste repo`);
  git(dir, ["fetch", "-q", "origin"]);
  const atras = Number(
    git(dir, ["rev-list", "--count", `HEAD..origin/${ramo}`]),
  );
  if (atras)
    throw new Error(
      `o clone de ${slug} está ${atras} commit(s) atrás do GitHub: git -C ${dir} pull`,
    );
  return dir;
}

const grupoDe = (slug) => GRUPOS.find((g) => g.jogos.includes(slug));

// Cada repo da organização com o que a página faz dele, e a conferência contra os grupos.
export function descobrir() {
  const repos = gh([
    "api",
    "--paginate",
    "--slurp",
    `orgs/${ORG_NOME}/repos?per_page=100&type=all`,
  ])
    .flat()
    .filter((r) => r.name !== ".github" && !r.fork)
    .sort((a, b) => a.name.localeCompare(b.name));
  const itens = repos.map((r) => {
    if (r.archived) return { repo: r.name, tipo: "fora", motivo: "arquivado" };
    if (r.visibility !== "public")
      return { repo: r.name, tipo: "fora", motivo: "privado" };
    const dir = clone(r.name, r.default_branch);
    const arquivo = path.join(dir, MANIFESTO);
    if (!fs.existsSync(arquivo))
      return {
        repo: r.name,
        tipo: "biblioteca",
        descricao: String(r.description || "").trim(),
      };
    const m = JSON.parse(fs.readFileSync(arquivo, "utf8"));
    const valores = Object.fromEntries(
      CAMPOS.map((c) => [c, valorDoCampo(m, c, dir)]),
    );
    for (const [c, v] of Object.entries(valores))
      if (typeof v !== "string" || !v.trim())
        throw new Error(`${r.name}/${MANIFESTO} sem ${c}`);
    const grupo = grupoDe(r.name);
    if (!grupo)
      throw new Error(
        `jogo novo na página: ${r.name} é público e não está em nenhum grupo de scripts/jogos.mjs. Escolha o grupo dele.`,
      );
    return { repo: r.name, tipo: "jogo", grupo: grupo.pt, valores };
  });
  const naPagina = new Set(
    itens.filter((i) => i.tipo === "jogo").map((i) => i.repo),
  );
  for (const g of GRUPOS)
    for (const slug of g.jogos)
      if (!naPagina.has(slug))
        throw new Error(
          `${slug} está no grupo ${g.pt} mas não é repo público de jogo da ${ORG_NOME}`,
        );
  for (const slug of CAPA)
    if (!naPagina.has(slug))
      throw new Error(`${slug} está na capa mas não está na página`);
  return itens;
}

// O contrato com o gate perfil-da-org do roqueos-kit (versão 1), o mesmo da roqueos-apps.
export function vitrine(itens, capa) {
  return {
    versao: 1,
    org: ORG_NOME,
    pagina: `https://github.com/${ORG_NOME}`,
    gerador: "node scripts/gerar.mjs",
    campos: { jogo: CAMPOS },
    capa,
    itens,
  };
}
