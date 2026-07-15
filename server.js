
const http = require("http");
const sequelize = require("./config/db");
const app = require("./app");
const initWebSocket = require("./sockets/index")

const server = http.createServer(app);
initWebSocket(server)

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("syncing successfull");

    server.listen(5000, () => console.log("server running"));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

// Start server with a single authenticate + sync flow
startServer();
