import pytest

UPDATE_PAYLOAD = {"bio": "Updated bio for testing"}


# ---------------------------------------------------------------------------
# GET ALL PROFILES
# ---------------------------------------------------------------------------

def test_get_all_profiles(client, auth_headers_one):
    res = client.get("/profiles/", headers=auth_headers_one)

    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_get_all_profiles_unauthenticated(client):
    res = client.get("/profiles/")

    assert res.status_code == 401


# ---------------------------------------------------------------------------
# GET SINGLE PROFILE
# ---------------------------------------------------------------------------

def test_get_own_profile(client, user_one, auth_headers_one):
    profile_id = user_one["user"]["id"]
    res = client.get(f"/profiles/{profile_id}", headers=auth_headers_one)

    assert res.status_code == 200
    data = res.json()
    assert data["id"] == profile_id
    assert "password" not in data


def test_get_other_profile(client, user_one, auth_headers_two):
    # user_two tries to access user_one's profile — must be rejected
    profile_id = user_one["user"]["id"]
    res = client.get(f"/profiles/{profile_id}", headers=auth_headers_two)

    assert res.status_code == 403


# ---------------------------------------------------------------------------
# UPDATE PROFILE
# ---------------------------------------------------------------------------

def test_update_own_profile(client, user_one, auth_headers_one):
    profile_id = user_one["user"]["id"]
    res = client.put(f"/profiles/{profile_id}", json=UPDATE_PAYLOAD, headers=auth_headers_one)

    assert res.status_code == 200
    assert res.json()["bio"] == UPDATE_PAYLOAD["bio"]


def test_update_other_profile(client, user_one, auth_headers_two):
    # user_two tries to update user_one's profile — must be rejected
    profile_id = user_one["user"]["id"]
    res = client.put(f"/profiles/{profile_id}", json=UPDATE_PAYLOAD, headers=auth_headers_two)

    assert res.status_code == 403


# ---------------------------------------------------------------------------
# DELETE PROFILE
# ---------------------------------------------------------------------------

def test_delete_own_profile(client, user_one, auth_headers_one):
    profile_id = user_one["user"]["id"]
    res = client.delete(f"/profiles/{profile_id}", headers=auth_headers_one)

    assert res.status_code == 204


def test_delete_other_profile(client, user_one, auth_headers_two):
    # user_two tries to delete user_one's profile — must be rejected
    profile_id = user_one["user"]["id"]
    res = client.delete(f"/profiles/{profile_id}", headers=auth_headers_two)

    assert res.status_code == 403


