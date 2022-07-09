const express = require("express");
const socket = require("socket.io");

const app = express();
const server = app.listen(4000, () => {
  console.log("Server Started..");
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket) => {
  console.log("socket connected..", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("fileshare", (data) => {
    socket.broadcast.emit("fileshare", data);
  });

  socket.on("delete", (data) => {
    socket.broadcast.emit("delete", data);
  });

  socket.on("endchat", (data) => {
    socket.broadcast.emit("endchat", data);
  });

});
