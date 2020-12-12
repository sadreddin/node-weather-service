const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sadreddin M",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sadreddin M",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sadreddin M",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecastData,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sadreddin M",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sadreddin M",
    errorMessage: "Page not found.",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
