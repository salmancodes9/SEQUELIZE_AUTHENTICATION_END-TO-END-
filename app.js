const express = require("express");
const User = require("./models/user");
const Post = require("./models/Post");
const profile = require("./models/profile");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
app.use(express.json());

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });
User.hasOne(profile, { foreignKey: "userId" });
profile.belongsTo(User, { foreignKey: "userId" });

// app.get("/users", async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// });

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profiles", profileRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});



module.exports = app;
