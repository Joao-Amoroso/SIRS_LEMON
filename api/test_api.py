import requests

BASE_URL = "http://localhost:5000"


def test_rent():
    req = requests.post(BASE_URL+"/rent")
    jayson = req.json()
    pass


def test_get_vehicles():
    req = requests.get(BASE_URL+"/vehicles/unlocked")
    pass

