from pydantic import BaseModel, Field


class InspectRequest(BaseModel):
    url: str = Field(..., description="Public Instagram Reel or Post URL")
    rights_confirmed: bool = Field(..., description="Explicit declaration that user has rights/authorization")


class JobCreateRequest(BaseModel):
    url: str = Field(..., description="Public Instagram Reel or Post URL")
    rights_confirmed: bool = Field(..., description="Explicit declaration that user has rights/authorization")
