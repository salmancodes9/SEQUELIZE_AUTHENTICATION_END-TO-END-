const Education = require("../../models/profile/education");
const findOrCreateSchool = require("./profileHelpers.js/schoolService");

module.exports = async ({
  schoolId,
  schoolName,
  degreeId,    
  fieldOfStudyId,
  userId,
  currentlyStudying = false,
  startDate = null,
  endDate = null,
  grade = null,
  description = null,
  transaction,
}) => {
  let resolvedSchoolId = schoolId;

  if (!resolvedSchoolId) {
    if (!schoolName?.trim()) {
      throw new Error("schoolId or schoolName is required");
    }

    const school = await findOrCreateSchool(schoolName, { transaction });
    resolvedSchoolId = school.id;
  }

  if (!resolvedSchoolId || !degreeId || !fieldOfStudyId) {
    throw new Error("missing field");
  }
  if (currentlyStudying) {
    endDate = null;
  }
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    throw new Error("Start date cannot be after end date");
  }

  return Education.create(
    {
      userId,
      schoolId: resolvedSchoolId,
      degreeId,
      fieldOfStudyId,
      currentlyStudying,
      startDate,
      endDate,
      grade,
      description,
    },
    {
      transaction,
    },
  );
};
