import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configura el service worker para el navegador
export const worker = setupWorker(...handlers);

// Exportar función para verificar estado
export const isWorkerReady = () => {
  return navigator.serviceWorker?.controller?.state === 'activated';
};
