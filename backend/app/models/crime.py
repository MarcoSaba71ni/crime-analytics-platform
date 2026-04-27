from sqlalchemy import Column, Integer, String, Text
from app.database.database import Base

class Crime(Base):
    __tablename__ = "crimes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    type = Column(String(100))
    location = Column(String(255))
    severity = Column(Integer)
    description = Column(Text)