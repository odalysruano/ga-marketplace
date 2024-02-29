var express = require("express");
var router = express.Router();
const shopCtrl = require("../controllers/shop");

// GET /shop/:username - sellers shop page
router.get("/:username", shopCtrl.shop);

module.exports = router;
