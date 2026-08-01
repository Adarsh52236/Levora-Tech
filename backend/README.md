# Levora Tech - Backend API

This is the FastAPI backend foundation for Levora Tech.

## Tech Stack
- Python 3.13
- FastAPI
- SQLAlchemy 2.0 (Async)
- PostgreSQL (asyncpg)
- Alembic
- Pydantic v2
- Docker

## Folder Structure
```
backend/
├── app/
│   ├── api/          # API Routers
│   ├── core/         # Config, exceptions, standard responses
│   ├── database/     # SQLAlchemy engine and session management
│   ├── middleware/   # Logging, Timing, CORS, etc.
│   ├── models/       # SQLAlchemy models (Coming in Sprint 2)
│   ├── repositories/ # Database access layer (Coming in Sprint 2)
│   ├── schemas/      # Pydantic schemas (Coming in Sprint 2)
│   ├── services/     # Business logic (Coming in Sprint 2)
│   └── utils/        # Helper functions
├── alembic/          # Database migrations
├── tests/            # Pytest suite
├── main.py           # FastAPI application factory
├── docker-compose.yml
├── Dockerfile
└── requirements.txt
```

## Installation (Local without Docker)

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Setup Environment Variables:
   Copy `.env.example` to `.env` and configure your local PostgreSQL database url.

## Running Locally

```bash
uvicorn main:app --reload --port 8000
```
- Swagger UI: `http://localhost:8000/api/v1/docs`
- ReDoc: `http://localhost:8000/api/v1/redoc`
- Health Check: `http://localhost:8000/api/v1/health`

## Running via Docker

```bash
# Starts both the FastAPI app and a local PostgreSQL instance
docker compose up -d --build
```

## Database Migrations (Alembic)

```bash
# Generate a new migration
alembic revision --autogenerate -m "Initial tables"

# Apply migrations
alembic upgrade head
```

## Running Tests

```bash
pytest
```

## Standardized Responses
Every endpoint returns JSON in this format:
```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```
If `success` is `false`, `data` is omitted and `errors: {}` may be present containing field-level validation errors.
