from app.db.session import engine
from app.models import SQLModel, Item, Thresholds
SQLModel.metadata.create_all(engine)
print('DB initialized (app.db)')
