const express = require('express');
const cors = require('cors');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const {logger} = require('./data/middleware');

server.use(cors());
server.use(express.json());
server.use('/api', require('./api'));
server.use('/', logger);


server.get('/', (req, res) => {
  res.json({success: 'You might just be sane!'});
});

server.get('/chat', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('A user connected.');

  socket.on('sendMessage', msg => {
    io.emit('sendMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

const PORT = process.env.PORT || 8000;
http.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

module.exports = server;
