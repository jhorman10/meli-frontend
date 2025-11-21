import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize MSW for development and production (Vercel)
async function initializeMSW() {
  const { worker } = await import('./infrastructure/mocks/browser');
  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorkerUrl: '/mockServiceWorker.js',
    });
  } catch (error) {
    console.error('MSW failed to start:', error);
  }
}

// Start MSW before rendering the app
if (import.meta.env.DEV || typeof window !== 'undefined') {
  initializeMSW().catch(console.error);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
