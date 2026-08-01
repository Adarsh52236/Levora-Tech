from datetime import datetime, timezone
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
import logging

logger = logging.getLogger(__name__)

class HealthService:
    async def check_health(self, db: AsyncSession) -> dict:
        db_status = "disconnected"
        try:
            await db.execute(text("SELECT 1"))
            db_status = "connected"
        except Exception as e:
            logger.error(f"Health check DB probe failed: {e}")
            db_status = "error"

        return {
            "version": "1.0.0",
            "database": db_status,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

health_service = HealthService()
