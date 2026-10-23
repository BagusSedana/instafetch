import io
import zipfile
import os
from typing import List, Tuple
from ...core.config import settings


def create_safe_zip(items: List[Tuple[str, bytes]]) -> bytes:
    """
    Safely packages a list of (filename, data) tuples into a ZIP file.
    Enforces maximum item counts and path sanitation.
    """
    if len(items) > settings.MAX_CAROUSEL_ITEMS:
        raise ValueError(f"Exceeded maximum item count of {settings.MAX_CAROUSEL_ITEMS}")

    buf = io.BytesIO()
    total_bytes = 0

    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for idx, (raw_filename, data) in enumerate(items):
            total_bytes += len(data)
            if total_bytes > settings.MAX_MEDIA_BYTES:
                raise ValueError("Total archive size exceeds allowed limit.")

            # Sanitize filename: base name only, no directory traversal
            clean_name = os.path.basename(raw_filename).replace("/", "_").replace("\\", "_")
            if not clean_name:
                clean_name = f"item_{idx+1}.bin"

            zf.writestr(clean_name, data)

    buf.seek(0)
    return buf.getvalue()
