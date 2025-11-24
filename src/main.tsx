import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Inicializar MSW para desarrollo y producción (Vercel)
async function initializeApp() {
  const enableMocks =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'true';

  if (enableMocks) {
    try {
      const { worker } = await import('./infrastructure/mocks/browser');

      // CONFIGURACIÓN CORRECTA PARA MSW v2.x
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/',
            type: 'classic',
          },
        },
        waitUntilReady: true,
      });

      // VERIFICACIÓN MANUAL PARA IOS
      console.log('MSW: Inicializando...');

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((registration) => {
            console.log(
              'MSW: Service Worker registrado:',
              registration.active?.state
            );
          })
          .catch((err) => {
            console.error('MSW: Error en Service Worker:', err);
          });
      }

      // Timeout específico para iOS
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log('MSW: Timeout iOS completado');
      }
    } catch (error) {
      console.error('MSW failed to start:', error);
    }
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
