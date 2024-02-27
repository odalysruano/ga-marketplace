const Product = require('../models/product');
const User = require('../models/user');

module.exports = {
    show,
    index,
};

async function show(req, res) {
    const product = await Product.findById(req.params.id);
    const seller = await User.findById(product.seller);
    res.render('products/show', { title: 'Product Detail', product, seller });
}

async function index(req, res) {
    const products = await Product.find({});
    res.render('products/index', { title: 'All Products', products });
}
