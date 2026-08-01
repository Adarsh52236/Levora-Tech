import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_submit_contact_success(client: AsyncClient):
    payload = {
        "name": "  John Doe  ",
        "email": "JOHN@EXAMPLE.COM  ",
        "service": "Website Development",
        "message": "Hello, I would like to build a website."
    }
    response = await client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    json_data = response.json()
    assert json_data["success"] is True
    assert json_data["data"]["email"] == "john@example.com"
    assert json_data["data"]["name"] == "John Doe"

@pytest.mark.asyncio
async def test_submit_contact_duplicate_rejected(client: AsyncClient):
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "service": "Mobile App",
        "message": "Exact duplicate message text."
    }
    res1 = await client.post("/api/v1/contact", json=payload)
    assert res1.status_code == 201

    res2 = await client.post("/api/v1/contact", json=payload)
    assert res2.status_code == 400
    assert res2.json()["success"] is False
    assert "24 hours" in res2.json()["message"]

@pytest.mark.asyncio
async def test_submit_contact_validation_error(client: AsyncClient):
    payload = {
        "name": "John",
        "email": "not-an-email",
        "service": "Web App",
        "message": "Short"
    }
    response = await client.post("/api/v1/contact", json=payload)
    assert response.status_code == 422
    json_data = response.json()
    assert json_data["success"] is False
    assert "errors" in json_data
