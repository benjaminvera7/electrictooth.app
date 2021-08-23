const fs = require('fs');
const path = require('path');
const dbConnection = require('../services/database');

async function userOwnsProduct(user, trackId) {
  let tracks = [];

  const libary = user.library;

  for (const album of libary) {
    if (album.type === 'album') {
      tracks.push(...album.tracks);
    }
    if (album.type === 'track') {
      tracks.push(album._id)
    }
  }

  const trackExists = tracks.some((l) => l._id.toString() === trackId.toString());

  return trackExists;
}

async function stream(req, res) {
  const { user, params } = req;

  if (user.coins === 0) {
    return res.status(422).send({ error: 'Not enough coins' });
  }

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
      await dbConnection.addTrackIncome(track_id);
      stream.id = track_id;
      stream.expire = Date.now() + 60000;
      const filtered = user.stream.filter((s) => s.id !== track_id);
      user.stream = [...filtered, stream];
      user.save();
    }
  }

  await dbConnection.addTrackPlay(track_id);

  const streamPath = path.join(__dirname, `../music/${track.stream_url}`);

  const stat = fs.statSync(streamPath);
  const readStream = fs.createReadStream(streamPath);

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
