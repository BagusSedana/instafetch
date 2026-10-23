import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.mark.asyncio
async def test_ssrf_cloud_metadata_blocked():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.post(
            "/api/v1/inspect",
            json={"url": "http://169.254.169.254/latest/meta-data/", "rights_confirmed": True},
        )
        assert res.status_code == 400
        assert res.json()["code"] == "INVALID_URL"


@pytest.mark.asyncio
async def test_ssrf_localhost_blocked():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.post(
            "/api/v1/inspect",
            json={"url": "http://127.0.0.1:8000/internal", "rights_confirmed": True},
        )
        assert res.status_code == 400
        assert res.json()["code"] == "INVALID_URL"


@pytest.mark.asyncio
async def test_security_headers_present():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/health")
        assert res.headers.get("X-Content-Type-Options") == "nosniff"
        assert res.headers.get("X-Frame-Options") == "DENY"
        assert res.headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
