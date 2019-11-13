var Book = require('../models/book');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};  

// Display list of all books.
exports.book_list = function(req, res) {
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
           Book.getBookDetails(req.query.Name,function(err,result){      
              if(result.length > 0){
                res.send(result);
              }
              else{
                  console.log('No user found',result);
                  res.send(result);
              }
               
            
        });
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    var new_book = new Book(req.body);
   console.log('------------------',[new_book.Name,new_book.Author]) 
    //handles null error 
    if(!new_book.Name || !new_book.Author){
  
              res.status(400).send({ error:true, message: 'Please provide task/status' });  
          }
  else{ 
 
    Book.createBook(new_book, function(err, result) {
    
      if (err)
        res.send(err);
      res.send(result);
     });
    }
};



//Checks if the parameters are met
exports.book_checkBookName = function (req){
    console.log('------------------enterchecker',req.query.Name);
    if(req.query.Name.length  < 1)
    {
        
        boolres = false;
        return boolres;
    }
    else
        boolres =true;
        return boolres;
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

