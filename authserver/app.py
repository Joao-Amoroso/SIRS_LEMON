import psycopg2
import psycopg2.extras
from flask import Flask, request
import json
import jwt
from datetime import datetime
import secrets
from Crypto.Hash import SHA3_512

# jwt configs
SECRET_KEY = "a"
ALGORITHM = "HS256"


# token configs
TOKEN_BYTES = 16
TOKEN_DURATION = 86400

# SGBD configs
DB_HOST = ""
DB_USER = ""
DB_DATABASE = ""
DB_PASSWORD = ""
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD)

app = Flask(__name__)


def createToken(id):
    data_token = {
            "sub" : id,
            "exp" : datetime.now() + datetime.timedelta(TOKEN_DURATION),
    }
    return json.dumps(data_token, indent=4)
    

@app.route('/login',methods=["POST"])
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
            return json.dumps({'message' : 'Username does not exist', 'code' : '401'})

        salt = record[3]
        hashed_pw = SHA3_512(body["password"] + salt)
        

        if hashed_pw != record[2]:
            return json.dumps({'message': "The password isn't correct", 'code': 401})


        json_token = createToken(record[1])

        return jwt.encode(json_token, SECRET_KEY, ALGORITHM)
         
        
    except Exception as e:
        return json.dumps({'error' : e})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route('/register',methods=["POST"])
def register():

    dbConn = None
    cursor = None

    try :
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        body = request.get_json()

        query = """SELECT * FROM client WHERE username =  %s;"""
        data = (body["username"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if record:
            return json.dumps({'message' : 'User already exists', 'code' : '401'})


        query = """INSERT INTO client (username, id, hashed_password, salt) VALUES (%s, %s, %s, %s)"""

        id = secrets.token_hex(64)
        salt = secrets.token_hex(64)

        hashed_pw = SHA3_512(body["password"] + salt)

        record_to_insert = (body["username"], id, hashed_pw, salt)

        cursor.execute(query, record_to_insert)

        

    except Exception as e:
        return json.dumps({'error' : e})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()


if __name__ == "__main__":
    app.run(debug=True)

    