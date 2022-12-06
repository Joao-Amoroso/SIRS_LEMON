# API Server

# Installation

In the **api** directory

## 1. create an environment

> $ python3 -m venv venv

## 2. Active the environment

if you are in linux/macOS

> $ . venv/bin/activate

if you are in Windows run

> venv\Scripts\activate

After this step your shell prompt will change to show the name of the activated environment **"venv"**

## 3. Install all dependencies

For all dependencies in [dependencies](#dependencies) type

> pip install dependency

# Running the application

To run the aplication in dev mode write

> flask run

if you want to run in debug mode write instead

> flask --debug run

# dependencies

-   psycopg2
-   flask
-   flask_bcrypt
