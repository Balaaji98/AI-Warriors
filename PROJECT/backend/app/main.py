from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.router import api_router
from .core.config import settings

app = FastAPI(title="ABC Backend for AI Studio Frontend", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get('/health')
def health():
    return {'status':'ok'}

