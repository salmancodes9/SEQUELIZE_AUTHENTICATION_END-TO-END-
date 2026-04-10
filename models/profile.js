const sequelize = require("../config/db")
const { DataTypes } =  require('sequelize')

const profile = sequelize.define('profiles',{

    Name:{
        type:
        DataTypes.STRING
    },
    Bio:{
        type:DataTypes.TEXT
    },
    
    Education:{
        type:DataTypes.TEXT
    },
    Exp:{
        type:DataTypes.TEXT
    },
    Skills:{
        type:DataTypes.TEXT
    },
    Intrests:{
        type:DataTypes.TEXT
    }


},
{
    tableName: 'profiles',
    timestamps: false
})
module.exports = profile;
