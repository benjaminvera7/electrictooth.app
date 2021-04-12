const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    product_name: String,
    description: String,
    art_url: String,
    art_name: String,
    price: Number,
    tags: Array,
    type: String,
    quantity: Object,
    artist_name: String,
    artist: { type: Schema.Types.ObjectId, ref: 'Artists' },
});

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;