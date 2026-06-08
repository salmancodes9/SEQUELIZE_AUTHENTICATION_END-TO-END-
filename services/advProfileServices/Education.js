const education = require("../../models/profile/education");

module.exports = async ({ school, degree, subject }) => {
  if (!school || !degree) throw new Error("missing field");
  

};
