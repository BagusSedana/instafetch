# InstaFetch — API Contract & Schema Specification

All API endpoints reside under `/api` and are served by the FastAPI service (or proxied seamlessly via Vercel Services rewrites).

---

## 1. Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Lightweight service health probe. Returns status and timestamp. |
| `POST` | `/api/v1/inspect` | Inspects an Instagram URL or initiates synchronous processing. |
| `POST` | `/api/v1/jobs` | (Optional queued mode) Enqueues an asynchronous extraction job. |
| `GET` | `/api/v1/jobs/{job_id}` | (Optional queued mode) Retrieves status of a job. |
| `GET` | `/api/v1/jobs/{job_id}/assets` | (Optional queued mode) Lists verified assets for a completed job. |

---

## 2. Health Endpoint (`GET /api/health`)

### Response (200 OK)
```json
{
  "status": "healthy",
  "service": "instafetch-api",
  "timestamp": "2026-10-23T12:00:00Z",
  "extractor_enabled": false
}
```

---

## 3. Media Inspection Endpoint (`POST /api/v1/inspect`)

### Request Headers
- `Content-Type: application/json`
- `X-Forwarded-For` or client IP used for rate limiting.

### Request Body
```json
{
  "url": "https://www.instagram.com/reel/C2g7XYZ1234/",
  "rights_confirmed": true
}
```

### Validation Rules
1. `url` must be a valid string conforming to:
   - Pattern: `^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[a-zA-Z0-9_-]+\/?$`
   - Scheme must be strictly `https`.
   - Host must strictly be `instagram.com` or `www.instagram.com`.
   - Query strings and fragments are stripped.
2. `rights_confirmed` must be explicitly `true`. If `false` or missing, HTTP 400 is returned.

---

## 4. Response Schemas

### Ready Result (200 OK)
```json
{
  "request_id": "req_01h8abc",
  "status": "ready",
  "source_type": "reel",
  "assets": [
    {
      "id": "asset_01",
      "kind": "video",
      "filename": "reel_C2g7XYZ1234.mp4",
      "mime_type": "video/mp4",
      "width": 1080,
      "height": 1920,
      "duration_seconds": 15.4,
      "size_bytes": 4820194,
      "preview_url": "https://xyz.public.blob.vercel-storage.com/reel_preview.mp4",
      "download_url": "https://xyz.public.blob.vercel-storage.com/reel_C2g7XYZ1234.mp4",
      "expires_at": "2026-10-23T12:30:00Z"
    }
  ]
}
```

### Unsupported / Restricted Result (200 OK with status `unsupported`)
```json
{
  "request_id": "req_01h8abd",
  "status": "unsupported",
  "code": "UPSTREAM_RESTRICTED",
  "message": "Instagram has restricted access to this media or the extractor is disabled for compliance. We do not bypass platform restrictions."
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "request_id": "req_01h8abe",
  "code": "INVALID_URL",
  "message": "Only public Instagram Reels and Posts (p/) URLs are supported."
}
```

#### 429 Too Many Requests
```json
{
  "request_id": "req_01h8abf",
  "code": "RATE_LIMITED",
  "message": "Too many requests. Please try again later.",
  "retry_after_seconds": 360
}
```
Headers:
`Retry-After: 360`
