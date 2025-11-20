import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Configura el service worker para el navegador
export const worker = setupWorker(...handlers);
