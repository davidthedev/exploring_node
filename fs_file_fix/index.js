const fs = require('fs');
const path = require('path');
const { StringDecoder } = require('string_decoder');

const corruptedFiles = path.join(__dirname, 'corrupted_files');
const cleanFiles = path.join(__dirname, 'clean_files');

fs.readdir('./corrupted_files', (err, files) => {
  if (err) {
    throw new Error('error');
  } else {
    files.forEach((file, index) => {
      const buffer = fs.readFileSync(`${corruptedFiles}/${file}`);
      const decoder = new StringDecoder('utf8');

      const string = decoder.write(buffer);
      const arr = string.split('\n').filter((item) => item);

      let lines = [];

      for (let i = 0; i < arr.length; i++) {
        if (lines[0] === arr[i]) {
          break;
        } else {
          lines[i] = arr[i];
        }
      }

      if (!fs.existsSync(cleanFiles)) {
        fs.mkdir(cleanFiles, (err) => {
          if (err) throw err;
        });
      }

      fs.appendFile(`${cleanFiles}/${file}`, lines.join('\n'), 'utf8', (err) => {
        if (err) throw err;
        console.log('Data appended to file');
      });
    });
  }
});
