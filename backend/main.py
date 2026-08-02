from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy import select, delete

from app.core.config import settings
from app.api.v1.router import api_router
from app.middleware.logging import RequestLoggingMiddleware
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.core.exceptions import (
    validation_exception_handler,
    http_exception_handler,
    global_exception_handler,
)
from app.api.v1.endpoints.health import liveness_check, readiness_check
from app.api.v1.endpoints.metrics import get_metrics
from app.database.session import engine, SessionLocal
from app.models import Base, Service, Project, Testimonial

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed initial data if database is empty or missing services
    async with SessionLocal() as session:
        res = await session.execute(select(Service))
        existing_services = res.scalars().all()
        if len(existing_services) < 6:
            await session.execute(delete(Service))
            initial_services = [
                Service(
                    title="Website Development",
                    slug="website-development",
                    short_description="High-performance, modern websites designed to convert visitors.",
                    description="Custom web development built with Next.js, TypeScript, and modern CSS. Fast loading, responsive, and SEO-optimized.",
                    icon="Globe",
                    display_order=1,
                    is_active=True
                ),
                Service(
                    title="Web Applications",
                    slug="web-applications",
                    short_description="Scalable SaaS platforms and web apps engineered with precision.",
                    description="Full-stack web application development. Clean architectures, robust backend APIs, and real-time user experiences.",
                    icon="LayoutGrid",
                    display_order=2,
                    is_active=True
                ),
                Service(
                    title="Mobile Applications",
                    slug="mobile-applications",
                    short_description="Cross-platform iOS and Android apps crafted for smooth user experiences.",
                    description="Native and cross-platform mobile apps using React Native and SwiftUI.",
                    icon="Smartphone",
                    display_order=3,
                    is_active=True
                ),
                Service(
                    title="iOS Applications",
                    slug="ios-applications",
                    short_description="Native iOS apps built with Swift and SwiftUI for Apple devices.",
                    description="High-end iOS application development leveraging core Apple frameworks, Metal, and CloudKit.",
                    icon="Apple",
                    display_order=4,
                    is_active=True
                ),
                Service(
                    title="UI/UX Design",
                    slug="ui-ux-design",
                    short_description="User-centered interfaces and design systems built for modern products.",
                    description="Comprehensive UI/UX design services including research, wireframing, interactive prototyping, and design systems.",
                    icon="PenTool",
                    display_order=5,
                    is_active=True
                ),
                Service(
                    title="Custom Software",
                    slug="custom-software",
                    short_description="Tailored software solutions for complex enterprise challenges.",
                    description="Custom software engineering, microservices, cloud infrastructure, and enterprise system integration.",
                    icon="Code2",
                    display_order=6,
                    is_active=True
                ),
            ]
            session.add_all(initial_services)

        res_proj = await session.execute(select(Project))
        if not res_proj.scalars().all():
            initial_projects = [
                # Featured project (shown at top, excluded from grid)
                Project(
                    title="Fintech Analytics Platform",
                    slug="fintech-analytics",
                    description="Real-time financial analytics dashboard handling high-frequency market data with sub-millisecond latency and interactive visualisations.",
                    industry="Web",
                    client_name="NovaScale",
                    cover_image="/images/projects/saas-landing.svg",
                    technologies=["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
                    featured=True,
                    display_order=1
                ),
                # Web projects
                Project(
                    title="SaaS Operations Hub",
                    slug="saas-ops-hub",
                    description="Multi-tenant SaaS platform with role-based access, billing integrations, and a real-time activity feed for distributed teams.",
                    industry="Web",
                    client_name="Orbitly",
                    cover_image="/images/projects/saas-landing.svg",
                    technologies=["Next.js", "Prisma", "Stripe", "Redis"],
                    featured=False,
                    display_order=2
                ),
                Project(
                    title="E-Commerce Storefront",
                    slug="ecommerce-storefront",
                    description="High-conversion e-commerce experience with personalised recommendations, headless CMS, and an optimised checkout flow.",
                    industry="Web",
                    client_name="LuxeShop",
                    cover_image="/images/projects/saas-landing.svg",
                    technologies=["Next.js", "Sanity CMS", "Shopify API", "TypeScript"],
                    featured=False,
                    display_order=3
                ),
                # Mobile projects
                Project(
                    title="HealthTech Patient Portal",
                    slug="healthtech-portal",
                    description="HIPAA-compliant telemedicine and patient scheduling application with real-time video consultations.",
                    industry="Mobile",
                    client_name="PulseHealth",
                    cover_image="/images/projects/mobile-booking.svg",
                    technologies=["React Native", "Python", "WebSockets"],
                    featured=False,
                    display_order=4
                ),
                Project(
                    title="Fitness Tracking App",
                    slug="fitness-tracker",
                    description="AI-powered personal fitness companion with workout planning, nutrition tracking, and wearable device integration.",
                    industry="Mobile",
                    client_name="FitCore",
                    cover_image="/images/projects/mobile-booking.svg",
                    technologies=["React Native", "Swift", "CoreML", "Firebase"],
                    featured=False,
                    display_order=5
                ),
                Project(
                    title="Real-Estate Marketplace",
                    slug="real-estate-marketplace",
                    description="Cross-platform property marketplace with AR property previews, mortgage calculators, and agent live-chat.",
                    industry="Mobile",
                    client_name="EstateIQ",
                    cover_image="/images/projects/mobile-booking.svg",
                    technologies=["Flutter", "FastAPI", "ARKit", "Mapbox"],
                    featured=False,
                    display_order=6
                ),
                # Platform projects
                Project(
                    title="DevOps Observability Platform",
                    slug="devops-observability",
                    description="Unified observability platform aggregating logs, metrics, and traces across microservices with smart alerting.",
                    industry="Platform",
                    client_name="CloudNine",
                    cover_image="/images/projects/saas-landing.svg",
                    technologies=["Go", "Prometheus", "Grafana", "Kubernetes"],
                    featured=False,
                    display_order=7
                ),
                Project(
                    title="AI Content Pipeline",
                    slug="ai-content-pipeline",
                    description="Automated content generation and moderation platform powered by LLMs with human-in-the-loop review workflows.",
                    industry="Platform",
                    client_name="Contentify",
                    cover_image="/images/projects/saas-landing.svg",
                    technologies=["Python", "LangChain", "OpenAI", "Celery"],
                    featured=False,
                    display_order=8
                ),
            ]
            session.add_all(initial_projects)

        res_test = await session.execute(select(Testimonial))
        if not res_test.scalars().all():
            initial_testimonials = [
                Testimonial(
                    client_name="Sarah Jenkins",
                    company="NovaScale",
                    designation="CTO",
                    avatar_url="",
                    rating=5,
                    message="Levora Tech transformed our product vision into a high-performance web platform in record time. Exceptional craft.",
                    featured=True
                ),
                Testimonial(
                    client_name="David Chen",
                    company="PulseHealth",
                    designation="Founder & CEO",
                    avatar_url="",
                    rating=5,
                    message="Their engineering rigor and design aesthetic made them a true partner for our flagship patient platform.",
                    featured=True
                )
            ]
            session.add_all(initial_testimonials)

        await session.commit()

    yield

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description="Core API for Levora Tech Services",
        version="1.0.0",
        openapi_url="/api/v1/openapi.json",
        docs_url=None,
        redoc_url=None,
        lifespan=lifespan,
    )

    # Security Headers & Trusted Host
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(
        TrustedHostMiddleware, 
        allowed_hosts=["localhost", "127.0.0.1", "*.up.railway.app", "*.vercel.app", "*"]
    )

    # GZip compression
    app.add_middleware(GZipMiddleware, minimum_size=1000)

    # CORS configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8000", "http://127.0.0.1:8000", settings.FRONTEND_URL],
        allow_origin_regex=r"https?://.*",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Custom Logging Middleware
    app.add_middleware(RequestLoggingMiddleware)

    # Exception Handlers
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(Exception, global_exception_handler)

    # Root Level Health & Telemetry Shortcuts
    app.add_api_route("/health/live", liveness_check, tags=["Health"])
    app.add_api_route("/health/ready", readiness_check, tags=["Health"])
    app.add_api_route("/metrics", get_metrics, tags=["Telemetry"])

    # Custom Docs — unpkg CDN avoids jsdelivr.net blocking.
    # Cache-Control: no-store prevents the browser from caching the Swagger HTML,
    # which was the root cause of stale CDN URLs appearing after code changes.
    @app.get("/api/v1/docs", include_in_schema=False)
    async def custom_swagger_ui() -> HTMLResponse:
        response = get_swagger_ui_html(
            openapi_url="/api/v1/openapi.json",
            title=f"{settings.APP_NAME} - Docs",
            swagger_js_url="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js",
            swagger_css_url="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css",
        )
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        return response

    @app.get("/api/v1/redoc", include_in_schema=False)
    async def custom_redoc() -> HTMLResponse:
        response = get_redoc_html(
            openapi_url="/api/v1/openapi.json",
            title=f"{settings.APP_NAME} - ReDoc",
            redoc_js_url="https://unpkg.com/redoc@latest/bundles/redoc.standalone.js",
        )
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        return response

    # Routers
    app.include_router(api_router, prefix="/api/v1")

    return app

app = create_app()
