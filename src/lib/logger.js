const fs = require('fs');
const path = require('path');

class Logger {
  constructor(filename) {
    this.logFile = fs.createWriteStream(path.join(__dirname, filename), { flags: 'a' });
  }

  log(source, message) {
    console.log(`[${source}]`, new Date().toISOString(), message);
  }
}
exports.Logger = Logger;
