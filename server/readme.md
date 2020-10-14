Hot to work with mongo docker image
* Download mongo image

    `docker pull mongo`
    
* Create volume for persistence keeping of db data
 
    `docker volume create mongodata`
---------------------
* Start up mongo container

    `docker run --rm --name crm-mongo -p 27017:27017 -v mongodata:/data/db -d mongo`

* Stop mongo container
 
    `docker stop crm-mongo`
    
---------------------
* Connect to container and run bash

    `docker exec -it crm-mongo bash`
* Open mongo cli

    `mongo`
* Some mongo commands

    `show dbs` - list databases
    
    `show collections` - list collections in current db
    
    `db.users.find()` - select data from collection
    
--------------------
* Docker compose

    `docker-compose up -d` - start docker compose with yaml file in current folder
    
    `docker-compose down` - stop docker compose
    
    `docker rmi ${docker images -q}` - remove all noname images
