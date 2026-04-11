// const post = require("../models/Post");
const profile = require("../models/profile");
// const user = require("../models/user");

const createProfile = async (req, res) => {
  try {
    const { Name, Bio, Education, Exp, Skills, Intrests } = req.body;

    if (!Name) return res.status(400).json({ message: "empty field" });
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

    const profiles = await profile.findAll({
      where: { userId },
    });
    if (!profiles || profiles.length === 0) {
      return res.status(400).json({ message: " NO profile found" });
    }

    return res.status(200).json({ profiles });
  } catch (err) {
    console.log(err, "error is here");

    return res.status(400).json({ message: "unable to get" });
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const allProfiles = await profile.findAll({});
    return res.status(200).json({ allProfiles });
  } catch (err) {
    return res.status(400).json({ message: "unable to get" });
  }
};

module.exports = { createProfile, getMyProfile, getAllProfiles };
