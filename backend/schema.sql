DROP DATABASE IF EXISTS lemon;

CREATE DATABASE IF NOT EXISTS lemon;

DROP TABLE IF EXISTS vehicle;

CREATE TABLE vehicle (
    vehicleid int(11) NOT NULL SERIAL,
    vehicle_location geography,
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
    clientid int(11) NOT NULL,
    pass varchar(100) NOT NULL,
    PRIMARY KEY (clientid)
);

DROP TABLE IF EXISTS locked;

CREATE TABLE locked(
    vehicleid INT(11) NOT NULL,
    clientid INT(11) NOT NULL,
    PRIMARY KEY (vehicleid, clientid),
    FOREIGN KEY (clientid) REFERENCES client (clientid),
    FOREIGN KEY (vehicleid) REFERENCES vehicle (vehicleid)
);