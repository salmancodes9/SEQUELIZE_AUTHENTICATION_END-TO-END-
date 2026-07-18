const { WebSocketServer } = require("ws");
const verifySocketToken = require("./socketAuth");
const handleMessage = require("./handlers/messageHandler");

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
    console.log(`${user.id}, ${socket.userId}, connected`);

    console.log("client connected");
    socket.on("message" , (data)=>{
      const msg = JSON.parse(data.toString());
      console.log("Sender's userId:", socket.userId);

      handleMessage(msg,socket)
    })
  });
}

module.exports = initWebSocket;
//User A  ──(TCP pipe / socket A)──►  [ SERVER ]  ◄──(TCP pipe / socket B)──  User B