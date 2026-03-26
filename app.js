const bodyParser = require("body-parser");
const express = require("express");
const user = require("./models/user");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(bodyParser.json());
app.get("/", (req, res) => {
  console.log("POST / hit ", req.body);
  res.send("asdfghj");
  // res.json({ message: "we are on the server" });
});
app.get("/users", async (req, res) => {
  const users = await user.findAll();
  res.send(users);
});
app.use("/api/auth", authRoutes);
// app.use("/api/auth/login", authRoutes);

module.exports = app;
