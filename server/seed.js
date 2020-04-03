const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const config = require('./config');

const db = mongoose.connection.openUri(config.dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
db.on('error', () =>
  console.error.bind(console, '# MongoDB - connection error: '),
);
db.once('open', () => console.log('ET3-Database Connection ok!'));

const Artist = require('./models/artist');
const Album = require('./models/album');
const Song = require('./models/song');
const Coin = require('./models/coin');

async function seed() {
  const coin100 = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'coin100',
    amount: 100,
    art_url: 'coin100.png',
    price: 1,
  };

  const coin200 = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'coin200',
    amount: 200,
    art_url: 'coin200.png',
    price: 2,
  };

  const coin300 = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'coin300',
    amount: 300,
    art_url: 'coin300.png',
    price: 3,
  };

  let coin100Obj = await Coin.create(coin100);
  coin100Obj.save();

  let coin200Obj = await Coin.create(coin200);
  coin200Obj.save();

  let coin300Obj = await Coin.create(coin300);
  coin300Obj.save();

  //SHIR0
  const shiro = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Shiro Schwarz',
    albums: [],
  };

  let shiro_artist = await Artist.create(shiro);

  let shiro_album = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'ET01',
    artist: shiro_artist._id,
    artist_name: 'Shiro Schwarz',
    album_name: 'Under The Moonlight EP',
    description: "Let's spend the night together.",
    art_url: 'UnderTheMoonlight.jpg',
    download_price: 2,
    songs: [],
  };

  let album1 = await Album.create(shiro_album);
  shiro_artist.albums.push(album1._id);
  shiro_artist.save();

  let shiro_songs = [
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET01-1',
      album: album1._id,
      artist_name: 'Shiro Schwarz',
      album_name: 'Under The Moonlight EP',
      song_name: 'Under The Moonlight',
      position: 1,
      stream_url: 'Under the Moonlight.mp3',
      art_url: 'UnderTheMoonlight.jpg',
      download_price: 1,
      coin_price: 1,
      income: 0,
      plays: 0,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET01-2',
      album: album1._id,
      artist_name: 'Shiro Schwarz',
      album_name: 'Under The Moonlight EP',
      song_name: 'Power of Love',
      position: 2,
      stream_url: 'Power of Love.mp3',
      art_url: 'UnderTheMoonlight.jpg',
      download_price: 1,
      coin_price: 1,
      income: 0,
      plays: 0,
    },
  ];

  let songs1 = await Song.create(shiro_songs);

  songs1.forEach((song) => {
    album1.songs.push(song._id);
  });

  album1.save((err) => {
    if (err) return handleError(err);
  });

  //CRYSTAL BATS
  const crystalbats = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Crystal Bats',
    albums: [],
  };

  let crystalbats_artist = await Artist.create(crystalbats);

  let crystalbats_album = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'ET02',
    artist: crystalbats_artist._id,
    artist_name: 'Crystal Bats',
    album_name: 'Killing Me EP',
    description: '',
    art_url: 'crystalbats.jpg',
    download_price: 1,
    songs: [],
  };

  let album2 = await Album.create(crystalbats_album);
  crystalbats_artist.albums.push(album2._id);
  crystalbats_artist.save();

  let crystalbats_songs = [
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET02-1',
      album: album2._id,
      artist_name: 'Crystal Bats',
      album_name: 'Killing Me EP',
      song_name: 'Killing Me',
      position: 1,
      stream_url: 'Killing Me.mp3',
      art_url: 'crystalbats.jpg',
      download_price: 1,
      coin_price: 1,
      income: 0,
      plays: 0,
    },
  ];

  let songs2 = await Song.create(crystalbats_songs);

  songs2.forEach((song) => {
    album2.songs.push(song._id);
  });

  album2.save((err) => {
    if (err) return handleError(err);
    //db.close();
  });

  //FREE LOVE
  const freelove = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Free Love',
    albums: [],
  };

  let freelove_artist = await Artist.create(freelove);

  let freelove_album = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'ET03',
    artist: freelove_artist._id,
    artist_name: 'Free Love',
    album_name: 'Synchronicity EP',
    description: '',
    art_url: 'freelove.jpg',
    download_price: 1,
    songs: [],
  };

  let album3 = await Album.create(freelove_album);
  freelove_artist.albums.push(album3._id);
  freelove_artist.save();

  let freelove_songs = [
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET03-1',
      album: album3._id,
      artist_name: 'Free Love',
      album_name: 'Synchronicity EP',
      song_name: 'Synchronicity',
      position: 1,
      stream_url: 'Synchronicity.mp3',
      art_url: 'freelove.jpg',
      download_price: 1,
      coin_price: 1,
      income: 0,
      plays: 0,
    },
  ];

  let songs3 = await Song.create(freelove_songs);

  songs3.forEach((song) => {
    album3.songs.push(song._id);
  });

  album3.save((err) => {
    if (err) return handleError(err);
    //db.close();
  });

  //FM ATTACK
  const fmattack = {
    _id: new mongoose.Types.ObjectId(),
    name: 'FM Attack',
    albums: [],
  };

  let fmattack_artist = await Artist.create(fmattack);

  let fmattack_album = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'ET04',
    artist: fmattack_artist._id,
    artist_name: 'FM Attack',
    album_name: 'New World LP',
    description: '',
    art_url: 'newworld.jpg',
    download_price: 1,
    songs: [],
  };

  let album4 = await Album.create(fmattack_album);
  fmattack_artist.albums.push(album4._id);
  fmattack_artist.save();

  let fmattack_songs = [
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET04-1',
      album: album4._id,
      artist_name: 'FM Attack',
      album_name: 'New World LP',
      song_name: 'New World',
      position: 1,
      stream_url: 'New World.mp3',
      art_url: 'newworld.jpg',
      download_price: 1,
      coin_price: 1,
      income: 0,
      plays: 0,
    },
  ];

  let songs4 = await Song.create(fmattack_songs);

  songs4.forEach((song) => {
    album4.songs.push(song._id);
  });

  album4.save((err) => {
    if (err) return handleError(err);
    //db.close();
  });

  //HiRO JP
  const hirojp = {
    _id: new mongoose.Types.ObjectId(),
    name: 'HiRO JP',
    albums: [],
  };

  let hirojp_artist = await Artist.create(hirojp);

  let hirojp_album = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'ET05',
    artist: hirojp_artist._id,
    artist_name: 'HiRO JP',
    album_name: 'Last Month EP',
    description: '',
    art_url: 'lastmonth.jpg',
    download_price: 1,
    songs: [],
  };

  let album5 = await Album.create(hirojp_album);
  hirojp_artist.albums.push(album5._id);
  hirojp_artist.save();

  let hirojp_songs = [
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET05-1',
      album: album5._id,
      artist_name: 'HiRO JP',
      album_name: 'Last Month EP',
      song_name: 'Last Month',
      position: 1,
      stream_url: 'Last Month.mp3',
      art_url: 'lastmonth.jpg',
      download_price: 1,
      coin_price: 1,
      income: 0,
      plays: 0,
    },
  ];

  let songs5 = await Song.create(hirojp_songs);

  songs5.forEach((song) => {
    album5.songs.push(song._id);
  });

  album5.save((err) => {
    if (err) return handleError(err);
    //db.close();
  });

  //WET BAES
  const wetbaes = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Wet Baes',
    albums: [],
  };

  let wetbaes_artist = await Artist.create(wetbaes);

  let wetbaes_album = {
    _id: new mongoose.Types.ObjectId(),
    product_id: 'ET06',
    artist: wetbaes_artist._id,
    artist_name: 'Wet Baes',
    album_name: 'Midnight Caller EP',
    description: '',
    art_url: 'midnightcaller.jpg',
    download_price: 1,
    songs: [],
  };

  let album6 = await Album.create(wetbaes_album);
  wetbaes_artist.albums.push(album6._id);
  wetbaes_artist.save();

  let wetbaes_songs = [
    {
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET06-1',
      album: album6._id,
      artist_name: 'Wet Baes',
      album_name: 'Midnight Caller EP',
      song_name: 'Midnight Caller',
      position: 1,
      stream_url: 'Midnight Caller.mp3',
      art_url: 'midnightcaller.jpg',
      download_price: 1,
      coin_price: 1,
      income: 0,
      plays: 0,
    },
  ];

  let songs6 = await Song.create(wetbaes_songs);

  songs6.forEach((song) => {
    album6.songs.push(song._id);
  });

  album6.save((err) => {
    if (err) return handleError(err);
    db.close();
    console.log('seed complete');
  });

  // let myAlbum = await Album.create(album);

  // myArtist.albums.push(myAlbum._id);
  // myArtist.save();

  // let songs = [
  //   {
  //     _id: new mongoose.Types.ObjectId(),
  //     album: myAlbum._id,
  //     title: "Under The Moonlight",
  //     position: 1,
  //     stream_url: "Shiro Schwarz - Under the Moonlight.mp3",
  //     art_url: "UnderTheMoonlight.jpg",
  //     download_price: 1,
  //     coin_price: 1
  //   },
  //   {
  //     _id: new mongoose.Types.ObjectId(),
  //     album: myAlbum._id,
  //     title: "Power of Love",
  //     position: 2,
  //     stream_url: "Shiro Schwarz - Power of Love.mp3",
  //     art_url: "UnderTheMoonlight.jpg",
  //     download_price: 1,
  //     coin_price: 1
  //   }
  // ];

  // let mySongs = await Song.create(songs);

  // mySongs.forEach(song => {
  //   myAlbum.songs.push(song._id);
  // });

  // myAlbum.save(err => {
  //   if (err) return handleError(err);
  //   db.close();
  //   console.log("seed complete");
  // });
}

seed();
