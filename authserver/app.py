import psycopg2
import psycopg2.extras
from flask import Flask, request, redirect, render_template,jsonify
import json
import jwt
from datetime import datetime, timedelta,timezone
import secrets
from argon2 import low_level
import base64


# status codes

NOT_AUTHORIZED = 401
BAD_REQUEST = 400

# jwt configs

f = open('authserver.key', "rb")
AUTH_PRIVATE_KEY = f.read()
f.close

f = open('authserverpublic.key', "rb")
AUTH_PUBLIC_KEY = f.read()
f.close


SECRET_KEY = "a"
ALGORITHM = "RS256"


# token configs
TOKEN_BYTES = 64
TOKEN_DURATION = 60

# SGBD configs
DB_HOST = "127.0.0.1"
DB_USER = "postgres"
DB_DATABASE = "postgres"
DB_PASSWORD = ""
DB_PORT = "5432"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s port=%s" % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT)






HOST_URL = "https://10.0.1.5:80"
HOST_IP = "10.0.1.5"




app = Flask(__name__)


def createToken(id, nonce,origin):
    data_token = {
        "sub": id,
        "exp": datetime.now() + timedelta(minutes=TOKEN_DURATION),
        "nonce": nonce,
        "to": origin
    }
    return data_token

@app.before_request
def before_request():
    if not request.is_secure:
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)


@app.route('/login-page', methods=["POST"])
def login_page():
    if "origin" not in request.form or "nonce" not in request.form:
        return "bad request", 400
    return render_template("login.html", origin=request.form["origin"], nonce=request.form["nonce"])


@app.route('/login', methods=["POST"])
def login():

    dbConn = None
    cursor = None
    body = request.get_json()
    
    for e in ["username","password","nonce","origin"]:
        if e not in body:
            return "bad request",BAD_REQUEST

    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        


        query = """SELECT * FROM client WHERE username =  %s;"""
        data = (body["username"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if not record:
            return 'Username does not exist', BAD_REQUEST

        salt = record[3]

        pw_bytes = bytes(body["password"], 'utf-8')

        byte_hashed_pw = low_level.hash_secret(pw_bytes, bytes(
            salt, 'utf-8'), type=low_level.Type.ID, time_cost=3, memory_cost=65536, parallelism=4, hash_len=64)
        hashed_pw = base64.b64encode(byte_hashed_pw).decode("utf-8")
        

        if hashed_pw != record[2]:
            return "The password isn't correct", BAD_REQUEST

        json_token = createToken(record[1], body["nonce"],body["origin"])
        # print(json_token)
        tok = jwt.encode(json_token, AUTH_PRIVATE_KEY, algorithm=ALGORITHM)
        # print(tok)
        return json.dumps({"token":tok}), 200

    except Exception as e:
        print(e)
        return jsonify({"errors": [{"field": "login", "error": "Something went wrong, try again"}]}), 500

    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route("/login/redirect",methods=["POST"])
def login_redirect():
    if "origin" not in request.form or "token" not in request.form :
        return "Bad request",BAD_REQUEST
    print(request.form)
    return render_template("login_redirect.html", url=request.form["origin"], token=request.form["token"])



@app.route('/register', methods=["POST", "GET"])
def register():

    if request.method == "GET":
        return render_template("register.html")

    body = request.get_json()

    for e in ["username","password"]:
        if e not in body:
            return "bad request",400

    dbConn = None
    cursor = None

    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)


        query = """SELECT * FROM client WHERE username =  %s;"""
        data = (body["username"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if record:
            return 'User already exists', BAD_REQUEST

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
        print(e)
        return jsonify({"errors": [{"field": "register", "error": "Something went wrong, try again"}]}), 500

    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()


if __name__ == "__main__":
    app.run(debug=True,host=HOST_IP, port=80,ssl_context=("authserver.crt","authserver.key"))
