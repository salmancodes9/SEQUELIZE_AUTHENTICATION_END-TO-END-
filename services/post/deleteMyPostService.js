const Post = require("../../models/Post");
module.exports = async (id, userId) => {
  const post = await Post.findOne({
    where: {
      id,
    },
  });
  if (!post) throw new Error("No post  found");
  if (post.userId !== userId) throw new Error("post doesnt belong to youe");
  await post.destroy(); 
  return { message: "Post deleted" };
};
