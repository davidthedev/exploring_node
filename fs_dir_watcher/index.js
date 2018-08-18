const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'dir_to_watch');

const allFilesInDir = fs.readdirSync(dirname);

// fs.watch API is not 100% consistent across platforms
fs.watch(dirname, (eventType, filename) => {
  // rename eventType is fired for both add or delete events
  if (eventType == 'rename') {
    const fileIndex = allFilesInDir.indexOf(filename);

    if (fileIndex >= 0) {
      allFilesInDir.splice(allFilesInDir[fileIndex], 1);
      console.log(`${filename} has been removed`);
      return;
    }

    allFilesInDir.push(filename);
    console.log(`${filename} have been added`);
    return;
  }

  console.log(`${filename} has been changed`);
});
