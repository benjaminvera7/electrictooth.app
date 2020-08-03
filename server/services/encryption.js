const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('../config');

class EncryptionService {
  tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user, iat: timestamp }, config.secret);
  }

  decode(token) {
    return jwt.decode(token, config.secret);
  }

  comparePassword(user, candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
        resolve(isMatch);
      });
    });
  }

  async encryptUserPassword(user) {
    const salt = await this.generateSalt();
    const hash = await this.hashPassword(user.password, salt);

    user.password = hash;
    user.save();
  }

  generateSalt() {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }

        return resolve(salt);
      });
    });
  }

  hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) {
          return reject(err);
        }

        return resolve(hash);
      });
    });
  }
}

const encrypt = new EncryptionService();

module.exports = encrypt;
