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

        res = []
        for record in cursor:
            res.append(
                {"vehicleid": record[0], "lat": record[1], "lgt": record[2]})
        return json.dumps(res)
    except Exception as e:
        return json.dumps({'error': str(e)})
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

    authorization_header = request.headers["authorization"]
    if authorization_header[:7] != "Bearer ":
        return "not authorized", 401

    # check token

    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        body = request.get_json()
        query = """
            SELECT * from vehicle where vehicleid = $1;
        """
        data = (body["vehicleid"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if not record:
            return json.dumps({"errors": [{"field": "vehicleid", "error": "vehicle doesn't exist"}]}), 400

        duration = 0
        try:
            duration = int(body["duration"])
        except e:
            return json.dumps({"errors": [{"field": "duration", "error": "Duration must be a number"}]}), 400

        if duration < 0:
            return json.dumps({"errors": [{"field": "duration", "error": "Duration must be a valid number"}]}), 400

        query = """ SELECT * from locked where vehicleid = $1;
"""

        data = (body["vehicleid"],)

        cursor.execute(query, data)

        record = cursor.fetchone()

        if record:
            return json.dumps({"errors": [{"field": "rent", "error": "Vehicle is already rent"}]}), 400

        query = """ Insert into locked values ($1,$2);
"""

        data = (body["vehicleid"],)
        cursor.execute(query, data)

        return json.dumps({'message': 'ok'}), 200
    except Exception as e:
        return json.dumps({"errors": [{"field": "rent", "error": "Something went wrong, try again"}]}), 500
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
