const app = require('./server.js')

// Setup Server
const port = 8081;
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};
