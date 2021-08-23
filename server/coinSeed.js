const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config');

const db = mongoose.connection.openUri(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
db.on('error', () => console.error.bind(console, '# MongoDB - connection error: '));
db.once('open', () => console.log('ET3-Database Connection ok!'));

const Coins = require('./models/coins');

async function seed() {
  const coin100 = {
    _id: new mongoose.Types.ObjectId(),
    amount: 100,
    art_name: '1coin.png',
    price: 1,
    type: 'coin',
  };

  const coin200 = {
    _id: new mongoose.Types.ObjectId(),
    amount: 200,
    art_name: '2coin.png',
    price: 2,
    type: 'coin',
  };

  const coin300 = {
    _id: new mongoose.Types.ObjectId(),
    amount: 300,
    art_name: '3coin.png',
    price: 3,
    type: 'coin',
  };

  let coin100Obj = await Coins.create(coin100);
  coin100Obj.save();

  let coin200Obj = await Coins.create(coin200);
  coin200Obj.save();

  let coin300Obj = await Coins.create(coin300);

  coin300Obj.save((err) => {
    if (err) return handleError(err);
    db.close();
    console.log('seed complete');
  });
}

seed();
