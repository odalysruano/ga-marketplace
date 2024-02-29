const User = require('../models/user');

module.exports = {
    shop,
};

async function shop(req, res) {
    const queryResult = await User.find({username: req.params.username});
    const seller = queryResult[0];
    const products = seller.itemsForSale;
    res.render('users/shop', { title: 'Shop My Page', seller, products });
}
