const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

  const experience = sequelize.define(
    "experience", 
    {

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
    // userId: {
    //     type: DataTypes.INTEGER

    // }
},

  {
    tableName: "experience",
    timestamps: false

  });

// experience.belongsTo(models.User, {
//   foreignKey: "userId"
// });

module.exports = experience;