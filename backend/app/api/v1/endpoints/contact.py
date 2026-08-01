from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.schemas.contact import ContactSubmissionCreate, ContactSubmissionResponse
from app.services.contact_service import contact_service

router = APIRouter()

@router.post(
    "/contact",
    response_model=SuccessResponse[ContactSubmissionResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contact Request",
    description="Submits a contact form enquiry. Trims inputs, normalizes email, and enforces duplicate rejection within 24 hours."
)
async def submit_contact(
    data: ContactSubmissionCreate,
    db: AsyncSession = Depends(get_db)
):
    result = await contact_service.submit_contact(db, data)
    return SuccessResponse(
        message="Contact submission received successfully",
        data=result
    )
