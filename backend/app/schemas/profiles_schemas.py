from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime


class ProfileUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[str] = Field(None, min_length=5, max_length=255)
    bio: Optional[str] = None


class ProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    bio: Optional[str]
    role: str
    created_at: datetime
    # password is intentionally excluded
