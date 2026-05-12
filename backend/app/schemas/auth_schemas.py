from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing import Optional


class AuthBase(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=72)


class AuthRegister(AuthBase):
    username: str = Field(..., min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_]+$")
    bio: Optional[str] = None


class AuthRegisterResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    bio: Optional[str]
    role: str
    # password is intentionally excluded


class AuthLogin(AuthBase):
    pass


class AuthLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
