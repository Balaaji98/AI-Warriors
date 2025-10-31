from fastapi import APIRouter
from . import items, thresholds, export, agent

api_router = APIRouter()
api_router.include_router(items.router)
api_router.include_router(thresholds.router)
api_router.include_router(export.router)
api_router.include_router(agent.router)
