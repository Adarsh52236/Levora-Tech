from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate

class ProjectRepository(BaseRepository[Project, ProjectCreate, ProjectUpdate]):
    async def get_by_slug(self, db: AsyncSession, slug: str) -> Optional[Project]:
        result = await db.execute(select(self.model).where(self.model.slug == slug))
        return result.scalars().first()

    async def get_ordered(self, db: AsyncSession) -> List[Project]:
        result = await db.execute(
            select(self.model)
            .order_by(self.model.featured.desc(), self.model.display_order.asc())
        )
        return list(result.scalars().all())

project_repo = ProjectRepository(Project)
