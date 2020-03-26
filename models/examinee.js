const sql = require('../database/mysql')
const logger = require('../logger');
const TAG = '[ExamineeModel]';
var bcrypt = require('bcryptjs');
const saltRounds = 10


var Examinee = function(examinee){
    this.email = examinee.email;
    this.password  = examinee.password;
    this.answer = examinee.answer;
    this.examinee_id = examinee.examinee_id;
 
 

};


Examinee.getJobs = function (result) {
    const ACTION = '[getJobs]'
    logger.log('info', `${TAG}${ACTION}[SELECT job_title FROM jobtitles]`);
    sql.query("SELECT job_title FROM jobtitles ", function (err, res) {
        if(err) throw err  
        console.log("Error:",err)
        console.log("success",res)
        result(null,res)
        });   
      
       
};

Examinee.getAllAccounts = function (result) {
    const ACTION = '[getAllBooks]'
    logger.log('info', `${TAG}${ACTION}[Select * from books]`);
    var what = sql.query("Select * from examinee", function (err, res) {
        if(err)
        console.log("Error:",err)
       
        result(null,res)
        });   
      
       
};
Examinee.getExam = function (job,result) {
    return new Promise((resolve,reject )=>{
    const ACTION = '[getExam]'
    logger.log('info', `${TAG}${ACTION}[Select examRequired from jobtitles WHERE job_title=?]`);
   sql.query("Select examRequired from jobtitles WHERE job_title=?",job, function (error, res) {
        if(error){
            console.log("ETO AND ERROR",error)
            return reject(result(error,res));
        }   
        
        else{
            console.log('eto ang response',res)
            return resolve(result(null,res[0].examRequired));}
      
   })
   })
};


   

Examinee.createAccount = function (newExaminee, resultofproc) {
    const ACTION = '[createAccount]'
    logger.log('info',`${TAG}${ACTION}[INSERT INTO examinee SET ?]`);
    bcrypt.hash(newExaminee.password,saltRounds,function(err,hash){
      sql.query("INSERT INTO examinee (email,password) VALUES (?,?)", [newExaminee.email,hash],  function (errorfromquery, resultfromquery) {
            
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
Examinee.updateAccount = function (newExaminee, resultofproc) {
    sql.query("INSERT INTO examinee SET ?", [newExaminee],  function (errorfromquery, resultfromquery) {
          
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

Examinee.hashpass = function(newExaminee){
    bcrypt.hash(newExaminee.password,saltRounds,function(err,hash){
        if(err) throw err
        console.log('beforehash',hash)
        newExaminee.password = hash
        console.log('afterset',newExaminee.password)

    })
    return newExaminee
};


Examinee.getAccount = (email) => {
    return new Promise((resolve,reject )=>{
    const ACTION = '[getAccount]';
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE Name=?]`);
    sql.query("SELECT * FROM examinee WHERE email=?",email,function(err,res){
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
Examinee.getAccountbyID = (examinee_id) => {
    return new Promise((resolve,reject )=>{
    const ACTION = '[getAccount]';
    logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
    sql.query("SELECT * FROM examinee WHERE examinee_id=?",examinee_id,function(err,res){
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


Examinee.submitAnswer = (exam_id,answer)=>{
    console.log("examid",exam_id)
    console.log("answer",answer)
    return new Promise((resolve,reject )=>{
        const ACTION = '[submtAnswer]';
        logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
        sql.query("INSERT INTO  answers (`examinee_id`,`exam_id`,`answer`) VALUES (2,?,?)",[exam_id,answer],function(err,res){
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

Examinee.addEsssay=(id,body)=>{
  
    return new Promise((resolve,reject )=>{
        const ACTION = '[submtAnswer]';
        console.log('------------------------------qid',id)
        console.log('------------------------------bans',body[0])
        console.log('------------------------------bans',body[1])
        console.log('------------------------------bansssss',body)
        logger.log('info',`${TAG}${ACTION}[SELECT * FROM books WHERE id=?]`);
        sql.query("INSERT INTO  essay (examinee_id,text,question_id) VALUES (?,?,?),(?,?,?),(?,?,?),(?,?,?)"
        ,[id,body.text[0],1,id,body.text[1],2,id,body.text[2],3,id,body.text[3],4],function(err,res){
            if(err)
            {
                console.log("ERRRRRRRRRRRRRRRRRRRRRRRR",err)
                return reject(err);
           }
            else
            {   
                 resolve(res);
            }
    
        });
    })
    };



module.exports = Examinee;