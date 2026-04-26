from fastapi import FastAPI
from app.routes import crimes

app = FastAPI();

@app.get("/")
def root():
    return {"message": "Welcome to the Crime Analytics Platform API!"}

app.include_router(crimes.router, prefix="/crimes", tags=["Crimes"])
