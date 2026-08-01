from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.testimonial import TestimonialResponse
from app.services.testimonial_service import testimonial_service

router = APIRouter()

@router.get(
    "/testimonials",
    response_model=SuccessResponse[List[TestimonialResponse]],
    summary="Get Client Testimonials",
    description="Returns client testimonials, with featured testimonials listed first."
)
async def get_testimonials(db: AsyncSession = Depends(get_db)):
    data = await testimonial_service.get_testimonials(db)
    return SuccessResponse(
        message="Testimonials retrieved successfully",
        data=data
    )
