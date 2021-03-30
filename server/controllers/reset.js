const encrypt = require('../services/encryption');
const dbConnection = require('../services/database');
const mailer = require('../services/mailer');

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
      let resetToken = encrypt.tokenForUser(user);

      await dbConnection.updateUserResetToken(user._id, resetToken);
      await mailer.sendResetPasswordMail(user, resetToken);

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
  let token = req.params.token;
  let password = req.body.password;

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
