const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

  const Experience = sequelize.define(
    "Experience", 
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },

    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    employmentType: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    currentlyWorking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
},

  {
    tableName: "experience",
    timestamps: true

  });


module.exports = Experience;