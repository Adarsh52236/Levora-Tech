# Environment Configuration

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `APP_NAME` | string | `Levora Tech API` | Service title |
| `DEBUG` | boolean | `False` | Enable debug logs |
| `DATABASE_URL` | string | **Required** | Postgres async connection string |
| `JWT_SECRET` | string | **Required** | Secret key for JWT signatures |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | integer | `30` | Access token lifespan |
| `REFRESH_TOKEN_EXPIRE_DAYS` | integer | `7` | Refresh token lifespan |
| `FRONTEND_URL` | string | `http://localhost:3000` | Allowed CORS origin |
| `CLOUDINARY_URL` | string | Optional | Cloudinary API connection string |
