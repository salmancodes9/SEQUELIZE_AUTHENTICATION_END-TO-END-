const express = require("express");
const User = require("./models/user");
const Post = require("./models/Post");
const profile = require("./models/profile");

const Education = require("./models/profile/education");
const School = require("./models/profile/school");
const degree = require("./models/profile/degree")
const fieldOfStudy = require("./models/profile/fieldOfStudy")

const Experience = require("./models/profile/experience");
const Skills = require("./models/skills/skills");
const UserSkills = require("./models/skills/userSkills");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes/profileRoutes");
const experienceRoutes = require("./routes/profileRoutes/experienceRoutes");
const educationRoutes = require("./routes/profileRoutes/educationRoutes");
// const { Model } = require("sequelize");

const app = express();
app.use(express.json());

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });
User.hasOne(profile, { foreignKey: "userId" });
profile.belongsTo(User, { foreignKey: "userId" });
// Education model association
Education.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Education, { foreignKey: "userId" });
Education.belongsTo(School, { foreignKey: "schoolId" });
School.hasMany(Education, { foreignKey: "schoolId" });
Experience.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Experience, {
  foreignKey: "userId",
  // onDelete:"CASCADE"
});

User.belongsToMany(Skills, {
  through: UserSkills,
  foreignKey: "userId",
  otherKey: "skillId",
});
Skills.belongsToMany(User, {
  through: UserSkills,
  foreignKey: "skillId",
  otherKey: "userId",
});
Education.belongsTo(User, {
  foreignKey: "userId"
});

Education.belongsTo(degree, {
  foreignKey: "degreeId"
});

Education.belongsTo(School, {
  foreignKey: "schoolId"
});

Education.belongsTo(fieldOfStudy, {
  foreignKey: "fieldOfStudyId"
});


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/exp", experienceRoutes);
app.use("/api/education", educationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
