const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//Server Listening
server.listen(port,() => {
    console.log(`Server running port ${port}`);
})