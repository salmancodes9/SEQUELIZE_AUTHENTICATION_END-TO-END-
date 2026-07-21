const { text } = require("body-parser")
const Message = require("../../models/socketData/Message")
const onlineUsers = require("../utils/onlineUsers")

async function handleMessage(msg, socket) {
    console.log("Inside handler: socket.userId",socket.userId)
    try{
    await Message.create({
        senderId: socket.userId,
        receiverId: msg.to,
        text: msg.text,
        status: "sent"
    });
  
    
} catch(err){
console.error("Failed to save message" , err.message)    }
 const receiverSocket = onlineUsers.get(msg.to)
if(reciverSocket){
    


}
}
module.exports = handleMessage;

