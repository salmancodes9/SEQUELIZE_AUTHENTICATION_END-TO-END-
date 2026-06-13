const { DataTypes } = require("sequelize");

const sequelize = require("../../config/db");


const Education = sequelize.define(
  "Education",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,

      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "schools",
        key: "id",
      },
    },
    degreeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fieldOfStudyId: {
      type: DataTypes.INTEGER,
      allowNull:false

    },
    currentlyStudying: {
      type: DataTypes.BOOLEAN,
      // defaultValue: null,
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
module.exports = Education;