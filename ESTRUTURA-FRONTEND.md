# 📂 Estrutura Completa do Front-End - Portal Auditoria

## Plataforma SaaS Multi-tenant, API-first

**Versão:** 2.1.0
**Tecnologia:** TypeScript Vanilla + Vite
**Arquitetura:** SPA (Single Page Application) com Performance Otimizada
**Última Atualização:** 06/12/2025

---

## 🎯 Visão Geral

**Plataforma SaaS multi-tenant, API-first** para gestão de escritórios de contabilidade e auditoria.

Front-end moderno construído **sem frameworks**, focado em **máxima performance** e **otimizações avançadas**, consumindo uma API RESTful padronizada em `/api/v1`.

### **Arquitetura da Plataforma:**
- 🏢 **Multi-tenant**: Isolamento completo de dados por tenant (empresa_id)
- 🔌 **API-first**: API RESTful padronizada em `/api/v1`
- 🚀 **SaaS-ready**: Autenticação JWT, roles hierárquicos, pronto para escalar

### **Frontend (SPA):**
- ✅ TypeScript strict mode
- ✅ SPA Router customizado com lazy loading
- ✅ Vite como bundler
- ✅ Web Vitals otimizados (LCP, FID, CLS)
- ✅ Bundle < 200KB (gzipped)
- ✅ PWA com Service Worker
- ✅ Code splitting automático

---

## 🔄 Fluxo de Integração Completo (Frontend ↔ Backend)

### Como tudo funciona junto:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. Usuário acessa rota /admin/dashboard                             │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 2. Router verifica se existe guard (AuthGuard)                      │
│    → AuthGuard.canActivate() valida:                                │
│      - Token existe no AuthStore?                                   │
│      - Token é válido? (JwtUtils.decode)                            │
│      - Role do usuário permite acesso?                              │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 3. Lazy loading da página (import dinâmico)                         │
│    → router.navigate() carrega o chunk apenas quando necessário     │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 4. Página renderiza e chama serviço                                 │
│    Ex: dashboardService.getMetrics()                                │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 5. Serviço usa HttpClient                                           │
│    httpClient.get('/api/v1/dashboard/metrics')                      │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 6. AuthInterceptor injeta token                                     │
│    headers: { 'Authorization': 'Bearer eyJhbG...' }                 │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 7. Requisição HTTP para backend                                     │
│    → Backend valida JWT                                             │
│    → Backend processa request                                       │
│    → Backend retorna JSON                                           │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 8. ErrorInterceptor trata resposta                                  │
│    → 401? → Faz logout e redireciona para /login                    │
│    → 403? → Redireciona para /unauthorized                          │
│    → 500? → Mostra erro via UI.showError()                          │
│    → 200? → Retorna dados para o serviço                            │
└──────────────────────┬──────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 9. Página recebe dados e atualiza UI                                │
│    → UI.showLoading() (durante requisição)                          │
│    → UI.hideLoading() (após receber dados)                          │
│    → Renderiza dados na tela                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Exemplo Prático:

```typescript
// 1. Definição de rota com guard (config/routes.config.ts)
{
  path: '/admin/dashboard',
  component: () => import('@pages/admin/dashboard/DashboardPage'),
  guard: AuthGuard  // ← Validação automática
}

// 2. Página usa service (pages/admin/dashboard/DashboardPage.ts)
import { dashboardService } from '@services/dashboard.service';
import { showLoading, hideLoading, showError } from '@core/ui';

async render() {
  try {
    showLoading('Carregando métricas...');
    const metrics = await dashboardService.getMetrics();
    hideLoading();
    return this.renderMetrics(metrics);
  } catch (error) {
    hideLoading();
    showError('Erro ao carregar métricas');
  }
}

// 3. Service usa HttpClient (services/dashboard.service.ts)
import { httpClient } from '@core/http/HttpClient';

async getMetrics() {
  // Token injetado automaticamente pelo AuthInterceptor
  return httpClient.get<MetricsDTO>('/api/v1/dashboard/metrics');
}

// 4. HttpClient faz requisição com interceptors
// → AuthInterceptor: adiciona 'Authorization: Bearer {token}'
// → ErrorInterceptor: trata erros automaticamente
// → Retorna dados tipados (MetricsDTO)
```

---

## 📁 Estrutura de Diretórios

