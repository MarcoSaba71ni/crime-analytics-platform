from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from typing import List

from app.core.auth_deps import get_current_user
from app.database.deps import get_db
from app.models.auth_models import AuthRegister as AuthModel
from app.schemas.profiles_schemas import ProfileUpdate, ProfileResponse

router = APIRouter()


# GET ALL PROFILES
@router.get("/", response_model=List[ProfileResponse])
def get_profiles(db: Session = Depends(get_db)):
    try:
        return db.query(AuthModel).all()
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Database error while fetching profiles")


# GET A SINGLE PROFILE BY ID
@router.get("/{profile_id}", response_model=ProfileResponse)
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    try:
        profile = db.query(AuthModel).filter(AuthModel.id == profile_id).first()
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Database error while fetching profile")

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


# UPDATE AN EXISTING PROFILE
@router.put("/{profile_id}", response_model=ProfileResponse)
def update_profile(
    profile_id: int,
    updated_profile: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: AuthModel = Depends(get_current_user),
):
    profile = db.query(AuthModel).filter(AuthModel.id == profile_id).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    update_data = updated_profile.model_dump(exclude_none=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    try:
        for key, value in update_data.items():
            setattr(profile, key, value)
        db.commit()
        db.refresh(profile)
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return profile


# DELETE A PROFILE
@router.delete("/{profile_id}", status_code=204)
def delete_profile(
    profile_id: int,
    db: Session = Depends(get_db),
    current_user: AuthModel = Depends(get_current_user),
):
    profile = db.query(AuthModel).filter(AuthModel.id == profile_id).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    try:
        db.delete(profile)
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error occurred while deleting profile")
