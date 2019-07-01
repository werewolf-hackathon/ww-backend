const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
server.use('/api', require('./api'));

server.get('/', (req, res) => {
  res.json({success: 'You might just be sane!'});
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

module.exports = server;
