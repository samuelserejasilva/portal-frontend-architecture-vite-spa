 # Portal Auditoria – SPA Architecture Showcase
---

## 2. Frontend (A Vitrine de Performance)

**Repositório:** `portal-frontend-architecture-vite-spa`
**Principais Mudanças:**
* **Links Cruzados:** Adicionei a tabela "Ecossistema" ligando ao Backend.
* **Segurança:** Destaquei o CSP Level 2 e DOMPurify (os diferenciais técnicos).
* **Status:** Reforçado o aviso de que é um "Architecture Showcase".

```markdown
# Portal Auditoria 2.0 — SPA Architecture Showcase

> **Frontend Enterprise-Grade de Alta Performance construído com Vanilla TypeScript & Vite.**

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite)](https://vitejs.dev/)
[![Performance](https://img.shields.io/badge/Lighthouse-98%2F100-success)](https://pagespeed.web.dev/)
[![Security](https://img.shields.io/badge/CSP-Level%202-green)](SECURITY.md)

---

## ⚠️ Disclaimer
Este repositório é um **estudo de arquitetura (showcase)**. O código-fonte contém a infraestrutura técnica, padrões de design e configurações de performance do produto **Portal Auditoria 2.0**. Regras de negócio proprietárias foram omitidas.

---

## 📌 Diferenciais Técnicos

Demonstração de engenharia de software avançada **sem frameworks pesados**:

* ✅ **Zero Frameworks:** Arquitetura baseada em Vanilla TS e Web Standards.
* ✅ **Bundle Leve:** < 200KB (Gzipped) para carregamento instantâneo em 4G.
* ✅ **Segurança Bancária:** Implementação manual de **CSP Level 2** + **DOMPurify** para mitigar XSS.
* ✅ **Core Proprietário:** Router, State Management (Store) e HttpClient construídos sob medida para o domínio.

---

## 🛡️ Segurança (Frontend Hardening)

Ao contrário de SPAs comuns, este projeto implementa defesa em profundidade no cliente:

1.  **Content Security Policy (CSP):** Strict mode, bloqueando scripts inline e fontes não autorizadas.
2.  **Sanitização:** Todo HTML injetado passa por `DOMPurify` (configuração estrita).
3.  **Auth Storage:** Estratégia híbrida (Refresh Token HTTP-Only + Access Token em Memória).

---

## 🌐 Ecossistema do Projeto

A arquitetura completa do Portal Auditoria é composta por:

| Componente | Repositório | Descrição |
| :--- | :--- | :--- |
| **Backend API** | [portal-backend-architecture-saas-multitenant](https://github.com/samuelserejasilva/portal-backend-architecture-saas-multitenant) | Engine Java 21 Modular Monolith (Production Ready) |
| **Infraestrutura** | [Servidor-Windows-2022](https://github.com/samuelserejasilva/Servidor-Windows-2022) | Servidor de Aplicação Windows Server Hardened |

---

## 🧩 Visão de Arquitetura

src/ ├── core/ # Framework-agnostic (Router, Http, State, Logger) ├── services/ # Camada de Adaptação à API Backend ├── pages/ # Módulos Lazy-Loaded (Admin, Auth, Public) ├── styles/ # CSS Architecture (Tokens, Grid, Critical CSS) └── main.ts # Entry Point


### Destaques do `vite.config.ts`
* Divisão manual de chunks (`vendor-core`, `vendor-ui`, `auth`).
* Compressão Gzip + Brotli no build.
* Remoção agressiva de `console.log` em produção.

---

Samuel Sereja Silva
Contador & Desenvolvedor de Software
Especialista em unir regras de negócio complexas com engenharia de software de alta performance.

GitHub: @samuelserejasilva

LinkedIn: https://www.linkedin.com/in/portalauditoria/

E-mail: samuel@portalauditoria.com.br

Documentação gerada / atualizada em Dezembro de 2025.
