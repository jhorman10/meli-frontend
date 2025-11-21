# Vercel Deployment Checklist ✅

## Configuración Completada

El proyecto ha sido configurado completamente para despliegue en Vercel con soporte completo para MSW.

### ✅ Archivos Creados/Modificados

- **vercel.json** - Configuración específica de Vercel
- **.vercelignore** - Archivos a excluir del build
- **VERCEL_DEPLOYMENT.md** - Guía detallada de deployment
- **.github/workflows/build.yml** - CI/CD con GitHub Actions
- **src/main.tsx** - MSW inicializa con variable de entorno
- **.env.example** - Incluye VITE_ENABLE_MOCKS
- **package.json** - MSW movido a dependencies
- **vite.config.ts** - Configuración de build optimizada
- **README.md** - Sección de deployment agregada

### ✅ Build Verificado

```
✓ Build completado sin errores
✓ mockServiceWorker.js incluido en dist/
✓ Tamaño optimizado (gzip: 77.23 kB JS, 33.09 kB CSS)
```

## Próximos Pasos

### 1. Conectar a Vercel

```bash
# Opción A: CLI de Vercel
npm i -g vercel
vercel

# Opción B: Interfaz web
# Ir a https://vercel.com y conectar tu repositorio
```

### 2. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, agregar:

**Para Preview (desarrollo) y Production:**

```
VITE_ENABLE_MOCKS=true
VITE_API_URL=http://localhost:3001
```

**Alternativa: Para usar API real en producción:**

```
VITE_ENABLE_MOCKS=false
VITE_API_URL=https://api.mercadolibre.com
```

### 3. Hacer Push a Main

```bash
git push origin main
```

El deploy se activará automáticamente.

### 4. Verificar Deployment

- Dashboard: https://vercel.com/dashboard
- Tu proyecto URL: `https://meli-frontend-<username>.vercel.app`
- Preview deployments: Automáticos en cada PR

## Características de la Configuración

### MSW en Producción

MSW se habilita automáticamente basado en:

```typescript
const enableMocks =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'true';
```

Esto permite:

- ✅ MSW activo en `npm run dev` (local)
- ✅ MSW activo en `npm run build && npm run preview` (simulación Vercel)
- ✅ MSW activo en Vercel preview deployments
- ✅ MSW activo en Vercel production (si VITE_ENABLE_MOCKS=true)
- ❌ MSW inactivo si VITE_ENABLE_MOCKS=false y NODE_ENV=production

### Optimization

El build está optimizado para Vercel:

- Framework automáticamente detectado: Vite
- Sourcemaps desactivados en producción
- Archivos innecesarios ignorados (.github, .env, etc)
- Node_modules optimizados

### CI/CD

GitHub Actions workflow incluido:

- Ejecuta en cada push a main y PRs
- Valida build con Node 18 y 20
- Ejecuta linting
- Ejecuta tests
- Genera artifacts

## Testing Local

Simula el ambiente de Vercel:

```bash
# Limpiar build anterior
rm -rf dist

# Hacer build
npm run build

# Servir el build
npm run preview
```

Visita http://localhost:4173 y verifica que MSW funciona.

## Troubleshooting

| Problema                       | Solución                                               |
| ------------------------------ | ------------------------------------------------------ |
| MSW no funciona en Vercel      | Verifica que `VITE_ENABLE_MOCKS=true` está configurada |
| Build falla                    | Revisa los logs: `vercel logs <proyecto>`              |
| Service Worker issues          | Limpia cache y redeploya: `vercel redeploy`            |
| Variables de env no se aplican | Redeploya después de configurarlas: `vercel redeploy`  |

## Recursos

- 📖 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Guía completa
- 🔗 [Vercel Dashboard](https://vercel.com/dashboard)
- 📚 [Vercel Docs](https://vercel.com/docs)
- 🛠️ [MSW Docs](https://mswjs.io/)

## Información Útil

- **Branch principal:** main
- **Build command:** `npm run build`
- **Output directory:** dist
- **Node version:** 18.x compatible (recomendado 20.x)

---

**¡Tu proyecto está listo para Vercel!** 🚀
