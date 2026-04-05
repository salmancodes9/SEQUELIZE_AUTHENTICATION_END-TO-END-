const express = require("express");

const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
} = require("../controllers/postController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/createPost", authenticate, createPost);
router.get("/getAllPosts", authenticate, getAllPosts);
router.get("/getMyPosts", authenticate, getMyPosts);
router.delete("/deletePost/:id", authenticate, deletePost);

module.exports = router;
