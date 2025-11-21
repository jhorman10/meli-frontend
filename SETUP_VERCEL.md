# 🚀 Proyecto Listo para Vercel

## Resumen de Configuración

Tu proyecto **meli-frontend** ha sido completamente configurado para despliegue en Vercel con soporte total para Mock Service Worker (MSW) en producción.

---

## 📋 Cambios Realizados

### Archivos de Configuración Creados

1. **vercel.json**
   - Configuración específica de Vercel
   - Define framework (Vite), build command, y variables de entorno
   - Incluye output directory: `dist`

2. **.vercelignore**
   - Excluye archivos innecesarios del build
   - Reduce tamaño y tiempo de deployment

3. **.github/workflows/build.yml**
   - CI/CD pipeline con GitHub Actions
   - Valida build en Node 18 y 20
   - Ejecuta linting y tests

### Archivos Modificados

1. **src/main.tsx**

   ```typescript
   // MSW se activa si:
   // - Es desarrollo (import.meta.env.DEV)
   // - O si VITE_ENABLE_MOCKS=true
   const enableMocks =
     import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'true';
   ```

2. **.env.example**

   ```
   VITE_ENABLE_MOCKS=true    # Controla si MSW está activo en producción
   VITE_API_URL=http://localhost:3001
   ```

3. **package.json**
   - MSW movido de devDependencies a dependencies
   - Necesario para que funcione en Vercel

4. **vite.config.ts**
   - Configuración de build optimizada
   - PublicDir explícitamente configurado

5. **README.md**
   - Sección de deployment agregada
   - Guía de variables de entorno

### Documentación Creada

1. **VERCEL_DEPLOYMENT.md** - Guía completa de deployment
2. **VERCEL_CHECKLIST.md** - Checklist y quick reference

---

## ✅ Verificación de Build

```
✓ Build completado sin errores
✓ mockServiceWorker.js incluido en dist/
✓ Assets optimizados:
  - JavaScript: 244.40 kB (77.23 kB gzip)
  - CSS: 214.27 kB (33.09 kB gzip)
  - HTML: 0.46 kB (0.29 kB gzip)
```

---

## 🎯 Pasos para Desplegar

### 1. Conectar a Vercel (una sola vez)

```bash
# Opción A: Mediante CLI
npm install -g vercel
vercel

# Opción B: Interfaz web
# Visita https://vercel.com/dashboard y conecta tu repo
```

### 2. Configurar Variables de Entorno

En el dashboard de Vercel, ve a Settings → Environment Variables y agrega:

```
Name: VITE_ENABLE_MOCKS
Value: true
Environments: Production, Preview, Development
```

```
Name: VITE_API_URL
Value: http://localhost:3001
Environments: Production, Preview, Development
```

### 3. Desplegar

```bash
# Hacer push automáticamente triggeriza deployment
git push origin main

# O manualmente
vercel --prod
```

### 4. Verificar

- Dashboard: https://vercel.com/dashboard
- Tu app: `https://meli-frontend-<username>.vercel.app`

---

## 🔧 Cómo Funciona MSW en Vercel

### Local (npm run dev)

```
✅ MSW Activado (porque import.meta.env.DEV = true)
→ Todas las requests van a MSW
```

### Preview Build (npm run build && npm run preview)

```
✅ MSW Activado (porque VITE_ENABLE_MOCKS=true)
→ Simula lo que verás en Vercel
```

### Vercel Production

```
✅ MSW Activado (porque VITE_ENABLE_MOCKS=true en env)
→ Todas las requests van a MSW
```

---

## 📊 Commits de Configuración

```
5bb47a6 docs: add Vercel deployment checklist
f0b760e chore: configure project for Vercel deployment with MSW support
```

---

## 🧪 Testing Local

Antes de hacer push, prueba que todo funciona como en Vercel:

```bash
# Limpiar
rm -rf dist

# Build
npm run build

# Servir el build (simula Vercel)
npm run preview

# Abre http://localhost:4173 y verifica que MSW funciona
```

---

## 📚 Documentación Disponible

- **VERCEL_CHECKLIST.md** - Quick reference y troubleshooting
- **VERCEL_DEPLOYMENT.md** - Guía completa con más detalles
- **README.md** - Información general del proyecto

---

## 🚨 Consideraciones Importantes

### MSW en Producción

- MSW está configurado para funcionar en Vercel
- Es ideal para desarrollo/testing
- Si necesitas usar API real en producción, cambia `VITE_ENABLE_MOCKS=false`

### Performance

- La configuración está optimizada para Vercel
- Sourcemaps desactivados en producción
- Build rápido con Vite

### Seguridad

- No expongas secretos en variables de entorno (Vercel los oculta)
- Las variables están disponibles en el build de Vite con prefijo `VITE_`

---

## ❓ Preguntas Frecuentes

**P: ¿MSW funcionará en Vercel?**
R: Sí, está completamente configurado. El service worker se incluye en el build y se ejecuta en el navegador.

**P: ¿Puedo cambiar a API real después?**
R: Sí, solo cambia `VITE_ENABLE_MOCKS=false` y `VITE_API_URL` a tu API real en Vercel.

**P: ¿Cuál es el tamaño del build?**
R: ~77 KB gzip (JS), muy optimizado para producción.

**P: ¿Los previews deployments funcionan igual?**
R: Sí, toda la configuración es igual en preview y producción.

---

## 🔗 Enlaces Útiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [MSW Documentation](https://mswjs.io/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**¡Tu proyecto está completamente listo para ser desplegado en Vercel! 🎉**

Para empezar, ejecuta:

```bash
git push origin main
```

Luego conecta tu repositorio en https://vercel.com y ya está todo configurado.
