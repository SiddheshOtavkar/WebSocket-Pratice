const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const colors = require("colors");
const jwt = require('jsonwebtoken');
const secretKeyJWT = "SIDDHESHOTAVKAR6820031234567/siddhesh";

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
    console.log('A user connected..'.bgGreen);
    console.log(`Id: ${socket.id}`.bgMagenta);
    socket.emit("welcome", "Welcome to the server ")

    socket.on("message", ({ room, message }) => {
        console.log({ room, message });
        io.to(room).emit("receive-message", message);
    })

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`.bgGreen);
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected with id ${socket.id}`.bgRed.black);
    })
});

app.get("/", (req, res) => {
    res.send("Hello Socket.IO");
});

app.get('/login', (req, res) => {
    const token = jwt.sign({ _id: "adjhvbvjavdvahkdbkajdnjandj" }, secretKeyJWT); // Sign the token

    res
        .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
        .json("Login Success");
});

// io middleware
const user = true;
io.use((socket, next) => {
    if (user) next();
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});