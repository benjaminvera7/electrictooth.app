const mongoose = require('mongoose');
const db = mongoose.connection.openUri('mongodb://localhost:27017/ET4', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

db.on('error', () => console.error.bind(console, '# MongoDB - connection error: '));
db.once('open', () => console.log('ET3-Database Connection ok!'));

function createDatabase() {
  db.createCollection('artists', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['artist_name', 'artist_bio', 'artist_img', 'albums'],
        properties: {
          artist_name: { bsonType: 'string' },
          artist_bio: { bsonType: 'string' },
          artist_img: { bsonType: 'string' },
          albums: { bsonType: 'array', items: { bsonType: 'objectId' } },
        },
      },
    },
  });
  db.createCollection('albums', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['artist_name', 'album_name', 'description', 'art_url', 'download_price', 'tracks'],
        properties: {
          artist_name: { bsonType: 'string' },
          album_name: { bsonType: 'string' },
          description: { bsonType: 'string' },
          art_url: { bsonType: 'string' },
          download_price: { bsonType: 'int' },
          tracks: { bsonType: 'array', items: { bsonType: 'objectId' } },
        },
      },
    },
  });
  db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'album_collection',
          'email',
          'password',
          'username',
          'coins',
          'cart_id',
          'cart',
          'playlists',
          'orders',
        ],
        properties: {
          album_collection: { bsonType: 'array', items: { bsonType: 'objectId' } },
          email: { bsonType: 'string' },
          password: { bsonType: 'string' },
          username: { bsonType: 'string' },
          coins: { bsonType: 'int' },
          cart_id: { bsonType: 'objectId' },
          cart: { bsonType: 'objectId' },
          playlists: { bsonType: 'array', items: { bsonType: 'objectId' } },
          orders: { bsonType: 'array', items: { bsonType: 'objectId' } },
        },
      },
    },
  });
  db.createCollection('tracks', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'album_id',
          'artist_name',
          'album_name',
          'track_name',
          'position',
          'art_url',
          'stream_url',
          'download_price',
          'coin_price',
          'plays',
          'income',
        ],
        properties: {
          album_id: { bsonType: 'objectId' },
          artist_name: { bsonType: 'string' },
          album_name: { bsonType: 'string' },
          track_name: { bsonType: 'string' },
          position: { bsonType: 'int' },
          art_url: { bsonType: 'string' },
          stream_url: { bsonType: 'string' },
          download_price: { bsonType: 'int' },
          coin_price: { bsonType: 'int' },
          plays: { bsonType: 'int' },
          income: { bsonType: 'int' },
        },
      },
    },
  });
  db.createCollection('carts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['user_id', 'cart'],
        properties: { user_id: { bsonType: 'objectId' }, cart: { bsonType: 'array' } },
      },
    },
  });
  db.createCollection('playlists', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['user_id', 'playlist_name', 'tracks'],
        properties: {
          user_id: { bsonType: 'string' },
          playlist_name: { bsonType: 'string' },
          tracks: { bsonType: 'array', items: { bsonType: 'objectId' } },
        },
      },
    },
  });
  db.createCollection(
    'orders',
    {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['status', 'cart', 'type', 'hash', 'date'],
          properties: {
            status: { bsonType: 'string' },
            cart: { bsonType: 'object' },
            type: { bsonType: 'string' },
            hash: { bsonType: 'string' },
            date: { bsonType: 'timestamp' },
          },
        },
      },
    },
    () => {
      db.close();
      console.log('database creation complete');
    },
  );

  return;
}

createDatabase();
