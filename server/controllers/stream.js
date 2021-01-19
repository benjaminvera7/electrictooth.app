const fs = require('fs');
const dbConnection = require('../services/database');

async function userOwnsProduct(user, trackId) {
  const library = user.library;

  const trackExists = library.some((l) => l._id === trackId);

  return trackExists;
}

async function stream(req, res) {
  const { user, params } = req;

  const track_id = params.id;
  const track = await dbConnection.getTrackById(track_id);
  const owns = await userOwnsProduct(user, track._id);

  if (!owns) {
    let [stream] = user.stream.filter((s) => s.id === track_id);

    if (!stream) {
      stream = {
        id: null,
        expire: null,
      };
    }

    if (Date.now() > stream.expire || stream.expire === null || stream.id !== track_id) {
      await dbConnection.subtractCoin(user);
      stream.id = track_id;
      stream.expire = Date.now() + 60000;
      const filtered = user.stream.filter((s) => s.id !== track_id);
      user.stream = [...filtered, stream];
      user.save();
    }
  }

  const stat = fs.statSync(track.stream_url);
  const readStream = fs.createReadStream(track.stream_url);

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
