 # Portal Auditoria – SPA Architecture Showcase

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-SPA%20Clean%20%2B%20Modular-0F766E)](#-visao-de-arquitetura)
[![License: MIT](https://img.shields.io/badge/license-MIT-111827)](LICENSE)

Showcase de **Arquitetura SPA de Alta Performance** (Vanilla TypeScript + Vite) desenvolvida para o **Portal Auditoria 2.0**.

> ⚠️ **AVISO / DISCLAIMER**
>
> Este repositório é um **estudo de arquitetura (showcase)**.
> O código-fonte completo do produto é **proprietário / fechado**.
>
> Aqui você encontra:
>
> - 📄 Documentação de arquitetura e decisões técnicas
> - ⚙️ Configurações de build otimizadas (`vite.config.ts`)
> - ⚡ Padrões de performance e organização de pastas
> - 🎨 Guia do sistema de estilos (CSS Architecture)

---

## 📌 Objetivo

Demonstrar, de forma transparente e técnica, como foi projetada uma **Single Page Application (SPA)** focada em **performance extrema**:

- ✅ **Zero Frameworks Pesados** – Construído com Vanilla TypeScript.
- ✅ **Web Vitals otimizados** – foco em LCP, FID, CLS, FCP, TTFB.
- ✅ **Bundle leve** – alvo < 200KB (gzipped).
- ✅ **Acessível em redes móveis** (3G/4G).
- ✅ **Vite** como bundler/dev server (ESM, HMR, esbuild + Rollup).
- ✅ Arquitetura: **SPA modular** com **lazy loading** por rota.
- ✅ **Performance Core**:
  - Monitor de Web Vitals (LCP, FID, CLS, FCP, TTFB)
  - Lazy loading universal (img, vídeo, iframe)
  - Otimizador de imagens (WebP, tamanhos responsivos)
  - Prefetch inteligente de rotas e APIs
- ✅ **PWA**:
  - Manifest + Service Worker
  - Estratégias de cache (Cache First / Network First)
  - Offline fallback
- ✅ **CSS**:
  - Design Tokens via CSS Variables
  - Grid System próprio (12 colunas)
  - Dark Mode (`data-theme`)
  - Classes utilitárias + componentes

Este repositório serve como **portfólio técnico** para demonstrar engenharia de software avançada **sem expor regras de negócio** sensíveis.

---

## 🧠 Análise de Decisão: Por que Vanilla TypeScript?

Ao optar por **não** utilizar frameworks tradicionais (React, Angular, Vue), esta arquitetura assume **trade-offs conscientes** baseados em métricas de engenharia e objetivos de negócio.

### Comparativo de abordagens

| Métrica                | Framework SPA comum (React/Angular/Vue)              | Esta arquitetura (Vanilla TS + Vite)                | Ganho                                       |
|------------------------|------------------------------------------------------|-----------------------------------------------------|--------------------------------------------|
| Bundle inicial (gzip)  | 150–300 KB só de overhead de framework              | \< 50 KB core, \< 200 KB total (gzipped)           | ~70–80% menos JS inicial em 4G             |
| Controle de engenharia | ~50% (parte da lógica escondida no framework)       | 100% (domínio total do fluxo)                      | Menos “mágica”, menos surpresa em upgrades |
| Tempo de setup         | Rápido (CLI, router e store prontos)                | ≈ +30% de esforço inicial para construir o core    | Manutenção e debug muito mais previsíveis  |

> 💡 **Filosofia do projeto**
>
> “Eu troquei a comodidade inicial do desenvolvimento (setup rápido com framework)
> pela excelência na entrega final. O resultado é uma aplicação que carrega quase
> instantaneamente, com controle absoluto sobre cada ciclo de renderização e cada
> byte trafegado.”

---

## 🛠️ Stack Tecnológico

| Categoria     | Tecnologias                                               |
|--------------|-----------------------------------------------------------|
| Linguagem    | TypeScript (Strict Mode), Vanilla JS                      |
| Build & Dev  | Vite (ESM, HMR, esbuild + Rollup)                         |
| Arquitetura  | SPA Modular, Lazy Loading, Clean Architecture             |
| Performance  | Web Vitals Monitor, Lazy Loader Universal, Image Optimizer|
| PWA          | Service Worker, Manifest, Cache Strategies, Offline Fallback |

---

## 🧩 Visão de Arquitetura

A aplicação é organizada em camadas claras, separando responsabilidades de **core**, **serviços**, **páginas** e **UI**.

> ℹ️ A estrutura abaixo representa o projeto **completo** do Portal Auditoria 2.0.
> Este repositório contém apenas os arquivos essenciais (ex.: `main.ts`, `vite.config.ts`)
> e a documentação de arquitetura.

```text
src/
├── core/                 # Framework-agnostic (Router, Http, State, Logger)
├── services/             # Acesso à API + regras de negócio
├── models/               # DTOs e tipagem (TypeScript / OpenAPI)
├── pages/                # Páginas públicas e administrativas (lazy loaded)
├── components/           # Componentes reutilizáveis (layout, media, UI)
└── styles/               # Sistema CSS em camadas (tokens, utilities, themes)
⚡ Destaques Técnicos
1. Vite + Code Splitting Manual
O arquivo vite.config.ts foi customizado para ir além das configs padrão, com divisão manual de chunks:

vendor-core: Router, Http Client, State Management

vendor-performance: Web Vitals, LazyLoader, Image Optimizer

auth: módulos de login e segurança

admin: área administrativa (carregada sob demanda)

Diferenciais adicionais:

Compressão Gzip + Brotli

Runtime caching via VitePWA

2. SPA Router + Guards + Interceptors
Sistema de roteamento próprio, leve e seguro:

AuthGuard: proteção de rotas administrativas

Http Interceptors: injeção automática de JWT e tratamento global de erros (401/403)

State Management: store reativa baseada em Proxy nativo do JS

3. Performance Core (src/core/performance)
Módulos dedicados para maximizar a nota no Lighthouse:

PerformanceMonitor: coleta de métricas reais (LCP, FID, CLS etc.)

LazyLoader: carregamento sob demanda universal (imagens, vídeos, iframes)

ResourcePrefetcher: “adivinha” a próxima navegação e pré-carrega rotas/APIs

4. Sistema CSS “estado da arte”
Arquitetura de estilos sem frameworks de CSS (Tailwind/Bootstrap), reduzindo o peso crítico de CSS:

Critical CSS injetado inline

Design Tokens – variáveis CSS para cores, tipografia e espaçamentos

Grid system próprio (12 colunas, fluido)

Suporte nativo a Dark Mode via data-theme

📄 Veja detalhes no guia de estilos:

README-CSS-USAGE.md
(ou src/styles/README-CSS-USAGE.md, dependendo de onde você mantém o arquivo)

📚 Documentação complementar
Recomendo a leitura na seguinte ordem:

README.md (este arquivo) – visão geral.

ESTRUTURA-FRONTEND.md – árvore de arquivos e explicações detalhadas de cada módulo.

README-CSS-USAGE.md – sistema de design, grid, tokens e convenções de CSS.

❓ F.A.Q.
Este repositório roda a aplicação completa?
Não.
O objetivo é demonstrar decisões de arquitetura e padrões de código.
Partes contendo regras de negócio proprietárias e dados sensíveis não estão incluídas.

Para que serve este repositório?
🧪 Portfólio técnico – demonstração de capacidade em engenharia de software.

📘 Referência – base de boas práticas em Vite e TypeScript.

🔍 Auditoria técnica – transparência sobre a qualidade do produto.

🌍 TL;DR (English)
This repository is an architecture showcase for a high-performance SPA built with vanilla TypeScript and Vite.

It focuses on:

tiny bundle size and Web Vitals,

a custom CSS architecture (design tokens, grid system, dark mode),

PWA features and manual code splitting.

Business rules are not included – this is a technical portfolio, not the full product.

👤 Autor
Samuel Sereja Silva
Contador & Desenvolvedor de Software
Especialista em unir regras de negócio complexas com engenharia de software de alta performance.

GitHub: @samuelserejasilva

LinkedIn: https://www.linkedin.com/in/portalauditoria/

E-mail: samuel@portalauditoria.com.br

Documentação gerada / atualizada em Dezembro de 2025.
