const { WebSocketServer } = require("ws");
const verifySocketToken = require("./socketAuth");

function initWebSocket(server) {
  const wss = new WebSocketServer({ server: server });
  console.log("connection found");

  wss.on("connection", (socket, req) => {
    const user = verifySocketToken(req);
    if (!user) {
      socket.close();
      return;
    }
    socket.userId = user.Id;
    console.log(`${user.id}, ${socket.userId}, connected`);

    console.log("client connected");
  });
}

module.exports = initWebSocket;
