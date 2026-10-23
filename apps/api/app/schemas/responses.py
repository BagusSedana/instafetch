from typing import List, Literal, Optional
from pydantic import BaseModel, Field, ConfigDict


class MediaAsset(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    kind: Literal["image", "video"]
    filename: str
    mime_type: str = Field(..., alias="mimeType")
    width: Optional[int] = None
    height: Optional[int] = None
    duration_seconds: Optional[float] = Field(default=None, alias="durationSeconds")
    size_bytes: Optional[int] = Field(default=None, alias="sizeBytes")
    preview_url: Optional[str] = Field(default=None, alias="previewUrl")
    download_url: Optional[str] = Field(default=None, alias="downloadUrl")
    expires_at: Optional[str] = Field(default=None, alias="expiresAt")


class InspectResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    request_id: str = Field(..., alias="requestId")
    status: Literal["ready", "unsupported", "pending", "failed"]
    source_type: Optional[Literal["reel", "post", "carousel"]] = Field(default=None, alias="sourceType")
    assets: Optional[List[MediaAsset]] = None
    job_id: Optional[str] = Field(default=None, alias="jobId")
    code: Optional[str] = None
    message: Optional[str] = None
    retry_after_seconds: Optional[int] = Field(default=None, alias="retryAfterSeconds")


class HealthResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    status: str
    service: str
    timestamp: str
    extractor_enabled: bool = Field(..., alias="extractorEnabled")


class ErrorResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    request_id: str = Field(..., alias="requestId")
    code: str
    message: str
    retry_after_seconds: Optional[int] = Field(default=None, alias="retryAfterSeconds")
