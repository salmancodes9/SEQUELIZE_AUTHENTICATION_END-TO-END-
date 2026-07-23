const Message = require("../../models/socketData/Message");
async function deliverPendingMessages(socket) {
  try {
    const pendingMessages = await Message.findAll({
      where: {
        receiverId: socket.userId,
        status: "sent",
      },
    });
    for (const message of pendingMessages) {
      await Message.update(
        {status: "delivered"},
        {where :{id: message.id}}
      );
      socket.send(JSON.stringify({
        type:"message",
        message
      }));
    }
  } catch (err) {
    console.error("Failed to fetch pending messages", err.message);
  }
}
module.exports = deliverPendingMessages;
