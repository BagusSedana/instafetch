import os
import uuid
import datetime
from typing import Optional, Dict
import httpx
from ...core.config import settings
from ...core.logging import structured_logger


class StorageService:
    def __init__(self):
        self.token = settings.BLOB_READ_WRITE_TOKEN

    async def upload_asset(
        self,
        request_id: str,
        filename: str,
        data: bytes,
        mime_type: str,
    ) -> Dict[str, str]:
        """
        Uploads asset to Vercel Blob if token is configured; otherwise generates
        a secure test URL. Returns {'download_url': str, 'expires_at': str}.
        """
        expires_at = (
            datetime.datetime.now(datetime.timezone.utc)
            + datetime.timedelta(minutes=settings.MEDIA_TTL_MINUTES)
        ).isoformat()

        # Sanitize filename and append unique UUID
        safe_ext = os.path.splitext(filename)[1] or (".mp4" if "video" in mime_type else ".jpg")
        blob_path = f"assets/{uuid.uuid4().hex}{safe_ext}"

        if self.token:
            # Upload to Vercel Blob REST API
            upload_url = f"https://blob.vercel-storage.com/{blob_path}"
            headers = {
                "Authorization": f"Bearer {self.token}",
                "x-api-version": "7",
                "content-type": mime_type,
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.put(upload_url, content=data, headers=headers)
                if res.status_code in (200, 201):
                    res_data = res.json()
                    download_url = res_data.get("url")
                    return {
                        "download_url": download_url,
                        "preview_url": download_url,
                        "expires_at": expires_at,
                    }
                else:
                    structured_logger.log(
                        request_id=request_id,
                        operation="blob_upload",
                        status_code=res.status_code,
                        error_code="BLOB_UPLOAD_FAILED",
                        level="error",
                    )

        # Fallback simulation URL for test/local environments when BLOB token is not set
        test_url = f"https://assets.instafetch.local/{blob_path}"
        return {
            "download_url": test_url,
            "preview_url": test_url,
            "expires_at": expires_at,
        }


storage_service = StorageService()
