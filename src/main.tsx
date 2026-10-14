import React, { renderApp } from './lib/react-runtime';
import { App } from './App';

function bootstrap() {
  const rootEl = document.getElementById('root');
  if (!rootEl) {
    throw new Error('Missing #root container in index.html');
  }
  renderApp(() => <App />, rootEl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
