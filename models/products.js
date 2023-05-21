const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const productSchema = new Schema({
  manufacturer: String,
  model: String,
  price: String
});

const Product = mongoose.model('Product', productSchema);
module.exports =  Product;