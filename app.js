const express = require('express')
var httpContext = require('express-http-context');
const app = express()
const bodyParser = require('body-parser')

const morgan = require('morgan')
const logger = require('./logger');
var id=1
var routeindex =  require('./routes/index.js');
var bookRouter = require('./routes/book');  //Import routes for "catalog" area of site

const cors = require('cors')
var uuid = require('uuid');

var id = uuid.v1()
const { response, ENDPOINT_NOT_FOUND } = require('./response');

app.use(bodyParser.json());
app.use(httpContext.middleware);
app.use(morgan('short'))
app.use(cors())

// Run the context for each request. Assign a unique identifier to each request

app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  var requestId = req.headers["x-request-id"] || uuid.v1();
  httpContext.set("requestId", requestId);
  console.log('request Id set is: ', httpContext.get('requestId'));
  next();
})


app.use(function(req, res, next) {
  var requestId = httpContext.get('requestId');
    res.success = function(response) {
      logger.log('info', `[${res.req.method}][${req.originalUrl}][${requestId}]`, response);
      res.status(response.status).json(response.body);
    };
  
    res.error = function(error) {
     
      logger.log('error', `[${res.req.method}][${req.originalUrl}][${requestId}]`, error);
      res.status(error.status).json(error.body);
    };
  
    next();
  });
app.use('/',routeindex);


app.use('*', routeindex, (req, res) => {
  res.error(response(ENDPOINT_NOT_FOUND));
});

app.listen(4000,function(){
console.log('listening at port 4000');

app
});