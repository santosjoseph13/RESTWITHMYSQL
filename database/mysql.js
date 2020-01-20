var mysql = require('mysql')
const logger = require('../logger');

var connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:'root',
    password:'quest',
    database:'restdb'

})
connection.connect(function(err,restdb){
    if (err) throw logger.log('error',`${err.code}`);
    else    logger.log('info', `[Connected to DB]`);
    
    
})

module.exports = connection;