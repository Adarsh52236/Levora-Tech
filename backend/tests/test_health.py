import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_health_check_returns_200(client: AsyncClient):
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["success"] is True
    assert json_data["message"] == "Backend running"
    assert "version" in json_data["data"]
    assert "timestamp" in json_data["data"]
