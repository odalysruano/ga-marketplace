const express = require('express');
const router = express.Router();
const ordersCtrl = require('../controllers/orders');

// Create a new order (Add item to cart)
router.post('/orders', ordersCtrl.create);

// Read all orders in the cart (View cart contents)
router.get('/', ordersCtrl.index);

// Read a specific order in the cart (View specific item in cart) *not sure yet*
router.get('/orders/:id', ordersCtrl.show);

// Delete specified order from the cart (Delete item from cart)
router.delete('/orders/:id', ordersCtrl.delete);

module.exports = router;
