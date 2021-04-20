const nodemailer = require('nodemailer');
const key = require('../key');
const config = require('../config');

class MailerService {
  constructor() {
    this.transporter = null;
    this.initMailerService();
  }

  initMailerService() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'info@electrictooth.io',
        serviceClient: key.client_id,
        privateKey: key.private_key,
      },
    });
  }

  async sendOrderSummaryMail(user, order) {
    await this.transporter.verify();

    await this.transporter.sendMail({
      from: 'info@electrictooth.io',
      //to: user.email,
      to: 'vera.benjamin88@gmail.com',
      subject: `ET MUSIC: Thank you for your purchase - ${order._id}`,
      html:
        '<h4><b>Thank you!</b></h4>' +
        '<p>now to create order Summary</p>' +
        '<br><br>' +
        '<p>--Team</p>',
    });
  }

  async sendResetPasswordMail(user, resetToken) {
    await this.transporter.verify();

    await this.transporter.sendMail({
      from: 'info@electrictooth.io',
      to: user.email,
      subject: 'Reset your account password',
      html:
        '<h4><b>Reset Password</b></h4>' +
        '<p>To reset your password, complete this form:</p>' +
        `<a href='${config.host}/reset/${user._id}/${resetToken}'>${config.host}reset/${user._id}/${resetToken}</a>` +
        '<br><br>' +
        '<p>--Team</p>',
    });
  }
}

const mailer = new MailerService();

module.exports = mailer;
