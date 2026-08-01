from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
import logging

from app.repositories.contact import contact_repo
from app.schemas.contact import ContactSubmissionCreate, ContactSubmissionResponse
from app.services.notification_service import notification_service

logger = logging.getLogger(__name__)

class ContactService:
    async def submit_contact(self, db: AsyncSession, data: ContactSubmissionCreate) -> ContactSubmissionResponse:
        # Trim whitespace & normalize email
        trimmed_name = data.name.strip()
        normalized_email = data.email.strip().lower()
        trimmed_service = data.service.strip()
        trimmed_message = data.message.strip()

        # Duplicate check within previous 24 hours
        since_24h = datetime.now(timezone.utc) - timedelta(hours=24)
        duplicate = await contact_repo.find_recent_duplicate(
            db=db,
            email=normalized_email,
            message=trimmed_message,
            since=since_24h
        )

        if duplicate:
            logger.warning(f"Duplicate contact submission rejected for email: {normalized_email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A contact request with the exact same message was submitted in the last 24 hours."
            )

        cleaned_data = ContactSubmissionCreate(
            name=trimmed_name,
            email=normalized_email,
            service=trimmed_service,
            message=trimmed_message
        )

        submission = await contact_repo.create(db, cleaned_data)
        response_data = ContactSubmissionResponse.model_validate(submission)

        # Trigger async notification placeholder
        await notification_service.send_contact_notification(response_data)

        logger.info(f"Contact submission created successfully: {submission.id}")
        return response_data

contact_service = ContactService()
