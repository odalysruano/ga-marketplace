const mongoose = require('mongoose');
const productSchema = require('./product');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
