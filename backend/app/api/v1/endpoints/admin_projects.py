import uuid
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.repositories.project import project_repo
from app.api.deps import get_current_user, require_roles
from app.models.admin import AdminUser
from app.services.audit_service import audit_service

router = APIRouter()

@router.post(
    "/admin/projects",
    response_model=SuccessResponse[ProjectResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create Project (Admin/Editor)",
    description="Allows ADMIN, SUPER_ADMIN, or EDITOR to create a new project."
)
async def create_project(
    data: ProjectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN", "EDITOR"))
):
    project = await project_repo.create(db, data)
    await audit_service.log_action(db, "CREATE", "Project", str(project.id), user_id=current_user.id)
    return SuccessResponse(message="Project created", data=ProjectResponse.model_validate(project))

@router.put(
    "/admin/projects/{project_id}",
    response_model=SuccessResponse[ProjectResponse],
    summary="Update Project (Admin/Editor)",
    description="Allows ADMIN, SUPER_ADMIN, or EDITOR to update an existing project."
)
async def update_project(
    project_id: uuid.UUID,
    data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN", "EDITOR"))
):
    existing = await project_repo.get(db, project_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updated = await project_repo.update(db, existing, data)
    await audit_service.log_action(db, "UPDATE", "Project", str(updated.id), user_id=current_user.id)
    return SuccessResponse(message="Project updated", data=ProjectResponse.model_validate(updated))

@router.delete(
    "/admin/projects/{project_id}",
    response_model=SuccessResponse[dict],
    summary="Delete Project (Admin Only)",
    description="Allows only ADMIN or SUPER_ADMIN to delete a project. EDITORS are forbidden."
)
async def delete_project(
    project_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN"))
):
    existing = await project_repo.get(db, project_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    
    await project_repo.delete(db, project_id)
    await audit_service.log_action(db, "DELETE", "Project", str(project_id), user_id=current_user.id)
    return SuccessResponse(message="Project deleted", data={"id": str(project_id)})
