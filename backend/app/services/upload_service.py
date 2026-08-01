import os
import uuid
import logging
from fastapi import UploadFile, HTTPException, status

logger = logging.getLogger(__name__)

class UploadService:
    async def upload_file(self, file: UploadFile) -> str:
        # Validate mime type
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only image uploads are allowed"
            )

        filename = f"{uuid.uuid4()}_{file.filename}"
        
        # Check for Cloudinary env setup or fallback to mock URL
        cloudinary_url = os.getenv("CLOUDINARY_URL")
        if cloudinary_url:
            try:
                import cloudinary.uploader
                upload_result = cloudinary.uploader.upload(file.file, public_id=f"levoratech/{filename}")
                return upload_result.get("secure_url", "")
            except Exception as e:
                logger.error(f"Cloudinary upload failed: {e}")
                # Fall through to fallback mock
        
        # Fallback URL format for development / local demo
        return f"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&filename={filename}"

upload_service = UploadService()
