from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID

class NewsletterSubscriberBase(BaseModel):
    email: EmailStr
    is_active: bool = True

class NewsletterSubscriberCreate(BaseModel):
    email: EmailStr

class NewsletterSubscriberResponse(NewsletterSubscriberBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }
