from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database.session import get_db
from app.core.responses import SuccessResponse

router = APIRouter()

@router.get("/health", response_model=SuccessResponse[dict])
async def health_check(db: AsyncSession = Depends(get_db)):
    db_status = "disconnected"
    try:
        # Simple query to verify database connection
        await db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception:
        db_status = "error"
        
    return SuccessResponse(
        message="Backend running",
        data={
            "version": "1.0.0",
            "database": db_status
        }
    )
