import fs from "fs";
import path from "path";
import express from "express";

const app = express();
const port = 8081;

//set view engine path
app.set("views", path.join(process.cwd(), "views"));
//set view engine to pug
app.set("view engine", "pug");

//default route
app.get("/", (req, res) => {
  res.render("view", { title: "xx me" });
});

// City Route
app.get("/city", (reg, res) => {
  res.render("city", { title: "Cities", city: "london" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
