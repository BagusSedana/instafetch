# InstaFetch — Vercel Platform Limits & Architecture Budget

To ensure reliable, crash-free execution, InstaFetch is engineered strictly within current Vercel runtime and infrastructure ceilings.

---

## 1. Vercel Serverless Function Limits

| Parameter | Standard Limit | InstaFetch Budget / Mitigation |
|---|---|---|
| **Max Payload Size (Request/Response)** | 4.5 MB | **Never serve raw video/audio bytes through Function response.** Media is uploaded directly to Vercel Blob, and the client receives a direct CDN download URL. |
| **Max Execution Duration** | 10s (Hobby) / 60s (Pro default) / up to 300s (Pro max) | Default inspection timeout is clamped to **45 seconds**. Subprocesses are killed if they exceed this limit. |
| **Memory Limit** | 1024 MB (default) / configurable up to 3008 MB | Media extraction uses stream piping or bounded buffers. Maximum total media extraction per post is clamped to **100 MB**. |
| **Temporary Disk (`/tmp`)** | ~500 MB (Invocation-scoped) | `/tmp` is strictly ephemeral and never used for persistent state. Files are cleared in `finally` blocks immediately after Blob upload. |
| **Background Execution** | No background work guarantees after response | All bounded operations are awaited synchronously within request lifecycle. For long tasks, Vercel Daemons / Queues are recommended. |

---

## 2. Vercel Blob Storage Constraints

- **File Delivery**: Vercel Blob provides direct edge distribution with HTTP range requests and resumable download support.
- **Access Control**: Public Blob URLs are unguessable UUIDs (`https://*.public.blob.vercel-storage.com/...`). Files carry a 30-minute logical TTL.
- **Quota & Cost Guards**:
  - `MAX_MEDIA_BYTES = 104857600` (100 MB) prevents runaway storage consumption.
  - Rate limiting caps total daily uploads per IP.
  - Automated cron job handles physical deletion of expired objects.
