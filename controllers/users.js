const User = require('../models/user');
const Product = require('../models/product')


module.exports = {
    index,
    getUsr,
    usrItmPg,
    addItm,
    shop,
}

async function index(req, res) {
    try {
        const users = await User.find({});
        res.render('users/index', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function getUsr(req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('users/user', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function usrItmPg(req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.render('users/items', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function addItm(req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        const newProduct = await Product.create({
            name: req.body.name,
            category: req.body.category,
            color: req.body.color,
            price: req.body.price,
            seller: userId
        });
        
        user.itemsForSale.push(newProduct);

        await user.save();

        res.redirect(`/users/${userId}/items`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Berver Error');
    }
}

async function shop(req, res) {
    const queryResult = await User.find({username: req.params.username});
    const seller = queryResult[0];
    const products = seller.itemsForSale;
    res.render('users/shop', { title: 'Shop My Page', seller, products });
}