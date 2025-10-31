from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Item(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    # sku: str = Field(index=True)
    name: str
    quantity: int = 0
    unit_cost: float = 0.0
    # category: Optional[str] = None  # A/B/C
    # total_value: float = 0.0
    # created_at: datetime = Field(default_factory=datetime.utcnow)

class Thresholds(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    a_cutoff: float = 0.7
    b_cutoff: float = 0.9
    min_reorder_A: int = 5
    max_stock_A: int = 100
    min_reorder_B: int = 10
    max_stock_B: int = 300
    min_reorder_C: int = 50
    max_stock_C: int = 1000
