const experience = require("../models/profile/experience");

const addExperience = async (req, res) => {
  try {
    const { company, role, employmentType } = req.body;
   const userId = req.user.id
    const createExperience = await experience.create({
      company,
      role,
      employmentType,
      userId: req.user.id,
    });
    if(!company ) throw new Error(" please select a company")
    res.status(201).json({
      message: "exp added",
      createExperience,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = { addExperience };
