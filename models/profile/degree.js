const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Degree = sequelize.define(
  "Degree",
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
    tableName: "Degrees",
    timestamps: false,
  },
);

module.exports = Degree;