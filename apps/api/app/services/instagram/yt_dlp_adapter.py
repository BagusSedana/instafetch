import asyncio
import json
from typing import Optional, Dict, Any, Tuple
from ...core.config import settings
from ...core.logging import structured_logger


async def inspect_with_yt_dlp(url: str, request_id: str) -> Tuple[bool, Optional[Dict[str, Any]], Optional[str], Optional[str]]:
    """
    Safely executes yt-dlp to inspect media metadata for an authorized URL.
    Returns: (success, metadata_dict, error_code, error_message)
    """
    cmd = [
        "yt-dlp",
        "--dump-json",
        "--no-playlist",
        "--no-warnings",
        "--no-config",
        "--socket-timeout", "15",
        url,
    ]

    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )

        stdout, stderr = await asyncio.wait_for(
            proc.communicate(),
            timeout=float(settings.EXTRACTION_TIMEOUT_SECONDS),
        )

        if proc.returncode != 0:
            err_str = stderr.decode("utf-8", errors="replace")
            # Analyze error patterns without leaking private data
            if "private" in err_str.lower() or "login required" in err_str.lower():
                return False, None, "PRIVATE_OR_UNAVAILABLE", "This Instagram content is private or requires authentication."
            elif "rate-limit" in err_str.lower() or "too many requests" in err_str.lower() or "429" in err_str:
                return False, None, "RATE_LIMITED", "Instagram upstream rate limit encountered."
            else:
                return False, None, "UPSTREAM_RESTRICTED", "Instagram has restricted access to this content. We do not bypass restrictions."

        meta = json.loads(stdout.decode("utf-8"))
        return True, meta, None, None

    except asyncio.TimeoutError:
        structured_logger.log(
            request_id=request_id,
            operation="yt_dlp_inspect",
            error_code="TIMEOUT",
            level="warning",
        )
        return False, None, "TIMEOUT", "The inspection request timed out while contacting upstream services."
    except Exception as exc:
        structured_logger.log(
            request_id=request_id,
            operation="yt_dlp_inspect",
            error_code="SUBPROCESS_FAILED",
            level="error",
        )
        return False, None, "INTERNAL_ERROR", "An unexpected failure occurred while inspecting media."
