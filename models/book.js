const sql = require('../database/mysql')

var Book = function(task){
    this.task = task.task;
    this.status  = task.status;
    this.created_at = new Date();

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
    console.log('------asdf',newBook)    
    sql.query("INSERT INTO books SET = ?", [newBook],  function (err, res) {
            
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

module.exports = Book;