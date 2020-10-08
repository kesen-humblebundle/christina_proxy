const cluster = require('cluster');

// In master process: Spawn child processes
if (cluster.isMaster && process.env.NODE_ENV !== 'test') {
  const cpuCount = require('os').cpus().length;

  // Spawn child processes attached to same port
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // Spawn child process on worker exit to ensure uptime
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.id} exited.`);
    cluster.fork();
  });

// Else in child process: start instance of express server on 1 CPU core
} else {
  require("dotenv").config();
  const server = require("./server");

  server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
  });
}


