import uuid
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from app.repositories.service import service_repo
from app.api.deps import get_current_user, require_roles
from app.models.admin import AdminUser
from app.services.audit_service import audit_service

router = APIRouter()

@router.post(
    "/admin/services",
    response_model=SuccessResponse[ServiceResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create Service (Admin/Editor)",
    description="Allows ADMIN, SUPER_ADMIN, or EDITOR to create a new service."
)
async def create_service(
    data: ServiceCreate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN", "EDITOR"))
):
    service = await service_repo.create(db, data)
    await audit_service.log_action(db, "CREATE", "Service", str(service.id), user_id=current_user.id)
    return SuccessResponse(message="Service created", data=ServiceResponse.model_validate(service))

@router.put(
    "/admin/services/{service_id}",
    response_model=SuccessResponse[ServiceResponse],
    summary="Update Service (Admin/Editor)",
    description="Allows ADMIN, SUPER_ADMIN, or EDITOR to update an existing service."
)
async def update_service(
    service_id: uuid.UUID,
    data: ServiceUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN", "EDITOR"))
):
    existing = await service_repo.get(db, service_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Service not found")
    
    updated = await service_repo.update(db, existing, data)
    await audit_service.log_action(db, "UPDATE", "Service", str(updated.id), user_id=current_user.id)
    return SuccessResponse(message="Service updated", data=ServiceResponse.model_validate(updated))

@router.delete(
    "/admin/services/{service_id}",
    response_model=SuccessResponse[dict],
    summary="Delete Service (Admin Only)",
    description="Allows only ADMIN or SUPER_ADMIN to delete a service. EDITORS are forbidden."
)
async def delete_service(
    service_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN"))
):
    existing = await service_repo.get(db, service_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Service not found")
    
    await service_repo.delete(db, service_id)
    await audit_service.log_action(db, "DELETE", "Service", str(service_id), user_id=current_user.id)
    return SuccessResponse(message="Service deleted", data={"id": str(service_id)})
