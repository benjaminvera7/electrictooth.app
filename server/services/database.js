const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');

class DatabaseService {
  constructor() {
    this.db = null;
    this.init();
  }

  init() {
     this.db = mongoose.connection.openUri(config.dbUri, {
       useNewUrlParser: true,
       useCreateIndex: true,
       useUnifiedTopology: true,
     });
     mongoose.set('useFindAndModify', false);
     this.db.on('error', () => console.error.bind(console, '# MongoDB - connection error: '));
     this.db.once('open', () => console.log('ET3-Database Connection ok!'));
  }
}

const dbConnection = new DatabaseService();

module.exports = dbConnection;