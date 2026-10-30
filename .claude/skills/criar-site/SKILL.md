---
name: criar-site
description: Cria um novo site completo a partir de um briefing. Use quando o usuário digitar /criar-site ou pedir "crie um site para ...".
---

# /criar-site

1. Leia o pedido do usuário (argumentos deste comando). Se ele estiver vazio,
   pergunte em uma única mensagem: nome do negócio, o que faz, objetivo do site,
   contatos (WhatsApp, e-mail, Instagram) e cores preferidas.
2. Defina o slug (ex.: `clinica-sorriso`) e crie `sites/<slug>/briefing.md`
   com tudo o que o usuário informou.
3. Delegue a construção ao agente `criador-de-sites` (ferramenta Agent,
   `subagent_type: "criador-de-sites"`), passando o briefing completo e o slug.
4. Ao receber o resultado, mostre ao usuário o resumo, os screenshots de
   `sites/<slug>/_preview/` e a lista de marcadores a preencher.
5. Pergunte se ele quer ajustes ou publicar o site.
