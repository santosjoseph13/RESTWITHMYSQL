const sql = require('../database/mysql')

var Account = function(account){
    this.firstName = book.firstName;
    this.lastName  = book.lastName;
    this.booksBorrowed = book.booksBorrowed;

};

Account.getAllAccounts = function (result) {
    sql.query("Select * from accounts", function (err, res) {

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

Account.createAccount = function (newBook, resultofproc) {
      sql.query("INSERT INTO accounts SET ?", [newBook],  function (errorfromquery, resultfromquery) {
            
            if(err) {
                console.log("error: ", errorfromquery);
                resultofproc(errorfromquery, null);
            }
            else{
                console.log(resultfromquery.insertId);
                resultofproc(null, resultfromquery.insertId);
            }
        });           
};
Account.updateAccount = function (newBook, resultofproc) {
    sql.query("INSERT INTO accounts SET ?", [newBook],  function (errorfromquery, resultfromquery) {
          
          if(err) {
              console.log("error: ", errorfromquery);
              resultofproc(errorfromquery, null);
          }
          else{
              console.log(resultfromquery.insertId);
              resultofproc(null, resultfromquery.insertId);
          }
      });           
};
Account.borrowBook = function (newBook, resultofproc) {
    sql.query("INSERT INTO accounts SET ?", [newBook],  function (errorfromquery, resultfromquery) {
          
          if(err) {
              console.log("error: ", errorfromquery);
              resultofproc(errorfromquery, null);
          }
          else{
              console.log(resultfromquery.insertId);
              resultofproc(null, resultfromquery.insertId);
          }
      });           
};
Account.viewAccount = function (newBook, resultofproc) {
    sql.query("INSERT INTO accounts SET ?", [newBook],  function (errorfromquery, resultfromquery) {
          
          if(err) {
              console.log("error: ", errorfromquery);
              resultofproc(errorfromquery, null);
          }
          else{
              console.log(resultfromquery.insertId);
              resultofproc(null, resultfromquery.insertId);
          }
      });           
};