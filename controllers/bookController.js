var Book = require('../models/book');
var Account = require('../models/account')
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const { response, SUCCESS, EMPLOYEE_EXISTS, CREATED,BOOK_CREATED,BOOK_EXISTS, EMPLOYEE_NOT_EXISTS, SUCCESS_CHANGE_BOOK_INFO } = require('../response');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};  

// Display list of all books.
exports.book_list = function(req, res) {
 
    Book.getAllBooks(function(err,result){
    if(err){
        res.send(err);
        logger.log('error',`QUERY UNSUCCESSFULL`)
        
    }
    else
  
    // res.send(result);
   // console.log('All books shown',JSON.stringify(result))
    res.success(response(SUCCESS,'',result));
   });
 
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
           Book.getBookDetails(req.query.Name,function(err,result){    
        try{  
              if(result.length > 0){
                logger.log('info',`Book detail retrieved${JSON.stringify(result)}`)
                res.success(response(SUCCESS,'',result));
              }
              else{
                  console.log('No book found',result);
                  logger.log('error',`No book found ${err.code}`)
                  res.send(result);
              }
            }
        catch{
            logger.log('error',`Please provide book Name`)
            res.send({ error:true, message: 'Please provide book Name'})
        }
               
            
        });
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
 
};

// Handle book create on POST.
exports.book_create_post = async function(req, res) {
    const token= req.header('Authorization') 
    console.log('THISIS THE TOKEN  ',token)
    
    const userid = jwt.decode(token,'123')
    console.log('CONSOLE LOG USER ID',userid)
    var new_book = new Book(req.body);
    //handles null error 
    if(!new_book.Name || !new_book.Author){

              res.status(400).send({ error:true, message: 'Please provide book details' });
              logger.log('error',`Please provide book details`)
          }
  else{
   // handles same book same
      const checker = await Book.getBookbyName(new_book.Name);
      
     if(checker.length>0){
        res.error(response(BOOK_EXISTS , ''))
     }
    else{
        Book.createBook(new_book, async function(err, result) {
    
            if (err){
               logger.log('error',`Error creating a book${err.code}`)
            }
            else{

                let username = await Account.getAccountbyID(userid)
                console.log('-----------eto ay galing sa bookcont',username[0].username)




               logger.log('info',`New book added[${JSON.stringify(new_book)}]`)
               res.success(response(BOOK_CREATED,'',{new_book,user:username[0].username}));
           
               }
           });

    
        }
    
    }

    
};



//Checks if the parameters are met
exports.book_checkBookName = function (req){
    
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
    Book.getBookDetails(req.query.Name,function(err,result){          
        if(result.length > 0){
            logger.log('info',`Successfully displayed book[${JSON.stringify(result)}]`)
            //res.success()
            res.success(response(SUCCESS,'',result));
        }
        else{
            logger.log('error',`No book found ${err.code}`)
            res.send({ message: 'No name found' });
            r
          
        }   
    });
};

// Handle book delete on POST.
exports.book_delete_delete = function(req, res) {
    Book.deletebyName(req.query.Name,function(err,result){      
        if(result.affectedRows > 0){
            logger.log('info',`Successfully deleted Name:[${JSON.stringify(req.query.Name)}]`)
            console.log('row affected', req.query.Name)
          
          res.success(response(SUCCESS,'',req.query.Name));
        }
        else{
            logger.log('info',`Delete unsuccessful${err.code}`)
            console.log('No user found',result)                   
        }             
  });
    
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
        Book.getBookDetailsID(req.params.id,function(err,result){ 
        if(result.length > 0){
            logger.log('info',`Successfully displayed book details[${JSON.stringify(result)}]`)
            res.success(response(SUCCESS,'',result));
            
        }
        else{
            logger.log('info',`Book not found ${err.code}`)
            res.send({ message: 'No book found' });          
        }   
    });
};

// Handle book update on POST.
exports.book_update_put = function(req, res) {
    Book.updateDetailsbyID(req.params.id, new Book(req.body), function(err, result) {
        if (err){
            logger.log('info',`Book update unsuccessful ${err.code}`)
          res.send(err);
        }
        //console.log( {changedvalue:req.body});
        else{
       // logger.log('info',`Book successfully updated[${JSON.stringify(req.body)}]`)
        res.success(response(SUCCESS_CHANGE_BOOK_INFO,'',req.body));

        }
        
      });
};

