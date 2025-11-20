import { http, HttpResponse } from "msw";

export const handlers = [
  // Ejemplo de handler - GET /api/user
  http.get("/api/user", () => {
    return HttpResponse.json({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    });
  }),

  // Aquí puedes agregar más handlers para tus endpoints
];
