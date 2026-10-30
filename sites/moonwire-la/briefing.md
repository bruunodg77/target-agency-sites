Status: em aprovação

# Briefing — MOONWIRE (cliente fictício / demonstração)

> Site de demonstração para portfólio da agência. Todos os dados são fictícios.

- **Nome:** MOONWIRE
- **Slug:** moonwire-la
- **Segmento:** balada / nightclub (música eletrônica: house, techno, afro house)
- **Local:** Arts District, Downtown Los Angeles, CA
- **Endereço (fictício):** 1100 E 7th Pl, Los Angeles, CA 90021
- **Telefone (fictício, faixa 555):** (213) 555-0187
- **E-mail (fictício):** vip@moonwire.example
- **Instagram:** @moonwire.la (fictício)
- **Horário:** quinta a sábado, 10:00 PM – 4:00 AM; domingo "Sunset Sessions" no rooftop, 4:00 PM – 12:00 AM
- **Idade:** 21+ com documento com foto válido; dress code "upscale nightlife"
- **Público:** 21–35 anos, LA, turistas, fãs de música eletrônica
- **Tom:** exclusivo, noturno, energético, sofisticado
- **Objetivo principal:** vender ingressos dos eventos e captar reservas de mesa VIP / bottle service
- **CTAs:** "Get Tickets" (principal) e "Book a VIP Table"

## Páginas / seções (one-page com âncoras + Privacy Policy)
1. Hero com nome, tagline e próximo evento + "Get Tickets"
2. Upcoming Events (próximas 6 datas com line-up fictício, gênero, preço a partir de $)
3. The Experience (main room, sound system, rooftop, light show)
4. VIP Tables & Bottle Service (3 pacotes com mínimo de consumo em $ e formulário de reserva)
5. Gallery (visual com gradientes/CSS, sem fotos de terceiros)
6. Private Events (aniversários, corporativo, buyouts)
7. FAQ (idade, dress code, estacionamento, rideshare, política de entrada)
8. Hours & Location (mapa embed do Google Maps no Arts District)
9. Newsletter / "Join the guest list"
10. Footer com redes, © e Privacy Policy

## Identidade visual
- Fundo quase preto; acentos neon violeta (#8B5CF6) e ciano elétrico (#22D3EE), toque magenta
- Fontes: display geométrica/condensada para títulos + sans limpa para texto
- Efeitos sutis: glow, gradientes animados, grão; respeitar prefers-reduced-motion

## Suposições
- Links de ingressos apontam para `#` com marcador `[TICKETING LINK]` (ex.: Eventbrite/DICE).
- Formulários usam `[FORM ENDPOINT]` (Formspree).
- Fins de semana a partir de 10/30/2026 (data de hoje): line-up inventado, preços "a partir de" fictícios.
- Pacotes VIP (fictícios): Booth $750, Elevated $1,500, Moon Table $3,000 (mínimo de consumo, antes de taxa e gorjeta).
- Domínio canônico provisório: `https://www.moonwire.example/` (trocar no `/publicar-site`).
- Mapa: embed do Google Maps por busca de endereço (sem chave de API).
- Sem fotos: galeria e hero feitos com gradientes, SVG e CSS.

## Plano

### Mapa do site
- `index.html` — one-page com âncoras
- `privacy.html` — Privacy Policy

### Seções da home
1. Header fixo: logo, nav (Events, Experience, VIP, Gallery, Private, FAQ, Visit), telefone `tel:`, botão "Get Tickets"; menu mobile acessível
2. Hero: H1 "MOONWIRE", tagline, card do próximo evento com contagem regressiva, CTAs "Get Tickets" / "Book a VIP Table"
3. Faixa (marquee) com gêneros
4. Upcoming Events — 6 cards (data, nome, line-up, gênero, "from $")
5. The Experience — Main Room, Sound, Rooftop, Light Show + números
6. VIP Tables & Bottle Service — 3 pacotes + formulário de reserva (consentimento SMS)
7. Gallery — mosaico de arte CSS
8. Private Events — aniversários, corporativo, buyouts
9. FAQ — accordion `<details>`
10. Hours & Location — horários, endereço, como chegar, Google Maps
11. Join the Guest List — newsletter
12. Footer — redes, contato, © 2026, Privacy Policy
13. Barra fixa mobile: Call / Text / Tickets

### Paleta (fundo escuro, contraste AA conferido)
| Uso | Cor |
|---|---|
| Fundo | `#07060B` |
| Superfície | `#13101C` |
| Texto | `#F4F2FA` (texto secundário `#B5AFC8`) |
| Violeta neon | `#8B5CF6` (botões `#7C3AED` com texto branco, 5.7:1) |
| Ciano elétrico | `#22D3EE` |
| Magenta | `#E879F9` (botões `#C026D3`) |

### Fontes
- Títulos: **Big Shoulders Display** (condensada, 700/900)
- Texto: **Inter** (400/500/600)

### CTA principal
"Get Tickets" (secundário: "Book a VIP Table")

## Marcadores pendentes
- `[TICKETING LINK]` — constante `TICKETING_URL` em `assets/js/main.js` (enquanto não preenchido, os botões "Get Tickets" mostram aviso de "tickets go live soon").
- `[FORM ENDPOINT]` — atributo `action` dos 2 formulários em `index.html` (reserva VIP e guest list); sem ele, o envio abre o e-mail via `mailto:`.

## Prévia
https://bruunodg77.github.io/target-agency-sites/moonwire-la/
