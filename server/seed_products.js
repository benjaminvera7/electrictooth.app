const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const config = require('./config');
const path = require('path');

const db = mongoose.connection.openUri('mongodb://localhost:27017/ET3', {
  useNewUrlParser: true,
  useCreateIndex: true,
});
db.on('error', () => console.error.bind(console, '# MongoDB - connection error: '));
db.once('open', () => console.log('ET3-Database Connection ok!'));

const Products = require('./models/products');

function seed() {
  const database = [
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'coin100',
      img_url: 'coin100.png',
      price: 1,
      type: 'coin',
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'coin200',
      img_url: 'coin200.png',
      price: 2,
      type: 'coin',
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'coin300',
      img_url: 'coin300.png',
      price: 3,
      type: 'coin',
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET01',
      artist_name: 'Shiro Schwarz',
      album_name: 'Under The Moonlight EP',
      description: "Let's spend the night together.",
      img_url: 'UnderTheMoonlight.jpg',
      price: 2,
      type: 'album',
      download_url: path.join(__dirname, `../server/music/Under The Moonlight EP.zip`),
      quantity: 1,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET01-1',
      artist_name: 'Shiro Schwarz',
      album_name: 'Under The Moonlight EP',
      song_name: 'Under The Moonlight',
      position: 1,
      stream_url: 'Under the Moonlight.mp3',
      img_url: 'UnderTheMoonlight.jpg',
      price: 1,
      stream_price: 1,
      income: 0,
      plays: 0,
      type: 'single',
      download_url: path.join(__dirname, `../server/music/Under The Moonlight.mp3`),
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET01-2',
      artist_name: 'Shiro Schwarz',
      album_name: 'Under The Moonlight EP',
      song_name: 'Power of Love',
      position: 2,
      stream_url: 'Power of Love.mp3',
      img_url: 'UnderTheMoonlight.jpg',
      price: 1,
      stream_price: 1,
      income: 0,
      plays: 0,
      type: 'single',
      download_url: path.join(__dirname, `../server/music/Power of Love.mp3`),
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET02',
      artist_name: 'Crystal Bats',
      album_name: 'Killing Me EP',
      description: '',
      img_url: 'crystalbats.jpg',
      price: 1,
      type: 'album',
      download_url: path.join(__dirname, `../server/music/Killing Me.zip`),
      quantity: 1,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET02-1',
      artist_name: 'Crystal Bats',
      album_name: 'Killing Me EP',
      song_name: 'Killing Me',
      position: 1,
      stream_url: 'Killing Me.mp3',
      img_url: 'crystalbats.jpg',
      price: 1,
      stream_price: 1,
      income: 0,
      plays: 0,
      type: 'single',
      download_url: path.join(__dirname, `../server/music/Killing Me.mp3`),
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET03',
      artist_name: 'Free Love',
      album_name: 'Synchronicity EP',
      description: '',
      img_url: 'freelove.jpg',
      price: 1,
      type: 'album',
      download_url: path.join(__dirname, `../server/music/Synchronicity.zip`),
      quantity: 1,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET03-1',
      artist_name: 'Free Love',
      album_name: 'Synchronicity EP',
      song_name: 'Synchronicity',
      position: 1,
      stream_url: 'Synchronicity.mp3',
      img_url: 'freelove.jpg',
      price: 1,
      stream_price: 1,
      income: 0,
      plays: 0,
      type: 'single',
      download_url: path.join(__dirname, `../server/music/Synchronicity.mp3`),
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET04',
      artist_name: 'FM Attack',
      album_name: 'New World LP',
      description: '',
      img_url: 'newworld.jpg',
      price: 1,
      type: 'album',
      download_url: path.join(__dirname, `../server/music/New World LP.zip`),
      quantity: 1,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET04-1',
      artist_name: 'FM Attack',
      album_name: 'New World LP',
      song_name: 'New World',
      position: 1,
      stream_url: 'New World.mp3',
      img_url: 'newworld.jpg',
      price: 1,
      stream_price: 1,
      income: 0,
      plays: 0,
      type: 'single',
      download_url: path.join(__dirname, `../server/music/New World.mp3`),
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET05',
      artist_name: 'HiRO JP',
      album_name: 'Last Month EP',
      description: '',
      img_url: 'lastmonth.jpg',
      price: 1,
      type: 'album',
      download_url: path.join(__dirname, `../server/music/Last Month EP.zip`),
      quantity: 1,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET05-1',
      artist_name: 'HiRO JP',
      album_name: 'Last Month EP',
      song_name: 'Last Month',
      position: 1,
      stream_url: 'Last Month.mp3',
      img_url: 'lastmonth.jpg',
      price: 1,
      stream_price: 1,
      income: 0,
      plays: 0,
      type: 'single',
      download_url: path.join(__dirname, `../server/music/Last Month.mp3`),
      quantity: 1,
      description: '',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET06',
      artist_name: 'Wet Baes',
      album_name: 'Midnight Caller EP',
      description: '',
      img_url: 'midnightcaller.jpg',
      price: 1,
      type: 'album',
      download_url: path.join(__dirname, `../server/music/Midnight Caller EP.zip`),
      quantity: 1,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET06-1',
      artist_name: 'Wet Baes',
      album_name: 'Midnight Caller EP',
      song_name: 'Midnight Caller',
      position: 1,
      stream_url: 'Midnight Caller.mp3',
      img_url: 'midnightcaller.jpg',
      price: 1,
      stream_price: 1,
      income: 0,
      plays: 0,
      type: 'single',
      download_url: path.join(__dirname, `../server/music/Midnight Caller.mp3`),
      quantity: 1,
      description: '',
    },
  ];

  database.forEach(async (product) => {
    let p = await Products.create(product);
    p.save();
  });
}

seed();

setTimeout(() => {
  db.close();
  console.log('seed complete');
}, 3000);