const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const authRoutes = require("./routes/auth");
const mapRoutes = require("./routes/map");
const WebSocket = require("ws");
// to make .env files available
require("dotenv").config();
const PORT = process.env.PORT || 6060;

// create ws server
const wss = new WebSocket.Server({ server: server });
const webSockets = {};

// cors middle ware to allow access to requests from client URL
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

// // CONNECT /:userID
// // wscat -c ws://localhost:5000/1
// wss.on("connection", function (webSocket, request) {
//   // console.log(WebSocket);
//  const userID = url.parse(request.url, true).query.userId;
//   webSockets[userID] = webSocket;

//   console.log(
//     "connected: " + userID + " in " + Object.getOwnPropertyNames(webSockets)
//   );

//   // Forward Message
//   //
//   // Receive               Example
//   // [toUserID, text]      [2, "Hello, World!"]
//   //
//   // Send                  Example
//   // [fromUserID, text]    [1, "Hello, World!"]
//   webSocket.on("message", function (message) {
//     console.log("received from " + userID + ": " + message);
//     const objectSentFromClient = JSON.parse(message);
//    const toUserWebSocket = webSockets[objectSentFromClient.receiverUserId];
//      if (toUserWebSocket) {
//        const messageToBeSent = JSON.stringify({
//          senderUserId: userID,
//          youCanAddAnythingHere: "this is a normal object",
//          anotherArbitraryData: 1231232,
//        });

//        toUserWebSocket.send(messageToBeSent);
//      }
//   });

//   webSocket.on("close", function () {
//     delete webSockets[userID];
//     console.log("deleted: " + userID);
//   });
// });

app.use("/auth", authRoutes);
app.use("/map", mapRoutes);

server.listen(PORT, () => {
  console.log("🚀 Listening on 8080");
});
