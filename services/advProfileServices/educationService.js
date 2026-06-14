const Education = require("../../models/profile/education");
const Degree = require("../../models/profile/degree");
const FieldOfStudy = require("../../models/profile/fieldOfStudy");
const findOrCreateSchool = require("./profileHelpers.js/schoolService");
const normalizeName = require("../../helpers/normalizeName");

module.exports = async ({
  schoolId,
  schoolName,
  degreeId,
  degreeName,
  degree,
  fieldOfStudyId,
  fieldOfStudyName,
  fieldOfStudy,
  userId,
  currentlyStudying = false,
  startDate = null,
  endDate = null,
  grade = null,
  description = null,
  transaction,
}) => {
  let resolvedSchoolId = schoolId;

  if (!userId) {
    throw new Error("userId is required");
  }

  if (!resolvedSchoolId) {
    if (!schoolName?.trim()) {
      throw new Error("schoolId or schoolName is required");
    }

    const school = await findOrCreateSchool(schoolName, { transaction });
    resolvedSchoolId = school.id;
  }

  let resolvedDegreeId = degreeId;
  if (!resolvedDegreeId) {
    const inputDegreeName = degreeName || degree;

    if (!inputDegreeName?.trim()) {
      throw new Error("degreeId or degreeName is required");
    }

    const normalizedDegreeName = normalizeName(inputDegreeName);
    const [degreeRecord] = await Degree.findOrCreate({
      where: { name: normalizedDegreeName },
      defaults: { name: normalizedDegreeName },
      transaction,
    });

    resolvedDegreeId = degreeRecord.id;
  }

  let resolvedFieldOfStudyId = fieldOfStudyId;
  if (!resolvedFieldOfStudyId) {
    const inputFieldOfStudyName = fieldOfStudyName || fieldOfStudy;

    if (!inputFieldOfStudyName?.trim()) {
      throw new Error("fieldOfStudyId or fieldOfStudyName is required");
    }

    const normalizedFieldOfStudyName = normalizeName(inputFieldOfStudyName);
    const [fieldOfStudyRecord] = await FieldOfStudy.findOrCreate({
      where: { name: normalizedFieldOfStudyName },
      defaults: { name: normalizedFieldOfStudyName },
      transaction,
    });

    resolvedFieldOfStudyId = fieldOfStudyRecord.id;
  }

  if (!resolvedSchoolId) {
    throw new Error("schoolId or schoolName is required");
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
      degreeId: resolvedDegreeId,
      fieldOfStudyId: resolvedFieldOfStudyId,
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
