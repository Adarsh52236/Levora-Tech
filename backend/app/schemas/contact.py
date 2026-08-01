from typing import Optional
from pydantic import EmailStr
from app.schemas.base import BaseSchema, BaseDBModel
from app.models.contact import ContactStatus

class ContactSubmissionBase(BaseSchema):
    name: str
    email: EmailStr
    service: str
    message: str
    status: ContactStatus = ContactStatus.NEW

class ContactSubmissionCreate(BaseSchema):
    name: str
    email: EmailStr
    service: str
    message: str

class ContactSubmissionUpdate(BaseSchema):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    service: Optional[str] = None
    message: Optional[str] = None
    status: Optional[ContactStatus] = None

class ContactSubmissionResponse(ContactSubmissionBase, BaseDBModel):
    pass
