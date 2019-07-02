require('dotenv').config();

const express = require('express');
const cors = require('cors');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

const authRouter = require('./api/authRouter.js')
const restrictedRouter = require('./api/restrictedRouter.js')
const logger = require('./util/logger.js')

server.use(cors());
server.use(express.json());
// server.use('/api', require('./api'));

server.use('/', logger)
server.use('/api/auth', authRouter)
server.use('/api/restricted', restrictedRouter)

server.get('/', (req, res) => {
  res.json({success: 'You might just be sane!'});
});

io.on('connection', socket => {
  console.log('A user connected.');

  socket.on('openChat', history => {
    // open chatbox
  });

  socket.on('sendMessage', message => {
    // send message
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

const PORT = process.env.PORT || 8000;
http.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

module.exports = server;
