const sequelize = require("../config/db.js");
const { DataTypes } = require("sequelize");

const user = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
},
{
    tableName: 'users',
    timestamps: false
}
);
module.exports = user;
