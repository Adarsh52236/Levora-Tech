from typing import List
from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.project import ProjectResponse
from app.services.project_service import project_service

router = APIRouter()

@router.get(
    "/projects",
    response_model=SuccessResponse[List[ProjectResponse]],
    summary="Get Portfolio Projects",
    description="Returns all portfolio projects, with featured projects listed first."
)
async def get_projects(db: AsyncSession = Depends(get_db)):
    data = await project_service.get_projects(db)
    return SuccessResponse(
        message="Projects retrieved successfully",
        data=data
    )

@router.get(
    "/projects/{slug}",
    response_model=SuccessResponse[ProjectResponse],
    summary="Get Project By Slug",
    description="Returns details for a single project matching the given slug. Returns 404 if not found."
)
async def get_project_by_slug(
    slug: str = Path(..., description="Unique slug identifier of the project"),
    db: AsyncSession = Depends(get_db)
):
    data = await project_service.get_project_by_slug(db, slug)
    return SuccessResponse(
        message="Project details retrieved successfully",
        data=data
    )
