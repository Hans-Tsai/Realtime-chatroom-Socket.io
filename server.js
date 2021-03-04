const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
  // Welcome current user
  socket.emit('message', 'Welcome to The Realtime chatroom!')  // this is to the single client 

  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');   // this is to all the clients except the client that's connecting

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');  // this is to all the clients
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg)
  });

}); 

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));