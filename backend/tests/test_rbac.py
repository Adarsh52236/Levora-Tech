import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.admin import AdminUser
from app.models.service import Service
from app.core.security import get_password_hash, create_access_token

@pytest.mark.asyncio
async def test_editor_can_create_service(client: AsyncClient, db_session: AsyncSession):
    editor = AdminUser(name="Editor", email="editor@test.com", password_hash=get_password_hash("p"), role="EDITOR", is_active=True)
    db_session.add(editor)
    await db_session.commit()

    token = create_access_token(subject=editor.id)
    payload = {
        "title": "New Service",
        "slug": "new-service",
        "short_description": "Short",
        "description": "Long description",
        "icon": "Globe"
    }
    res = await client.post("/api/v1/admin/services", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 201

@pytest.mark.asyncio
async def test_editor_cannot_delete_service(client: AsyncClient, db_session: AsyncSession):
    editor = AdminUser(name="Editor2", email="editor2@test.com", password_hash=get_password_hash("p"), role="EDITOR", is_active=True)
    service = Service(title="S", slug="s-slug", short_description="s", description="s", icon="Globe")
    db_session.add_all([editor, service])
    await db_session.commit()

    token = create_access_token(subject=editor.id)
    res = await client.delete(f"/api/v1/admin/services/{service.id}", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 403
    assert "not authorized" in res.json()["message"]

@pytest.mark.asyncio
async def test_admin_can_delete_service(client: AsyncClient, db_session: AsyncSession):
    admin = AdminUser(name="Admin", email="admin_del@test.com", password_hash=get_password_hash("p"), role="ADMIN", is_active=True)
    service = Service(title="S2", slug="s2-slug", short_description="s", description="s", icon="Globe")
    db_session.add_all([admin, service])
    await db_session.commit()

    token = create_access_token(subject=admin.id)
    res = await client.delete(f"/api/v1/admin/services/{service.id}", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
