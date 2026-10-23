# InstaFetch — Vercel Deployment Guide

This guide walks through deploying **InstaFetch** on **Vercel** using the **Vercel Services** monorepo architecture (or dual-project fallback).

---

## 1. Prerequisites

- A GitHub repository containing the InstaFetch monorepo.
- A Vercel account (Hobby or Pro).
- Optional: A Vercel Blob store created inside your Vercel project for media asset delivery.

---

## 2. Monorepo Configuration (`vercel.json`)

InstaFetch uses the modern Vercel Services schema:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "web": {
      "root": "apps/web/",
      "framework": "nextjs"
    },
    "api": {
      "root": "apps/api/",
      "framework": "fastapi",
      "entrypoint": "main:app"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "api" } },
    { "source": "/(.*)", "destination": { "service": "web" } }
  ]
}
```

> **Note**: In Vercel Services, requests to `/api/...` are routed directly to the FastAPI service. The FastAPI application must listen on paths prefixed with `/api` (e.g. `/api/health`, `/api/v1/inspect`).

---

## 3. Deployment Steps via Vercel Dashboard

1. **Import Git Repository**:
   - Log into [Vercel](https://vercel.com) and click **Add New... > Project**.
   - Select your InstaFetch repository.

2. **Configure Services**:
   - If your account supports Vercel Services (GA / Public Beta), select **Services** as the Framework Preset.
   - Alternatively, if deploying as two projects:
     - **Project 1 (Web)**: Root Directory: `apps/web`, Framework: `Next.js`.
     - **Project 2 (API)**: Root Directory: `apps/api`, Framework: `FastAPI`. In Project 1, add a rewrite rule in `next.config.ts` directing `/api/:path*` to the Project 2 URL.

3. **Set Environment Variables**:
   In Project Settings -> Environment Variables, configure:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`
   - `EXTRACTOR_ENABLED`: `false` (set to `true` only when legal and access requirements are satisfied)
   - `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob token (from Storage tab)
   - `MAX_MEDIA_BYTES`: `104857600` (100MB)
   - `MEDIA_TTL_MINUTES`: `30`
   - `RATE_LIMIT_PER_HOUR`: `10`

4. **Deploy**:
   - Click **Deploy**. Vercel will build both services and generate your live deployment.

---

## 4. Local Development

Run the web frontend and API locally:

```bash
# Terminal 1: Next.js Frontend
pnpm --filter web dev

# Terminal 2: FastAPI Backend
source apps/api/.venv/bin/activate
uvicorn apps.api.main:app --reload --port 8000
```
