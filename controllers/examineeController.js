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
            console.log('wwwwwwwwwwwwwww',err)
            res.error(response(BOOK_EXISTS, '',err))
        } 
        else{
        res.success(response(SUCCESS,'',result))}
    });
};

exports.examinee_update_put = function (req, res) {
    res.send('update');
};
exports.examinee_delete_post = function (req, res) {
    res.send('delete');
};
exports.examinee_create_post = async function (req, res) {
    var new_account = new Examinee(req.body);
    //handles null erro
    if (!new_account.email || !new_account.password) {

        res.status(400).send({ error: true, message: 'Please provide account details' });
        logger.log('error', `Please provide account details`)
    }
    else {
        // handles same book same
        var checker = await Examinee.getAccount(new_account.email);
        console.log("checkerssas", checker)
        if (checker.length > 0) {
            res.error(response(BOOK_EXISTS, ''))
        }
        else {

            Examinee.createAccount(new_account, function (err, result) {

                if (err) {
                    logger.log('error', `Error creating an account${err.code}`)
                }
                else {
                    console.log('accountiddddd', result.insertId)
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

    var new_account = new Examinee(req.body);
    //handles null erro
    if (!new_account.email || !new_account.password) {

        res.status(400).send({ error: true, message: 'Please provide account details' });
        logger.log('error', `Please provide account details`)
    }
    else {
        // handles same book same
        var checker =  Examinee.getAccount(new_account.email);
        console.log("checkerssas", checker)
        if (checker.length > 0) {
            res.error(response(BOOK_EXISTS, ''))
        }
        else {

            Examinee.createAccount(new_account, function (err, result) {

                if (err) {
                    logger.log('error', `Error creating an account${err.code}`)
                }
                else {
                    console.log('accountiddddd', result.insertId)
                    let token = jwt.sign(result.insertId, '123');
                    logger.log('info', `New account created[${JSON.stringify(new_account)}]`)
                    res.success(response(BOOK_CREATED, '', { result, token: token }));

                }
            });
        }




    };
    
}
