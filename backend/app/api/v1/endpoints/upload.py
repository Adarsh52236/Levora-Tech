from fastapi import APIRouter, Depends, UploadFile, File, status
from app.core.responses import SuccessResponse
from app.services.upload_service import upload_service
from app.api.deps import get_current_user
from app.models.admin import AdminUser

router = APIRouter()

@router.post(
    "/upload",
    response_model=SuccessResponse[dict],
    status_code=status.HTTP_201_CREATED,
    summary="Upload Image Media",
    description="Uploads an image file to Cloudinary / storage media host and returns the image URL."
)
async def upload_image(
    file: UploadFile = File(...),
    current_user: AdminUser = Depends(get_current_user)
):
    image_url = await upload_service.upload_file(file)
    return SuccessResponse(
        message="Image uploaded successfully",
        data={"url": image_url}
    )
