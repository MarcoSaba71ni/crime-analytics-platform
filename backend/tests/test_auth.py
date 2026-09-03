import pytest

VALID_USER = {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "testpassword"
}

def test_register_success(client):
    res = client.post("/auth/register", json=VALID_USER)
    assert res.status_code == 201
    data= res.json()
    assert "access_token" in data
    assert data["user"]["email"] == VALID_USER["email"]
    assert data["user"]["username"] == VALID_USER["username"]
    assert "password" not in data["user"]

def test_register_duplicate_email(client):
    client.post("/auth/register", json=VALID_USER)
    duplicate = {**VALID_USER, "username": "anotheruser"}
    res = client.post("/auth/register", json=duplicate)

    assert res.status_code == 409
    assert "email" in res.json()["detail"].lower()

def test_register_duplicate_username(client):
    client.post("/auth/register", json=VALID_USER)

    duplicate = {**VALID_USER, "email": "anotheremail@example.com"}
    res = client.post("/auth/register", json=duplicate)

    assert res.status_code == 409
    assert "username" in res.json()["detail"].lower()

def test_register_short_password(client):
    bad_user = {**VALID_USER, "password": "short"}
    res = client.post("/auth/register", json=bad_user)

    assert res.status_code == 422
    assert "password" in res.json()["detail"].lower()

def test_login_success(client):
    client.post("/auth/register", json=VALID_USER)

    res = client.post("/auth/login", json={
        "email": VALID_USER["email"],
        "password": VALID_USER["password"]
    })

    assert res.status_code == 200
    assert "access_token" in res.json()

def test_login_wrong_password(client):
    client.post("/auth/register", json=VALID_USER)

    r = client.post("/auth/login", json={
        "email": VALID_USER["email"],
        "password": "wrongpassword",
    })

    assert r.status_code == 401

def test_login_unknown_email(client):
    res = client.post("/auth/login", json={
        "email": "unknown@example.com",
        "password": "somepassword"
    })

    assert res.status_code == 401
    