from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
from app.core.metrics import metrics_collector

router = APIRouter()

@router.get(
    "/metrics",
    response_class=PlainTextResponse,
    summary="Prometheus Metrics Endpoint",
    description="Exposes application telemetry and request metrics in standard Prometheus text format."
)
async def get_metrics():
    return metrics_collector.generate_prometheus_format()
