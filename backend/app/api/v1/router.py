from fastapi import APIRouter
from app.api.v1.endpoints import (
    health, 
    services, 
    projects, 
    testimonials, 
    contact, 
    auth, 
    admin_services, 
    admin_projects, 
    admin_testimonials, 
    upload,
    metrics,
    newsletter
)

api_router = APIRouter()

# Public Endpoints
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(services.router, tags=["Services"])
api_router.include_router(projects.router, tags=["Projects"])
api_router.include_router(testimonials.router, tags=["Testimonials"])
api_router.include_router(contact.router, tags=["Contact"])
api_router.include_router(newsletter.router, prefix="/newsletter", tags=["Newsletter"])

# Metrics
api_router.include_router(metrics.router, tags=["Telemetry"])

# Auth Endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# Protected Admin CMS Endpoints
api_router.include_router(admin_services.router, tags=["Admin Content CMS"])
api_router.include_router(admin_projects.router, tags=["Admin Content CMS"])
api_router.include_router(admin_testimonials.router, tags=["Admin Content CMS"])
api_router.include_router(upload.router, tags=["Media Upload"])
