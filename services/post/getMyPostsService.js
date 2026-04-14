const user = require("../../models/user");
const Post = require("../../models/Post");

module.exports = async (userId) => {
  const post = await Post.findAll({
    where: {
      userId,
    },

    include: [
      {
        model: user,
        attributes: ["name", "email"],
      },
    ],
  });
  return post;
};
