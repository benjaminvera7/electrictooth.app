const paypalSDK = require('paypal-rest-sdk');
const config = require('../config');


class PayPalService {
  constructor() {
    this.payment = {
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
        //return_url: `${config.appUrl}/paypal/return`,
        return_url: `${config.api}/paypal/return`,
        cancel_url: `${config.api}/paypal/cancel`,
      },
    };
    this.configure();
  }

  getPaymentTemplate() {
    return Object.assign({}, this.payment);
  }

  configure() {
    paypalSDK.configure({
      mode: 'sandbox', //sandbox or live
      client_id: config.PAYPAL_CLIENT_ID,
      client_secret: config.PAYPAL_CLIENT_SECRET,
    });
  }

  createPayment(newPayment) {
    return new Promise((resolve, reject) => {
      paypalSDK.payment.create(newPayment, (error, payment) => {
        const response = {};

        if (error) {
          reject({
            error: true,
            response: 'could not create paypal payment',
          });
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

  getResponse(paymentId, PayerID) {
    return new Promise((resolve, reject) => {
      const details = {
        payer_id: PayerID,
      };

      paypalSDK.payment.execute(paymentId, details, (error, payment) => {
        if (error) {
          reject({ error: true, response: 'Payment Unsuccessful.' });
        } else {
          resolve({ error: false, response: payment });
        }
      });
    });
  }
}

const paypal = new PayPalService();

module.exports = paypal;
