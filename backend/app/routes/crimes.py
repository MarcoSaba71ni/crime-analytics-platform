from app.schemas.crimes import CrimeBase, CrimeResponse, CrimeCreate
from typing import List
from fastapi import APIRouter, HTTPException

router = APIRouter()

crimes = [
    {
        "id": 1,
        "title": "Robbery in Central",
        "type": "Theft",
        "location": "Stockholm",
        "severity": 3,
        "description": "Store robbed at night"
    },
    {
        "id": 2,
        "title": "Car Theft",
        "type": "Vehicle Crime",
        "location": "Solna",
        "severity": 2,
        "description": "Car stolen from parking lot"
    }
]

# GET ALL CRIMES
@router.get("/", response_model=List[CrimeResponse])
def get_crimes():
    return crimes

# GET A SINGLE CRIME BY ID
@router.get("/{crime_id}", response_model=CrimeResponse)
def get_crime(crime_id: int):
    for crime in crimes:
        if crime["id"] == crime_id:
            return crime

    raise HTTPException(status_code=404, detail="Crime not found")

# CREATE A NEW CRIME
@router.post("/", response_model=CrimeResponse)
def create_crime(crime: CrimeCreate):
    new_crime = crime.dict()
    new_crime["id"] = max((item["id"] for item in crimes), default=0) + 1

    crimes.append(new_crime)
    return new_crime

# UPDATE AN EXISTING CRIME
@router.put("/crime_id", response_model=CrimeResponse)
def update_crime(crime_id: int, updated_crime: CrimeCreate):
    for index, crime in enumerate(crimes):
        if crime["id"] == crime_id: 
            updated_data = updated_crime.dict()
            updated_data["id"] = crime_id

            crimes[index] = updated_data
            return updated_data
        
    raise HTTPException(status_code=404 , detail="Crime Not Found")

# DELETE A SPECIFIC CRIME
@router.delete("/crime_id", response_model=CrimeResponse)
def delete_crime(crime_id: int):
    for index, crime in enumerate(crimes):
        if crime["id"] == crime_id:
            del crime[index]
            return {"message: Crime Deleted Successfully"}
        
    raise HTTPException(status_code=404, detail= "Crime Not Found")