# Transportation & Distribution: Lemon

<p align="center">
<img src="./images/lemon.png" alt="lemon logo" width="100px" />
</p>

Lemon is an international shared electric vehicle company that operates in Portugal since 2018, both with electric scooters and electric bicycles.

Customers can look for and unlock these vehicles through a mobile app or a website, where they also perform the payment for the used services.

Lemon's employees also have an internal app to pick up wrongly parked vehicles, which has access to their location through GPS and suggests the best course with Google Maps integration.

Begin with an introductory paragraph that tells readers the purpose of your software and its major benefits.
Give them a summary of the information you will include in your ReadMe using clearly defined sections.

## General Information

This section expands on the introductory paragraph to give readers a better understanding of your project.
Include a brief description and answer the question, "what problem does this project solve?"

### Built With

-   [Postgresql](https://www.postgresql.org/) - used for database
-   [Flask](https://flask.palletsprojects.com/en/2.2.x/) - used to build every API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run our project we assume that you are using a computer running the SEED labs VM, setup as described [here](https://github.com/tecnico-sec/Setup/). The most recent Ubuntu LTS distribution can be used with a similar setup flow.

You need Python3 and Postgresql that can be installed with
```
sudo apt install python3
sudo apt install postgresql
```
Now that you have python, installing pip can help installing the libraries needed

```
sudo apt install python3-pip
```

Finally you can install the libraries needed:
 ```
 pip install flask pyjwt Datetime secrets argon2-cffi hmac hashlib APScheduler
 ```

### Installing

1) Configure postgres on the lemon database VM to use the certificates distributed, by changing the values of postgres.conf . 
        
	    change:
		    listen_address='*'
		    (ADD SSL FILES after running chmod and chown on them to guarantee only postgres has access to them )

    Change pg_hba.conf to allow connections from lemon API VM.
        
		host all all 10.0.4.0/24 "scram-sha-256"
2) Restart the postgres database service 
        
        sudo service postgresql restart
3) Load the schemas to the respective databases.
4) Set the following firewall rules:

    lemon API / authentication API:

		sudo iptables -A INPUT -s 0/0 -p tcp --dport 80 -j ACCEPT
		sudo iptables -A INPUT -s 0/0 -p tcp --dport 443 -j ACCEPT
    lemon database:
        
		sudo iptables -A INPUT -s 10.0.4.0/24 -p tcp --dport 5432 -j ACCEPT


## Running

1) Re-set firewall rules,  since they are lost on boot
2) Run respective app.py for the server in question, under the 'root' user to allow bind to low number ports. Ex for api:

        cd ~/SIRS_CODE/api
        sudo python3 app.py

## Deployment

For deployment on a live server, one would have to:
- get domains for the running machines
- get certificates issued to those domains
- distribute the certificates to the servers
- change the domains inside the apps to match the servers' domains 

## Additional Information

### Authors

-   **João Amoroso** - _Initial work_ - [Joao-Amoroso](https://github.com/Joao-Amoroso)

-   **João Raposo** - _Initial work_ - [JohnFox191](https://github.com/JohnFox191)
-   **João Teixeira** - _Initial work_ - [joaomteixeira](https://github.com/joaomteixeira)

See also the list of [contributors](https://github.com/Joao-Amoroso/SIRS_LEMON/contributors) who participated in this project.
