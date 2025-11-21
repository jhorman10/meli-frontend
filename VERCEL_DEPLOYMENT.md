# Deployment Guide - Vercel

## Overview

Este proyecto está configurado para ser desplegado en Vercel con soporte para Mock Service Worker (MSW) en producción.

## Configuración Previa

### Variables de Entorno en Vercel

Accede a tu proyecto en Vercel y configura las siguientes variables de entorno:

#### Desarrollo (Preview)

```
VITE_ENABLE_MOCKS=true
VITE_API_URL=http://localhost:3001
```

#### Producción (Si deseas usar API real)

```
VITE_ENABLE_MOCKS=false
VITE_API_URL=https://api.mercadolibre.com
```

### Para mantener MSW en Vercel (recomendado para este proyecto)

```
VITE_ENABLE_MOCKS=true
VITE_API_URL=http://localhost:3001
```

## Deploy Steps

### 1. Conectar Repositorio

1. Ir a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en "Add New..." → "Project"
3. Seleccionar tu repositorio de GitHub
4. Click "Import"

### 2. Configurar Variables de Entorno

1. En la pantalla de importación, click en "Environment Variables"
2. Agregar las variables según tu ambiente:
   - `VITE_ENABLE_MOCKS` = `true`
   - `VITE_API_URL` = `http://localhost:3001`

### 3. Deploy

Click en "Deploy" y esperar a que se complete.

## Características de la Configuración

### ✅ Archivos de Configuración

- **vercel.json**: Configuración específica de Vercel
  - Framework: Vite
  - Build command optimizado
  - Variables de entorno predefinidas
  - Output directory: `dist`

- **.vercelignore**: Archivos a ignorar durante el build
  - Node modules optimizados
  - Archivos innecesarios excluidos
  - Reduce tamaño del build

### ✅ MSW en Producción

El proyecto detecta automáticamente cuándo activar MSW:

```typescript
const enableMocks =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'true';
```

Esto permite:

- MSW activo en desarrollo local
- MSW activo en preview de Vercel
- Posibilidad de desactivar para API real

### ✅ Service Worker

El archivo `public/mockServiceWorker.js` se incluye automáticamente en el build.

## Testing en Local

### Simular Vercel Localmente

```bash
# Build del proyecto
npm run build

# Preview del build
npm run preview
```

Esto sirve para probar que todo funciona como en Vercel.

## Monitoreo

### Logs en Vercel

```bash
# Ver logs en tiempo real
vercel logs

# Ver logs del proyecto
vercel logs <proyecto-name>
```

## Troubleshooting

### MSW no funciona en Vercel

1. Verifica que `VITE_ENABLE_MOCKS=true` está configurada en Vercel
2. Revisa los logs: `vercel logs`
3. Asegúrate que `mockServiceWorker.js` está en `public/`
4. Limpia cache y redeploya

### Build falla

1. Verifica que todas las variables de entorno están configuradas
2. Revisa el build log en Vercel dashboard
3. Intenta: `npm run build` localmente

### Performance

El proyecto está optimizado para Vercel:

- Build rápido con Vite
- Sourcemaps desactivados en producción
- Archivos innecesarios ignorados

## Integración Continua

Cada push a `main` (o tu rama predefinida) dispara un deploy automático en Vercel.

### Preview Deployments

Cada Pull Request genera una preview en: `https://<proyecto>-<hash>.vercel.app`

## Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/guides/nextjs-www-vercel-com)
- [MSW Documentation](https://mswjs.io/)
