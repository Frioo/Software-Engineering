import fs from "fs";
import path from "path";
import express from "express";
import { getCountriesByPopluation, getCountriesByContinent } from "./db.mjs";

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

app.get("/countries-by-population", async (req, res) => {
  const countries = await getCountriesByPopluation();
  res.render("countries", { countries: countries });
});

app.get("/continents-by-population", async (req, res) => {
  const countries = await getCountriesByContinent("Europe");
  res.render("countries", { countries: countries });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
