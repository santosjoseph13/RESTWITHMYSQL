const express = require('express')
const app = express()
const morgan = require('morgan')
const logger = require('./logger');
var routeindex =  require('./routes/index.js');
var bookRouter = require('./routes/book');  //Import routes for "catalog" area of site
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json());
app.use(morgan('short'))
app.use(cors())
//app.use('/actions', bookRouter);  // Add catalog routes to middleware chain.
//app.use('/account',)

app.use(function(req, res, next) {
    res.success = function(response) {
      logger.log('info', `[${res.req.method}][${req.originalUrl}]`, response);
      res.status(response.status).json(response.body);
    };
  
    res.error = function(error) {
      console.log('Error', error);
      logger.log('error', `[${res.req.method}][${req.originalUrl}]`, error);
      res.status(error.status).json(error.body);
    };
  
    next();
  });
app.use('/',routeindex);

app.listen(4000,function(){
console.log('listening at port 4000');


});