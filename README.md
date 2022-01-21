# F-BauCua

This repository is a backend for playing the game **Bầu Cua Tôm Cá** (gourd crab shrimp fish), a Tet event of FPT University with the participation of students from different regions of Vietnam.

Here is the frontend repository link: [GitHub](https://github.com/phuong74200/bau-cua).

## Images

This is an image from Firebase Analytics of the web in production.
![](./.github/images/firebase-analytics.png)

## Tech Stack

- NestJS: A progressive Node.js framework to create API
- Class Validator: validate all params, queries, body of the request
- SocketIO: create realtime for clients
- Redis: used for SocketIO can recognize clients when running in different clusters
- Mongoose: used to connect to MongoDB
- PM2: process manager with cluster and remote monitor
- Firebase: used to login and deploy to the frontend

## Installation

Backend requires [Docker](https://www.docker.com/) to run.

- Create the **.env** file with the same format as the **.env.sample** file and config properly. Read more detailed instructions in the file **.env.sample**.
- Copy file serviceAccountKey.json of Firebase to root directory.
- See docs API at endpoint **/docs**

For production environments...

```sh
# Start
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
# Rebuild image Docker and start
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
# Shutdown
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

For development environments...

```sh
# Start
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
# Rebuild image Docker and start
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
# Shutdown
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```
