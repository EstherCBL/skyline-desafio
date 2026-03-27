# Skyline - Página Inicial para Ultratour RL COSTA - ZIGRA
Este projeto foi desenvolvido para participação do desafio proposto pela empresa Skyline, cujo objetivo é construir uma página interativa seguindo o design proposto que dê acesso ao Ultratour da empresa RL Costa. 

## 🌃 Visão Geral
- HTML, CSS e JavaScript puros (sem frameworks)
- fundo animado com imagem de cidade noturna
- efeito de parallax, partículas, glow e cursor customizado
- CTA com borda brilhante e interação de luz

## 📁 Estrutura do Projeto

- `pagina_inicial.html`
  - background em camadas
  - canvas de efeito de cursor (`#ghost-canvas`)
  - logo lateral (`.side-logo-wrap` + `.side-logo`)
  - logo central (`.hero-logo`)
  - botão CTA com `border-glow-card`
  - import de `main.js`

- `style.css`
  - variáveis CSS (`:root`)
  - full-screen + mobile
  - animações: `bgDrift`, `logoReveal`, `fadeSlideDown`, `fadeSlideLeft`, `fadeIn`, `glowPulse`
  - `.side-logo-wrap` no canto inferior esquerdo
  - `.border-glow-card` estilo glassmorphism + glow

- `main.js`
  - IIFEs estruturadas para cada módulo de efeito
  - `initParticles()` → partículas flutuantes
  - `initGhostCursor()` → rastro de cursor e ponto de referência
  - `initBorderGlow()` → borda de botão reage à posição do mouse

## ✨ Funcionalidades

1. Ghost Cursor
   - canvas full-screen
   - trilha de pontos (15 itens) com fade
   - ponto de referência no cursor
   - fade out ao parar o mouse

2. Partículas
   - 100 partículas ascendentes
   - opacidade cíclica (sin)
   - renascimento no fim da tela

3. Botão com glow
   - propriedades dinâmicas: `--edge-proximity`, `--cursor-angle`, `--cone-spread`
   - gradientes e blur moderno

4. Responsividade
   - mobile (`max-width: 600px`) esconde `.side-logo-wrap`
   - ajustes de tamanho e espaçamento

## 🚀 Como rodar

1. Coloque todos os arquivos em uma pasta local.
2. Abra `pagina_inicial.html` no navegador.

## Referências
- React Bits: https://reactbits.dev
