from sqlalchemy import String, Text, Integer, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import BaseModel
from typing import Any, Dict

# Use JSON with PostgreSQL JSONB variant for cross-database compatibility (SQLite + Postgres)
JSONType = JSON().with_variant(JSONB, "postgresql")

class Project(BaseModel):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    industry: Mapped[str] = mapped_column(String(100), nullable=False)
    client_name: Mapped[str] = mapped_column(String(255), nullable=False)
    cover_image: Mapped[str] = mapped_column(String(1024), nullable=False)
    gallery_images: Mapped[list[str]] = mapped_column(JSONType, default=list)
    technologies: Mapped[list[str]] = mapped_column(JSONType, default=list)
    live_url: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    github_url: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0, index=True)
