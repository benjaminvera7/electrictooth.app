const fs = require('fs');
const AdmZip = require('adm-zip');
const fileExists = require('../util/fileExists');
const dbConnection = require('../services/database');

async function getDownloadDetails(item) {
  let download;
  let downloadPath;
  let fileName;
  let contentType;

  if (item.type === 'track') {
    fileName = item.track_name + '.mp3';
    downloadPath = item.stream_url;
    contentType = 'audio/mpeg';
  } else {
    //TODO: ZIP ALBUM FILES
    // download = await dbConnection.getAlbumByProductId(productId);
    // fileName = download.album_name + '.zip';
    // downloadPath = path.join(__dirname, `../music/${fileName}`);
    // contentType = 'application/zip';
  }

  return { fileName, downloadPath, contentType };
}

async function downloadFromOrder(req, res) {
  const { orderId, id } = req.params;
  const userId = req.user._id;

  if (!orderId || !id || !userId) {
    return res.status(422).send({ error: 'order data not found' });
  }

  const order = await dbConnection.getOrderById(orderId);

  console.log(order.user_id.toString());
  console.log(userId.toString());

  if (!order || order.user_id.toString() !== userId.toString()) {
    return res.status(422).send({ error: 'No Order found' });
  }

  const [item] = order.cart.items.filter((i) => i.id.toString() === id.toString());

  let itemToDownload;

  if (item.type === 'track') {
    itemToDownload = await dbConnection.getTrackById(item.id);

    const { fileName, downloadPath, contentType } = await getDownloadDetails(itemToDownload);

    const exists = await fileExists(downloadPath);

    if (exists) {
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=' + fileName,
      });
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('ERROR File does not exist');
    }

    fs.createReadStream(downloadPath).pipe(res);
  }

  if (item.type === 'album') {
    itemToDownload = await dbConnection.getFullAlbumById(item.id);

    let zip = new AdmZip();

    itemToDownload.tracks.forEach((track) => {
      zip.addLocalFile(track.stream_url);
    });

    let data = zip.toBuffer();

    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${itemToDownload.album_name}.zip`);
    res.set('Content-Length', data.length);
    res.send(data);
  }
}

async function downloadFromProfile(req, res) {
  const id = req.params.id;
  const userId = req.user._id;

  if (!id || !userId) {
    return res.status(422).send({ error: 'order data not found' });
  }

  const [item] = req.user.library.filter((i) => i._id.toString() === id.toString());

  let itemToDownload;

  if (item.type === 'track') {
    itemToDownload = await dbConnection.getTrackById(item._id);

    const { fileName, downloadPath, contentType } = await getDownloadDetails(itemToDownload);

    const exists = await fileExists(downloadPath);

    if (exists) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename=' + fileName,
      });
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('ERROR File does not exist');
    }

    fs.createReadStream(downloadPath).pipe(res);
  }

  if (item.type === 'album') {
    itemToDownload = await dbConnection.getFullAlbumById(item._id);

    let zip = new AdmZip();

    itemToDownload.tracks.forEach((track) => {
      zip.addLocalFile(track.stream_url);
    });

    let data = zip.toBuffer();

    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${itemToDownload.album_name}.zip`);
    res.set('Content-Length', data.length);
    res.send(data);
  }
}

module.exports = {
  downloadFromOrder,
  downloadFromProfile,
};
