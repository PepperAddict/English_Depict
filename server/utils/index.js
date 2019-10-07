const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const privateKey = fs.readFileSync(path.resolve(__dirname,'../private.pem'), 'utf8');
const signToken = str => {
  return new Promise(resolve => {
    resolve(jwt.sign({"token": str}, privateKey, {algorithm: 'HS256'}))
  })
}

const verifyJwt = req => {
  let token;
  if (req.query && req.query.hasOwnProperty('token')) {
    token = req.query.token
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) reject(new Error('401: User is not authenticated!'));
      resolve(decoded)
    })
  })
}


const isAuthenticated = (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
      // retrieve the authorization header and parse out the
      // JWT using the split function
      let token = req.headers.authorization;
      let privateKey = fs.readFileSync(path.resolve(__dirname, './private.pem'), 'utf8');
      // Here we validate that the JSON Web Token is valid and has been 
      // created using the same private pass phrase
      
      jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
          
          // if there has been an error...
          if (err) {  
              // shut them out!
              res.status(500).json({ error: 'Not Authorized' });
              throw new Error("Not Authorized");
          }
          // if the JWT is valid, allow them to hit
          // the intended endpoint
          return next();
      });
  } else {
      // No authorization header exists on the incoming
      // request, return not authorized and throw a new error 
      res.status(500).json({ error: "Not Authorized" });
      throw new Error("Not Authorized");
  }
}

module.exports = { signToken, verifyJwt}