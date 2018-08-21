const cluster = require('cluster');
const os = require('os');

// check is cluster is loaded as master
// then master forks workers
if (cluster.isMaster) {
  const cpus = os.cpus().length;

  for (let i = 0; i < cpus; i++) {
    cluster.fork(); // fork a new node js instance
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

