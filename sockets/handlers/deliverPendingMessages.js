
const Message = require("../../models/socketData/Message");
async function deliverPendingMessages(socket){
try{
const pendingMessages = await  Message.findAll({
 where:{
    receiverId: socket.userId,
    status:"sent"
 }
})
for (const message of pendingMessages ){

}

}catch(err){
        console.error("Failed to fetch pending messages", err.message);


}


}
module.exports = deliverPendingMessages;