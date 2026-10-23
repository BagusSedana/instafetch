from typing import Tuple, List, Optional
from ...core.config import settings
from ...schemas.responses import MediaAsset
from .yt_dlp_adapter import inspect_with_yt_dlp
from .gallery_dl_adapter import inspect_with_gallery_dl
from ..media.storage import storage_service


async def process_instagram_media(
    normalized_url: str,
    shortcode: str,
    post_type: str,
    request_id: str,
) -> Tuple[str, Optional[str], Optional[List[MediaAsset]], Optional[str], Optional[str]]:
    """
    Unified extraction pipeline.
    Returns: (status, source_type, assets, error_code, error_message)
    """
    if not settings.EXTRACTOR_ENABLED:
        return (
            "unsupported",
            "reel" if post_type == "reel" else "post",
            None,
            "UPSTREAM_RESTRICTED",
            "Instagram extraction is disabled by default for platform compliance. Use the local file inspection tool below or enable EXTRACTOR_ENABLED in Vercel settings when verified.",
        )

    # If extraction is enabled, execute the permitted adapter
    if post_type == "reel":
        success, meta, code, msg = await inspect_with_yt_dlp(normalized_url, request_id)
        if not success or not meta:
            return "unsupported", "reel", None, code or "UPSTREAM_RESTRICTED", msg or "Could not extract Reel metadata."

        video_url = meta.get("url")
        filesize = meta.get("filesize") or meta.get("filesize_approx") or 0
        if filesize > settings.MAX_MEDIA_BYTES:
            return "failed", "reel", None, "TOO_LARGE", f"Media exceeds the maximum permitted size of {settings.MAX_MEDIA_BYTES // (1024*1024)} MB."

        # Upload or generate download link
        storage_res = await storage_service.upload_asset(
            request_id=request_id,
            filename=f"reel_{shortcode}.mp4",
            data=b"",  # In metadata-only inspect, points to authorized direct link or storage
            mime_type="video/mp4",
        )

        asset = MediaAsset(
            id=f"reel_{shortcode}",
            kind="video",
            filename=f"reel_{shortcode}.mp4",
            mime_type="video/mp4",
            width=meta.get("width"),
            height=meta.get("height"),
            duration_seconds=meta.get("duration"),
            size_bytes=filesize,
            preview_url=video_url or storage_res.get("preview_url"),
            download_url=video_url or storage_res.get("download_url"),
            expires_at=storage_res.get("expires_at"),
        )
        return "ready", "reel", [asset], None, None

    else:
        # Standard post or carousel
        success, items, code, msg = await inspect_with_gallery_dl(normalized_url, request_id)
        if not success or not items:
            # Fall back to yt-dlp check in case it's a video post
            y_success, y_meta, y_code, y_msg = await inspect_with_yt_dlp(normalized_url, request_id)
            if y_success and y_meta:
                video_url = y_meta.get("url")
                filesize = y_meta.get("filesize") or y_meta.get("filesize_approx") or 0
                asset = MediaAsset(
                    id=f"post_{shortcode}",
                    kind="video",
                    filename=f"post_{shortcode}.mp4",
                    mime_type="video/mp4",
                    width=y_meta.get("width"),
                    height=y_meta.get("height"),
                    duration_seconds=y_meta.get("duration"),
                    size_bytes=filesize,
                    preview_url=video_url,
                    download_url=video_url,
                )
                return "ready", "post", [asset], None, None
            return "unsupported", "post", None, code or "UPSTREAM_RESTRICTED", msg or "Post content could not be retrieved."

        source_type = "carousel" if len(items) > 1 else "post"
        assets: List[MediaAsset] = []
        for idx, item in enumerate(items[:settings.MAX_CAROUSEL_ITEMS]):
            # Parse gallery-dl output tuple/dict
            item_url = item.get("url") if isinstance(item, dict) else (item[1] if isinstance(item, (list, tuple)) and len(item) > 1 else None)
            is_video = bool(item_url and (".mp4" in item_url.lower() or item.get("extension") == "mp4"))
            ext = ".mp4" if is_video else ".jpg"
            mime = "video/mp4" if is_video else "image/jpeg"

            assets.append(
                MediaAsset(
                    id=f"{shortcode}_{idx+1}",
                    kind="video" if is_video else "image",
                    filename=f"post_{shortcode}_{idx+1}{ext}",
                    mime_type=mime,
                    preview_url=item_url,
                    download_url=item_url,
                )
            )

        return "ready", source_type, assets, None, None
