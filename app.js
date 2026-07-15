const express = require("express");
require("./config/associations");

const routes = require("./routes");

const app = express();
app.use(express.json());

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
