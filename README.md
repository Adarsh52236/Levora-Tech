<div align="center">
  <img src="public/images/brand/levora-tab-logo.svg" alt="Levora Tech Logo" width="120" height="120" />
  <h1>🚀 Levora Tech Platform</h1>
  <p><strong>A Modern, High-Performance Web Agency & Portfolio Platform</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=flat&logo=postgresql)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
</div>

<br />

Welcome to the **Levora Tech** official codebase! This project powers a full-stack, state-of-the-art web agency platform designed to showcase services, portfolios, and client testimonials while handling real-time contact submissions and newsletter subscriptions.

## ✨ Key Features

- **Dynamic Portfolio Showcase:** Beautifully integrated project galleries with fluid animations.
- **Client Testimonials:** Auto-advancing client reviews with elegant hover-to-pause interactions.
- **Newsletter & Contact Hub:** Fully functional contact forms and newsletter subscriptions communicating with a robust backend API.
- **Modern UI/UX:** Built with **Tailwind CSS** and **Framer Motion** for a seamless, aesthetic, and fully responsive user experience.
- **High-Performance Backend:** Driven by **FastAPI** and **asyncpg** for lightning-fast database interactions.
- **Production Ready:** Pre-configured for deployment on **Vercel** (Frontend) and **Render** (Backend), with a **Supabase** PostgreSQL database.

---

## 🏗️ Architecture Stack

This project is separated into a robust dual-architecture structure:

### 🎨 Frontend (`/src`)
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API Client:** Custom resilient fetch wrapper with automatic retries.

### ⚙️ Backend (`/backend`)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11)
- **Database ORM:** [SQLAlchemy](https://www.sqlalchemy.org/) 2.0 (Async)
- **Database Engine:** PostgreSQL via [asyncpg](https://magicstack.github.io/asyncpg/current/)
- **Migrations:** [Alembic](https://alembic.sqlalchemy.org/)
- **Authentication:** JWT (JSON Web Tokens) & bcrypt hashing

---

## 🚀 Getting Started Locally

To run Levora Tech on your local machine, follow these steps:

### 1. Database Setup
You will need a PostgreSQL database. You can run one locally or create a free project on [Supabase](https://supabase.com/).
Make sure you have your connection string ready.

### 2. Backend Setup
Navigate to the backend directory and set up your Python environment:

```bash
cd backend
python -m venv venv

# Activate the virtual environment
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `/backend` folder based on `.env.example` and add your database URL:
```env
DATABASE_URL=postgresql+asyncpg://user:password@host:port/dbname
JWT_SECRET=your_super_secret_jwt_key
```

Run the backend server:
```bash
uvicorn main:app --reload
```
*The API will be available at `http://localhost:8000`.*

### 3. Frontend Setup
Open a new terminal window and install the Node dependencies in the root directory:

```bash
npm install
```

Create a `.env.local` file in the root folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the Next.js development server:
```bash
npm run dev
```
*The website will be available at `http://localhost:3000`.*

---

## ☁️ Deployment Guides

### Deploying the Backend (Render)
1. Create a New Web Service on Render pointing to your GitHub repo.
2. **Root Directory:** `backend`
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. *Note: Ensure your Render Environment Variables include `PYTHON_VERSION=3.11.0` and your `DATABASE_URL` uses the Connection Pooling URL if utilizing Supabase.*

### Deploying the Frontend (Vercel)
1. Create a New Project on Vercel and import your GitHub repo.
2. Leave the Framework Preset as **Next.js**.
3. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed Render backend (e.g., `https://your-backend.onrender.com/api/v1`).
4. Click Deploy!

---

<div align="center">
  <p>Built with ❤️ by Levora Tech.</p>
</div>
