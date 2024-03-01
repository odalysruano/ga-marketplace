const express = require('express');
const router = express.Router();
const ordersCtrl = require('../controllers/orders');

// GET/orders - view users order(cart)
router.get('/', ordersCtrl.index);

// POST/orders/:productId - add item to cart
router.post('/:productId', ordersCtrl.create);

// Delete specified order from the cart (Delete item from cart)
router.post('/delete/:itemId', ordersCtrl.deleteItem);

module.exports = router;
