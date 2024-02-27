const User = require('../models/user');
const Product = require('../models/product')


module.exports = {
    index,
    getUsr,
    usrItmPg,
    addItm,
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