from typing import List, Sequence
import uuid
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.core.security import decode_token
from app.repositories.admin import admin_repo
from app.models.admin import AdminUser

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str | None = Depends(oauth2_scheme)
) -> AdminUser:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing subject claim",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = uuid.UUID(user_id_str)
        user = await admin_repo.get(db, user_id)
    except ValueError:
        user = await admin_repo.get_by_email(db, user_id_str)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user account"
        )

    return user

class require_roles:
    def __init__(self, *allowed_roles: str):
        self.allowed_roles = [r.upper() for r in allowed_roles]

    async def __call__(self, current_user: AdminUser = Depends(get_current_user)) -> AdminUser:
        user_role = current_user.role.upper()
        if user_role not in self.allowed_roles and "SUPER_ADMIN" not in self.allowed_roles:
            # SUPER_ADMIN gets override access unless explicitly excluded
            if user_role != "SUPER_ADMIN":
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Role '{current_user.role}' is not authorized to perform this operation"
                )
        return current_user
