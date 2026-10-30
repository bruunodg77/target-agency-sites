---
name: publicar-site
description: Publica um site aprovado e pago no domínio definitivo do cliente. Use quando o usuário digitar /publicar-site <slug> <dominio> ou disser que o cliente pagou e o site pode ir ao ar.
---

# /publicar-site <slug> <dominio>

Só publique se `sites/<slug>/briefing.md` estiver com `Status: aprovado`
(ou se o usuário confirmar agora que o cliente aprovou e pagou).
Se o status for outro, pare e pergunte.

1. **Confira o domínio** com o usuário (ex.: `padariadoze.com.br`) e se o
   site principal será com ou sem `www`.
2. **Ajuste o site para produção** em `sites/<slug>/`:
   - Troque URLs de prévia pelo domínio em `canonical`, Open Graph, JSON-LD e `sitemap.xml`.
   - Confirme que não sobrou nenhum marcador `[...]` (`grep -rn '\[SEU\|\[SUA' sites/<slug>`).
     Se sobrou, pare e peça os dados ao usuário.
   - Garanta que `robots.txt` permite indexação e aponta para o sitemap.
3. **Crie o repositório de produção** `site-<slug>` (o GitHub Pages permite
   um domínio por repositório):
   ```bash
   gh repo create <dono>/site-<slug> --public
   ```
   Se não houver permissão para criar repositórios, peça ao usuário para criar
   o repositório vazio e conectá-lo a esta sessão.
4. **Envie os arquivos** do site (sem `briefing.md` e `_preview/`) para a branch
   `main` desse repositório, com um arquivo `CNAME` contendo o domínio.
5. **Ative o GitHub Pages** com domínio próprio e HTTPS:
   ```bash
   gh api -X POST repos/<dono>/site-<slug>/pages -f "source[branch]=main" -f "source[path]=/"
   gh api -X PUT repos/<dono>/site-<slug>/pages -f cname=<dominio> -F https_enforced=true
   ```
6. **Passe as instruções de DNS** para o usuário configurar no registro do
   domínio (Registro.br, GoDaddy, Hostinger...):
   - Registros `A` em `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Registro `CNAME` em `www`: `<dono>.github.io`
   - A propagação leva de minutos a 24h; o HTTPS é emitido automaticamente depois.
7. Atualize `sites/<slug>/briefing.md` para `Status: publicado` com o domínio e
   a data, faça commit e push neste repositório.
8. Responda com o link definitivo e o checklist de DNS.
