# 🚀 Vercel Deployment - Quick Start

## Configuración Completada ✅

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOYMENT READY                  │
└─────────────────────────────────────────────────────────────┘

Proyecto: meli-frontend
Build Status: ✓ PASSING
MSW Support: ✓ ENABLED
Package Size: 77 KB (gzip JS) + 33 KB (gzip CSS)
```

---

## 📋 Checklist de Deployment

### Configuración Local ✅

- ✅ MSW funciona en desarrollo (`npm run dev`)
- ✅ Build optimizado (`npm run build`)
- ✅ Preview local funciona (`npm run preview`)
- ✅ Linting pasa (`npm run lint`)
- ✅ Tests pasan (`npm run test`)

### Archivos de Configuración ✅

- ✅ `vercel.json` - Configuración Vercel
- ✅ `.vercelignore` - Exclusiones de build
- ✅ `vite.config.ts` - Build optimizado
- ✅ `package.json` - MSW en dependencies
- ✅ `.env.example` - Variables de entorno
- ✅ `.github/workflows/build.yml` - CI/CD
- ✅ `src/main.tsx` - MSW inicialización

### Documentación ✅

- ✅ `SETUP_VERCEL.md` - Guía de inicio rápido
- ✅ `VERCEL_CHECKLIST.md` - Quick reference
- ✅ `VERCEL_DEPLOYMENT.md` - Guía completa
- ✅ `README.md` - Actualizado con deployment

---

## 🚀 Deploy en 3 Pasos

### Paso 1: Verificar Git

```bash
git status
# Debe estar limpio (no hay cambios sin commitear)
git log --oneline -1
# Debe mostrar último commit
```

### Paso 2: Conectar a Vercel

```bash
# Opción A: Via CLI
npm install -g vercel
vercel

# Opción B: Web (más simple)
# Ir a https://vercel.com/dashboard
# Click "Add New Project"
# Seleccionar repositorio
```

### Paso 3: Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
VITE_ENABLE_MOCKS = true
VITE_API_URL = http://localhost:3001
```

**Listo! Ya estará desplegado** 🎉

---

## 🧪 Testing Pre-Deployment

```bash
# 1. Limpiar build anterior
rm -rf dist

# 2. Hacer build
npm run build

# 3. Servir el build (simula Vercel)
npm run preview

# 4. Abrir http://localhost:4173 en el navegador
# 5. Buscar un producto - MSW debe interceptar
```

---

## 📊 MSW Activation Flow

```
┌─────────────────────────────────────────────────┐
│ import.meta.env.DEV = true?                    │
│ ├─ YES → MSW ACTIVADO ✅                       │
│ └─ NO → Seguir...                              │
│                                                │
│ VITE_ENABLE_MOCKS = 'true'?                    │
│ ├─ YES → MSW ACTIVADO ✅                       │
│ └─ NO → MSW DESACTIVADO ❌                     │
└─────────────────────────────────────────────────┘

Local dev:        ✅ MSW Activado (DEV=true)
npm run preview:  ✅ MSW Activado (VITE_ENABLE_MOCKS=true)
Vercel preview:   ✅ MSW Activado (VITE_ENABLE_MOCKS=true)
Vercel prod:      ✅ MSW Activado (VITE_ENABLE_MOCKS=true)
```

---

## 📁 Archivos del Proyecto

```
meli-frontend/
├── vercel.json ......................... Configuración Vercel
├── .vercelignore ....................... Exclusiones de build
├── .github/
│   └── workflows/build.yml ............. CI/CD Pipeline
├── SETUP_VERCEL.md ..................... LEER PRIMERO
├── VERCEL_CHECKLIST.md ................. Quick reference
├── VERCEL_DEPLOYMENT.md ................ Guía completa
├── src/
│   ├── main.tsx ........................ MSW inicialización
│   └── ... (resto del código)
├── public/
│   └── mockServiceWorker.js ............ Service Worker (auto-incluido)
└── dist/ ............................... Build output (incluye MSW)
    ├── mockServiceWorker.js ............ ✅ Incluido en build
    ├── index.html
    ├── assets/index-*.js ............... 77 KB gzip
    └── assets/index-*.css ............. 33 KB gzip
```

---

## 🔍 Verificación Final

### Build Output

```
✓ 35 modules transformed
✓ mockServiceWorker.js (9.0 KB)
✓ HTML (0.46 KB)
✓ CSS (214.27 KB → 33.09 KB gzip)
✓ JS (244.40 KB → 77.23 KB gzip)
✓ Total: ~110 KB gzip
```

### Linting & Tests

```bash
npm run lint    # ✅ Pass
npm run test    # ✅ Pass
```

### Build

```bash
npm run build   # ✅ Success (710ms)
```

---

## 🎯 Próximos Comandos

```bash
# Ver próximos cambios
git diff

# Hacer push (triggerea deployment)
git push origin main

# Ver estado en Vercel
vercel --list-projects

# Monitorear logs
vercel logs

# Redeploy si es necesario
vercel redeploy
```

---

## 📞 Soporte

### Si algo falla:

1. **Build falla en Vercel**

   ```bash
   # Intenta localmente
   npm run build
   npm run preview
   ```

2. **MSW no funciona**
   - Verifica `VITE_ENABLE_MOCKS=true` en Vercel
   - Revisa console del navegador (F12)
   - Revisa Network tab para requests

3. **Variables de env no se aplican**
   - Espera 30 segundos después de configurar
   - Redeploya: `vercel redeploy`

---

## 📚 Documentación Disponible

- **SETUP_VERCEL.md** - START HERE ⭐
- **VERCEL_CHECKLIST.md** - Quick ref & troubleshooting
- **VERCEL_DEPLOYMENT.md** - Detailed guide
- **README.md** - Project overview

---

**¡Tu proyecto está listo! 🚀**

Próximo paso: `git push origin main`
