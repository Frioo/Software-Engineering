# Software Engineering: Coursework 1

## Prerequisites  

[**node**](https://nodejs.org/en/download/) - we're using LTS (v16.13.2)  
[**npm**](https://www.npmjs.com/) - usually bundled with Node.  
[**docker**](https://www.docker.com/get-started) - for containerizing the servers in production  
[**mysql**](https://www.mysql.com/) - you need a mysql database server running on your machine, or access to a remote one. It's connection details and user credentials are required to start the server.

## Running in development

### 0. Set up MySQL server  
This step is only required in development, as the production version uses docker and automatically starts a mysql server alongside the express app.  
[MySQL Workbench](https://dev.mysql.com/downloads/workbench/)  
You'll also need the provided world.sql file imported into the database.

### 1. Create .env.development file in `./src`  
This file is required by the express app to connect to the database.  
An example.env.development file inside the folder can be used as a template.  
Make sure to do this BEFORE you install the packages.  

*src/.env.development*
```ini
DATABASE_URL="mysql://user:password@ip:port/database"
```
**Example:**  
user: joe  
password: secret  
ip: localhost  
port: 3306  
database: world  
```ini
DATABASE_URL="mysql://joe:secret@localhost:3306/world"
```

### 2. Install project's dependencies:  
Open a terminal window in the `src` directory and run:

```
npm install
```

### 3. Run development server: 

```sh
npm run dev
```

## Running in production

### 1. Create .env file in project root folder  
In production, the `.env` in root folder is used instead of `src/.env.development`, as it also contains the parameters that set up the MySQL server docker image.  
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

### 2. Start the containers!
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