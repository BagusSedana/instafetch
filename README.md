# InstaFetch — Vercel-First Instagram Media Utility

> **A fast, tasteful, and privacy-first web platform for creators to inspect and download their own Instagram Reels, photos, and carousels when retrieval is accessible and permitted.**

---

## 1. Feature Matrix & Operational Status

| Feature | Status | Details |
|---|---|---|
| **URL Parser & Sanitizer** | ✅ **Active** | Strict allowlist: `https://(www.)instagram.com/(reel|p)/{shortcode}/`. Strips tracking queries (`?igsh=...`, `?utm_source=...`). Rejects private/homograph domains, credentials, and custom ports. |
| **Rights Confirmation** | ✅ **Active** | Explicit user declaration requiring confirmation of ownership/permission before any inspection is executed. |
| **Local File Tool (Fallback)** | ✅ **Active** | 100% client-side file inspection and re-download tool (images and videos). Zero network calls or external data transfer. |
| **Dark / Light Theme** | ✅ **Active** | System default with accessible toggle button; contrast-safe tokens (`#6D5EF9` violet, `#3DD9A1` mint). |
| **Reels Extraction** | 🟡 **Feature-Gated** | Permitted `yt-dlp` adapter. Default `EXTRACTOR_ENABLED=false` for compliance. |
| **Photo / Carousel Extraction** | 🟡 **Feature-Gated** | Permitted `gallery-dl` adapter. Preserves original sequence and metadata. Default `EXTRACTOR_ENABLED=false`. |
| **Multi-Select & Bulk Download**| ✅ **Active** | Multi-select checkboxes for carousel items and one-click bulk download. |
| **Ephemeral Storage (Blob)** | 🟡 **Cloud-Configured** | Transient storage via Vercel Blob with 30-minute TTL and automated cleanup. |
| **Informational Pages** | ✅ **Active** | Dedicated, accessible pages for Reels, Photos, Carousel, How It Works, FAQ, Privacy, Terms, Copyright, and Contact. |

---

## 2. Platform Realities & Non-Affiliation

1. **Non-Affiliation**: InstaFetch is an independent project with **zero affiliation, sponsorship, or endorsement from Meta Platforms, Inc. or Instagram**.
2. **Access Restrictions**: Instagram restricts automated cloud access and datacenter IPs. When access is denied or restricted, InstaFetch **never** bypasses protections, uses proxy rotation, or fakes successful downloads. Instead, it informs the user truthfully and presents the browser-local media tool.
3. **No Credential Harvesting**: InstaFetch never requests or stores Instagram usernames, passwords, or session cookies.

---

## 3. Project Structure

```text
ProjectAI/
├── apps/
│   ├── web/                     # Next.js App Router Frontend
│   │   ├── src/
│   │   │   ├── app/             # All static & dynamic routes
│   │   │   ├── components/      # UI, Layout, Downloader, Landing components
│   │   │   ├── hooks/           # useDownloader, useLocalMedia
│   │   │   ├── lib/             # validation, api client, format, constants
│   │   │   └── types/           # Strict TypeScript contracts
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── api/                     # FastAPI Backend (Vercel Service)
│       ├── main.py              # Application entrypoint with /api routes
│       ├── app/
│       │   ├── core/            # config, security, rate_limit, logging
│       │   ├── routes/          # inspect, health, jobs
│       │   ├── schemas/         # Pydantic request/response/error models
│       │   └── services/        # instagram validation, adapters, storage, archive
│       ├── tests/               # Unit, integration, and security test suites
│       ├── pyproject.toml
│       ├── requirements.txt
│       └── .python-version
├── docs/                        # Complete technical documentation suite
│   ├── product.md
│   ├── ui-ux.md
│   ├── api-contract.md
│   ├── security.md
│   ├── threat-model.md
│   ├── instagram-restrictions.md
│   ├── vercel-deployment.md
│   ├── vercel-limits.md
│   └── test-results.md
├── .github/workflows/ci.yml     # Automated CI pipeline
├── vercel.json                  # Vercel Services monorepo routing
├── .env.example
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## 4. Local Development (macOS)

### Prerequisites
- Node.js >= 20
- pnpm >= 9
- Python >= 3.11

### Step 1: Install Dependencies
```bash
# Install frontend dependencies
pnpm install

# Setup Python virtual environment for backend
python3 -m venv apps/api/.venv
source apps/api/.venv/bin/activate
pip install -r apps/api/requirements.txt
```

### Step 2: Run Development Servers
Open two terminal windows:

```bash
# Terminal 1: Next.js Frontend (http://localhost:3000)
pnpm --filter web dev

# Terminal 2: FastAPI Backend (http://localhost:8000)
source apps/api/.venv/bin/activate
uvicorn apps.api.main:app --reload --port 8000
```

---

## 5. Running Automated Tests

### Web Frontend Unit & Component Tests
```bash
pnpm --filter web test
pnpm --filter web typecheck
pnpm --filter web build
```

### API Backend Unit, Integration & Security Tests
```bash
apps/api/.venv/bin/pytest apps/api/tests
```

---

## 6. Vercel Production Deployment

### Monorepo Vercel Services Setup
1. Push repository to GitHub.
2. In Vercel, select **Add New... > Project** and import the repository.
3. If using **Vercel Services**, Vercel detects `vercel.json` and provisions:
   - `web`: `apps/web/` (Next.js)
   - `api`: `apps/api/` (FastAPI)
4. In **Project Settings -> Environment Variables**, configure:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`
   - `EXTRACTOR_ENABLED`: `false` (default)
   - `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob access token
   - `MAX_MEDIA_BYTES`: `104857600` (100 MB)
   - `MEDIA_TTL_MINUTES`: `30`
   - `RATE_LIMIT_PER_HOUR`: `10`
5. Click **Deploy**.

---

## 7. Operational Runbook

### How to Toggle Live Instagram Extraction
- In your Vercel Dashboard, go to **Settings > Environment Variables**.
- Set `EXTRACTOR_ENABLED=true` (requires creator authorization and compliance verification).
- Trigger a redeployment.
- If upstream platform blocking occurs, immediately set `EXTRACTOR_ENABLED=false` to revert to safe graceful mode.

### How to Rotate Vercel Blob Tokens
- Under Vercel **Storage > Blob**, generate a new token.
- Update `BLOB_READ_WRITE_TOKEN` in Environment Variables.
- Revoke old token.

### Asset Expiration and Quota Management
- Assets expire logically after 30 minutes.
- Automated cleanup can be triggered via cron job calling `perform_scheduled_cleanup()`.
- Maximum media size is hard-clamped to 100 MB per asset to prevent runaway bandwidth.
