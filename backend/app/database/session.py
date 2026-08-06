from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.core.config import settings

# Supabase/Neon provide 'postgresql://' but SQLAlchemy async needs 'postgresql+asyncpg://'
db_url = settings.DATABASE_URL
if db_url.startswith("postgresql://"):
    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
elif db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql+asyncpg://", 1)

from sqlalchemy.pool import NullPool

engine = create_async_engine(
    db_url,
    echo=settings.DEBUG,
    future=True,
    poolclass=NullPool,
    connect_args={"statement_cache_size": 0},
)

SessionLocal = async_sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

from app.models.base import Base

async def get_db():
    async with SessionLocal() as session:
        yield session
