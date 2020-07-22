var APP_URL;
var SERVER_URL;

if (process.env.NODE_ENV === 'development') {
  APP_URL = 'http://localhost:3000/';
} else {
  APP_URL = SERVER_URL = 'https://electrictooth.app/';
}

module.exports = {
  APP_URL,
  SERVER_URL
};