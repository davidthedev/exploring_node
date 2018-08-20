const cluster = require('cluster');
const os = require('os');

// check is cluster is loaded as master
// then master forks workers
if (cluster.isMaster) {
  const cpus = os.cpus().length;

  for (let i = 0; i < cpus; i++) {
    cluster.fork(); // fork a new node js instance
  }
} else {
  require('./server');
}
