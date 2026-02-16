from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime


# -------- Create Task --------
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None


# -------- Update Task --------
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


# -------- Response Model --------
class TaskResponse(BaseModel):
    id: UUID
    title: str
    description: Optional[str]
    owner_id: UUID
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
