const Post = require("../../models/Post");
const user = require("../../models/user");

module.exports = async () => {
  const posts = await Post.findAll({
    include: [
      {
        model: user,
        attributes: ["name", "email"],
      },
    ],
  });

  return posts;
};
