const mongoose = require('mongoose');
const productSchema = require('./product');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [productSchema.schema],
});

module.exports = mongoose.model('Order', orderSchema);
