import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Iniciar MSW en desarrollo
if (import.meta.env.DEV) {
  const { worker } = await import('./infrastructure/mocks/browser');
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
