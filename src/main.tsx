import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Inicializar MSW solo en desarrollo local
async function initializeApp() {
  const enableMocks = import.meta.env.VITE_ENABLE_MOCKS === 'true';

  if (enableMocks) {
    try {
      const { worker } = await import('./infrastructure/mocks/browser');

      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/',
            type: 'classic',
          },
        },
      });

      console.log('🔧 MSW: Mock Service Worker habilitado (desarrollo)');
    } catch (error) {
      console.error('❌ MSW: Error al inicializar:', error);
    }
  } else {
    console.log('🚀 Usando API real en producción');
  }

  // Renderizar la app
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}

initializeApp();
