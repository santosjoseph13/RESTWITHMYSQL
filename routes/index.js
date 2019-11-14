const router = require('express').Router();
const  account  = require('../routes/account');


router.use('/account', account); 


module.exports = router;