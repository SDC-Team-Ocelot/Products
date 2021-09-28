const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = 3002;
const server = express();
const routes = require('./routes');

server.use(morgan('dev'));
server.use(express.json());
server.use('/', routes);

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
