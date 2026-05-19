from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.limiter import limiter
from app.core.security import create_access_token, hash_password, verify_password
from app.core.auth_deps import get_current_user
from app.database.deps import get_db
from app.models.auth_models import AuthRegister as AuthModel
from app.schemas.auth_schemas import (
    AuthLogin,
    AuthRegister as AuthRegisterSchema,
    AuthRegisterResponse,
    AuthResponse,
)

router = APIRouter()


@router.post("/register", response_model=AuthResponse, status_code=201)
@limiter.limit("5/minute")
async def register_user(request: Request, user: AuthRegisterSchema, db: Session = Depends(get_db)):
    existing_user = db.query(AuthModel).filter(
        (AuthModel.email == user.email) | (AuthModel.username == user.username)
    ).first()
    if existing_user:
        if existing_user.email == user.email:
            raise HTTPException(status_code=409, detail="Email already registered")
        raise HTTPException(status_code=409, detail="Username already taken")

    user_data = user.model_dump()
    try:
        user_data["password"] = hash_password(user_data["password"])
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    try:
        new_user = AuthModel(**user_data)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=409, detail="Email or username already registered") from e
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error") from e
    
    token = create_access_token({"sub": new_user.email, "id": new_user.id})
    return AuthResponse(access_token=token, user=new_user)


@router.post("/login", response_model=AuthResponse, status_code=200)
@limiter.limit("5/minute")
async def login_user(request: Request, user: AuthLogin, db: Session = Depends(get_db)):
    db_user = db.query(AuthModel).filter(AuthModel.email == user.email).first()
    try:
        password_valid = db_user and verify_password(user.password, db_user.password)
    except ValueError:
        password_valid = False

    if not password_valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email, "id": db_user.id})
    return AuthResponse(access_token=token, user=db_user)


@router.get("/me", response_model=AuthRegisterResponse, status_code=200)
async def get_me(current_user: AuthModel = Depends(get_current_user)):
    return current_user
