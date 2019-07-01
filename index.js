const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

module.exports = server;
