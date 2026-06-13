const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const fieldOfStudy= sequelize.define(
  "fieldOfStudy",
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
    tableName: "fieldOfStudy",
    timestamps: false,
  },
);


module.exports = fieldOfStudy;