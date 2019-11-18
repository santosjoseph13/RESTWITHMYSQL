const sql = require('../database/mysql')
const logger = require('../logger');
 const TAG = '[BookModel]';
var Book = function(book){
    this.Name = book.Name;
    this.Author  = book.Author;
    this.Date = book.Date;

};
Book.getAllBooks = function (result) {
    const ACTION = '[getAllBooks]'
    logger.log('info',`${TAG}${ACTION}[Select * from books]`);
    sql.query("Select * from books", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                

             result(null, res);
            }
        });   
};

Book.createBook = function (newBook, resultofproc) {
    const ACTION = '[createBook]'
    logger.log('info',`${TAG}${ACTION}[INSERT INTO books SET ?]`);
      sql.query("INSERT INTO books SET ?", [newBook],  function (errorfromquery, resultfromquery) {
            
            if(errorfromquery) {
                console.log("error: ", errorfromquery);
                resultofproc(errorfromquery, null);
            }
            else{
                
                resultofproc(null, resultfromquery);
            }
        });           
};

Book.getBookDetails = function(param,result){
    const ACTION = '[getBookDetails]'
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
    sql.query("SELECT * FROM books WHERE Name=?",param,function(err,res){
        if(err)
        {
            console.log(err);
            result(err,null);
        }
        else
        {
            result(null,res)
        }

    });

};

Book.getBookbyName = (bookname) => {
    const ACTION = '[getByID]';
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
    sql.query("SELECT * FROM books WHERE Name=?",bookname,function(err,res){
        if(err)
        {
            console.log(err);
            //res.send(err);
        }
        else
        {

            console.log('---------------------------------',res.length)
            return res.length;
        }

    });

};


Book.getBookDetailsbyName = function(req,result){
    const ACTION = '[getBookDetailsbyName]'
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
    sql.query("SELECT * FROM books WHERE Name=?",param,function(err,res){
        if(err)
        {
            console.log(err);
            result(err,null);
        }
        else
        {
            result(null,res)
        }

    });

};

Book.deletebyName = function(name,result){
    const ACTION = '[deletebyName]'
    logger.log('info',`${TAG}${ACTION}[DELETE FROM books WHERE Name=?]`);
    sql.query("DELETE FROM books WHERE Name=?",name,function(err,res){
    
        if(err)
            result(err,null)
        else
            result(null,res)
            
        
    });

};

Book.getBookDetailsID = function(id,result){
    const ACTION = '[getBookDetailsID]'
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
    sql.query("SELECT * FROM books WHERE id=?", [ id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
           }
         else{   
           result(null, res);
              }
          }); 
};

Book.updateDetailsbyID = function(id,input,result){
    const ACTION = '[updateDetailsbyID]'
    logger.log('info',`${TAG}${ACTION}[UPDATE books SET ? WHERE id = ?]`);
    sql.query("UPDATE books SET ? WHERE id = ?", [input, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
           }
         else{   
           result(null, res,input);
              }
          }); 
};

module.exports = Book;