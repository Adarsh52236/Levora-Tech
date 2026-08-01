from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.service import service_repo
from app.schemas.service import ServiceResponse

class ServiceService:
    async def get_services(self, db: AsyncSession) -> List[ServiceResponse]:
        services = await service_repo.get_active(db)
        return [ServiceResponse.model_validate(s) for s in services]

service_service = ServiceService()
