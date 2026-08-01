import enum
from sqlalchemy import String, Text, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import BaseModel

class ContactStatus(str, enum.Enum):
    NEW = "NEW"
    READ = "READ"
    IN_PROGRESS = "IN_PROGRESS"
    CLOSED = "CLOSED"

class ContactSubmission(BaseModel):
    __tablename__ = "contact_submissions"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    service: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[ContactStatus] = mapped_column(
        SQLEnum(ContactStatus, name="contact_status_enum"), 
        default=ContactStatus.NEW, 
        index=True, 
        nullable=False
    )
