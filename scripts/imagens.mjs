// Renderiza as imagens da organização com o Chromium do Playwright, a partir de HTML e do
// SVG de cada jogo: os ícones e o banner do README (vão para profile/, entram no git) e o
// avatar e a imagem social de cada repo (vão para a pasta de saída, sobem pela interface
// do GitHub: Settings da organização e Settings > Social preview de cada repo).
//   node scripts/imagens.mjs [pasta-de-saída]
// O Playwright vem do node_modules do roqueos-front, clonado ao lado.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CAPA, ORG, REPOS, SLUGS, manifesto } from "./jogos.mjs";

const { chromium } = createRequire(
  path.join(REPOS, "roqueos-front/package.json"),
)("playwright");
const SAIDA = path.resolve(process.argv[2] || "/tmp/roqueos-games-org");
const SOCIAL = path.join(SAIDA, "social");
fs.mkdirSync(`${ORG}/profile/icones`, { recursive: true });
fs.mkdirSync(SOCIAL, { recursive: true });

const b64 = (p) => fs.readFileSync(p).toString("base64");
const LOGO = `data:image/png;base64,${b64(`${REPOS}/roqueos-front/public/icons/icon-512x512.png`)}`;
const JOGOS = SLUGS.map((slug) => ({
  slug,
  nome: manifesto(slug).nome["pt-BR"],
}));

// O controle, desenho próprio no traço dos ícones dos jogos.
const CONTROLE = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 18h24c8.8 0 14.5 7.6 15.6 16.2l1.6 12.4c.8 5.9-3.8 10.4-8.6 10.4-3.4 0-5.6-2-7.4-5l-3-5H21.8l-3 5c-1.8 3-4 5-7.4 5-4.8 0-9.4-4.5-8.6-10.4l1.6-12.4C5.5 25.6 11.2 18 20 18z" fill="#fff"/>
  <path d="M19 29v10M14 34h10" stroke="#1d1a44" stroke-width="4.2" stroke-linecap="round"/>
  <circle cx="44" cy="30.5" r="3.3" fill="#1d1a44"/><circle cx="50.5" cy="37" r="3.3" fill="#1d1a44"/>
