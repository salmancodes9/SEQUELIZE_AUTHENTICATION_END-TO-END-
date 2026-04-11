const sequelize = require("./config/db");
const app = require("./app");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await  sequelize.sync({alter: true})

    app.listen(5000, () => console.log("server running"));
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
   


};

 

  //  sequelize.authenticate()
  // .then(() => {console.log("DATABASE CONNECTED SUCESSFULLY")
  //  return  sequelize.sync({alter: true})
  // })

  // .catch((err) =>{console.log(err,"error")});


startServer();

