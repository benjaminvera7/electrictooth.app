const path = require('path');
const fs = require('fs');
const fileExists = require('../util/fileExists');
const dbConnection = require('../services/database');

async function getDownloadDetails(productId) {
  let download;
  let downloadPath;
  let fileName;
  let contentType;

  if (productId.match(/-/g)) {
    download = await dbConnection.getSongByProductId(productId);
    fileName = download.song_name + '.mp3';
    downloadPath = path.join(__dirname, `../music/${fileName}`);
    contentType = 'audio/mpeg';
  } else {
    download = await dbConnection.getAlbumByProductId(productId);
    fileName = download.album_name + '.zip';
    downloadPath = path.join(__dirname, `../music/${fileName}`);
    contentType = 'application/zip';
  }

  return { fileName, downloadPath, contentType };
}

async function downloadFromOrder(req, res) {
  const { orderId, product_id, userId } = req.params;

  if (!orderId || !product_id || !userId) {
    return res.status(422).send({ error: 'order data not found' });
  }

  const order = await dbConnection.getOrderById(orderId);

  if (!order || order.userId.toString() !== userId) {
    return res.status(422).send({ error: 'No Order found' });
  }

  const { fileName, downloadPath, contentType } = await getDownloadDetails(
    product_id,
  );

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

async function downloadFromProfile(req, res) {
  const product_id = req.params.product_id;

  const { fileName, downloadPath, contentType } = await getDownloadDetails(
    product_id,
  );

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

module.exports = {
  downloadFromOrder,
  downloadFromProfile,
};
