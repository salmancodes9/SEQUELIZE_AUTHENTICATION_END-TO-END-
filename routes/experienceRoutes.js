const express = require("express");
const { addExperience } = require("../controllers/experienceController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addExp", authenticate, addExperience);
module.exports = router;
