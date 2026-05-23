const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

function createRoomId() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

io.on("connection", (socket) => {
  socket.on("create-room", () => {
    const roomId = createRoomId();

    rooms.set(roomId, {
      text: "",
      users: new Set(),
    });

    socket.emit("room-created", { roomId });
  });

  socket.on("join-room", ({ roomId }) => {
    if (!rooms.has(roomId)) {
      socket.emit("room-error", { message: "Room not found" });
      return;
    }

    const room = rooms.get(roomId);
    room.users.add(socket.id);
    socket.join(roomId);

    socket.data.roomId = roomId;

    socket.emit("room-state", {
      roomId,
      text: room.text,
      users: [...room.users],
    });

    io.to(roomId).emit("users-updated", {
      users: [...room.users],
    });
  });

  socket.on("clipboard-update", ({ roomId, text }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.text = text;

    socket.to(roomId).emit("clipboard-update", {
      text,
      senderId: socket.id,
    });
  });

  socket.on("clear-clipboard", ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.text = "";

    io.to(roomId).emit("clipboard-update", {
      text: "",
      senderId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomId = socket.data.roomId;
    if (!roomId || !rooms.has(roomId)) return;

    const room = rooms.get(roomId);
    room.users.delete(socket.id);

    if (room.users.size === 0) {
      rooms.delete(roomId);
      return;
    }

    io.to(roomId).emit("users-updated", {
      users: [...room.users],
    });
  });
});

server.listen(3001, () => {
  console.log("Socket server running");
});