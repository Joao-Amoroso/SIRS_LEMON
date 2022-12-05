DROP DATABASE IF EXISTS lemon;

CREATE DATABASE IF NOT EXISTS lemon;

DROP TABLE IF EXISTS vehicle;

CREATE TABLE vehicle (
    vehicleid int(11) NOT NULL SERIAL,
    lat Decimal(8, 6) NOT NULL,
    lgt Decimal(9, 6) NOT NULL,
    PRIMARY KEY (vehicleid)
);

DROP TABLE IF EXISTS employee;

CREATE TABLE employee(
    employeeid int(11) NOT NULL,
    pass varchar(100) NOT NULL,
    PRIMARY KEY (employeeid)
);

DROP TABLE IF EXISTS client;

CREATE TABLE client(
    username varchar(100) NOT NULL,
    pass varchar(100) NOT NULL,
    PRIMARY KEY (clientid)
);

DROP TABLE IF EXISTS locked;

CREATE TABLE locked(
    vehicleid INT(11) NOT NULL,
    clientid INT(11) NOT NULL,
    PRIMARY KEY (vehicleid, clientid),
    FOREIGN KEY (clientid) REFERENCES client (username),
    FOREIGN KEY (vehicleid) REFERENCES vehicle (vehicleid)
);