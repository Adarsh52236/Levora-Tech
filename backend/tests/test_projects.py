import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.project import Project

@pytest.mark.asyncio
async def test_get_projects(client: AsyncClient, db_session: AsyncSession):
    p1 = Project(title="P1", slug="p1", description="D1", industry="I1", client_name="C1", cover_image="img1", featured=False, display_order=1)
    p2 = Project(title="P2", slug="p2", description="D2", industry="I2", client_name="C2", cover_image="img2", featured=True, display_order=2)
    db_session.add_all([p1, p2])
    await db_session.commit()

    response = await client.get("/api/v1/projects")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data) == 2
    # Featured should come first
    assert data[0]["slug"] == "p2"

@pytest.mark.asyncio
async def test_get_project_by_slug_success(client: AsyncClient, db_session: AsyncSession):
    p = Project(title="P3", slug="unique-slug", description="D3", industry="I3", client_name="C3", cover_image="img3")
    db_session.add(p)
    await db_session.commit()

    response = await client.get("/api/v1/projects/unique-slug")
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "P3"

@pytest.mark.asyncio
async def test_get_project_by_slug_not_found(client: AsyncClient):
    response = await client.get("/api/v1/projects/non-existent-slug")
    assert response.status_code == 404
    json_data = response.json()
    assert json_data["success"] is False
    assert "not found" in json_data["message"]
