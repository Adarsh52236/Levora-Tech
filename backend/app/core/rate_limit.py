import time
from collections import defaultdict
from typing import Dict, List
from fastapi import Request, HTTPException, status

class SlidingWindowRateLimiter:
    def __init__(self):
        # ip -> list of timestamps
        self.history: Dict[str, List[float]] = defaultdict(list)

    def check_rate_limit(self, ip: str, max_requests: int, window_seconds: int):
        now = time.time()
        cutoff = now - window_seconds
        
        # Clean timestamps older than window
        timestamps = [ts for ts in self.history[ip] if ts > cutoff]
        self.history[ip] = timestamps

        if len(timestamps) >= max_requests:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded. Maximum {max_requests} requests per {window_seconds} seconds."
            )

        self.history[ip].append(now)

rate_limiter = SlidingWindowRateLimiter()

def RateLimit(max_requests: int = 10, window_seconds: int = 60):
    async def _dependency(request: Request):
        ip = request.client.host if request.client else "unknown"
        rate_limiter.check_rate_limit(f"{request.url.path}:{ip}", max_requests, window_seconds)
    return _dependency
