import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.admin import AdminUser
from app.core.security import get_password_hash, create_access_token

@pytest.mark.asyncio
async def test_login_success(client: AsyncClient, db_session: AsyncSession):
    user = AdminUser(
        name="Admin",
        email="admin@test.com",
        password_hash=get_password_hash("password123"),
        role="ADMIN",
        is_active=True
    )
    db_session.add(user)
    await db_session.commit()

    response = await client.post("/api/v1/auth/login", json={"email": "admin@test.com", "password": "password123"})
    assert response.status_code == 200
    data = response.json()["data"]
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["user"]["email"] == "admin@test.com"

@pytest.mark.asyncio
async def test_login_invalid_password(client: AsyncClient, db_session: AsyncSession):
    response = await client.post("/api/v1/auth/login", json={"email": "admin@test.com", "password": "wrongpassword"})
    assert response.status_code == 401
    assert response.json()["success"] is False

@pytest.mark.asyncio
async def test_get_me_unauthorized(client: AsyncClient):
    response = await client.get("/api/v1/auth/me")
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_get_me_success(client: AsyncClient, db_session: AsyncSession):
    user = AdminUser(
        name="Test User",
        email="me@test.com",
        password_hash=get_password_hash("pass"),
        role="ADMIN",
        is_active=True
    )
    db_session.add(user)
    await db_session.commit()

    token = create_access_token(subject=user.id)
    response = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["data"]["email"] == "me@test.com"
