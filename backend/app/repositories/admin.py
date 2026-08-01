from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository
from app.models.admin import AdminUser
from app.schemas.admin import AdminUserCreate, AdminUserUpdate

class AdminUserRepository(BaseRepository[AdminUser, AdminUserCreate, AdminUserUpdate]):
    async def get_by_email(self, db: AsyncSession, email: str) -> Optional[AdminUser]:
        result = await db.execute(select(self.model).where(self.model.email == email))
        return result.scalars().first()

admin_repo = AdminUserRepository(AdminUser)
