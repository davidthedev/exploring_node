const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
  for (let i = 0; i < 1e7; i++); // simulates CPU work
  res.end(`Handle by process ${pid}`);
}).listen(8080, () => {
  console.log(`Started process ${pid}`);
});

process.on('message', msg => {
  console.log(`${msg.count}`);
});

// only use with the cluster_2.js to simulate random crashes
// setTimeout(() => {
//   process.exit(1);
// }, Math.random() * 5000);
