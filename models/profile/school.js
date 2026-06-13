const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const School = sequelize.define(
  "School",
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
    tableName: "schools",
    timestamps: false,
  },
);

module.exports = School;