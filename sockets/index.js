const { WebSocketServer } = require("ws");
const verifySocketToken = require("./socketAuth");
const handleMessage = require("./handlers/messageHandler");
const onlineUsers = require("../sockets/utils/onlineUsers");
const deliverPendingMessages = require("../sockets/handlers/deliverPendingMessages");
const handleMarkAsRead = require("./handlers/readHandler");
const handleTyping = require("../sockets/handlers/typeHandler");

function initWebSocket(server) {
  const wss = new WebSocketServer({ server: server });
  console.log("connection found");

  wss.on("connection", (socket, req) => {
    const user = verifySocketToken(req);
    if (!user) {
      socket.close();
      return;
    }
    socket.userId = user.id;
    onlineUsers.set(socket.userId, socket);
    console.log(`${user.id}, ${socket.userId}, connected`);
    deliverPendingMessages(socket);

    console.log("client connected");
    socket.on("message", (data) => {
      const text = data.toString().trim();

      if (!text) {
        return;
      }
      try {
        const msg = JSON.parse(text);
        console.log("Sender's userId:", socket.userId);
        if (msg.type === "dm") {
          handleMessage(msg, socket);
        } else if (msg.type === "markAsRead") {
          handleMarkAsRead(msg, socket);
        } else if (msg.type === "typing") {
          handleTyping(msg, socket);
        }
      } catch (err) {
        console.error("Invalid JSON received:", err.message);
      }
    });
    socket.on("close", () => {
      onlineUsers.delete(socket.userId);
    });
  });
}

module.exports = initWebSocket;
//User A  ──(TCP pipe / socket A)──►  [ SERVER ]  ◄──(TCP pipe / socket B)──  User B
