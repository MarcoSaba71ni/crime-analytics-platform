from sqlalchemy import Column, Date, Float, Integer, String, Text
from app.database.database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Crime(Base):
    __tablename__ = "crimes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    type = Column(String(100))
    location = Column(String(255))
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    date = Column(Date)
    severity = Column(Integer)
    description = Column(Text)
    source = Column(String(255), nullable=True)
    image_url = Column(String(500), nullable=True)
    image_alt = Column(String(255), nullable=True)
    reporter_id = Column(Integer, ForeignKey("users.id"))
    reporter = relationship("AuthRegister", back_populates="crimes")
