from pydantic import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    database_url: str = os.getenv('DATABASE_URL', 'sqlite:///./app.db')
    allowed_origins: List[str] = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173').split(',')

settings = Settings()
