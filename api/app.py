import hashlib
import psycopg2
import psycopg2.extras
from flask import Flask, render_template, request, make_response, session, redirect, url_for

import json

from dotenv import load_dotenv
import os

import hmac
import jwt

import datetime

load_dotenv()

# SGBD configs
DB_HOST = os.environ.get("DB_HOST")
DB_USER = os.environ.get("DB_USER")
DB_DATABASE = os.environ.get("DB_DATABASE")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_PORT = 5433
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s port=%s " % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD,DB_PORT)


AUTH_KEY=os.environ.get("AUTH_KEY")
#AUTH_KEY=os.getenv("AUTH_KEY")

app = Flask(__name__)



NOT_AUTHORIZED = 401
BAD_REQUEST = 400
ALGORITHM="HS256"



@app.route("/")
def home():
    return render_template('index.html')


@app.route('/vehicles/unlocked')
def get_vehicles():

    if "Authorization" not in request.headers:
        return "not authorized",NOT_AUTHORIZED
    
    authorization_header = request.headers["Authorization"]
    if authorization_header[:7] != "Bearer ":
        return "not authorized", NOT_AUTHORIZED

    # check token
    token = authorization_header[7:]
    
    id = ""
    try:
        decoded = jwt.decode(token,AUTH_KEY,ALGORITHM)

        id = decoded["sub"]
    except Exception:
        return json.dumps({"errors": [{"field": "token", "error": "your token is invalid"}]}), NOT_AUTHORIZED

    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        query ="""select * from employee where employeeid = %s;"""
        data = (id,)
        cursor.execute(query, data)

        record = cursor.fetchone()
        print("cheguei aqui")
        print(record)
        if not record:
            return "not authorized", NOT_AUTHORIZED

        query = """SELECT * from vehicle where vehicleid not in (select vehicleid from locked);
"""

        cursor.execute(query)

        rows = cursor.fetchall()
        print(rows)
        res = []
        for record in rows:
            res.append(
                {"vehicleid": record[0], "lat": record[1], "lgt": record[2]})
        print(res)

        
        return res
    except Exception as e:
        return json.dumps({"errors": [{"field": "get vehicles", "error": "Something went wrong, try again"}]}), 500
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()


@app.route("/rent", methods=["POST"])
def rent():
    """
    {
    "vehicleid": "[valid vehicle id]",
    "duration": "[valid duration in minutes]",
    "payment_type": "[credit or debit ]",
    "name": "[name on card]",
    "card_number": "[card number]",
    "expiration": "[MM/YY]",
    "cvv": "[CVV]"
    }
    """

    if "Authorization" not in request.headers:
        return "not authorized",NOT_AUTHORIZED

    authorization_header = request.headers["Authorization"]
    # print(authorization_header)
    if authorization_header[:7] != "Bearer ":
        return "not authorized", NOT_AUTHORIZED

    # check token
    token = authorization_header[7:]
    id = ""
    try:
        decoded = jwt.decode(token,AUTH_KEY,"HS256")
        id = decoded["sub"]
    except Exception:
        return "not authorized", NOT_AUTHORIZED

    body = request.get_json()

    for e in ["duration","vehicleid","payment_type","name","card_number","cvv","expiration"]:
        if e not in body:
            return "bad request",BAD_REQUEST
    
    

    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        query = """
            SELECT * from vehicle where vehicleid = %s;
        """
        data = (body["vehicleid"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if not record:
            return json.dumps({"errors": [{"field": "vehicleid", "error": "vehicle doesn't exist"}]}), BAD_REQUEST

        duration = 0
        try:
            duration = int(body["duration"])
        except e:
            return json.dumps({"errors": [{"field": "duration", "error": "Duration must be a number"}]}), BAD_REQUEST

        if duration < 0:
            return json.dumps({"errors": [{"field": "duration", "error": "Duration must be a valid number"}]}), BAD_REQUEST

        query = """ SELECT * from locked where vehicleid = %s;
"""

        data = (body["vehicleid"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if record:
            return json.dumps({"errors": [{"field": "rent", "error": "Vehicle is already rent"}]}), BAD_REQUEST

        query = """ Insert into locked values ( %s, %s, %s, %s);
"""

        data = (body["vehicleid"],id,datetime.datetime.now(),duration)
        cursor.execute(query, data)

        return json.dumps({'message': 'ok'}), 200
    except Exception as e:
        print(e)
        return json.dumps({"errors": [{"field": "rent", "error": "Something went wrong, try again"}]}), 500
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route('/vehicles/position',methods=["PUT"])
def vehicles_position():
    # position,id, {hash(position,id)}signature

    body = request.get_json()

    for i in ["vehicleid","position","hmac"]:
        if i not in body:
            return "bad request",BAD_REQUEST
    
    if "lat" not in body["position"] and "lgt" not in body["position"]:
        return "bad request",BAD_REQUEST


    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        query = """
            SELECT * from vehicle where vehicleid = %s;
        """
        data = (body["vehicleid"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if not record:
            return json.dumps({"errors": [{"field": "vehicleid", "error": "vehicle doesn't exist"}]}), BAD_REQUEST
       
        vehicle_signature = record[3]
        h = hmac.new(bytes(vehicle_signature,'UTF-8'),str({"position":body["position"],"id":body["vehicleid"]}).encode('utf-8'),hashlib.sha512)

        if not hmac.compare_digest(h.hexdigest(),body["hmac"]):
            return "not authorized", NOT_AUTHORIZED

        query = """UPDATE vehicle set lat = %s,lgt = %s where vehicleid = %s;"""
        pos = body["position"]

        data = (pos["lat"],pos["lgt"],body["vehicleid"])
        cursor.execute(query, data)


        return "sucess", 200
    except Exception as e:
        print(e)
        return json.dumps({"errors": [{"field": "update position", "error": "Something went wrong, try again"}]}), 500
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()

@app.route('/login', methods=["GET"])
def login():

    return render_template('login.html')


@app.route('/register', methods=["GET"])
def register():

    return render_template('register.html')
