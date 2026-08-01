from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.service import ServiceResponse
from app.services.service_service import service_service

router = APIRouter()

@router.get(
    "/services",
    response_model=SuccessResponse[List[ServiceResponse]],
    summary="Get Active Services",
    description="Returns all active services offered by Levora Tech, ordered by display order."
)
async def get_services(db: AsyncSession = Depends(get_db)):
    data = await service_service.get_services(db)
    return SuccessResponse(
        message="Services retrieved successfully",
        data=data
    )
