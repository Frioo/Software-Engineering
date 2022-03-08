import fs from "fs";
import path from "path";
import express from "express";
import { getCountries } from "./db.mjs";

const app = express();
const port = 8081;

// Serve static assets
app.use(express.static(path.join(process.cwd(), "public")));

//set view engine path
app.set("views", path.join(process.cwd(), "views"));

//set view engine to pug
app.set("view engine", "pug");

//default route
app.get("/", (req, res) => {
  res.render("view", { title: "Hello, world!" });
});

// City Route
app.get("/city", (reg, res) => {
  res.render("city", { title: "Cities", city: "london" });
});

app.get("/countries", async (req, res) => {
  const options = { ...req.query };
  const countries = await getCountries(options);
  res.render("countries", { options, countries });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
