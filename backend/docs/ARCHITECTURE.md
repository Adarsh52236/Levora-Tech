# Levora Tech Architecture Overview

## Layered System Pattern
```
HTTP Requests
    │
    ▼
Security & Structured Logging Middleware
    │
    ▼
FastAPI Routers (app/api/v1/)
    │
    ▼
Services (Business Logic & Audit Logging)
    │
    ▼
Repositories (SQLAlchemy Async Data Access)
    │
    ▼
PostgreSQL Database
```

## Key Infrastructure Components
1. **Async Engine**: SQLAlchemy 2.0 with `asyncpg`.
2. **Authentication**: JWT Access & Refresh Tokens (bcrypt hashed credentials).
3. **Telemetry**: Prometheus text metrics at `/metrics`.
4. **Caching**: In-memory TTL cache with auto-invalidation on Admin mutations.
5. **Rate Limiting**: Sliding window rate limiter protecting login and upload endpoints.
