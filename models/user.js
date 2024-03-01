const mongoose = require("mongoose");
const productSchema = require("./product");
const orderSchema = require("./order");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true,
    },
    email: String,
    avatar: String,
    username: {
        type: String,
        required: true,
    },
    itemsForSale: [productSchema.schema],
    orders: [orderSchema.schema],
});

module.exports = mongoose.model("User", userSchema);
