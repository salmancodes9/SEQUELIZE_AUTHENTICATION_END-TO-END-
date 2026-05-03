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
    
    // Education:{
    //     type:DataTypes.TEXT
    // },
    // Exp:{
    //     type:DataTypes.TEXT
    // },
    // Skills:{
    //     type:DataTypes.TEXT
    // },
    // Intrests:{
    //     type:DataTypes.TEXT
    // },
    // userVisits: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 0
    // }


},
{
    tableName: 'profiles',
    timestamps: false
})
module.exports = profile;
