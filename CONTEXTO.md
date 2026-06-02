# Expansão AI — Site Institucional

Repositório: [github.com/marcosmrego/site-expansao.ai](https://github.com/marcosmrego/site-expansao.ai)  
Produção: [expansao-ai.com.br](https://expansao-ai.com.br)  
Deploy: Coolify (self-hosted) · porta `3000`

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS 4 + CSS customizado (`globals.css`) |
| Animações | Framer Motion 12 |
| Ícones | Tabler Icons React |
| Fonte | Inter via `next/font/google` |

Single-page application com navegação por âncoras: `#servicos` · `#projetos` · `#laboratorio` · `#sobre` · `#contato`

---

## Estrutura de arquivos

```
app/
  layout.tsx        # Root layout, metadata OpenGraph, font Inter
  page.tsx          # Composição das seções
  globals.css       # Design system completo (variáveis, animações, componentes)

components/
  Navbar.tsx        # Client — scroll-aware + hamburger mobile
  Hero.tsx          # Server — copy, stats, pill
  HeroVisual.tsx    # Client — tilt 3D com mouse + contador animado
  Services.tsx      # 3 cards de serviço (array de dados)
  Projects.tsx      # Showcase grid — roteamento de previews por ID
  InvestmentPreview.tsx  # Client — BTC/USD ao vivo (CoinGecko API)
  ClimatePreview.tsx     # Client — ENSO/ONI ao vivo (API própria)
  Laboratory.tsx    # Lista de experimentos + MiniDashboard
  MiniDashboard.tsx # Client — gráfico SVG animado + métricas com micro-variações
  About.tsx         # 3 princípios da empresa
  Contact.tsx       # CTA com email e WhatsApp
  Footer.tsx        # Links, social, copyright
  Logo.tsx          # SVG do logo (nó de rede)
  Section.tsx       # Wrapper genérico (não usado atualmente)

data/
  projects.ts       # Dados dos projetos (não usado — inline em Projects.tsx)
  laboratory.ts     # Dados do laboratório (não usado — inline em Laboratory.tsx)
```

---

## Design System

### Paleta de cores (`globals.css`)

```css
--bg: #06060d               /* fundo principal */
--violet: #7a5cff           /* accent primário */
--violet-soft: #9a78ff      /* accent suave */
--violet-light: #b09aff     /* accent claro */
--blue: #5ba8ff             /* accent secundário */
--text: #f4f2ff             /* texto principal */
--muted: #8a83b2            /* texto secundário */
--border: rgba(122,92,255,.16)     /* borda padrão */
--border-hi: rgba(122,92,255,.42)  /* borda highlight */
```

### Animações globais (keyframes)

| Nome | Uso |
|------|-----|
| `float` | Cards flutuantes no Hero e Laboratory |
| `node-pulse` | Nodes pulsando no Hero Visual |
| `ring-spin` / `ring-spin-reverse` | Anéis girando no Hero |
| `orb-pulse` | Orbs respirando |
| `shimmer` | Varredura de luz em botões e cards no hover |
| `pulse-dot` | Dot de status "Ao vivo" |
| `fade-in-down` | Menu mobile da Navbar |

### Espaçamento

- Seções desktop: `padding: 56px 0`
- Seções mobile: `padding: 48px 0`
- Hero desktop: `padding: 72px 0 80px`
- `section-header` margin-bottom: `48px`

---

## Componentes com dados ao vivo

### HeroVisual
- **Tilt 3D**: `useMotionValue` + `useSpring` + `useTransform` do Framer Motion. Responde ao movimento do mouse com spring `stiffness: 72, damping: 20`, rotação de ±11° horizontal / ±8° vertical.
- **Contador**: Card "Signal" conta de 0 a 42% na entrada da página via `animate()` imperativo do Framer Motion (duração 1.5s, delay 0.5s).

### InvestmentPreview (card Investment Intelligence)
- **API**: [CoinGecko](https://api.coingecko.com) — sem chave, gratuita
- **Endpoints**:
  - `GET /api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true`
  - `GET /api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`
- **Exibe**: preço atual BTC/USD, variação 24h (verde/vermelho), sparkline das últimas 24h
- **Atualização**: a cada 60 segundos
- **Decisão de design**: BTC fica no card do projeto específico, não no MiniDashboard institucional — para não destoar do tom da empresa

### ClimatePreview (card Expansão AI Climate)
- **API**: `https://climate.expansao-ai.com.br` (própria)
- **Endpoints usados**:
  - `GET /climate/status` → `{ oni, classificacao, nino34, fase }`
  - `GET /climate/trend` → `{ atual, anterior, variacao, tendencia }`
  - `GET /climate/history` → array de 24 meses `{ periodo, oni, classificacao }`
  - `GET /api/climate/alerts` → disponível, não usado ainda no widget
- **Exibe**: índice ONI atual, badge de classificação (El Niño / La Niña / Neutro), tendência com variação, sparkline de 24 meses com linha de referência zero
- **Cores por classificação**: `EL_NINO` → laranja `#f97316` · `LA_NINA` → ciano `#22d3ee` · `NEUTRO` → violeta `#9a78ff`
- **Atualização**: a cada 5 minutos

### MiniDashboard (seção Laboratório)
- Gráfico SVG animado com duas linhas (principal + secundária tracejada)
- Métricas "automação %" e "eficiência %" atualizam a cada 3.2s com pequenas variações aleatórias e contagem suave via `animate()` do Framer Motion
- Indicador "Ao vivo" com dot pulsante

---

## Navbar

Client component com:
- Detecção de scroll (`window.scrollY > 20`) → adiciona classe `nav-scrolled` (fundo mais opaco + sombra)
- Links desktop com underline animado no hover
- Menu mobile com `IconMenu2` / `IconX`, animação `fade-in-down`, fecha ao clicar em qualquer link
- Acessibilidade: `aria-expanded`, `aria-label` no botão hamburger

---

## Deploy

**Plataforma**: Coolify (self-hosted no VPS)  
**Porta da aplicação**: `3000`  
**Repositório**: GitHub (`marcosmrego/site-expansao.ai`) — branch `main`

Para novos deploys, após push no GitHub o Coolify pode ser configurado para redeploy automático via webhook.

**Script manual** (`deploy.sh` na raiz):
```bash
bash deploy.sh
# Faz: git pull → npm install → npm run build → pm2 restart
```

---

## Roadmap acordado

### ClimatePreview — carousel rotativo
Quando novos endpoints climáticos estiverem disponíveis (temperatura, CO₂, precipitação, etc.), transformar o `ClimatePreview` em um carousel que troca de métrica a cada 1 minuto usando `setInterval` + `AnimatePresence` do Framer Motion. Objetivo: transmitir a profundidade do produto e instigar curiosidade do visitante.

### Dados do laboratório
Os arquivos `data/laboratory.ts` e `data/projects.ts` existem mas não são consumidos — os dados estão hardcoded diretamente nos componentes `Laboratory.tsx` e `Projects.tsx`. Consolidar futuramente.

### Páginas individuais de projeto
Criar rotas `/projetos/climate`, `/projetos/investment-intelligence`, `/projetos/workflow-agents` com mais detalhes de cada produto.

---

## Decisões de design relevantes

- **Dados ao vivo só onde fazem sentido contextual**: indicadores financeiros ou climáticos ficam nos cards dos projetos correspondentes, não em seções institucionais genéricas
- **MiniDashboard**: usa simulação com micro-variações — credibilidade vem do contexto, não de dados reais genéricos
- **Gradient text**: títulos, valores de cards e logo do footer usam `-webkit-background-clip: text` com gradiente violeta→azul
- **Shimmer em botões**: animação `::after` contínua nos botões primários; shimmer de hover nos feature cards
- **Espaçamento**: reduzido progressivamente até atingir o ritmo certo — referência foi a distância entre a seção Contact e o Footer
