const express = require('express');
const app = express();
const readline = require('readline');

// Create a server instance
const server = require('http').Server(app);

// Initialize Socket.IO
const io = require('socket.io')(server);

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('message', (msg) => {
      console.log('message: ' + msg);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      io.emit('message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });