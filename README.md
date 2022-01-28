# Software Engineering: Coursework 1

## Prerequisites  

**node** - we're using LTS (v16.13.2)  
**npm** - usually bundled with Node.  
**mysql** - You need a mysql database server, it's connection details and user credentials. The database must be running.

### Setting up MySQL server

[MySQL Workbench](https://dev.mysql.com/downloads/workbench/)  
You'll also need the provided world.sql file imported into the database.

## Developing

Open a terminal window in the `src` directory.  

### 1. Install project's dependencies: 

```
npm install
```

### 2. Create .env file in `./src`  
You need to provide connection details for your MySQL database:  
```ini
DATABASE_URL="mysql://user:password@ip:port/database"
```
Example:  
user: joe  
password: secret  
ip: localhost  
port: 3306  
database: world  
```ini
DATABASE_URL="mysql://joe:secret@localhost:3306/world"
```

### 3. Run development server: 

```sh
npm run dev
```