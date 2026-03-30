require ('dotenv').config()
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  // 'startersql',
  // 'root',
  // 'Salman@6711',
   {

  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
     dialect: "mysql",

  //   host: "localhost",
  //   port: "3306",
   }
  
);

    sequelize.authenticate()
    console.error()
    .then(() => console.log("DATABASE CONNECTED SUCESSFULLY"))
    .catch((err) => console.log(err, "Error")),
module.exports =  sequelize;
