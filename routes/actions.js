var express = require('express');
var router = express.Router();
var book_controller = require('../controllers/bookController');


/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', book_controller.book_create_get);

// POST request for creating Book.
router.post('/book/create', book_controller.book_create_post);

// GET request to delete Book.
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/delete/:name', book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book.
router.post('/book/:id/update', book_controller.book_update_post);

// GET request for one Book.

router.get('/book',book_controller.book_detail);

/* function(req,res){
    
if(book_controller.book_checkBookName(req)== true)

{ 
    console.log('----------------AFTER checkbook',req.query.Name);
       if(book_controller.book_detail(req,res) != null){
        console.log('----------------AFTER BOOKDETAIL',result);
        res.end();
       }
       
      // res.send(result)
}
else{
    console.log("-----------------null");
   // res.send({error: true,message:'Please enter book parameters'});
   res.end();
}

}); */

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

module.exports = router;