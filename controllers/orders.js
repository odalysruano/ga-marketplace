const Order = require('../models/order');

module.exports = {
    index,
    show,
    create,
    delete: deleteOrder,
};

async function index(req, res) {
    try {
        const orders = await Order.find({}).populate('products');
        const isEmpty = orders.length === 0;
        res.render('orders/index', { orders, isEmpty });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function show(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        res.render('orders/show', { order });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function create(req, res) {
    const order = new Order({
        product: req.body.product,
        quantity: req.body.quantity,
        price: req.body.price
    });
    try {
        const newOrder = await order.save();
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function deleteOrder(req, res) {
    try {
        await Order.findByIdAndRemove(req.params.id);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}