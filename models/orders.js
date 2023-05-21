const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const orderSchema = new Schema({
  items: [String]
});

const order = mongoose.model('Order', orderSchema);
module.exports = order;