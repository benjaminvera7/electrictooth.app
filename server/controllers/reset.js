const User = require('../models/user');
const nodemailer = require('nodemailer');
const key = require('../key');
const { APP_URL, SERVER_URL } = require('../util/url');
const encrypt = require('../services/encryption');
const dbConnection = require('../services/database');

const transporter = nodemailer.createTransport({
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

async function resetPassword(req, res) {
  let email = req.body.email;

  let user = await dbConnection.getUserByEmail(email);

  if (user === null) {
    res.status(200).json({
      message: 'Email does not exists',
      error: true,
    });
  } else {
    try {
      let token = encrypt.tokenForUser(user);

      await dbConnection.updateUserResetToken(user._id, token);

      await transporter.verify();
      await transporter.sendMail({
        from: 'info@electrictooth.io',
        to: email,
        subject: 'Reset your account password',
        html:
          '<h4><b>Reset Password</b></h4>' +
          '<p>To reset your password, complete this form:</p>' +
          `<a href='${APP_URL}reset/${user._id}/${token}'>${APP_URL}reset/${user._id}/${token}</a>` +
          '<br><br>' +
          '<p>--Team</p>',
      });
    } catch (err) {
      console.log(err);
    }

    res.status(200).json({
      message: 'Please check your email for the reset link',
      error: false,
    });
  }
}
async function storePassword(req, res) {
  //let userId = req.params.userId;
  let token = req.params.token;
  let password = req.body.password;
  //let passwordConfirm = req.body.passwordConfirm;

  const user = await dbConnection.getUserByResetToken(token);

  if (user) {
    user.password = password;
    user.reset_password_token = '';
    await encrypt.encryptUserPassword(user);

    res.status(200).json({
      message: 'Password updated',
      error: false,
    });
  }
}

module.exports = {
  resetPassword,
  storePassword,
};
