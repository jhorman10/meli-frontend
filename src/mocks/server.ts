import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Configura el servidor MSW para tests
export const server = setupServer(...handlers);
