var express = require('express');
var router = express.Router();
var account_controller = require('../controllers/accountController.js');

router.post('/create', account_controller.accountcreate_post);


module.exports = router;