</svg>`;

const FUNDO =
  "radial-gradient(120% 120% at 20% 10%, #2a2466 0%, #14122e 55%, #0b0a1c 100%)";

async function foto(
  page,
  html,
  { w, h, saida, tipo = "png", transparente = false },
) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;
      font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,sans-serif;
      -webkit-font-smoothing:antialiased}
  </style></head><body>${html}</body></html>`);
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: saida,
    type: tipo,
    omitBackground: transparente,
    ...(tipo === "jpeg" ? { quality: 88 } : {}),
  });
  console.log("ok", saida, `${(fs.statSync(saida).size / 1024).toFixed(0)} KB`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

// 1. Avatar 500x500: o R do RoqueOS e o selo do controle.
await foto(
  page,
  `<div style="position:relative;width:500px;height:500px;background:${FUNDO}">
     <img src="${LOGO}" style="position:absolute;left:20px;top:20px;width:336px;height:336px;filter:drop-shadow(0 10px 30px rgba(0,0,0,.45))">
     <div style="position:absolute;right:24px;bottom:24px;width:160px;height:160px;border-radius:50%;
       background:linear-gradient(135deg,#8b5cf6 0%,#4f7df3 55%,#2dd4bf 100%);
       box-shadow:0 0 0 10px #14122e, 0 12px 30px rgba(0,0,0,.5);display:grid;place-items:center">
       <div style="width:102px;height:102px">${CONTROLE}</div>
     </div>
   </div>`,
  { w: 500, h: 500, saida: path.join(SAIDA, "avatar.png") },
);

// 2. Ícones dos jogos em PNG (o SVG cru do raw.githubusercontent não renderiza no README).
for (const j of JOGOS) {
  const svg = fs.readFileSync(`${REPOS}/${j.slug}/public/icone.svg`, "utf8");
  await foto(
    page,
    `<div style="width:128px;height:128px">${svg.replace(/width="\d+" height="\d+"/, 'width="128" height="128"')}</div>`,
    {
      w: 128,
      h: 128,
      saida: `${ORG}/profile/icones/${j.slug}.png`,
      transparente: true,
    },
  );
}

// 3. Banner do README: nome, uma linha, e seis capas em leque.
const foco = { runa: "72% 40%", xadrez: "62% 70%", sinuca: "45% 60%" };
const capas = CAPA.map((s, i) => {
  const x = 680 + i * 94;
  const rot = -9 + i * 3.6;
  return `<img src="data:image/jpeg;base64,${b64(`${REPOS}/${s}/public/capa.jpg`)}"
      style="position:absolute;left:${x}px;top:${i % 2 ? 58 : 34}px;width:300px;height:188px;object-fit:cover;object-position:${foco[s] || "50% 50%"};z-index:${10 - i};
      border-radius:14px;transform:rotate(${rot}deg);box-shadow:0 14px 34px rgba(0,0,0,.55);
      border:3px solid rgba(255,255,255,.14)">`;
}).join("");
await foto(
  page,
  `<div style="position:relative;width:1280px;height:320px;background:${FUNDO};overflow:hidden">
     ${capas}
     <div style="position:absolute;inset:0;z-index:20;background:linear-gradient(90deg,#0b0a1c 0%,rgba(11,10,28,.92) 38%,rgba(11,10,28,0) 62%)"></div>
     <img src="${LOGO}" style="position:absolute;z-index:21;left:56px;top:78px;width:96px;height:96px">
     <div style="position:absolute;z-index:21;left:170px;top:80px;color:#fff">
       <div style="font-size:54px;font-weight:800;letter-spacing:-1px;line-height:1">RoqueOS Games</div>
       <div style="margin-top:14px;font-size:22px;color:rgba(255,255,255,.78);line-height:1.35">
         Jogos que rodam no navegador, um repo por jogo.<br>Jogue grátis em <b style="color:#7dd3fc">roqueos.com.br/jogos</b>
       </div>
     </div>
   </div>`,
  { w: 1280, h: 320, saida: `${ORG}/profile/banner.png` },
);

// 4. Imagem social de cada repo público (1280x640): a capa do jogo com o nome.
for (const j of JOGOS) {
  await foto(
    page,
    `<div style="position:relative;width:1280px;height:640px;background:#0b0a1c;overflow:hidden">
       <img src="data:image/jpeg;base64,${b64(`${REPOS}/${j.slug}/public/capa.jpg`)}"
         style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
       <div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,7,20,.92) 0%,rgba(8,7,20,.35) 34%,rgba(8,7,20,0) 55%)"></div>
       <div style="position:absolute;left:56px;bottom:46px;color:#fff">
         <div style="font-size:64px;font-weight:800;letter-spacing:-1px;line-height:1">${j.nome}</div>
         <div style="margin-top:12px;font-size:24px;color:rgba(255,255,255,.82)">roqueos-games/${j.slug} · jogue em roqueos.com.br/jogar/${j.slug}</div>
       </div>
       <img src="${LOGO}" style="position:absolute;right:48px;bottom:44px;width:84px;height:84px">
     </div>`,
    { w: 1280, h: 640, saida: `${SOCIAL}/${j.slug}.jpg`, tipo: "jpeg" },
  );
}

// 5. Imagem social do SDK.
await foto(
  page,
  `<div style="position:relative;width:1280px;height:640px;background:${FUNDO};color:#fff">
     <img src="${LOGO}" style="position:absolute;left:80px;top:96px;width:120px;height:120px">
     <div style="position:absolute;left:80px;top:250px">
       <div style="font-size:84px;font-weight:800;letter-spacing:-2px;font-family:ui-monospace,Menlo,monospace">jogo-sdk</div>
       <div style="margin-top:18px;font-size:32px;color:rgba(255,255,255,.82);max-width:1000px;line-height:1.35">
         O contrato entre o RoqueOS e um jogo:<br><span style="font-family:ui-monospace,Menlo,monospace;color:#7dd3fc">mount(el, host)</span> e as capacidades do host.
       </div>
       <div style="margin-top:34px;font-size:24px;color:rgba(255,255,255,.6)">MIT · roqueos-games/jogo-sdk</div>
     </div>
   </div>`,
  { w: 1280, h: 640, saida: `${SOCIAL}/jogo-sdk.jpg`, tipo: "jpeg" },
);

await browser.close();
