const fs = require("fs");
require("dotenv").config();
const express = require("express");
var mysql = require("mysql");
const path = require('path');

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

//set view engine path 
app.set('views', path.join(__dirname,'views'));
//set view engine to pug
app.set('view engine', 'pug');

//default route
app.get("/", (req, res) => {
  res.render('view' ,{title: 'xx me'});
});

// City Route
app.get('/city', (reg,res) => {
  res.render('city',{title: 'Cities', city: 'london'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