```
frontend/
│
├── 📄 index.html                    # Entry point HTML
├── 📄 package.json                  # Dependências e scripts
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 vite.config.ts                # Configuração Vite
│
├── 📂 public/                       # Arquivos estáticos
│   ├── fonts/                      # Fontes locais (performance)
│   │   ├── inter-regular.woff2
│   │   └── Inter-Bold.woff2
│   └── images/                     # Imagens estáticas
│
├── 📂 src/                          # Código-fonte principal
│   │
│   ├── 📄 main.ts                   # Entry point da aplicação
│   ├── 📄 app.ts                    # Classe principal App
│   │
│   ├── 📂 config/                   # Configurações
│   │   ├── api.config.ts           # Configuração de API (/api/v1)
│   │   ├── routes.config.ts        # Definição de rotas da SPA
│   │   └── features.config.ts      # Feature flags
│   │
│   ├── 📂 core/                     # Core da aplicação
│   │   │
│   │   ├── 📂 auth/                 # Sistema de autenticação
│   │   │   └── JwtUtils.ts         # Utilitários JWT
│   │   │
│   │   ├── 📂 router/               # Sistema de rotas (SPA)
│   │   │   ├── Router.ts           # Router com lazy loading
│   │   │   ├── Route.ts            # Definição de rota
│   │   │   └── guards/
│   │   │       └── AuthGuard.ts    # Proteção de rotas
│   │   │
│   │   ├── 📂 http/                 # Cliente HTTP
│   │   │   ├── HttpClient.ts       # Wrapper do fetch API
│   │   │   └── interceptors/
│   │   │       ├── AuthInterceptor.ts    # Injeta token
│   │   │       └── ErrorInterceptor.ts   # Trata erros HTTP
│   │   │
│   │   ├── 📂 state/                # Gerenciamento de estado
│   │   │   ├── Store.ts            # Store genérica (Proxy)
│   │   │   └── AuthStore.ts        # Store de autenticação
│   │   │
│   │   ├── 📂 ui/                   # Sistema de UI Core
│   │   │   ├── index.ts            # API unificada de UI
│   │   │   ├── feedback.ts         # Loading global
│   │   │   ├── alert.ts            # Alertas/erros
│   │   │   └── toast.ts            # Toast notifications
│   │   │
│   │   ├── 📂 logger/               # Sistema de logs
│   │   │   ├── Logger.ts           # Logger centralizado
│   │   │   └── FrontendErrorReporter.ts # Reporta erros ao backend
│   │   │
│   │   └── 📂 performance/          # Performance Core
│   │       ├── PerformanceMonitor.ts    # Web Vitals
│   │       ├── LazyLoader.ts            # Lazy loading universal
│   │       ├── ImageOptimizer.ts        # Otimização de imagens
│   │       └── ResourcePrefetcher.ts    # Prefetch inteligente
│   │
│   ├── 📂 services/                 # Camada de serviços (API)
│   │   ├── auth.service.ts         # Autenticação
│   │   ├── layout.service.ts       # Layout
│   │   ├── dashboard.service.ts    # Dashboard
│   │   └── invite.service.ts       # Convites
│   │
│   ├── 📂 models/                   # Tipos e DTOs
│   │   └── dto/
│   │       ├── index.ts            # Re-exportações
│   │       ├── api.types.ts        # Tipos do OpenAPI
│   │       ├── auth.dto.ts         # DTOs de auth
│   │       └── usuario.dto.ts      # DTOs de usuário
│   │
│   ├── 📂 pages/                    # Páginas (lazy loaded)
│   │   │
│   │   ├── 📂 public/               # Páginas públicas
│   │   │   ├── home/
│   │   │   │   └── HomePage.ts
│   │   │   ├── login/
│   │   │   │   └── LoginPage.ts
│   │   │   └── register/
│   │   │       └── RegisterPage.ts
│   │   │
│   │   ├── 📂 admin/                # Páginas administrativas
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardPage.ts
│   │   │   │   ├── SuperAdminDashboardPage.ts
│   │   │   │   ├── CompanyAdminDashboardPage.ts
│   │   │   │   └── UserDashboardPage.ts
│   │   │   │
│   │   │   ├── usuarios/
│   │   │   │   ├── UsuarioListPage.ts
│   │   │   │   └── UsuarioFormPage.ts
│   │   │   │
│   │   │   └── empresas/
│   │   │       ├── EmpresaListPage.ts
│   │   │       └── EmpresaFormPage.ts
│   │   │
│   │   └── 📂 errors/               # Páginas de erro
│   │       ├── NotFoundPage.ts
│   │       └── UnauthorizedPage.ts
│   │
│   ├── 📂 components/               # Componentes reutilizáveis
│   │   ├── layout/
│   │   │   ├── Header.ts
│   │   │   └── Footer.ts
│   │   └── media/
│   │       └── LazyImage.ts
│   │
│   └── 📂 styles/                   # Estilos CSS
│       ├── main.css                # Entry point CSS
│       ├── variables.css           # Design tokens
│       ├── utilities.css           # Classes utilitárias
│       └── components.css          # Estilos de componentes
│
└── 📂 dist/                         # Build de produção
    ├── index.html
    └── assets/
        ├── js/                     # JavaScript minificado + chunks
        └── css/                    # CSS minificado
```

