from typing import List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate

class TestimonialRepository(BaseRepository[Testimonial, TestimonialCreate, TestimonialUpdate]):
    async def get_ordered(self, db: AsyncSession) -> List[Testimonial]:
        result = await db.execute(
            select(self.model)
            .order_by(self.model.featured.desc(), self.model.created_at.desc())
        )
        return list(result.scalars().all())

testimonial_repo = TestimonialRepository(Testimonial)
