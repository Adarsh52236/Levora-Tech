# Levora Tech API Reference

## Public Endpoints
- `GET /health/live` — Application process liveness probe
- `GET /health/ready` — Application & DB readiness probe
- `GET /metrics` — Prometheus telemetry output
- `GET /api/v1/services` — Active services list
- `GET /api/v1/projects` — Portfolio projects (featured first)
- `GET /api/v1/projects/{slug}` — Single project lookup
- `GET /api/v1/testimonials` — Testimonials (featured first)
- `POST /api/v1/contact` — Submit contact enquiry

## Admin & Auth Endpoints
- `POST /api/v1/auth/login` — Login
- `POST /api/v1/auth/refresh` — Refresh access token
- `GET /api/v1/auth/me` — Current user profile
- `POST /api/v1/upload` — Upload media image
- `POST /api/v1/admin/services` — Create service (ADMIN, EDITOR)
- `PUT /api/v1/admin/services/{id}` — Update service (ADMIN, EDITOR)
- `DELETE /api/v1/admin/services/{id}` — Delete service (ADMIN only)
