# Como contribuir

Obrigado por querer ajudar. Esta é a régua comum a todos os repositórios da organização; o
`CONTRIBUTING.md` de cada jogo acrescenta o que é só dele (chave de armazenamento que não pode
mudar, nome de evento, regra do jogo).

_English below._

1. **Abra uma issue antes** de mudar regra do jogo ou o que o jogador vê. Correção pequena
   (texto, bug óbvio, teste) pode ir direto para o PR.
2. Faça o fork, crie um branch e rode `yarn install --ignore-scripts`. É Yarn 1.22 e Node 22
   ou mais novo.
3. **Toda correção vem com um teste que reprova sem ela.** Teste que passa com e sem a mudança
   não prova nada.
4. Texto novo entra nos dez arquivos de `i18n/`, com as mesmas chaves. O `jogo check` reprova se
   faltar um idioma.
5. Arquivo novo em `public/` precisa de uma linha no `ASSETS.md` com a licença e a origem.
   Asset sem origem clara não entra.
6. Rode `yarn verificar` antes de abrir o PR. É o mesmo que o CI roda.
7. O jogo fala com o RoqueOS só pelo `jogo-sdk`. Se o jogo precisa de algo que o host não
   entrega, a conversa é uma issue no
   [jogo-sdk](https://github.com/roqueos-games/jogo-sdk/issues), não um atalho no jogo.

Código, comentários e mensagens de commit são em português do Brasil. Issue e PR em inglês são
bem-vindos, e a resposta vem no idioma em que você escreveu.

Todo merge passa pela revisão do mantenedor. Uma versão nova de jogo só chega a
[roqueos.com.br](https://roqueos.com.br) quando o RoqueOS troca a tag que ele instala, então o
seu PR aparece no ar na próxima release depois do merge.

Ao participar você concorda com o [código de conduta](CODE_OF_CONDUCT.md). Contribuições
entram sob a licença do repositório (MIT).

---

## Contributing (English)

Open an issue before changing gameplay or what players see; small fixes can go straight to a
pull request. Fork, branch, `yarn install --ignore-scripts` (Yarn 1.22, Node 22+). Every fix
comes with a test that fails without it. New text goes into all ten `i18n/*.json` files; every
new file in `public/` needs a line in `ASSETS.md` with its license and origin. Run
`yarn verificar` before the pull request; it is what CI runs. Games talk to RoqueOS only
through the `jogo-sdk`: if a game needs something the host does not offer, open an issue on
the SDK instead of working around it.

Code and comments are in Brazilian Portuguese; issues and pull requests in English are
welcome. Every merge is reviewed by the maintainer, and a merged change reaches roqueos.com.br
in the next RoqueOS release that bumps the game's tag. By contributing you agree to the
[code of conduct](CODE_OF_CONDUCT.md) and license your work under the repository's MIT
license.
