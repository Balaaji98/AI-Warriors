from sqlmodel import Session
from app.db.session import engine
from app.models import Item, Thresholds, SQLModel
SQLModel.metadata.create_all(engine)
samples = [
    {'name':'Premium Phone Model X','quantity':5,'unit_cost':40000},
    {'name':'Wireless Headphones','quantity':20,'unit_cost':5000},
    {'name':'Cotton T-Shirt','quantity':500,'unit_cost':250},
    {'name':'Socks Pack','quantity':1000,'unit_cost':50},
    {'name':'Gaming Console','quantity':8,'unit_cost':30000},
]
with Session(engine) as s:
    for it in samples:
        item = Item(**it)
        s.add(item)
    th = Thresholds()
    s.add(th)
    s.commit()
print('Seeded sample data into app.db')
