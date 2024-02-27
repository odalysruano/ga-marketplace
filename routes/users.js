const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET /users/:username - sellers shop page
router.get('/:username', usersCtrl.shop);

module.exports = router;
