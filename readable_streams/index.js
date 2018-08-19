const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.end('Homepage');
      break;
    case '/stream':
      const readableStream = fs.createReadStream(path.join(__dirname, 'stream.txt'), 'utf-8');
      // stream.txt can be replaced with any other file
      const stat = fs.statSync(path.join(__dirname, 'stream.txt'));

      // if using other file type, content-type needs to be updated
      res.writeHead(200, {'Content-type': 'text/*', 'Content-size': stat.size});
      readableStream.pipe(res);

      break;
    default:
      res.writeHead(404);
      res.end();
  }
});

server.listen(8080);
