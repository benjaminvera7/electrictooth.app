const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const fs = require('fs');

const dbConnection = require('./services/database');


const checkCustomerAuth = require('./util/checkCustomerAuth');
const checkAdminAuth = require('./util/checkAdminAuth');

const uploadRoutes = require('./routes/upload');
const musicRoutes = require('./routes/music');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const resetRoutes = require('./routes/reset');
const streamRoutes = require('./routes/stream');
const paypalRoutes = require('./routes/paypal');
const downloadRoutes = require('./routes/download');
const orderRoutes = require('./routes/order');
const ethRoutes = require('./routes/eth');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/music', musicRoutes);
app.use('/api/v1/reset', resetRoutes);
app.use('/api/v1/paypal', paypalRoutes);

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/upload', checkAdminAuth, uploadRoutes);

app.use('/api/v1/user', checkCustomerAuth, userRoutes);
app.use('/api/v1/stream', checkCustomerAuth, streamRoutes);
app.use('/api/v1/download', checkCustomerAuth, downloadRoutes);
app.use('/api/v1/order', checkCustomerAuth, orderRoutes);
app.use('/api/v1/eth', checkCustomerAuth, ethRoutes);

var metadata = new Map();

const getMetadata = async () => {
  const albumMetadata = await dbConnection.getAllAlbumsMetaData();

  albumMetadata.forEach(album => {
    const key = `/music/${album.album_name.replace(/\s+/g, '-')}`;
    const title = `${album.album_name}`;
    const description = `Listen to album ${album.album_name} by ${album.artist_name} on Electric Tooth`;
    const img = `https://www.electrictooth.com/uploads/${album.art_name}`

    metadata.set(key, {
      title,
      description,
      img
    })
  })

  const artistMetadata = await dbConnection.getAllArtistsMetadata();

  artistMetadata.forEach(artist => {
    const key = `/artist/${artist.artist_name.replace(/\s+/g, '-')}`;
    const title = `${artist.artist_name}`;
    const description = artist.artist_bio !== "" ? artist.artist_bio : `Stream ${artist.artist_name}'s music on Electric Tooth' `;
    const img = artist.artist_img !== "" ? `https://www.electrictooth.com/uploads/${artist.artist_img}` : "https://www.electrictooth.com/uploads/et.png";

    metadata.set(key, {
      title,
      description,
      img
    })
  })
}

getMetadata();

app.get('/*', (req, res) => {

  const filePath = path.resolve(__dirname, '../client/build', 'index.html');

  let meta = metadata.get(req.url);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (meta) {
      data = data.replace(/\Electric Tooth/g, meta.title);
      data = data.replace(/\Pay-Per-Play streaming and Digital Downloads. 100% goes to the artist!/g, meta.description);
      data = data.replace(/\https:\/\/www.electrictooth.com\/uploads\/et.png/g, meta.img);
    }
    res.send(data);
  });

});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(config.port);

console.log(`ET3-Server is listening on http://localhost:${config.port}`);


if (process.env.NODE_ENV === 'production') {
  const admin = express();

  admin.use(morgan('dev'));
  admin.use(bodyParser.json());
  admin.use(bodyParser.urlencoded({ extended: false }));
  admin.use(cookieParser());
  admin.use(cors());

  admin.use(express.static(path.join(__dirname, '../admin/build')));

  admin.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../admin/build', 'index.html'));
  });


  admin.listen(5000);

  console.log(`ET3-Admin is listening on http://localhost:5000`);
}


console.log(`SERVER RUNNING IN: ${process.env.NODE_ENV}`)