let dbUri;

if (process.env.NODE_ENV === 'development') {
  dbUri = 'mongodb://localhost:27017/ET3';
} else {
  dbUri =
    'mongodb+srv://ben:pacers@cluster0-jxib3.mongodb.net/ET3?retryWrites=true&w=majority';
}

module.exports = {
  secret: 'littlesecret',
  dbUri: dbUri,
  port: 3090,
  PAYPAL_CLIENT_ID:
    'AakM4NG8lS-m62tcOiex6PvYOqTeZ3aogMQAwPsA8wvHZ315fDyTxremwedbssYSai1hWyTayKlFOatL',
  PAYPAL_CLIENT_SECRET:
    'EDEq95TXcPGNYGFwMlPTF3bK_LZKSDjBIsmI5XJFMLczM7ajG51TqPQNUbACQHDYYnlRjOY02J2oKtsD',
};
