const Post = require("../models/Post");
const user = require("../models/user");
const createPostService = require("../services/post/createPostService");
const deleteMyPostService = require("../services/post/deleteMyPostService");
const getAllPostsService = require("../services/post/getAllPostsService");
const getMyPostsService = require("../services/post/getMyPostsService");
const s3UploadService = require("../services/aws/s3UploadService");
const getS3SignedUrl = require("../services/aws/s3SignedUrlService");


const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    let imageUrl = null;
    if (req.file) {
    imageUrl = await s3UploadService(
        req.file.originalname,
        req.file.buffer,
        req.file.mimetype,
        'posts'
      );
    }

    const result = await createPostService({  
      title,
      imageUrl,
      content,
      userId: req.user.id,
    });

    if (result.post?.imageUrl) {
      result.post.imageUrl = await getS3SignedUrl(result.post.imageUrl);
    }
   
    return res.status(201).json(result);
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    return res.status(500).json({ message: err.message || "try again later" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong with posts" });
  }
};


const getMyPosts = async (req, res) => {
  try {
    const post = await getMyPostsService(req.user.id);
    return res.status(200).json({ post });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await deleteMyPostService(id, req.user.id);
    return res.status(200).json({ message: "Post Deleted " });
  } catch (err) {
    return res.status(err.status || 400).json({ message: err.message });
  }
};

module.exports = { createPost, getAllPosts, getMyPosts, deletePost };

// USER (Client)
//     ↓
// SENDS HTTP REQUEST (with title, content)
//     ↓
// ROUTE (postRoutes.js) receives it
//     ↓
// MIDDLEWARE (authMiddleware.js) checks if user is authenticated
//     ↓
// CONTROLLER (postController.js) ← THIS IS WHERE YOU ARE
//     ↓
// DATABASE (Post model saves data)
//     ↓
// RESPONSE sent back to user
