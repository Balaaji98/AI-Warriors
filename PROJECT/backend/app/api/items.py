from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import select
from app.db.session import get_session, engine
from app.models import Item
from app.services.classifier import compute_total_values

router = APIRouter(prefix='/items', tags=['items'])

@router.post('/init-db')
def init_db():
    from app.models import SQLModel
    SQLModel.metadata.create_all(engine)
    return {'ok': True}

@router.post('/', response_model=Item)
def create_item(item: Item, session=Depends(get_session)):
    item.total_value = item.quantity * item.unit_cost
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

@router.get('/', response_model=List[Item])
def list_items(session=Depends(get_session)):
    q = select(Item)
    return session.exec(q).all()

@router.get('/{item_id}', response_model=Item)
def get_item(item_id: int, session=Depends(get_session)):
    it = session.get(Item, item_id)
    if not it:
        raise HTTPException(status_code=404, detail='Not found')
    return it

@router.put('/{item_id}', response_model=Item)
def update_item(item_id: int, item: Item, session=Depends(get_session)):
    db = session.get(Item, item_id)
    if not db:
        raise HTTPException(status_code=404, detail='Not found')
    db.name = item.name
    db.quantity = item.quantity
    db.unit_cost = item.unit_cost
    db.total_value = db.quantity * db.unit_cost
    session.add(db); session.commit(); session.refresh(db)
    return db
