from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.deps import get_db
from app.models.crime import Crime as CrimeModel
from app.schemas.crimes import CrimeCreate, CrimeUpdate, CrimeResponse

router = APIRouter()


# GET ALL CRIMES
@router.get("/", response_model=List[CrimeResponse])
def get_crimes(db: Session = Depends(get_db)):
    return db.query(CrimeModel).all()

# GET A SINGLE CRIME BY ID
@router.get("/{crime_id}", response_model=CrimeResponse)
def get_crime(crime_id: int, db: Session = Depends(get_db)):
    crime = db.query(CrimeModel).filter(CrimeModel.id == crime_id).first()

    if not crime:
        raise HTTPException(status_code=404, detail="Crime not found")
    return crime

# CREATE A NEW CRIME
@router.post("/", response_model=CrimeResponse)
def create_crime(crime: CrimeCreate, db: Session = Depends(get_db)):
    new_crime = CrimeModel(**crime.model_dump())

    db.add(new_crime)
    db.commit()
    db.refresh(new_crime)

    return new_crime

# UPDATE AN EXISTING CRIME
@router.put("/{crime_id}", response_model=CrimeResponse)
def update_crime(crime_id: int, updated_crime: CrimeUpdate, db: Session = Depends(get_db)):
    crime = db.query(CrimeModel).filter(CrimeModel.id == crime_id).first()

    if not crime:
        raise HTTPException(status_code=404, detail="Crime not found")

    for key, value in updated_crime.model_dump(exclude_none=True).items():
        setattr(crime, key, value)

    db.commit()
    db.refresh(crime)

    return crime
# DELETE A SPECIFIC CRIME
@router.delete("/{crime_id}", status_code=204)
def delete_crime(crime_id: int, db: Session = Depends(get_db)):
    crime = db.query(CrimeModel).filter(CrimeModel.id == crime_id).first()

    if not crime:
        raise HTTPException(status_code=404, detail="Crime not found")

    db.delete(crime)
    db.commit()
