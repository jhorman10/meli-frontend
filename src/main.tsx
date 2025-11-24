import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Inicializar MSW para desarrollo y producción (Vercel)
async function initializeApp() {
  // Solo iniciar MSW si no está en producción o si está explícitamente habilitado
  const enableMocks =
    import.meta.env.DEV ||
    import.meta.env.VITE_ENABLE_MOCKS === 'true' ||
    typeof window !== 'undefined';

  if (enableMocks) {
    try {
      const { worker } = await import('./infrastructure/mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
    } catch (error) {
      console.error('MSW failed to start:', error);
      // Continuar inicialización de la app incluso si MSW falla
    }
  }

  // Renderizar la app después de que MSW esté listo
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Iniciar la app
initializeApp();
