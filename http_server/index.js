const fs = require('fs');
const server = require('http').createServer();

const someData = {
  'a': 'one',
  'b': 'two',
  'c': 'three'
};

server.on('request', (req, res) => {
  switch (req.url) {
    case 'api':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(someData));
      break;
    case '/homepage':
    case '/contact':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(fs.readFileSync(`.${req.url}.html`));
      break;
    case '/':
      res.writeHead(301, {
        'Location': '/homepage'
      });
      res.end();
      break;
    default:
      res.writeHead(404);
      res.end();
  }
});

server.listen(8000);
