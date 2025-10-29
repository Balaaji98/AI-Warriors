from fastapi import APIRouter, Depends, UploadFile, File, BackgroundTasks, HTTPException
from typing import List
from sqlmodel import select
from app.db.session import get_session, engine
from app.models.item import Item
from app.models.user import User
from sqlmodel import Session
from app.core.security import decode_token
from fastapi import Header

router = APIRouter(prefix="/items", tags=["items"])

@router.post('/init-db')
def init_db():
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(engine)
    return {"ok": True}

def get_current_user(authorization: str = Header(None), session: Session = Depends(get_session)):
    if not authorization:
        raise HTTPException(status_code=401, detail='missing token')
    scheme, token = authorization.split()
    payload = decode_token(token)
    user_id = int(payload['sub'])
    q = select(User).where(User.id == user_id)
    user = session.exec(q).first()
    if not user:
        raise HTTPException(status_code=401, detail='invalid token')
    return user

@router.post('/', response_model=Item)
def create_item(item: Item, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    item.owner_id = user.id
    session.add(item); session.commit(); session.refresh(item)
    return item

@router.get('/', response_model=List[Item])
def list_items(session: Session = Depends(get_session)):
    q = select(Item)
    return session.exec(q).all()

@router.post('/upload')
async def upload_file(file: UploadFile = File(...), user: User = Depends(get_current_user)):
    # simple save to tmp and return path
    dest = f"/tmp/{file.filename}"
    with open(dest, 'wb') as f:
        f.write(await file.read())
    return {"filename": file.filename, "path": dest}
