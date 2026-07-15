const express = require("express");

const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const profileRoutes = require("./profileRoutes/profileRoutes");
const experienceRoutes = require("./profileRoutes/experienceRoutes");
const educationRoutes = require("./profileRoutes/educationRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/profiles", profileRoutes);
router.use("/exp", experienceRoutes);
router.use("/education", educationRoutes);

module.exports = router;
