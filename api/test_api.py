import requests
from bs4 import BeautifulSoup


def test_pokemon():
    t = requests.get('https://pokeapi.co/api/v2/pokemon/ditto')
    js = t.json()

    assert "abi" in js
    assert len(js["abilities"]) >= 2


BASE_URL = "http://localhost:5000"


def test_rent():
    req = requests.post(BASE_URL+"/rent")
    jayson = req.json()
    pass


def test_get_vehicles():
    req = requests.get(BASE_URL+"/vehicles/unlocked")
    pass


def test_homepage():
    req = requests.get(BASE_URL+"/")
    parsed_html = BeautifulSoup(req.text, 'html.parser')

    inputs = parsed_html.body.find_all("input")
    assert inputs != None
    assert len(inputs) >= 2

    vehicleid = list(filter(lambda x: x.get("id") == "vehicleid", inputs))
    assert vehicleid != []


def test_login():
    req = requests.get(BASE_URL+"/login")
    parsed_html = BeautifulSoup(req.text, 'html.parser')

    inputs = parsed_html.body.find_all("input")
    assert inputs != None
    assert len(inputs) >= 2

    username = list(filter(lambda x: x.get("id") == "username", inputs))
    assert username != []
    password = list(filter(lambda x: x.get("id") == "password", inputs))
    assert password != []


def test_register():
    req = requests.get(BASE_URL+"/register")
    parsed_html = BeautifulSoup(req.text, 'html.parser')

    inputs = parsed_html.body.find_all("input")
    assert inputs != None
    assert len(inputs) >= 2

    username = list(filter(lambda x: x.get("id") == "username", inputs))
    assert username != []
    password = list(filter(lambda x: x.get("id") == "password", inputs))
    assert password != []
