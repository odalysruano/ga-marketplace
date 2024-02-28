const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }, 
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    }, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
