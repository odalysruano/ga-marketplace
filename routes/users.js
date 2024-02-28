var express = require("express");
var router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const usersCtrl = require("../controllers/users");

router.get('/:userId', usersCtrl.getUsr);
router.get('/:userId/items', usersCtrl.usrItmPg);
router.post('/:userId/items/add', usersCtrl.addItm);
router.post('/:userId/removeItems', usersCtrl.rmvItm);
router.post('/:userId/updateUsername', usersCtrl.updtUsrNm)
// GET /users/:username - sellers shop page
router.get("/:username", usersCtrl.shop);

module.exports = router;
