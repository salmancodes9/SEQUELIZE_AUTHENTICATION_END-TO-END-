const {webSocket} = require("ws")
const Message = require("../../models/socketData/Message");
const onlineUsers = require("../utils/onlineUsers");


async function handleMessage(msg, socket) {
  console.log("Inside handler: socket.userId", socket.userId);
  let message;
  try {
     message = await Message.create({
      senderId: socket.userId,
      receiverId: msg.to,
      text: msg.text,
      status: "sent",
    });
  } catch (err) {
    console.error("Failed to save message", err.message);
  }
  const receiverSocket = onlineUsers.get(msg.to);
  if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
    await Message.update(
      {
        status: "delivered",
      },
      { where: { id: message.id } },
    );
    receiverSocket.send(JSON.stringify({
        type: "message",
        message
    }))
  }
}
module.exports = handleMessage;
