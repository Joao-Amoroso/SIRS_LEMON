import psycopg2
import psycopg2.extras
import requests

import jwt

BASE_URL = "http://localhost:5000"

# SGBD configs
DB_HOST = "localhost"
DB_USER = "postgres"
DB_DATABASE = "postgres"
DB_PASSWORD = "postgres"
DB_PORT = "5433"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s port=%s" % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT)

# jwt configs
SECRET_KEY = "a"
ALGORITHM = "HS256"


def test_register():
    username = "test1"
    password = "test1"

    req = requests.post(BASE_URL+"/register",json={
        "username": username,
        "password":password
    })
    
    assert req.status_code == 200

    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        


        query = """SELECT * FROM client WHERE username =  %s;"""
        data = (username,)

        cursor.execute(query, data)

        record = cursor.fetchone()

        assert record != None

        query = """DELETE FROM client WHERE username =  %s;"""
        data = (username,)

        cursor.execute(query, data)

    except Exception as e:
        raise e
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()
    


def test_login():
    username = "test1"
    password = "test1"

    res = requests.post(BASE_URL+"/register",json={
        "username": username,
        "password":password
    })
    
    assert res.status_code == 200

    nonce = "123"

    res = requests.post(BASE_URL+"/login",json={
        "username": username,
        "password":password,
        "nonce":nonce
    })

    assert res.status_code == 200

    data = res.json()

    assert data != None

    assert "token" in data

    token = data["token"]

    assert type(token) == str
    id = ""
    try:
        decoded = jwt.decode(token, SECRET_KEY, ALGORITHM, options={"require": ["exp"],
                                                                  "verify_signature": True, "verify_exp": True})
        assert "sub" in decoded
        id = decoded["sub"]

        assert "nonce" in decoded


        assert decoded["nonce"] == nonce

    except Exception as e:
        raise e

