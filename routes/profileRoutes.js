const express = require("express");
const {
  createProfile,
  getMyProfile,
  getAllProfiles,
  inspectProfile,
  
} = require("../controllers/userProfiles");
const authenticate = require("../middleware/authMiddleware");
const { getAllPosts } = require("../controllers/postController");
// const profile = require('../models/profile');
// const { route } = require('./postRoutes');

const router = express.Router();
router.post("/createProfile", authenticate, createProfile);
router.get("/getMyProfile", authenticate, getMyProfile);
router.get("/getAllProfiles", authenticate, getAllProfiles);
router.get("/inspect/:userId", authenticate, inspectProfile);

module.exports = router;
