import express from "npm:express";
import { createServer } from "node:http";
import path from "node:path";
import { Server } from "npm:socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

//Socket.io
io.on('connection', (socket) => {
    console.log("A new user has connected", socket.id);

    // ! We get message form the user
    socket.on("user-message", (msg) => {
        console.log("yoi", msg); // ? we have to send 'msg' to everyone
        io.emit('message', msg);
    })
});

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    res.sendFile("/public/index.html")
})

server.listen(9000, () => {
    console.log(`Server started`);
});