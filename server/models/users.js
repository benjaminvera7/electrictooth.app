const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  username: String,
  coins: Number,
  reset_token: String,
  library: Array,
  stream: Array,
  created_at: Date,
  cart: { type: Schema.Types.ObjectId, ref: 'Carts' },
  playlist: { type: Schema.Types.ObjectId, ref: 'Playlists' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Orders' }],
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
