const {DataTypes} = require("sequelize");
const sequelize = require("../../config/db");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("sent" , "delivered", "read"),
      defaultValue: "sent"
    },
    // isRead: {
    //   type: DataTypes.BOOLEAN,
    // },
  },

  {
    tableName: "message_status",
    timestamps: true,
  },
);
module.exports = Message;
