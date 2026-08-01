from typing import Optional
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactSubmissionCreate, ContactSubmissionUpdate

class ContactSubmissionRepository(BaseRepository[ContactSubmission, ContactSubmissionCreate, ContactSubmissionUpdate]):
    async def find_recent_duplicate(
        self, db: AsyncSession, email: str, message: str, since: datetime
    ) -> Optional[ContactSubmission]:
        result = await db.execute(
            select(self.model)
            .where(
                self.model.email == email,
                self.model.message == message,
                self.model.created_at >= since
            )
        )
        return result.scalars().first()

contact_repo = ContactSubmissionRepository(ContactSubmission)
