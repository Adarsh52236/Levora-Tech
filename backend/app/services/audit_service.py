import uuid
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit import AuditLog

logger = logging.getLogger(__name__)

class AuditService:
    async def log_action(
        self,
        db: AsyncSession,
        action: str,
        entity: str,
        entity_id: str | None = None,
        user_id: uuid.UUID | None = None,
        ip_address: str | None = None,
        user_agent: str | None = None,
    ) -> AuditLog:
        audit_entry = AuditLog(
            user_id=user_id,
            action=action,
            entity=entity,
            entity_id=str(entity_id) if entity_id else None,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        db.add(audit_entry)
        await db.commit()
        await db.refresh(audit_entry)
        logger.info(f"[AUDIT] Action: '{action}', Entity: '{entity}', Entity ID: '{entity_id}', User: '{user_id}'")
        return audit_entry

audit_service = AuditService()
