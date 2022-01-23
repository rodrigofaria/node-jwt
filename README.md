# node-jwt

This repository represents the sample of the tutorial: [How to Build an Authentication API with JWT Token in Node.js](https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs)

## database

In order to run a [Mongo](https://www.mongodb.com/) database locally without having to install it, let's use [Docker](https://www.docker.com/).

Run the command below to do this:

```
docker run --name mydatabase -d \
 -e MONGO_INITDB_ROOT_USERNAME=admin \
 -e MONGO_INITDB_ROOT_PASSWORD=admin \
 -p 27017:27017 \
 mongo
```

## running

Use the command below to run the project:

```
npm run dev`
```

## endpoints

 - POST localhost:4001/register
   <br>Payload:<br>
   ```
   {
    "first_name": "x",
    "last_name": "xx",
    "email": "xx@xx.xx",
    "password": "xxx"
   }
   ```

- POST localhost:4001/login
   <br>Payload:<br>
   ```
   {
    "email": "xx@xx.xx",
    "password": "xxx"
   }
   ```

- GET localhost:4001/welcome
   <br>Header:<br>
   ```
   {
    "x-access-token": "token retrieved on the login process"
   }
   ```
