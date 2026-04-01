const sequelize = require("../config/db.js");
const { DataTypes } = require("sequelize");

const Post = sequelize.define(
  "posts",
  {
    title: {
      type: DataTypes.STRING
    },
    content:{
        type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "posts",
    timestamps: false,
  },
);
module.exports = Post;