---

## 🏗️ Arquitetura de Componentes

### 1️⃣ **Entry Point (`main.ts`)**

```typescript
import './styles/main.css';
import { App } from './app';

async function initApp() {
  await mountShell();    // Header + Footer
  const app = new App();
  await app.init();      // Inicializa sistemas
}
```

### 2️⃣ **Classe Principal (`app.ts`)**

```typescript
export class App {
  async init(): Promise<void> {
    // 1. Error reporter
    // 2. Registra rotas com guards
    // 3. Inicializa router com lazy loading
    // 4. Configura interceptors HTTP
  }
}
```

### 3️⃣ **Sistema de Rotas (`Router.ts`)**

- ✅ Lazy loading automático de páginas
- ✅ AuthGuard para proteção de rotas
- ✅ Hash-based routing (`#/path`)
- ✅ Navegação programática
- ✅ Imports dinâmicos para code splitting

**Exemplo:**
```typescript
import { router } from '@core/router/Router';

router.navigate('/admin/dashboard');

// Rota protegida
{
  path: '/admin/dashboard',
  component: () => import('./pages/admin/dashboard/DashboardPage'),
  guard: AuthGuard
}
```

### 4️⃣ **HTTP Client (`HttpClient.ts`)**

Sistema centralizado de comunicação com `/api/v1`:

- ✅ Wrapper do `fetch` com interceptors
- ✅ AuthInterceptor: injeta token automaticamente
- ✅ ErrorInterceptor: trata erros HTTP (401, 403, 500)
- ✅ Suporte a upload de arquivos
- ✅ Tipagem forte com DTOs
- ✅ Retry automático

**Exemplo:**
```typescript
import { httpClient } from '@core/http/HttpClient';

const empresas = await httpClient.get<EmpresaDTO[]>('/api/v1/empresas');

const nova = await httpClient.post<EmpresaDTO>('/api/v1/empresas', {
  razaoSocial: 'Empresa Exemplo',
  cnpj: '00.000.000/0001-00'
});
```

### 5️⃣ **State Management (`Store.ts`)**

- ✅ Store reativa usando Proxy
- ✅ Subscribe/unsubscribe
- ✅ AuthStore para autenticação
- ✅ Sincronização com localStorage

**Exemplo:**
```typescript
import { authStore } from '@core/state/AuthStore';

authStore.subscribe((state) => {
  console.log('User:', state.user);
  console.log('Token:', state.token);
});

authStore.setState({ user: userData, token: jwtToken });
```

### 6️⃣ **UI Core System**

Sistema unificado de feedback:

```typescript
import { showLoading, hideLoading, showError, showSuccess } from '@core/ui';

showLoading('Carregando...');
// ... operação
hideLoading();

showError('Erro ao carregar dados');
showSuccess('Operação realizada com sucesso!');
```

---

## 🎨 Arquitetura CSS

### **Fluxo de Carregamento:**

```
index.html → <script src="/src/main.ts">
    ↓
import './styles/main.css'
    ↓
Vite processa:
  - DEV:  Injeta CSS via <style> (HMR)
  - PROD: Gera main-[hash].css minificado
```

### **Arquivos CSS:**

| Arquivo | Descrição |
|---------|-----------|
| `main.css` | Entry point + reset + @font-face |
| `variables.css` | Design tokens (cores, fontes, espaçamentos) |
| `utilities.css` | Grid system + classes utilitárias |
| `components.css` | Componentes (botões, cards, navegação) |

---

## 📦 Code Splitting

