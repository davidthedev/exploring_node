const { spawn } = require('child_process');

// find regular file types (f)
const find = spawn('find', ['.', '-type', 'f']);
// print newline counts
const wc = spawn('wc', ['-l']);

// pipe find to wc
find.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
  console.log(`Number of files ${data}`);
})
