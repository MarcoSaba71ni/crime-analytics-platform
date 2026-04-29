from fastapi import FastAPI
from sqlalchemy import text
from app.routes import crimes
from app.models.crime import Crime  # noqa: F401 — registers model with Base.metadata
from app.database.database import engine, Base

app = FastAPI()

app.include_router(crimes.router, prefix="/crimes")

Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status": "ok", "database": "connected"}
