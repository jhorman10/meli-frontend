# 🚀 Vercel Serverless Functions

Este directorio contiene las funciones serverless que se ejecutan en Vercel para servir los datos de la API en producción.

## 📁 Estructura

```
api/
├── items/
│   ├── index.ts      # GET /api/items?q=search
│   └── [id].ts       # GET /api/items/:id
└── tsconfig.json     # Configuración TypeScript
```

## 🔌 Endpoints Disponibles

### 1. Búsqueda de Productos

```
GET /api/items?q={query}&limit={limit}&offset={offset}
```

**Ejemplo:**

```bash
curl "https://tu-app.vercel.app/api/items?q=iphone&limit=10&offset=0"
```

**Respuesta:**

```json
{
  "query": "iphone",
  "paging": {
    "total": 1500,
    "offset": 0,
    "limit": 10
  },
  "results": [
    {
      "id": "MLA123456789",
      "title": "Apple iPhone 13 (128 GB) - Medianoche",
      "price": 1367999,
      "currency_id": "ARS",
      ...
    }
  ]
}
```

### 2. Detalle de Producto

```
GET /api/items/:id
```

**Ejemplo:**

```bash
curl "https://tu-app.vercel.app/api/items/MLA123456789"
```

**Respuesta:**

```json
{
  "id": "MLA123456789",
  "title": "Apple iPhone 13 (128 GB) - Medianoche",
  "price": 1367999,
  "original_price": 1500000,
  "pictures": [...],
  "description": {...},
  ...
}
```

## 🔧 Cómo Funciona

1. **Detección Automática**: Vercel detecta automáticamente los archivos `.ts` en la carpeta `/api`
2. **Compilación**: TypeScript se compila automáticamente durante el deploy
3. **Ejecución**: Cada request crea una nueva ejecución serverless (cold start o warm)
4. **CORS**: Los headers CORS están configurados para permitir requests desde cualquier origen

## 💾 Datos Simulados

Actualmente, los datos están hardcodeados en las funciones:

- `index.ts` → Array de productos para búsqueda
- `[id].ts` → Objeto de productos por ID

### Agregar Más Productos

Edita `[id].ts` y agrega más objetos al diccionario:

```typescript
const products: Record<string, any> = {
  MLA123456789: { ... },
  MLA987654321: { ... },
  // Agrega más aquí
  MLA_NUEVO_ID: {
    id: 'MLA_NUEVO_ID',
    title: 'Nuevo Producto',
    ...
  }
};
```

## 🧪 Testing Local

### Opción 1: Usando Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Ejecutar servidor local con serverless functions
vercel dev

# Prueba en navegador
open http://localhost:3000/api/items?q=iphone
```

### Opción 2: Mock en Desarrollo

```bash
# Usar MSW en desarrollo local
# En .env.local
VITE_ENABLE_MOCKS=true
VITE_API_URL=http://localhost:3001

yarn dev
```

## 📊 Límites y Performance

| Aspecto                   | Valor                           |
| ------------------------- | ------------------------------- |
| **Timeout**               | 10 segundos (Hobby) / 60s (Pro) |
| **Memory**                | 1024 MB (Hobby) / 3008 MB (Pro) |
| **Concurrent Executions** | 1000 (Hobby) / Ilimitado (Pro)  |
| **Cold Start**            | ~200-500ms primera request      |
| **Warm Start**            | ~50-100ms requests siguientes   |

## 🔐 Seguridad

### CORS

```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
```

⚠️ En producción real, reemplaza `*` con tu dominio específico.

### Rate Limiting

No implementado. En producción real, considera agregar:

- Vercel Edge Config
- Upstash Redis
- API Gateway

## 🚀 Deploy

Las funciones se despliegan automáticamente cuando:

1. Haces push a la rama conectada en Vercel
2. Vercel ejecuta el build
3. Detecta `/api` y crea las serverless functions

## 📚 Referencias

- [Vercel Serverless Functions Docs](https://vercel.com/docs/functions)
- [API Routes con TypeScript](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Dynamic Routes](https://vercel.com/docs/functions/serverless-functions/dynamic-routes)
