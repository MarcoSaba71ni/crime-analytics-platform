from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String(50), nullable=True)
    phone = Column(String(50), nullable=True)
    bio = Column(Text, nullable=True)
    profile_picture_url = Column(String(500), nullable=True)
    home_neighborhood = Column(String(100), nullable=True)
    address = Column(String(255), nullable=True)
    onboarding_completed = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("AuthRegister", back_populates="profile")