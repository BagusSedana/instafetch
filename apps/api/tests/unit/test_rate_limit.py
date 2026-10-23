import time
from app.core.rate_limit import RateLimiter
from app.core.config import settings


def test_rate_limiter_allows_under_threshold():
    limiter = RateLimiter()
    ip = "192.168.1.10"
    for _ in range(settings.RATE_LIMIT_PER_HOUR - 1):
        allowed, retry_after = limiter.check_rate_limit(ip)
        assert allowed is True
        limiter.record_request(ip)

    # 10th request
    allowed, retry_after = limiter.check_rate_limit(ip)
    assert allowed is True
    limiter.record_request(ip)

    # 11th request: must be blocked
    allowed, retry_after = limiter.check_rate_limit(ip)
    assert allowed is False
    assert retry_after > 0


def test_rate_limiter_concurrency():
    limiter = RateLimiter()
    ip = "10.0.0.1"
    limiter.acquire_concurrency(ip)
    limiter.acquire_concurrency(ip)

    # Exceeds max 2 concurrent requests
    allowed, retry_after = limiter.check_rate_limit(ip)
    assert allowed is False
    assert retry_after == 30

    limiter.release_concurrency(ip)
    allowed, _ = limiter.check_rate_limit(ip)
    assert allowed is True
