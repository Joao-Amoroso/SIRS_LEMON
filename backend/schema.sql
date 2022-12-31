DROP DATABASE IF EXISTS lemon;
CREATE DATABASE lemon;
DROP TABLE IF EXISTS vehicle;
CREATE TABLE vehicle (
    vehicleid text NOT NULL,
    lat Decimal(8, 6) NOT NULL,
    lgt Decimal(9, 6) NOT NULL,
    vehicle_signature text NOT NULL,
    PRIMARY KEY (vehicleid)
);
DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
    employeeid text NOT NULL,
    PRIMARY KEY (employeeid)
);
DROP TABLE IF EXISTS locked;
CREATE TABLE locked(
    vehicleid text NOT NULL,
    clientid text NOT NULL,
    started_at timestamp NOT NULL,
    duration int NOT NULL,
    PRIMARY KEY (vehicleid),
    FOREIGN KEY (vehicleid) REFERENCES vehicle (vehicleid)
);