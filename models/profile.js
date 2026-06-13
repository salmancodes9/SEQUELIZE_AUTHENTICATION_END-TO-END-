const sequelize = require("../config/db")
const { DataTypes } =  require('sequelize')

const profile = sequelize.define('profiles',{

    Name:{
        type:
        DataTypes.STRING
    },

    profileImageUrl:{
        type:
        DataTypes.STRING(500),
        allowNull: true
    },
    Bio:{
        type:DataTypes.TEXT
    },
    userId:{
        type:DataTypes.INTEGER
    }
   
},
{
    tableName: 'profiles',
    timestamps: true
})
module.exports = profile;
