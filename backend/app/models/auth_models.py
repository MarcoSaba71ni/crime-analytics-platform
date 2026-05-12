from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String, Text
from app.database.database import Base


class AuthRegister(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    bio = Column(Text, nullable=True)
    role = Column(String(50), default="user")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
