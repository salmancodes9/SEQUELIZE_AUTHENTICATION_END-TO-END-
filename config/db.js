const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  'startersql',
  'root',
  'Salman@6711',
  {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
  }
  
);

    sequelize.authenticate()
    .then(() => console.log("DATABASE CONNECTED SUCESSFULLY"))
    .catch((err) => console.log(err, "Error")),
module.exports =  sequelize;
