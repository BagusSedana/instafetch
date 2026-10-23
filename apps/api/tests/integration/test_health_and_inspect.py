import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/health")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "healthy"
        assert data["service"] == "instafetch-api"
        assert "timestamp" in data
        assert "extractorEnabled" in data


@pytest.mark.asyncio
async def test_inspect_missing_rights_rejected():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.post(
            "/api/v1/inspect",
            json={"url": "https://www.instagram.com/reel/C2g7XYZ1234/", "rights_confirmed": False},
        )
        assert res.status_code == 400
        data = res.json()
        assert data["code"] == "RIGHTS_REQUIRED"


@pytest.mark.asyncio
async def test_inspect_invalid_url_rejected():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.post(
            "/api/v1/inspect",
            json={"url": "https://evil.com/fake/reel", "rights_confirmed": True},
        )
        assert res.status_code == 400
        data = res.json()
        assert data["code"] == "INVALID_URL"


@pytest.mark.asyncio
async def test_inspect_disabled_extractor_returns_truthful_unsupported():
    # When EXTRACTOR_ENABLED is false (default), returns status: "unsupported"
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.post(
            "/api/v1/inspect",
            json={"url": "https://www.instagram.com/reel/C2g7XYZ1234/", "rights_confirmed": True},
        )
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "unsupported"
        assert data["code"] == "UPSTREAM_RESTRICTED"
        assert "disabled by default" in data["message"].lower()
