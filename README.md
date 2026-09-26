# roqueos-games/.github

Os arquivos da organização [roqueos-games](https://github.com/roqueos-games):

- [`profile/README.md`](profile/README.md) é a página de apresentação da organização, com a
  lista dos jogos. Não edite a tabela à mão: ela sai do `jogo.json` de cada repo pelo
  `node scripts/readme.mjs`, e o texto em volta mora em `scripts/readme.modelo.md`. Jogo novo
  entra em `scripts/jogos.mjs`.
- `node scripts/imagens.mjs` renderiza os ícones e o banner de `profile/`, o avatar da
  organização e a imagem social de cada repo. Os repos dos jogos e o `roqueos-front` (de onde
  vem o Playwright) precisam estar clonados ao lado deste.
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md), [`CONTRIBUTING.md`](CONTRIBUTING.md),
  [`SECURITY.md`](SECURITY.md), [`SUPPORT.md`](SUPPORT.md) e os modelos de issue e pull request
  em [`.github/`](.github) valem para todo repo da organização que não tenha o próprio.
- As [Discussions](https://github.com/orgs/roqueos-games/discussions) da organização moram
  neste repositório.

The organization's profile page, default community health files (code of conduct,
contributing guide, security policy, support, issue and pull request templates) and the home
of the organization's Discussions.
