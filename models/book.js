const sql = require('../database/mysql')

var Book = function(book){
    this.Name = book.Name;
    this.Author  = book.Author;
    this.Date = book.Date;

};
Book.getAllTask = function (result) {
    sql.query("Select * from books", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('tasks : ', res);  

             result(null, res);
            }
        });   
};

Book.createBook = function (newBook, result) {
    console.log('------fromMODEL',newBook)    
    sql.query("INSERT INTO books SET ?", [newBook],  function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};

Book.getBookDetails = function(param,result){
    sql.query("SELECT * FROM books WHERE Name=?",param,function(err,res){
        if(err)
        {
            console.log(err);
            result(err,null);
        }
        else
        {
            console.log('-----------------FROM MODEL',res)
            result(null,res)
        }

    });

};

module.exports = Book;