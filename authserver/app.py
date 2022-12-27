import psycopg2
import psycopg2.extras
from flask import Flask, request
import json
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime
import secrets

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

bcrypt = Bcrypt(app)


def createToken():
    """
    {
    "start-time" : 
    "duration" :
    "token" : 
    }
    """
    data_token = {
            "start-time" : datetime.now(),
            "duration" : TOKEN_DURATION,
    }

    token = secrets.token_bytes(TOKEN_BYTES)
    data_token.update( {"token" : token})
    return json.dumps(data_token, indent=4)
    

@app.route('/')
def teste():
    return "pixas e lavagantes"
# body{
#   username,
#   hashed password
# }
@app.route('/login',methods=["POST"])
def login():

    dbConn = None
    cursor = None

    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        body = request.get_json()

        query = """SELECT hashed_password FROM client WHERE username =  $1;"""
        data = (body["username"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if not record:
            return json.dumps({'message' : 'Username does not exist', 'code' : '401'})

        if not bcrypt.check_password_hash(body["password"], record["password"]):
            return json.dumps({'message': "The password isn't correct", 'code': 401})


        json_token = createToken()
    
        query = """"INSERT INTO tokens (username, token) VALUES ($1,$2);"""

        record_to_insert = (body["username"], json_token["token"])

        cursor.execute(query, record_to_insert)

        jwt_encoded = jwt.encode(json_token, SECRET_KEY, ALGORITHM)
       
        # devolver json     
        
    except Exception as e:
        return json.dumps({'error' : e})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

    

    return "teste"
    # hash password
    # confirmar password com bd
    # criar token
    # associar token a user
    # devolver token do user

# body{
#   username,
#   hashed password
# }
@app.route('/register',methods=["POST"])
def register():

    dbConn = None
    cursor = None

    try :
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        body = request.get_json()

        query = """SELECT * FROM client WHERE username =  $1;"""
        data = (body["username"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if record :
            return json.dumps({'message' : 'User already exists', 'code' : '401'})

        query = """INSERT INTO client (username, hashed_password, salt) VALUES ($1,$2,$3)"""

        #to remove salt (password already comes with salt (?))
        record_to_insert = (body["username"], body["password"], "salt")

        cursor.execute(query, record_to_insert)

        # login?


    except Exception as e:
        return json.dumps({'error' : e})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()


    # verificar se user existe
    # hash password
    # criar user
    # associar token a user
    # devolver token do user
    pass

# body{
#   token,
# }
@app.route('/user',methods=["POST"])
def is_user():
    # verificar se token existe
    pass



if __name__ == "__main__":
    app.run(debug=True)

    