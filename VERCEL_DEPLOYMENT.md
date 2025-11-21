# Vercel Deployment Guide

This guide explains how to deploy the Meli Frontend application to Vercel with Mock Service Worker (MSW) enabled.

## Prerequisites

- A Vercel account (free at https://vercel.com)
- A GitHub repository with this project
- Node.js 18+ and Yarn installed locally

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository containing this project
4. Click "Import"

### 2. Configure Project Settings

Vercel should auto-detect the following settings:

- **Framework Preset**: Vite
- **Build Command**: `yarn build`
- **Output Directory**: `dist`
- **Install Command**: `yarn install`

These are already configured in `vercel.json`.

### 3. Set Environment Variables

In the Vercel Project Settings, add the following environment variables:

```
VITE_API_URL=http://localhost:3001
```

This is the default Mock API URL used by MSW. The mock data will be served from the client-side without hitting any real backend.

### 4. Deploy

1. Click "Deploy"
2. Wait for the deployment to complete
3. Visit your deployed URL

## How Mock Service Worker Works on Vercel

MSW intercepts HTTP requests on the client-side and returns mock data. This means:

- **No backend required**: The frontend works completely standalone
- **Persistent mocking**: Mock data is always available
- **Development mode**: The application runs in "development mode" even in production on Vercel

The configuration files handle this:

- **src/main.tsx**: Initializes MSW before rendering the React app
- **vercel.json**: Configures headers and rewrites for the service worker
- **public/mockServiceWorker.js**: Service Worker file that intercepts requests

## Environment Variables

| Variable       | Value                   | Description                     |
| -------------- | ----------------------- | ------------------------------- |
| `VITE_API_URL` | `http://localhost:3001` | Mock API endpoint (used by MSW) |

## Troubleshooting

### Service Worker not registering

If you see errors about the service worker not registering:

1. Check that `public/mockServiceWorker.js` is present in the build
2. Verify headers are being sent correctly in Vercel
3. Check browser DevTools > Application > Service Workers

### MSW handlers not working

If mock data is not being returned:

1. Open browser DevTools > Network tab
2. Check if requests are being intercepted (should show as `from service worker`)
3. Check console for any errors
4. Verify handlers are defined in `src/infrastructure/mocks/handlers.ts`

### Build failures

If the build fails:

1. Clear cache: Delete `.next` or `dist` folder locally
2. Try rebuilding: `yarn build`
3. Check for TypeScript errors: `yarn tsc --noEmit`

## Local Development

To test the build locally before deploying:

```bash
yarn build
yarn preview
```

This runs a local preview server with the production build.

## Production Monitoring

Monitor your deployment:

1. Visit Vercel Dashboard
2. Select your project
3. Check Deployments tab for status
4. View logs in the "Runtime Logs" section

## Redeployment

To redeploy after pushing changes:

1. Push to your main branch
2. Vercel automatically detects changes
3. Deployment starts automatically
4. Check deployment status in Vercel Dashboard

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Mock Service Worker Documentation](https://mswjs.io/)
- [React Router Documentation](https://reactrouter.com/)