Configurado em `vite.config.ts`:

```typescript
manualChunks: {
  'vendor-core': [
    './src/core/router/Router',
    './src/core/http/HttpClient',
    './src/core/state/Store'
  ],
  'vendor-performance': [
    './src/core/performance/PerformanceMonitor',
    './src/core/performance/LazyLoader'
  ],
  'auth': [
    './src/services/auth.service',
    './src/pages/public/login/LoginPage'
  ],
  'admin': [
    './src/pages/admin/dashboard/DashboardPage'
  ]
}
```

**Resultado:**
- Bundle principal < 50KB
- Chunks carregados sob demanda
- Total < 200KB (gzipped)

---

## 🚀 Scripts NPM

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Dev server (http://localhost:3000) |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run analyze` | Análise de bundle |

---

## 🔧 Configurações Principais

### **tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@core/*": ["./src/core/*"],
      "@services/*": ["./src/services/*"],
      "@models/*": ["./src/models/*"],
      "@pages/*": ["./src/pages/*"]
    }
  }
}
```

---

## 📊 Performance Budget

| Métrica | Target | Status |
|---------|--------|--------|
| FCP (First Contentful Paint) | < 1.5s | ✅ |
| LCP (Largest Contentful Paint) | < 2.5s | ✅ |
| TTI (Time to Interactive) | < 3.5s | ✅ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ |
| Bundle Size (gzipped) | < 200KB | ✅ |
| Lighthouse Score | 95+ | ✅ |

---

## 🌐 Rotas Disponíveis

### **Públicas (sem autenticação):**
- `/` - Home
- `/login` - Login
- `/register` - Cadastro
- `/forgot-password` - Recuperação de senha
- `/servicos` - Serviços
- `/blog` - Lista de posts
- `/blog/:slug` - Detalhe de post

### **Protegidas (requer autenticação):**
- `/admin/dashboard` - Dashboard (multi-role)
- `/admin/profile` - Perfil do usuário
- `/admin/usuarios` - Gerenciar usuários
- `/admin/empresas` - Gerenciar empresas
- `/admin/posts` - Gerenciar posts
- `/admin/servicos` - Gerenciar serviços
- `/admin/audit` - Logs de auditoria

### **Erro:**
- `/404` - Página não encontrada
- `/unauthorized` - Não autorizado

---

## 🔐 Sistema de Autenticação

```typescript
// AuthStore (Reativa)
authStore.subscribe((state) => {
  console.log('User:', state.user);
  console.log('Token:', state.token);
});

// AuthGuard (Proteção de rotas)
{
  path: '/admin/dashboard',
  component: () => import('./pages/admin/dashboard/DashboardPage'),
  guard: AuthGuard
}

// AuthInterceptor (Injeta token automaticamente)
fetch('/api/v1/empresas', {
  headers: {
    'Authorization': `Bearer ${token}`  // Automático
  }
});
```

---

## 👥 Sistema Multi-Role de Dashboards

### **Super Admin Dashboard**
- Visão completa do sistema
- Gestão de empresas
- Gestão global de usuários
- Analytics avançados

### **Company Admin Dashboard**
- Visão da empresa
- Gestão de usuários da empresa
- Sistema de convites
- Configurações da empresa

### **User Dashboard**
- Visão pessoal
- Edição de perfil
- Histórico de atividades

**Implementação:**
- Roteamento dinâmico baseado em `user.role`
- Lazy loading de cada dashboard
- Guards de rota validam permissões

---

## ✨ Features Implementadas

### **Core & Arquitetura**
- ✅ TypeScript strict mode
- ✅ SPA Router com lazy loading
- ✅ AuthGuard para proteção
- ✅ HTTP Client com interceptors
- ✅ State management reativo
- ✅ UI Core System
- ✅ Logger centralizado
- ✅ Frontend Error Reporter

### **Performance**
- ✅ Web Vitals monitoring
- ✅ Lazy loading automático
- ✅ Image optimization
- ✅ Resource prefetching
- ✅ Code splitting
- ✅ Bundle < 200KB

### **Autenticação**
- ✅ JWT completo
- ✅ AuthStore reativa
- ✅ AuthInterceptor
- ✅ Guards por role
- ✅ Sistema de convites

---

**Versão:** 2.1.0
**Última Atualização:** 06/12/2025
**Arquitetura:** SaaS Multi-tenant, API-first
