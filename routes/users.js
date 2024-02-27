var express = require("express");
var router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const usersCtrl = require("../controllers/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
