const fs = require('fs');

function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if (exists) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

module.exports = fileExists;