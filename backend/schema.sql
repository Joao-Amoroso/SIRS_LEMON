DROP DATABASE IF EXISTS lemon;

CREATE DATABASE IF NOT EXISTS lemon;

DROP TABLE IF EXISTS vehicle;

CREATE TABLE vehicle (
    vehicleid int NOT NULL SERIAL,
    lat Decimal(8, 6) NOT NULL,
    lgt Decimal(9, 6) NOT NULL,
    vehicle_signature text NOT NULL,
    PRIMARY KEY (vehicleid)
);

DROP TABLE IF EXISTS employee;

CREATE TABLE employee(
    employee_username varchar(100) NOT NULL,
    hashed_password text NOT NULL,
    salt text NOT NULL UNIQUE,
    PRIMARY KEY (employee_username)
);

DROP TABLE IF EXISTS locked;

CREATE TABLE locked(
    vehicleid INT NOT NULL,
    clientid text NOT NULL,
    started_at datetime NOT NULL,
    duration datetime NOT NULL,
    PRIMARY KEY (vehicleid),
    FOREIGN KEY (vehicleid) REFERENCES vehicle (vehicleid)
);