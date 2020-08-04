const fs = require('fs');
const dbConnection = require('../services/database');

async function userOwnsProduct(user, song) {
  const albumCollection = await user.getAlbumCollection();

  let songExists = albumCollection.some(
    (item) => item.product_id === song.product_id,
  );

  let albumExists = albumCollection.some(
    (item) => item.id.toString() === song.album.toString(),
  );

  return songExists || albumExists;
}

async function stream(req, res) {
  const { user, params } = req;

  const id = params.songId;
  const song = await dbConnection.getSongById(id);
  const owns = await userOwnsProduct(user, song);


  if (!owns) {

    let [ stream ] = user.stream.filter(s => s.id === id);

    if (!stream) {
      stream = {
        id: null,
        expire: null,
      };
    }

    if (
      Date.now() > stream.expire ||
      stream.expire === null ||
      stream.id !== id
    ) {
      await dbConnection.subtractCoin(user);
      stream.id = id;
      stream.expire = Date.now() + 60000;
      const filtered = user.stream.filter(s => s.id !== id)
      user.stream = [...filtered, stream];
      user.save();
    }
  }

  const stream_url = song.download_url;
  const stat = fs.statSync(stream_url);
  const readStream = fs.createReadStream(stream_url);

  res.status(206).set({
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size,
  });

  readStream.on('open', () => readStream.pipe(res));
  readStream.on('error', (err) => res.end(err));
}

module.exports = {
  stream,
};
