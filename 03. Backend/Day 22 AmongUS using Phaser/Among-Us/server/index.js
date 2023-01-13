const app = require("express")();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origins: ["http://localhost:8080"],
  },
});

// Events
io.on("connection", (socket) => {
  const room = socket.handshake.query.room;
  console.log("room =", room);
  socket.join(room);
  io.to(room).emit("playerJoined");

  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("move", ({ x, y }) => {
    socket.broadcast.emit("move", { x, y });
  });

  socket.on("moveEnd", () => {
    socket.broadcast.emit("moveEnd");
  });
});

httpServer.listen(3000, () => {});
