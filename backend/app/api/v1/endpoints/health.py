from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.database.session import get_db
from app.core.responses import SuccessResponse
from app.services.health_service import health_service

router = APIRouter()

@router.get(
    "/health",
    response_model=SuccessResponse[dict],
    summary="Backend Health Check",
    description="Probes the database connection and returns system status and ISO8601 timestamp."
)
async def health_check(db: AsyncSession = Depends(get_db)):
    data = await health_service.check_health(db)
    return SuccessResponse(message="Backend running", data=data)

@router.get(
    "/health/live",
    response_model=SuccessResponse[dict],
    summary="Liveness Probe",
    description="Lightweight liveness probe checking if the FastAPI application process is active."
)
async def liveness_check():
    return SuccessResponse(
        message="Application process is live",
        data={"status": "live", "timestamp": datetime.now(timezone.utc).isoformat()}
    )

@router.get(
    "/health/ready",
    response_model=SuccessResponse[dict],
    summary="Readiness Probe",
    description="Probes database connectivity and environment state to ensure application is ready to accept traffic."
)
async def readiness_check(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute(text("SELECT 1"))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connectivity check failed: {str(e)}"
        )
    return SuccessResponse(
        message="Application is ready for traffic",
        data={"status": "ready", "database": "connected", "timestamp": datetime.now(timezone.utc).isoformat()}
    )
