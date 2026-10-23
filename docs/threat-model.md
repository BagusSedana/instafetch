# InstaFetch — Threat Model

This document outlines the security architecture, threat actors, assets, trust boundaries, abuse pathways, and mitigations for **InstaFetch** deployed on **Vercel**.

---

## 1. Assets & Trust Boundaries

### Protected Assets
1. **Compute Resources**: Vercel Serverless Function invocations, memory, CPU quotas, and timeout ceilings.
2. **Storage Resources**: Vercel Blob storage capacity and bandwidth egress.
3. **User Data**: Privacy of client IP addresses and user intent.
4. **Platform Integrity**: Non-affiliation status with Meta / Instagram, avoiding abuse detection and domain blocks.

### Trust Boundaries
```
[ Untrusted Client / Internet ]
              │ (HTTPS)
       [ Edge Firewall / CSP ]
              │
  [ Next.js Frontend / Vercel Edge ]
              │ (Rewrite /api/*)
  [ FastAPI Serverless Service ]
        │                  │
 (Strict Allowlist)   (UUID Upload)
        ▼                  ▼
[ Permitted Upstream ]  [ Vercel Blob (Expiring) ]
```

---

## 2. Threat Actors & Threat Scenarios

| Threat Actor | Motivation | Attack Vector |
|---|---|---|
| **Malicious Bot / Scraper** | Abuse service as open media proxy | Submit mass non-Instagram or arbitrary internal URLs (SSRF) |
| **Abusive User** | Exhaust compute / trigger bandwidth bills | Repeated oversized video queries, concurrency flooding |
| **Tampering Attacker** | Remote Code Execution (RCE) via toolchains | Shell injection via manipulated shortcodes or parameters |
| **Eavesdropper** | Intercept user media | Probe sequential storage URLs or public directory endpoints |

---

## 3. Threat Analysis & Mitigations

### 3.1 Server-Side Request Forgery (SSRF)
- **Risk**: An attacker submits URLs targeting cloud metadata (`http://169.254.169.254`), internal cluster addresses (`http://localhost`, `http://10.x.x.x`), or arbitrary third-party servers.
- **Mitigation**:
  - Authoritative regex parser enforcing scheme `https` and domain `(www.)?instagram.com`.
  - Disallow IP literals, port numbers, basic auth `@` credentials, and non-canonical redirects.
  - Reject all non-conforming requests prior to any socket creation or subprocess invocation.

### 3.2 Denial of Service / Cost Exhaustion
- **Risk**: Attackers flood the API with heavy video extraction jobs to exhaust Vercel Function compute limits and Blob storage quotas.
- **Mitigation**:
  - Strict IP rate limiting (10 requests/hour/IP).
  - Concurrency clamp (max 2 active extractions per IP).
  - Maximum media byte threshold (`MAX_MEDIA_BYTES = 100MB`).
  - Maximum carousel item limit (10 items).
  - Subprocess timeout bounded at 45 seconds.

### 3.3 Remote Code Execution (RCE) & Subprocess Vulnerabilities
- **Risk**: Vulnerabilities in extractor tools (e.g. `yt-dlp` or `gallery-dl`) exploited via malicious shortcodes or headers.
- **Mitigation**:
  - `subprocess.run` called with strict `list` arguments (`argv`), never `shell=True`.
  - Stripping of custom configurations, extensions, and external configuration files (`--no-config`, `--no-plugins`).
  - Shortcode validation ensuring only alphanumeric characters, underscores, and hyphens.

### 3.4 Storage Exposure & Privacy Leakage
- **Risk**: Media files left exposed or guessable in object storage.
- **Mitigation**:
  - Non-sequential, unguessable cryptographic UUID paths.
  - Strict 30-minute Time-To-Live (TTL).
  - No public search indices or listing endpoints.
  - Zero server logging of full media URLs or personal identities.

---

## 4. Residual Risks & Operational Posture
- **Upstream Platform Blocks**: Instagram frequently changes anti-bot challenges and restricts unauthenticated requests. If access is blocked, InstaFetch gracefully returns `UPSTREAM_RESTRICTED` and guides users to the local device fallback tool.
