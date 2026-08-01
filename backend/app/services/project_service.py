from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from app.repositories.project import project_repo
from app.schemas.project import ProjectResponse

class ProjectService:
    async def get_projects(self, db: AsyncSession) -> List[ProjectResponse]:
        projects = await project_repo.get_ordered(db)
        return [ProjectResponse.model_validate(p) for p in projects]

    async def get_project_by_slug(self, db: AsyncSession, slug: str) -> ProjectResponse:
        project = await project_repo.get_by_slug(db, slug)
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Project with slug '{slug}' not found"
            )
        return ProjectResponse.model_validate(project)

project_service = ProjectService()
