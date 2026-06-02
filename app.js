const express = require("express");
const User = require("./models/user");
const Post = require("./models/Post");
const profile = require("./models/profile");
const education = require("./models/profile/education");
const experience = require("./models/profile/experience")
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
// const { Model } = require("sequelize");

const app = express();
app.use(express.json());

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });
User.hasOne(profile, { foreignKey: "userId" });
profile.belongsTo(User, { foreignKey: "userId" });
// Education model association
education.belongsTo(User, { foreignKey: "userid" });
User.hasMany(education, { foreignKey: "userid" });
experience.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(experience, {
  foreignKey: "userId",
  // onDelete:"CASCADE"
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/exp", experienceRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
