# InstaFetch — Test Execution & Results Report

**Execution Timestamp:** 2026-10-23T21:10:00+08:00  
**Test Environment:** macOS (Darwin arm64), Python 3.15, Node v24.21.0, Next.js 15.5.x, Vitest 2.1.x, Pytest 9.1.x.

---

## 1. Summary of Test Suites Executed

| Suite | Scope | Target | Result | Duration |
|---|---|---|---|---|
| **API Unit & Security Tests** | 20 Tests | `apps/api/tests/` | **20 Passed (100%)** | 0.67s |
| **Web Frontend Tests** | 13 Tests | `apps/web/src/test/` | **13 Passed (100%)** | 0.73s |
| **TypeScript Typecheck** | Strict Mode | `apps/web/` | **0 Errors (Passed)** | 2.8s |
| **Next.js Production Build** | Static Generation | `apps/web/` | **Compiled & Built** | 8.5s |

---

## 2. API Backend Verification (`pytest apps/api/tests`)

**Command:**
```bash
apps/api/.venv/bin/pytest apps/api/tests
```

**Output:**
```text
============================= test session starts ==============================
platform darwin -- Python 3.15.0, pytest-9.1.1, pluggy-1.7.0
rootdir: /Volumes/Phone SSD/AI Motion/ProjectAI/apps/api
configfile: pyproject.toml
plugins: anyio-4.15.1, asyncio-1.4.0
collected 20 items

apps/api/tests/integration/test_health_and_inspect.py ....               [ 20%]
apps/api/tests/security/test_ssrf_and_attacks.py ...                     [ 35%]
apps/api/tests/unit/test_archive.py ...                                  [ 50%]
apps/api/tests/unit/test_rate_limit.py ..                                [ 60%]
apps/api/tests/unit/test_url_validation.py ........                      [100%]

============================== 20 passed in 0.67s ==============================
```

### Verified Scenarios:
1. `test_health_endpoint`: Verified `/api/health` returns HTTP 200, status `healthy`, and `extractorEnabled: false`.
2. `test_inspect_missing_rights_rejected`: Verified HTTP 400 with `RIGHTS_REQUIRED` envelope when `rights_confirmed` is omitted or false.
3. `test_inspect_invalid_url_rejected`: Verified HTTP 400 with `INVALID_URL` for malicious domains.
4. `test_inspect_disabled_extractor_returns_truthful_unsupported`: Verified that when extractor is disabled (default), status `unsupported` and `UPSTREAM_RESTRICTED` are returned truthfully without fake promises.
5. `test_ssrf_cloud_metadata_blocked`: Verified direct blocking of AWS/GCP cloud metadata IP (`169.254.169.254`).
6. `test_ssrf_localhost_blocked`: Verified blocking of loopback addresses (`127.0.0.1:8000`).
7. `test_security_headers_present`: Verified `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy`.
8. `test_create_safe_zip_sanitizes_paths`: Verified directory traversal prevention (`../../etc/passwd` sanitized to `passwd`).
9. `test_rate_limiter_concurrency`: Verified IP throttling blocks requests exceeding 2 concurrent jobs or hourly limits.

---

## 3. Web Frontend Verification (`pnpm --filter web test`)

**Command:**
```bash
pnpm --filter web test
```

**Output:**
```text
 RUN  v2.1.9 /Volumes/Phone SSD/AI Motion/ProjectAI/apps/web

 ✓ src/test/validation.test.ts (8)
 ✓ src/test/format.test.ts (2)
 ✓ src/test/downloader.test.tsx (3)

 Test Files  3 passed (3)
      Tests  13 passed (13)
   Duration  728ms
```

### Verified Scenarios:
1. `validateInstagramUrl`: Tested canonical `/reel/` and `/p/` links, stripped tracking queries (`?igsh=...`), rejected non-https protocols, rejected embedded credentials (`user:pass@`), and rejected custom ports.
2. `DownloaderForm`: Verified UI rendering, initial checkbox state, paste integration, requirement of rights confirmation before submission, and switching to the local device fallback.
3. `formatBytes` & `formatDuration`: Validated formatting across edge-case boundaries.

---

## 4. Production Build Verification (`next build`)

All static pages generated:
- `/` (Home)
- `/reels`
- `/photos`
- `/carousel`
- `/how-it-works`
- `/faq`
- `/privacy`
- `/terms`
- `/copyright`
- `/contact`
- `/robots.txt`
- `/sitemap.xml`
