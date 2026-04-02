const Post = require("../models/Post");
const user = require("../models/user");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "empty post" });

    const userId = req.user.id;

    await Post.create({
      title,
      content,
      userId,
    });
    return res.status(201).json({ message: "posted sucessfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "try again later" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: user,
          attributes: ["name", "email"],
        },
      ],
    });
    return res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong with posts" });
  }
};
const getMyPosts = async (req, res) => {
  try {
        const userId = req.user.id;

    const posts = await Post.findAll({
      
      where: { userId },

      include: [
        {
          model: user,
          attributes: ["name", "email"],
        },
      ],
    });
    return res.status(200).json({ posts });
  } catch (err) {}
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: "No Post Found" });
  }

  if (post.userId !== req.user.id) {
    return res.status(403).json({ message: "Not your Post" });
  }

  await post.destroy();
  return res.status(200).json({ message: "Post Deleted" });
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
