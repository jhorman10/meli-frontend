# 🔧 Fix: Safari/iOS Compatibility en Vercel

## 🐛 Problema Original

La aplicación no cargaba en dispositivos iOS y navegador Safari debido a que **Mock Service Worker (MSW) no es confiable en producción**, especialmente en Safari que tiene restricciones más estrictas con Service Workers.

## ✅ Solución Implementada

Se migró de MSW en producción a **Vercel Serverless Functions** que sirven los datos mockados sin depender de Service Workers.

---

## 📁 Archivos Creados

### 1. API Serverless Functions

```
api/
├── items/
│   ├── index.ts        # GET /api/items?q=search
│   └── [id].ts         # GET /api/items/:id
```

Estas funciones se ejecutan en el servidor de Vercel y no requieren Service Workers en el navegador.

### 2. Configuración Actualizada

- **`vercel.json`**:
  - ❌ Removida configuración de MSW
  - ✅ Configurado `VITE_API_URL=/api`
  - ✅ Configurado `VITE_ENABLE_MOCKS=false`

- **`main.tsx`**:
  - ✅ MSW solo se activa si `VITE_ENABLE_MOCKS=true`
  - ✅ Logs claros de desarrollo vs producción

---

## 🚀 Cómo Funciona Ahora

### **Desarrollo Local (con MSW)**

```bash
# .env.local
VITE_API_URL=http://localhost:3001
VITE_ENABLE_MOCKS=true

yarn dev
```

- ✅ MSW intercepta las llamadas
- ✅ No requiere backend real

### **Producción Vercel (sin MSW)**

```bash
# Variables de entorno en Vercel
VITE_API_URL=/api
VITE_ENABLE_MOCKS=false
```

- ✅ Llamadas van a `/api/items` → Vercel Serverless Function
- ✅ Compatible con todos los navegadores (Chrome, Safari, Firefox, iOS)
- ✅ No depende de Service Workers

---

## 📝 Pasos para Desplegar

### 1. Commit y Push de Cambios

```bash
git add .
git commit -m "fix: reemplazar MSW con Vercel serverless functions para compatibilidad iOS/Safari"
git push origin main
```

### 2. Vercel Redeploy Automático

Vercel detectará:

- ✅ Nueva carpeta `/api` → Serverless Functions
- ✅ Nuevas variables de entorno en `vercel.json`
- ✅ Build actualizado sin MSW

### 3. Verificar Despliegue

```bash
# Prueba en navegador
https://tu-app.vercel.app/

# Prueba API directamente
curl https://tu-app.vercel.app/api/items?q=iphone
```

---

## 🧪 Testing

### Test Local de Serverless Functions (Opcional)

Si tienes Vercel CLI instalado:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Ejecutar localmente con funciones serverless
vercel dev
```

Esto simula el entorno de Vercel localmente.

---

## ✅ Ventajas de Esta Solución

| Aspecto             | Antes (MSW)       | Ahora (Serverless)     |
| ------------------- | ----------------- | ---------------------- |
| **iOS/Safari**      | ❌ No funciona    | ✅ Funciona            |
| **Service Workers** | ✅ Requerido      | ❌ No requerido        |
| **Compatibilidad**  | ~85% navegadores  | ✅ 100% navegadores    |
| **Rendimiento**     | Bueno             | ✅ Mejor (server-side) |
| **Debugging**       | Difícil en Safari | ✅ Fácil (logs Vercel) |

---

## 🔍 Debugging en Vercel

Si algo falla después del deploy:

1. **Ver logs de Functions:**

   ```
   Vercel Dashboard → Project → Functions
   ```

2. **Probar endpoints directamente:**

   ```bash
   # Búsqueda
   curl https://tu-app.vercel.app/api/items?q=iphone

   # Detalle de producto
   curl https://tu-app.vercel.app/api/items/MLA123456789
   ```

3. **Verificar variables de entorno:**
   ```
   Vercel Dashboard → Settings → Environment Variables
   ```

---

## 🎯 Próximos Pasos (Opcional)

Para una implementación real de producción:

1. **Conectar a API Real de Mercado Libre:**

   ```typescript
   // En production, cambiar a:
   VITE_API_URL=https://api.mercadolibre.com/sites/MLA
   ```

2. **Agregar Base de Datos:**
   - Vercel Postgres
   - MongoDB Atlas
   - PlanetScale

3. **Cacheo:**
   ```typescript
   // En serverless functions
   res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
   ```

---

## 📚 Referencias

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Safari Service Worker Limitations](https://caniuse.com/serviceworkers)
- [MSW Best Practices](https://mswjs.io/docs/best-practices/avoid-msw-in-production)
