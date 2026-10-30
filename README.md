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
5. Entregar o site em `sites/<slug>/` com instruções de publicação

## Estrutura

```
.claude/agents/criador-de-sites.md   o agente (regras de qualidade e processo)
.claude/skills/criar-site/SKILL.md   o comando /criar-site
CLAUDE.md                            instruções gerais do projeto
sites/                               um subdiretório por site criado
```

## Publicar um site

- **Netlify**: arraste a pasta `sites/<slug>` em https://app.netlify.com/drop
- **GitHub Pages / Vercel**: aponte o diretório raiz para `sites/<slug>`

Para mudar o estilo padrão do agente (ex.: sempre usar Astro, sempre incluir
blog), edite `.claude/agents/criador-de-sites.md`.
