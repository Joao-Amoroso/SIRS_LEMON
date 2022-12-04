import psycopg2
import psycopg2.extras
from flask import Flask, render_template
import json
# SGBD configs
DB_HOST = ""
DB_USER = ""
DB_DATABASE = ""
DB_PASSWORD = ""
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD)

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template('index.html')


@app.route("/rent", methods=["POST"])
def hi():
    dbConn = None
    cursor = None
    try:
        dbConn = psycopg2.connect(DB_CONNECTION_STRING)
        cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        query = """
"""

        data = ()
        cursor.execute(query, data)
        return json.dumps({'message': 'ok'})
    except Exception as e:
        return json.dumps({'error': str(e)})
    finally:
        dbConn.commit()
        cursor.close()
        dbConn.close()
