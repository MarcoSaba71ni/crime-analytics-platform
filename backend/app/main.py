from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.routes import crimes, profiles, auth
from app.models.crime_models import Crime  # noqa: F401 — registers model with Base.metadata
from app.models.auth_models import AuthRegister  # noqa: F401 — registers model with Base.metadata
from app.database.database import engine, Base
from app.core.limiter import limiter


app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(crimes.router, prefix="/crimes")
app.include_router(profiles.router, prefix="/profiles")
app.include_router(auth.router, prefix="/auth")

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
