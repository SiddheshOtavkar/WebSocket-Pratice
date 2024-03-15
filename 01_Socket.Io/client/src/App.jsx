import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function App() {
    // const socket = io("http://localhost:5000");
    const socket = useMemo(() => io("http://localhost:5000"), []);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const [socketId, setSocketId] = useState("");
    const [roomName, setRoomName] = useState("");

    // console.log(messages);

    const joinRoomHandler = (e) => {
        e.preventDefault();
        socket.emit('join-room', roomName);
        setRoomName("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", { message, room });
        setMessage("");
    };

    useEffect(() => {
        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("Connected From Frontend", socket.id);
        });
        socket.on("welcome", (s) => {
            console.log(s);
        });
        socket.on("receive-message", (rm) => {
            console.log(rm);
            setMessages((messages) => [...messages, rm]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Container maxWidth="sm">
            <Box sx={{ height: 200 }} />
            <Typography variant="span" component="div" gutterBottom>
                {socketId}
            </Typography>

            <form action="" onSubmit={joinRoomHandler}>
                <h5>Join Room</h5>
                <TextField
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    id="outlined-basic"
                    label="Room Name"
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary">
                    Join
                </Button>
            </form>

            <form action="" onSubmit={handleSubmit}>
                <br />
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="outlined-basic"
                    label="Message"
                    variant="outlined"
                />
                <TextField
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    id="outlined-basic"
                    label="Room"
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary">
                    Send
                </Button>
            </form>

            <Stack>
                {messages.map((m, i) => (
                    <Typography key={i} variant="span" component="div" gutterBottom>
                        {m}
                    </Typography>
                ))}
            </Stack>
        </Container>
    );
}

export default App;
