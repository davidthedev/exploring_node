const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

// read a directory synchronously
const files = fs.readdirSync(dirname);
const ms1Day = 24*60*60*1000;

// loop over each file found in the directory
files.forEach(file => {
  const filePath = path.join(dirname, file);

  // get file stat
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    // delete a file if it's more than 7 days old
    if ((Date.now() - stats.mtime.getTime() > 7*ms1Day)) {
      fs.unlink(filePath, (err) => {
        if (err) throw err;

        console.log(`deleted ${filePath}`);
      });
    }
  });
});
