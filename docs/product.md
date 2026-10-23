# InstaFetch — Product Specification

## 1. Product Vision & Principles

**InstaFetch** is an understated, premium utility platform designed for creators and individuals who need to retrieve and archive their own Instagram media (Reels, single photos, and carousel albums) when retrieval is permitted and accessible.

### Core Promises
1. **Zero Deception**: Never claim to bypass access controls, private profiles, or Instagram anti-bot measures. Never present mock/fake downloads as successful Instagram extraction.
2. **Local First / Universal Fallback**: Even when Instagram extraction is disabled or restricted, provide a fully client-side inspection and re-download workflow for local media files on the user's device.
3. **Privacy by Design**: No user accounts, no passwords, no Instagram cookies collected, no permanent server storage, no search index of user requests, and short TTL (30 minutes) on temporary assets with automated cleanup.
4. **Honest System State**: Transparent state progression (`idle` -> `validating` -> `fetching` -> `analyzing` -> `processing` -> `ready` | `unsupported` | `failed`). No simulated progress bars.

---

## 2. Feature Matrix

| Feature | Status | Details |
|---|---|---|
| **URL Input & Validation** | Active | Strict allowlist: `www.instagram.com/reel/{shortcode}/` and `/p/{shortcode}/`. Strips tracking queries (`?igsh=...`, `?utm_source=...`). Rejects private, homograph, and non-canonical hosts. |
| **Rights Confirmation** | Active | Explicit user declaration requiring confirmation of ownership or explicit permission prior to inspection. |
| **Clipboard Paste** | Active | One-click paste using Browser Clipboard API with graceful fallback to manual entry on permission denial. |
| **Reels Extraction** | Toggle (`EXTRACTOR_ENABLED`) | Uses safe `yt-dlp` adapter invocation with timeouts and resource clamps. Defaults to `false` until verified. |
| **Photos Extraction** | Toggle (`EXTRACTOR_ENABLED`) | Uses safe `gallery-dl` adapter invocation. Defaults to `false`. |
| **Carousel Extraction** | Toggle (`EXTRACTOR_ENABLED`) | Preserves original sequence; displays count and individual media cards. |
| **Local Device Fallback** | Active | 100% client-side file picker (images/videos) with instant local preview, metadata calculation, and re-download without server transfer. |
| **Dark / Light Theme** | Active | System default with explicit toggle; contrast-safe palette tokens `#6D5EF9` (violet) and `#3DD9A1` (mint). |
| **Multi-Select & Bulk ZIP** | Bounded | Download selected assets; ZIP generation guarded by resource limits. |
| **Informational Pages** | Active | Dedicated accessible pages for Reels, Photos, Carousel, How It Works, FAQ, Privacy, Terms, Copyright, and Contact. |

---

## 3. User Journeys

### Journey A: Public Media Retrieval (Extractor Permitted)
1. User navigates to homepage or specific media route (`/reels`, `/photos`, `/carousel`).
2. User inputs or pastes an authorized URL.
3. User checks the rights confirmation box.
4. User clicks **Check media**.
5. Client performs preliminary validation and issues `POST /api/v1/inspect`.
6. Server validates URL, enforces rate limits, invokes adapter within limits, saves to transient storage, and returns metadata with expiring URLs.
7. User views real media preview and clicks **Download**.

### Journey B: Local File Inspection & Re-download (Fallback)
1. When Instagram access is restricted or offline, user switches to the local device tab.
2. User selects an image or video file from their device.
3. The browser creates an object URL, computes client-side file size and dimensions.
4. User previews their file and triggers a direct browser download.
5. Zero server requests or external bandwidth consumed.
