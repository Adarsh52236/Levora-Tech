from pydantic import BaseModel, EmailStr
from app.schemas.admin import AdminUserResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RefreshRequest(BaseModel):
    refresh_token: str

class TokenResponseData(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "Bearer"
    expires_in: int = 1800
    user: AdminUserResponse
