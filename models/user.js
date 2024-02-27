const mongoose = require("mongoose");
const productSchema = require("./product");
const orderSchema = require("./order");
const reviewSchema = require("./review");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true,
  },
  email: String,
  avatar: String,
  itemsForSale: [productSchema.schema],
  orders: [orderSchema.schema],
  reviews: [reviewSchema.schema],
});

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function (userId, cb) {
  cb(null, await User.findById(userId));
});

module.exports = mongoose.model("User", userSchema);
