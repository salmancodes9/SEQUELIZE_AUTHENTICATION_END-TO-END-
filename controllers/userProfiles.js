const profile = require("../models/profile");

const createProfile = async (req, res) => {
  try {
    const { Name, Bio, Education, Exp, Skills, Intrests } = req.body;

    if (!Name) return res.status(400).json({ message: "empty field" });
    if (!Bio || !Education) {
      throw new Error("Bio and Education fields are mandatory");
    }
    const userId = req.user.id;

    await profile.create({
      Name,
      Bio,
      Education,
      Exp,
      Skills,
      Intrests,
      userId,
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
      attributes:["id","Name","Bio","Education","Exp","Skills","intrests","userId"]
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
