import os
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    EXTRACTOR_ENABLED: bool = Field(default=False, description="Toggle for live Instagram media extraction")
    MAX_MEDIA_BYTES: int = Field(default=104857600, description="100MB max per asset")
    MAX_CAROUSEL_ITEMS: int = Field(default=10, description="Max carousel items to process")
    EXTRACTION_TIMEOUT_SECONDS: int = Field(default=45, description="Subprocess timeout clamp")
    MEDIA_TTL_MINUTES: int = Field(default=30, description="Asset expiration duration")
    RATE_LIMIT_PER_HOUR: int = Field(default=10, description="Hourly requests limit per IP")
    MAX_CONCURRENT_INSPECTIONS: int = Field(default=2, description="Max concurrent extractions per IP")
    BLOB_READ_WRITE_TOKEN: str = Field(default="", description="Vercel Blob read/write token")
    CONTACT_EMAIL: str = Field(default="support@instafetch.local", description="Support email")

    model_config = {
        "env_file": ".env",
        "extra": "ignore",
    }


settings = Settings()
