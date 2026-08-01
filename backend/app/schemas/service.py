from typing import Optional
from app.schemas.base import BaseSchema, BaseDBModel

class ServiceBase(BaseSchema):
    title: str
    slug: str
    short_description: str
    description: str
    icon: str
    display_order: int = 0
    is_active: bool = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseSchema):
    title: Optional[str] = None
    slug: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None

class ServiceResponse(ServiceBase, BaseDBModel):
    pass
