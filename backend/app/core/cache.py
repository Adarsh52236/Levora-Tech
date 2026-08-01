import time
from typing import Any, Dict, Optional, Tuple, List

class InMemoryTTLCache:
    def __init__(self, default_ttl: int = 300):
        # key -> (value, expiry_timestamp)
        self._store: Dict[str, Tuple[Any, float]] = {}
        self.default_ttl = default_ttl

    def get(self, key: str) -> Optional[Any]:
        if key not in self._store:
            return None
        value, expiry = self._store[key]
        if time.time() > expiry:
            del self._store[key]
            return None
        return value

    def set(self, key: str, value: Any, ttl: Optional[int] = None):
        expire_at = time.time() + (ttl if ttl is not None else self.default_ttl)
        self._store[key] = (value, expire_at)

    def invalidate_prefix(self, prefix: str):
        keys_to_del = [k for k in self._store if k.startswith(prefix)]
        for k in keys_to_del:
            del self._store[k]

    def clear(self):
        self._store.clear()

cache = InMemoryTTLCache(default_ttl=300)
