const fs = require("fs");
require("dotenv").config();
const express = require("express");
var mysql = require("mysql");
const app = express();
const port = 8081;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
