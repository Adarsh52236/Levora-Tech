import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.service import Service

@pytest.mark.asyncio
async def test_get_services_empty(client: AsyncClient):
    response = await client.get("/api/v1/services")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert json_data["data"] == []

@pytest.mark.asyncio
async def test_get_services_active_only(client: AsyncClient, db_session: AsyncSession):
    s1 = Service(title="Active Service", slug="active-service", short_description="A", description="A", icon="Globe", display_order=1, is_active=True)
    s2 = Service(title="Inactive Service", slug="inactive-service", short_description="I", description="I", icon="Code2", display_order=2, is_active=False)
    db_session.add_all([s1, s2])
    await db_session.commit()

    response = await client.get("/api/v1/services")
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data) == 1
    assert data[0]["slug"] == "active-service"
