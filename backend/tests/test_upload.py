import pytest
import io
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.admin import AdminUser
from app.core.security import get_password_hash, create_access_token

@pytest.mark.asyncio
async def test_upload_image_success(client: AsyncClient, db_session: AsyncSession):
    user = AdminUser(name="Admin", email="upload_admin@test.com", password_hash=get_password_hash("p"), role="ADMIN", is_active=True)
    db_session.add(user)
    await db_session.commit()

    token = create_access_token(subject=user.id)
    
    file_bytes = io.BytesIO(b"fake image data")
    files = {"file": ("test.png", file_bytes, "image/png")}

    res = await client.post("/api/v1/upload", files=files, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 201
    assert "url" in res.json()["data"]

@pytest.mark.asyncio
async def test_upload_non_image_fails(client: AsyncClient, db_session: AsyncSession):
    user = AdminUser(name="Admin", email="upload_admin2@test.com", password_hash=get_password_hash("p"), role="ADMIN", is_active=True)
    db_session.add(user)
    await db_session.commit()

    token = create_access_token(subject=user.id)
    
    file_bytes = io.BytesIO(b"some text content")
    files = {"file": ("test.txt", file_bytes, "text/plain")}

    res = await client.post("/api/v1/upload", files=files, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 400
