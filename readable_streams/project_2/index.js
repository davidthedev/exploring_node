const fs = require('fs');

// create a stream
const inp = fs.createReadStream(process.argv[2]);

inp.setEncoding('utf-8');

let count = 0;

// on data event
inp.on('data', (chunk) => {

  chunk.split('').forEach((c) => {
    if (c === ' ') {
      count++;
    }
  });

  process.stdout.write(`Space count - ${count} \n`);
});
