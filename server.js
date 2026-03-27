const db = require("./config/db");
const app = require("./app");

const startServer = async () => {
  try {
    await db.sync();
    app.listen(5000, () => console.log("server running"));
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
};

startServer();
