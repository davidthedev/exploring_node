const { Readable } = require('stream');

// creeate a new readable stream and push data when the consumer demands it
const stream = new Readable({
  read(size) {

    setTimeout(() => {

      if (this.currentCharCode > 90) {
        this.push(null);
        return;
      }

      this.push(String.fromCharCode(this.currentCharCode++));

    }, 100);
  }
});

stream.currentCharCode = 65;

stream.pipe(process.stdout);

process.on('exit', () => {
  console.error("\n", stream.currentCharCode);
});

process.stdout.on('error', process.exit);
