# Fábrica de Sites 🤖

Um agente de IA para o Claude Code que cria sites completos a partir de um briefing.

## Como usar

Abra este repositório no Claude Code (terminal, app ou claude.ai/code) e digite:

```
/criar-site Padaria do Zé, padaria artesanal em Campinas. Objetivo: receber
encomendas pelo WhatsApp (19) 99999-0000. Cores: marrom e creme.
```

Ou simplesmente: *"Crie um site para meu estúdio de pilates"*.

O agente vai:

1. Organizar o briefing em `sites/<slug>/briefing.md`
2. Planejar páginas, cores e fontes
3. Construir o site (HTML/CSS/JS, responsivo, com SEO e acessibilidade)
4. Testar no navegador em celular e desktop e corrigir problemas
5. Publicar uma **prévia** e entregar o link para o cliente aprovar

## Prévia → aprovação → publicação

| Etapa | Como | Resultado |
|---|---|---|
| Prévia | automática a cada `/criar-site` ou ajuste | `https://<usuario>.github.io/<repositorio>/<slug>/` (sem indexação no Google) |
| Aprovação | você avisa: "cliente aprovou o site X" | status muda para `aprovado` |
| Publicação | `/publicar-site <slug> <dominio>` após o pagamento | site no domínio do cliente, com HTTPS |

### Configuração única no GitHub

Em **Settings → Pages** deste repositório, escolha **Source: GitHub Actions**.
Observação: GitHub Pages em repositório **privado** exige plano GitHub Pro/Team;
no plano gratuito o repositório precisa ser público (os `briefing.md` não são
publicados na prévia, mas ficam visíveis no código).

## Estrutura

```
.claude/agents/criador-de-sites.md   o agente (regras de qualidade e processo)
.claude/skills/criar-site/SKILL.md   o comando /criar-site
.claude/skills/publicar-site/        o comando /publicar-site (domínio definitivo)
.github/workflows/previa.yml         publica as prévias no GitHub Pages
CLAUDE.md                            instruções gerais do projeto
sites/                               um subdiretório por site criado
```

Para mudar o estilo padrão do agente (ex.: sempre usar Astro, sempre incluir
blog), edite `.claude/agents/criador-de-sites.md`.
