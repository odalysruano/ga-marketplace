const mongoose = require('mongoose');
const productSchema = require('./product');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
   items: [productSchema.schema],
   googleId: {
    type: String,
    required: true,
   },
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
