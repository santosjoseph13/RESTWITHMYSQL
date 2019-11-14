const router = require('express').Router();
const  account  = require('../routes/account');
const  book  = require('../routes/book');


router.use('/account', account); 
router.use('/book',book);



module.exports = router;