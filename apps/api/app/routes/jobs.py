import uuid
from typing import Dict, Any, List
from fastapi import APIRouter, HTTPException
from ..schemas.requests import JobCreateRequest
from ..schemas.responses import InspectResponse, MediaAsset
from ..schemas.errors import ErrorCode

router = APIRouter()

# In-memory mock store for optional Mode B job endpoints
_JOBS_STORE: Dict[str, Dict[str, Any]] = {}


@router.post("/v1/jobs")
async def create_job(req: JobCreateRequest):
    if not req.rights_confirmed:
        raise HTTPException(
            status_code=400,
            detail={"code": ErrorCode.RIGHTS_REQUIRED, "message": "Rights declaration is required."},
        )
    job_id = f"job_{uuid.uuid4().hex[:12]}"
    _JOBS_STORE[job_id] = {
        "status": "pending",
        "url": req.url,
        "assets": [],
    }
    return {
        "id": job_id,
        "status": "pending",
    }


@router.get("/v1/jobs/{job_id}")
async def get_job_status(job_id: str):
    job = _JOBS_STORE.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail={"code": "JOB_NOT_FOUND", "message": "Job does not exist."})
    return {
        "id": job_id,
        "status": job["status"],
    }


@router.get("/v1/jobs/{job_id}/assets")
async def get_job_assets(job_id: str) -> List[MediaAsset]:
    job = _JOBS_STORE.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail={"code": "JOB_NOT_FOUND", "message": "Job does not exist."})
    return job.get("assets", [])
