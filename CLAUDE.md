# Fábrica de Sites

Este repositório guarda todos os sites do usuário, um por pasta em `sites/<slug>/`.

## Fluxo de cada site

1. `/criar-site` → o agente `criador-de-sites` constrói o site e **sempre** entrega
   um link de prévia: `https://<dono>.github.io/<repositorio>/<slug>/`
   (publicado pelo workflow `.github/workflows/previa.yml` a cada push na `main`).
2. Cliente pede ajustes → altere, faça commit e push; o mesmo link é atualizado.
3. Cliente aprova → `Status: aprovado` no `briefing.md`.
4. Pagamento confirmado → `/publicar-site <slug> <dominio>` publica no domínio
   definitivo (repositório próprio `site-<slug>` com GitHub Pages + CNAME).

Nunca publique no domínio definitivo sem aprovação e pagamento confirmados pelo usuário.

## Regras

- Para alterar um site existente, leia antes o `sites/<slug>/briefing.md` e mantenha
  a identidade visual registrada ali.
- `briefing.md` é interno: não vai para a prévia nem para produção.
- Todos os sites são para negócios nos EUA: conteúdo do site em inglês americano (en-US).
- Converse com o usuário e escreva os `briefing.md` em português do Brasil.
