from pydantic import BaseModel, ConfigDict
from typing import Optional

class CrimeBase(BaseModel):
    title: str
    type: str
    location: str
    severity: int
    description: str

class CrimeCreate(CrimeBase):
    pass

class CrimeUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    location: Optional[str] = None
    severity: Optional[int] = None
    description: Optional[str] = None

class CrimeResponse(CrimeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int