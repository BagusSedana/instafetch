from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.config import settings
from app.core.security import SecurityHeadersMiddleware
from app.routes.health import router as health_router
from app.routes.inspect import router as inspect_router
from app.routes.jobs import router as jobs_router

app = FastAPI(
    title="InstaFetch API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)

# Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Same-origin via Vercel Services rewrites; allow all for preview
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Restrictive Security Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)


@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
    detail = exc.detail
    if isinstance(detail, dict):
        return JSONResponse(status_code=exc.status_code, content=detail)
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": str(detail)},
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Production-grade generic error envelope; stack traces are never exposed to clients
    return JSONResponse(
        status_code=500,
        content={
            "code": "INTERNAL_ERROR",
            "message": "An unexpected server error occurred. Please try again later.",
        },
    )


# Vercel Services forwards the full path beginning with /api
app.include_router(health_router, prefix="/api")
app.include_router(inspect_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")


@app.get("/")
async def root():
    return {"service": "InstaFetch API", "status": "active"}
