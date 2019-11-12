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

module.exports = Book;