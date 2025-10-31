from fastapi import APIRouter, Depends
from sqlmodel import select
from app.db.session import get_session
from app.models import Thresholds

router = APIRouter(prefix='/thresholds', tags=['thresholds'])

@router.get('/', response_model=Thresholds)
def get_thresholds(session=Depends(get_session)):
    th = session.exec(select(Thresholds)).first()
    if not th:
        th = Thresholds()
        session.add(th); session.commit(); session.refresh(th)
    return th

@router.post('/', response_model=Thresholds)
def update_thresholds(t: Thresholds, session=Depends(get_session)):
    existing = session.exec(select(Thresholds)).first()
    if not existing:
        session.add(t); session.commit(); session.refresh(t)
        return t
    existing.a_cutoff = t.a_cutoff; existing.b_cutoff = t.b_cutoff
    existing.min_reorder_A = t.min_reorder_A; existing.max_stock_A = t.max_stock_A
    existing.min_reorder_B = t.min_reorder_B; existing.max_stock_B = t.max_stock_B
    existing.min_reorder_C = t.min_reorder_C; existing.max_stock_C = t.max_stock_C
    session.add(existing); session.commit(); session.refresh(existing)
    return existing
