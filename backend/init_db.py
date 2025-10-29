from app.db.session import engine
from sqlmodel import SQLModel
from app.models.user import User
from app.models.item import Item
SQLModel.metadata.create_all(engine)
print('db created')
