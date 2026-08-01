# Changelog

All notable changes to the Levora Tech platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-01

### Added
- **Frontend Core**: Complete rebranding from "Ezy IT" to "Levora Tech".
- **Frontend API Integration Layer**: Removed mock data layer (`USE_MOCKS = false`). Added SWR hooks (`useServices`, `useProjects`, `useTestimonials`), Skeleton loaders, and error boundaries with Retry support.
- **Form UX**: Added backend field validation error mapping, submit button disabling, duplicate submission blocking, and auto-resetting.
- **Authentication**: JWT authentication with access/refresh tokens, bcrypt password hashing, `AuthContext` frontend provider, and token rotation.
- **Role-Based Access Control (RBAC)**: Enforced `SUPER_ADMIN`, `ADMIN`, and `EDITOR` roles. Restricted DELETE operations to ADMIN roles only.
- **Backend Architecture**: Layered FastAPI project structure (`app/api`, `app/services`, `app/repositories`, `app/models`, `app/schemas`).
- **Database Persistence Layer**: Async SQLAlchemy 2.0 models for `Service`, `Project`, `Testimonial`, `ContactSubmission`, `AdminUser`, and `AuditLog` with Alembic migrations.
- **Audit Logging**: Automatic action logging for login and content mutations (CREATE, UPDATE, DELETE) with client IP and user agent tracking.
- **Production Engineering**:
  - Structured JSON logging middleware.
  - Security headers (HSTS, CSP, X-Frame-Options, Referrer-Policy).
  - Prometheus telemetry at `GET /metrics`.
  - Liveness (`/health/live`) and readiness (`/health/ready`) probes.
  - In-memory sliding window rate limiting.
  - In-memory TTL caching with automatic invalidation on admin mutations.
  - Multi-stage non-root `Dockerfile` with container `HEALTHCHECK`.
  - Automated CI pipeline (`.github/workflows/ci.yml`).
  - Pytest test suite for public & protected routes.
