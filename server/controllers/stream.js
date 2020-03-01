const path = require('path');
const fs = require('fs');
const Song = require('../models/song');

async function stream(req, res, next) {
  const songId = req.params.songId;
  const song = await Song.findById({ _id: songId });

  const albumCollection = await req.user.getAlbumCollection();

  let songExists = albumCollection.filter(
    (item) => item.product_id === song.product_id,
  );

  let albumExists = albumCollection.filter(
    (item) => item.id.toString() === song.album.toString(),
  );

  if (songExists.length === 0 && albumExists.length === 0) {
    const coins = req.user.getCoins();
    if (coins >= 1) {
      song.addIncome();
      song.save();

      req.user.exchangeCoins('SUBTRACT', 1);
      req.user.save();
    } else {
      //NO COINS TO STREAM, FLASH MESSAGE
      return res.sendStatus(401);
    }
  }

  let music = path.join(__dirname, `../music/${song.stream_url}`);
  let stat = fs.statSync(music);
  range = req.headers.range;
  let readStream;

  res.status(206);

  if (range !== undefined) {
    let parts = range.replace(/bytes=/, '').split('-');

    let partial_start = parts[0];
    let partial_end = parts[1];

    if (
      (isNaN(partial_start) && partial_start.length > 1) ||
      (isNaN(partial_end) && partial_end.length > 1)
    ) {
      return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
    }

    let start = parseInt(partial_start, 10);
    let end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
    let content_length = end - start + 1;

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': content_length,
      'Content-Range': 'bytes ' + start + '-' + end + '/' + stat.size,
    });

    readStream = fs.createReadStream(music, { start: start, end: end });
  } else {
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size,
    });

    readStream = fs.createReadStream(music);
  }

  song.addPlay();
  song.save();

  readStream.on('open', function() {
    // This just pipes the read stream to the response object (which goes to the client)
    return readStream.pipe(res);
  });

  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    return res.end(err);
  });
}

module.exports = {
  stream,
};
