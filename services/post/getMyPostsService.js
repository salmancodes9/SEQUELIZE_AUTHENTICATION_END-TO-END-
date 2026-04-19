const user = require("../../models/user");
const Post = require("../../models/Post");
const getS3SignedUrl = require("../aws/s3SignedUrlService");

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

  const signedPosts = await Promise.all(
    post.map(async (item) => {
      const plain = item.toJSON();

      if (plain.imageUrl) {
        plain.imageUrl = await getS3SignedUrl(plain.imageUrl);
      }

      return plain;
    }),
  );

  return signedPosts;
};
