from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Item(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    qty: int = 1
    unit_price: float = 0.0
    owner_id: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
