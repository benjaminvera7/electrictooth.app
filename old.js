const formidable = require('formidable');
const fs = require('fs');
const JSZip = require('jszip');
const mongoose = require('mongoose');
const Products = require('./models/products');
const Songs = require('./models/songs');

require('./models/songs');
require('./models/artists');
require('./models/products');

const Artists = require('./models/artists');
const productRoutes = require('./routes/products');

app.use('/api/v1/artists', async (req, res) => {
  const artists = await Artists.find();
  res.status(200).json(artists);
});

//sudo mongod --dbpath ~/data/db
const upload = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

const formParse = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

//rethink uploading/products

/*
check out bancamp does it.

upload .mp3 files then if user wants zip, server creates it

//add track logic
*/

app.use('/admin/upload', async (req, res) => {
  const { fields, files } = await formParse(req);

  const oldImagePath = files.image.path;
  const newImagePath = path.join(__dirname, `../server/uploads/${files.image.name}`);

  //await upload(oldImagePath, newImagePath);

  let currentArtist = null;
  let artist_name = null;

  if (fields.new_artist === 'true') {
    artist_name = fields.artist_name;

    currentArtist = new Artists({
      name: fields.artist_name,
      albums: [],
    });
  } else {
    artist_name = fields.artist_list;

    currentArtist = await Artists.findOne({ name: fields.artist_list });
    console.log(currentArtist.toObject());
  }

  if (fields.product_type === 'album') {
    var _songs = [];

    const newAlbum = new Products({
      _id: new mongoose.Types.ObjectId(),
      artist_name: artist_name,
      album_name: fields.album_name,
      description: fields.description,
      img_url: files.image.name,
      price: fields.download_price,
      type: fields.product_type,
    });

    for (const property in files) {
      if (property === 'image') continue;

      let oldAudioPath = files[property].path;
      let name = files[property].name;
      let newAudioPath = path.join(__dirname, `../server/music/${name}`);

      //await upload(oldAudioPath, newAudioPath);

      let newSong = new Songs({
        _id: new mongoose.Types.ObjectId(),
        album: newAlbum._id,
        artist_id: currentArtist._id,
        artist_name: artist_name,
        album_name: fields.album_name,
        art_url: files.image.name,
        song_name: files[property].name,
        stream_url: newAudioPath,
      });

      let me = await newSong.save();

      _songs.push(me._id);
    }

    let oldAlbums = currentArtist.albums;
    oldAlbums.push(newAlbum._id);
    currentArtist.albums = oldAlbums;
    await currentArtist.save();

    newAlbum.songs = _songs;
    var _album = await newAlbum.save();
  }

  const album_songs = await Songs.find({ _id: { $in: _album.songs } });

  album_songs.forEach((s) => {
    console.log(s.toObject());
  });
});

app.use('/admin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let response = {
    result: 'success',
    token: 'oidioenfe3029u390423jnfasnfjksan',
  };

  res.status(200).json(response);
});

// //console.log(_songs);

// //create album product
// const newAlbum = new Products({
//   _id: new mongoose.Types.ObjectId(),
//   artist_name: fields.artist_name,
//   album_name: fields.album_name,
//   description: fields.description,
//   img_url: files.image.name,
//   price: fields.download_price,
//   type: fields.product_type,
//   songs: _songs,
// });

// let _album = await newAlbum.save();

// //console.log(_album);

// const album_songs = await Products.find({ _id: { $in: _album.songs } });

// album_songs.forEach((s) => {
//   console.log(s.toObject());
// });
//console.log(album_songs[0].song_name);

// const oldImagePath = files.image.path;
// const newImagePath = path.join(__dirname, `../server/uploads/${files.image.name}`);

// await upload(oldImagePath, newImagePath);

// for (const property in files) {
//   if (property === 'image') continue;

//   let oldAudioPath = files[property].path;
//   let name = files[property].name;
//   let newAudioPath = path.join(__dirname, `../server/music/${name}`);

//   await upload(oldAudioPath, newAudioPath);
// }

// var oldAudioPath = files.audio.path;
// var newAudioPath = path.join(__dirname, `../server/music/${files.audio.name}`);

// await upload(oldImagePath, newImagePath);
// await upload(oldAudioPath, newAudioPath);

// const newProduct = new Products({
//   _id: new mongoose.Types.ObjectId(),
//   product_id: 'ET07',
//   artist_name: fields.artist_name,
//   album_name: fields.album_name,
//   description: fields.description,
//   img_url: files.image.name,
//   price: fields.download_price,
//   type: fields.type,
//   download_url: newAudioPath, //wrong
//   quantity: 1,
// });

// newProduct.save();

// res.end();
