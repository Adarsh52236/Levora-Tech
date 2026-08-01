from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate

class ServiceRepository(BaseRepository[Service, ServiceCreate, ServiceUpdate]):
    async def get_by_slug(self, db: AsyncSession, slug: str) -> Optional[Service]:
        result = await db.execute(select(self.model).where(self.model.slug == slug))
        return result.scalars().first()

    async def get_active(self, db: AsyncSession) -> List[Service]:
        result = await db.execute(
            select(self.model)
            .where(self.model.is_active == True)
            .order_by(self.model.display_order.asc())
        )
        return list(result.scalars().all())

service_repo = ServiceRepository(Service)
