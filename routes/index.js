const router = require('express').Router();
const  account  = require('../routes/account');
const  book  = require('../routes/book');
const  examinee  = require('../routes/examinee');


router.use('/account', account); 
router.use('/book',book);
router.use('/examinee',examinee);



module.exports = router;