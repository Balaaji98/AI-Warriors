from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from app.db.session import get_session
from sqlmodel import select
from app.models import Item, Thresholds
from app.services.classifier import abc_classify, compute_total_values
from app.core.config import settings

router = APIRouter(prefix='/agent', tags=['agent'])

class AgentReq(BaseModel):
    explain: Optional[bool] = False
    use_external: Optional[bool] = False

@router.post('/classify')
def classify_with_agent(req: AgentReq, session=Depends(get_session)):
    items = session.exec(select(Item)).all()
    th = session.exec(select(Thresholds)).first()
    items = compute_total_values(items)
    items_classed = abc_classify(items, th)
    # persist categories
    for it in items_classed:
        if it.id:
            db_it = session.get(Item, it.id)
            db_it.category = it.category
            db_it.total_value = it.total_value
            session.add(db_it)
    session.commit()
    response = {'status':'ok', 'count': len(items_classed)}
    if req.explain:
        # provide simple text explanations for top items
        top = sorted(items_classed, key=lambda x: x.total_value, reverse=True)[:5]
        response['explanations'] = [f"{t.sku} ({t.name}): value ₹{t.total_value}. Classified as {t.category}" for t in top]
    return response
