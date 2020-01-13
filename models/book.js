const sql = require('../database/mysql')
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const TAG = '[BookModel]';
var Book = function (book) {
    this.Name = book.Name;
    this.Author = book.Author;
    this.Date = book.Date;

};
Book.getAllBooks = function (result) {
    const ACTION = '[getAllBooks]'
    logger.log('info', `${TAG}${ACTION}[Select * from books]`);
    sql.query("Select * from books", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
           result(null, res);
        }
    });
};

Book.getAnswer = function (id,result){
    const ACTION = '[getAnswer]'
    logger.log('info', `${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
    sql.query("SELECT * FROM exam WHERE exam_id=?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("error: ", );
            result(null, res);
        }
    });
};

Book.getQuestions = function (id,result){
    const ACTION = '[getQuestion]'
    logger.log('info', `${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
    sql.query("SELECT question FROM questions WHERE exam_id=? GROUP BY question ORDER BY question_id", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("error: ", res );
            result(null, res);
        }
    });
};

Book.getChoices = function (id,result){
    const ACTION = '[getChoices]'
    logger.log('info', `${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
    sql.query("SELECT choices FROM choices WHERE exam_id=?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("error: ", );
            result(null, res);
        }
    });
};

Book.createBook = function (newBook, resultofproc) {
    const ACTION = '[createBook]'
    logger.log('info', `${TAG}${ACTION}[INSERT INTO books SET ?]`);
    sql.query("INSERT INTO books SET ?", [newBook], function (errorfromquery, resultfromquery) {

        if (errorfromquery) {
            console.log("error: ", errorfromquery);
            resultofproc(errorfromquery, null);
        }
        else {

            resultofproc(null, resultfromquery);
        }
    });
};

Book.getBookDetails = function (param, result) {
    const ACTION = '[getBookDetails]'
    logger.log('info', `${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
    sql.query("SELECT * FROM books WHERE Name=?", param, function (err, res) {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, res)
        }

    });

};

Book.getBookbyName = (bookname) => {
    return new Promise((resolve, reject) => {
        const ACTION = '[getByID]';
        logger.log('info', `${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
        sql.query("SELECT * FROM books WHERE Name=?", bookname, function (err, res) {
            if (err) {

                return reject(err);
            }
            else {
                return resolve(res);
            }

        });
    })

};


Book.getBookDetailsbyName = function (req, result) {
    const ACTION = '[getBookDetailsnodemobyName]'
    logger.log('info', `${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
    sql.query("SELECT * FROM books WHERE Name=?", param, function (err, res) {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, res)
        }

    });

};

Book.deletebyName = function (name, result) {
    const ACTION = '[deletebyName]'
    logger.log('info', `${TAG}${ACTION}[DELETE FROM books WHERE Name=?]`);
    sql.query("DELETE FROM books WHERE Name=?", name, function (err, res) {

        if (err)
            result(err, null)
        else
            result(null, res)

    });

};

Book.checkToken =   function(req){
    if(req.header('Authorization')!=null){
        const token= req.header('Authorization')  
        console.log('authorizationnnn',token) 
        try {
        const userid =  jwt.decode(token,'123')
            console.log('passsss') 
        console.log('authorizationnnnid',userid) 
            if(userid==null) return false
            else return userid
   
   

     
        
        }
        catch{
            console.log('passsss1') 
            return false
        }
    }
    else
    console.log('passsss2') 
    return false
}


Book.deletebyID = function (id, result) {
    const ACTION = '[deletebyName]'
    console.log("dasdaasda",id)
    logger.log('info', `${TAG}${ACTION}[DELETE FROM books WHERE id=?]`);
    sql.query("DELETE FROM books WHERE id=?", id, function (err, res) {

        if (err)
            result(err, null)
        else
            console.log("dasdaasda",res)
            result(null, res)

    });

};

Book.getBookDetailsID = function (id, result) {
    const ACTION = '[getBookDetailsID]'
    logger.log('info', `${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
    sql.query("SELECT * FROM books WHERE id=?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("error: ", );
            result(null, res);
        }
    });
};

Book.updateDetailsbyID = function (id, input, result) {
    const ACTION = '[updateDetailsbyID]'
    logger.log('info', `${TAG}${ACTION}[UPDATE books SET ? WHERE id = ?]`);
    sql.query("UPDATE books SET ? WHERE id = ?", [input, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res, input);
        }
    });
};

module.exports = Book;