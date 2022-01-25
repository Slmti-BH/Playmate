const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const authRoutes = require("./routes/auth");
const mapRoutes = require("./routes/map");

// to make .env files available
require("dotenv").config();
const PORT = process.env.PORT || 6060;
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

// cors middle ware to allow access to requests from client URL
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.static("public"));

// io server
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join-req", (string) => {
    socket.broadcast.emit("got-message", string);
    console.log(string);
  });
  socket.on("accept-sent", (string) => {
    socket.broadcast.emit("accept-message", string);
    console.log(string);
  });
   socket.on("decline-sent", (string) => {
     socket.broadcast.emit("decline-message", string);
     console.log(string);
   });
  
});

app.use("/auth", authRoutes);
app.use("/map", mapRoutes);

server.listen(PORT, () => {
  console.log("🚀 Listening on 8080");
});
