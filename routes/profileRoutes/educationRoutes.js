const express = require("express");
const {
  createEducation,
} = require("../../controllers/advProfileControllers/profileEducation");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/createEducation", authenticate, createEducation);

module.exports = router;
