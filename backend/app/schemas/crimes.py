from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date

class CrimeBase(BaseModel):
    title: str
    type: str
    location: str
    date: date
    severity: int
    description: str
    source: str | None = None

class CrimeCreate(CrimeBase):
    pass

class CrimeUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    location: Optional[str] = None
    date: Optional[date] = None
    severity: Optional[int] = None
    description: Optional[str] = None
    source: Optional[str] = None

class CrimeResponse(CrimeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int