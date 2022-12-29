# Setup

In the **api** directory

## 1. create an environment

```bash
python3 -m venv venv
```

## 2. Active the environment

if you are in linux/macOS

```bash
. venv/bin/activate
```

if you are in Windows run

```bash
venv\Scripts\activate
```

After this step your shell prompt will change to show the name of the activated environment **"venv"**

## 3. Install all dependencies

For all dependencies in [dependencies](#dependencies) type

```bash
pip install dependency
```

# Running the application

To run the aplication in dev mode write

```bash
flask run
```

if you want to run in debug mode write instead

```bash
flask --debug run
```

# Routes

All routes that the api handles

-   **[login](#get-login)** : `GET /login`
-   **[register](#get-register)** : `GET /register`
-   **[home](#get])** : `GET /`
-   **[rent](#post-rent)** : `POST /rent`
-   **[get vehicles unlocked](#get-vehiclesunlocked)** : `GET /vehicles/unlocked`
-   **[update vehicle position](#put-vehiclesposition)** : `PUT /vehicles/position`

# GET /login

Renders a login page

## Response

### **code**: `200 OK`

**returns**: [`login.html`](./templates/login.html)

# GET /register

Renders a register page

## Response

### **code**: `200 OK`

**returns**: [`resgister.html`](./templates/register.html)

# GET /

Renders the home page

## **Auth required**

## Response

### **code**: `200 OK`

**returns**: [`index.html`](./templates/index.html)

### **code**: `401 Unauthorized`

Redirects to login page

# POST /rent

Rent a vehicle

## **Auth required**

## Request

Data Constraints

```json
{
    "vehicleid": "[valid vehicle id]",
    "duration": "[valid duration in minutes]",
    "payment_type": "[credit or debit ]",
    "name": "[name on card]",
    "card_number": "[card number]",
    "expiration": "[MM/YY]",
    "cvv": "[CVV]"
}
```

Example

```json
{
    "vehicleid": "vyh345",
    "duration": 360,
    "payment_type": "credit",
    "name": "Alberto Maria Pereira Gomes",
    "card_number": "9999 9999 9999 9999",
    "expiration": "12/12",
    "cvv": "123"
}
```

## Response

### **code**: `200 OK`

### **code**: `400 BAD REQUEST`

### **returns**

```json
{
    "errors": [
        {
            "field": "[header]",
            "error": "error"
        }
    ]
}
```

Example

```json
{
    "errors": [
        {
            "field": "vehicleid",
            "error": "The vehicle vyh346 doesn't exist."
        },
        {
            "field": "card",
            "error": "The card doesn't exist."
        }
    ]
}
```

### **code**: `401 Unauthorized`

Redirects to login page

# GET /vehicles/unlocked

Returns all vehicles that are unlocked

## **Auth required** (Need to be an employee)

## Response

### **code**: `200 OK`

```json
[
    {
        "vehicleid": "[]",
        "lat": "[]",
        "lgt": "[]"
    }
]
```

Example

```json
[
    {
        "vehicleid": "vyh345",
        "lat": "38.705077",
        "lgt": "-9.385283"
    },
    {
        "vehicleid": "vyh344",
        "lat": 38.745548,
        "lgt": -9.147874
    }
]
```

### **code**: `401 Unauthorized`

Redirects to login page

# PUT /vehicles/position

Updates a vehicle position

## Request

Data Constraints

```json
{
    "position": {
        "lat": "[valid latitude]",
        "lgt": "[valid longitude]"
    },
    "id": "[vehicle id]",
    "hmac": "[signature]"
}
```

Example

```json
{
    "position": {
        "lat": 38.745548,
        "lgt": -9.147874
    },
    "id": "hfisd",
    "hmac": "gdsjiodgsijkgdskgdsnklgmsdlsgdml"
}
```

## Response

### **code**: `200 OK`

### **code**: `401 Unauthorized`

### **code**: `400 BAD Request`

# dependencies

-   psycopg2
-   flask
-   pyjwt
-   hmac
-   python-dotenv
-   requests
-   pytest
-   bs4
