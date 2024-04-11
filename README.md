# Backend Developer Assignment

# Project Highlights

1. Node.js
2. Express.js
3. Typescript
4. Mongoose
5. Mongodb
6. Zod
7. Docker
8. JWT

## How to build and run this project

- Install using Docker Compose [**Recommended Method**]

  - Clone this repo.
  - Make a copy of **.env.example** file to **.env**.
  - Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
  - Execute `docker-compose up -d` in terminal from the repo directory.
  - You will be able to access the api from http://localhost:8080
  - _If having any issue_ then make sure `8080` port is not occupied else provide a different port in **.env** file.
  - _If having any issue_ then make sure `27017` port is not occupied else provide a different port in **.env** file.

- Install Without Docker [**2nd Method**]
  - Clone this repo.
  - Install node.js and npm on your local machine.
  - From the root of the project executes in terminal `npm install`.
  - _Use the latest version of node on the local machine if the build fails_.
  - Install MongoDB on your local.
  - Change the `DB_HOST` to `localhost` in **.env** file.
  - Execute `npm run dev` and You will be able to access the API from http://localhost:8080

## API Examples

- Register

  - Routes

  ```
  POST http://localhost:8080/api/v1/users/register
  ```

  - Request Body

  ```json
  {
    "username": "raja",
    "fullname": "rajaraja",
    "email": "rajaraja@gmail.com",
    "password": "12345678"
  }
  ```

  - Response Body: 200

  ```json
  {
    "statusCode": 200,
    "data": {
      "_id": "6617a934eec5e97511da585e",
      "username": "raja",
      "email": "rajaraja@gmail.com",
      "fullname": "rajaraja",
      "createdAt": "2024-04-11T09:11:16.795Z",
      "updatedAt": "2024-04-11T09:11:16.795Z",
      "__v": 0
    },
    "message": "User registered successfully",
    "success": true
  }
  ```

- Login
  - Routes
  ```
  POST http://localhost:8080/api/v1/users/login
  ```
  - Request Body
  ```json
  {
    "username": "raja",
    "email": "rajaraja@gmail.com",
    "password": "12345678"
  }
  ```
  - Response Body: 200
  ```json
  {
    "statusCode": 200,
    "data": {
      "user": {
        "_id": "6617a846190f355bc9442e0a",
        "username": "raj",
        "email": "raja@gmail.com",
        "fullname": "raja",
        "createdAt": "2024-04-11T09:07:18.064Z",
        "updatedAt": "2024-04-11T11:23:57.749Z",
        "__v": 0
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE3YTg0NjE5MGYzNTViYzk0NDJlMGEiLCJlbWFpbCI6InJhamFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJyYWoiLCJmdWxsbmFtZSI6InJhamEiLCJpYXQiOjE3MTI4MzQ2MzcsImV4cCI6MTcxMjkyMTAzN30.rUdXr4SY_lmLP-r8nAILYjZm6-NxSUNyYsFFLxqd4Io",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE3YTg0NjE5MGYzNTViYzk0NDJlMGEiLCJpYXQiOjE3MTI4MzQ2MzcsImV4cCI6MTcxMzY5ODYzN30.MxFB9yXZ9aVco0Cexx9k8EiXqrM6CVcfwvup4tDrkaY"
    },
    "message": "user logged in successfully",
    "success": true
  }
  ```
