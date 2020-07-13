var Examinee = require('../models/examinee');
const logger = require('../logger');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response, ACCOUNT_AUTHENTICATED, INVALID_CREDENTIALS, SUCCESS, EMPLOYEE_EXISTS, CREATED, BOOK_CREATED, BOOK_EXISTS, EMPLOYEE_NOT_EXISTS, SUCCESS_CHANGE_BOOK_INFO } = require('../response');

exports.examineeindex = function (req, res) {
    Examinee.getAllAccounts(function (err,result){
        console.log('testigngggg',result)
        res.success(response(SUCCESS,'',result))
    });
};

exports.examinee_getexam_get = function (req, res) {
console.log("BODDDYYYYY",req.query.job)
    Examinee.getExam(req.query.job,function (err,result){
        if(err){
            res.error(response(BOOK_EXISTS, '',err))
        } 
        else{
        res.success(response(SUCCESS,'',result))}
    });
};

exports.getscore = function (req, res) {
        Examinee.getScore(req.params.id).then((result)=>{
            res.success(response(SUCCESS,'',result))
        }).catch((err)=>{
            res.error(response(BOOK_EXISTS, '',err))
        })       
};

exports.getEssay = function (req, res) {
    Examinee.getEssay(req.params.id).then((result)=>{
        res.success(response(SUCCESS,'',result))
    }).catch((err)=>{
        res.error(response(BOOK_EXISTS, '',err))
    })       
};

exports.examinee_submitessay_post = function(req,res){
    console.log('esssaayyy------------------',req.body)
    Examinee.addEsssay(req.params.id,{text:req.body}).then(result => {
        console.log('esssaayyy------------------',result)
        if(result.affectedRows > 0) {
            return res.success(response(SUCCESS, '', result));
        }else {
            return res.error(response(EMPLOYEE_NOT_EXISTS, ''));
        }
    })
    .catch(err => {
        res.error(err);
    });
}


exports.examinee_update_put = function (req, res) {
    res.send('update');
};
exports.examinee_delete_post = function (req, res) {
    res.send('delete');
};
exports.examinee_create_post = async function (req, res) {
    var new_account = req.body
    //handles null erro
    if (!new_account.email || !new_account.password) {

        res.status(400).send({ error: true, message: 'Please provide account details' });
        logger.log('error', `Please provide account details`)
    }
    else {
        // handles same book same
        var checker = await Examinee.getAccount(new_account.email);
        if (checker.length > 0) {
            res.error(response(BOOK_EXISTS, ''))
        }
        else {
            console.log()
            Examinee.createAccount(new_account, function (err, result) {
                if (err) {
                    logger.log('error', `Error creating an account${err.code}`)
                }
                else {
                    let token = jwt.sign(result.insertId, '123');
                    logger.log('info', `New account created[${JSON.stringify(new_account)}]`)
                    res.success(response(BOOK_CREATED, '', { result, token: token }));
                }
            });
        }




    };
};

exports.examinee_login_post = async function (req, result) {
    var new_login = new Examinee(req.body);
    //handles null error 
    if (!new_login.email || !new_login.password) {

        result.status(400).send({ error: true, message: 'Please provide login details' });
        logger.log('error', `Please provide login details`)
    }
    else {
        // handles same book sam
        var checker = await Examinee.getAccount(new_login.email);
        console.log("checkerssas", checker)
        if (checker.length > 0) {
            bcrypt.compare(new_login.password,checker[0].password).then((res) => {
                if (res) {
                    let token = jwt.sign(checker[0].id, '123');

                    result.success(response(ACCOUNT_AUTHENTICATED, '', { data:checker[0], token: token }))
                }
                else
                    result.error(response(INVALID_CREDENTIALS, ''))

            });
        }
        else {
            result.error(response(EMPLOYEE_NOT_EXISTS, ''))
        }
     }

};



exports.examinee_getjobs_get  = function (req, res) {
    Examinee.getJobs(function (err,result){
        console.log('testigngggg',result)
        res.success(response(SUCCESS,'',result))
        if(err) res.error(response(BOOK_EXISTS, ''))
    });
};

exports.examinee_submit_post= function(req,res){
    console.log("reqbody",req.body)
    Examinee.submitAnswer(req.params.id,req.body),function(err,result){         
        if(result.length > 0){     
          res.success(response(SUCCESS,'',result));
        }
        else{
            logger.log('error',`Get unsuccessful${err}`)
       
            res.error(response(EMPLOYEE_NOT_EXISTS,'',result));               
        }             
  };    
}


exports.examinee_finished_exam= function(req,res){
    console.log("reqbody",req.body)
    Examinee.finishedExam(req.params.id,req.body),function(err,result){         
        if(result.length > 0){     
          res.success(response(SUCCESS,'',result));
        }
        else{
            logger.log('error',`Get unsuccessful${err}`)
       
            res.error(response(EMPLOYEE_NOT_EXISTS,'',result));               
        }             
  };
   
    
}