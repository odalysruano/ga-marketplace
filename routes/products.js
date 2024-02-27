const express = require('express');
const router = express.Router();

const productsCtrl = require('../controllers/products');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /products/:id
router.get('/:id', productsCtrl.show);

module.exports = router;
