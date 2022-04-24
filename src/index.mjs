import fs from "fs";
import path from "path";
import express from "express";
import { getCountries, getCities, getPopulation } from "./js/db.mjs";

const app = express();
const port = 8081;

// Serve static assets
app.use(express.static(path.join(process.cwd(), "public")));

/* Middleware */
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//set view engine path
app.set("views", path.join(process.cwd(), "views"));

//set view engine to pug
app.set("view engine", "pug");

//default route
app.get("/", (req, res) => {
  res.render("view", { title: "Hello, world!" });
});

// City reports
app.get("/cities", async (req, res) => {
  const options = { ...req.query };
  const cities = await getCities(options);
  res.render("cities", { options, cities });
});

// Country reports
app.get("/countries", async (req, res) => {
  const options = { ...req.query };
  const countries = await getCountries(options);
  res.render("countries", { options, countries });
});

// Population reports
app.get("/population", async (req, res) => {
  const options = { ...req.query };
  const population = await getPopulation(options);
  res.render("population", { options, population });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
