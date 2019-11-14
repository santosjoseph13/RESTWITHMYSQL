var Book = require('../models/book');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};  

// Display list of all books.
exports.book_list = function(req, res) {
   Book.getAllBooks(function(err,result){
    console.log('controllersucces')
    if(err)
        res.send(err);
        console.log('res',result)
    res.send(result);
   });
 
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
           Book.getBookDetails(req.query.Name,function(err,result){    
        try{  
              if(result.length > 0){
                res.send(result);
              }
              else{
                  console.log('No book found',result);
                  res.send(result);
              }
            }
        catch{
            res.send({ error:true, message: 'Please provide book Name'})
        }
               
            
        });
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
 
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    var new_book = new Book(req.body);
    //handles null error 
    if(!new_book.Name || !new_book.Author){
  
              res.status(400).send({ error:true, message: 'Please provide book detail' });  
          }
  else{ 
 
    Book.createBook(new_book, function(err, result) {
    
      if (err){
        res.send(err);
      }
    else{
        res.send({createdBook: new_book});
        console.log(new_book);  
    }
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
    console.log('-------------------gromcontroler',req.query.Name)
    Book.getBookDetails(req.query.Name,function(err,result){ 
        console.log('-------------------gromcontroler',req.query.Name)     
        if(result.length > 0){
          res.send(result);
        }
        else{
            console.log('No user found',result);
            res.send({ message: 'No name found' });
          
        }   
    });
};

// Handle book delete on POST.
exports.book_delete_delete = function(req, res) {
    Book.deletebyName(req.query.Name,function(err,result){      
        if(result.affectedRows > 0){
            console.log('row affected', req.query.Name)
          res.send(result);
        }
        else{
            console.log('No user found',result)                   
        }             
  });
    
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    console.log('------------------IDSEND',req.params.id) 
    Book.getBookDetailsID(req.params.id,function(err,result){ 
        console.log('-------------------gromcontroler',req.query.Name)     
        if(result.length > 0){
          res.send(result);
        }
        else{
            console.log('No user found',result);
            res.send({ message: 'No book found' });          
        }   
    });
};

// Handle book update on POST.
exports.book_update_put = function(req, res) {
    Book.updateDetailsbyID(req.params.id, new Book(req.body), function(err, result) {
        if (err)
          res.send(err);
        console.log( {changedvalue:req.body,rsultingparam:result});
        res.send({changedvalue:req.body,rsultingparam:result});
       // res.json(result);
        
      });
};

