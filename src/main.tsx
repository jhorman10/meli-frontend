import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize MSW in development or when using mock API
async function initApp() {
  const enableMocks =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'true';

  if (enableMocks) {
    const { worker } = await import('./infrastructure/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'warn',
    });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

initApp().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
