const fs = require("fs");
require("dotenv").config();
const express = require("express");
var mysql = require("mysql");

// Setup connection to MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database", err);
  }

  console.log("Database connected");
});

const app = express();
const port = 8081;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
