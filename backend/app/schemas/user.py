from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import Optional


# -------- Register Request --------
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str


# -------- Login Request --------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# -------- Response Model --------
class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    username: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True  # allows ORM to Pydantic conversion


# -------- Token Response --------
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
