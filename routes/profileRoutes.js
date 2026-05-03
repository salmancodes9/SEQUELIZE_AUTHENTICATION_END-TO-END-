const express = require("express");
const {
  createProfile,
  getMyProfile,
  getAllProfiles,
  inspectProfile,
  
} = require("../controllers/userProfiles");
const authenticate = require("../middleware/authMiddleware");
const { getAllPosts } = require("../controllers/postController");
const upload = require("../middleware/postImageUpload");
// const profile = require('../models/profile');
// const { route } = require('./postRoutes');

const router = express.Router();
router.post("/createProfile", authenticate, upload.single('image'),  createProfile);
router.get("/getMyProfile", authenticate, getMyProfile);
router.get("/getAllProfiles", authenticate, getAllProfiles);
router.get("/inspect/:userId", authenticate, inspectProfile);

module.exports = router;
