# Deployment Guide

## Docker Container Deployment
```bash
cd backend
docker build -t levoratech-backend:1.0.0 .
docker run -d -p 8000:8000 --env-file .env levoratech-backend:1.0.0
```

## Cloud Platform Deployment (Railway / Vercel)
1. Provision PostgreSQL database (Supabase or Railway Postgres).
2. Set environment variables (`DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`).
3. Apply Alembic migrations: `alembic upgrade head`.
4. Deploy container using root directory `backend/`.
