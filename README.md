# roqueos-games/.github

Os arquivos da organização [roqueos-games](https://github.com/roqueos-games):

- [`profile/README.md`](profile/README.md) é a página de apresentação da organização, com os
  jogos. Um só comando, `node scripts/gerar.mjs`, descobre os repos da organização pelo `gh`,
  confere contra os grupos de `scripts/jogos.mjs` e gera a tabela (do `jogo.json` de cada
  repo), os ícones, a capa, o [`profile/vitrine.json`](profile/vitrine.json) e as imagens
  sociais. O texto em volta mora em `scripts/readme.modelo.md`.
- Os grupos e os seis jogos da capa são a única parte escrita à mão, porque são editoriais. O
  gerador reprova repo público de jogo que não esteja em grupo nenhum, grupo com jogo que não
  é repo público e capa com jogo fora da página. Repo privado ou arquivado fica de fora, com o
  motivo na vitrine.
- **Quem cobra:** o gate `perfil-da-org` do roqueos-kit, bloqueante no pre-push dos repos de
  jogo. Ele lê a `vitrine.json` publicada aqui e reprova o push de um jogo que a página não
  mostra com o nome, a descrição e o ícone do `jogo.json` de agora, e o de um repo que a
  vitrine deixou de fora como privado e já abriu. O conserto é rodar o `gerar.mjs` aqui e
  empurrar.
- Os repos dos jogos e o `roqueos-front` (de onde vêm o Playwright e o Prettier) precisam
  estar clonados ao lado deste, e o gerador recusa clone atrás do GitHub.
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md), [`CONTRIBUTING.md`](CONTRIBUTING.md),
  [`SECURITY.md`](SECURITY.md), [`SUPPORT.md`](SUPPORT.md) e os modelos de issue e pull request
  em [`.github/`](.github) valem para todo repo da organização que não tenha o próprio.
- As [Discussions](https://github.com/orgs/roqueos-games/discussions) da organização moram
  neste repositório.

The organization's profile page, default community health files (code of conduct,
contributing guide, security policy, support, issue and pull request templates) and the home
of the organization's Discussions.
