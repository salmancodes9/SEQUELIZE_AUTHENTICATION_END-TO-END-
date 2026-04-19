const Post = require("../../models/Post");
const user = require("../../models/user");
const getS3SignedUrl = require("../aws/s3SignedUrlService");

module.exports = async () => {
  const posts = await Post.findAll({
    include: [
      {
        model: user,
        attributes: ["name", "email"],
      },
    ],
  });

  const signedPosts = await Promise.all(
    posts.map(async (item) => {
      const plain = item.toJSON();

      if (plain.imageUrl) {
        plain.imageUrl = await getS3SignedUrl(plain.imageUrl);
      }

      return plain;
    }),
  );

  return signedPosts;
};
