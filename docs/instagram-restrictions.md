# InstaFetch — Instagram Restrictions & Platform Realities

## 1. Legal and Compliance Realities

1. **Non-Affiliation**: InstaFetch is an independent open-source tool and is not associated with, endorsed by, or affiliated with Meta Platforms, Inc. or Instagram.
2. **Authorized Content Only**: The service is explicitly designed for creators, businesses, and individuals downloading their own media or content for which they have explicit legal authorization.
3. **Terms of Service**: Automated scraping or downloading of Instagram media without explicit permission violates Instagram's Terms of Service. InstaFetch maintains `EXTRACTOR_ENABLED=false` by default to ensure administrators review local laws, platform rules, and compliance requirements before activating live network extraction.

---

## 2. Technical Limitations & Protections

| Challenge | Real-World Behavior | InstaFetch Handling |
|---|---|---|
| **Private Profiles** | Media requires active session authentication | Strictly rejected. InstaFetch will **never** request, store, or accept Instagram user credentials or cookies. |
| **Login Walls / Bot Challenges** | Instagram blocks automated IP ranges (especially datacenter/cloud IPs like Vercel/AWS) | InstaFetch detects upstream access denial and returns HTTP 200 with `status: "unsupported"` and code `UPSTREAM_RESTRICTED`. It will **never** attempt CAPTCHA circumvention or proxy rotation. |
| **Stories & Highlights** | Ephemeral content requiring authenticated Graph API access | Excluded from MVP scope. InstaFetch only supports `/p/` and `/reel/` endpoints. |
| **Carousel Order & Variations** | Carousels can mix videos, images, and audio | When extraction is permitted, original ordering and real MIME types are preserved. If partial failure occurs, verified items are presented transparently without spoofing missing items. |
| **Video Encoding** | Instagram serves fragmented DASH/HLS streams or variable bitrates | Extractor preserves original available MP4 files. No heavy FFmpeg transcoding is run on serverless functions. |

---

## 3. Truthful User Experience
When extraction fails or is unavailable:
- **No Mock Previews**: Fake thumbnails or simulated success screens are strictly prohibited.
- **Clear Status Messages**: The user is informed truthfully that the content is either private, restricted, or requires official platform APIs.
- **Local Fallback Tool**: Users are offered the browser-local media tool to inspect and format media already saved on their device.
