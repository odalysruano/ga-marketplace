const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

module.exports = {
    index,
    create,
    deleteItem
};

async function index(req, res) {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/google');
        }

        const googleId = req.user.googleId;
        const orders = await Order.find({ googleId }).populate('items');
        let total = 0;
        let isEmpty = true; // Initialize isEmpty variable to true
        if (orders.length > 0) {
            orders.forEach(order => {
                order.items.forEach(item => {
                    total += item.price;
                });

                // Check if order is empty
                if (order.items.length > 0) {
                    isEmpty = false;
                }
            });
        }

        res.render('orders/index', { title: 'Orders', orders, total, isEmpty });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

async function create(req, res) {
    try {
        // Check if user information is available in the request
        console.log('User Object:', req.user);
        if (!req.user || !req.user.googleId) {
            //return res.status(401).send('Unauthorized');
            return res.redirect('/auth/google');
        }

        // Retrieve the user's googleId from the request
        const googleId = req.user.googleId;
        const productId = req.params.productId;

        console.log('Adding product to cart:', productId); //remove after

        // Find product in the db using product ID from the req parameters
        const product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).send('Product not found');
        }
        
        // Find the user's order/create if it doesn't exist
        let order = await Order.findOne({ googleId }).populate('items');

        if (!order) {
            order = new Order({ googleId, items: [] });
        }

        // Add the product to the order
        order.items.push(product);

        // Save the order
        await order.save();

        // Redirect to the orders page
        return res.redirect('/orders');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

async function deleteItem(req, res) {
    try {
        // Get the Google ID of the logged-in user
        const googleId = req.user.googleId;

        // Find the order for the user
        const order = await Order.findOne({ googleId });

        // Find the index of the item to delete
        const index = order.items.findIndex(item => item._id.toString() === req.params.itemId);

        // Remove the item from the order's items array
        order.items.splice(index, 1);

        // Save the updated order
        await order.save();

        // Redirect back to the orders page
        res.redirect('/orders');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

