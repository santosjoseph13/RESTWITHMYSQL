var Book = require('../models/account');

exports.accountindex = function (req,res){
    res.send('showall');
};

exports.accountupdate_put = function (req,res){
    res.send('update');
};
exports.accountdelete_post = function (req,res){
    res.send('delete');
};
exports.accountcreate_post = function (req,res){
    res.send('create');
};