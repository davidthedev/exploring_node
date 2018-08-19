const { Writable } = require('stream');

const out = new Writable({
  write(buffer, encoding, callback) {
    console.log(buffer.toString());
    callback();
  }
});

process.stdin.pipe(out);

// equivalent to process.stdin.pipe(process.stdout);
