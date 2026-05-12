import json
import os
from datetime import datetime
from pathlib import Path

from app.database.database import SessionLocal
from backend.app.models.crime_models import Crime as CrimeModel

db = SessionLocal()

# Resolve seed file relative to project root (works from any current directory).
project_root = Path(__file__).resolve().parents[1]
seed_file = Path(os.getenv("SEED_FILE", project_root / "data" / "crimes_seed.json"))

# Load JSON file
with seed_file.open("r", encoding="utf-8") as file:
    crimes = json.load(file)

inserted = 0
skipped = 0

for crime in crimes:
    seed_id = crime.pop("id", None)
    # is_verified is computed from source — never stored as a column
    crime.pop("is_verified", None)
    crime["date"] = datetime.strptime(crime["date"], "%Y-%m-%d").date()

    # Upsert by id: skip if a row with this id already exists
    if seed_id is not None:
        exists = db.query(CrimeModel).filter(CrimeModel.id == seed_id).first()
        if exists:
            skipped += 1
            continue

    new_crime = CrimeModel(**crime)
    db.add(new_crime)
    inserted += 1

db.commit()
print(f"Seeding complete — {inserted} inserted, {skipped} skipped (already existed).")