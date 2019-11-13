const express = require('express')
const app = express()
const morgan = require('morgan')
var bookRouter = require('./routes/actions');  //Import routes for "catalog" area of site
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(morgan('short'))
app.use('/actions', bookRouter);  // Add catalog routes to middleware chain.

app.listen(4000,function(){
console.log('listening');


});