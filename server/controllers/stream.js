const fs = require('fs');
const dbConnection = require('../services/database');

async function userOwnsProduct(user, song) {
  const albumCollection = await user.getAlbumCollection();

  let songExists = albumCollection.filter(
    (item) => item.product_id === song.product_id,
  );

  let albumExists = albumCollection.filter(
    (item) => item.id.toString() === song.album.toString(),
  );

  return !(songExists.length === 0 && albumExists.length === 0);
}

async function stream(req, res) {
  const { user, params, session } = req;

  const id = params.songId;
  const song = await dbConnection.getSongById(id);
  const owns = await userOwnsProduct(user, song);

  if (!owns) {
    if (!session.stream) {
      session.stream = {
        id: null,
        expire: null,
      };
    }

    if (
      Date.now() > session.stream.expire ||
      session.stream.expire === null ||
      session.stream.id !== id
    ) {
      await dbConnection.subtractCoin(user);
      session.stream.id = id;
      session.stream.expire = Date.now() + 60000; 
      session.save();
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
