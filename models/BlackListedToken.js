const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BlackListedToken = sequelize.define('BlackListedToken',{
    token:{
        type: DataTypes.TEXT
    }
},{
    tableName:"blacklisted_tokens",
    timestamps: false
}

)
module.exports = BlackListedToken;