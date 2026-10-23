import json
import logging
import sys
from typing import Optional


class StructuredLogger:
    def __init__(self, name: str = "instafetch"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        if not self.logger.handlers:
            handler = logging.StreamHandler(sys.stdout)
            handler.setFormatter(logging.Formatter("%(message)s"))
            self.logger.addHandler(handler)

    def log(
        self,
        request_id: str,
        operation: str,
        duration_ms: Optional[float] = None,
        status_code: Optional[int] = None,
        error_code: Optional[str] = None,
        media_kind: Optional[str] = None,
        level: str = "info",
    ):
        """
        Emits structured JSON logs. Full user URLs, shortcodes, and personal
        identifiers are strictly omitted for user privacy and compliance.
        """
        payload = {
            "requestId": request_id,
            "operation": operation,
        }
        if duration_ms is not None:
            payload["durationMs"] = round(duration_ms, 2)
        if status_code is not None:
            payload["statusCode"] = status_code
        if error_code is not None:
            payload["errorCode"] = error_code
        if media_kind is not None:
            payload["mediaKind"] = media_kind

        json_str = json.dumps(payload)
        if level == "error":
            self.logger.error(json_str)
        elif level == "warning":
            self.logger.warning(json_str)
        else:
            self.logger.info(json_str)


structured_logger = StructuredLogger()
