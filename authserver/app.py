import psycopg2
import psycopg2.extras
from flask import Flask
import json

# SGBD configs
DB_HOST = ""
DB_USER = ""
DB_DATABASE = ""
DB_PASSWORD = ""
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (
    DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD)

app = Flask(__name__)

# body{
#   username,
#   hashed password
# }
@app.route('/login',methods=["POST"])
def login():
    # hash password
    # confirmar password com bd
    # criar token
    # associar token a user
    # devolver token do user
    pass

# body{
#   username,
#   hashed password
# }
@app.route('/register',methods=["POST"])
def register():
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