import time
from typing import Dict, List, Tuple
from .config import settings


class RateLimiter:
    def __init__(self):
        # ip -> list of request timestamps in the current window
        self._requests: Dict[str, List[float]] = {}
        # ip -> count of active concurrent extractions
        self._active_concurrency: Dict[str, int] = {}

    def _cleanup_ip(self, ip: str, now: float):
        cutoff = now - 3600.0  # 1 hour window
        if ip in self._requests:
            self._requests[ip] = [t for t in self._requests[ip] if t > cutoff]
            if not self._requests[ip]:
                del self._requests[ip]

    def check_rate_limit(self, ip: str) -> Tuple[bool, int]:
        """
        Checks if IP has exceeded hourly request threshold or concurrency limit.
        Returns: (is_allowed, retry_after_seconds)
        """
        now = time.time()
        self._cleanup_ip(ip, now)

        # Check concurrency
        active = self._active_concurrency.get(ip, 0)
        if active >= settings.MAX_CONCURRENT_INSPECTIONS:
            return False, 30  # Wait for ongoing inspection to finish

        history = self._requests.get(ip, [])
        if len(history) >= settings.RATE_LIMIT_PER_HOUR:
            oldest = history[0]
            retry_after = max(1, int(3600 - (now - oldest)))
            return False, retry_after

        return True, 0

    def record_request(self, ip: str):
        now = time.time()
        if ip not in self._requests:
            self._requests[ip] = []
        self._requests[ip].append(now)

    def acquire_concurrency(self, ip: str):
        self._active_concurrency[ip] = self._active_concurrency.get(ip, 0) + 1

    def release_concurrency(self, ip: str):
        if ip in self._active_concurrency:
            self._active_concurrency[ip] = max(0, self._active_concurrency[ip] - 1)
            if self._active_concurrency[ip] == 0:
                del self._active_concurrency[ip]


rate_limiter = RateLimiter()
