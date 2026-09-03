# conftest.py — shared fixtures for the entire test suite
#
# IMPORTANT: env vars must be set before any app code is imported.
# security.py and database.py both raise RuntimeError at import time
# if SECRET_KEY or DATABASE_URL are missing.
import os
os.environ.setdefault("SECRET_KEY", "test-secret-key-not-for-production")
os.environ.setdefault("DATABASE_URL", "sqlite://")
os.environ.setdefault("CORS_ALLOWED_ORIGINS", "http://localhost:5173")

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database.database import Base
from app.database.deps import get_db
from app.main import app

# ---------------------------------------------------------------------------
# Test database — SQLite in-memory, shared across all sessions via StaticPool.
# Without StaticPool each session gets its own empty in-memory database, which
# means fixtures that write a row and tests that read it would see different DBs.
# ---------------------------------------------------------------------------
TEST_ENGINE = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=TEST_ENGINE)


def override_get_db():
    """Replace the production MySQL session with the test SQLite session."""
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture(autouse=True)
def reset_db():
    """
    Run before every test: create all tables.
    Run after every test: drop all tables.
    This guarantees each test starts with a clean, empty database.
    autouse=True means it applies automatically — no need to declare it in tests.
    """
    Base.metadata.create_all(bind=TEST_ENGINE)
    yield
    Base.metadata.drop_all(bind=TEST_ENGINE)


@pytest.fixture
def client():
    """HTTP client that makes real requests to the FastAPI app in-process."""
    return TestClient(app)


# ---------------------------------------------------------------------------
# Test user payloads
# ---------------------------------------------------------------------------

USER_ONE = {
    "username": "userone",
    "email": "userone@example.com",
    "password": "password123",
}

USER_TWO = {
    "username": "usertwo",
    "email": "usertwo@example.com",
    "password": "password123",
}

CRIME_PAYLOAD = {
    "title": "Test Robbery",
    "type": "robbery",
    "location": "Stockholm",
    "latitude": 59.3293,
    "longitude": 18.0686,
    "date": "2024-01-15",
    "severity": 3,
    "description": "Test crime description here",
}


@pytest.fixture
def user_one(client):
    """Register user one and return the full auth response."""
    r = client.post("/auth/register", json=USER_ONE)
    assert r.status_code == 201
    return r.json()


@pytest.fixture
def user_two(client):
    """Register user two and return the full auth response."""
    r = client.post("/auth/register", json=USER_TWO)
    assert r.status_code == 201
    return r.json()


@pytest.fixture
def auth_headers_one(user_one):
    """Bearer token headers for user one — pass directly to client requests."""
    return {"Authorization": f"Bearer {user_one['access_token']}"}


@pytest.fixture
def auth_headers_two(user_two):
    """Bearer token headers for user two."""
    return {"Authorization": f"Bearer {user_two['access_token']}"}


@pytest.fixture
def crime_id(client, auth_headers_one):
    """
    Create a crime owned by user one and return its ID.
    Used in update/delete tests to have a real crime in the database.
    """
    r = client.post("/crimes/", json=CRIME_PAYLOAD, headers=auth_headers_one)
    assert r.status_code == 200
    return r.json()["id"]