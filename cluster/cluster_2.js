const cluster = require('cluster');
const os = require('os');

// check if cluster is loaded as master
// then master forks workers
if (cluster.isMaster) {
  const cpus = os.cpus().length;

  for (let i = 0; i < cpus; i++) {
    cluster.fork(); // spawn a new worker process
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('error code ' + code);
    // if process exit code anything other than the default 0
    // and worker exited non voluntarily
    // spawn a new worker process
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. Starting a new worker.`);
      cluster.fork();
    }
  });
} else {
  require('./server');
}
