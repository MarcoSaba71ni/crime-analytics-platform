"""
Migration: add latitude, longitude, image_url, image_alt columns to the crimes table
and back-fill all 30 existing rows with coordinates and image data.

Run once from the backend/ directory:
    python migrate_add_image_fields.py
"""

from sqlalchemy import text
from app.database.database import engine

# ---------------------------------------------------------------------------
# 1. New columns to add
# ---------------------------------------------------------------------------
NEW_COLUMNS = [
    ("latitude",  "FLOAT        NULL"),
    ("longitude", "FLOAT        NULL"),
    ("image_url", "VARCHAR(500) NULL"),
    ("image_alt", "VARCHAR(255) NULL"),
]

# ---------------------------------------------------------------------------
# 2. Per-row update data  (id -> {latitude, longitude, image_url, image_alt})
# ---------------------------------------------------------------------------
CRIME_IMAGE_DATA = {
    1: {
        "latitude": 59.3254, "longitude": 18.0710,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Gamla_stan_northbound_platform.jpg/800px-Gamla_stan_northbound_platform.jpg",
        "image_alt": "Gamla Stan T-bana northbound platform, Stockholm metro",
    },
    2: {
        "latitude": 59.3876, "longitude": 17.9219,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Rinkeby%2C_flygfoto_2014-09-20.jpg/800px-Rinkeby%2C_flygfoto_2014-09-20.jpg",
        "image_alt": "Aerial view of Rinkeby district, Stockholm (2014)",
    },
    3: {
        "latitude": 59.3350, "longitude": 18.0731,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Arnoldshuset_Stureplan.jpg/800px-Arnoldshuset_Stureplan.jpg",
        "image_alt": "Stureplan square in central Stockholm",
    },
    4: {
        "latitude": 59.3303, "longitude": 18.0275,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Kungsholmen_Skyline_and_Shoreline.jpg/800px-Kungsholmen_Skyline_and_Shoreline.jpg",
        "image_alt": "Kungsholmen skyline and shoreline, Stockholm",
    },
    5: {
        "latitude": 59.4068, "longitude": 17.9310,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Husby_Kista.jpg/800px-Husby_Kista.jpg",
        "image_alt": "Husby residential suburb in northwestern Stockholm",
    },
    6: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Stockholms_radhus_060409.JPG/800px-Stockholms_radhus_060409.JPG",
        "image_alt": "Stockholm District Court (Stockholms tingsrätt) building",
    },
    7: {
        "latitude": 59.3342, "longitude": 18.0735,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Brunkebergstorg%202017%2001.jpg/800px-Brunkebergstorg%202017%2001.jpg",
        "image_alt": "Brunkebergstorg square in central Stockholm, site of Swedbank headquarters",
    },
    8: {
        "latitude": 59.2773, "longitude": 17.9070,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Sk%C3%A4rholmen_-_KMB_-_16001000287784.jpg/800px-Sk%C3%A4rholmen_-_KMB_-_16001000287784.jpg",
        "image_alt": "Skärholmen district in southern Stockholm",
    },
    9: {
        "latitude": 59.3858, "longitude": 17.8958,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sp%C3%A5nga_kyrka_fr%C3%A5n_luften.jpg/800px-Sp%C3%A5nga_kyrka_fr%C3%A5n_luften.jpg",
        "image_alt": "Aerial view of Spånga, Stockholm — scene of organized crime grenade attack",
    },
    10: {
        "latitude": 59.3373, "longitude": 18.0830,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/%C3%96stermalm_September_2014.jpg/800px-%C3%96stermalm_September_2014.jpg",
        "image_alt": "Östermalm neighbourhood, Stockholm (September 2014)",
    },
    11: {
        "latitude": 59.3100, "longitude": 18.1614,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Skurusund_February_2013_03.jpg/800px-Skurusund_February_2013_03.jpg",
        "image_alt": "Nacka municipality, Stockholm County — Skurusund bridge",
    },
    12: {
        "latitude": 59.3858, "longitude": 17.8958,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sp%C3%A5nga_kyrka_fr%C3%A5n_luften.jpg/800px-Sp%C3%A5nga_kyrka_fr%C3%A5n_luften.jpg",
        "image_alt": "Aerial view of Spånga kyrka (12th-century church) targeted in Molotov attack",
    },
    13: {
        "latitude": 59.3858, "longitude": 17.8958,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sp%C3%A5nga_kyrka_fr%C3%A5n_luften.jpg/800px-Sp%C3%A5nga_kyrka_fr%C3%A5n_luften.jpg",
        "image_alt": "Spånga kyrka from the air — site of second arson attack within one week",
    },
    14: {
        "latitude": 59.6498, "longitude": 17.9237,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Arlanda_1_Publish.jpg/800px-Arlanda_1_Publish.jpg",
        "image_alt": "Stockholm Arlanda Airport terminal where cocaine smuggling was intercepted",
    },
    15: {
        "latitude": 59.3876, "longitude": 17.9219,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Rinkeby%2C_flygfoto_2014-09-20.jpg/800px-Rinkeby%2C_flygfoto_2014-09-20.jpg",
        "image_alt": "Aerial view of Rinkeby, Stockholm — scene of 2022 gang-orchestrated riots",
    },
    16: {
        "latitude": 59.1532, "longitude": 18.1180,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Swedish_patrol_car_new_livery.JPG/800px-Swedish_patrol_car_new_livery.JPG",
        "image_alt": "Swedish police patrol car responding to fatal gang shooting in Jordbro",
    },
    17: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Stockholms_Stadshuset_City_Hall_Stockholm_2016_01.jpg/800px-Stockholms_Stadshuset_City_Hall_Stockholm_2016_01.jpg",
        "image_alt": "Stockholm City Hall — crimes against elderly occurred across multiple city districts",
    },
    18: {
        "latitude": 59.3872, "longitude": 17.9050,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Swedish_ambulance_in_Blekinge.jpg/800px-Swedish_ambulance_in_Blekinge.jpg",
        "image_alt": "Swedish ambulance — paramedics assaulted on emergency call in Hjulsta",
    },
    19: {
        "latitude": 59.1582, "longitude": 18.1366,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Swedish_patrol_car_new_livery.JPG/800px-Swedish_patrol_car_new_livery.JPG",
        "image_alt": "Swedish police patrol car — investigation into murder of 13-year-old near Handen",
    },
    20: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Swedish_patrol_car_new_livery.JPG/800px-Swedish_patrol_car_new_livery.JPG",
        "image_alt": "Swedish police patrol car — Foxtrot–Dalen gang war double shooting in Stockholm",
    },
    21: {
        "latitude": 59.2967, "longitude": 18.0028,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Swedish_patrol_car_new_livery.JPG/800px-Swedish_patrol_car_new_livery.JPG",
        "image_alt": "Swedish police at scene of Foxtrot network home invasion murders in Västberga",
    },
    22: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Stockholms_radhus_060409.JPG/800px-Stockholms_radhus_060409.JPG",
        "image_alt": "Stockholm District Court where 25 suspects were charged in organized elderly fraud",
    },
    23: {
        "latitude": 59.3322, "longitude": 18.0344,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Fridhemsplan_metro_station.jpg/800px-Fridhemsplan_metro_station.jpg",
        "image_alt": "Fridhemsplan metro station, Stockholm — scene of random stabbing attack",
    },
    24: {
        "latitude": 59.3553, "longitude": 17.8821,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Swedish_patrol_car_new_livery.JPG/800px-Swedish_patrol_car_new_livery.JPG",
        "image_alt": "Swedish police patrol car — type of vehicle ambushed in Råcksta gang attack",
    },
    25: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Stockholm_-_Riddarholmen%2C_Wrangelska_Palatset.jpg/800px-Stockholm_-_Riddarholmen%2C_Wrangelska_Palatset.jpg",
        "image_alt": "Wrangelska palatset on Riddarholmen — seat of Svea Court of Appeal that convicted Swedbank CEO",
    },
    26: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Stockholms_radhus_060409.JPG/800px-Stockholms_radhus_060409.JPG",
        "image_alt": "Stockholm District Court where banking app fraud mastermind was remanded after extradition",
    },
    27: {
        "latitude": 59.3373, "longitude": 18.0830,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/%C3%96stermalm_September_2014.jpg/800px-%C3%96stermalm_September_2014.jpg",
        "image_alt": "Östermalm, Stockholm — location of AI deepfake bank identity fraud",
    },
    28: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Swedish_patrol_car_new_livery.JPG/800px-Swedish_patrol_car_new_livery.JPG",
        "image_alt": "Swedish police — coordinated operation led to arrest of gang leader Ismail Abdo in Turkey",
    },
    29: {
        "latitude": 59.3989, "longitude": 17.9141,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Tensta_Centrum.jpg/800px-Tensta_Centrum.jpg",
        "image_alt": "Tensta Centrum, Stockholm — site of triple gang shooting in January 2026",
    },
    30: {
        "latitude": 59.3293, "longitude": 18.0686,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Stockholms_Stadshuset_City_Hall_Stockholm_2016_01.jpg/800px-Stockholms_Stadshuset_City_Hall_Stockholm_2016_01.jpg",
        "image_alt": "Stockholm City Hall — VAT fraud via shell companies defrauded Skatteverket of 18 million SEK",
    },
}

