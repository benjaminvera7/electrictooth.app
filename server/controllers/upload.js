const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const dbConnection = require('../services/database');

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

async function editAlbum(req, res) {
  const { fields, files } = await formParse(req);

  //if artist doesn't exists, create
  const exists = await dbConnection.doesArtistExist(fields.artist_name);

  if (!exists) {
    await dbConnection.createArtist({
      artist_name: fields.artist_name,
      artist_bio: '',
      artist_img: '',
      albums: [],
    });
  }

  //return new artist _id
  const artist = await dbConnection.getArtistByName(fields.artist_name);

  //upload album cover art
  const oldCoverArtPath = files.cover_art.path;
  const newCoverArtPath = path.join(__dirname, `../uploads/${files.cover_art.name}`);
  await upload(oldCoverArtPath, newCoverArtPath);

  //create new album, add properties w/ artist _id, return new album _id
  const tags = fields.tags.replace(/\s/g, '').toLowerCase().split(',');
  const album = await dbConnection.createAlbum({
    artist_name: artist.artist_name,
    album_name: fields.album_name,
    description: fields.description,
    art_url: newCoverArtPath,
    art_name: files.cover_art.name,
    download_price: fields.download_price,
    tags: tags,
    tracks: [],
    artist: artist._id,
  });

  const tracks = [];
  for (const property in files) {
    if (property === 'cover_art') continue;

    const track_name = property;

    const oldTrackPath = files[property].path;
    const uploaded_file_name = files[property].name;
    const newTrackPath = path.join(__dirname, `../music/${uploaded_file_name}`);

    await upload(oldTrackPath, newTrackPath);

    const newTrack = await dbConnection.createTrack({
      album_id: album._id,
      album_name: album.album_name,
      track_name: track_name,
      artist_name: artist.artist_name,
      position: 0,
      art_url: newCoverArtPath,
      art_name: files.cover_art.name,
      stream_url: newTrackPath,
    });

    tracks.push(newTrack._id);
  }

  await dbConnection.addAlbumToArtist(artist._id, album._id);

  await dbConnection.addTracksToAlbum(album._id, tracks);

  res.end();
}

async function editTrack(req, res) {
  const { fields, files } = await formParse(req);

  //if artist doesn't exists, create
  const exists = await dbConnection.doesArtistExist(fields.artist_name);

  if (!exists) {
    await dbConnection.createArtist({
      artist_name: fields.artist_name,
      artist_bio: '',
      artist_img: '',
      albums: [],
    });
  }

  //return new artist _id
  const artist = await dbConnection.getArtistByName(fields.artist_name);

  //upload album cover art
  const oldCoverArtPath = files.cover_art.path;
  const newCoverArtPath = path.join(__dirname, `../uploads/${files.cover_art.name}`);
  await upload(oldCoverArtPath, newCoverArtPath);

  //create new album, add properties w/ artist _id, return new album _id
  const tags = fields.tags.replace(/\s/g, '').toLowerCase().split(',');
  const album = await dbConnection.createAlbum({
    artist_name: artist.artist_name,
    album_name: fields.track_name,
    description: fields.description,
    art_url: newCoverArtPath,
    art_name: files.cover_art.name,
    download_price: fields.download_price,
    tags: tags,
    tracks: [],
    artist: artist._id,
  });

  const tracks = [];
  for (const property in files) {
    if (property === 'cover_art') continue;

    const oldTrackPath = files[property].path;
    const uploaded_file_name = files[property].name;
    const newTrackPath = path.join(__dirname, `../music/${uploaded_file_name}`);

    await upload(oldTrackPath, newTrackPath);

    const newTrack = await dbConnection.createTrack({
      album_id: album._id,
      album_name: album.album_name,
      track_name: fields.track_name,
      artist_name: artist.artist_name,
      position: 0,
      art_url: newCoverArtPath,
      art_name: files.cover_art.name,
      stream_url: newTrackPath,
    });

    tracks.push(newTrack._id);
  }

  await dbConnection.addAlbumToArtist(artist._id, album._id);

  await dbConnection.addTracksToAlbum(album._id, tracks);

  res.end();
}

async function editArtist(req, res) {
  const { fields, files } = await formParse(req);

  const exists = await dbConnection.doesArtistExist(fields.artist_name);

  let newCoverArtPath = ''; //default image?

  if (files.artist_img) {
    const oldCoverArtPath = files.artist_img.path;
    newCoverArtPath = path.join(__dirname, `../uploads/${files.artist_img.name}`);
    await upload(oldCoverArtPath, newCoverArtPath);
  }

  if (!exists) {
    await dbConnection.createArtist({
      artist_name: fields.artist_name,
      artist_bio: fields.artist_bio,
      artist_img: newCoverArtPath,
      albums: [],
    });
    res.end();
  }
  //upload album cover art

  if (files.artist_img) {
    await dbConnection.updateArtist(fields.artist_name, 'artist_img', `${files.artist_img.name}`);
  }

  if (fields.artist_name !== undefined) {
    await dbConnection.updateArtist(fields.artist_name, 'artist_name', fields.artist_name);
  }

  if (fields.artist_bio !== undefined) {
    await dbConnection.updateArtist(fields.artist_name, 'artist_bio', fields.artist_bio);
  }

  res.end();
}

async function editProduct(req, res) {
  const { fields, files } = await formParse(req);

  const exists = await dbConnection.doesArtistExist(fields.artist_name);

  if (!exists) {
    await dbConnection.createArtist({
      artist_name: fields.artist_name,
      artist_bio: '',
      artist_img: '',
      albums: [],
    });
  }

  let newProductImgPath = ''; //default image?

  if (files.product_img) {
    const oldProductImgPath = files.product_img.path;
    newProductImgPath = path.join(__dirname, `../uploads/${files.product_img.name}`);
    await upload(oldProductImgPath, newProductImgPath);
  }

  const artist = await dbConnection.getArtistByName(fields.artist_name);

  await dbConnection.createProduct({
    product_name: fields.product_name,
    description: fields.description,
    art_url: newProductImgPath,
    art_name: files.product_img.name,
    price: fields.price,
    tags: fields.tags,
    artist_name: fields.artist_name,
    artist: artist._id,
    quantity: fields.quantity
  });

  res.status(200).json({ status: 'saved successfully' });
}

module.exports = {
  editAlbum,
  editTrack,
  editArtist,
  editProduct
};
