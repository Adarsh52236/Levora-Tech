from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status, Request
from app.repositories.admin import admin_repo
from app.core.security import verify_password, create_access_token, create_refresh_token, decode_token
from app.schemas.auth import LoginRequest, TokenResponseData
from app.schemas.admin import AdminUserResponse
from app.services.audit_service import audit_service
from app.core.config import settings

class AuthService:
    async def login(self, db: AsyncSession, data: LoginRequest, request: Request | None = None) -> TokenResponseData:
        user = await admin_repo.get_by_email(db, data.email)
        if not user or not verify_password(data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Inactive user account"
            )

        access_token = create_access_token(subject=user.id)
        refresh_token = create_refresh_token(subject=user.id)

        # Audit logging
        ip = request.client.host if request and request.client else None
        ua = request.headers.get("user-agent") if request else None
        await audit_service.log_action(
            db, action="LOGIN", entity="User", entity_id=str(user.id), user_id=user.id, ip_address=ip, user_agent=ua
        )

        return TokenResponseData(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="Bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=AdminUserResponse.model_validate(user)
        )

    async def refresh_token(self, db: AsyncSession, refresh_token_str: str) -> TokenResponseData:
        payload = decode_token(refresh_token_str)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token"
            )

        user_id_str = payload.get("sub")
        if not user_id_str:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token claims")

        import uuid
        user = await admin_repo.get(db, uuid.UUID(user_id_str))
        if not user or not user.is_active:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive or missing")

        new_access_token = create_access_token(subject=user.id)
        new_refresh_token = create_refresh_token(subject=user.id)

        return TokenResponseData(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
            token_type="Bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=AdminUserResponse.model_validate(user)
        )

auth_service = AuthService()
