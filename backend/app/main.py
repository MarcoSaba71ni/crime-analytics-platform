from fastapi import FastAPI
from app.routes import crimes
from app.models import Crime
from app.database import engine

app = FastAPI();

app.include_router(crimes.router, prefix="/crimes")

Crime.metadata.create_all(bind=engine)
