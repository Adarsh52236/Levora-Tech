import uuid
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate, TestimonialResponse
from app.repositories.testimonial import testimonial_repo
from app.api.deps import get_current_user, require_roles
from app.models.admin import AdminUser
from app.services.audit_service import audit_service

router = APIRouter()

@router.post(
    "/admin/testimonials",
    response_model=SuccessResponse[TestimonialResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create Testimonial (Admin/Editor)",
    description="Allows ADMIN, SUPER_ADMIN, or EDITOR to create a new testimonial."
)
async def create_testimonial(
    data: TestimonialCreate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN", "EDITOR"))
):
    testimonial = await testimonial_repo.create(db, data)
    await audit_service.log_action(db, "CREATE", "Testimonial", str(testimonial.id), user_id=current_user.id)
    return SuccessResponse(message="Testimonial created", data=TestimonialResponse.model_validate(testimonial))

@router.put(
    "/admin/testimonials/{testimonial_id}",
    response_model=SuccessResponse[TestimonialResponse],
    summary="Update Testimonial (Admin/Editor)",
    description="Allows ADMIN, SUPER_ADMIN, or EDITOR to update an existing testimonial."
)
async def update_testimonial(
    testimonial_id: uuid.UUID,
    data: TestimonialUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN", "EDITOR"))
):
    existing = await testimonial_repo.get(db, testimonial_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    updated = await testimonial_repo.update(db, existing, data)
    await audit_service.log_action(db, "UPDATE", "Testimonial", str(updated.id), user_id=current_user.id)
    return SuccessResponse(message="Testimonial updated", data=TestimonialResponse.model_validate(updated))

@router.delete(
    "/admin/testimonials/{testimonial_id}",
    response_model=SuccessResponse[dict],
    summary="Delete Testimonial (Admin Only)",
    description="Allows only ADMIN or SUPER_ADMIN to delete a testimonial. EDITORS are forbidden."
)
async def delete_testimonial(
    testimonial_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(require_roles("ADMIN"))
):
    existing = await testimonial_repo.get(db, testimonial_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    await testimonial_repo.delete(db, testimonial_id)
    await audit_service.log_action(db, "DELETE", "Testimonial", str(testimonial_id), user_id=current_user.id)
    return SuccessResponse(message="Testimonial deleted", data={"id": str(testimonial_id)})
