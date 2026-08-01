from typing import Optional
from pydantic import EmailStr
from app.schemas.base import BaseSchema, BaseDBModel

class AdminUserBase(BaseSchema):
    name: str
    email: EmailStr
    role: str = "admin"
    is_active: bool = True

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUserUpdate(BaseSchema):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None

class AdminUserResponse(AdminUserBase, BaseDBModel):
    # password_hash is deliberately excluded
    pass
