from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy import extract
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.deps import get_db
from app.models.crime import Crime as CrimeModel
from app.schemas.crimes import CrimeCreate, CrimeUpdate, CrimeResponse

router = APIRouter()


# GET ALL CRIMES
@router.get("/", response_model=List[CrimeResponse])
def get_crimes(
    db: Session = Depends(get_db),
    year: Optional[int] = Query(None, description="Filter by year (e.g. 2023)"),
    severity: Optional[int] = Query(None, ge=1, le=5, description="Filter by severity level 1–5"),
    crime_type: Optional[str] = Query(None, description="Filter by crime type (e.g. fraud)"),
    verified: Optional[bool] = Query(None, description="true = source is set, false = source is null"),
):
    try:
        query = db.query(CrimeModel)

        if year is not None:
            query = query.filter(extract("year", CrimeModel.date) == year)
        if severity is not None:
            query = query.filter(CrimeModel.severity == severity)
        if crime_type is not None:
            query = query.filter(CrimeModel.type == crime_type)
        if verified is not None:
            if verified:
                query = query.filter(CrimeModel.source.isnot(None))
            else:
                query = query.filter(CrimeModel.source.is_(None))

        return query.all()
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Database error while fetching crimes")

# GET A SINGLE CRIME BY ID
@router.get("/{crime_id}", response_model=CrimeResponse)
def get_crime(crime_id: int, db: Session = Depends(get_db)):
    try:
        crime = db.query(CrimeModel).filter(CrimeModel.id == crime_id).first()
    except SQLAlchemyError:
        raise HTTPException(status_code=500, detail="Database error while fetching crime")

    if not crime:
        raise HTTPException(status_code=404, detail="Crime not found")
    return crime

# CREATE A NEW CRIME
@router.post("/", response_model=CrimeResponse)
def create_crime(crime: CrimeCreate, db: Session = Depends(get_db)):
    try:
        new_crime = CrimeModel(**crime.model_dump())

        db.add(new_crime)
        db.commit()
        db.refresh(new_crime)

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Crime could not be created") 

    return new_crime

# UPDATE AN EXISTING CRIME
@router.put("/{crime_id}", response_model=CrimeResponse)
def update_crime(crime_id: int, updated_crime: CrimeUpdate, db: Session = Depends(get_db)):
    
    crime = db.query(CrimeModel).filter(CrimeModel.id == crime_id).first()

    if not crime:
        raise HTTPException(status_code=404, detail="Crime not found")

    update_data = updated_crime.model_dump(exclude_none=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    try:
        for key, value in update_data.items():
            setattr(crime, key, value)

        db.commit()
        db.refresh(crime)

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return crime

# DELETE A SPECIFIC CRIME
@router.delete("/{crime_id}", status_code=204)
def delete_crime(crime_id: int, db: Session = Depends(get_db)):
    crime = db.query(CrimeModel).filter(CrimeModel.id == crime_id).first()
    
    if not crime:
        raise HTTPException(status_code=404, detail="Crime not found")    

    try: 
        db.delete(crime)
        db.commit()

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error occurred while deleting crime")


