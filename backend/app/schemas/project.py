from typing import Optional, List
from pydantic import Field
from app.schemas.base import BaseSchema, BaseDBModel

class ProjectBase(BaseSchema):
    title: str
    slug: str
    description: str
    industry: str
    client_name: str
    cover_image: str
    gallery_images: List[str] = Field(default_factory=list)
    technologies: List[str] = Field(default_factory=list)
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: bool = False
    display_order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseSchema):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    industry: Optional[str] = None
    client_name: Optional[str] = None
    cover_image: Optional[str] = None
    gallery_images: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: Optional[bool] = None
    display_order: Optional[int] = None

class ProjectResponse(ProjectBase, BaseDBModel):
    pass
