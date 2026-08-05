from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any

from app.database.session import get_db
from app.models.newsletter import NewsletterSubscriber
from app.schemas.newsletter import NewsletterSubscriberCreate, NewsletterSubscriberResponse

router = APIRouter()

@router.post("/subscribe", response_model=NewsletterSubscriberResponse, status_code=status.HTTP_201_CREATED)
async def subscribe_newsletter(
    subscriber_in: NewsletterSubscriberCreate,
    session: AsyncSession = Depends(get_db)
) -> Any:
    """
    Subscribe to the newsletter.
    """
    # Check if subscriber already exists
    result = await session.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == subscriber_in.email)
    )
    existing_subscriber = result.scalar_one_or_none()
    
    if existing_subscriber:
        # If they exist and are inactive, reactivate them
        if not existing_subscriber.is_active:
            existing_subscriber.is_active = True
            await session.commit()
            await session.refresh(existing_subscriber)
            return existing_subscriber
            
        # If they exist and are active, it's a conflict
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already subscribed to the newsletter"
        )
        
    # Create new subscriber
    db_subscriber = NewsletterSubscriber(email=subscriber_in.email)
    session.add(db_subscriber)
    await session.commit()
    await session.refresh(db_subscriber)
    
    return db_subscriber
