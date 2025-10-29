from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    database_url: str = "sqlite:///./app.db"
    jwt_private_key: str = os.getenv("JWT_PRIVATE_KEY", "keys/jwt_private.pem")
    jwt_public_key: str = os.getenv("JWT_PUBLIC_KEY", "keys/jwt_public.pem")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    allowed_origins: str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")

settings = Settings()
