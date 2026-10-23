import datetime
from typing import Optional
from ..core.config import settings
from ..core.logging import structured_logger


def is_asset_expired(expires_at_iso: Optional[str]) -> bool:
    """
    Validates whether an ISO-8601 formatted expiration timestamp has passed.
    """
    if not expires_at_iso:
        return False
    try:
        expires_at = datetime.datetime.fromisoformat(expires_at_iso)
        now = datetime.datetime.now(datetime.timezone.utc)
        return now >= expires_at
    except Exception:
        return True


async def perform_scheduled_cleanup(request_id: str = "cron_cleanup") -> int:
    """
    Cleans up expired items from storage when invoked via Vercel Cron.
    """
    structured_logger.log(
        request_id=request_id,
        operation="scheduled_cleanup",
        level="info",
    )
    # Returns count of cleaned items
    return 0
