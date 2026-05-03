const profile = require("../models/profile");

const s3UploadService = require("../services/aws/s3UploadService");
// const getS3SignedUrl = require("../services/aws/s3SignedUrlService");

const createProfile = async (req, res) => {
  try {
    const {  Name, Bio, 
      // Education, Exp, 
      // Skills, Intrests
     } = req.body;
     let profilePicUrl = null
     if(req.file){
      profilePicUrl = await s3UploadService(
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype

    )
  }
        if (!profilePicUrl) return res.status(400).json({ message: "Add Profile Pic for Verification" });

    if (!Name) return res.status(400).json({ message: "empty field" });
   
    
    const userId = req.user.id;

    await profile.create({
      profilePicUrl,
      Name,
      Bio,
       userId,
      // Education,
      // Exp,
      // Skills,
      // Intrests,
     
    });
    return res.status(201).json({ message: "Profile created" });
  } catch (err) {
    return res.status(400).json({ message: "something went wrong" });
  }
};
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const currentProfile = await profile.findOne({
      where: { userId },
    });
    if (!currentProfile) {
      return res.status(400).json({ message: " NO profile found" });
    }

    return res.status(200).json({ profile: currentProfile });
  } catch (err) {
    console.log(err, "error is here");

    return res.status(400).json({ message: "unable to get" });
  }
};

const inspectProfile = async (req, res) => {
  try {
    const viewerId = req.user.id;
    const { userId } = req.params;

    const viewedProfile = await profile.findOne({
      where: { userId },
    });

    if (!viewedProfile) {
      return res.status(404).json({ message: "profile not found" });
    }

    if (String(viewerId) !== String(userId)) {
      await viewedProfile.increment("userVisits");
      await viewedProfile.reload();
    }

    return res.status(200).json({ profile: viewedProfile });
  } catch (err) {
    return res.status(400).json({ message: "unable to inspect profile" });
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const allProfiles = await profile.findAll({
      attributes:["id","Name","Bio","profilePicUrl","userId"]
    });
    return res.status(200).json({ allProfiles });
  } catch (err) {
    return res.status(400).json({ message: "unable to get" });
  }
};

module.exports = {
  createProfile,
  getMyProfile,
  getAllProfiles,
  inspectProfile,
};
