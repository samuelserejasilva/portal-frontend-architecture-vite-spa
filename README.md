# 🚀 Portal Auditoria - SPA Architecture Showcase

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/samuelserejasilva/portal-frontend-architecture-vite-spa/blob/main/main.ts)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://github.com/samuelserejasilva/portal-frontend-architecture-vite-spa/blob/main/vite.config.ts)
![Performance](https://img.shields.io/badge/Lighthouse-100-success?style=for-the-badge&logo=lighthouse&logoColor=white)
![Status](https://img.shields.io/badge/Status-Showcase-orange?style=for-the-badge)

Showcase de **Arquitetura SPA de Alta Performance** (Vanilla TypeScript + Vite) desenvolvida para o **Portal Auditoria 2.0**.

> ⚠️ **AVISO / DISCLAIMER**
>
> Este repositório é um **estudo de arquitetura (showcase)**.
> O código-fonte completo do produto é **proprietário / fechado**.
>
> **Aqui você encontra:**
> - 🏗️ Documentação de arquitetura e decisões técnicas
> - ⚙️ Configurações de build otimizadas (`vite.config.ts`)
> - ⚡ Padrões de performance e organização de pastas
> - 🎨 Guia completo do sistema de estilos (CSS Architecture)

---

## 🎯 Objetivo

Demonstrar, de forma transparente e técnica, como foi projetada uma **Single Page Application (SPA)** focada em **performance extrema**:

- ✅ **Zero Frameworks Pesados:** Construído com Vanilla TypeScript.
- ✅ **Web Vitals Otimizados:** Foco total em LCP, FID, CLS e TTI.
- ✅ **Bundle Leve:** Tamanho final **< 200KB (gzipped)**.
- ✅ **Acessibilidade:** Pensada para rodar fluidamente até em redes móveis (3G/4G).

Este repositório serve como portfólio técnico para demonstrar engenharia de software avançada sem expor regras de negócio sensíveis.

---

## 🛠️ Stack Tecnológico

| Categoria | Tecnologias |
|-----------|-------------|
| **Linguagem** | TypeScript (Strict Mode), Vanilla JS |
| **Build & Dev** | Vite (ESM, HMR, esbuild + Rollup) |
| **Arquitetura** | SPA Modular, Lazy Loading, Clean Architecture |
| **Performance** | Web Vitals Monitor, Lazy Loader Universal, Image Optimizer |
| **PWA** | Service Worker, Manifest, Cache Strategies, Offline Fallback |

---

## 🏗️ Visão de Arquitetura

A aplicação é organizada em camadas claras, separando responsabilidades de **core**, **serviços**, **páginas** e **UI**.

```text
src/
├── core/                 # 🧠 Framework agnóstico (Router, Http, State, Logger)
├── services/             # 🔌 Camada de acesso à API e Regras de Negócio
├── models/               # 📦 DTOs e Tipagem (TypeScript/OpenAPI)
├── pages/                # 📄 Páginas Públicas e Administrativas (Lazy Loaded)
├── components/           # 🧩 Componentes Reutilizáveis (Layout, Media, UI)
└── styles/               # 🎨 Sistema CSS em camadas (Tokens, Utilities)
📘 Quer ver a estrutura detalhada? Consulte o arquivo completo: ESTRUTURA-FRONTEND-COMPLETA.md

⚡ Destaques Técnicos
1. Vite + Code Splitting Manual
O arquivo vite.config.ts foi customizado para superar as configurações padrão, implementando estratégias manuais de divisão de código (chunks):

vendor-core: Router, Http Client, State Management.

vendor-performance: Web Vitals, LazyLoader, Image Optimizer.

auth: Módulos de login e segurança.

admin: Módulos da área administrativa (carregados sob demanda).

Diferenciais:

Compressão Gzip + Brotli nativa.

Runtime Caching via VitePWA.

2. SPA Router + Guards + Interceptors
Sistema de roteamento próprio, leve e seguro:

AuthGuard: Proteção automática de rotas administrativas.

Http Interceptors: Injeção automática de JWT e tratamento global de erros (401/403).

State Management: Store reativa baseada em Proxy nativo do JS.

3. Performance Core (src/core/performance)
Módulos dedicados para garantir a nota 100 no Lighthouse:

PerformanceMonitor: Coleta métricas reais (LCP, FID, CLS) em tempo de execução.

LazyLoader: Carregamento sob demanda universal (Imagens, Vídeos, Iframes).

ResourcePrefetcher: "Adivinha" a próxima navegação e pré-carrega rotas e APIs.

4. Sistema CSS "Estado da Arte"
Arquitetura de estilos sem dependência de frameworks (Tailwind/Bootstrap) para reduzir o peso crítico.

Critical CSS: Injetado inline.

Design Tokens: Variáveis CSS para cores, tipografia e espaçamentos.

Grid System: Sistema próprio de 12 colunas flexível.

🎨 Veja o guia de estilos: src/styles/README-CSS-USAGE.md

📚 Documentação Complementar
Recomendamos a navegação na seguinte ordem:

README.md (Este arquivo) - Visão geral.

ESTRUTURA-FRONTEND-COMPLETA.md - Árvore de arquivos e explicação detalhada.

src/styles/README-CSS-USAGE.md - Sistema de Design, Grid e Tokens.

❓ F.A.Q.
Este repositório roda a aplicação completa?

Não necessariamente. Como o objetivo é demonstrar decisões de arquitetura e padrões de código, as partes contendo regras de negócio proprietárias e dados sensíveis não estão incluídas.

Para que serve este repositório?

Portfólio Técnico: Demonstração de capacidade em Engenharia de Software.

Referência: Base de conhecimento para boas práticas em Vite e TypeScript.

Auditoria: Transparência sobre a qualidade técnica do produto.

👨‍💻 Autor
Samuel Sereja Silva Contador & Desenvolvedor de Software Especialista em unir regras de negócio complexas com engenharia de software de alta performance.

Documentação gerada em Dezembro de 2025.
