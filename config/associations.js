const {
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
} = require("../models");

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasOne(profile, { foreignKey: "userId" });
profile.belongsTo(User, { foreignKey: "userId" });

Education.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Education, { foreignKey: "userId" });

Education.belongsTo(School, { foreignKey: "schoolId" });
School.hasMany(Education, { foreignKey: "schoolId" });

Experience.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Experience, { foreignKey: "userId" });

User.belongsToMany(Skills, {
  through: UserSkills,
  foreignKey: "userId",
  otherKey: "skillId",
});

Skills.belongsToMany(User, {
  through: UserSkills,
  foreignKey: "skillId",
  otherKey: "userId",
});

Education.belongsTo(degree, { foreignKey: "degreeId" });
Education.belongsTo(fieldOfStudy, { foreignKey: "fieldOfStudyId" });

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
