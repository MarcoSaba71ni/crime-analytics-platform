from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date

class CrimeBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    type: str = Field(..., min_length=3, max_length=50)
    location: str = Field(..., min_length=3, max_length=255)
    date: date
    severity: int = Field(..., ge=1, le=5)
    description: str = Field(..., min_length=10)
    source: str | None = Field(None, max_length=255)

class CrimeCreate(CrimeBase):
    pass

class CrimeUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=255)
    type: Optional[str] = Field(None, min_length=3, max_length=50)
    location: Optional[str] = Field(None, min_length=3, max_length=255)
    date: Optional[date] = None
    severity: Optional[int] = Field(None, ge=1, le=5)
    description: Optional[str] = Field(None, min_length=10)
    source: Optional[str] = Field(None, max_length=255)

class CrimeResponse(CrimeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int