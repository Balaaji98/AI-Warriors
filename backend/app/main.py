from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router as api_router
from app.core.config import settings
from app.core.security import ensure_keys_exist

ensure_keys_exist()

app = FastAPI(title="Competition Template Backend", version="1.0")

origins = settings.allowed_origins.split(",") if settings.allowed_origins else ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get('/health')
def health():
    return {'status':'ok'}
