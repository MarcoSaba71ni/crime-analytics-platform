import pytest

# ---------------------------------------------------------------------------
# Crime payload — mirrors CRIME_PAYLOAD in conftest.py (kept here for readability)
# ---------------------------------------------------------------------------

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

# ---------------------------------------------------------------------------
# Group 1 — Read (no auth required)
# ---------------------------------------------------------------------------

def test_get_crimes_empty(client):
    res = client.get("/crimes")

    assert res.status_code == 200
    data = res.json()
    assert data["total"] == 0
    assert data["page"] == 1
    assert data["limit"] == 6
    assert data["crimes"] == []


def test_get_crime_by_id(client, crime_id):
    # crime_id fixture (conftest) creates a crime owned by user one
    res = client.get(f"/crimes/{crime_id}")

    assert res.status_code == 200
    data = res.json()
    assert data["id"] == crime_id
    assert data["title"] == CRIME_PAYLOAD["title"]
    assert data["type"] == CRIME_PAYLOAD["type"]


def test_get_crime_not_found(client):
    # 9999 is an integer that will not exist in the empty test database
    res = client.get("/crimes/9999")

    assert res.status_code == 404


# ---------------------------------------------------------------------------
# Group 2 — Create
# ---------------------------------------------------------------------------

def test_create_crime_authenticated(client, auth_headers_one):
    res = client.post("/crimes/", json=CRIME_PAYLOAD, headers=auth_headers_one)

    assert res.status_code == 200
    data = res.json()
    assert data["title"] == CRIME_PAYLOAD["title"]
    assert data["type"] == CRIME_PAYLOAD["type"]
    assert "id" in data
    assert "reporter_id" in data


def test_create_crime_unauthenticated(client):
    res = client.post("/crimes/", json=CRIME_PAYLOAD)

    assert res.status_code == 401


# ---------------------------------------------------------------------------
# Group 3 — Update (BUG-01 fixed: ownership check is now enforced)
# ---------------------------------------------------------------------------

def test_update_crime_as_owner(client, crime_id, auth_headers_one):
    res = client.put(
        f"/crimes/{crime_id}",
        json={"title": "Updated Title"},
        headers=auth_headers_one,
    )

    assert res.status_code == 200
    assert res.json()["title"] == "Updated Title"


def test_update_crime_as_non_owner(client, crime_id, auth_headers_two):
    # auth_headers_two belongs to a different user — must be rejected
    res = client.put(
        f"/crimes/{crime_id}",
        json={"title": "Hijacked Title"},
        headers=auth_headers_two,
    )

    assert res.status_code == 403


def test_update_crime_unauthenticated(client, crime_id):
    res = client.put(f"/crimes/{crime_id}", json={"title": "No Token"})

    assert res.status_code == 401


# ---------------------------------------------------------------------------
# Group 4 — Delete (BUG-01 fixed: ownership check is now enforced)
# ---------------------------------------------------------------------------

def test_delete_crime_as_owner(client, crime_id, auth_headers_one):
    res = client.delete(f"/crimes/{crime_id}", headers=auth_headers_one)

    assert res.status_code == 204

    # Confirm the crime is gone
    confirm = client.get(f"/crimes/{crime_id}")
    assert confirm.status_code == 404


def test_delete_crime_as_non_owner(client, crime_id, auth_headers_two):
    # auth_headers_two belongs to a different user — must be rejected
    res = client.delete(f"/crimes/{crime_id}", headers=auth_headers_two)

    assert res.status_code == 403


# ---------------------------------------------------------------------------
# Group 5 — Filters & Pagination
# ---------------------------------------------------------------------------

def test_crimes_filter_by_type(client, auth_headers_one):
    # Create a robbery and a fraud — filter should return only the robbery
    client.post("/crimes/", json=CRIME_PAYLOAD, headers=auth_headers_one)
    client.post("/crimes/", json={**CRIME_PAYLOAD, "title": "Bank Fraud Case", "type": "fraud"}, headers=auth_headers_one)

    res = client.get("/crimes?crime_type=robbery")

    assert res.status_code == 200
    data = res.json()
    assert data["total"] == 1
    assert data["crimes"][0]["type"] == "robbery"


def test_crimes_pagination(client, auth_headers_one):
    # Create 3 crimes then request page 1 with limit 2 — should return 2, total 3
    for i in range(3):
        client.post(
            "/crimes/",
            json={**CRIME_PAYLOAD, "title": f"Crime Number {i + 1}"},
            headers=auth_headers_one,
        )

    res = client.get("/crimes?page=1&limit=2")

    assert res.status_code == 200
    data = res.json()
    assert data["total"] == 3
    assert data["page"] == 1
    assert data["limit"] == 2
    assert len(data["crimes"]) == 2