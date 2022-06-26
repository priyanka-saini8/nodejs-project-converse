//Express
const express = require("express");
const app = express();

const PORT = (process.env.PORT || 3000);

const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

//Socket
const socket = require("socket.io");
const io = socket(server);

let ConnectionCount = 0;

io.on('connection', (socket) => {
    ConnectionCount++;
    console.log("Connected..");
    socket.on('conn_dis', (clientn) => {
        socket.broadcast.emit("con_dis_name_count", clientn, ConnectionCount,true);
    });
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
    socket.on('disconnect', () => {
        ConnectionCount--;
        socket.broadcast.emit("con_dis_name_count", "Someone", ConnectionCount, false);
        console.log("Disconnect..");
    });
});
