const Post = require("../../models/Post");

module.exports = async ({ title, content, userId }) => {
  if (!title || !content) {
    throw new Error("empty post");
  }

  if (!userId) {
    throw new Error("user id is missing");
  }

  const post = await Post.create({
    title,
    content,
    userId,
  });

  return { message: "post created successfully", post };
};