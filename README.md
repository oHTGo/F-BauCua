# F-BauCua

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
