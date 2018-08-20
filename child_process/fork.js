const { fork } = require('child_process');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/endpoint') {
    const forked = fork('forked.js');
    forked.send('start');

    forked.on('message', data => {
      res.end(`Data is ${data}`);
    });
  } else {
    res.end('Ok');
  }
});

server.listen(8000);
