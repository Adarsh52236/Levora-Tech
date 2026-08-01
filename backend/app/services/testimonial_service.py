from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.testimonial import testimonial_repo
from app.schemas.testimonial import TestimonialResponse

class TestimonialService:
    async def get_testimonials(self, db: AsyncSession) -> List[TestimonialResponse]:
        testimonials = await testimonial_repo.get_ordered(db)
        return [TestimonialResponse.model_validate(t) for t in testimonials]

testimonial_service = TestimonialService()
