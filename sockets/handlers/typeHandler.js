const onlineUsers = require("../utils/onlineUsers");

function handleTyping(msg, socket) {
  const recevierSocket = onlineUsers.get(msg.to);
  if (recevierSocket) {
    recevierSocket.send(
      JSON.stringify({
        type: "typing",
        from: socket.userId,
      }),
    );
  }
}

module.exports = handleTyping;
