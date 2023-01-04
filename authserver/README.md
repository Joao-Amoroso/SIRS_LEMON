# Setup

In the **authserver** directory

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
python app.py
```

if you want to run in debug mode write instead

```bash
python app.py --debug
```

# Routes

All routes that the api handles

-   **[login page](#post-login-page)** : `POST /login-page`
-   **[login](#post-login)** : `POST /login`
-   **[login redirect](#post-loginredirect)** : `POST /login/redirect`
-   **[register page](#get-register)** : `GET /register`
-   **[register](#post-register)** : `POST /register`

# POST /login-page

Renders a login page

## Request

Data Constraints

```json
{
    "origin": "[ the url where the user needs to be redirected to login ]",
    "nonce": "[ random value gave by the server where the user wants to login ]"
}
```

Example

```json
{
    "origin": "https://lemon/SSO",
    "nonce": "CF2911B6E1CFE3CADC66FB359EC7D"
}
```

## Response

### **code**: `200 OK`

**returns**: [`login.html`](./templates/login.html)

### **code**: `400 BAD REQUEST`

# POST /login

handles login

## Request

Data Constraints

```json
{
    "username": "[ username ]",
    "password": "[ password ]",
    "nonce": "[random value gave by the server where the user wants to login ]"
}
```

Example

```json
{
    "username": "joao",
    "password": "dasdsadas",
    "nonce": "CF2911B6E1CFE3CADC66FB359EC7D"
}
```

## Response

### **code**: `200 OK`

**returns**:

```json
{
    "token": "[JWT token]"
}
```

# POST /login/redirect

Renders the redirect page

## Request

Data Constraints

```json
{
    "origin": "[ the url where the user needs to be redirected to login ]",
    "token": "[ token ]"
}
```

## Response

### **code**: `200 OK`

**returns**: [`login_redirect.html`](./templates/login_redirect.html)

### **code**: `400 BAD REQUEST`

# GET /register

Renders register page

## Response

### **code**: `200 OK`

# POST /register

handles register

## Request

Data Constraints

```json
{
    "username": "[ username ]",
    "password": "[ password ]"
}
```

## Response

### **code**: `200 OK`

### **code**: `400 BAD REQUEST`

# dependencies

-   psycopg2
-   flask
-   pyjwt
-   hmac
-   requests
-   pytest
-   argon2
