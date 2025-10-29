from fastapi import APIRouter, Depends, HTTPException, status
from app.db.session import get_session, engine
from sqlmodel import Session, select
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterIn(BaseModel):
    username: str
    password: str
    full_name: str = None
    email: str = None

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post('/register', response_model=TokenOut)
def register(data: RegisterIn, session: Session = Depends(get_session)):
    q = select(User).where(User.username == data.username)
    if session.exec(q).first():
        raise HTTPException(status_code=400, detail='username exists')
    user = User(username=data.username, full_name=data.full_name, email=data.email, hashed_password=hash_password(data.password))
    session.add(user); session.commit(); session.refresh(user)
    token = create_access_token(subject=str(user.id), role=user.role)
    return {"access_token": token}

class LoginIn(BaseModel):
    username: str
    password: str

@router.post('/login', response_model=TokenOut)
def login(data: LoginIn, session: Session = Depends(get_session)):
    q = select(User).where(User.username == data.username)
    user = session.exec(q).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail='invalid credentials')
    token = create_access_token(subject=str(user.id), role=user.role)
    return {"access_token": token}
