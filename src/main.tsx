import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize MSW for development and production (Vercel)
async function initializeApp() {
  // Only start MSW if not in production or if explicitly enabled
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
      // Continue app initialization even if MSW fails
    }
  }

  // Render the app after MSW is ready
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Start the app
initializeApp();
