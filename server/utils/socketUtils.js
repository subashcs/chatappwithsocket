const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user is connected");

    socket.on("sendMessage", ({ username, message }) => {
      io.emit("receiveMessage", { username, message });
    });

    socket.on("join", ({username}) => {
      io.emit("joinMessage", { username });
      console.log(`User ${username} joined the chat.`);
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};
