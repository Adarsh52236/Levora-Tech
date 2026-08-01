# Production Deployment & Release Guide

This playbook outlines the exact step-by-step procedure to deploy the Levora Tech Platform to production.

---

## 1. Supabase PostgreSQL Setup
1. Log in to [Supabase](https://supabase.com) and create a new project `levora-tech-db`.
2. Copy the Connection String under **Project Settings -> Database**:
   ```text
   postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```

---

## 2. Railway Backend Deployment
1. Log in to [Railway](https://railway.app) and create a **New Service from GitHub Repository**.
2. Select your repository and set the **Root Directory** to `backend`.
3. Configure the **Environment Variables**:
   - `DATABASE_URL`: *(Your Supabase connection string)*
   - `JWT_SECRET`: *(A secure 64-character random string)*
   - `FRONTEND_URL`: `https://levora.tech` (or your Vercel deployment URL)
   - `CLOUDINARY_URL`: `cloudinary://[API_KEY]:[API_SECRET]@[CLOUD_NAME]`
   - `DEBUG`: `False`
4. Once deployed, Railway will provide a public URL: `https://levoratech-backend.up.railway.app`.
5. Run Alembic migrations against production database:
   ```bash
   cd backend
   DATABASE_URL="..." alembic upgrade head
   ```
6. Run Seed script:
   ```bash
   cd backend
   DATABASE_URL="..." python -m app.database.seed
   ```

---

## 3. Vercel Frontend Deployment
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://levoratech-backend.up.railway.app`
4. Click **Deploy**.

---

## 4. Domain & SSL Setup (`levora.tech`)
1. In Vercel, navigate to **Project Settings -> Domains**.
2. Add `levora.tech` and `www.levora.tech`.
3. Update your DNS settings at your registrar:
   - `A Record`: `@` -> `76.76.21.21`
   - `CNAME Record`: `www` -> `cname.vercel-dns.com`
4. Vercel will automatically provision SSL certificates.

---

## 5. Monitoring & Observability Integration

### Sentry Exception Tracking
1. Create a Python project on [Sentry](https://sentry.io).
2. Set `SENTRY_DSN` in Railway environment variables.

### Prometheus & Grafana
1. Configure Prometheus to scrape `https://levoratech-backend.up.railway.app/metrics` every 15 seconds.
2. Import standard FastAPI/Prometheus dashboard into Grafana.
