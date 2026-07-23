const { Op } = require("sequelize");
const Message = require("../../models/socketData/Message");
const { MessageSquare } = require("lucide-react");

async function readHandler(msg, socket) {
  try {
    const messageToMarkRead = await Message.findAll({
      where: {
        senderId: msg.senderId, //"Only give me rows where the senderId COLUMN equals THIS specific number (whatever msg.senderId currently holds)."
        receiverId: socket.userId,
        status: {
          [Op.in]: ["sent", "delivered"],
        },
      },
    });
    for (const message of messageToMarkRead ){
        await Message.update(
            {status: "read"},
            {where :{id:message.id }}
        );
    }
  } catch (err) {
    console.log("failed to mark messages as read ", err.message)
  }
}
module.exports = readHandler;
