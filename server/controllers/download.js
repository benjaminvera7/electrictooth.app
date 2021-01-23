const path = require('path');
const fs = require('fs');
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
  }

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

async function downloadFromProfile(req, res) {
  const product_id = req.params.product_id;

  const { fileName, downloadPath, contentType } = await getDownloadDetails(product_id);

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
