const School = require("../../../models/profile/school");
const normalizeName = require("../../../helpers/normalizeName");

module.exports = async (schoolName, { transaction } = {}) => {
  if (!schoolName?.trim()) {
    throw new Error("school name is required");
  }
  const normalizedName = normalizeName(schoolName);

  const [school] = await School.findOrCreate({
    where: {
      name: normalizedName,
    },
    defaults: {
      name: normalizedName,
    },
    transaction,
  });

  return school;
};
