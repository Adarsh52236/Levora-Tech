from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.core.responses import ErrorResponse
import logging

logger = logging.getLogger(__name__)

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = {}
    for err in exc.errors():
        # location can be body, query, path, etc. We'll join them.
        loc = ".".join([str(l) for l in err.get("loc", [])])
        if loc.startswith("body."):
            loc = loc[5:]
        errors[loc] = [err.get("msg")]

    return JSONResponse(
        status_code=422,
        content=ErrorResponse(
            message="Validation error",
            errors=errors
        ).model_dump()
    )

async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            message=exc.detail,
        ).model_dump()
    )

async def global_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            message="Internal server error",
        ).model_dump()
    )
