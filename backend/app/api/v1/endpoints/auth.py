from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.auth import LoginRequest, RefreshRequest, TokenResponseData
from app.schemas.admin import AdminUserResponse
from app.services.auth_service import auth_service
from app.api.deps import get_current_user
from app.models.admin import AdminUser

router = APIRouter()

@router.post(
    "/login",
    response_model=SuccessResponse[TokenResponseData],
    summary="Admin Login",
    description="Authenticates admin credentials and returns JWT access and refresh tokens."
)
async def login(
    data: LoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    token_data = await auth_service.login(db, data, request)
    return SuccessResponse(
        message="Login successful",
        data=token_data
    )

@router.post(
    "/refresh",
    response_model=SuccessResponse[TokenResponseData],
    summary="Refresh Token",
    description="Issues a new access and refresh token pair using a valid refresh token."
)
async def refresh_token(
    data: RefreshRequest,
    db: AsyncSession = Depends(get_db)
):
    token_data = await auth_service.refresh_token(db, data.refresh_token)
    return SuccessResponse(
        message="Token refreshed successfully",
        data=token_data
    )

@router.post(
    "/logout",
    response_model=SuccessResponse[dict],
    summary="Admin Logout",
    description="Invalidates current session on the client side."
)
async def logout(current_user: AdminUser = Depends(get_current_user)):
    return SuccessResponse(
        message="Logout successful",
        data={"user_id": str(current_user.id)}
    )

@router.get(
    "/me",
    response_model=SuccessResponse[AdminUserResponse],
    summary="Get Current User Profile",
    description="Returns profile details of the currently authenticated administrator."
)
async def get_me(current_user: AdminUser = Depends(get_current_user)):
    return SuccessResponse(
        message="User profile retrieved",
        data=AdminUserResponse.model_validate(current_user)
    )
