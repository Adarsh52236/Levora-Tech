from app.models.base import Base, BaseModel
from app.models.service import Service
from app.models.project import Project
from app.models.testimonial import Testimonial
from app.models.contact import ContactSubmission, ContactStatus
from app.models.admin import AdminUser
from app.models.audit import AuditLog
from app.models.newsletter import NewsletterSubscriber

# This allows Alembic to easily import all models by just importing app.models
__all__ = [
    "Base",
    "BaseModel",
    "Service",
    "Project",
    "Testimonial",
    "ContactSubmission",
    "ContactStatus",
    "AdminUser",
    "AuditLog",
    "NewsletterSubscriber"
]
