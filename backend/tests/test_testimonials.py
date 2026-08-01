import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.testimonial import Testimonial

@pytest.mark.asyncio
async def test_get_testimonials(client: AsyncClient, db_session: AsyncSession):
    t1 = Testimonial(client_name="Alice", company="A Corp", designation="CEO", rating=5, message="Great", featured=False)
    t2 = Testimonial(client_name="Bob", company="B Corp", designation="CTO", rating=5, message="Awesome", featured=True)
    db_session.add_all([t1, t2])
    await db_session.commit()

    response = await client.get("/api/v1/testimonials")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data) == 2
    assert data[0]["client_name"] == "Bob"  # Featured first
