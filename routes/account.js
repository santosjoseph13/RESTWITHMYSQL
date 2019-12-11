var express = require('express');
var router = express.Router();
var account_controller = require('../controllers/accountController.js');

router.get('/', account_controller.accountindex);
router.post('/register', account_controller.accountcreate_post);
router.post('/login', account_controller.accountlogin_post);
router.post('/update', account_controller.accountupdate_put);
router.post('/delete', account_controller.accountdelete_post);

module.exports = router;