require("dotenv").config();
require("./config/database");

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const Review = require('./models/review');

let users = await User.find({});
console.log(users);

let products = await Product.find({});
console.log(products)