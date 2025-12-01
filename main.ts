import './styles/main.css';
import { App } from './app';
import { layoutService } from '@services/layout.service';
import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';

/**
 * Entry Point da Aplicação
 * Este arquivo é carregado pelo index.html
 */

// Aguarda DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/**
 * Inicializa aplicação
 */
async function initApp() {
  await mountShell();
  const app = new App();
  await app.init();
}

async function mountShell() {
  try {
    const data = await layoutService.getHeaderFooter();
    const headerHtml = new Header(data).render();
    const footerHtml = new Footer(data).render();

    const appEl = document.getElementById('app');
    if (!appEl || !appEl.parentElement) return;

    const headerWrap = document.createElement('div');
    headerWrap.innerHTML = headerHtml;
    appEl.parentElement.insertBefore(headerWrap.firstElementChild as HTMLElement, appEl);

    const footerWrap = document.createElement('div');
    footerWrap.innerHTML = footerHtml;
    appEl.parentElement.insertBefore(footerWrap.firstElementChild as HTMLElement, appEl.nextSibling);
  } catch (e) {
    // segue sem bloquear
    console.warn('Header/Footer não carregados', e);
  }
}

/**
 * Hot Module Replacement (HMR) para Vite em desenvolvimento
 * Permite recarregar módulos sem perder estado
 */
if (import.meta.hot) {
  import.meta.hot.accept();
}
