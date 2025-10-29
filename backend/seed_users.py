from app.db.session import engine
from sqlmodel import Session
from app.models.user import User
from app.core.security import hash_password
from app.models.item import Item
from sqlmodel import SQLModel

SQLModel.metadata.create_all(engine)
with Session(engine) as s:
    admin = User(username='admin', full_name='Admin', email='admin@example.com', hashed_password=hash_password('adminpass'), role='admin')
    demo = User(username='demo', full_name='Demo User', email='demo@example.com', hashed_password=hash_password('demopass'), role='user')
    s.add(admin); s.add(demo)
    s.commit()
print('seeded users')
