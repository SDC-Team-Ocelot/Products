const server = require('./server');
const PORT = 3002;
const pool = require('../db/index');

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
