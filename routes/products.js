const express = require('express');
const router = express.Router();

const productsCtrl = require('../controllers/products');

// GET /products
router.get('/', productsCtrl.index);
// GET /products/:id
router.get('/:id', productsCtrl.show);

module.exports = router;
