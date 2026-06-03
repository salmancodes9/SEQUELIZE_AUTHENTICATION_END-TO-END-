const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const UserSkills = sequelize.define(
	"UserSkills",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		skillId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "user_skills",
		timestamps: false,
	}
);

module.exports = UserSkills;
