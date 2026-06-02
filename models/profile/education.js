const { DataTypes } = require("sequelize");

const sequelize = require("../../config/db");


const education = sequelize.define(
  "education",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,

      allowNull: false,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
   
  },

  {
    tableName: "education",
    timestamps: true,
  },
);
module.exports = education;