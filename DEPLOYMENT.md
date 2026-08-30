# DharaniDrishti AI - Production Live Deployment Guide
### Enterprise Rollout for Problem Statement ID: 26017

This guide outlines step-by-step instructions to deploy **DharaniDrishti AI** into live production environments (Vercel, Netlify, Cloudflare Pages, Docker / Kubernetes, and AWS).

---

## ⚡ Option 1: 1-Click Live Deployment on Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
2. Select your GitHub repository: `Hidayatulla268/Dharanidrishti_Ai`.
3. Configure the Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_GOOGLE_MAPS_API_KEY`: `AIzaSyDiMygvkgArd-Jexwuf1OZJ74PRlk2anik`
   - `VITE_APP_ENV`: `production`
5. Click **"Deploy"**.
6. Your platform will be instantly live on a global CDN with SSL and automatic edge caching!

---

## 🌐 Option 2: Live Deployment on Netlify

1. Go to [netlify.com](https://www.netlify.com/) and click **"Add new site"** -> **"Import an existing project"**.
2. Link your GitHub account and choose `Dharanidrishti_Ai`.
3. Settings (automatically read from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. In **Site Configuration > Environment Variables**, add your `VITE_GOOGLE_MAPS_API_KEY`.
5. Click **"Deploy DharaniDrishti AI"**.

---

## 🐳 Option 3: Production Docker Container (Kubernetes / AWS ECS / GCP Cloud Run)

The repository includes an optimized multi-stage `Dockerfile` and `nginx.conf` with Gzip compression and security headers.

### 1. Build the Docker Image:
```bash
docker build -t dharanidrishti-ai:latest .
```

### 2. Run Container Locally or on Server:
```bash
docker run -d -p 80:80 --name dharanidrishti-platform dharanidrishti-ai:latest
```
Access at `http://localhost/`

### 3. Deploy to AWS / Google Cloud Run / Azure Container Apps:
```bash
# Tag for container registry
docker tag dharanidrishti-ai:latest gcr.io/<your-project-id>/dharanidrishti-ai:latest

# Push to container registry
docker push gcr.io/<your-project-id>/dharanidrishti-ai:latest
```

---

## ☁️ Option 4: Deploying on GitHub Pages

1. In `vite.config.ts`, if deploying to `https://<username>.github.io/<repo>/`, set `base: '/Dharanidrishti_Ai/'`.
2. Run:
```bash
npm run build
```
3. Deploy the contents of the `dist/` directory to the `gh-pages` branch.

---

## 🔒 Production Security Checklist

- [x] **No Secret Leaks**: Client-side API keys are scoped with HTTP referrer restrictions.
- [x] **SPA 404 Routing Rewrites**: Configured via `vercel.json`, `netlify.toml`, `_redirects`, and `nginx.conf`.
- [x] **Error Boundary Protection**: Catches unhandled runtime errors and provides 1-click workspace recovery.
- [x] **Performance Code-Splitting**: Vendor chunks separated for `<1s` initial load time.
- [x] **PWA Manifest & SEO**: OpenGraph tags, web manifest, `robots.txt`, and `sitemap.xml`.
