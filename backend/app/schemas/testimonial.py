from typing import Optional
from pydantic import Field
from app.schemas.base import BaseSchema, BaseDBModel

class TestimonialBase(BaseSchema):
    client_name: str
    company: str
    designation: str
    avatar_url: Optional[str] = None
    rating: int = Field(ge=1, le=5)
    message: str
    featured: bool = False

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseSchema):
    client_name: Optional[str] = None
    company: Optional[str] = None
    designation: Optional[str] = None
    avatar_url: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    message: Optional[str] = None
    featured: Optional[bool] = None

class TestimonialResponse(TestimonialBase, BaseDBModel):
    pass
