const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config');

const db = mongoose.connection.openUri(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
db.on('error', () => console.error.bind(console, '# MongoDB - connection error: '));
db.once('open', () => console.log('ET3-Database Connection ok!'));

const Admin = require('./models/admin');

async function seed() {
  const newAdmin = {
    _id: new mongoose.Types.ObjectId(),
    username: 'admin',
    password: '$2a$10$3FIRvtq69nQzpB7GbeoH1.j/OfG8Ztu0tL3ULTqBKSBiV/EnU6Ub.'
  };

  let admin = await Admin.create(newAdmin);

  admin.save((err) => {
    if (err) return handleError(err);
    db.close();
    console.log('seed complete');
  });
}

seed();
