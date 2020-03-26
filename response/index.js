var httpContext = require('express-http-context');
const { successTypes, errorTypes } = require('../config/');




function getKeyTypes(responseTypes) {
  return Object.keys(responseTypes).reduce((accu, curr) => {
    accu[curr] = curr;
    return accu;
  }, {});
}

function getResponse(i, message = null, data = null,reqID=null) {
 
  const types = {
    ...successTypes,
    ...errorTypes
  };
  // This code will deep copy the object to prevent direct mutations to `successTypes` and `errorTypes` object.

  const response = JSON.parse(JSON.stringify(types[i]));
  var requestId = httpContext.get('requestId');

  if (reqID) response.body.requestID = reqID
  if (message) response.body.message = message;
  if (data) response.body.data = data;
  return response;
}

module.exports = {
  ...getKeyTypes(errorTypes),
  ...getKeyTypes(successTypes),
  
  response: (info, message = null, data = null,reqID=null) => {
    return getResponse(info, message, data,reqID);
  }
};