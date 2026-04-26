from pydantic import BaseModel

class CrimeBase(BaseModel):
    title: str
    type: str
    location: str
    severity: int
    description: str

class CrimeResponse(CrimeBase):
    id: int

class CrimeCreate(CrimeBase):
    pass