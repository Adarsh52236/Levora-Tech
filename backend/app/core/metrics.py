from collections import defaultdict
import time
from typing import Dict, Any

class PrometheusMetricsCollector:
    def __init__(self):
        self.total_requests = 0
        self.status_counters: Dict[int, int] = defaultdict(int)
        self.path_counters: Dict[str, int] = defaultdict(int)
        self.auth_failures = 0
        self.total_duration_ms = 0.0

    def record_request(self, method: str, path: str, status_code: int, duration_ms: float):
        self.total_requests += 1
        self.status_counters[status_code] += 1
        self.path_counters[f"{method} {path}"] += 1
        self.total_duration_ms += duration_ms

        if status_code in (401, 403):
            self.auth_failures += 1

    def generate_prometheus_format(self) -> str:
        avg_latency = (self.total_duration_ms / self.total_requests) if self.total_requests > 0 else 0
        lines = [
            "# HELP http_requests_total Total HTTP requests handled.",
            "# TYPE http_requests_total counter",
            f"http_requests_total {self.total_requests}",
            "",
            "# HELP http_auth_failures_total Total authentication/authorization failures.",
            "# TYPE http_auth_failures_total counter",
            f"http_auth_failures_total {self.auth_failures}",
            "",
            "# HELP http_response_duration_ms_avg Average HTTP response duration in milliseconds.",
            "# TYPE http_response_duration_ms_avg gauge",
            f"http_response_duration_ms_avg {avg_latency:.2f}",
            ""
        ]

        for code, count in self.status_counters.items():
            lines.append(f'http_requests_by_status{{status="{code}"}} {count}')

        return "\n".join(lines) + "\n"

metrics_collector = PrometheusMetricsCollector()
