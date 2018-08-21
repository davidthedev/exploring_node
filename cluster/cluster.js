const cluster = require('cluster');
const os = require('os');

// check if cluster is loaded as master
// then spawn new workers
if (cluster.isMaster) {
  const cpus = os.cpus().length;

  for (let i = 0; i < cpus; i++) {
    cluster.fork(); // spawn a new worker process
  }

  const getNumber = () => {
    this.count = this.count || 5;
    this.count = this.count * this.count;
    return this.count;
  };

  const updateWorkers = () => {
    const count = getNumber();
    Object.values(cluster.workers).forEach((worker) => {
      worker.send({ count });
    });
  };

  updateWorkers();

  setInterval(updateWorkers, 5000);
} else {
  require('./server');
}
