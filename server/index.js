const server = require('./server');
const PORT = 3002;

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
