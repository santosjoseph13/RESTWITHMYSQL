const sql = require('../database/mysql')
const logger = require('../logger');
const TAG = '[AccountModel]';
var bcrypt = require('bcryptjs');
const saltRounds = 10
var Account = function(account){
    this.userName = account.userName;
    this.password  = account.password;
 

};

Account.getAllAccounts = function (result) {
    const ACTION = '[getAllBooks]'
    logger.log('info', `${TAG}${ACTION}[Select * from books]`);
    var what = sql.query("Select * from accounts", function (err, res) {
        if(err)
        console.log("Error:",err)

       
        });   
       
};

Account.createAccount = function (newAccount, resultofproc) {
    const ACTION = '[createAccount]'
    logger.log('info',`${TAG}${ACTION}[INSERT INTO accounts SET ?]`);
    bcrypt.hash(newAccount.password,saltRounds,function(err,hash){
      sql.query("INSERT INTO accounts (username,password) VALUES (?,?)", [newAccount.userName,hash],  function (errorfromquery, resultfromquery) {
            
            if(errorfromquery) {
                console.log("error: ", errorfromquery);
                resultofproc(errorfromquery, null);
            }
            else{
                
                resultofproc(null, resultfromquery);
            }
        });     
    })              
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
Account.hashpass = function(newaccount){
    bcrypt.hash(newaccount.password,saltRounds,function(err,hash){
        if(err) throw err
        console.log('beforehash',hash)
        newaccount.password = hash
        console.log('afterset',newaccount.password)

    })
    return newaccount
};


Account.getAccount = (username) => {
    return new Promise((resolve,reject )=>{
    const ACTION = '[getAccount]';
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
    sql.query("SELECT * FROM accounts WHERE username=?",username,function(err,res){
        if(err)
        {
            
            return reject(err);
       }
        else
        {
            return resolve(res);
        }

    });
})

};
Account.getAccountbyID = (userid) => {
    return new Promise((resolve,reject )=>{
    const ACTION = '[getAccount]';
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
    sql.query("SELECT * FROM accounts WHERE id=?",userid,function(err,res){
        if(err)
        {
            
            return reject(err);
       }
        else
        {
            return resolve(res);
        }

    });
})
}



module.exports = Account;