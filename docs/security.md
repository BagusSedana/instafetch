# InstaFetch — Security & Abuse Controls

## 1. Input Validation & Canonicalization
- **Strict Allowlist**: URLs must match `^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[a-zA-Z0-9_-]+\/?$`.
- **Query Stripping**: Any query parameters (such as `igsh`, `utm_source`, etc.) and URL fragments are eliminated before validation and processing.
- **SSRF Prevention**: Arbitrary external domains, loopback/localhost (`127.0.0.1`, `::1`), link-local, private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), and cloud metadata services (`169.254.169.254`) are rejected immediately before any network request can occur.
- **Dual Validation**: Validation occurs on the client for immediate UI feedback and on the server as the authoritative gatekeeper.

---

## 2. Rate Limiting & Resource Quotas
- **IP-Based Throttling**: Default rate limit is 10 inspection requests per hour per IP address.
- **Concurrency Limiting**: Max 2 concurrent inspection tasks per client IP to prevent serverless execution storms and resource exhaustion.
- **Response**: Returns HTTP 429 with standard `Retry-After` header.
- **Payload Caps**: Max media download size clamped to 100 MB (`MAX_MEDIA_BYTES`). Max carousel items capped to 10. Execution timeout clamped to 45 seconds.

---

## 3. Subprocess Execution Guardrails
- **No Shell Execution**: Subprocesses are spawned using discrete argument lists (`argv`), never via shell interpolation (`shell=True`).
- **Extractor Isolation**: Untrusted configuration files, plugins, and custom extractor scripts are disabled.
- **No Credential Harvesting**: Never accepts or stores Instagram usernames, passwords, cookies, or session tokens.
- **Graceful Termination**: Subprocesses are bounded by strict timeouts and killed if they exceed execution duration.

---

## 4. Storage & Asset Hygiene
- **Vercel Blob Isolation**: Stored media assets use cryptographically unguessable UUID filenames.
- **Short TTL**: Media expires after 30 minutes (`MEDIA_TTL_MINUTES=30`).
- **Automated Deletion**: Scheduled cleanup via Vercel Cron or explicit expiration headers.
- **No Media Directory Listing**: No search indexing, listing, or public directory traversal.
- **Private Fallback**: Sensitive local user files are processed purely in-browser and never uploaded to servers.

---

## 5. HTTP Security Headers
- `Content-Security-Policy`: Restricts scripts, frames, and connections to verified origins.
- `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing.
- `X-Frame-Options: DENY`: Protects against clickjacking.
- `Referrer-Policy: strict-origin-when-cross-origin`: Minimizes referrer leakage.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`: Disables unused hardware access.
