const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const nodemailer = require('nodemailer');
const key = require('../key');

var APP_URL;

if (process.env.NODE_ENV === 'development') {
  APP_URL = 'http://localhost:3000/';
} else {
  APP_URL = SERVER_URL = 'https://electrictooth.app/';
}

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

async function resetPassword(req, res, next) {
  let email = req.body.email;

  let user = await User.findOne({ email: email });

  let newUser = await User.findOneAndUpdate(
    { _id: user._id },
    { reset_password_token: tokenForUser(user) },
  ).exec();

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

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: 'info@electrictooth.io',
      to: email,
      subject: 'Reset your account password',
      html:
        '<h4><b>Reset Password</b></h4>' +
        '<p>To reset your password, complete this form:</p>' +
        '<a href=' +
        APP_URL +
        'reset/' +
        user._id +
        '/' +
        newUser.reset_password_token +
        '">' +
        APP_URL +
        'reset/' +
        user._id +
        '/' +
        newUser.reset_password_token +
        '</a>' +
        '<br><br>' +
        '<p>--Team</p>',
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    message: 'hrrr',
  });
}
async function storePassword(req, res, next) {
  let email = req.body.email;

  res.status(200).json({
    message: 'hrrr',
  });
}

module.exports = {
  resetPassword,
  storePassword,
};
