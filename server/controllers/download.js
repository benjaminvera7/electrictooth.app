const path = require('path');
const User = require('../models/user');
const Album = require('../models/album');
const Order = require('../models/order');
const fs = require('fs');

async function download(req, res, next) {
  let orderId = req.params.orderId;
  let product_id = req.params.product_id;
  let userId = req.user.id;

  if (!orderId) {
    return res.status(422).send({ error: 'No orderId found in query' });
  }

  if (!product_id) {
    return res.status(422).send({ error: 'No product_id found in query' });
  }

  //find order
  order = await Order.findById({ _id: orderId }).exec();

  if (!order) {
    return res.status(422).send({ error: 'No Order found' });
  }

  if (order.userId.toString() !== userId) {
    return res.status(422).send({ error: 'Unauthorized' });
  }

  try {
    let [owned] = req.user.albumCollection.filter((album) => album.product_id === product_id);

    let zip = owned.album_name + '.zip';
    const filePath = path.join(__dirname, `../music/${zip}`);

    fs.exists(filePath, function(exists) {
      if (exists) {
        // Content-type is very interesting part that guarantee that
        // Web browser will handle response in an appropriate manner.
        res.writeHead(200, {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename=' + zip,
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('ERROR File does not exist');
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  download,
};
