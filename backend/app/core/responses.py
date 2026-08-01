from typing import Any, Dict, Generic, Optional, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")

class BaseResponse(BaseModel, Generic[T]):
    success: bool
    message: str = ""
    data: Optional[T] = None
    errors: Optional[Dict[str, Any]] = None

class SuccessResponse(BaseResponse[T], Generic[T]):
    success: bool = True

class ErrorResponse(BaseResponse[Any]):
    success: bool = False
    errors: Dict[str, Any] = Field(default_factory=dict)
