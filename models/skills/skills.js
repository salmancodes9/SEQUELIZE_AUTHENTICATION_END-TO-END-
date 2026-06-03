const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Skills = sequelize.define(
  "Skills",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "skills",
    timestamps: false,
  },
);

module.exports = Skills;
