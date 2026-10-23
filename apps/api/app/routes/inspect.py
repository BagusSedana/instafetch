import time
import uuid
from fastapi import APIRouter, Request, HTTPException, Response
from ..schemas.requests import InspectRequest
from ..schemas.responses import InspectResponse, ErrorResponse
from ..schemas.errors import ErrorCode
from ..core.security import get_client_ip
from ..core.rate_limit import rate_limiter
from ..core.logging import structured_logger
from ..services.instagram.url_validation import validate_and_normalize_instagram_url
from ..services.instagram.adapters import process_instagram_media

router = APIRouter()


@router.post("/v1/inspect", response_model=InspectResponse)
async def inspect_media(req: InspectRequest, request: Request, response: Response):
    start_time = time.time()
    req_id = f"req_{uuid.uuid4().hex[:8]}"
    client_ip = get_client_ip(request)

    # 1. Rights confirmation check
    if not req.rights_confirmed:
        structured_logger.log(
            request_id=req_id,
            operation="inspect_rights_check",
            status_code=400,
            error_code=ErrorCode.RIGHTS_REQUIRED,
            duration_ms=(time.time() - start_time) * 1000,
            level="warning",
        )
        raise HTTPException(
            status_code=400,
            detail={
                "requestId": req_id,
                "code": ErrorCode.RIGHTS_REQUIRED,
                "message": "You must confirm you have authorization to access and download this content.",
            },
        )

    # 2. Strict URL validation
    is_valid, normalized_url, shortcode, post_type, err_reason = validate_and_normalize_instagram_url(req.url)
    if not is_valid:
        structured_logger.log(
            request_id=req_id,
            operation="inspect_url_validation",
            status_code=400,
            error_code=ErrorCode.INVALID_URL,
            duration_ms=(time.time() - start_time) * 1000,
            level="warning",
        )
        raise HTTPException(
            status_code=400,
            detail={
                "requestId": req_id,
                "code": ErrorCode.INVALID_URL,
                "message": err_reason or "Invalid Instagram Reel or Post URL.",
            },
        )

    # 3. Rate limiting & Concurrency clamp
    allowed, retry_after = rate_limiter.check_rate_limit(client_ip)
    if not allowed:
        response.headers["Retry-After"] = str(retry_after)
        structured_logger.log(
            request_id=req_id,
            operation="inspect_rate_limit",
            status_code=429,
            error_code=ErrorCode.RATE_LIMITED,
            duration_ms=(time.time() - start_time) * 1000,
            level="warning",
        )
        raise HTTPException(
            status_code=429,
            detail={
                "requestId": req_id,
                "code": ErrorCode.RATE_LIMITED,
                "message": "Too many requests. Please try again later.",
                "retryAfterSeconds": retry_after,
            },
        )

    # Record request and acquire concurrency
    rate_limiter.record_request(client_ip)
    rate_limiter.acquire_concurrency(client_ip)

    try:
        status, source_type, assets, error_code, error_message = await process_instagram_media(
            normalized_url=normalized_url,
            shortcode=shortcode,
            post_type=post_type,
            request_id=req_id,
        )

        duration_ms = (time.time() - start_time) * 1000
        media_kind = assets[0].kind if assets and len(assets) > 0 else None
        structured_logger.log(
            request_id=req_id,
            operation="inspect_media_completed",
            status_code=200,
            duration_ms=duration_ms,
            error_code=error_code,
            media_kind=media_kind,
        )

        return InspectResponse(
            requestId=req_id,
            status=status,
            sourceType=source_type,
            assets=assets,
            code=error_code,
            message=error_message,
        )

    finally:
        rate_limiter.release_concurrency(client_ip)
