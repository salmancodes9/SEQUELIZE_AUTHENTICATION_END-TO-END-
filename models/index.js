const User = require("./user");
const Post = require("./Post");
const profile = require("./profile");

const Education = require("./profile/education");
const School = require("./profile/school");
const degree = require("./profile/degree");
const fieldOfStudy = require("./profile/fieldOfStudy");

const Experience = require("./profile/experience");
const Skills = require("./skills/skills");
const UserSkills = require("./skills/userSkills");

module.exports = {
  User,
  Post,
  profile,
  Education,
  School,
  degree,
  fieldOfStudy,
  Experience,
  Skills,
  UserSkills,
};