# ---------------------------------------------------------------------------
# 3. Run migration
# ---------------------------------------------------------------------------
with engine.begin() as conn:
    # Fetch the database name so we can query INFORMATION_SCHEMA
    db_name = conn.execute(text("SELECT DATABASE()")).scalar()

    for col_name, col_def in NEW_COLUMNS:
        exists = conn.execute(
            text(
                "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS "
                "WHERE TABLE_SCHEMA = :db AND TABLE_NAME = 'crimes' AND COLUMN_NAME = :col"
            ),
            {"db": db_name, "col": col_name},
        ).scalar()

        if exists:
            print(f"Column '{col_name}' already exists — skipped.")
        else:
            conn.execute(text(f"ALTER TABLE crimes ADD COLUMN {col_name} {col_def}"))
            print(f"Column '{col_name}' added.")

    for crime_id, data in CRIME_IMAGE_DATA.items():
        conn.execute(
            text(
                "UPDATE crimes SET "
                "latitude  = :lat, "
                "longitude = :lng, "
                "image_url = :url, "
                "image_alt = :alt "
                "WHERE id = :id"
            ),
            {
                "lat": data["latitude"],
                "lng": data["longitude"],
                "url": data["image_url"],
                "alt": data["image_alt"],
                "id": crime_id,
            },
        )
    print(f"{len(CRIME_IMAGE_DATA)} rows updated with image and coordinate data.")

print("Migration complete.")
