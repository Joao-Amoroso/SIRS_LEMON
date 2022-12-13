import psycopg2
import psycopg2.extras
from flask import Flask, render_template, request, make_response, session, redirect, url_for
import json
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

# SGBD configs
DB_HOST = os.environ.get("DB_HOST")
DB_USER = os.environ.get("DB_USER")
DB_DATABASE = os.environ.get("DB_DATABASE")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD)

app = Flask(__name__)
# app.secret_key = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
# bcrypt = Bcrypt(app)


@app.route("/")
def hello_world():
    return render_template('index.html')


@app.route('/vehicles/unlocked')
def get_vehicles():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        query = """SELECT * from vehicle where vehicleid not in (select vehicleid from locked);
"""

        data = ()
        cursor.execute(query, data)

        records = cursor.fetchall()
        return json.dumps({'data': records})
    except Exception as e:
        return json.dumps({'error': str(e)})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()


@app.route("/rent", methods=["POST"])
def rent():
    # body {"vehicleid"}
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        body = request.get_json()
        query = """ SELECT * from locked where vehicleid = $1;
"""

        data = (body["vehicleid"],)
        cursor.execute(query, data)

        record = cursor.fetchone()

        if record:
            return json.dumps({'message': 'The vehicle is already rented', 'code': 401})

        query = """ Insert into locked values ($1,$2);
"""

        data = (body["vehicleid"],)
        cursor.execute(query, data)

        return json.dumps({'message': 'ok'})
    except Exception as e:
        return json.dumps({'error': str(e)})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()


@app.route('/login', methods=["GET"])
def login():

    return render_template('login.html')
#     # body {username,password}
#     dbConn = None
#     cursor = None
#     try:
#         dbConn = psycopg2.connect(DB_CONNECTION_STRING)
#         cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
#         body = request.get_json()
#         query = """ SELECT * from client where username = $1;
# """

#         data = (body["username"],)
#         cursor.execute(query, data)

#         record = cursor.fetchone()

#         if not record:
#             return json.dumps({'message': "The username doesn't exist", 'code': 401})

#         # hash password
#         hash_password = bcrypt.generate_password_hash(body["password"])

#         if bcrypt.check_password_hash(hash_password, record[0]):
#             return json.dumps({'message': "The password isn't correct", 'code': 401})

#         # generate cookie
#         cookie = "boas"
#         resp = make_response(render_template('<h1>cookie was set</h1>'))
#         resp.set_cookie('userID', cookie)

#         return resp
#     except Exception as e:
#         return json.dumps({'error': str(e)})
#     finally:
#         dbConn.commit()
#         cursor.close()
#         dbConn.close()


@app.route('/register', methods=["GET"])
def register():

    return render_template('register.html')
#     dbConn = None
#     cursor = None
#     try:
#         dbConn = psycopg2.connect(DB_CONNECTION_STRING)
#         cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
#         body = request.get_json()
#         query = """ SELECT * from client where username = $1;
# """

#         data = (body["username"],)
#         cursor.execute(query, data)

#         record = cursor.fetchone()

#         if record:
#             return json.dumps({'message': "The username already exists", 'code': 401})

#         # hash password
#         hash_password = bcrypt.generate_password_hash(body["password"])
#         query = """ insert into client values ($1,$2);
# """

#         data = (body["username"], hash_password)
#         cursor.execute(query, data)

#         # generate cookie
#         cookie = "boas"
#         resp = make_response(render_template('<h1>cookie was set</h1>'))
#         resp.set_cookie('userID', cookie)

#         return resp
#     except Exception as e:
#         return json.dumps({'error': str(e)})
#     finally:
#         dbConn.commit()
#         cursor.close()
#         dbConn.close()
