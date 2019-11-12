var Book = require('../models/book');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};  

// Display list of all books.
exports.book_list = function(req, res) {
  //  var new_book = new Book(req.body);
   Book.getAllTask(function(err,req){
    console.log('controllersucces')
    if(err)
        res.send(err);
        console.log('res',req)
    res.send(req);


   });
 
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
   // res.send('NOT IMPLEMENTED: Book create POST');
   // var new_book = new Book(req.body);

    //handles null error 
   /*   if(!new_book.task || !new_task.status){
  
              res.status(400).send({ error:true, message: 'Please provide task/status' });
  
          }
  else{ */
    
    Book.createBook(req.body, function(err, task) {
      
      if (err)
        res.send(err);
      res.json(task);
    });
  
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};

