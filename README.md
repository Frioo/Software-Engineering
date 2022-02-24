# Software Engineering: Coursework 1

## Prerequisites  

### Software / Tools
[**node**](https://nodejs.org/en/download/) - we're using LTS (v16.13.2)  
[**npm**](https://www.npmjs.com/) - usually bundled with Node.  
[**docker**](https://www.docker.com/get-started) - for containerizing the services.  

### Environment variables
**For docker-compose:**  
`.env` file in project root folder.  
This file is used by docker-compose to start the services with appropriate credentials and data.  
`DATABASE_*` variables are for the MySQL container, while `SERVER_*` and `DATABASE_URL` are used by the express server.    
An `example.env` file is provided in the repository that can be used as a template.  
```ini
# Name of database that will be initialized in the docker mysql container
DATABASE_NAME=world
# Password that will be set for the root user
DATABASE_ROOT_PASSWORD=root
# User to be created for connecting to database
DATABASE_USER=user
# Password for said user
DATABASE_PASSWORD=password
# Port mysql will run on inside the docker network
DATABASE_DOCKER_PORT=3306
# Port that will be exposed on host machine's network and mapped to internal docker port for mysql
DATABASE_LOCAL_PORT=3307  
# Database connection string that the prisma client will use (express server)
# Note that instead of `localhost` like in development we're referencing the mysql service name (from docker-compose.yml) as the host. Additionally, the containers connect to each other inside the docker network, thus using *_DOCKER_PORT
DATABASE_URL="mysql://user:password@database:3306/world"
# Port express will run inside docker net
SERVER_DOCKER_PORT=8081
# Host machine mapped port (so we'd access the site via `localhost:8080`)
SERVER_LOCAL_PORT=8080
```
**For express in dev mode:**  
`./src/.env.development` env file is required by the express app to connect to the database during development. In production `DATABASE_URL` from root .env file is passed by docker.  
An `example.env.development` file inside the `./src/` folder can be used as a template.  

*src/.env.development*
```ini
DATABASE_URL="mysql://user:password@ip:port/database"
```
**Example:**  
user: joe  
password: secret  
ip: localhost  
port: 3306 (DATABASE_LOCAL_PORT in dev)  
database: world  
```ini
DATABASE_URL="mysql://joe:secret@localhost:3307/world"
```


## Running in development

### 1. Install project's dependencies:  
Open a terminal window in the `src` directory and run:

```
npm install
```

### 2. Run development servers:
**Database**  
First, start just the database using docker-compose:  
```sh
docker-compose run --service-ports database
```
The `--service-ports` option is required for docker-compose to map the container port to localhost, so it's accessible to website dev server.  

**Express**  
Next, start the express server:  
```sh
npm run dev
```

## Running in production

### 1. Start the containers!
Open a terminal window at the project's root and run:  
```
docker-compose up
```  
You'll have to wait until the database is initialized before connecting, you'll see a message saying 'ready for connections` coming from the mysql daemon.  
Once the logs calm down, you can visit the website by navigating to [localhost:8080](http://localhost:8080) in your browser of choice.  

**Shutting down**  
To shut down the containers, run:
```
docker-compose down
```  
Optionally, you can pass `--rmi all` as an option to remove all the images and containers that were created by docker-compose.  
On the next run, everything will be re-built.