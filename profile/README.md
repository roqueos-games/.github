<p align="center">
  <a href="https://roqueos.com.br/jogos"><img src="https://raw.githubusercontent.com/roqueos-games/.github/main/profile/banner.png" alt="RoqueOS Games: jogos que rodam no navegador, um repo por jogo" width="100%"></a>
</p>

Os jogos do [RoqueOS](https://roqueos.com.br), o sistema operacional que roda inteiro no
navegador. Cada jogo mora no próprio repositório, fala com o sistema só pelo
[`jogo-sdk`](https://github.com/roqueos-games/jogo-sdk). O SDK e o RoqueCraft têm o código
aberto sob MIT; os outros jogos são fechados desde 16/10/2026, para poderem usar modelos 3D de
mercado cuja licença não permite repositório aberto, e ficam fora desta lista. Todos rodam de graça em [roqueos.com.br/jogos](https://roqueos.com.br/jogos), no computador, no
celular e na TV.

_English below._

## Os jogos

### Mundos

|                                                                                                                                      | Jogo                                                          | O que é                                                                                               |                                                  |
| :----------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | :----------------------------------------------: |
| <img src="https://raw.githubusercontent.com/roqueos-games/.github/main/profile/icones/roquecraft.png" width="40" height="40" alt=""> | [**RoqueCraft**](https://github.com/roqueos-games/roquecraft) | Mundo de blocos infinito: explore biomas, minere, construa e sobreviva, sozinho ou online com amigos. | [Jogar](https://roqueos.com.br/jogar/roquecraft) |

## Como um jogo fala com o RoqueOS

Nenhum jogo importa nada do sistema. Cada um exporta `mount(el, host)` e pede ao host só as
capacidades de que precisa: quem é o jogador, onde guardar o recorde, áudio, idioma, sala
online, progresso da conta, IA. O contrato é o
[`jogo-sdk`](https://github.com/roqueos-games/jogo-sdk), e por isso o mesmo jogo roda dentro
do RoqueOS, sozinho no seu navegador e no teste, sem saber em qual dos três está.

```mermaid
flowchart LR
  R["RoqueOS<br/>conta, Pódio, salas"] -->|host| S{{"jogo-sdk"}}
  D["seu navegador<br/>yarn dev"] -->|host| S
  T["teste<br/>host falso"] -->|host| S
  S -->|capacidades| J["o jogo<br/>mount(el, host)"]
```

## Rodar um jogo na sua máquina

Precisa de Node 22 ou mais novo e do Yarn 1.22.

```sh
git clone https://github.com/roqueos-games/roquecraft.git
cd roquecraft
yarn install --ignore-scripts
yarn dev
```

`yarn verificar` roda lint, formato, testes e o `jogo check`, o mesmo que o CI roda no pull
request.

## Participar

- Achou um bug ou tem uma ideia para um jogo? Abra uma issue no repo dele.
- Pergunta, sugestão ou vontade de mostrar o que construiu no RoqueCraft: use as
  [Discussions](https://github.com/orgs/roqueos-games/discussions).
- Quer mandar código? Cada repo tem o próprio `CONTRIBUTING.md`; a régua comum está em
  [CONTRIBUTING.md](https://github.com/roqueos-games/.github/blob/main/CONTRIBUTING.md) e o
  combinado de convivência em
  [CODE_OF_CONDUCT.md](https://github.com/roqueos-games/.github/blob/main/CODE_OF_CONDUCT.md).
- Falha de segurança não vai em issue pública: veja
  [SECURITY.md](https://github.com/roqueos-games/.github/blob/main/SECURITY.md).

## Licença

Código e arte própria dos repos abertos sob MIT. Asset de terceiro segue a licença registrada
no `ASSETS.md` de cada repo. O RoqueOS em si é fechado, e os jogos fechados ficam fora desta
lista; o que eles publicaram sob MIT até 16/10/2026 continua MIT.

---

## English

The games of [RoqueOS](https://roqueos.com.br), an operating system that runs entirely in the
browser. Each game lives in its own repository, talks to the system only through the
[`jogo-sdk`](https://github.com/roqueos-games/jogo-sdk). The SDK and RoqueCraft are open
source under MIT; the other games are closed since 16/10/2026, so they can use third-party 3D
models whose license does not allow a public repository. All of them are free to play at [roqueos.com.br/jogos](https://roqueos.com.br/jogos), on desktop,
phone and TV.

<details>
<summary>The games</summary>

### Worlds

|                                                                                                                                      | Game                                                          | What it is                                                                                  |                                                 |
| :----------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | :---------------------------------------------: |
| <img src="https://raw.githubusercontent.com/roqueos-games/.github/main/profile/icones/roquecraft.png" width="40" height="40" alt=""> | [**RoqueCraft**](https://github.com/roqueos-games/roquecraft) | Infinite block world: explore biomes, mine, build and survive, solo or online with friends. | [Play](https://roqueos.com.br/jogar/roquecraft) |

</details>

A game exports `mount(el, host)` and asks the host only for the capabilities it needs
(player identity, high score storage, audio, language, online rooms, account progress, AI).
That contract is the `jogo-sdk`, so the same game runs inside RoqueOS, standalone in your
browser and in tests. To run one locally: Node 22+, Yarn 1.22, then
`yarn install --ignore-scripts` and `yarn dev`; `yarn verificar` runs the same checks as CI.

Issues and pull requests in English are welcome; code and comments are in Brazilian
Portuguese. Questions and ideas go to
[Discussions](https://github.com/orgs/roqueos-games/discussions); vulnerabilities go through
[SECURITY.md](https://github.com/roqueos-games/.github/blob/main/SECURITY.md), never a public
issue. Code and original art are MIT; third-party assets follow the license listed in each
repo's `ASSETS.md`. Closed games are not listed here.
