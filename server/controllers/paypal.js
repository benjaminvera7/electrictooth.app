const paypal = require('paypal-rest-sdk');
const Album = require('../models/album');
const Order = require('../models/order');
const User = require('../models/user');
const config = require('../config');
const { promisify } = require('util');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: config.PAYPAL_CLIENT_ID,
  client_secret: config.PAYPAL_CLIENT_SECRET,
});

async function requestPayment(req, res) {
  let user = await User.findById(req.body.userId).exec();

  const cart = user.cart;
  const userId = user._id;
  let order;

  order = new Order({
    userId: userId,
    status: 'PENDING',
    cart: cart,
  });

  let newOrder = await order.save();

  let { error, response } = await createPayment(newOrder);

  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(response));
  }

  res.redirect(response.redirectUrl);
}

function createPayment(order) {
  return new Promise((resolve, reject) => {
    let response = {};

    let newPayPalOrder = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          invoice_number: '',
          amount: {
            total: 0,
            currency: 'USD',
          },
          item_list: {
            items: [],
          },
        },
      ],
      note_to_payer: 'Contact us for any questions on your order.',
      redirect_urls: {
        return_url: 'http://138.197.4.93/paypal/return',
        cancel_url: 'http://138.197.4.93/paypal/cancel',
      },
    };

    let transaction = newPayPalOrder.transactions[0];

    transaction.invoice_number = order._id;
    transaction.amount.total = order.cart.total;

    let myItems = transaction.item_list.items;

    order.cart.items.forEach((item) => {
      let product_id = item.product_id;
      let found = product_id.match(/coin/g);

      if (!!found) {
        myItems.push({
          name: item.product_id,
          description: 'Coins for sustainable streaming',
          quantity: item.quantity,
          price: item.price,
          sku: item.product_id,
          currency: 'USD',
        });
      } else {
        myItems.push({
          name: item.product_id,
          description: item.album_name,
          quantity: item.quantity,
          price: item.download_price,
          sku: item.product_id,
          currency: 'USD',
        });
      }
    });

    paypal.payment.create(newPayPalOrder, (error, payment) => {
      if (error) {
        reject({ error: true, response: 'could not create paypal payment' });
      } else {
        if (payment.payer.payment_method === 'paypal') {
          let redirectUrl;

          response.paymentId = payment.id;
          response.payment = payment;

          payment.links.forEach((link) => {
            if (link.method === 'REDIRECT') {
              redirectUrl = link.href;
            }
          });

          response.redirectUrl = redirectUrl;
        }
      }

      resolve({ error: false, response: response });
    });
  });
}

async function returnPayment(req, res) {
  const paymentId = req.query.paymentId;
  const PayerID = req.query.PayerID;
  let orderId;

  let { error, response } = await getResponse(paymentId, PayerID);

  if (error) {
    res.end();
  }

  orderId = response.transactions[0].invoice_number;
  let order = await Order.findOneAndUpdate(
    { _id: orderId },
    { status: 'SUCCESSFUL' },
  ).exec();
  let user = await User.findById(order.userId).exec();

  let coins = 0;

  for (const item of order.cart.items) {
    let found = item.product_id.match(/coin/g);
    if (!!found) {
      coins = coins + parseInt(item.product_id.substring(4, 7), 10);
    }
  }

  user.exchangeCoins('ADD', coins);

  let albumArray = [];

  for (const item of order.cart.items) {
    let found = item.product_id.match(/ET/g);
    if (!!found) {
      let hasAlbum = user.albumCollection.filter(
        (album) => album.product_id === item.product_id,
      );

      if (hasAlbum.length == 0) {
        albumArray.push(item);
      }
    }
  }

  user.addToAlbumCollection(albumArray);
  user.clearCart();

  user.save();

  res.redirect(`http://138.197.4.93/download/${orderId}`);
}

function getResponse(paymentId, PayerID) {
  return new Promise((resolve, reject) => {
    const details = {
      payer_id: PayerID,
    };

    paypal.payment.execute(paymentId, details, (error, payment) => {
      if (error) {
        reject({ error: true, response: 'Payment Unsuccessful.' });
      } else {
        resolve({ error: false, response: payment });
      }
    });
  });
}

module.exports = {
  requestPayment,
  returnPayment,
};
