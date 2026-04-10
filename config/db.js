require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
);
module.exports = sequelize



  sequelize.authenticate()
  .then(() => {console.log("DATABASE CONNECTED SUCESSFULLY")
   return sequelize.sync({alter: true})
  })

  // .then(() => {console.log("practice tbale formed")})
  .catch((err) =>{console.log(err,"error")});

  

