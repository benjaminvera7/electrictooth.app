const nodemailer = require('nodemailer');
const key = require('../key');
const { APP_URL, SERVER_URL } = require('../util/url');

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

  async sendMail(user, resetToken) {
    await this.transporter.verify();

    await this.transporter.sendMail({
      from: 'info@electrictooth.io',
      to: user.email,
      subject: 'Reset your account password',
      html:
        '<h4><b>Reset Password</b></h4>' +
        '<p>To reset your password, complete this form:</p>' +
        `<a href='${APP_URL}reset/${user._id}/${resetToken}'>${APP_URL}reset/${user._id}/${resetToken}</a>` +
        '<br><br>' +
        '<p>--Team</p>',
    });

  }
}

const mailer = new MailerService();

module.exports = mailer;