import React, { useEffect } from "react"
import { io } from "socket.io-client"

function App() {

    const socket = io("http://localhost:5000")

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected From Frontend", socket.id);
        })
        socket.on("welcome", (s) => {
            console.log(s);
        })
    }, []);

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default App
