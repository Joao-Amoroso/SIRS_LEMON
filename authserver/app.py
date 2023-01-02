import psycopg2
import psycopg2.extras
from flask import Flask, request, redirect, render_template
import json
import jwt
from datetime import datetime, timedelta,timezone
import secrets
from argon2 import low_level
import base64

# jwt configs
SECRET_KEY = "a"
ALGORITHM = "HS256"


# token configs
TOKEN_BYTES = 64
TOKEN_DURATION = 60

# SGBD configs
DB_HOST = "localhost"
DB_USER = "postgres"
DB_DATABASE = "postgres"
DB_PASSWORD = "postgres"
DB_PORT = "5433"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s port=%s" % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT)

app = Flask(__name__)


def createToken(id, nonce):
    data_token = {
        "sub": id,
        "exp": datetime.now() + timedelta(minutes=TOKEN_DURATION),
        "nonce": nonce
    }
    return data_token

# @app.before_request
# def before_request():
#     if not request.is_secure:
#         url = request.url.replace('http://', 'https://', 1)
#         code = 301
#         return redirect(url, code=code)


@app.route('/login-page', methods=["POST"])
def login_page():
    if "origin" not in request.form or "nonce" not in request.form:
        return "bad request", 400
    return render_template("login.html", origin=request.form["origin"], nonce=request.form["nonce"])


@app.route('/login', methods=["POST"])
def login():

    dbConn = None
    cursor = None

    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        body = request.get_json()

        query = """SELECT * FROM client WHERE username =  %s;"""
        data = (body["username"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if not record:
            return json.dumps({'message': 'Username does not exist', 'code': '401'})

        salt = record[3]

        pw_bytes = bytes(body["password"], 'utf-8')

        byte_hashed_pw = low_level.hash_secret(pw_bytes, bytes(
            salt, 'utf-8'), type=low_level.Type.ID, time_cost=3, memory_cost=65536, parallelism=4, hash_len=64)
        hashed_pw = base64.b64encode(byte_hashed_pw).decode("utf-8")

        if hashed_pw != record[2]:
            return json.dumps({'message': "The password isn't correct", 'code': 401})
        json_token = createToken(record[1], body["nonce"])
        # print(json_token)
        tok = jwt.encode(json_token, SECRET_KEY, algorithm=ALGORITHM)
        # print(tok)
        return json.dumps({"token":tok})

    except Exception as e:
        return json.dumps({'error': e})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route("/login/redirect",methods=["POST"])
def login_redirect():
    if "origin" not in request.form or "token" not in request.form :
        return "Bad request",400
    print(request.form)
    return render_template("login_redirect.html", url=request.form["origin"], token=request.form["token"])



@app.route('/register', methods=["POST", "GET"])
def register():

    if request.method == "GET":
        return render_template("register.html")

    dbConn = None
    cursor = None

    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        body = request.get_json()

        query = """SELECT * FROM client WHERE username =  %s;"""
        data = (body["username"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if record:
            return json.dumps({'message': 'User already exists', 'code': '401'})

        query = """INSERT INTO client (username, id, hashed_password, salt) VALUES (%s, %s, %s, %s)"""

        id = secrets.token_hex(TOKEN_BYTES)
        salt = secrets.token_hex(TOKEN_BYTES)
        pw_bytes = bytes(body["password"], 'utf-8')

        byte_hashed_pw = low_level.hash_secret(pw_bytes, bytes(
            salt, 'utf-8'), type=low_level.Type.ID, time_cost=3, memory_cost=65536, parallelism=4, hash_len=64)
        hashed_pw = base64.b64encode(byte_hashed_pw).decode("utf-8")

        record_to_insert = (body["username"], id, hashed_pw, salt)

        cursor.execute(query, record_to_insert)

        return json.dumps({'message': 'ok'}), 200

    except Exception as e:
        return json.dumps({'error': e})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()


if __name__ == "__main__":
    app.run(debug=True, port=81)
