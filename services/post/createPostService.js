const Post = require("../../models/Post");

module.exports = async ({ title, content, imageUrl, userId }) => {
  if (!title || !content) {
    throw new Error("empty post");
  }

  if (!userId) {
    throw new Error("user id is missing");
  }

  const post = await Post.create({
    title,
    imageUrl: imageUrl || null,
    content,
    userId,
  });

  return { message: "post created successfully", post };
};
