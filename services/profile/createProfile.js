
const profile = require("../models/profile.model");

const { s3UploadService, getS3SignedUrl } = require("./s3.service");


const createProfile = async (req, res) => {
  try {
    const {
      Name,
      Bio,
     
    } = req.body;
    let profileImageUrl = null;
    if (req.file) {
      profileImageUrl = await s3UploadService(
        req.file.originalname,
        req.file.buffer,
        req.file.mimetype,
        "profiles/",
      );
    }

    if (!Name) return res.status(400).json({ message: "empty field" });

    const userId = req.user.id;

    const profileCreation = await profile.create({
      profileImageUrl,
      Name,
      Bio,
      userId,
    
    });
    if (profileCreation.profileImageUrl) {
      profileCreation.profileImageUrl = await getS3SignedUrl(
        profileCreation.profileImageUrl,
      );
    }
 

    return res
      .status(201)
      .json({ message: "Profile created", profileCreation });
  } catch (err) {
    return res.status(400).json({ message: "something went wrong" });
  }
};