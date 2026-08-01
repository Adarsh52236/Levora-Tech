from sqlalchemy import String, Text, Integer, Boolean, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import BaseModel

class Testimonial(BaseModel):
    __tablename__ = "testimonials"

    client_name: Mapped[str] = mapped_column(String(255), nullable=False)
    company: Mapped[str] = mapped_column(String(255), nullable=False)
    designation: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)

    __table_args__ = (
        CheckConstraint("rating >= 1 AND rating <= 5", name="check_rating_range"),
    )
