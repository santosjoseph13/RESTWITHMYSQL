var express = require('express');
var router = express.Router();
var book_controller = require('../controllers/bookController');


/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/create', book_controller.book_create_get);

// POST request for creating Book.
router.post('/create', book_controller.book_create_post);

// GET request to delete Book
router.get('/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.delete('/delete/:id', book_controller.book_delete_delete);

// GET request to update Book.
router.get('/update/:id', book_controller.book_update_get);

// POST request to update Book.
router.put('/update/:id', book_controller.book_update_put);

// GET request for one Book.

router.get('/search',book_controller.book_detail);

//router.post('/submitexam',book_controller.submitexam);

//router.get('/score/:id',book_controller.getscore);

router.get('/answer/:id',book_controller.get_answer);

router.get('/questions/:id',book_controller.get_questions);

router.get('/choices/:id',book_controller.get_choices);

/* function(req,res){{}
    
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
router.get('/list', book_controller.book_list);

module.exports = router;