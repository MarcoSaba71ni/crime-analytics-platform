from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from app.routes import crimes
from app.models.crime import Crime  # noqa: F401 — registers model with Base.metadata
from app.database.database import engine, Base


app = FastAPI()

app.include_router(crimes.router, prefix="/crimes")

Base.metadata.create_all(bind=engine)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation error",
            "errors": exc.errors()
        },
    )

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Database error",
        },
    )

@app.exception_handler(Exception)
async def global_exception_handler(request:Request , exc: Exception):
    return JSONResponse(
        status_code=500,
        content= {
            "detail": "Internal Server Error"
        }
    )

@app.get("/health")
def health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status": "ok", "database": "connected"}
