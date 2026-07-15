const { WebSocketServer } = require("ws");
function initWebSocket(server) {
  const wss = new WebSocketServer ({server: server,});
  console.log("connection found")
  wss.on("connection" , (socket) =>{
    console.log("client connected")
  })


}

module.exports = initWebSocket;
