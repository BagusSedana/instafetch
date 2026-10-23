import datetime
from fastapi import APIRouter
from ..core.config import settings
from ..schemas.responses import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="healthy",
        service="instafetch-api",
        timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat(),
        extractor_enabled=settings.EXTRACTOR_ENABLED,
    )
