from fastapi import APIRouter
router = APIRouter()
from . import auth, items
router.include_router(auth.router)
router.include_router(items.router)
