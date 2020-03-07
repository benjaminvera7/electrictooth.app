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

async function resetPassword(req, res, next) {
  let email = req.body.email;

  let user = await User.findOne({ email: email });

  if (user === null) {
    res.status(200).json({
      message: 'Email does not exists',
      error: true,
    });
  } else {
    try {
      let token = tokenForUser(user);

      await User.findOneAndUpdate(
        { _id: user._id },
        { reset_password_token: token },
      ).exec();

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
function storePassword(req, res, next) {
  let userId = req.params.userId;
  let token = req.params.token;
  let password = req.body.password;
  //let passwordConfirm = req.body.passwordConfirm;

  User.findOne({ reset_password_token: token }).exec((err, user) => {
    if (!err && user) {
      user.password = password;
      user.reset_password_token = '';

      user.encrypt(() => {
        user.save((err) => {
          if (err) {
            return console.log(err);
          }

          res.status(200).json({
            message: 'Password updated',
            error: false,
          });
        });
      });
    }
  });
}

module.exports = {
  resetPassword,
  storePassword,
};
