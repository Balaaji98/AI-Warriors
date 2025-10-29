from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    full_name: Optional[str] = None
    email: Optional[str] = None
    hashed_password: str
    role: str = 'user'
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
