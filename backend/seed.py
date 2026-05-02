import json
import os
from datetime import datetime
from pathlib import Path

from app.database.database import SessionLocal
from app.models.crime import Crime as CrimeModel

db = SessionLocal()

# Resolve seed file relative to project root (works from any current directory).
project_root = Path(__file__).resolve().parents[1]
seed_file = Path(os.getenv("SEED_FILE", project_root / "data" / "crimes_seed.json"))

# Load JSON file
with seed_file.open("r", encoding="utf-8") as file:
    crimes = json.load(file)

for crime in crimes:
    # Convert date string → Python date
    crime.pop("id", None)  # Remove 'id' if it exists, as it's auto-generated
    crime["date"] = datetime.strptime(crime["date"], "%Y-%m-%d").date()

    # Create model instance
    new_crime = CrimeModel(**crime)

    db.add(new_crime)

# Commit all at once
db.commit()

print("✅ Database seeded successfully!")