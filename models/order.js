const mongoose = require('mongoose');
const productSchema = require('./product');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [productSchema],
});

module.exports = mongoose.model('Order', orderSchema);
