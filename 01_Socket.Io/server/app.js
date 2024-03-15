const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 5000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}
));

io.on('connection', (socket) => {
    console.log('A user connected..');
    console.log("Id ", socket.id)
    socket.emit("welcome", "Welcome to the server ")

    socket.on("message", ({ room, message }) => {
        console.log({ room, message });
        io.to(room).emit("receive-message", message);
    })

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected with id ${socket.id}`);
    })


});

app.get("/", (req, res) => {
    res.send("Hello Socket.IO");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});