const post = require("../models/Post");
const profile = require("../models/profile");
const user = require("../models/user");

const createProfile = async(req, res);

try {
  const { Name, Bio, Education, Exp, skills, Intrests } = req.body;

  if (!Name) return res.status(400).json ({ message: "empty field" });
  const userId = req.user.id;

  await createProfile({
    Name,
    Bio,
    Education,
    Exp,
    skills,
    Intrests,
  });
  return res.status(201).json ({ message:"Profile created"})




} catch (err) { return res.status}

modules.exports = createProfile;
