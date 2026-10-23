import asyncio
import json
from typing import Optional, List, Dict, Any, Tuple
from ...core.config import settings
from ...core.logging import structured_logger


async def inspect_with_gallery_dl(url: str, request_id: str) -> Tuple[bool, Optional[List[Dict[str, Any]]], Optional[str], Optional[str]]:
    """
    Safely executes gallery-dl in simulation/dump-json mode to inspect photos/carousel items.
    Returns: (success, items_list, error_code, error_message)
    """
    cmd = [
        "gallery-dl",
        "--dump-json",
        "--no-config",
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
            if "login" in err_str.lower() or "private" in err_str.lower():
                return False, None, "PRIVATE_OR_UNAVAILABLE", "This Instagram content is private or requires login."
            elif "429" in err_str:
                return False, None, "RATE_LIMITED", "Instagram upstream rate limit encountered."
            else:
                return False, None, "UPSTREAM_RESTRICTED", "Instagram has restricted public access to this content."

        lines = [line.strip() for line in stdout.decode("utf-8").splitlines() if line.strip()]
        items = []
        for line in lines:
            try:
                data = json.loads(line)
                items.append(data)
            except Exception:
                continue

        return True, items, None, None

    except asyncio.TimeoutError:
        structured_logger.log(
            request_id=request_id,
            operation="gallery_dl_inspect",
            error_code="TIMEOUT",
            level="warning",
        )
        return False, None, "TIMEOUT", "The inspection request timed out while contacting upstream services."
    except Exception as exc:
        structured_logger.log(
            request_id=request_id,
            operation="gallery_dl_inspect",
            error_code="SUBPROCESS_FAILED",
            level="error",
        )
        return False, None, "INTERNAL_ERROR", "An unexpected failure occurred while inspecting media."
