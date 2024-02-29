var express = require("express");
var router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const usersCtrl = require("../controllers/users");

router.get('/:userId', ensureLoggedIn, usersCtrl.getUsr);
router.get('/:userId/items', ensureLoggedIn, usersCtrl.usrItmPg);
router.post('/:userId/items/add', ensureLoggedIn, usersCtrl.addItm);
router.post('/:userId/removeItems', ensureLoggedIn, usersCtrl.rmvItm);
router.post('/:userId/updateUsername', ensureLoggedIn, usersCtrl.updtUsrNm)

module.exports = router;
